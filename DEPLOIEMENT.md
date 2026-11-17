# Mettre les sites en ligne sur le réseau de la maison

Trois versions du site, chacune dans son conteneur Docker, chacune sur son nom de
domaine, derrière un **reverse proxy** :

| Nom de domaine | Conteneur | Version | Branche GitHub |
|---|---|---|---|
| **http://fhdeserable-v1.fr** | `fhdeserable-v1` | Version d'origine | `master` |
| **http://fhdeserable-v2.fr** | `fhdeserable-v2` | Thème Canadiens (bleu-blanc-rouge) | `theme-canadiens` |
| **http://fhdeserable-v3.fr** | `fhdeserable-v3` | Thème Noir | `theme-noir` |

```
                         serveur (192.168.1.50)
                ┌──────────────────────────────────────────────────────┐
navigateur ──►  │ port 80 ─► fhdeserable-proxy ──┬─► fhdeserable-v1    │
(maison)        │            (reverse proxy)     ├─► fhdeserable-v2    │
                │                                └─► fhdeserable-v3    │
                │                 réseau Docker interne « fhd »        │
                └──────────────────────────────────────────────────────┘
```

- Les trois domaines pointent vers **la même adresse IP** : celle du serveur.
- Seul le reverse proxy est joignable depuis le réseau, sur le **port 80**. Il lit le nom
  de domaine demandé et transmet la visite au bon conteneur.
- Les conteneurs des versions n'ont **aucun port ouvert** sur le serveur ; ils ne sont
  joignables que par le proxy, sur le réseau Docker interne `fhd`.
- Docker **ne crée aucune règle de pare-feu** : c'est le fichier nftables fourni qui
  ouvre le port 80 au réseau de la maison.

| Fichier | Rôle |
|---|---|
| `docker-compose.yml` | Les 3 conteneurs des versions + le reverse proxy, et le réseau interne `fhd` |
| `deploy/proxy.conf` | Configuration du reverse proxy : quel domaine va vers quel conteneur |
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

Par défaut, Docker écrit ses propres règles (dans iptables, qui apparaissent aussi dans
nftables) au démarrage des conteneurs. On le lui interdit :

```bash
sudo cp deploy/daemon.json /etc/docker/daemon.json
sudo systemctl restart docker
```

Contenu de `deploy/daemon.json` :

| Réglage | Effet |
|---|---|
| `"iptables": false` | Docker ne crée plus aucune règle IPv4 |
| `"ip6tables": false` | Idem pour IPv6 |
| `"userland-proxy": true` | Le port 80 publié est servi par `docker-proxy`, un petit programme qui écoute directement sur le serveur : pas besoin de règle de redirection |

> Si `/etc/docker/daemon.json` existe déjà, ajoutez-y ces trois lignes au lieu de le remplacer.

Vérification : après le démarrage des conteneurs, `sudo nft list ruleset | grep "chain DOCKER"`
ne doit rien afficher (Docker n'a créé aucune chaîne). Les mentions de `docker0` que vous
verrez dans `nft list ruleset` viennent du pare-feu fourni, c'est normal.

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
   sudo nft list ruleset                        # affiche les règles actives
   ```

Ce que fait ce pare-feu :

| Règle | Pourquoi |
|---|---|
| Tout ce qui entre est refusé par défaut… | sécurité |
| …sauf les réponses aux connexions déjà ouvertes | fonctionnement normal |
| …le port **80** depuis `RESEAU_LOCAL` | accès aux sites depuis les appareils de la maison |
| …le port SSH | administration du serveur |
| …le ping | diagnostic |
| Trafic entre conteneurs et vers Internet autorisé, avec masquage d'adresse (NAT) | le proxy joint les versions ; les conteneurs peuvent sortir |

> **Ancien bazar de règles** : `flush ruleset` en tête du fichier efface les règles
> nftables existantes, dont celles laissées par Docker. Si votre système utilise encore
> l'ancien « iptables-legacy » (`iptables -V` affiche `legacy`), videz aussi ces règles
> une fois : `sudo iptables -F; sudo iptables -t nat -F; sudo iptables -X; sudo iptables -t nat -X`,
> ou redémarrez le serveur après l'étape 2.

## 4. Lancer les sites

```bash
./deploy/versions.sh          # récupère les 3 versions dans versions/
docker compose up -d --build  # construit et lance les 3 versions + le reverse proxy
```

Vérification sur le serveur lui-même :

```bash
curl -s -o /dev/null -w "%{http_code}\n" -H "Host: fhdeserable-v1.fr" http://localhost/   # 200
curl -s -o /dev/null -w "%{http_code}\n" -H "Host: fhdeserable-v2.fr" http://localhost/   # 200
curl -s -o /dev/null -w "%{http_code}\n" -H "Host: fhdeserable-v3.fr" http://localhost/   # 200
```

Commandes utiles :

```bash
docker compose ps                  # les 4 conteneurs tournent-ils ?
docker compose logs -f proxy       # journaux du reverse proxy (ou site-v1, site-v2, site-v3)
docker compose restart site-v2
docker compose down                # tout arrêter
```

Les conteneurs redémarrent tout seuls après une coupure ou un redémarrage du serveur.

## 5. Donner une adresse fixe au serveur

Dans l'interface de la box, réservez l'adresse IP actuelle du serveur (« bail DHCP
statique », « réservation d'adresse IP ») :

- Freebox : `mafreebox.freebox.fr` › Paramètres › DHCP › Baux statiques
- Livebox : `192.168.1.1` › Réseau › DHCP › Adresses IP statiques
- Bbox : `mabbox.bytel.fr` › Réseau local › DHCP
- SFR Box : `192.168.1.1` › Réseau › DHCP

## 6. Relier les trois noms de domaine au serveur

Les six noms doivent pointer vers l'adresse IP du serveur (ici `192.168.1.50`).

**Pour toute la maison (recommandé)** — dans la box (« DNS local », « noms d'hôtes ») ou
dans Pi-hole (*Local DNS › DNS Records*) / AdGuard Home (*Réécritures DNS*) :

```
fhdeserable-v1.fr   www.fhdeserable-v1.fr   → 192.168.1.50
fhdeserable-v2.fr   www.fhdeserable-v2.fr   → 192.168.1.50
fhdeserable-v3.fr   www.fhdeserable-v3.fr   → 192.168.1.50
```

**Ou ordinateur par ordinateur** — dans le fichier `hosts`
(Windows : `C:\Windows\System32\drivers\etc\hosts` ouvert en administrateur ;
macOS / Linux : `sudo nano /etc/hosts`) :

```
192.168.1.50   fhdeserable-v1.fr www.fhdeserable-v1.fr
192.168.1.50   fhdeserable-v2.fr www.fhdeserable-v2.fr
192.168.1.50   fhdeserable-v3.fr www.fhdeserable-v3.fr
```

Ensuite, ouvrez **http://fhdeserable-v1.fr**, **http://fhdeserable-v2.fr** ou
**http://fhdeserable-v3.fr** depuis n'importe quel appareil de la maison. Les adresses en
`www.` redirigent vers le domaine sans `www`. Tapez bien `http://` : le HTTPS n'est pas
configuré pour cet usage local.

> Si vous n'êtes pas propriétaire de ces domaines, ces noms ne fonctionnent qu'à la maison.

## 7. Mettre à jour les sites

```bash
git pull                      # met à jour docker-compose.yml, le proxy, le pare-feu…
./deploy/versions.sh          # récupère la dernière version de chaque branche
docker compose up -d --build  # reconstruit les conteneurs qui ont changé
```

## Dépannage

| Symptôme | Cause probable |
|---|---|
| Le site s'ouvre sur le serveur (`curl` ci-dessus) mais pas depuis un autre appareil | `RESEAU_LOCAL` ne correspond pas à votre réseau dans `/etc/nftables.conf`, ou le pare-feu n'est pas chargé (`sudo nft list ruleset`) |
| « Port 80 is already allocated » | Un autre programme utilise le port 80 (interface d'un NAS, autre serveur web) : `sudo ss -ltnp 'sport = :80'` |
| Erreur 404 « nginx » sur toutes les adresses | Le nom tapé n'est pas un des trois domaines, ou l'appareil ne résout pas le domaine vers le serveur (vérifiez l'étape 6) |
| Le site ne charge pas du tout, pas même une erreur | Le domaine ne pointe pas vers le serveur : `ping fhdeserable-v1.fr` doit répondre avec l'adresse du serveur |
| `docker compose up --build` échoue au téléchargement | Docker n'a plus accès à Internet : vérifiez la table `nat` du pare-feu (`sudo nft list table ip nat`) |

## Ajouter une version

1. Ajoutez la branche à la ligne `BRANCHES=` de `deploy/versions.sh`.
2. Ajoutez un service `site-v4` dans `docker-compose.yml` sur le modèle des autres.
3. Ajoutez dans `deploy/proxy.conf` les deux blocs `server` pour `fhdeserable-v4.fr`.
4. Ajoutez le nom dans le DNS local (étape 6), puis `docker compose up -d --build`.
