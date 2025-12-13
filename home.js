/**
 * Fichier home.js - Logique spécifique à la page d'accueil (index.html).
 * Charge les produits vedettes et gère les écouteurs du panier.
 * Ce fichier doit être chargé APRES data.js.
 */

// --- 1. BASE DE DONNÉES SIMULÉE (maintenant dans data.js) ---
// La variable ALL_PRODUCTS est utilisée.

/**
 * Affiche une sélection des produits sur la page d'accueil.
 */
function renderFeaturedProducts() {
    const featuredGrid = document.getElementById('featured-grid');
    if (!featuredGrid) return;

    // 1. Sélection : Trie par date et ne prend que les 4 plus récents
    // Utilise ALL_PRODUCTS
    const featuredProducts = ALL_PRODUCTS
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4); 

    featuredGrid.innerHTML = ''; 

    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // Affichage de la plage de volumes (si applicable)
        const volumeText = product.maxVolume ? `(Vol. ${product.minVolume} à ${product.maxVolume})` : `(Tome Unique)`;

        productCard.innerHTML = `
            <a href="product.html?id=${product.id}"><img src="${product.imageUrl}" alt="Couverture de ${product.title}"></a>
            <h3><a href="product.html?id=${product.id}">${product.title}</a></h3>
            <p class="product-genre">${product.mediaType.toUpperCase()} ${volumeText}</p>
            <p class="price">${product.price.toLocaleString('fr-FR')} XAF</p>
            <button class="btn btn-primary btn-add-cart" data-title="${product.title}">Ajouter au Panier</button>
        `;
        featuredGrid.appendChild(productCard);
    });
    
    // 2. Initialisation des écouteurs du panier
    setupHomeCartListeners();
}

/**
 * Configure les écouteurs pour les boutons "Ajouter au Panier" de la page d'accueil.
 * (Utilise la fonction globale 'addToCart' de script.js)
 */
// ... (code précédent de home.js)

function setupHomeCartListeners() {
     document.querySelectorAll('#featured-grid .btn-add-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productTitle = event.target.getAttribute('data-title');
            
            // Trouver la carte produit parente pour l'animation
            const productCard = event.target.closest('.product-card');
            
            // On vérifie que addToCart (dans script.js) est bien chargé
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

// ... (reste du code de home.js)


// --- 3. INITIALISATION ---

document.addEventListener('DOMContentLoaded', () => {
    // S'assurer que nous sommes bien sur la page d'accueil avant de charger les produits
    if (document.body.classList.contains('home-page')) {
        renderFeaturedProducts();
    }
});