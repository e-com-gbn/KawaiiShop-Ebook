/**
 * Fichier script.js - Logique globale du site (Panier, Modale, Navigation).
 * Ce fichier doit être chargé sur TOUTES les pages.
 */

// --- BASE DE DONNÉES MINIMALE POUR LE CALCUL DU PRIX ---
// Cette liste est essentielle pour que le panier puisse calculer le total.
const PRICE_MAP = [
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
    { id: 4, title: "Titre Shōnen A - T.1", price: 3500 },
    { id: 5, title: "Bande Dessinée B - Vol.3", price: 5000 },
    { id: 6, title: "Webtoon Mystère", price: 2800 },
    { id: 7, title: "L'Ombre Fantôme", price: 4000 },
    { id: 8, title: "Le Secret des Étoiles", price: 6000 },
    { id: 9, title: "Aventure Épique", price: 4000 },
    { id: 10, title: "Chasseurs de l'Espace", price: 3200 },
];
// --- FIN BASE DE DONNÉES MINIMALE ---


// --- 1. GESTION DU PANIER (LOCAL STORAGE) ---

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function getBasePrice(baseTitle) {
    const product = PRICE_MAP.find(p => p.title === baseTitle);
    return product ? product.price : 3000; 
}

/**
 * Ajoute un produit au panier, gérant le volume/chapitre pour product.html.
 * Reste accessible globalement pour product.js et category.js.
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
