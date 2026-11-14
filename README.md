# Site vitrine — François-Henri Désérable

Site statique (HTML/CSS/JS, sans dépendance ni build).

- `index.html` : carrousel des actualités + derniers livres parus
- `publications.html` : livres (filtrables romans / récits), ouvrages collectifs, revues littéraires
- `biographie.html` : biographie et repères chronologiques
- `agenda.html` : rencontres, dédicaces, parutions (passées / à venir triées automatiquement)
- `presse.html` : revue de presse

Mise en ligne avec Docker : voir `DEPLOIEMENT.md`.

## Modifier le contenu

Tout le contenu (actualités, livres, articles) est dans `js/data.js`.

## Ajouter des visuels

Déposez les images dans `images/` puis renseignez le champ `image`
(ex. `image: "images/chagrin.jpg"`) d'une actualité ou d'un livre.
Sans image, le site affiche une couverture typographique générée.
Pour la photo de l'auteur, voir le commentaire dans `biographie.html`.

## Voir le site

Ouvrir `index.html` dans un navigateur, ou :

    python3 -m http.server 8000

## Thème « Noir »

- `css/noir.css` : thème sobre, fond noir, texte blanc, accents ambre (`--ambre`) pour
  les éléments importants (nom de l'auteur, dates, prix, liens). Images en couleur, sauf le portrait de l'auteur (noir et blanc).
- `css/fonts.css` + `fonts/` : polices Cormorant Garamond et Inter hébergées sur le site (licence SIL OFL)
