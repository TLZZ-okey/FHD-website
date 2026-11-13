(function () {
  var S = window.SITE;
  var $ = function (sel) { return document.querySelector(sel); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  // Menu mobile
  var burger = $(".burger"), nav = $(".nav");
  if (burger) burger.addEventListener("click", function () {
    var o = nav.classList.toggle("ouvert");
    burger.setAttribute("aria-expanded", o);
  });

  // Année du pied de page
  var an = $("#annee"); if (an) an.textContent = new Date().getFullYear();

  // Couverture (image réelle si fournie, sinon couverture typographique)
  function couverture(l) {
    if (l.image) return '<div class="couverture avec-image"><img src="' + esc(l.image) + '" alt="Couverture de ' + esc(l.titre) + '" loading="lazy"></div>';
    return '<div class="couverture" style="--c:' + esc(l.couleur) + '" role="img" aria-label="Couverture de ' + esc(l.titre) + '">' +
      '<div class="couv-auteur">' + esc(S.auteur) + '</div>' +
      '<div><div class="couv-titre">' + esc(l.titre) + '</div>' +
      (l.sousTitre ? '<div class="couv-sous">' + esc(l.sousTitre) + '</div>' : "") + '</div>' +
      '<div><div class="couv-genre">' + esc(l.genre.toLowerCase()) + '</div>' +
      '<div class="couv-editeur">' + esc(l.editeur) + '</div></div></div>';
  }

  function extrait(texte, max) {
    var t = texte.split("\n")[0];
    if (t.length <= max) return t;
    t = t.slice(0, max);
    return t.slice(0, t.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "") + "…";
  }
  // ---------- Carrousel ----------
  var car = $("#carrousel");
  if (car) {
    var piste = car.querySelector(".carrousel-piste");
    var points = car.querySelector(".carrousel-points");
    var C = S.carrousel;
    var parId = function (id) { return S.livres.filter(function (l) { return l.id === id; })[0]; };
    var MOIS_C = ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
    var auj = new Date(); auj.setHours(0, 0, 0, 0);
    var prochaines = S.agenda.filter(function (e) { return new Date(e.date + "T23:59:59") >= auj; })
      .sort(function (a, b) { return a.date < b.date ? -1 : 1; })
      .slice(0, (C.rencontres && C.rencontres.nombre) || 3);

    function fondHTML(img, opts, teinte) {
      opts = opts || {};
      return '<div class="slide-fond' + (teinte ? " flou" : "") + '" style="background-image:url(\'' + esc(img) + '\');' +
        (opts.positionFond ? "--pos:" + esc(opts.positionFond) + ";" : "") +
        (opts.positionFondMobile ? "--pos-m:" + esc(opts.positionFondMobile) + ";" : "") +
        (opts.tailleFondMobile ? "--taille-m:" + esc(opts.tailleFondMobile) + ";" : "") + '"></div>' +
        (teinte ? '<div class="slide-teinte" style="background:' + esc(teinte) + '"></div>' : "");
    }
    function vignette(l) {
      return '<a class="slide-vignette" href="publications.html#' + esc(l.id) + '" tabindex="-1"><img src="' + esc(l.image) + '" alt="Couverture de ' + esc(l.titre) + '"></a>';
    }
    function slideLivre(l, opts) {
      opts = opts || {};
      var kicker = opts.kicker || (l.genre + " · " + (l.parution || l.annee));
      var texte = opts.texte || extrait(l.resume, 170);
      return fondHTML(opts.fond || l.image, opts, opts.fond ? null : l.couleur) +
        '<div class="conteneur slide-grille"><div class="slide-contenu">' +
        '<div class="slide-kicker">' + esc(kicker) + '</div>' +
        '<h2>' + esc(l.titre) + '</h2>' +
        (l.sousTitre ? '<p class="slide-sous-titre">' + esc(l.sousTitre) + '</p>' : "") +
        (l.prix.length && !opts.kicker ? '<div class="slide-prix">✦ ' + esc(l.prix[0]) + '</div>' : "") +
        '<p>' + esc(texte) + '</p>' +
        '<a class="bouton" href="publications.html#' + esc(l.id) + '">Découvrir le livre</a></div>' +
        vignette(l) + '</div>';
    }
    function slideRencontres() {
      var r = C.rencontres;
      return fondHTML(r.fond, r, null) +
        '<div class="conteneur slide-grille"><div class="slide-contenu">' +
        '<div class="slide-kicker">Agenda</div>' +
        '<h2>Prochaines rencontres</h2>' +
        '<ul class="slide-rencontres">' + prochaines.map(function (e) {
          var d = e.date.split("-").map(Number);
          return '<li><span class="sr-date"><b>' + d[2] + '</b>' + MOIS_C[d[1] - 1] + '</span>' +
            '<span class="sr-texte"><span class="sr-ville">' + esc(e.lieu) + '</span>' +
            '<span class="sr-lieu">' + esc(e.ville) + (e.heure ? ' · ' + esc(e.heure) : "") + '</span></span></li>';
        }).join("") + '</ul>' +
        '<a class="bouton" href="agenda.html">Tout l\'agenda</a></div></div>';
    }

    var slides = [];
    var une = C.une && parId(C.une.livre);
    if (une) slides.push(slideLivre(une, C.une));
    if (C.rencontres && prochaines.length) slides.push(slideRencontres());
    (C.livres || []).forEach(function (id) { var l = parId(id); if (l) slides.push(slideLivre(l)); });

    piste.innerHTML = slides.map(function (html, i) {
      return '<article class="slide" aria-roledescription="diapositive" aria-label="' + (i + 1) + ' sur ' + slides.length + '">' + html + '</article>';
    }).join("");
    points.innerHTML = slides.map(function (_, i) {
      return '<button type="button" aria-label="Aller à la diapositive ' + (i + 1) + '"></button>';
    }).join("");

    var idx = 0, timer = null, total = slides.length;
    function aller(i) {
      idx = (i + total) % total;
      piste.style.transform = "translateX(-" + idx * 100 + "%)";
      Array.prototype.forEach.call(points.children, function (b, j) { b.setAttribute("aria-current", j === idx); });
    }
    function demarrer() {
      arreter();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(function () { aller(idx + 1); }, 6000);
    }
    function arreter() { if (timer) clearInterval(timer); timer = null; }
    car.querySelector(".prec").addEventListener("click", function () { aller(idx - 1); demarrer(); });
    car.querySelector(".suiv").addEventListener("click", function () { aller(idx + 1); demarrer(); });
    Array.prototype.forEach.call(points.children, function (b, j) { b.addEventListener("click", function () { aller(j); demarrer(); }); });
    car.addEventListener("mouseenter", arreter);
    car.addEventListener("mouseleave", demarrer);
    car.addEventListener("focusin", arreter);
    // glisser au doigt
    var x0 = null;
    car.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; arreter(); }, { passive: true });
    car.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) aller(idx + (dx < 0 ? 1 : -1));
      x0 = null; demarrer();
    });
    aller(0); demarrer();
  }

  // ---------- Derniers livres (accueil) : couverture, titre, parution — une colonne ----------
  var derniers = $("#derniers-livres");
  if (derniers) {
    derniers.innerHTML = S.livres.slice(0, 4).map(function (l) {
      return '<a class="carte-livre" href="publications.html#' + esc(l.id) + '">' + couverture(l) +
        '<h3>' + esc(l.titre) + '</h3><div class="meta">Parution : ' + esc(l.parution || l.annee) + '</div></a>';
    }).join("");
  }

  // ---------- Page Publications : ouvrages collectifs et revues ----------
  function enrichir(t) {
    return esc(t)
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }
  function biblio(id, liste) {
    var el = $(id); if (!el || !liste) return;
    el.innerHTML = liste.map(function (e) {
      return '<li><span class="biblio-titre">' + enrichir(e.titre) + '</span>' + (/^\(/.test(e.details) ? " " : ", ") + '<span class="biblio-details">' + enrichir(e.details) + '</span></li>';
    }).join("");
  }
  biblio("#liste-collectifs", S.collectifs);
  biblio("#liste-revues", S.revues);

  // ---------- Page Publications : livres ----------
  var catalogue = $("#catalogue");
  if (catalogue) {
    catalogue.innerHTML = S.livres.map(function (l) {
      return '<article class="livre-detail" id="' + esc(l.id) + '">' + couverture(l) + '<div>' +
        '<div class="annee">' + l.annee + '</div>' +
        '<h2>' + esc(l.titre) + '</h2>' +
        (l.sousTitre ? '<p class="sous-titre">' + esc(l.sousTitre) + '</p>' : "") +
        '<div class="infos">' + esc(l.genre) + ' · ' + esc(l.editeur) + '</div>' +
        '<div class="resume">' + l.resume.split("\n").map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '</div>' +
        (l.prix.length ? '<ul class="prix-liste">' + l.prix.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" : "") +
        '</div></article>';
    }).join("");
    if (location.hash) { var cible = document.getElementById(location.hash.slice(1)); if (cible) cible.scrollIntoView(); }
  }

  // ---------- Page Agenda (+ aperçu sur l'accueil) ----------
  var MOIS = ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  function evenementHTML(e, passe) {
    var d = e.date.split("-").map(Number);
    var titre = e.url ? '<a href="' + esc(e.url) + '" target="_blank" rel="noopener">' + esc(e.titre) + '</a>' : esc(e.titre);
    return '<li class="evenement' + (passe ? " passe" : "") + '">' +
      '<div class="ev-date"><div class="ev-jour">' + d[2] + '</div><div class="ev-mois">' + MOIS[d[1] - 1] + ' ' + d[0] + '</div></div>' +
      '<div><div class="ev-type">' + esc(e.type) + (e.heure ? ' · ' + esc(e.heure) : "") + '</div>' +
      '<h3>' + titre + '</h3><div class="ev-lieu">' + esc(e.lieu) + (e.adresse ? ', ' + esc(e.adresse) : "") + ' — ' + esc(e.ville) + '</div></div></li>';
  }
  var aujourdhui = new Date(); aujourdhui.setHours(0, 0, 0, 0);
  var estPasse = function (e) { return new Date(e.date + "T23:59:59") < aujourdhui; };
  var aVenir = S.agenda.filter(function (e) { return !estPasse(e); }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  var passes = S.agenda.filter(estPasse).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  var ag = $("#agenda-a-venir");
  if (ag) {
    ag.innerHTML = aVenir.length ? aVenir.map(function (e) { return evenementHTML(e, false); }).join("") : '<li class="agenda-vide">Aucune date annoncée pour le moment.</li>';
    $("#agenda-passes").innerHTML = passes.map(function (e) { return evenementHTML(e, true); }).join("");
  }
  var agAccueil = $("#agenda-accueil");
  if (agAccueil) {
    if (aVenir.length) agAccueil.innerHTML = aVenir.slice(0, 3).map(function (e) { return evenementHTML(e, false); }).join("");
    else agAccueil.closest("section").hidden = true;
  }

  // ---------- Page Presse ----------
  var presse = $("#presse");
  if (presse) {
    presse.innerHTML = S.presse.map(function (a) {
      var titre = a.url ? '<a href="' + esc(a.url) + '" target="_blank" rel="noopener">' + esc(a.titre) + '</a>' : esc(a.titre);
      return '<li class="article"><div><div class="media">' + esc(a.media) + '</div><div class="date">' + esc(a.date) + '</div></div>' +
        '<div><h2>' + titre + '</h2><p>' + esc(a.extrait) + '</p>' +
        '<span class="livre-lie">' + esc(a.livre) + '</span>' +
        (a.url ? '<a class="lire" href="' + esc(a.url) + '" target="_blank" rel="noopener">Lire l\'article →</a>' : "") +
        '</div></li>';
    }).join("");
  }
})();
