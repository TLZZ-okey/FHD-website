/*
 * Contenu du site — à modifier ici.
 * Pour remplacer un visuel généré par une vraie image (couverture, photo),
 * déposez le fichier dans /images et renseignez le champ `image`
 * (ex. image: "images/chagrin.jpg").
 * Dans les résumés, chaque retour à la ligne crée un nouveau paragraphe.
 */
window.SITE = {
  auteur: "François-Henri Désérable",

  // Carrousel de la page d'accueil
  //  1. « une » : le livre mis en avant, avec une illustration en fond et sa couverture en vignette
  //  2. « rencontres » : les prochaines dates de l'agenda (calculées automatiquement)
  //  3. « livres » : les livres suivants (fond = couverture floutée, ou `fond` si précisé)
  carrousel: {
    une: {
      livre: "palais",
      fond: "images/palais-illustration.jpg",
      positionFond: "center 72%",
      positionFondMobile: "center 100%",
      tailleFondMobile: "auto 190%",
      kicker: "Roman · Prix Renaudot 2026",
      texte: "Des bidonvilles de Delhi aux caves de Bourgogne, un grand roman d'aventures sur le vin, portrait d'un génie hors la loi dont les crimes se dégustent."
    },
    rencontres: {
      nombre: 3,
      fond: "images/portrait.jpg",
      positionFond: "center 30%"
    },
    livres: ["chagrin", "usure", "maitre"]
  },

  // Livres (du plus récent au plus ancien)
  livres: [
    {
      id: "palais",
      titre: "Le Palais",
      parution: "20 août 2026",
      annee: 2026,
      editeur: "Gallimard",
      genre: "Roman",
      couleur: "#5c1a33",
      image: "images/palais.jpg",
      resume: "Arun Kumar est doté d’un palais absolu — une mémoire des arômes si infaillible qu’elle confine au prodige. Ce don extraordinaire, il entend bien en faire l’instrument de sa revanche. Reste à découvrir comment. Et contre qui.\nDes bidonvilles de Delhi aux caves de Bourgogne, des îles Marquises aux tours de Manhattan, François-Henri Désérable signe avec Le Palais un grand roman d’aventures sur le vin, portrait d’un génie hors la loi dont les crimes se dégustent.",
      prix: ["Prix Renaudot 2026"]
    },
    {
      id: "chagrin",
      titre: "Chagrin d'un chant inachevé",
      sousTitre: "Sur la route de Che Guevara",
      parution: "Mai 2025",
      annee: 2025,
      editeur: "Gallimard",
      genre: "Récit",
      couleur: "#8a3b1f",
      image: "images/chagrin.jpg",
      resume: "« Cet automne-là, les taux d’intérêt étaient en baisse, les prix de l’immobilier en hausse, ma famille, mes amis s’inquiétaient : est-ce qu’il n’était pas temps que j’investisse dans la pierre ? Avec un peu de chance et un banquier indulgent, je pouvais peut-être m’endetter sur trente ans (mon âge à l’époque). Je n’en avais ni les moyens ni l’envie. Signant un acte de vente, j’aurais eu la sensation de signer mon propre registre d’écrou — et de voir ma liberté circonscrite à quelques mètres carrés. Et puis un appartement, ça se meuble ; aux meubles, il faudrait toujours préférer son sac de voyage. »\nDe Buenos Aires à Caracas, François-Henri Désérable nous embarque dans une formidable traversée de l’Amérique du Sud. Cinq mois à moto, en stop, en bateau, avec une seule contrainte : emprunter l’itinéraire qui fut celui d’Alberto Granado et d’Ernesto « Che » Guevara, lors du fameux voyage à motocyclette, soixante-cinq ans plus tôt.",
      prix: []
    },
    {
      id: "usure",
      titre: "L'usure d'un monde",
      sousTitre: "Une traversée de l'Iran",
      parution: "4 mai 2023",
      annee: 2023,
      editeur: "Gallimard",
      genre: "Récit de voyage",
      couleur: "#1f3a4d",
      image: "images/usure.jpg",
      resume: "« La peur était pour le peuple iranien une compagne de chaque instant, la moitié fidèle d’une vie. Les Iraniens vivaient avec dans la bouche le goût sablonneux de la peur. Seulement, depuis la mort de Mahsa Amini, la peur était mise en sourdine : elle s’effaçait au profit du courage. »\nFin 2022, au plus fort de la répression contre les manifestations qui suivent la mort de Mahsa Amini, François-Henri Désérable passe quarante jours en Iran, qu’il traverse de part en part, de Téhéran aux confins du Baloutchistan. Arrêté par les Gardiens de la révolution, sommé de quitter le pays, il en revient avec ce récit dans lequel il raconte l’usure d’un monde : celui d’une République islamique aux abois, qui réprime dans le sang les aspirations de son peuple.",
      prix: ["Prix Montaigne 2024"]
    },
    {
      id: "maitre",
      titre: "Mon maître et mon vainqueur",
      parution: "Août 2021",
      annee: 2021,
      editeur: "Gallimard",
      genre: "Roman",
      couleur: "#6b1d2a",
      image: "images/maitre.jpg",
      resume: "« Le cahier, c’était la première chose que m’avait montrée le juge, quand tout à l’heure j’étais entré dans son bureau. Sous la couverture souple et transparente, on pouvait lire au feutre noir : MON MAÎTRE ET MON VAINQUEUR.\nSur les pages suivantes, il y avait des poèmes. Voilà ce qu’on avait retrouvé sur Vasco : le revolver, un cahier noirci d’une vingtaine de poèmes et, plus tard, après expertise balistique, des résidus de poudre sur ses mains.\nVoilà ce qu’il en restait, j’ai pensé, de son histoire d’amour. »",
      prix: ["Grand Prix du roman de l'Académie française 2021"]
    },
    {
      id: "piekielny",
      titre: "Un certain M. Piekielny",
      parution: "17 août 2017",
      annee: 2017,
      editeur: "Gallimard",
      genre: "Roman",
      couleur: "#3d4a2f",
      image: "images/piekielny.jpg",
      resume: "« \"Quand tu rencontreras de grands personnages, des hommes importants, promets-moi de leur dire : au n° 16 de la rue Grande-Pohulanka, à Wilno, habitait M. Piekielny...\"\nQuand il fit la promesse à ce M. Piekielny, son voisin, qui ressemblait à \"une souris triste\", Roman Kacew était enfant. Devenu adulte, résistant, diplomate, écrivain sous le nom de Romain Gary, il s’en est toujours acquitté : \"Des estrades de l’ONU à l’Ambassade de Londres, du Palais Fédéral de Berne à l’Élysée, devant Charles de Gaulle et Vichinsky, devant les hauts dignitaires et les bâtisseurs pour mille ans, je n’ai jamais manqué de mentionner l’existence du petit homme\", raconte-t-il dans La promesse de l’aube, son autobiographie romancée.\nUn jour de mai, des hasards m’ont jeté devant le n° 16 de la rue Grande-Pohulanka. J’ai décidé, ce jour-là, de partir à la recherche d’un certain M. Piekielny. »",
      prix: ["Sélectionné pour les six grands prix de la rentrée 2017"]
    },
    {
      id: "evariste",
      titre: "Évariste",
      parution: "Janvier 2015",
      annee: 2015,
      editeur: "Gallimard",
      genre: "Roman",
      couleur: "#2b2b4a",
      image: "images/evariste.jpg",
      resume: "À quinze ans, Évariste Galois découvre les mathématiques ; à dix-huit, il les révolutionne ; à vingt, il meurt en duel. Il a connu Raspail, Nerval, Dumas, Cauchy, les Trois Glorieuses et la prison, le miracle de la dernière nuit, l'amour et la mort à l'aube, sur le pré.\nC'est cette vie fulgurante, cette vie qui fut un crescendo tourmenté, au rythme marqué par le tambour de passions frénétiques, qui nous est ici racontée.",
      prix: ["Prix des lecteurs L'Express – BFMTV", "Prix de la biographie"]
    },
    {
      id: "tete",
      titre: "Tu montreras ma tête au peuple",
      parution: "5 avril 2013",
      annee: 2013,
      editeur: "Gallimard",
      genre: "Récits",
      couleur: "#4a2b2b",
      image: "images/tete.jpg",
      resume: "Paris, pendant la Révolution.\nOn y croise Charlotte Corday, dans sa cellule, pendant qu’un élève de David achève son portrait ; Adam Lux, un allemand tombé amoureux d’elle dans des circonstances pour le moins inattendues ; les Girondins, la fameuse nuit de leur dernier banquet à la Conciergerie ; Danton, pendant son ultime voyage jusqu’à la place de la Révolution ; le plus grand esprit français du XVIIIᵉ siècle, qui nous apprend comment mourir avec élégance ; mais aussi Marie-Antoinette et Robespierre, le marquis de Lantenac et André Chénier.\nTous, dans les jours, les heures ou les minutes précédant la chute de leur tête dans le panier du bourreau.",
      prix: ["Prix de la Vocation"]
    }
  ],

  // Ouvrages collectifs (préfaces, postfaces, nouvelles).
  // *texte* = italique ; [texte](https://…) = lien.
  collectifs: [
    { titre: "« Le monde en trois lettres »", details: "préface à *Noir et autres nouvelles*, Prix du Jeune Écrivain, Buchet-Chastel, 2020." },
    { titre: "*Mes amis*, d’Emmanuel Bove", details: "postface, Le Livre de Poche, 2018." },
    { titre: "Préface aux *Sept générations d’exécuteurs. Mémoires des Sanson*", details: "éd. Perrin, coll. « Tempus », 2015." },
    { titre: "*Clic ! Clac ! Boum !*", details: "nouvelle de l’ouvrage *Histoires en creux*, éd. Buchet/Chastel, collectif rassemblant les textes des lauréats du Prix du Jeune Écrivain, 2012." }
  ],

  // Textes parus en revues littéraires (même syntaxe).
  revues: [
    { titre: "« Un homme averti »", details: "Revue Bastille, n° 14, février 2023." },
    { titre: "« Looking for Süskind »", details: "JDD Magazine, n° 2, novembre 2022." },
    { titre: "« Faux cachemire au Cachemire »", details: "Revue Bastille, n° 11, novembre 2022." },
    { titre: "« Aimer comme on aime quand on aime une fois dans sa vie »", details: "France Inter, été 2022." },
    { titre: "« La lettre et la Loire »", details: "Zadig, n° 13, mars 2022." },
    { titre: "« La vie est ailleurs »", details: "Décapage, n° 64, Automne-hiver 2021." },
    { titre: "« Carnets »", details: "Décapage, n° 63, Printemps-été 2021." },
    { titre: "« Tout est déjà dans les livres »", details: "Tracts, 20 mars 2020." },
    { titre: "« Au cœur de la BnF »", details: "Revue de la BnF, 2020/2, n° 61, octobre 2020." },
    { titre: "« La tête à l’envers – en Nouvelle-Zélande »", details: "Holiday, mars 2019." },
    { titre: "« Le Super Bowl ? Quel Super Bowl ? Une semaine à La Nouvelle-Orléans »", details: "Revue Long Cours, 2019." },
    { titre: "« On montrera… »", details: "Décapage, n° 60, printemps-été 2019." },
    { titre: "« Cette jolie jupe retroussée – À Manosque, chez Giono »", details: "La Nouvelle Revue Française, n° 634, janvier 2019." },
    { titre: "« Beatnik, bums and billionaires – à San Francisco »", details: "America, n° 7, automne 2018." },
    { titre: "« Mille roses rouges et blanches dans la maison bleue »", details: "Le 1, Hors-série 2018." },
    { titre: "« Une demi-heure sur le Boulevard Saint-Germain »", details: "(Emilie Raja), Décapage, n° 58, hiver-printemps 2018." },
    { titre: "« Et vous, je vous en pose des questions ? »", details: "Décapage, n° 57, été-automne 2017." },
    { titre: "« Michon le père »", details: "Cahier de l’Herne Pierre Michon, novembre 2017." },
    { titre: "« Deux hasards en octobre »", details: "Revue Décapage, [n°56](http://revuedecapage.blogspot.fr/search/label/NUM%C3%89RO%2056), hiver-printemps 2017." },
    { titre: "« Une pêche d’enfer »", details: "Revue Desports, [n° 9](http://www.editions-du-sous-sol.com/publication/desports-9/), juillet 2016." },
    { titre: "« Le jour où mon manuscrit a été accepté : Le vol va bien se passer »", details: "Revue Décapage, [n° 53](http://revuedecapage.blogspot.fr/search/label/NUM%C3%89RO%2053), été-automne 2015." },
    { titre: "« Une étoile filante »", details: "Revue Desports, [n° 6](http://www.boutique-feuilleton.fr/numero-de-la-revue-desports-xml-353_356-862.html), juin 2015." },
    { titre: "« Une lettre pour le Rimbaud des mathématiques : Évariste Galois »", details: "Revue Décapage, [n° 52](http://revuedecapage.blogspot.fr/search/label/NUM%C3%89RO%2052), hiver-printemps 2015." },
    { titre: "« Pour saluer M. Piekielny (et Romain Gary) »", details: "Revue L’Infini, [n° 129](http://www.gallimard.fr/Catalogue/GALLIMARD/Revue-L-Infini/L-Infini127), automne 2014." },
    { titre: "« Portrait de l’auteur en mètres carré »", details: "Revue Décapage, [n° 51](http://revuedecapage.blogspot.fr/search/label/NUM%C3%89RO%2051), automne-hiver 2014." },
    { titre: "« Les canulars littéraires »", details: "avec Clément Bénech, Revue Décapage, [n° 50](http://revuedecapage.blogspot.fr/search/label/NUM%C3%89RO%2050), printemps-été 2014." },
    { titre: "« Quelques jours à Beyrouth »", details: "Revue L’Infini, [n° 126](http://www.gallimard.fr/Catalogue/GALLIMARD/Revue-L-Infini/L-Infini124), mars 2014." },
    { titre: "« 1820 signes »", details: "Revue Décapage, [n° 49](http://revuedecapage.blogspot.fr/search/label/NUM%C3%89RO%2049), hiver-printemps 2014." },
    { titre: "« Sur les toits »", details: "nouvelle illustrée par Élis Wilk, Revue Décapage, [n° 48](http://revuedecapage.blogspot.fr/search/label/NUM%C3%89RO%2048), automne-hiver 2013." }
  ],

  // Agenda : date au format AAAA-MM-JJ. Les dates passées sont classées automatiquement.
  agenda: [
    {
      date: "2026-11-18",
      heure: "19h30",
      type: "Rencontre",
      titre: "Rencontre autour du Palais",
      lieu: "Librairie Masséna, 55 rue Gioffredo",
      ville: "Nice",
      url: ""
    },
    {
      date: "2026-11-17",
      heure: "18h30",
      type: "Rencontre",
      titre: "Rencontre autour du Palais",
      lieu: "Librairie Autour d'un livre, 17 rue Jean Jaurès",
      ville: "Cannes",
      url: ""
    },
    {
      date: "2026-11-14",
      heure: "11h",
      type: "Rencontre",
      titre: "Rencontre autour du Palais",
      lieu: "Médiathèque des 4C, 7 rue des Cordeliers",
      ville: "Lons-le-Saunier",
      url: ""
    },
    {
      date: "2026-11-24",
      heure: "19h30",
      type: "Rencontre",
      titre: "Rencontre autour du Palais",
      lieu: "Librairie du Centre",
      ville: "Ferney-Voltaire (Ain)",
      url: "https://www.paysdegex-montsjura.com/en/events/an-interview-with-francois-henri-deserable-author-of-the-book-le-palais-published-by-gallimard/"
    },
    {
      date: "2026-11-16",
      heure: "17h30 – 19h",
      type: "Rencontre & dédicace",
      titre: "Rencontre autour du Palais",
      lieu: "Librairie Maupetit, 142 La Canebière",
      ville: "Marseille",
      url: "https://www.librairesdusud.com/rencontre/rencontre-avec-francois-henri-deserable/"
    },
    {
      date: "2026-11-13",
      heure: "14h30",
      type: "Rencontre",
      titre: "Rencontre avec les lecteurs, après le prix Renaudot",
      lieu: "Siège du Bien public",
      ville: "Dijon",
      url: "https://inforadar.fr/a-dijon-le-prix-renaudot-precede-la-rencontre-avec-francois-henri-deserable"
    },
    {
      date: "2026-11-03",
      type: "Prix littéraire",
      titre: "Prix Renaudot 2026 pour Le Palais",
      lieu: "Restaurant Drouant",
      ville: "Paris",
      url: "https://www.livreshebdo.fr/article/francois-henri-deserable-laureat-du-prix-renaudot-2026"
    },
    {
      date: "2026-08-20",
      type: "Parution",
      titre: "Parution du Palais",
      lieu: "Gallimard",
      ville: "En librairie",
      url: ""
    }
  ],

  // Articles de presse (du plus récent au plus ancien)
  presse: [
    {
      media: "Livres Hebdo",
      date: "3 novembre 2026",
      titre: "François-Henri Désérable, lauréat du prix Renaudot 2026",
      extrait: "Le jury du centenaire couronne Le Palais, annoncé juste après le Goncourt attribué à Philippe Jaenada.",
      livre: "Le Palais",
      url: "https://www.livreshebdo.fr/article/francois-henri-deserable-laureat-du-prix-renaudot-2026"
    },
    {
      media: "ActuaLitté",
      date: "3 novembre 2026",
      titre: "Prix Renaudot 2026 : François-Henri Désérable couronné",
      extrait: "Le Palais remporte le prix Renaudot, l'année de son centenaire.",
      livre: "Le Palais",
      url: "https://actualitte.com/article/135023/prix-litteraires/prix-renaudot-2026-francois-henri-deserable-couronne"
    },
    {
      media: "Ouest-France",
      date: "3 novembre 2026",
      titre: "Le prix Renaudot 2026 décerné à François-Henri Désérable pour « Le Palais »",
      extrait: "L'annonce du lauréat du prix Renaudot.",
      livre: "Le Palais",
      url: "https://www.ouest-france.fr/culture/livres/prix-renaudot/le-prix-renaudot-2026-decerne-a-francois-henri-deserable-pour-le-palais-5ba238c0-d766-11f1-a1e1-ae8104d72c9a"
    },
    {
      media: "La Libre Belgique",
      date: "3 novembre 2026",
      titre: "Prix Renaudot 2026 : François-Henri Désérable lauréat pour « Le Palais »",
      extrait: "Le roman sur le vin remporte le prix.",
      livre: "Le Palais",
      url: "https://www.lalibre.be/culture/livres-bd/2026/11/03/prix-renaudot-2026-francois-henri-deserable-laureat-pour-le-palais-A7Y3E6PXJ5AHDA6X3DTBFPT2NA/"
    },
    {
      media: "RTBF",
      date: "3 novembre 2026",
      titre: "Le prix Renaudot 2026 attribué à François-Henri Désérable pour « Le Palais »",
      extrait: "L'annonce du prix en Belgique.",
      livre: "Le Palais",
      url: "https://www.rtbf.be/article/le-prix-renaudot-2026-attribue-a-francois-henri-deserable-pour-le-palais-11809873"
    },
    {
      media: "Vinetur",
      date: "Novembre 2026",
      titre: "François-Henri Désérable remporte le prix Renaudot 2026 avec son roman consacré au vin",
      extrait: "Le regard de la presse du vin sur Le Palais.",
      livre: "Le Palais",
      url: "https://www.vinetur.com/fr/20261107110562/francois-henri-deserable-won-the-2026-prix-renaudot-for-his-wine-novel-le-palais.html"
    },
    {
      media: "L'Éclaireur Fnac",
      date: "2026",
      titre: "Le Palais : que vaut le roman de François-Henri Désérable sur le vin ?",
      extrait: "Critique du roman.",
      livre: "Le Palais",
      url: "https://leclaireur.fnac.com/article/687433-francois-henri-deserable-le-palais-que-vaut-son-roman-sur-le-vin-avis/"
    },
    {
      media: "ActuaLitté",
      date: "Août 2026",
      titre: "Le Palais : quand François-Henri Désérable fait du vin une grande aventure romanesque",
      extrait: "Avant-critique du roman de la rentrée.",
      livre: "Le Palais",
      url: "https://actualitte.com/article/132095/avant-critiques/le-palais-quand-francois-henri-deserable-fait-du-vin-une-grande-aventure-romanesque"
    },
    {
      media: "Gilles Pudlowski – Les pieds dans le plat",
      date: "2026",
      titre: "François-Henri Désérable : dans le grand monde des vins et des imposteurs",
      extrait: "Chronique du Palais.",
      livre: "Le Palais",
      url: "https://www.gillespudlowski.com/?p=434488"
    },
    {
      media: "Gilles Pudlowski – Les pieds dans le plat",
      date: "2025",
      titre: "Désérable, voyageur intrépide",
      extrait: "Sur Chagrin d'un chant inachevé, le récit sud-américain sur les traces du Che.",
      livre: "Chagrin d'un chant inachevé",
      url: "https://www.gillespudlowski.com/?p=402042"
    },
    {
      media: "World Literature Today",
      date: "Juillet 2024",
      titre: "L'Usure d'un monde : une traversée de l'Iran",
      extrait: "À la fois récit de voyage et enquête journalistique sur un ordre politique répressif.",
      livre: "L'usure d'un monde",
      url: "https://www.worldliteraturetoday.org/2024/july/lusure-dun-monde-une-traversee-de-liran-francois-henri-deserable"
    },
    {
      media: "Livres Hebdo",
      date: "2023",
      titre: "L'usure d'un monde. Une traversée de l'Iran",
      extrait: "Présentation du récit iranien paru chez Gallimard en mai 2023.",
      livre: "L'usure d'un monde",
      url: "https://www.livreshebdo.fr/article/francois-henri-deserable-lusure-dun-monde-une-traversee-de-liran-gallimard"
    },
    {
      media: "Gilles Pudlowski – Les pieds dans le plat",
      date: "2023",
      titre: "L'usure d'un monde de François-Henri Désérable",
      extrait: "Chronique du récit de voyage en Iran.",
      livre: "L'usure d'un monde",
      url: "https://www.gillespudlowski.com/?p=346437"
    },
    {
      media: "ActuaLitté",
      date: "Octobre 2021",
      titre: "« Mes humanités, je les ai faites dans une patinoire »",
      extrait: "Entretien avec le lauréat du Grand Prix du roman : le hockey, Belle du Seigneur, et la naissance d'une vocation.",
      livre: "Mon maître et mon vainqueur",
      url: "https://actualitte.com/article/103149/prix-litteraires/francois-henri-deserable-mes-humanites-je-les-ai-faites-dans-une-patinoire"
    },
    {
      media: "Le Monde",
      date: "28 octobre 2021",
      titre: "François-Henri Désérable reçoit le Grand Prix du roman de l'Académie française",
      extrait: "L'annonce du prix, décerné pour Mon maître et mon vainqueur.",
      livre: "Mon maître et mon vainqueur",
      url: ""
    },
    {
      media: "Livres Hebdo",
      date: "Octobre 2021",
      titre: "François-Henri Désérable lauréat du Grand Prix du roman de l'Académie française 2021",
      extrait: "Le prix, doté de 10 000 euros, lui est remis face à Mohamed Mbougar Sarr et Gilles Martin-Chauffier.",
      livre: "Mon maître et mon vainqueur",
      url: "https://www.livreshebdo.fr/article/francois-henri-deserable-laureat-du-grand-prix-du-roman-de-lacademie-francaise-2021"
    },
    {
      media: "Cameroon Tribune",
      date: "Octobre 2021",
      titre: "Grand prix du roman de l'Académie française : François-Henri Désérable, lauréat",
      extrait: "Une histoire d'amour menée comme une enquête policière.",
      livre: "Mon maître et mon vainqueur",
      url: "https://cameroon-tribune.cm/article.html/43133/fr.html/grand-prix-du-roman-de-lacademie-francaise-francois-henri-deserable-laureat"
    },
    {
      media: "Livres Hebdo",
      date: "2021",
      titre: "Mon maître et mon vainqueur : l'amour fou",
      extrait: "Critique du roman de la rentrée 2021.",
      livre: "Mon maître et mon vainqueur",
      url: "https://www.livreshebdo.fr/article/francois-henri-deserable-mon-maitre-et-mon-vainqueur-gallimard-lamour-fou"
    },
    {
      media: "La Libre Belgique",
      date: "30 août 2017",
      titre: "Les mensonges vrais de Romain Gary",
      extrait: "Sur Un certain M. Piekielny et l'enquête lancée à partir de La Promesse de l'aube.",
      livre: "Un certain M. Piekielny",
      url: "https://www.lalibre.be/culture/livres-bd/2017/08/30/les-mensonges-vrais-de-romain-gary-HQZWJ2LQBBFMVN3UNPW55MZA34/"
    },
    {
      media: "Lepetitjournal.com – Bucarest",
      date: "2017",
      titre: "Rentrée littéraire : Un certain M. Piekielny de F.-H. Désérable",
      extrait: "Chronique de Dan Burcea.",
      livre: "Un certain M. Piekielny",
      url: "https://lepetitjournal.com/bucarest/communaute/rentree-litteraire-un-certain-m-piekielny-de-fh-deserable-159284"
    }
  ]
};
