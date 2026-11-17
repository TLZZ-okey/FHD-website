# Mettre les sites en ligne sur le réseau de la maison

Trois versions du site, chacune dans son conteneur Docker, chacune sur son nom de
domaine, derrière un **reverse proxy**, avec un **serveur DNS** pour toute la maison :

| Nom de domaine | Conteneur | Version | Branche GitHub |
|---|---|---|---|
| **http://fhdeserable-v1.fr** | `fhdeserable-v1` | Version d'origine | `master` |
| **http://fhdeserable-v2.fr** | `fhdeserable-v2` | Thème Canadiens (bleu-blanc-rouge) | `theme-canadiens` |
| **http://fhdeserable-v3.fr** | `fhdeserable-v3` | Thème Noir | `theme-noir` |

```
                         serveur (192.168.1.50)
                ┌──────────────────────────────────────────────────────┐
  « où est      │ port 53 ─► fhdeserable-dns (CoreDNS)                 │
  fhdeserable-  │            fhdeserable-v1/v2/v3.fr → 192.168.1.50    │
  v2.fr ? » ──► │            autres noms → transmis à la Freebox       │
                │                                                      │
navigateur ──►  │ port 80 ─► fhdeserable-proxy ──┬─► fhdeserable-v1    │
(maison)        │            (reverse proxy)     ├─► fhdeserable-v2    │
                │                                └─► fhdeserable-v3    │
                │                 réseau Docker interne « fhd »        │
                └──────────────────────────────────────────────────────┘
```

- Les trois domaines pointent vers **la même adresse IP** : celle du serveur. C'est le
  serveur DNS `fhdeserable-dns` qui le dit aux appareils de la maison ; il transmet
  toutes les autres demandes (google.fr…) au DNS de la Freebox.
- Seul le reverse proxy est joignable depuis le réseau, sur le **port 80**. Il lit le nom
  de domaine demandé et transmet la visite au bon conteneur.
- Les conteneurs des versions n'ont **aucun port ouvert** sur le serveur ; ils ne sont
  joignables que par le proxy, sur le réseau Docker interne `fhd`.
- Docker **ne crée aucune règle de pare-feu** : c'est le fichier nftables fourni qui
  ouvre les ports 80 (sites) et 53 (DNS) au réseau de la maison.

| Fichier | Rôle |
|---|---|
| `docker-compose.yml` | Les 3 conteneurs des versions + le reverse proxy, et le réseau interne `fhd` |
| `deploy/proxy.conf` | Configuration du reverse proxy : quel domaine va vers quel conteneur |
| `deploy/versions.sh` | Prépare / met à jour `versions/` : une copie de chaque branche |
| `Dockerfile`, `deploy/nginx.conf` | Image et serveur web d'une version du site |
| `deploy/daemon.json` | Configuration de Docker : ne plus toucher au pare-feu |
| `deploy/nftables.conf` | Pare-feu du serveur (nftables uniquement) |
| `deploy/reseau.env` | **À adapter** : adresse IP du serveur et DNS de la Freebox |
| `deploy/Corefile` | Serveur DNS : les noms gérés localement et le transfert du reste |

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
| …le port **53** (UDP et TCP) depuis `RESEAU_LOCAL` | serveur DNS de la maison |
| …le port SSH | administration du serveur |
| …le ping | diagnostic |
| Trafic entre conteneurs et vers Internet autorisé, avec masquage d'adresse (NAT) | le proxy joint les versions ; les conteneurs peuvent sortir |

> **Ancien bazar de règles** : `flush ruleset` en tête du fichier efface les règles
> nftables existantes, dont celles laissées par Docker. Si votre système utilise encore
> l'ancien « iptables-legacy » (`iptables -V` affiche `legacy`), videz aussi ces règles
> une fois : `sudo iptables -F; sudo iptables -t nat -F; sudo iptables -X; sudo iptables -t nat -X`,
> ou redémarrez le serveur après l'étape 2.

## 4. Lancer les sites et le DNS

Renseignez d'abord `deploy/reseau.env` :

```bash
IP_SERVEUR=192.168.1.50     # adresse IP fixe du serveur (voir étape 5)
DNS_AMONT=192.168.1.254     # DNS de la Freebox, pour tous les autres noms
```

Puis :

```bash
./deploy/versions.sh          # récupère les 3 versions dans versions/
docker compose up -d --build  # lance les 3 versions, le reverse proxy et le DNS
```

Vérification sur le serveur lui-même :

```bash
curl -s -o /dev/null -w "%{http_code}\n" -H "Host: fhdeserable-v1.fr" http://localhost/   # 200
curl -s -o /dev/null -w "%{http_code}\n" -H "Host: fhdeserable-v2.fr" http://localhost/   # 200
curl -s -o /dev/null -w "%{http_code}\n" -H "Host: fhdeserable-v3.fr" http://localhost/   # 200

nslookup fhdeserable-v1.fr 192.168.1.50    # doit répondre « Address: 192.168.1.50 »
nslookup google.fr 192.168.1.50            # doit répondre (nom transmis à la Freebox)
```

Commandes utiles :

```bash
docker compose ps                  # les 5 conteneurs tournent-ils ?
docker compose logs -f proxy       # journaux du reverse proxy (ou site-v1, site-v2, site-v3)
docker compose logs -f dns         # chaque demande DNS sur les trois domaines y apparaît
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

Cette adresse doit être celle de `IP_SERVEUR` dans `deploy/reseau.env`.

## 6. Faire utiliser le DNS du serveur par toute la maison

La Freebox ne permet pas d'ajouter ses propres noms, mais elle permet de choisir le
serveur DNS qu'elle annonce aux appareils (par DHCP). On lui fait annoncer le serveur :

1. Ouvrez Freebox OS : **http://mafreebox.freebox.fr**
2. **Paramètres de la Freebox** › (mode avancé) › **DHCP**.
3. Dans **Serveurs DNS**, mettez **uniquement** l'adresse du serveur : `192.168.1.50`.
   L'emplacement exact peut varier selon la version de Freebox OS.
4. Enregistrez, puis reconnectez les appareils (couper / rallumer le Wi-Fi) pour qu'ils
   reçoivent le nouveau DNS.

Ensuite, depuis n'importe quel appareil : **http://fhdeserable-v1.fr**,
**http://fhdeserable-v2.fr**, **http://fhdeserable-v3.fr**. Les adresses en `www.`
redirigent vers le domaine sans `www`. Tapez bien `http://`. Les lignes ajoutées dans les
fichiers `hosts` ne sont plus nécessaires : vous pouvez les retirer.

> **Pourquoi uniquement le serveur, sans DNS de secours ?** Un appareil qui connaît
> plusieurs DNS les utilise au hasard : avec la Freebox en second, les trois domaines
> fonctionneraient une fois sur deux. Contrepartie : **si le serveur est éteint, plus
> aucun nom ne se résout à la maison** (plus d'Internet « par nom »). Dans ce cas, remettez
> l'adresse de la Freebox (`192.168.1.254`) dans le réglage DHCP.

**Un appareil précis n'utilise pas ce DNS ?** Vous pouvez le régler à la main sur
l'appareil (DNS : `192.168.1.50`), ou garder la méthode du fichier `hosts` pour lui.

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
| Le conteneur `fhdeserable-dns` redémarre en boucle | `IP_SERVEUR` dans `deploy/reseau.env` n'est pas l'adresse du serveur, ou le port 53 est déjà pris (dnsmasq, Pi-hole…) : `docker compose logs dns` et `sudo ss -lunp \| grep ':53 '` |
| `nslookup fhdeserable-v1.fr` sur un appareil n'indique pas le serveur comme « Server » | L'appareil n'a pas reçu le nouveau DNS : reconnectez-le au réseau. Certains appareils utilisent aussi le DNS que la Freebox annonce en IPv6 : réglez alors le DNS à la main sur l'appareil |
| Plus aucun site Internet ne s'ouvre à la maison | Le serveur (ou le conteneur DNS) est arrêté : relancez-le, ou remettez le DNS de la Freebox dans le réglage DHCP |

## Ajouter une version

1. Ajoutez la branche à la ligne `BRANCHES=` de `deploy/versions.sh`.
2. Ajoutez un service `site-v4` dans `docker-compose.yml` sur le modèle des autres.
3. Ajoutez dans `deploy/proxy.conf` les deux blocs `server` pour `fhdeserable-v4.fr`.
4. Ajoutez le nom dans `deploy/Corefile` (ligne de la zone en tête de bloc, et ligne
   dans `hosts`), puis `docker compose up -d --build`.
