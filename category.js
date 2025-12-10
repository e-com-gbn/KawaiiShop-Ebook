/**
 * Fichier category.js - Logique de chargement, de tri, de filtrage et de recherche des produits.
 * Ce fichier doit être chargé UNIQUEMENT sur category.html.
 */

// --- 1. SIMULATION DE BASE DE DONNÉES (Pour l'exemple) ---

const MOCK_PRODUCTS = [
    { id: 4, title: "Titre Shōnen A - T.1", genre: "action", mediaType: "manga", price: 3500, date: "2024-01-15", imageUrl: "https://via.placeholder.com/300x450/FF8C00/FFFFFF?text=Shonen+1" },
    { id: 5, title: "Bande Dessinée B - Vol.3", genre: "action", mediaType: "comics", price: 5000, date: "2023-11-20", imageUrl: "https://via.placeholder.com/300x450/4169E1/FFFFFF?text=Shonen+2" },
    { id: 6, title: "Webtoon Mystère", genre: "action", mediaType: "scan", price: 2800, date: "2024-05-01", imageUrl: "https://via.placeholder.com/300x450/7FFFD4/333333?text=Webtoon+Shonen" },
    { id: 7, title: "L'Ombre Fantôme", genre: "fantasy", mediaType: "manga", price: 4000, date: "2023-09-10", imageUrl: "https://via.placeholder.com/300x450/DAA520/FFFFFF?text=Fantasy+A" },
    { id: 8, title: "Le Secret des Étoiles", genre: "scifi", mediaType: "comics", price: 6000, date: "2024-02-28", imageUrl: "https://via.placeholder.com/300x450/8B008B/FFFFFF?text=SciFi+B" },
    { id: 9, title: "Aventure Épique", genre: "fantasy", mediaType: "manga", price: 4000, date: "2024-08-10", imageUrl: "https://via.placeholder.com/300x450/DAA520/FFFFFF?text=Fantasy+B" },
    { id: 10, title: "Chasseurs de l'Espace", genre: "scifi", mediaType: "manga", price: 3200, date: "2023-12-01", imageUrl: "https://via.placeholder.com/300x450/8B008B/FFFFFF?text=SciFi+C" },
];

// --- 2. RÉFÉRENCES DOM ---

const productGrid = document.querySelector('.product-grid');
const categoryTitleElement = document.getElementById('category-title');
const resultCountElement = document.getElementById('result-count');
const sortSelect = document.getElementById('sort-by-date');
const mediaCheckboxes = document.querySelectorAll('input[name="media-type"]');
const applyFiltersButton = document.querySelector('.apply-filters');

// --- 3. FONCTIONS DE GESTION DU CATALOGUE ---

/**
 * Extrait le genre et le terme de recherche de l'URL.
 */
function getCurrentUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        genre: params.get('genre') || 'tous',
        searchQuery: params.get('search') || ''
    };
}

/**
 * Affiche les produits filtrés et triés dans la grille HTML.
 */
function renderProducts(products) {
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
        
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}"><img src="${product.imageUrl}" alt="Couverture de ${product.title}"></a>
            <h3><a href="product.html?id=${product.id}">${product.title}</a></h3>
            <p class="product-genre">${product.mediaType.toUpperCase()}</p>
            <p class="price">${product.price} XAF</p>
            <button class="btn btn-add-cart" data-title="${product.title}">Ajouter au Panier</button>
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

    // 1. Filtrage par Genre (Toujours appliqué, sauf si 'tous')
    if (currentGenre && currentGenre !== 'tous') {
        filteredProducts = filteredProducts.filter(p => p.genre === currentGenre);
    }
    
    // 2. Filtrage par Mot-clé (Recherche)
    if (searchQuery) {
        categoryTitleElement.textContent = `Résultats de Recherche : "${searchQuery}"`;
        genreName = `Recherche pour "${searchQuery}"`; // Utiliser pour le titre
        
        const normalizedQuery = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.title.toLowerCase().includes(normalizedQuery) ||
            p.genre.toLowerCase().includes(normalizedQuery)
        );
    } else {
        // Si pas de recherche, utiliser le genre
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
        }
        return 0;
    });

    renderProducts(filteredProducts);
}

/**
 * Configuration des écouteurs de la page.
 */
function setupCategoryListeners() {
    const { genre: currentGenre, searchQuery } = getCurrentUrlParams();
    const genreName = currentGenre.toUpperCase();
    
    if (searchQuery) {
        document.title = `Recherche : ${searchQuery} - Kawaii Shop`;
    } else {
        document.title = `${genreName} - Catalogue Kawaii Shop`;
    }

    applyFiltersButton.addEventListener('click', applyFiltersAndSort);
    sortSelect.addEventListener('change', applyFiltersAndSort);

    // Recharger les filtres si une checkbox change (plus UX que d'attendre le bouton)
    mediaCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFiltersAndSort);
    });

    applyFiltersAndSort();
}

/**
 * Fonction pour réappliquer les écouteurs du panier (ajoutés dynamiquement).
 */
function setupCartListeners() {
     document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productTitle = event.target.getAttribute('data-title');
            if (productTitle && typeof addToCart === 'function') { 
                // addToCart est dans script.js (fichier global)
                addToCart(productTitle);
            } else {
                console.error("Fonction addToCart non trouvée. Assurez-vous que script.js est chargé avant category.js.");
            }
        });
    });
}


// --- 4. INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {
    if (productGrid) {
        setupCategoryListeners();
    }
});