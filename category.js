/**
 * Fichier category.js - Logique de chargement, de tri, de filtrage et de recherche des produits.
 * Ce fichier doit être chargé APRES data.js.
 */

// --- 1. RÉFÉRENCES DOM et FONCTIONS ---

// NOTE : La base de données est maintenant dans ALL_PRODUCTS (définie dans data.js)

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
        
        // Utilise imageUrl pour le catalogue
        const imageUrl = product.imageUrl || product.detailImageUrl.replace('600x900', '300x450'); 

        productCard.innerHTML = `
            <a href="product.html?id=${product.id}"><img src="${imageUrl}" alt="Couverture de ${product.title}"></a>
            <h3><a href="product.html?id=${product.id}">${product.title}</a></h3>
            <p class="product-genre">${product.mediaType.toUpperCase()} ${volumeText}</p>
            <p class="price">${product.price.toLocaleString('fr-FR')} FCFA</p>
            <button class="btn btn-primary btn-add-cart" data-title="${product.title}">Ajouter au Panier</button>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Utilise ALL_PRODUCTS pour le décompte total
    const totalMocks = ALL_PRODUCTS.length; 
    resultCountElement.textContent = `Affichage de ${products.length} résultats sur ${totalMocks}`;

    setupCartListeners();
}

/**
 * Fonction principale pour appliquer les filtres, le tri et la recherche.
 */
function applyFiltersAndSort() {
    // Utilise ALL_PRODUCTS
    let filteredProducts = ALL_PRODUCTS;
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

// ... (code précédent de category.js)

function setupCartListeners() {
     document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productTitle = event.target.getAttribute('data-title');
            
            // Trouver la carte produit parente pour l'animation
            const productCard = event.target.closest('.product-card');

            if (productTitle && typeof addToCart === 'function') { 
                addToCart(productTitle);
                
                // --- AJOUT DE L'ANIMATION DE FLASH ---
                if (productCard) {
                    productCard.classList.add('clicked-flash');
                    // Supprimer la classe après l'animation (0.5s + marge)
                    setTimeout(() => {
                        productCard.classList.remove('clicked-flash');
                    }, 550); 
                }
                // ------------------------------------
                
            } else {
                console.error("Erreur: addToCart non trouvé ou titre manquant.");
            }
        });
    });
}

// ... (reste du code de category.js)


// --- 3. INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {
    if (productGrid) {
        setupCategoryListeners();
    }
});
