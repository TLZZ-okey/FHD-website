# Mettre le site en ligne sur le réseau de la maison

Le site tourne dans un conteneur Docker (serveur web nginx) et répond à l'adresse
**http://fhdeserable.fr** depuis tous les appareils connectés à votre box.

Fichiers concernés :

| Fichier | Rôle |
|---|---|
| `Dockerfile` | Construit l'image : nginx + les pages, images, polices du site |
| `deploy/nginx.conf` | Configuration du serveur web (nom de domaine, cache, sécurité) |
| `docker-compose.yml` | Lance le conteneur sur le port 80, redémarrage automatique |
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

## 2. Lancer le site

```bash
docker compose up -d --build
```

Vérifiez sur le serveur lui-même : http://localhost doit afficher le site.

Commandes utiles :

```bash
docker compose ps          # le conteneur tourne-t-il ?
docker compose logs -f     # journaux du serveur web
docker compose down        # arrêter le site
```

Le conteneur redémarre tout seul après une coupure ou un redémarrage du serveur
(`restart: unless-stopped`).

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

Dès maintenant, le site est accessible depuis n'importe quel appareil de la maison via
`http://192.168.1.50` (remplacez par l'adresse de votre serveur).

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

Ensuite, ouvrez **http://fhdeserable.fr** dans un navigateur.
`www.fhdeserable.fr` redirige automatiquement vers `fhdeserable.fr`.

> **À savoir** : si vous n'êtes pas propriétaire du domaine `fhdeserable.fr`, ce
> réglage ne vaut qu'à la maison. Depuis l'extérieur, le nom ne mènera pas à votre
> serveur (ou mènera au site de son vrai propriétaire, s'il en a un). Tapez bien
> `http://` au début : certains navigateurs essaient d'abord `https://`, qui n'est
> pas configuré pour un usage local.

## 5. Mettre à jour le site

Après une modification du contenu (`js/data.js`, images, pages…) :

```bash
git pull
docker compose up -d --build
```

## Pour aller plus loin : accès depuis Internet

Si un jour vous achetez réellement le domaine `fhdeserable.fr` (chez OVH, Gandi…) et
voulez que le site soit visible de l'extérieur, il faudra en plus :

1. faire pointer le domaine vers l'adresse IP publique de votre box (enregistrement DNS `A`) ;
2. ouvrir les ports 80 et 443 de la box vers le serveur (« redirection de ports ») ;
3. ajouter un certificat HTTPS gratuit (Let's Encrypt), par exemple avec Caddy ou
   nginx-proxy-manager devant ce conteneur.

Ce n'est pas nécessaire pour un usage à la maison.
