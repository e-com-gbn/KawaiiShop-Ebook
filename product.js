/**
 * Fichier product.js - Logique de la page de détail d'un produit.
 */

// --- 1. BASE DE DONNÉES SIMULÉE COMPLÈTE (Source de vérité) ---

const FULL_MOCK_PRODUCTS = [
    { 
        id: 1, 
        title: "Gachiakuta", 
        genre: "fantasy", 
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
    { id: 4, title: "Titre Shōnen A - T.1", genre: "action", mediaType: "manga", price: 3500, date: "2024-01-15", minVolume: 1, maxVolume: 8, author: "Auteur Fictif #2", pages: 190, format: "CBR, PDF", imageUrl: "https://via.placeholder.com/600x900/FF8C00/FFFFFF?text=Shonen+1", summary: "Description courte Shonen A. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, temporibus. Dolores at, pariatur aperiam sit deleniti!", rating: "★★★★☆" },
    { id: 5, title: "Bande Dessinée B - Vol.3", genre: "action", mediaType: "comics", price: 5000, date: "2023-11-20", minVolume: 1, maxVolume: 12, author: "Auteur Fictif #3", pages: 120, format: "CBZ", imageUrl: "https://via.placeholder.com/600x900/4169E1/FFFFFF?text=Shonen+2", summary: "Description courte Comic B. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, temporibus. Dolores at, pariatur aperiam sit deleniti!", rating: "★★★★☆" },
    { id: 6, title: "Webtoon Mystère", genre: "action", mediaType: "scan", price: 2800, date: "2024-05-01", minVolume: 1, maxVolume: 50, author: "Auteur Fictif #4", pages: 250, format: "Webtoon", imageUrl: "https://via.placeholder.com/600x900/7FFFD4/333333?text=Webtoon+Shonen", summary: "Description courte Webtoon Mystère. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, temporibus. Dolores at, pariatur aperiam sit deleniti!", rating: "★★★★☆" },
    { id: 7, title: "L'Ombre Fantôme", genre: "fantasy", mediaType: "manga", price: 4000, date: "2023-09-10", minVolume: 1, maxVolume: 6, author: "Auteur Fictif #5", pages: 200, format: "CBR", imageUrl: "https://via.placeholder.com/600x900/DAA520/FFFFFF?text=Fantasy+A", summary: "Description courte Fantasy A. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, temporibus. Dolores at, pariatur aperiam sit deleniti!", rating: "★★★★☆" },
    { id: 8, title: "Le Secret des Étoiles", genre: "scifi", mediaType: "comics", price: 6000, date: "2024-02-28", minVolume: 1, maxVolume: 2, author: "Auteur Fictif #6", pages: 100, format: "CBZ", imageUrl: "https://via.placeholder.com/600x900/8B008B/FFFFFF?text=SciFi+B", summary: "Description courte SciFi B. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, temporibus. Dolores at, pariatur aperiam sit deleniti!", rating: "★★★★☆" },
    { id: 9, title: "Aventure Épique", genre: "fantasy", mediaType: "manga", price: 4000, date: "2024-08-10", minVolume: 1, maxVolume: 25, author: "Auteur Fictif #7", pages: 210, format: "PDF", imageUrl: "https://via.placeholder.com/600x900/DAA520/FFFFFF?text=Fantasy+B", summary: "Description courte Fantasy B. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, temporibus. Dolores at, pariatur aperiam sit deleniti!", rating: "★★★★☆" },
    { id: 10, title: "Chasseurs de l'Espace", genre: "scifi", mediaType: "manga", price: 3200, date: "2023-12-01", minVolume: 1, maxVolume: 4, author: "Auteur Fictif #8", pages: 170, format: "CBR", imageUrl: "https://via.placeholder.com/600x900/8B008B/FFFFFF?text=SciFi+C", summary: "Description courte SciFi C. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, temporibus. Dolores at, pariatur aperiam sit deleniti!", rating: "★★★★☆" },
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