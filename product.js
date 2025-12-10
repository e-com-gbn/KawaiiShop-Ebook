/**
 * Fichier product.js - Logique de la page de détail d'un produit.
 */

// --- 1. BASE DE DONNÉES SIMULÉE COMPLÈTE (Source de vérité) ---

const FULL_MOCK_PRODUCTS = [
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
        rating: "★★★★☆"
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
        rating: "★★★★★"
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
        rating: "★★★☆☆"
    },
    { id: 4, title: "Sky-High Survival", genre: "fantasy", mediaType: "manga", price: 500, date: "2013-04-15", minVolume: 1, maxVolume: 5, author: "Oba Takahiro", pages: 192, format: "CBR, PDF", imageUrl: "https://bdi.dlpdomain.com/album/9782505067498-couv-M300x425.jpg", summary: "Yuri Honjo est une lycéenne qui se retrouve soudainement sur le toit d'un immeuble, dans un monde étrange entouré de gratte-ciels. Elle tombe nez à nez avec un homme masqué qui a fendu la tête d'un homme en deux. Les gratte-ciels sont reliés par des ponts et Yuri tente de retrouver son frère qui se trouve dans le même monde qu'elle. Mais existe t-il une sortie autre que de sauter d'un toit ?", rating: "★★★★☆" },
    { id: 5, title: "GE-Good Ending", genre: "fantasy", mediaType: "manga", price: 500, date: "2009-11-20", minVolume: 1, maxVolume: 16, author: "sasuga kei", pages: 192, format: "CBZ", imageUrl: "https://www.nautiljon.com/images/manga/00/47/ge_-_good_ending_2274.webp", summary: "Seiji Utsumi est un adolescent comme tant d'autre. Maladroit en amour, il est tétanisé rien qu'à l'idée d'avouer ses sentiments à celle qu'il aime : Shô Iketani.", rating: "★★★★☆" },
    { id: 6, title: "Takane No Hana", genre: "fantasy", mediaType: "manga", price: 500, date: "2024-05-01", minVolume: 1, maxVolume: 5, author: "Yuki Shiwazu", pages: 192, format: "Webtoon", imageUrl: "https://www.manga-news.com/public/images/series/takane-hana-1-kaze.webp", summary: "Hana, lycéenne de 16 ans, est contrainte de prendre la place de sa sœur lors d’une rencontre arrangée ! Présentée à l'héritier du grand groupe Takaba, le très séduisant Takane Saibara, la jeune fille déchante vite face à son arrogance.", rating: "★★★★☆" },
    { id: 7, title: "Domestic Girlfriend", genre: "fantasy", mediaType: "manga", price: 500, date: "2016-09-10", minVolume: 1, maxVolume: 5, author: "Sasuga Kei", pages: 192, format: "CBR", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB6ST4YMF61lLIOJB65XT-mHc0O55rCZQJxw&s", summary: "Natsuo Fujii est un lycéen qui est amoureux d'une de ses professeur, Hina. Un soir, après un goukon, il est invité par Rui Tachibana, l'une des filles invitées, à venir chez elle. Sa raison ? Simplement faire l'amour. D'abord réticent, il fini par accepter, sachant que rien d'autre ne se passera entre eux ensuite. Mais depuis ce jour, Natsuo se sent tourmenté par cet événement et encore plus lorsqu'il apprend le remariage de son père...", rating: "★★★★☆" },
    { id: 8, title: "Gleipnir", genre: "scifi", mediaType: "manga", price: 500, date: "2018-02-28", minVolume: 1, maxVolume: 5, author: "Takeda Sun", pages: 176, format: "CBZ", imageUrl: "https://www.nautiljon.com/images/manga/00/55/gleipnir_5855.webp", summary: "Shuichi Kagaya est un jeune étudiant qui a la singularité de pouvoir se transformer en monstre, chose qu'il essaye de cacher à tout prix. Cependant, après avoir sauvé une jeune fille, Claire Aoki, elle découvre son secret. Cette dernière va alors faire équipe avec Shuichi pour retrouver sa sœur qui a tué sa famille...", rating: "★★★★☆" },
    { id: 9, title: "Immortal Hulk", genre: "action", mediaType: "comics", price: 1000, date: "201-08-10", minVolume: 1, maxVolume: 10, author: "Ewing", pages: 128, format: "CBZ, CBR", imageUrl: "https://www.bedetheque.com/media/Couvertures/Couv_361867.jpg", summary: " Chaque fois que Bruce Banner meurt, Hulk revient à la vie quelques heures plus tard. À la nuit tombée, le Colosse de Jade devient cruel et déterminé. Découvrez Hulk comme vous ne l'avez jamais vu... Ce récit glaçant s'est imposé immédiatement comme une version culte du personnage.", rating: "★★★★☆" },
    { id: 10, title: "Batman Dark Patterns", genre: "action", mediaType: "comics", price: 1200, date: "2025-05-10", minVolume: 1, maxVolume: 1, author: "Dan Watters", pages: 80, format: "CBZ, CBR", imageUrl: "https://bdi.dlpdomain.com/album/9791026825524/couv/M385x862/batman-dark-patterns-affaire-1-l-rsquo-homme-blesse.jpg", summary: "Une série de meurtres effroyables a provoqué une onde de choc à Gotham. La piste mène tout droit vers un sinistre tueur en série, au corps percé d'innombrables clous et baptisé l'écorché. Mais s'agit-il des agissements d'un seul désaxé, ou y a-t-il quelque chose d'encore plus sinistre en jeu ?", rating: "★★★★☆" },
];

// --- 2. LOGIQUE DE CHARGEMENT ---

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    return isNaN(id) ? null : id;
}

/**
 * Configure l'écouteur du bouton "Ajouter au Panier".
 */
function setupAddToCartListener() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if (addToCartBtn && typeof addToCart === 'function') {
        addToCartBtn.addEventListener('click', (event) => {
            const productTitle = event.currentTarget.getAttribute('data-title');
            
            if (productTitle) {
                // Appel à la fonction globale addToCart (définie dans script.js)
                addToCart(productTitle); 
            } else {
                console.error("Erreur: Le titre du produit est manquant. Veuillez rafraîchir la page.");
                alert("Erreur interne : Impossible d'ajouter le produit. Veuillez rafraîchir.");
            }
        });
    } else {
        console.error("Échec: Le bouton #add-to-cart-btn ou la fonction addToCart n'est pas disponible.");
    }
}

/**
 * Charge les détails du produit sur la page HTML et configure les limites de volume.
 */
function loadProductDetails() {
    const productId = getProductIdFromUrl();
    const product = FULL_MOCK_PRODUCTS.find(p => p.id === productId);

    if (!product) {
        document.querySelector('.product-details').innerHTML = `
            <h2>Produit Non Trouvé (ID: ${productId})</h2>
            <p>L\'ID spécifié n\'existe pas dans notre catalogue.</p>
            <a href="category.html?genre=tous" class="btn btn-primary">Retour au Catalogue</a>
        `;
        document.title = "Erreur - Kawaii Shop";
        return;
    }

    document.title = `${product.title} - Kawaii Shop`;
    document.getElementById('product-cover').src = product.imageUrl;
    document.getElementById('product-cover').alt = `Couverture de ${product.title}`;
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-author').textContent = product.author;
    document.getElementById('product-rating').textContent = product.rating;
    document.getElementById('product-summary').textContent = product.summary;
    document.getElementById('product-price').textContent = `${product.price.toLocaleString('fr-FR')} XAF`;
    document.getElementById('product-format').textContent = product.format;
    document.getElementById('product-type').textContent = product.mediaType.toUpperCase();
    document.getElementById('product-pages').textContent = `${product.pages} pages`;
    document.getElementById('product-date').textContent = product.date;

    // --- LOGIQUE GESTION DES VOLUMES ---
    
    const volumeInfoElement = document.getElementById('available-volumes');
    const volumeInput = document.getElementById('volume-number');
    const volumeLabel = document.querySelector('label[for="volume-number"]');
    const volumeSelectorDiv = volumeInput ? volumeInput.closest('.volume-selector') : null;
    
    const minVol = product.minVolume || 1;
    const maxVol = product.maxVolume;

    if (maxVol && volumeSelectorDiv) {
        // Affichage de la plage disponible pour le client
        if (volumeInfoElement) {
            volumeInfoElement.textContent = `Disponible du Volume ${minVol} au Volume ${maxVol}.`;
            volumeInfoElement.style.display = 'block';
        }
        
        // Contraintes du champ de saisie
        volumeInput.min = minVol;
        volumeInput.max = maxVol;
        volumeInput.value = minVol; 
        
        if (volumeLabel) {
             volumeLabel.textContent = `Volume ou Chapitre N° (entre ${minVol} et ${maxVol}) :`;
        }
        volumeSelectorDiv.style.display = 'flex'; // Afficher le sélecteur
        
    } else if(volumeSelectorDiv) {
        // Si pas de volume (tome unique ou série non gérée), masquer le sélecteur
        volumeSelectorDiv.style.display = 'none';
        if (volumeInfoElement) {
             volumeInfoElement.textContent = "Ceci est un tome unique ou une édition complète.";
             volumeInfoElement.style.display = 'block';
        }
    }
    
    // --- FIN LOGIQUE VOLUMES ---

    // Mise à jour du bouton d'ajout au panier (Titre de base)
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.setAttribute('data-title', product.title);
    }
    
    // Mise à jour du Breadcrumb 
    const genreCapitalized = product.genre.charAt(0).toUpperCase() + product.genre.slice(1);
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `<a href="index.html">Accueil</a> &gt; <a href="category.html?genre=${product.genre}">${genreCapitalized}</a> &gt; <span>${product.title}</span>`;
    }
    
    // Initialiser l'écouteur après avoir chargé les détails (C'était la clé de la correction)
    setupAddToCartListener();
}

// --- 3. INITIALISATION ---

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.product-detail-page')) {
        loadProductDetails();
    }
});
