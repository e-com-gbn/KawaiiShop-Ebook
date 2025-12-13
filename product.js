/**
 * Fichier product.js - Logique de la page de détail d'un produit.
 * Ajout de la logique du bouton "Acheter Maintenant (WhatsApp)".
 * Ce fichier doit être chargé APRES data.js.
 */

// --- 1. LOGIQUE DE CHARGEMENT ---

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
                
                 // Bonus: Animation de flash au clic sur le bouton 
                event.currentTarget.classList.add('clicked-flash');
                setTimeout(() => {
                    event.currentTarget.classList.remove('clicked-flash');
                }, 550);
                
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
 * Configure l'écouteur du bouton "Acheter Maintenant (WhatsApp)".
 */
function setupBuyNowListener() {
    const buyNowBtn = document.getElementById('buy-now-btn');
    const modal = document.getElementById('payment-modal');

    if (buyNowBtn && typeof addToCart === 'function' && modal) {
        buyNowBtn.addEventListener('click', (event) => {
            const productTitle = event.currentTarget.getAttribute('data-title');

            if (productTitle) {
                // 1. Ajouter le produit au panier
                // NOTE : addToCart gère les volumes et l'enregistrement dans le Local Storage.
                addToCart(productTitle);
                
                // 2. Ouvrir la modale de paiement (simule l'action du panier)
                // NOTE : La modale est définie dans cart.html, mais le DOM de la modale 
                // doit être présent sur la page product.html pour fonctionner.
                
                // Si la modale n'est pas déjà dans product.html, cela nécessitera une légère modification HTML/CSS.
                // Solution rapide : Ouvrir la modale directement si elle existe.
                // Sinon, rediriger vers la page panier.

                // Test pour l'existence de la modale sur la page produit:
                if (modal.parentNode === document.body) {
                    modal.style.display = 'block';

                    // Animation
                    event.currentTarget.classList.add('clicked-flash');
                    setTimeout(() => {
                        event.currentTarget.classList.remove('clicked-flash');
                    }, 550);

                } else {
                    // Si la modale n'est pas chargée sur product.html (cas le plus probable)
                    alert("Produit ajouté au panier. Redirection vers la page de commande.");
                    window.location.href = 'cart.html';
                }
            } else {
                console.error("Erreur: Le titre du produit est manquant pour l'achat immédiat.");
            }
        });
    }
}


/**
 * Construit et configure les miniatures de la galerie.
 */
function setupGallery(product) {
    const thumbnailsContainer = document.getElementById('gallery-thumbnails');
    const mainCover = document.getElementById('product-cover');
    
    if (!thumbnailsContainer || !mainCover) return;
    
    thumbnailsContainer.innerHTML = '';
    
    // Concaténer l'image principale et les images de la galerie
    const galleryUrls = [product.detailImageUrl || product.imageUrl, ...(product.galleryImages || [])];
    
    // Filtrer les doublons d'URL et les URL vides
    const uniqueGalleryUrls = Array.from(new Set(galleryUrls)).filter(url => url && url.length > 5);

    uniqueGalleryUrls.forEach((url, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = url.replace('600x900', '100x150'); // Utiliser un format de miniature
        thumbnail.alt = `Vue ${index + 1} de ${product.title}`;
        thumbnail.classList.add('thumbnail');
        
        // Marquer la première image comme sélectionnée
        if (index === 0) {
            thumbnail.classList.add('active');
        }
        
        thumbnail.addEventListener('click', () => {
            // 1. Changer l'image principale
            mainCover.src = url; 
            
            // 2. Mettre à jour la miniature active
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });

    // S'il n'y a qu'une seule image, masquer le conteneur des miniatures
    if (uniqueGalleryUrls.length <= 1) {
        thumbnailsContainer.style.display = 'none';
    } else {
        thumbnailsContainer.style.display = 'flex';
    }
}

/**
 * Charge les détails du produit sur la page HTML et configure les limites de volume.
 */
function loadProductDetails() {
    const productId = getProductIdFromUrl();
    const product = ALL_PRODUCTS.find(p => p.id === productId);

    if (!product) {
        // Gérer le produit non trouvé
        document.querySelector('.product-detail-page').innerHTML = `
            <h2>Produit Non Trouvé (ID: ${productId})</h2>
            <p>L\'ID spécifié n\'existe pas dans notre catalogue.</p>
            <a href="category.html?genre=tous" class="btn btn-primary">Retour au Catalogue</a>
        `;
        document.title = "Erreur - Kawaii Shop";
        return;
    }

    document.title = `${product.title} - Kawaii Shop`;
    
    const coverUrl = product.detailImageUrl || product.imageUrl.replace('300x450', '600x900'); 
    document.getElementById('product-cover').src = coverUrl;
    document.getElementById('product-cover').alt = `Couverture de ${product.title}`;
    
    // Remplissage des détails (code inchangé)
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-author').textContent = product.author;
    document.getElementById('product-rating').textContent = product.rating;
    document.getElementById('product-summary').textContent = product.summary;
    document.getElementById('product-price').textContent = `${product.price.toLocaleString('fr-FR')} FCFA`;
    document.getElementById('product-format').textContent = product.format;
    document.getElementById('product-type').textContent = product.mediaType.toUpperCase();
    document.getElementById('product-pages').textContent = `${product.pages} pages`;
    document.getElementById('product-date').textContent = product.date;

    // --- LOGIQUE GESTION DES VOLUMES (code inchangé) ---
    
    const volumeInfoElement = document.getElementById('available-volumes');
    const volumeInput = document.getElementById('volume-number');
    const volumeLabel = document.querySelector('label[for="volume-number"]');
    const volumeSelectorDiv = volumeInput ? volumeInput.closest('.volume-selector') : null;
    
    const minVol = product.minVolume || 1;
    const maxVol = product.maxVolume;

    if (maxVol && volumeSelectorDiv) {
        if (volumeInfoElement) {
            volumeInfoElement.textContent = `Disponible du Volume ${minVol} au Volume ${maxVol}.`;
            volumeInfoElement.style.display = 'block';
        }
        volumeInput.min = minVol;
        volumeInput.max = maxVol;
        volumeInput.value = minVol; 
        
        if (volumeLabel) {
             volumeLabel.textContent = `Volume ou Chapitre N° (entre ${minVol} et ${maxVol}) :`;
        }
        volumeSelectorDiv.style.display = 'flex'; 
        
    } else if(volumeSelectorDiv) {
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
    
    // Mise à jour du bouton Acheter Maintenant (Titre de base)
    const buyNowBtn = document.getElementById('buy-now-btn');
     if (buyNowBtn) {
        buyNowBtn.setAttribute('data-title', product.title);
    }
    
    // Mise à jour du Breadcrumb (code inchangé)
    const genreCapitalized = product.genre.charAt(0).toUpperCase() + product.genre.slice(1);
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `<a href="index.html">Accueil</a> &gt; <a href="category.html?genre=${product.genre}">${genreCapitalized}</a> &gt; <span>${product.title}</span>`;
    }
    
    // Initialisation de la galerie et des écouteurs
    setupGallery(product); 
    setupAddToCartListener();
    setupBuyNowListener(); // NOUVEL ÉCOUTEUR
}

// --- 3. INITIALISATION ---

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.product-page')) {
        loadProductDetails();
    }
});
