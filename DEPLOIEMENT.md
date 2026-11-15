# Mettre le site en ligne sur le réseau de la maison

Trois versions du site tournent chacune dans son conteneur Docker (serveur web nginx),
avec **son propre nom de domaine** et **son propre port**, toutes sur le même serveur :

| Nom de domaine | Port | Version | Branche GitHub |
|---|---|---|---|
| **http://fhdeserable-v1.fr** | 8001 | Version d'origine | `master` |
| **http://fhdeserable-v2.fr** | 8002 | Thème Canadiens (bleu-blanc-rouge) | `theme-canadiens` |
| **http://fhdeserable-v3.fr** | 8003 | Thème Noir | `theme-noir` |

## Comment un domaine arrive sur le bon port

Un nom de domaine ne désigne qu'une **adresse IP**, jamais un port : c'est une limite du
DNS. Les trois domaines pointent donc vers la même adresse (celle du serveur), et un
petit **aiguilleur** (le conteneur `fhdeserable-proxy`, un « reverse proxy ») écoute sur
le port 80, le port par défaut des navigateurs. Il lit le nom de domaine demandé et
transmet la visite au bon conteneur :

```
http://fhdeserable-v1.fr ─┐                        ┌─> fhdeserable-v1 (port 8001)
http://fhdeserable-v2.fr ─┼─> serveur, port 80 ────┼─> fhdeserable-v2 (port 8002)
http://fhdeserable-v3.fr ─┘   (fhdeserable-proxy)  └─> fhdeserable-v3 (port 8003)
```

Résultat : on tape simplement `fhdeserable-v2.fr`, sans `:8002`. Les ports 8001 à 8003
restent ouverts : `http://fhdeserable-v2.fr:8002` ou `http://<adresse-du-serveur>:8002`
fonctionnent aussi.

Fichiers concernés :

| Fichier | Rôle |
|---|---|
| `docker-compose.yml` | Lance les 3 sites (ports 8001-8003) et l'aiguilleur (port 80), redémarrage automatique |
| `deploy/proxy.conf` | Configuration de l'aiguilleur : quel domaine va vers quel conteneur |
| `deploy/versions.sh` | Prépare / met à jour le dossier `versions/` : une copie de chaque branche |
| `Dockerfile` | Construit l'image d'une version : nginx + les pages, images, polices |
| `deploy/nginx.conf.template` | Configuration du serveur web d'une version ; son domaine vient de la variable `DOMAINE` de `docker-compose.yml` |
| `.dockerignore` | Exclut de l'image ce qui n'est pas le site (git, documentation…) |

---

## 1. Préparer le serveur

Le serveur peut être n'importe quel ordinateur qui reste allumé : un vieux PC, un
Raspberry Pi, un NAS (Synology, QNAP…) compatible Docker.

1. Installez Docker :
   - Linux / Raspberry Pi : `curl -fsSL https://get.docker.com | sh`
   - Windows ou macOS : [Docker Desktop](https://www.docker.com/products/docker-desktop/)
   - NAS : paquet « Container Manager » (Synology) ou « Container Station » (QNAP)
2. Récupérez le site :
   ```bash
   git clone https://github.com/TLZZ-okey/FHD-website.git
   cd FHD-website
   ```

## 2. Lancer les sites

```bash
./deploy/versions.sh          # récupère les 3 versions dans versions/
docker compose up -d --build  # construit et lance les 3 sites + l'aiguilleur
```

Vérifiez sur le serveur lui-même : http://localhost:8001, http://localhost:8002 et
http://localhost:8003 doivent afficher chacun leur version du site.

Commandes utiles :

```bash
docker compose ps                    # les 4 conteneurs tournent-ils ?
docker compose logs -f site-noir     # journaux d'un service (site-original, site-canadiens, site-noir, proxy)
docker compose restart site-canadiens
docker compose down                  # arrêter tous les sites
```

Les conteneurs redémarrent tout seuls après une coupure ou un redémarrage du serveur
(`restart: unless-stopped`).

> **Le port 80 est déjà pris sur votre serveur ?** (par exemple par l'interface d'un NAS)
> `docker compose up` affichera « port is already allocated ». Deux solutions :
> supprimez le bloc `proxy` de `docker-compose.yml` et utilisez les adresses avec le port
> (`http://fhdeserable-v1.fr:8001`…), ou libérez le port 80 dans les réglages du NAS.

## 3. Donner une adresse fixe au serveur

Pour que les trois domaines pointent toujours au bon endroit, le serveur doit garder la
même adresse IP sur le réseau.

1. Trouvez son adresse : `ip a` (Linux), `ipconfig` (Windows), ou la liste des
   appareils connectés dans l'interface de votre box. Elle ressemble à `192.168.1.50`.
2. Dans l'interface de la box, réservez cette adresse pour le serveur
   (« bail DHCP statique », « réservation d'adresse IP » ou « IP fixe »).
   - Freebox : `mafreebox.freebox.fr` › Paramètres › DHCP › Baux statiques
   - Livebox : `192.168.1.1` › Réseau › DHCP › Adresses IP statiques
   - Bbox : `mabbox.bytel.fr` › Réseau local › DHCP
   - SFR Box : `192.168.1.1` › Réseau › DHCP

Dès maintenant, les sites sont accessibles depuis n'importe quel appareil de la maison via
`http://192.168.1.50:8001`, `:8002` et `:8003` (remplacez par l'adresse de votre serveur).

## 4. Relier les trois noms de domaine au serveur

Les trois domaines (et leur variante `www.`) doivent tous pointer vers **la même adresse
IP**, celle du serveur. Le choix du site se fait ensuite par l'aiguilleur.

### Option A — Pour toute la maison d'un coup (recommandé)

Ajoutez des entrées DNS locales, valables pour tous les appareils, y compris les
téléphones et tablettes :

- **Box compatible** (certaines Freebox, routeurs Asus, OpenWrt…) : cherchez
  « DNS local », « noms d'hôtes » ou « hosts ».
- **Pi-hole ou AdGuard Home** (si vous en avez un) : *Local DNS › DNS Records*
  (Pi-hole) ou *Filtres › Réécritures DNS* (AdGuard).

Entrées à créer (avec l'adresse de votre serveur) :

```
fhdeserable-v1.fr       → 192.168.1.50
www.fhdeserable-v1.fr   → 192.168.1.50
fhdeserable-v2.fr       → 192.168.1.50
www.fhdeserable-v2.fr   → 192.168.1.50
fhdeserable-v3.fr       → 192.168.1.50
www.fhdeserable-v3.fr   → 192.168.1.50
```

### Option B — Appareil par appareil (ordinateurs uniquement)

Ajoutez ces lignes au fichier `hosts` de chaque ordinateur :

```
192.168.1.50   fhdeserable-v1.fr www.fhdeserable-v1.fr
192.168.1.50   fhdeserable-v2.fr www.fhdeserable-v2.fr
192.168.1.50   fhdeserable-v3.fr www.fhdeserable-v3.fr
```

- **Windows** : ouvrez le Bloc-notes *en tant qu'administrateur*, puis
  `C:\Windows\System32\drivers\etc\hosts`
- **macOS / Linux** : `sudo nano /etc/hosts`

Les téléphones et tablettes ne permettent pas de modifier ce fichier : pour eux,
utilisez l'option A ou l'adresse IP avec le port.

Ensuite, ouvrez **http://fhdeserable-v1.fr**, **http://fhdeserable-v2.fr** ou
**http://fhdeserable-v3.fr** dans un navigateur. Les adresses en `www.` redirigent
automatiquement vers le domaine sans `www`.

> **À savoir** : si vous n'êtes pas propriétaire de ces domaines, ce réglage ne vaut
> qu'à la maison. Depuis l'extérieur, ils ne mèneront pas à votre serveur (ou mèneront
> au site de leur vrai propriétaire, s'il en a un). Tapez bien `http://` au début :
> certains navigateurs essaient d'abord `https://`, qui n'est pas configuré pour un
> usage local.

## 5. Mettre à jour les sites

Après une modification envoyée sur GitHub (sur n'importe quelle branche) :

```bash
git pull                      # met à jour docker-compose.yml, l'aiguilleur et le script
./deploy/versions.sh          # récupère la dernière version de chaque branche
docker compose up -d --build  # reconstruit les conteneurs qui ont changé
```

## Changer un domaine, un port, ou ajouter une version

- **Changer un nom de domaine** : modifiez la variable `DOMAINE` du service dans
  `docker-compose.yml` **et** le `server_name` correspondant dans `deploy/proxy.conf`,
  puis `docker compose up -d --build`.
- **Changer un port** : modifiez le premier nombre de la ligne `"8001:80"` dans
  `docker-compose.yml` (port du serveur), puis `docker compose up -d`.
- **Ajouter une version** (une nouvelle branche) : ajoutez son nom à la ligne
  `BRANCHES=` de `deploy/versions.sh`, un bloc de service dans `docker-compose.yml` sur le
  modèle des autres (nouveau domaine, nouveau port 8004…), et un bloc `server` dans
  `deploy/proxy.conf`.

## Pour aller plus loin : accès depuis Internet

Si un jour vous achetez réellement ces domaines (chez OVH, Gandi…) et voulez que les
sites soient visibles de l'extérieur, il faudra en plus :

1. faire pointer chaque domaine vers l'adresse IP publique de votre box (enregistrement DNS `A`) ;
2. ouvrir les ports 80 et 443 de la box vers le serveur (« redirection de ports ») ;
3. ajouter des certificats HTTPS gratuits (Let's Encrypt), par exemple en remplaçant
   l'aiguilleur par Caddy ou nginx-proxy-manager, qui savent les obtenir automatiquement.

Ce n'est pas nécessaire pour un usage à la maison.
