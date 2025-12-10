/**
 * Fichier category.js - Logique de chargement, de tri, de filtrage et de recherche des produits.
 */

// --- 1. BASE DE DONNÉES SIMULÉE COMPLÈTE (Synchronisée avec product.js) ---

const MOCK_PRODUCTS = [
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
    { id: 4, title: "Titre Shōnen A - T.1", genre: "action", mediaType: "manga", price: 3500, date: "2024-01-15", minVolume: 1, maxVolume: 8, author: "Auteur Fictif #2", pages: 190, format: "CBR, PDF", imageUrl: "https://via.placeholder.com/300x450/FF8C00/FFFFFF?text=Shonen+1", summary: "Description courte Shonen A.", rating: "★★★★☆" },
    { id: 5, title: "Bande Dessinée B - Vol.3", genre: "action", mediaType: "comics", price: 5000, date: "2023-11-20", minVolume: 1, maxVolume: 12, author: "Auteur Fictif #3", pages: 120, format: "CBZ", imageUrl: "https://via.placeholder.com/300x450/4169E1/FFFFFF?text=Shonen+2", summary: "Description courte Comic B.", rating: "★★★★☆" },
    { id: 6, title: "Webtoon Mystère", genre: "action", mediaType: "scan", price: 2800, date: "2024-05-01", minVolume: 1, maxVolume: 50, author: "Auteur Fictif #4", pages: 250, format: "Webtoon", imageUrl: "https://via.placeholder.com/300x450/7FFFD4/333333?text=Webtoon+Shonen", summary: "Description courte Webtoon Mystère.", rating: "★★★★☆" },
    { id: 7, title: "L'Ombre Fantôme", genre: "fantasy", mediaType: "manga", price: 4000, date: "2023-09-10", minVolume: 1, maxVolume: 6, author: "Auteur Fictif #5", pages: 200, format: "CBR", imageUrl: "https://via.placeholder.com/300x450/DAA520/FFFFFF?text=Fantasy+A", summary: "Description courte Fantasy A.", rating: "★★★★☆" },
    { id: 8, title: "Le Secret des Étoiles", genre: "scifi", mediaType: "comics", price: 6000, date: "2024-02-28", minVolume: 1, maxVolume: 2, author: "Auteur Fictif #6", pages: 100, format: "CBZ", imageUrl: "https://via.placeholder.com/300x450/8B008B/FFFFFF?text=SciFi+B", summary: "Description courte SciFi B.", rating: "★★★★☆" },
    { id: 9, title: "Aventure Épique", genre: "fantasy", mediaType: "manga", price: 4000, date: "2024-08-10", minVolume: 1, maxVolume: 25, author: "Auteur Fictif #7", pages: 210, format: "PDF", imageUrl: "https://via.placeholder.com/300x450/DAA520/FFFFFF?text=Fantasy+B", summary: "Description courte Fantasy B.", rating: "★★★★☆" },
    { id: 10, title: "Chasseurs de l'Espace", genre: "scifi", mediaType: "manga", price: 3200, date: "2023-12-01", minVolume: 1, maxVolume: 4, author: "Auteur Fictif #8", pages: 170, format: "CBR", imageUrl: "https://via.placeholder.com/300x450/8B008B/FFFFFF?text=SciFi+C", summary: "Description courte SciFi C.", rating: "★★★★☆" },
];

// --- 2. RÉFÉRENCES DOM et FONCTIONS ---

const productGrid = document.querySelector('.product-grid');
const categoryTitleElement = document.getElementById('category-title');
const resultCountElement = document.getElementById('result-count');
const sortSelect = document.getElementById('sort-by-date');
const mediaCheckboxes = document.querySelectorAll('input[name="media-type"]');

function getCurrentUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        genre: params.get('genre') || 'tous',
        searchQuery: params.get('search') || ''
    };
}

function renderProducts(products) {
    // Si productGrid n'est pas trouvé (par ex. sur index.html), ne rien faire
    if (!productGrid) return; 
    
    productGrid.innerHTML = '';
    
    if (products.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 20px;">Aucun produit ne correspond à ces critères.</p>';
        resultCountElement.textContent = `Affichage de 0 résultat`;
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.setAttribute('data-product-id', product.id);
        
        // Affichage de la plage de volumes pour informer le client
        const volumeText = product.maxVolume ? `(Vol. ${product.minVolume} à ${product.maxVolume})` : `(Tome Unique)`;

        productCard.innerHTML = `
            <a href="product.html?id=${product.id}"><img src="${product.imageUrl.replace('600x900', '300x450')}" alt="Couverture de ${product.title}"></a>
            <h3><a href="product.html?id=${product.id}">${product.title}</a></h3>
            <p class="product-genre">${product.mediaType.toUpperCase()} ${volumeText}</p>
            <p class="price">${product.price.toLocaleString('fr-FR')} XAF</p>
            <button class="btn btn-primary btn-add-cart" data-title="${product.title}">Ajouter au Panier</button>
        `;
        productGrid.appendChild(productCard);
    });
    
    const totalMocks = MOCK_PRODUCTS.length; 
    resultCountElement.textContent = `Affichage de ${products.length} résultats sur ${totalMocks}`;

    setupCartListeners();
}

/**
 * Fonction principale pour appliquer les filtres, le tri et la recherche.
 */
function applyFiltersAndSort() {
    let filteredProducts = MOCK_PRODUCTS;
    const { genre: currentGenre, searchQuery } = getCurrentUrlParams();
    
    let genreName = currentGenre.charAt(0).toUpperCase() + currentGenre.slice(1);

    // 1. Filtrage par Genre
    if (currentGenre && currentGenre !== 'tous') {
        filteredProducts = filteredProducts.filter(p => p.genre === currentGenre);
    }
    
    // 2. Filtrage par Mot-clé (Recherche)
    if (searchQuery) {
        categoryTitleElement.textContent = `Résultats de Recherche : "${searchQuery}"`;
        genreName = `Recherche pour "${searchQuery}"`; 
        
        const normalizedQuery = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.title.toLowerCase().includes(normalizedQuery) ||
            p.genre.toLowerCase().includes(normalizedQuery) ||
            p.author.toLowerCase().includes(normalizedQuery)
        );
    } else {
        categoryTitleElement.textContent = `Catégorie : ${genreName}`;
    }

    // 3. Filtrage par Type de Média (Checkboxes)
    const selectedMediaTypes = Array.from(mediaCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    if (selectedMediaTypes.length > 0) {
        filteredProducts = filteredProducts.filter(p => selectedMediaTypes.includes(p.mediaType));
    }

    // 4. Tri
    const sortBy = sortSelect.value;
    
    filteredProducts.sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.date) - new Date(a.date); 
        } else if (sortBy === 'oldest') {
            return new Date(a.date) - new Date(b.date); 
        } else if (sortBy === 'price_asc') {
            return a.price - b.price;
        } else if (sortBy === 'price_desc') {
             return b.price - a.price;
        }
        return 0;
    });

    renderProducts(filteredProducts);
}

function setupCategoryListeners() {
    const { genre: currentGenre, searchQuery } = getCurrentUrlParams();
    const genreName = currentGenre.charAt(0).toUpperCase() + currentGenre.slice(1);
    
    if (searchQuery) {
        document.title = `Recherche : ${searchQuery} - Kawaii Shop`;
    } else {
        document.title = `${genreName} - Catalogue Kawaii Shop`;
    }

    // On s'assure que les filtres relancent le rendu au changement
    sortSelect.addEventListener('change', applyFiltersAndSort);

    mediaCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFiltersAndSort);
    });

    applyFiltersAndSort();
}

function setupCartListeners() {
     document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productTitle = event.target.getAttribute('data-title');
            if (productTitle && typeof addToCart === 'function') { 
                addToCart(productTitle);
            } else {
                console.error("Erreur: addToCart non trouvé ou titre manquant.");
            }
        });
    });
}


// --- 3. INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {
    if (productGrid) {
        setupCategoryListeners();
    }
});
