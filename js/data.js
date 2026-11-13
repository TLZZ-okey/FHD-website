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

  // Articles de presse (du plus récent au plus ancien)
  presse: [
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
