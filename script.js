/**
 * KAWAII SHOP - ENGINE v5.0 
 * Correction : Ajout du moteur de normalisation pour les catégories
 */

// --- FONCTION DE NORMALISATION (CRUCIAL POUR LES FILTRES) ---
const normalize = (text) => 
    text ? text.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const WHATSAPP_NUM = "24162636600";

// Met à jour le compteur du panier sur toutes les pages
function updateCartCount() {
    const badges = document.querySelectorAll('.cart-count');
    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    badges.forEach(b => b.textContent = total);
}

// Fonction d'affichage universelle (utilisée par index.html et category.html)
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
                    <p>${p.summary ? p.summary.substring(0, 100) + '...' : "Un trésor exclusif disponible chez Kawaii Shop !"}</p>
                    <div style="margin-top:15px; width:100%;">
                        <a href="product.html?id=${p.id}" class="btn-glow blue" style="display:block; text-decoration:none; margin-bottom:8px;">DÉTAILS</a>
                        <button class="btn-glow gold" onclick="addToCart(${p.id})">AJOUTER AU BUTIN</button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Gestion du Panier
function addToCart(productId) {
    const product = ALL_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cartItems.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cartItems.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.imageUrl,
            quantity: 1
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    alert(`✔ ${product.title} a été ajouté à ton butin !`);
}

// Commande WhatsApp Directe (Utilisée dans product.html)
function buyNowDirect(title, price, volume, paymentMethod) {
    const message = `Bonjour KAWAII SHOP ! 🏴‍☠️\n\nJe souhaite commander :\n✨ *Produit* : ${title}\n🔢 *Volume/Tome* : ${volume}\n💰 *Prix* : ${price} FCFA\n💳 *Mode de paiement* : ${paymentMethod}`;
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(message)}`, '_blank');
}

// Lancement automatique au chargement du site
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Si on est sur l'accueil, on affiche tout
    const featuredGrid = document.getElementById('featured-grid');
    if (featuredGrid && typeof ALL_PRODUCTS !== 'undefined') {
        displayProducts(ALL_PRODUCTS, 'featured-grid');
    }
 // --- LOGIQUE DU MENU BURGER ---
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-menu');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });

        // Ferme le menu si on clique sur un lien
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('is-active');
                navLinks.classList.remove('active');
            });
        });
    }
});   
});
