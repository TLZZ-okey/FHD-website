# Site vitrine François-Henri Désérable — serveur web nginx léger
FROM nginx:1.27-alpine

# Configuration du serveur (nom de domaine fhdeserable.fr)
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Fichiers du site
COPY index.html publications.html biographie.html agenda.html presse.html favicon.ico /usr/share/nginx/html/
COPY css/    /usr/share/nginx/html/css/
COPY js/     /usr/share/nginx/html/js/
COPY images/ /usr/share/nginx/html/images/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
