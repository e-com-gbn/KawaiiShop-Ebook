/**
 * Fichier script.js - Logique du Panier de Pré-commande et de la Modale de Paiement
 * Ce fichier doit être chargé sur TOUTES les pages.
 */

const WHATSAPP_NUMBER = "+24162636600"; 
let cartItems = JSON.parse(localStorage.getItem('kawaiiShopCart')) || []; 
const cartCountElement = document.querySelector('.cart-count');

// Références à la modale de paiement
const paymentModal = document.getElementById('payment-modal');
const closeModalButton = paymentModal ? paymentModal.querySelector('.close-button') : null;
const btnAirtel = document.getElementById('pay-airtel');
const btnMobicash = document.getElementById('pay-mobicash');

// Références à la barre de recherche
const toggleSearchButton = document.getElementById('toggle-search');
const searchInputWrapper = document.getElementById('search-input-wrapper');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Nouveaux éléments DOM spécifiques à cart.html
const cartListPage = document.getElementById('cart-list');
const checkoutButton = document.getElementById('checkout-button');
const summaryCount = document.getElementById('summary-count');
const summaryTotal = document.getElementById('summary-total');
const cartEmptyMessage = document.getElementById('cart-empty-message');

/**
 * Met à jour le compteur d'articles dans le header.
 */
function updateCartCount() {
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length;
    }
}

/**
 * Ajoute un article au panier. (Globale pour être appelée par category.js)
 * @param {string} title - Titre du produit.
 */
function addToCart(title) {
    cartItems.push({ title: title });
    localStorage.setItem('kawaiiShopCart', JSON.stringify(cartItems));
    updateCartCount();
    alert(`"${title}" a été ajouté à votre panier de pré-commande !`);
}

/**
 * Supprime un article du panier.
 * @param {string} title - Titre du produit à supprimer.
 */
function removeItemFromCart(title) {
    const index = cartItems.findIndex(item => item.title === title);
    
    if (index !== -1) {
        cartItems.splice(index, 1); 
        localStorage.setItem('kawaiiShopCart', JSON.stringify(cartItems));
        updateCartCount();
        renderCartItems(); // Re-render le panier sur cart.html
    }
}

/**
 * Génère le message WhatsApp final.
 * @param {string} paymentMethod - Méthode choisie ('Airtel Money' ou 'Mobicash').
 */
function generateWhatsAppLink(paymentMethod) {
    if (cartItems.length === 0) {
        alert("Votre panier est vide. Veuillez ajouter des articles avant de commander.");
        return;
    }

    const uniqueTitles = [...new Set(cartItems.map(item => item.title))];
    const titlesList = uniqueTitles.map((title, index) => `${index + 1}. ${title}`).join('\n');

    const message = `Bonjour, je souhaite passer la commande suivante (Kawaii Shop) :
    
${titlesList}

Ma méthode de paiement préférée est : ${paymentMethod}.
Veuillez m'indiquer la procédure pour finaliser la commande. Merci.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}


/**
 * Affiche les articles du panier sur la page cart.html et met à jour le résumé.
 */
function renderCartItems() {
    if (!cartListPage) return; 

    cartListPage.innerHTML = ''; 
    
    if (cartItems.length === 0) {
        cartEmptyMessage.style.display = 'block';
        checkoutButton.disabled = true;
        summaryCount.textContent = '0';
        summaryTotal.textContent = '0 XAF';
        return;
    }
    
    cartEmptyMessage.style.display = 'none';
    checkoutButton.disabled = false;

    const totalItems = cartItems.length;
    const EXAMPLE_PRICE = 3000;
    const estimatedTotal = totalItems * EXAMPLE_PRICE; 

    // Créer la liste des éléments du panier
    cartItems.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div class="item-details">
                <span class="item-title">${item.title}</span>
                <span class="item-price">${EXAMPLE_PRICE} XAF</span>
            </div>
            <button class="btn-remove" data-title="${item.title}">Supprimer</button>
        `;
        cartListPage.appendChild(itemDiv);
    });

    // Mettre à jour les résumés
    summaryCount.textContent = totalItems;
    summaryTotal.textContent = `${estimatedTotal} XAF (est.)`;
    
    // Ajouter les écouteurs de suppression
    document.querySelectorAll('.btn-remove').forEach(button => {
        button.addEventListener('click', (event) => {
            const titleToRemove = event.target.getAttribute('data-title');
            removeItemFromCart(titleToRemove);
        });
    });
}

/**
 * Affiche ou masque la barre de recherche.
 */
function toggleSearch() {
    if (searchInputWrapper) {
        searchInputWrapper.classList.toggle('hidden');
        searchInputWrapper.classList.toggle('visible');
        if (searchInputWrapper.classList.contains('visible')) {
            searchInput.focus(); // Met le curseur dans le champ de recherche
        }
    }
}

/**
 * Exécute la fonction de recherche.
 */
function performSearch() {
    const query = searchInput.value.trim();
    if (query.length > 2) {
        // Rediriger vers la page de catégorie avec le terme de recherche
        window.location.href = `category.html?genre=tous&search=${encodeURIComponent(query)}`;
    } else {
        alert("Veuillez entrer au moins 3 caractères pour la recherche.");
    }
}


/**
 * Initialisation des écouteurs d'événements
 */
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // 1. Logique de la barre de recherche
    if (toggleSearchButton) {
        toggleSearchButton.addEventListener('click', toggleSearch);
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }

    // 2. Écouteurs pour le bouton 'Ajouter au Panier' (pages non dynamiques)
    if (!document.querySelector('.product-grid')) {
        document.querySelectorAll('.btn-add-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productTitle = event.target.getAttribute('data-title');
                if (productTitle) {
                    addToCart(productTitle);
                }
            });
        });
    }

    // 3. Logique de la Modale de Paiement
    if (paymentModal) {
        
        if (closeModalButton) {
            closeModalButton.addEventListener('click', () => {
                paymentModal.style.display = 'none';
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === paymentModal) {
                paymentModal.style.display = 'none';
            }
        });

        if (btnAirtel) {
             btnAirtel.addEventListener('click', () => {
                generateWhatsAppLink('Airtel Money');
                paymentModal.style.display = 'none';
            });
        }

        if (btnMobicash) {
            btnMobicash.addEventListener('click', () => {
                generateWhatsAppLink('Mobicash');
                paymentModal.style.display = 'none';
            });
        }
    }

    // 4. Logique spécifique à la Page Panier
    if (cartListPage) {
        renderCartItems();
        
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                if (cartItems.length > 0) {
                    paymentModal.style.display = 'block';
                } else {
                    alert("Votre panier est vide.");
                }
            });
        }
    }
});