#!/bin/sh
# Assemble le site GitHub Pages dans un dossier :
#   <dossier>/index.html   page d'accueil qui présente les trois versions
#   <dossier>/v1/          branche master          (version d'origine)
#   <dossier>/v2/          branche theme-canadiens (thème Canadiens)
#   <dossier>/v3/          branche theme-noir      (thème Noir)
# Seuls les fichiers du site sont copiés (pas Docker, le pare-feu, la documentation…).
#
# Usage : ./deploy/construire-pages.sh _site
set -e
cd "$(dirname "$0")/.."

SORTIE="${1:-_site}"
if [ -e "$SORTIE" ]; then
  echo "Le dossier « $SORTIE » existe déjà : choisissez-en un autre ou supprimez-le." >&2
  exit 1
fi

# Correspondance chemin -> branche
VERSIONS="v1:master v2:theme-canadiens v3:theme-noir"
# Éléments du site à publier (ceux qui n'existent pas dans une branche sont ignorés)
FICHIERS="index.html publications.html biographie.html agenda.html presse.html favicon.ico css js images fonts"

mkdir -p "$SORTIE"
for v in $VERSIONS; do
  chemin="${v%%:*}"; branche="${v#*:}"
  git fetch --quiet --depth=1 origin "$branche"
  presents=""
  for f in $FICHIERS; do
    if git cat-file -e "FETCH_HEAD:$f" 2>/dev/null; then presents="$presents $f"; fi
  done
  mkdir -p "$SORTIE/$chemin"
  # shellcheck disable=SC2086
  git archive FETCH_HEAD $presents | tar -x -C "$SORTIE/$chemin"
  echo "$chemin/ <- $branche ($(git rev-parse --short FETCH_HEAD))"
done

cp deploy/pages/index.html "$SORTIE/index.html"
touch "$SORTIE/.nojekyll"   # publier les fichiers tels quels, sans traitement Jekyll
echo "Site assemblé dans $SORTIE/"
