/*
 * Contenu du site — à modifier ici.
 * Pour remplacer un visuel généré par une vraie image (couverture, photo),
 * déposez le fichier dans /images et renseignez le champ `image`
 * (ex. image: "images/chagrin.jpg").
 */
window.SITE = {
  auteur: "François-Henri Désérable",

  // Carrousel de la page d'accueil (du plus récent au plus ancien)
  news: [
    {
      date: "3 novembre 2026",
      kicker: "Prix Renaudot",
      titre: "Le Palais, prix Renaudot 2026",
      texte: "Le jury du prix Renaudot, pour son centenaire, couronne Le Palais, grand roman d'aventures sur le vin. L'auteur dédie son prix aux vignerons.",
      lien: "romans.html#palais",
      theme: "vin",
      image: ""
    },
    {
      date: "Novembre 2026",
      kicker: "Agenda",
      titre: "À la rencontre des lecteurs",
      texte: "Dijon, Marseille, Ferney-Voltaire… Retrouvez les prochaines rencontres et dédicaces autour du Palais.",
      lien: "agenda.html",
      theme: "nuit",
      image: ""
    },
    {
      date: "2025",
      kicker: "Nouveau livre",
      titre: "Chagrin d'un chant inachevé",
      texte: "Sur la route de Che Guevara : cinq mois à travers l'Amérique du Sud, sur l'itinéraire du voyage à motocyclette d'Ernesto Guevara et d'Alberto Granado.",
      lien: "romans.html#chagrin",
      theme: "terre",
      image: ""
    },
    {
      date: "2024",
      kicker: "Distinction",
      titre: "Prix Montaigne 2024",
      texte: "L'usure d'un monde, récit d'une traversée de l'Iran au moment de la révolte « Femme, vie, liberté », est distingué.",
      lien: "romans.html#usure",
      theme: "nuit",
      image: ""
    },
    {
      date: "2024",
      kicker: "À l'étranger",
      titre: "L'usure d'un monde traduit",
      texte: "Le récit iranien poursuit sa route en traduction et dans les festivals littéraires internationaux.",
      lien: "presse.html",
      theme: "sable",
      image: ""
    },
    {
      date: "28 octobre 2021",
      kicker: "Académie française",
      titre: "Grand Prix du roman",
      texte: "Mon maître et mon vainqueur reçoit le Grand Prix du roman de l'Académie française. L'auteur a 34 ans.",
      lien: "romans.html#maitre",
      theme: "bordeaux",
      image: ""
    }
  ],

  // Livres (du plus récent au plus ancien)
  livres: [
    {
      id: "palais",
      titre: "Le Palais",
      annee: 2026,
      editeur: "Gallimard",
      genre: "Roman",
      couleur: "#5c1a33",
      image: "",
      resume: "Arun Kumar, orphelin des bidonvilles de New Delhi, est adopté à huit ans par un couple de restaurateurs de Beaune. Il se découvre un palais et une mémoire des arômes hors du commun, un don qu'il va mettre au service d'une vengeance. Des caves de Bourgogne aux Marquises et à Manhattan, un grand roman d'aventures sur le vin, portrait d'un génie hors-la-loi dont les crimes se dégustent, qui interroge ce qui fait la valeur d'un grand cru : le goût, le prix ou les histoires qu'on raconte.",
      prix: ["Prix Renaudot 2026"]
    },
    {
      id: "chagrin",
      titre: "Chagrin d'un chant inachevé",
      sousTitre: "Sur la route de Che Guevara",
      annee: 2025,
      editeur: "Gallimard",
      genre: "Récit",
      couleur: "#8a3b1f",
      image: "",
      resume: "Cinq mois à travers l'Amérique du Sud, à moto, en stop, en bateau, avec une seule règle : suivre l'itinéraire d'Alberto Granado et d'Ernesto « Che » Guevara lors de leur célèbre voyage à motocyclette, soixante-cinq ans plus tôt. Plutôt que de signer l'achat d'un appartement, l'auteur choisit la route, de l'Argentine au Venezuela. Le titre vient d'un vers du poète Nâzım Hikmet, cité par le Che dans une lettre.",
      prix: []
    },
    {
      id: "usure",
      titre: "L'usure d'un monde",
      sousTitre: "Une traversée de l'Iran",
      annee: 2023,
      editeur: "Gallimard",
      genre: "Récit de voyage",
      couleur: "#1f3a4d",
      image: "images/usure.jpg",
      resume: "Fin 2022, au plus fort de la répression qui suit la mort de Mahsa Amini, l'auteur passe un mois et demi en Iran. Dans les pas de son modèle Nicolas Bouvier, il traverse le pays de Téhéran aux confins du Baloutchistan, à la rencontre d'un peuple chez qui la peur recule. Jusqu'à son arrestation par les Gardiens de la révolution et son expulsion. Le portrait d'une République islamique qui réprime son peuple dans le sang.",
      prix: ["Prix Montaigne 2024"]
    },
    {
      id: "maitre",
      titre: "Mon maître et mon vainqueur",
      annee: 2021,
      editeur: "Gallimard",
      genre: "Roman",
      couleur: "#6b1d2a",
      image: "images/maitre.jpg",
      resume: "Un écrivain est convoqué par un juge d'instruction : il connaît les détails d'une affaire. Quand Vasco a été arrêté, on a trouvé sur lui un revolver et un carnet de poèmes. En relisant ces poèmes, le narrateur raconte la passion de Vasco pour Tina, comédienne fantasque, partagée entre Edgar, le père de ses jumeaux qu'elle doit épouser, et Vasco, l'amant qui l'obsède. Une comédie dramatique entre poésie et roman policier, sous le signe de Verlaine et Rimbaud.",
      prix: ["Grand Prix du roman de l'Académie française 2021"]
    },
    {
      id: "piekielny",
      titre: "Un certain M. Piekielny",
      annee: 2017,
      editeur: "Gallimard",
      genre: "Roman",
      couleur: "#3d4a2f",
      image: "images/piekielny.jpg",
      resume: "Dans La Promesse de l'aube, Romain Gary raconte comment un voisin de Wilno, un certain M. Piekielny, lui avait demandé, enfant, de prononcer son nom devant les grands de ce monde qu'il rencontrerait. Devenu résistant, diplomate et écrivain, Gary a tenu sa promesse. Un jour de mai, l'auteur se retrouve devant le numéro 16 de la rue Grande-Pohulanka, à Vilnius, et se demande qui était cet homme. Une enquête où se mêlent Gary, Piekielny et l'auteur lui-même.",
      prix: ["Finaliste du Prix du roman des étudiants France Culture – Télérama 2018"]
    },
    {
      id: "evariste",
      titre: "Évariste",
      annee: 2015,
      editeur: "Gallimard",
      genre: "Roman",
      couleur: "#2b2b4a",
      image: "images/evariste.jpg",
      resume: "Évariste Galois découvre les mathématiques à quinze ans, les révolutionne à dix-huit et meurt en duel à vingt. Entre une enfance à Bourg-la-Reine et une adolescence républicaine et tumultueuse sous Louis-Philippe, le roman, en vingt chapitres comme ses vingt années, retrace la vie fulgurante de celui qu'on a appelé le « Rimbaud des mathématiques ».",
      prix: ["Prix des lecteurs L'Express – BFMTV"]
    },
    {
      id: "tete",
      titre: "Tu montreras ma tête au peuple",
      annee: 2013,
      editeur: "Gallimard",
      genre: "Récits",
      couleur: "#4a2b2b",
      image: "images/tete.jpg",
      resume: "Paris, sous la Révolution. Charlotte Corday, Adam Lux, les Girondins, Danton, Marie-Antoinette, Robespierre, André Chénier… Dix récits, dix figures saisies dans les jours, les heures ou les minutes qui précèdent la chute de leur tête dans le panier du bourreau. Le titre reprend les derniers mots de Danton à l'exécuteur.",
      prix: []
    }
  ],

  // Agenda : date au format AAAA-MM-JJ. Les dates passées sont classées automatiquement.
  agenda: [
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
