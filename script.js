/**
 * Fichier script.js - Logique globale du site (Panier, Modale, Navigation).
 * Ce fichier doit être chargé sur TOUTES les pages, APRES data.js.
 */

// NOTE : Les données de prix (PRICE_MAP) sont maintenant définies dans data.js

// --- 1. GESTION DU PANIER (LOCAL STORAGE) ---

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function getBasePrice(baseTitle) {
    // UTILISE LA VARIABLE PRICE_MAP DE data.js
    // Si data.js est correctement chargé, PRICE_MAP existe.
    if (typeof PRICE_MAP === 'undefined') {
         console.error("ERREUR CRITIQUE : PRICE_MAP n'est pas défini. Vérifiez si data.js est chargé en premier.");
         return 3000; // Prix par défaut de secours
    }
    
    const product = PRICE_MAP.find(p => p.title === baseTitle);
    return product ? product.price : 3000; 
}

/**
 * Ajoute un produit au panier, gérant le volume/chapitre pour product.html.
 * Reste accessible globalement pour product.js, category.js, et home.js.
 */
function addToCart(productTitle) {
    let volumeNumber = null;
    let finalTitle = productTitle;
    let baseTitle = productTitle;

    const volumeInput = document.getElementById('volume-number');
    
    // Si nous sommes sur la page produit et qu'un sélecteur de volume existe
    if (volumeInput) {
        volumeNumber = parseInt(volumeInput.value);
        
        const minVal = parseInt(volumeInput.min) || 1;
        const maxVal = parseInt(volumeInput.max) || 999;
        
        // S'assurer que le volume est dans la plage autorisée
        if (volumeNumber < minVal) {
             volumeNumber = minVal;
        } else if (volumeNumber > maxVal) {
             volumeNumber = maxVal;
        }
        
        if (volumeNumber && volumeNumber > 0) {
            finalTitle = `${productTitle} (Vol. ${volumeNumber})`;
        }
    }
    
    const existingItem = cartItems.find(item => item.title === finalTitle);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ 
            title: finalTitle, 
            quantity: 1, 
            baseTitle: baseTitle, 
            volume: volumeNumber || null 
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
    
    alert(`"${finalTitle}" a été ajouté au panier !`);
}

function updateCartDisplay() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

/**
 * Charge les articles du panier sur la page cart.html et calcule le total.
 */
function renderCartItems() {
    const container = document.getElementById('cart-items-list');
    const summaryTotal = document.getElementById('cart-summary-total');
    
    if (!container || !summaryTotal) return; 

    container.innerHTML = '';
    
    if (cartItems.length === 0) {
        container.innerHTML = '<p>Votre panier est vide. Visitez le <a href="category.html?genre=tous">catalogue</a> pour commencer vos pré-commandes !</p>';
        summaryTotal.textContent = '0 FCFA';
        return;
    }
    
    let grandTotal = 0;

    cartItems.forEach((item, index) => {
        const basePrice = getBasePrice(item.baseTitle); 
        const itemTotalPrice = item.quantity * basePrice;
        grandTotal += itemTotalPrice;

        item.price = basePrice; 
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        itemElement.innerHTML = `
            <div class="item-details">
                <span class="item-title">${item.title} (x${item.quantity})</span>
                <span class="item-price">Prix unitaire : ${basePrice.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <button class="btn-remove" data-index="${index}">Retirer</button>
        `;
        container.appendChild(itemElement);
    });

    summaryTotal.textContent = `${grandTotal.toLocaleString('fr-FR')} FCFA`;
    setupRemoveListeners(); 
}

function removeItemFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
    renderCartItems(); 
}

function setupRemoveListeners() {
    document.querySelectorAll('.btn-remove').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeItemFromCart(index);
        });
    });
}


// --- 2. GESTION DE LA MODALE ET DU CHECKOUT ---

function setupCheckout() {
    const checkoutButton = document.getElementById('checkout-button');
    const modal = document.getElementById('payment-modal');
    const closeButton = document.querySelector('.close-button');
    const paymentOptionsContainer = document.querySelector('.payment-options');

    if (checkoutButton && modal) {
        checkoutButton.addEventListener('click', () => {
            renderCartItems(); 
            
            if (cartItems.length > 0) {
                 modal.style.display = 'block';
            } else {
                 alert("Votre panier est vide !");
            }
        });

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });

        if (paymentOptionsContainer) {
             paymentOptionsContainer.addEventListener('click', (event) => {
                const option = event.target.closest('.payment-option'); 
                if (option) {
                    const method = option.getAttribute('data-method');
                    generateWhatsAppLink(method);
                }
            });
        }
    }
}

/**
 * Génère le message et ouvre le lien WhatsApp.
 */
function generateWhatsAppLink(method) {
    if (cartItems.length === 0) return;

    renderCartItems(); 
    
    let message = "Bonjour Kawaii Shop,\n\n";
    message += `Je souhaite pré-commander les articles suivants (${method}):\n\n`;
    
    let grandTotal = 0;

    cartItems.forEach(item => {
        const basePrice = getBasePrice(item.baseTitle);
        const itemTotal = item.quantity * basePrice;
        grandTotal += itemTotal;
        
        let line = `* ${item.title} (x${item.quantity}) - ${itemTotal.toLocaleString('fr-FR')} FCFA\n`;
        message += line;
    });

    message += `\nMontant Total Calculé : *${grandTotal.toLocaleString('fr-FR')} FCFA*.\n`;
    message += `Méthode de Paiement choisie : *${method}*.\n\n`;
    message += "Merci de m'indiquer la procédure à suivre pour finaliser le paiement.";

    // Numéro de téléphone cible (à remplacer par le vrai numéro)
    const phoneNumber = '24162636600'; 
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    
    const modal = document.getElementById('payment-modal');
    if (modal) modal.style.display = 'none';
    
    // Vider le panier après génération du lien (pour simuler la commande envoyée)
    cartItems = [];
    localStorage.removeItem('cartItems');
    updateCartDisplay();
}


// --- 3. GESTION DE LA RECHERCHE (HEADER) ---

function setupSearchToggle() {
    const toggleButton = document.getElementById('toggle-search');
    const searchWrapper = document.getElementById('search-input-wrapper');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (!toggleButton || !searchWrapper) return;

    toggleButton.addEventListener('click', () => {
        const isVisible = searchWrapper.classList.contains('visible');
        if (isVisible) {
            searchWrapper.classList.remove('visible');
            searchWrapper.classList.add('hidden');
        } else {
            searchWrapper.classList.remove('hidden');
            searchWrapper.classList.add('visible');
            searchInput.focus();
        }
    });
    
    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `category.html?search=${encodeURIComponent(query)}`;
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}


// --- 4. INITIALISATION GÉNÉRALE ---

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay(); 
    setupSearchToggle(); 

    // Initialisation conditionnelle pour la page Panier
    if (document.body.classList.contains('cart-page')) {
        renderCartItems();
        setupCheckout();
    }
});
