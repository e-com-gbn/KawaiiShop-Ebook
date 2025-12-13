/**
 * Fichier data.js - Source unique de vérité pour tous les produits.
 * Ajout du champ 'galleryImages' pour la capacité 3.
 */

const ALL_PRODUCTS = [
    { 
        id: 1, 
        title: "Gachiakuta", 
        genre: "action", 
        mediaType: "manga", 
        price: 300, 
        date: "2022-02-01", 
        minVolume: 1, // NOUVEAU
        maxVolume: 10, // NOUVEAU
        author: "Kei Urana",
        pages: 20,
        format: "CBR, PDF",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BZDU5ZmEzODYtMDU2OS00NTZiLTk4MWYtYWUyZWUzNGU2ODdjXkEyXkFqcGc@._V1_.jpg",
        summary: "Rudo, un jeune homme rejeté par la société et envoyé dans un immense dépotoir où survivre est presque impossible. Dans ce monde brutal rempli de déchets, de créatures étranges et de secrets enfouis, Rudo découvre qu’il possède un pouvoir lié à des objets jetés par les humains. Guidé par de nouveaux alliés, il cherche à comprendre la vérité sur ce système injuste et sur son propre passé.",
        rating: "★★★★☆",
        // NOUVEAU: Images pour la galerie de détails
        galleryImages: [
            "https://via.placeholder.com/600x900/00FFFF/FF4136?text=Manga+T1+(Couverture)",
            "https://via.placeholder.com/600x900/4169E1/FFFFFF?text=Manga+T1+(Page+Int.)",
            "https://via.placeholder.com/600x900/FFDC00/333333?text=Manga+T1+(Dos)",
            "https://via.placeholder.com/600x900/7CFC00/333333?text=Manga+T1+(Bonus)"
        ]
    },
    { 
        id: 2, 
        title: "Sexy Cosplay Doll", 
        genre: "fantasy", 
        mediaType: "manga", 
        price: 800, 
        date: "2019-10-25", 
        minVolume: 1, maxVolume: 2,
        author: "Shin'ichi Fukuda",
        pages: 202,
        format: "CBZ, PDF",
        imageUrl: "https://m.media-amazon.com/images/I/815lmrIk-fL._AC_UF1000,1000_QL80_.jpg",
        summary: "Wakana Gojo est un lycéen de première année qui rêve de devenir un artisan de poupées hina, à l'instar de son grand-père. Un jour, au cours de son premier semestre, sa camarade de classe Marine Kitagawa, très populaire dans le lycée, le surprend en train de réaliser des costumes de poupées dans la salle de confection de vêtements de l'école.",
        rating: "★★★★★",
        galleryImages: [
            "https://via.placeholder.com/600x900/FF4136/00FFFF?text=Comic+S.F.",
            "https://via.placeholder.com/600x900/8B008B/FFFFFF?text=Comic+S.F.+(Scene+1)",
            "https://via.placeholder.com/600x900/000000/FF4136?text=Comic+S.F.+(Page+Fin)",
        ]
    },
    { 
        id: 3, 
        title: "Marvel's Thor : Ragnarok", 
        genre: "action", 
        mediaType: "comics", 
        price: 1300, 
        date: "2017-06-23", 
        minVolume: 1, maxVolume: 1,
        author: "Olivier Coipel",
        pages: 152,
        format: "Webtoon, PDF",
        imageUrl: "https://cdn.marvel.com/u/prod/marvel/i/mg/d/20/59cba89d5fd54/portrait_uncanny.jpg",
        summary: "Le cycle éternel de Ragnarok décrit la naissance, la mort et la résurrection des dieux Asgardiens. Un cycle auquel Thor veut mettre fin. C’est une décision lourde de conséquences, puisqu’elle pourrait signer la disparition du panthéon d’Asgard.",
        rating: "★★★☆☆",
        galleryImages: [
            "https://via.placeholder.com/600x900/333333/FFFFFF?text=Scan+Horreur",
            "https://via.placeholder.com/600x900/800000/FFFFFF?text=Scan+Horreur+(Aperçu)"
        ]},
    { id: 4, title: "Sky-High Survival", genre: "fantasy", mediaType: "manga", price: 500, date: "2013-04-15", minVolume: 1, maxVolume: 5, author: "Oba Takahiro", pages: 192, format: "CBR, PDF", imageUrl: "https://bdi.dlpdomain.com/album/9782505067498-couv-M300x425.jpg", detailImageUrl: "https://www.planetebd.com/dynamicImages/album/page/large/32/53/album-page-large-32536.jpg", summary: "Yuri Honjo est une lycéenne qui se retrouve soudainement sur le toit d'un immeuble, dans un monde étrange entouré de gratte-ciels. Elle tombe nez à nez avec un homme masqué qui a fendu la tête d'un homme en deux. Les gratte-ciels sont reliés par des ponts et Yuri tente de retrouver son frère qui se trouve dans le même monde qu'elle. Mais existe t-il une sortie autre que de sauter d'un toit ?", rating: "★★★★☆", galleryImages: ["https://www.planetebd.com/dynamicImages/album/page/large/33/98/album-page-large-33985.jpg"] },
    { id: 5, title: "GE-Good Ending", genre: "fantasy", mediaType: "manga", price: 500, date: "2009-11-20", minVolume: 1, maxVolume: 16, author: "sasuga kei", pages: 192, format: "CBZ", imageUrl: "https://www.nautiljon.com/images/manga/00/47/ge_-_good_ending_2274.webp", detailImageUrl: "https://m.media-amazon.com/images/I/81yxlrjlOrL._AC_UF1000,1000_QL80_.jpg", summary: "Seiji Utsumi est un adolescent comme tant d'autre. Maladroit en amour, il est tétanisé rien qu'à l'idée d'avouer ses sentiments à celle qu'il aime : Shô Iketani.", rating: "★★★★☆", galleryImages: ["https://m.media-amazon.com/images/I/81dPu7GzfDL._AC_UF1000,1000_QL80_.jpg"] },
    { id: 6, title: "Takane No Hana", genre: "fantasy", mediaType: "manga", price: 500, date: "2024-05-01", minVolume: 1, maxVolume: 5, author: "Yuki Shiwazu", pages: 192, format: "Webtoon", imageUrl: "https://www.manga-news.com/public/images/series/takane-hana-1-kaze.webp", detailImageUrl: "https://www.bedetheque.com/media/Planches/PlancheS_53073.jpg", summary: "Hana, lycéenne de 16 ans, est contrainte de prendre la place de sa sœur lors d’une rencontre arrangée ! Présentée à l'héritier du grand groupe Takaba, le très séduisant Takane Saibara, la jeune fille déchante vite face à son arrogance.", rating: "★★★★☆", galleryImages: ["https://www.sanctuary.fr/public/img/objet/origin/253630-8.jpg"] },
    { id: 7, title: "Domestic Girlfriend", genre: "fantasy", mediaType: "manga", price: 500, date: "2016-09-10", minVolume: 1, maxVolume: 5, author: "Sasuga Kei", pages: 192, format: "CBR", imageUrl: "https://www.manga-news.com/public/images/vols/Love_X_Dilemma_T28_-__dition_sp_ciale_-_Delcourt_Tonkam.webp", detailImageUrl: "https://www.sanctuary.fr/public/img/objet/origin/247608-9.jpg", summary: "Shuichi Kagaya est un jeune étudiant qui a la singularité de pouvoir se transformer en monstre, chose qu'il essaye de cacher à tout prix. Cependant, après avoir sauvé une jeune fille, Claire Aoki, elle découvre son secret. Cette dernière va alors faire équipe avec Shuichi pour retrouver sa sœur qui a tué sa famille...", rating: "★★★★☆", galleryImages: ["https://www.planetebd.com/dynamicImages/album/page/large/35/78/album-page-large-35784.jpg"] },
    { id: 8, title: "Gleipnir", genre: "scifi", mediaType: "manga", price: 500, date: "2018-02-28", minVolume: 1, maxVolume: 5, author: "Takeda Sun", pages: 176, format: "CBZ", imageUrl: "https://www.nautiljon.com/images/manga/00/55/gleipnir_5855.webp", detailImageUrl: "https://www.bdweb.fr/images/photolib/370x520c/543198/543198.jpg", summary: "Shuichi Kagaya est un jeune étudiant qui a la singularité de pouvoir se transformer en monstre, chose qu'il essaye de cacher à tout prix. Cependant, après avoir sauvé une jeune fille, Claire Aoki, elle découvre son secret. Cette dernière va alors faire équipe avec Shuichi pour retrouver sa sœur qui a tué sa famille...", rating: "★★★★☆", galleryImages: ["https://www.bdweb.fr/images/photolib/noresize/543200/543200.jpg"] },
    { id: 9, title: "Immortal Hulk", genre: "action", mediaType: "comics", price: 1000, date: "201-08-10", minVolume: 1, maxVolume: 10, author: "Ewing", pages: 128, format: "CBZ, CBR", imageUrl: "https://www.bedetheque.com/media/Couvertures/Couv_361867.jpg", detailImageUrl: "https://preview.redd.it/immortal-hulk-2018-v0-8037gq41tyoc1.png?auto=webp&s=e8748de5c7b4263bf79dc559439eaef09c70af98", summary: " Chaque fois que Bruce Banner meurt, Hulk revient à la vie quelques heures plus tard. À la nuit tombée, le Colosse de Jade devient cruel et déterminé. Découvrez Hulk comme vous ne l'avez jamais vu... Ce récit glaçant s'est imposé immédiatement comme une version culte du personnage.", rating: "★★★★☆", galleryImages: ["https://static.fnac-static.com/multimedia/PE/Images/FR/NR/f6/d2/14/18141942/1520-1/tsp20250314084207/Immortal-Hulk-T01.jpg"] },
    { id: 10, title: "Batman Dark Patterns", genre: "action", mediaType: "comics", price: 1200, date: "2025-05-10", minVolume: 1, maxVolume: 1, author: "Dan Watters", pages: 80, format: "CBZ, CBR", imageUrl: "https://bdi.dlpdomain.com/album/9791026825524/couv/M385x862/batman-dark-patterns-affaire-1-l-rsquo-homme-blesse.jpg", detailImageUrl: "https://www.bedetheque.com/media/Planches/PlancheA_521960.jpg", summary: "Une série de meurtres effroyables a provoqué une onde de choc à Gotham. La piste mène tout droit vers un sinistre tueur en série, au corps percé d'innombrables clous et baptisé l'écorché. Mais s'agit-il des agissements d'un seul désaxé, ou y a-t-il quelque chose d'encore plus sinistre en jeu ?", rating: "★★★★☆", galleryImages: ["https://www.comicsblog.fr/images/editeur/AdminCorentin/News/PXT-29/batman-dark-patterns-2.jpg"] },
    { id: 11, title: "Joker Infinite", genre: "action", mediaType: "comics", price: 1300, date: "2024-08-19", minVolume: 1, maxVolume: 3, author: "James Tynion IV", pages: 160, format: "CBZ, CBR", imageUrl: "https://bdi.dlpdomain.com/album/9791026828211/couv/M385x862/joker-infinite-integrale.jpg", detailImageUrl: "https://www.bedetheque.com/media/Planches/PlancheS_78516.jpg", summary: "Depuis les événements qui paralysèrent sa fille Barbara, l'ex-commissaire reste hanté par la barbarie du Joker. Aussi, lorsque la représentante d'une mystérieuse organisation lui propose d'assassiner le Joker, Gordon y voit l'occasion de faire ce que Batman ne se résoudra jamais à faire et de débarrasser une bonne fois pour toute le monde de cet avatar du Mal absolu.", rating: "★★★★☆", galleryImages: ["https://www.bedetheque.com/media/Planches/PlancheA_444667.jpg"] },
    { id: 12, title: "Batman - Joker War", genre: "action", mediaType: "comics", price: 1300, date: "2020-09-18", minVolume: 1, maxVolume: 3, author: "Guillem March", pages: 272, format: "CBZ, CBR", imageUrl: "https://bdi.dlpdomain.com/album/9791026817123/couv/M385x862/batman-joker-war-tome-1.jpg", detailImageUrl: "https://static.pulps.fr/img/APR20/full/STL157521.jpg", summary: "À présent que la ville de Gotham est libérée du joug de Bane, Batman et Catwoman ont décidé de s'associer pour rendre la justice dans la ville déchue. Mais une affaire ancienne qui a impliqué la féline cambrioleuse et les plus grands ennemis du Chevalier Noir menace de refaire surface quand le Designer, un super-vilain oublié, fait sa réapparition. ", rating: "★★★★☆", galleryImages: ["https://cdn.mos.cms.futurecdn.net/PYzevaJ4wsmzDQAi4s2QAL.jpg"] },
    { id: 13, title: "Ultimates Hors Série - Ultimate Iron Man", genre: "action", mediaType: "comics", price: 1000, date: "2008-10-01", minVolume: 5, maxVolume:6, author: "Orson Scott Card", pages: 107, format: "CBZ, CBR", imageUrl: "https://www.bedetheque.com/media/Couvertures/Couv_79370.jpg", detailImageUrl: "https://www.bedetheque.com/media/Planches/PlancheA_57151.jpg", summary: "Depuis toujours, Tony Stark est quelqu’un à part. Sa mère, la scientifique Maria Stark, lui transmet accidentellement un virus qui modifie son ADN. Dès lors, le corps de Tony est capable de se régénérer très rapidement. Mais dans le même temps, ses cellules deviennent hypersensibles, ce qui lui provoque de terribles douleurs. Le père de Tony, le brillant Howard Stark, patron de Stark Enterprises, finit par mettre au point une armure ultra fine qui lui colle à la peau et soulage ses souffrances. ", rating: "★★★★☆", galleryImages: ["https://www.bedetheque.com/media/Planches/PlancheA_79370.jpg"] },
    { id: 14, title: "Marvel : Avengers 2020", genre: "scifi", mediaType: "comics", price: 1000, date: "2020-01-01", minVolume: 1, maxVolume: 13, author: "Aaron, Jason", pages: 113, format: "CBR, CBZ", imageUrl: "https://www.bedetheque.com/media/Couvertures/Couv_383213.jpg", detailImageUrl: "https://www.bedetheque.com/media/Planches/PlancheS_72704.jpg", summary: "Les Avengers sont de retour avec Captain America, Thor, Iron Man mais aussi Black Panther, Captain Marvel et Miss Hulk !", rating: "★★★★☆", galleryImages: ["https://www.bedetheque.com/media/Planches/PlancheA_366563.jpg"] },
    { id: 15, title: "Spider-Man : 6e série", genre: "scifi", mediaType: "comics", price: 700, date: "2017-06-19", minVolume: 1, maxVolume: 13, author: "Slott, Dan", pages: 96, format: "CBR, CBZ", imageUrl: "https://www.bedetheque.com/media/Couvertures/Couv_309445.jpg", detailImageUrl: "https://www.bedetheque.com/media/Couvertures/Couv_325321.jpg", summary: "Piqué par une araignée radioactive lors d'une expérience scientifique, peter parker acquiert d'extraordinaires pouvoirs, force et agilité surhumaines", rating: "★★★★☆", galleryImages: ["https://www.bedetheque.com/media/Couvertures/Couv_310607.jpg"] },
    { id: 16, title: "Deadpool : 4e série", genre: "scifi", mediaType: "comics", price: 600, date: "2016-06-01", minVolume: 1, maxVolume: 15, author: "Gerry Duggan", pages: 76, format: "CBR, CBZ", imageUrl: "https://www.bedetheque.com/media/Couvertures/Couv_267196.jpg", detailImageUrl: "https://www.bedetheque.com/media/Planches/PlancheA_324212.jpg", summary: "Deadpool affronte ses plus grands adversaires : Thanos, Wolverine, Bullseye, T-Ray et le Docteur Bong. Le mercenaire va également vivre de bizarres ...", rating: "★★★★☆", galleryImages: ["https://www.bedetheque.com/media/Planches/PlancheA_358872.jpg"] },
    { id: 17, title: "Miles Morales : Spider-Man 2e série", genre: "scifi", mediaType: "comics", price: 1000, date: "2023-11-15", minVolume: 2, maxVolume: 3, author: "Ziglar, Cody", pages: 110, format: "CBR, CBZ", imageUrl: "https://www.excalibur-comics.fr/16669-large_default/spider-man-miles-morales-volume-2-omnibus.jpg", detailImageUrl: "https://preview.redd.it/do-you-prefer-miles-in-a-universe-where-peter-is-alive-or-v0-vzyihn9guu1d1.jpg?width=640&crop=smart&auto=webp&s=e7573f6df0443f0573b42239af6a6912b136024a", summary: "Miles Morales a survécu à bien des périls, et même à la mort de son univers d'origine ! Cette fois encore, une nouvelle ennemie débarque, et elle n'a en aucun cas l'intention d'épargner le jeune héros. ", rating: "★★★★☆", galleryImages: ["https://static.bdphile.fr/images/media/cover/0164/164263_1.jpg"] },
    { id: 18, title: "Docteur Fatalis", genre: "scifi", mediaType: "comics", price: 1000, date: "2019-06-11", minVolume: 1, maxVolume: 2, author: "Dan Slott", pages: 112, format: "CBR, CBZ", imageUrl: "https://www.bedetheque.com/media/Couvertures/Couv_403164.jpg", detailImageUrl: "https://www.bedetheque.com/media/Versos/Verso_426916.jpg", summary: "Après les Quatre Fantastiques… le Docteur Fatalis est de retour ! Le seigneur de Latvérie s'oppose à une expérience scientifique qu'il juge trop dangereuse.", rating: "★★★★☆", galleryImages: ["https://www.bedetheque.com/media/Planches/PlancheA_426916.jpg"] },
    { id: 19, title: "Marvel : Fantastic Four 2019", genre: "scifi", mediaType: "comics", price: 1000, date: "2019-06-22", minVolume: 1, maxVolume: 6, author: "Dan Slott", pages: 100, format: "CBR, CBZ", imageUrl: "https://www.bedetheque.com/media/Couvertures/Couv_368137.jpg", detailImageUrl: "https://www.bedetheque.com/media/Planches/PlancheA_387679.jpg", summary: "Le grand retour de la Première Famille de l'univers Marvel ! Lorsqu'un adversaire presque invincible se met en travers de la route de Reed Richards, ..", rating: "★★★★☆", galleryImages: ["https://www.bedetheque.com/media/Planches/PlancheA_340537.jpg"] },
    { id: 20, title: "Doctor Strange : Muste have", genre: "scifi", mediaType: "comics", price: 1200, date: "2023-07-05", minVolume: 1, maxVolume: 1, author: "Brandon Peterson", pages: 160, format: "CBR, CBZ", imageUrl: "https://www.excalibur-comics.fr/16647-large_default/docteur-strange-le-debut-de-la-fin-must-have.jpg", detailImageUrl: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1650910396-51PvVlfvH1L._SL500_.jpg?crop=1xw:1xh;center,top&resize=980:*", summary: "Le Docteur Stephen Strange est un brillant chirurgien, on ne peut plus sûr de lui, mais le destin lui réserve des surprises qu'il n'aurait jamais pu anticiper, et qui le forceront à explorer les recoins les plus secrets de son coeur... et les frontières les plus éloignées du cosmos ! Le Maître des Arts Mystiques est né !", rating: "★★★★☆", galleryImages: ["https://cdn.marvel.com/u/prod/marvel/i/mg/3/b0/6630175697ccb/clean.jpg"] },
    { id: 21, title: "Marvel Venom HS : 3e série", genre: "scifi", mediaType: "comics", price: 1000, date: "2019-10-06", minVolume: 1, maxVolume: 2, author: "Danny Cates", pages: 96, format: "CBR, CBZ", imageUrl: "https://www.bedetheque.com/media/Couvertures/Couv_434377.jpg", detailImageUrl: "https://www.bedetheque.com/media/Couvertures/Couv_405105.jpg", summary: "L'assaut du Dieu des Symbiotes sur l'univers Marvel n'impacte évidemment personne autant qu'Eddie Brock, alias Venom ! Cet album spécial regroupe tous les épisodes liés à l'événement King in Black, scénarisés par Donny Cates, l'auteur du crossover !", rating: "★★★★☆", galleryImages: ["https://www.bedetheque.com/media/Couvertures/Couv_426206.jpg"] },
];

const PRICE_MAP = ALL_PRODUCTS.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price
}));