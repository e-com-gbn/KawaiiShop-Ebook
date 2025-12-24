/**
 * KAWAII SHOP - ENGINE v7.0 
 * Inclus : Menu Burger, Filtres Catégories, 3D Flip, Panier & WhatsApp Paiement
 */

// 1. --- CONFIGURATION & DONNÉES ---
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const WHATSAPP_NUM = "24162636600"; // Ton numéro Gabon

// Fonction de normalisation pour les catégories (Action, Fantaisie...)
const normalize = (text) => 
    text ? text.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

// 2. --- LOGIQUE DU MENU BURGER (RÉPARÉE) ---
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-menu');

    if (menuBtn && navLinks) {
        // Gestion du clic sur le bouton
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche la propagation
            menuBtn.classList.toggle('is-active');
            navLinks.classList.toggle('active');
            console.log("Menu Burger : Toggle cliqué");
        });

        // Fermer le menu si on clique sur un lien
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('is-active');
                navLinks.classList.remove('active');
            });
        });

        // Fermer le menu si on clique n'importe où ailleurs sur la page
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                menuBtn.classList.remove('is-active');
                navLinks.classList.remove('active');
            }
        });
    } else {
        console.error("Éléments du menu introuvables dans le HTML.");
    }
}

// 3. --- GESTION DU PANIER & COMPTEUR ---
function updateCartCount() {
    const badges = document.querySelectorAll('.cart-count');
    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    badges.forEach(b => b.textContent = total);
}

function addToCart(productId, volume = "1") {
    const product = ALL_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Création d'une clé unique pour différencier les volumes d'un même manga
    const itemTitle = volume ? `${product.title} (Vol. ${volume})` : product.title;
    
    const existing = cartItems.find(item => item.title === itemTitle);
    if (existing) {
        existing.quantity++;
    } else {
        cartItems.push({
            id: product.id,
            title: itemTitle,
            price: product.price,
            image: product.imageUrl,
            quantity: 1
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    alert(`✔ ${itemTitle} ajouté au butin !`);
}

// 4. --- AFFICHAGE DES PRODUITS (3D FLIP) ---
function displayProducts(products, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = "";

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-card-inner">
                <div class="card-front">
                    <img src="${p.imageUrl}" alt="${p.title}" loading="lazy">
                    <div class="card-info">
                        <h3>${p.title}</h3>
                        <p class="price">${p.price.toLocaleString()} FCFA</p>
                    </div>
                </div>
                <div class="card-back">
                    <h4>${p.title}</h4>
                    <p>${p.summary ? p.summary.substring(0, 100) + '...' : "Découvrez ce trésor manga exclusif !"}</p>
                    <div style="margin-top:15px; width:100%;">
                        <a href="product.html?id=${p.id}" class="btn-glow blue" style="display:block; text-decoration:none; margin-bottom:8px;">DÉTAILS</a>
                        <button class="btn-glow gold" onclick="addToCart(${p.id})">AJOUTER</button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 5. --- COMMANDES WHATSAPP & PAIEMENT ---
function buyNowDirect(title, price, volume, paymentMethod) {
    const message = `Bonjour KAWAII SHOP ! 🏴‍☠️\n\nJe souhaite commander :\n✨ *Produit* : ${title}\n🔢 *Volume/Tome* : ${volume}\n💰 *Prix* : ${price} FCFA\n💳 *Mode de paiement* : ${paymentMethod}`;
    const url = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// 6. --- COMPTEUR DE PERSONNES (PC UNIQUEMENT) ---
function simulatePirates() {
    const countElement = document.getElementById('pirate-count');
    if (countElement) {
        const fakeCount = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
        countElement.textContent = fakeCount;
    }
}

// 7. --- INITIALISATION GÉNÉRALE ---
document.addEventListener('DOMContentLoaded', () => {
    // Activer le menu mobile
    initMobileMenu();
    
    // Mettre à jour le panier
    updateCartCount();
    
    // Lancer le simulateur de pirates
    simulatePirates();
    setInterval(simulatePirates, 20000);

    // Si on est sur l'accueil (index.html)
    const featuredGrid = document.getElementById('featured-grid');
    if (featuredGrid && typeof ALL_PRODUCTS !== 'undefined') {
        displayProducts(ALL_PRODUCTS, 'featured-grid');
    }
});
