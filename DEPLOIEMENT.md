# Mettre le site en ligne sur le réseau de la maison

Le site tourne dans des conteneurs Docker (serveurs web nginx), **un par version** du
site, chacun sur son propre port, accessibles depuis tous les appareils de la maison :

| Port | Version | Branche GitHub | Adresse |
|---|---|---|---|
| **8001** | Version d'origine | `master` | http://fhdeserable.fr:8001 |
| **8002** | Thème Canadiens (bleu-blanc-rouge) | `theme-canadiens` | http://fhdeserable.fr:8002 |
| **8003** | Thème Noir | `theme-noir` | http://fhdeserable.fr:8003 |

Fichiers concernés :

| Fichier | Rôle |
|---|---|
| `docker-compose.yml` | Lance les 3 conteneurs (ports 8001, 8002, 8003), redémarrage automatique |
| `deploy/versions.sh` | Prépare / met à jour le dossier `versions/` : une copie de chaque branche |
| `Dockerfile` | Construit l'image d'une version : nginx + les pages, images, polices |
| `deploy/nginx.conf` | Configuration du serveur web (nom de domaine, cache, sécurité) |
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
docker compose up -d --build  # construit et lance les 3 conteneurs
```

Vérifiez sur le serveur lui-même : http://localhost:8001, http://localhost:8002 et
http://localhost:8003 doivent afficher chacun leur version du site.

Commandes utiles :

```bash
docker compose ps                    # les 3 conteneurs tournent-ils ?
docker compose logs -f site-noir     # journaux d'un serveur (site-original, site-canadiens, site-noir)
docker compose restart site-canadiens
docker compose down                  # arrêter tous les sites
```

Les conteneurs redémarrent tout seuls après une coupure ou un redémarrage du serveur
(`restart: unless-stopped`).

**Changer un port** : dans `docker-compose.yml`, modifiez le premier nombre de la ligne
`"8001:80"` (port du serveur), puis relancez `docker compose up -d`.

**Ajouter une version** (une nouvelle branche) : ajoutez son nom à la ligne `BRANCHES=`
de `deploy/versions.sh`, et un bloc de service dans `docker-compose.yml` sur le modèle des
autres, avec un nouveau port (8004…).

## 3. Donner une adresse fixe au serveur

Pour que `fhdeserable.fr` pointe toujours au bon endroit, le serveur doit garder la
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

## 4. Utiliser le nom de domaine fhdeserable.fr

Il faut indiquer aux appareils de la maison que `fhdeserable.fr` correspond à
l'adresse du serveur. Deux possibilités :

### Option A — Pour toute la maison d'un coup (recommandé)

Ajoutez une entrée DNS locale, valable pour tous les appareils, y compris les
téléphones et tablettes :

- **Box compatible** (certaines Freebox, routeurs Asus, OpenWrt…) : cherchez
  « DNS local », « noms d'hôtes » ou « hosts » et ajoutez
  `fhdeserable.fr → 192.168.1.50` et `www.fhdeserable.fr → 192.168.1.50`.
- **Pi-hole ou AdGuard Home** (si vous en avez un) : *Local DNS › DNS Records*
  (Pi-hole) ou *Filtres › Réécritures DNS* (AdGuard), mêmes entrées.

### Option B — Appareil par appareil (ordinateurs uniquement)

Ajoutez ces deux lignes au fichier `hosts` de chaque ordinateur :

```
192.168.1.50   fhdeserable.fr
192.168.1.50   www.fhdeserable.fr
```

- **Windows** : ouvrez le Bloc-notes *en tant qu'administrateur*, puis
  `C:\Windows\System32\drivers\etc\hosts`
- **macOS / Linux** : `sudo nano /etc/hosts`

Les téléphones et tablettes ne permettent pas de modifier ce fichier : pour eux,
utilisez l'option A ou l'adresse IP directement.

Ensuite, ouvrez **http://fhdeserable.fr:8001** (ou `:8002`, `:8003`) dans un navigateur.
`www.fhdeserable.fr` redirige automatiquement vers `fhdeserable.fr`, en gardant le port.

Le port à la fin de l'adresse est nécessaire : sans lui, le navigateur s'adresse
au port 80, où aucun site ne répond.

> **À savoir** : si vous n'êtes pas propriétaire du domaine `fhdeserable.fr`, ce
> réglage ne vaut qu'à la maison. Depuis l'extérieur, le nom ne mènera pas à votre
> serveur (ou mènera au site de son vrai propriétaire, s'il en a un). Tapez bien
> `http://` au début : certains navigateurs essaient d'abord `https://`, qui n'est
> pas configuré pour un usage local.

## 5. Mettre à jour les sites

Après une modification envoyée sur GitHub (sur n'importe quelle branche) :

```bash
git pull                      # met à jour docker-compose.yml et le script
./deploy/versions.sh          # récupère la dernière version de chaque branche
docker compose up -d --build  # reconstruit les conteneurs qui ont changé
```

## Pour aller plus loin : accès depuis Internet

Si un jour vous achetez réellement le domaine `fhdeserable.fr` (chez OVH, Gandi…) et
voulez que le site soit visible de l'extérieur, il faudra en plus :

1. faire pointer le domaine vers l'adresse IP publique de votre box (enregistrement DNS `A`) ;
2. ouvrir les ports 80 et 443 de la box vers le serveur (« redirection de ports ») ;
3. ajouter un certificat HTTPS gratuit (Let's Encrypt), par exemple avec Caddy ou
   nginx-proxy-manager devant ces conteneurs.

Ce n'est pas nécessaire pour un usage à la maison.
