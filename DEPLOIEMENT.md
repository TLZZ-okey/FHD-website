# Mettre les sites en ligne sur le réseau de la maison

Trois versions du site, chacune dans son conteneur Docker, chacune sur son port :

| Adresse | Conteneur | Version | Branche GitHub |
|---|---|---|---|
| **http://192.168.1.50:8001** | `fhdeserable-v1` | Version d'origine | `master` |
| **http://192.168.1.50:8002** | `fhdeserable-v2` | Thème Canadiens (bleu-blanc-rouge) | `theme-canadiens` |
| **http://192.168.1.50:8003** | `fhdeserable-v3` | Thème Noir | `theme-noir` |

(remplacez `192.168.1.50` par l'adresse de votre serveur)

Docker **ne crée aucune règle de pare-feu** : c'est le fichier nftables fourni qui ouvre
les ports 8001 à 8003 au réseau de la maison.

| Fichier | Rôle |
|---|---|
| `docker-compose.yml` | Les 3 conteneurs, leurs ports et leur réseau `fhd` |
| `deploy/versions.sh` | Prépare / met à jour `versions/` : une copie de chaque branche |
| `Dockerfile`, `deploy/nginx.conf` | Image et serveur web d'une version du site |
| `deploy/daemon.json` | Configuration de Docker : ne plus toucher au pare-feu |
| `deploy/nftables.conf` | Pare-feu du serveur (nftables uniquement) |

---

## 1. Préparer le serveur (Linux)

1. Installez Docker et nftables :
   ```bash
   curl -fsSL https://get.docker.com | sh
   sudo apt install nftables        # Debian / Ubuntu / Raspberry Pi OS
   ```
2. Récupérez le site :
   ```bash
   git clone https://github.com/TLZZ-okey/FHD-website.git
   cd FHD-website
   ```

## 2. Empêcher Docker de créer des règles iptables

```bash
sudo cp deploy/daemon.json /etc/docker/daemon.json
sudo systemctl restart docker
```

| Réglage de `deploy/daemon.json` | Effet |
|---|---|
| `"iptables": false` | Docker ne crée plus aucune règle IPv4 |
| `"ip6tables": false` | Idem pour IPv6 |
| `"userland-proxy": true` | Les ports 8001-8003 sont servis par `docker-proxy`, un petit programme qui écoute directement sur le serveur : pas besoin de règle de redirection |

> Si `/etc/docker/daemon.json` existe déjà, ajoutez-y ces trois lignes au lieu de le remplacer.

Vérification, après le démarrage des conteneurs : `sudo nft list ruleset | grep "chain DOCKER"`
ne doit rien afficher (Docker n'a créé aucune chaîne). Les mentions de `docker0` / `br-fhd`
visibles dans `nft list ruleset` viennent du pare-feu fourni, c'est normal.

## 3. Installer le pare-feu nftables

1. Ouvrez `deploy/nftables.conf` et adaptez le bloc « À adapter » :
   - `RESEAU_LOCAL` : le réseau de votre maison (souvent `192.168.1.0/24`, ou
     `192.168.0.0/24` ; vérifiez avec `ip a` : l'adresse du serveur et son `/24`) ;
   - `PORT_SSH` : le port SSH du serveur, **pour ne pas perdre l'accès à distance**.
2. Testez la syntaxe, puis installez et activez le pare-feu :
   ```bash
   sudo nft -c -f deploy/nftables.conf          # vérification, ne change rien
   sudo cp deploy/nftables.conf /etc/nftables.conf
   sudo systemctl enable --now nftables         # chargé maintenant et à chaque démarrage
   sudo systemctl restart nftables              # si nftables était déjà actif
   sudo nft list ruleset                        # affiche les règles actives
   ```

Ce que fait ce pare-feu :

| Règle | Pourquoi |
|---|---|
| Tout ce qui entre est refusé par défaut… | sécurité |
| …sauf les réponses aux connexions déjà ouvertes | fonctionnement normal |
| …les ports **8001 à 8003** depuis `RESEAU_LOCAL` | accès aux trois sites depuis les appareils de la maison |
| …le port SSH | administration du serveur |
| …le ping | diagnostic |
| Trafic des conteneurs vers Internet autorisé, avec masquage d'adresse (NAT) | les conteneurs peuvent sortir |

> `flush ruleset` en tête du fichier efface les règles nftables existantes, dont celles
> laissées par Docker. Si votre système utilise encore « iptables-legacy »
> (`iptables -V` affiche `legacy`), videz aussi ces règles une fois :
> `sudo iptables -F; sudo iptables -t nat -F; sudo iptables -X; sudo iptables -t nat -X`,
> ou redémarrez le serveur après l'étape 2.

## 4. Lancer les sites

```bash
./deploy/versions.sh          # récupère les 3 versions dans versions/
docker compose up -d --build  # construit et lance les 3 conteneurs
```

Vérification sur le serveur lui-même :

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8001/   # 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8002/   # 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8003/   # 200
```

Commandes utiles :

```bash
docker compose ps                  # les 3 conteneurs tournent-ils ?
docker compose logs -f site-v2     # journaux d'un site (site-v1, site-v2, site-v3)
docker compose restart site-v2
docker compose down                # tout arrêter
```

Les conteneurs redémarrent tout seuls après une coupure ou un redémarrage du serveur.

**Changer un port** : dans `docker-compose.yml`, modifiez le premier nombre de
`"8001:80"`, et adaptez `PORTS_SITES` dans `/etc/nftables.conf`.

## 5. Donner une adresse fixe au serveur

Pour que les adresses restent les mêmes, réservez l'adresse IP actuelle du serveur dans
la box (« bail DHCP statique ») :

- Freebox : `mafreebox.freebox.fr` › Paramètres › DHCP › Baux statiques
- Livebox : `192.168.1.1` › Réseau › DHCP › Adresses IP statiques
- Bbox : `mabbox.bytel.fr` › Réseau local › DHCP
- SFR Box : `192.168.1.1` › Réseau › DHCP

Ensuite, depuis n'importe quel appareil de la maison, ouvrez
**http://192.168.1.50:8001**, **:8002** ou **:8003** (avec l'adresse de votre serveur).
Tapez bien `http://` et le port.

## 6. Mettre à jour les sites

```bash
git pull                      # met à jour docker-compose.yml, le pare-feu…
./deploy/versions.sh          # récupère la dernière version de chaque branche
docker compose up -d --build  # reconstruit les conteneurs qui ont changé
```

## Dépannage

| Symptôme | Cause probable |
|---|---|
| Le site s'ouvre sur le serveur (`curl` ci-dessus) mais pas depuis un autre appareil | `RESEAU_LOCAL` ne correspond pas à votre réseau dans `/etc/nftables.conf`, ou le pare-feu n'est pas chargé (`sudo nft list ruleset`) ; un autre pare-feu (`ufw`, `firewalld`) est peut-être actif aussi |
| « Port 8001 is already allocated » | Un autre programme utilise ce port : `sudo ss -ltnp 'sport = :8001'` |
| Rien ne répond, même sur le serveur | Les conteneurs ne tournent pas : `docker compose ps` et `docker compose logs` |
| `docker compose up --build` échoue au téléchargement | Docker n'a plus accès à Internet : vérifiez la table `nat` du pare-feu (`sudo nft list table ip nat`) |

## Ajouter une version

1. Ajoutez la branche à la ligne `BRANCHES=` de `deploy/versions.sh`.
2. Ajoutez un service `site-v4` dans `docker-compose.yml` sur le modèle des autres, avec le port `8004`.
3. Passez `PORTS_SITES` à `8001-8004` dans `/etc/nftables.conf`, puis `sudo systemctl restart nftables`.
4. `./deploy/versions.sh && docker compose up -d --build`.
