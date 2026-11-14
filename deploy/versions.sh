#!/bin/sh
# Prépare ou met à jour les dossiers versions/<branche>, utilisés par docker-compose.yml.
# Chaque dossier contient la dernière version d'une branche du dépôt GitHub.
# Usage : ./deploy/versions.sh   (puis : docker compose up -d --build)
set -e
cd "$(dirname "$0")/.."

BRANCHES="master theme-canadiens theme-noir"

git fetch origin $BRANCHES
for b in $BRANCHES; do
  dossier="versions/$b"
  if [ -d "$dossier" ]; then
    echo "Mise à jour de $dossier"
    git -C "$dossier" checkout --quiet --force --detach "origin/$b"
  else
    echo "Création de $dossier"
    git worktree add --quiet --force --detach "$dossier" "origin/$b"
  fi
done
echo "Versions prêtes. Lancez : docker compose up -d --build"
