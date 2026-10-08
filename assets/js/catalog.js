/**
 * Sami Enterprises - Dedicated Shopping Catalog Engine (catalog.js)
 * Multi-Image Gallery Slider, Standalone E-Commerce Catalog, Dual Card Buttons & Full-Screen Detail View
 */

(function() {
    'use strict';

    // 1. Cart State Management (Synchronized with localStorage)
    let cartItems = [];
    try {
        const storedCart = localStorage.getItem('sami_woodcraft_cart');
        if (storedCart) {
            cartItems = JSON.parse(storedCart);
        }
    } catch (e) {
        cartItems = [];
    }

    function saveCart() {
        try {
            localStorage.setItem('sami_woodcraft_cart', JSON.stringify(cartItems));
        } catch (e) {}
        updateCartBadge();
        renderCartDrawer();
    }

    // State Variables
    let activeModalProduct = null;
    let modalSelectedQty = 1;
    let currentFilter = 'all';
    let modalLowerFilter = 'all';
    let currentGalleryIndex = 0;
    let savedCatalogScrollY = 0;
    let isModalOpen = false;

    // 2. Main Catalog App Render
    function renderCatalogApp() {
        const app = document.getElementById('catalog-app');
        if (!app) return;

        app.innerHTML = `
            <!-- Background Canvas Grid -->
            <canvas id="bunki-canvas"></canvas>

            <!-- Minimalist Top Navbar -->
            <nav id="navbar" class="catalog-navbar">
                <a href="index.html" class="logo-container" title="Back to Homepage">
                    <i class="fa-solid fa-arrow-left text-sm mr-1.5 opacity-80 hover:opacity-100 transition"></i>
                    <img src="assets/images/logo.png" alt="Sami Enterprises Logo">
                    <span>Sami Enterprises</span>
                </a>
                
                <!-- Right Corner Controls -->
                <div class="flex items-center gap-3">
                    <div id="theme-toggle" onclick="window.samiCatalog.toggleTheme()" title="Toggle Dark/Light Mode">
                        <i class="fas fa-sun"></i>
                    </div>
                    <button class="nav-cart-trigger" onclick="window.samiCatalog.openCartDrawer()" title="View Cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span class="nav-cart-badge" id="nav-cart-count">0</span>
                    </button>
                </div>
                <div class="nav-glow-line"></div>
            </nav>

            <!-- Catalog Header Banner -->
            <header class="catalog-hero-header">
                <div class="container py-6 text-center">
                    <span class="text-[10px] tracking-widest uppercase font-bold text-accent block mb-1">Handcrafted Heritage Woodcraft</span>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-primary mb-2">Artisan Shopping Catalog</h1>
                    <p class="text-xs text-muted max-w-xl mx-auto leading-relaxed">
                        Explore 53 signature handcrafted pieces from Saharanpur master artisans. Click any card to view full specifications and multi-angle views.
                    </p>
                </div>
            </header>

            <!-- Main Catalog Content Container -->
            <main class="container py-4">
                <!-- Category Filter Tabs -->
                <div class="catalog-filters-wrapper">
                    <div class="catalog-filters-track">
                        <button class="catalog-filter-btn active" onclick="window.samiCatalog.setFilter('all', this)">
                            <i class="fa-solid fa-cubes"></i> All Items <span class="filter-count">53</span>
                        </button>
                        <button class="catalog-filter-btn" onclick="window.samiCatalog.setFilter('pooja-spiritual', this)">
                            <i class="fa-solid fa-om"></i> Pooja & Spiritual <span class="filter-count">10</span>
                        </button>
                        <button class="catalog-filter-btn" onclick="window.samiCatalog.setFilter('kitchen-dining', this)">
                            <i class="fa-solid fa-utensils"></i> Kitchen & Dining <span class="filter-count">12</span>
                        </button>
                        <button class="catalog-filter-btn" onclick="window.samiCatalog.setFilter('furniture-partitions', this)">
                            <i class="fa-solid fa-chair"></i> Furniture & Partitions <span class="filter-count">13</span>
                        </button>
                        <button class="catalog-filter-btn" onclick="window.samiCatalog.setFilter('wall-decor', this)">
                            <i class="fa-solid fa-layer-group"></i> Wall Decor & Organizers <span class="filter-count">10</span>
                        </button>
                        <button class="catalog-filter-btn" onclick="window.samiCatalog.setFilter('keepsakes-novelties', this)">
                            <i class="fa-solid fa-gift"></i> Keepsakes & Novelties <span class="filter-count">8</span>
                        </button>
                    </div>
                </div>

                <!-- 50 Products Grid -->
                <div class="catalog-products-grid" id="catalog-products-grid">
                    <!-- Products Injected Here -->
                </div>

                <!-- Custom Order Banner -->
                <div class="custom-order-banner mt-8">
                    <div class="custom-banner-content">
                        <div class="custom-banner-icon">
                            <i class="fa-solid fa-ruler-combined"></i>
                        </div>
                        <div class="custom-banner-text">
                            <h3>Looking for Custom Woodwork or Specific Dimensions?</h3>
                            <p>We manufacture bespoke chauki, temple doors, jali partitions, and customized furniture tailored to your architectural requirements.</p>
                        </div>
                        <div class="custom-banner-action">
                            <a href="index.html#contact" class="custom-banner-btn">
                                <i class="fa-solid fa-pen-nib mr-1.5"></i> Request Custom Design
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Full-Screen E-Commerce Product Detail View (with Multi-Image Gallery Slider) -->
            <div id="product-detail-modal" class="fullscreen-product-view" onclick="window.samiCatalog.handleModalBackdropClick(event)">
                <!-- Permanent Sticky Top Bar with Theme Toggle, Cart & Close -->
                <div class="fullscreen-detail-topbar">
                    <button class="btn-detail-back" onclick="window.samiCatalog.closeProductModal()">
                        <i class="fa-solid fa-arrow-left"></i> <span>Back</span>
                    </button>
                    <div class="flex items-center gap-3">
                        <div id="modal-theme-toggle" class="cursor-pointer text-primary hover:text-accent transition text-base p-1.5" onclick="window.samiCatalog.toggleTheme()" title="Toggle Dark/Light Mode">
                            <i class="fas fa-sun"></i>
                        </div>
                        <button class="nav-cart-trigger" onclick="window.samiCatalog.openCartDrawer()" title="View Cart">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span class="nav-cart-badge" id="modal-nav-cart-count">0</span>
                        </button>
                        <button class="btn-detail-close" onclick="window.samiCatalog.closeProductModal()" aria-label="Close view">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>

                <!-- Scrollable Full-Screen Content Body -->
                <div class="fullscreen-detail-body" id="product-modal-content">
                    <!-- Dynamic Product Details & All Listed Products Injected Here -->
                </div>
            </div>

            <!-- Slide-Out Cart Drawer -->
            <div class="cart-overlay" id="cart-overlay" onclick="window.samiCatalog.closeCartDrawer()"></div>
            <aside class="cart-drawer" id="cart-drawer" aria-label="Shopping Cart Drawer">
                <div class="cart-drawer-header">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-bag-shopping text-accent text-lg"></i>
                        <h3 class="font-bold text-base text-primary">Your Woodcraft Cart</h3>
                        <span class="cart-badge-counter" id="cart-drawer-item-count">0</span>
                    </div>
                    <button class="cart-close-btn" onclick="window.samiCatalog.closeCartDrawer()" title="Close Cart">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div class="cart-items-container" id="cart-items-container">
                    <!-- Cart items injected here -->
                </div>

                <div class="cart-drawer-footer" id="cart-drawer-footer">
                    <div class="cart-summary-row">
                        <span class="text-xs font-semibold text-muted">Total Items Selected:</span>
                        <span class="text-sm font-bold text-primary" id="cart-total-qty">0 items</span>
                    </div>
                    <div class="cart-pincode-wrapper">
                        <label for="cart-delivery-location" class="block text-[11px] font-bold text-muted mb-1 uppercase tracking-wider">
                            <i class="fa-solid fa-location-dot text-accent mr-1"></i> Enter Pincode / Area
                        </label>
                        <input type="text" id="cart-delivery-location" class="form-control text-xs py-2" placeholder="Enter Pincode / Area">
                    </div>
                    <button class="btn-cart-whatsapp" onclick="window.samiCatalog.sendCartToWhatsApp()">
                        <i class="fa-brands fa-whatsapp text-lg"></i>
                        <span>Order via WhatsApp</span>
                    </button>
                    <p class="text-[10px] text-center text-muted mt-2">
                        <i class="fa-solid fa-lock text-[9px] mr-1"></i> Direct chat with Master Artisans (+91 90453 88600)
                    </p>
                </div>
            </aside>

            <!-- Cart Toast Alert -->
            <div id="cart-toast" class="cart-toast">
                <i class="fa-solid fa-circle-check text-emerald-400 mr-2 text-sm"></i>
                <span id="cart-toast-msg">Item added to cart!</span>
            </div>

            <!-- Footer -->
            <footer class="mt-12">
                <div class="container py-6 text-center">
                    <p>© 2026 Sami Enterprises. All Rights Reserved. Master Artisans of Saharanpur Woodcraft.</p>
                </div>
            </footer>
        `;

        renderProductGrid('all');
        updateCartBadge();
        renderCartDrawer();
        initListeners();
        initCanvas();
        initCatalogHistory();
    }

    function initCatalogHistory() {
        if (!window.history.state) {
            window.history.replaceState({ page: 'catalog' }, '', window.location.pathname + (window.location.hash || ''));
        }

        window.addEventListener('popstate', (e) => {
            // 1. If cart drawer is open, close it
            const drawer = document.getElementById('cart-drawer');
            if (drawer && drawer.classList.contains('active')) {
                closeCartDrawerInternal();
                return;
            }

            // 2. If product detail modal is open
            const modal = document.getElementById('product-detail-modal');
            if (modal && modal.classList.contains('active')) {
                if (e.state && e.state.modal === 'product' && e.state.id) {
                    openProductModal(e.state.id, false);
                } else {
                    closeProductModalInternal();
                }
                return;
            }
        });

        // If URL has #product-12 on page load, open it
        if (window.location.hash.startsWith('#product-')) {
            const prodId = parseInt(window.location.hash.replace('#product-', ''), 10);
            if (!isNaN(prodId)) {
                setTimeout(() => openProductModal(prodId, false), 150);
            }
        }
    }

    // 3. Render Product Cards Grid (Clean Dual Action Buttons)
    function renderProductGrid(filterCat = 'all') {
        const grid = document.getElementById('catalog-products-grid');
        if (!grid) return;

        const allProducts = window.SAMI_CATALOG_PRODUCTS || [];
        const filtered = filterCat === 'all' 
            ? allProducts 
            : allProducts.filter(p => p.category === filterCat);

        let html = '';
        filtered.forEach(prod => {
            const productImages = prod.images && prod.images.length > 0 ? prod.images : [prod.img];
            const imageCountBadge = productImages.length > 1 ? `<span class="product-gallery-count-badge"><i class="fa-regular fa-images mr-1"></i>${productImages.length}</span>` : '';

            html += `
                <div class="product-card" data-category="${prod.category}" onclick="window.samiCatalog.openProductModal(${prod.id})">
                    <div class="product-img-wrapper">
                        <img src="${prod.img}" alt="${prod.name}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/cat_tableware.jpg';">
                        <span class="product-badge">${prod.categoryName}</span>
                        ${imageCountBadge}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title" title="${prod.name}">${prod.name}</h3>
                        
                        <!-- Dual Action Buttons -->
                        <div class="product-card-actions">
                            <button class="card-btn-cart" id="card-cart-btn-${prod.id}" onclick="event.stopPropagation(); window.samiCatalog.quickAddToCart(${prod.id})">
                                <i class="fa-solid fa-cart-plus"></i>
                                <span>Add to Cart</span>
                            </button>
                            <button class="card-btn-buy" onclick="event.stopPropagation(); window.samiCatalog.quickBuyNow(${prod.id})">
                                <i class="fa-brands fa-whatsapp"></i>
                                <span>Buy Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;
    }

    // 4. Multi-Image Gallery Switcher
    function switchGalleryImage(index) {
        if (!activeModalProduct) return;
        const images = activeModalProduct.images && activeModalProduct.images.length > 0 
            ? activeModalProduct.images 
            : [activeModalProduct.img];

        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentGalleryIndex = index;

        const mainImg = document.getElementById('modal-main-gallery-img');
        if (mainImg) {
            mainImg.style.opacity = '0.4';
            mainImg.src = images[currentGalleryIndex];
            mainImg.onload = () => { mainImg.style.opacity = '1'; };
        }

        const countDisplay = document.getElementById('gallery-counter-display');
        if (countDisplay) {
            countDisplay.innerText = `${currentGalleryIndex + 1} / ${images.length}`;
        }

        document.querySelectorAll('.gallery-thumb-item').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentGalleryIndex);
        });
    }

    function galleryNext() {
        switchGalleryImage(currentGalleryIndex + 1);
    }

    function galleryPrev() {
        switchGalleryImage(currentGalleryIndex - 1);
    }

    // 5. Full-Screen E-Commerce Product Detail View (With Multi-Image Gallery Slider & All Products Below)
    function openProductModal(productId, pushState = true) {
        const allProducts = window.SAMI_CATALOG_PRODUCTS || [];
        const prod = allProducts.find(p => p.id === productId);
        if (!prod) return;

        // Point 2: Memorize Catalog Grid Scroll Position before modal opens
        if (!isModalOpen) {
            savedCatalogScrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
            isModalOpen = true;
        }

        if (pushState) {
            window.history.pushState({ modal: 'product', id: productId }, '', '#product-' + productId);
        }

        activeModalProduct = prod;
        modalSelectedQty = 1;
        currentGalleryIndex = 0;

        const modal = document.getElementById('product-detail-modal');
        const content = document.getElementById('product-modal-content');
        if (!modal || !content) return;

        // Image Gallery Preparation
        const productImages = prod.images && prod.images.length > 0 ? prod.images : [prod.img];
        let thumbsHTML = '';
        let galleryControlsHTML = '';

        if (productImages.length > 1) {
            thumbsHTML = `<div class="gallery-thumbs-row">`;
            productImages.forEach((imgUrl, idx) => {
                thumbsHTML += `
                    <div class="gallery-thumb-item ${idx === 0 ? 'active' : ''}" onclick="window.samiCatalog.switchGalleryImage(${idx})">
                        <img src="${imgUrl}" alt="${prod.name} angle ${idx + 1}" onerror="this.onerror=null; this.src='assets/images/cat_tableware.jpg';">
                    </div>
                `;
            });
            thumbsHTML += `</div>`;

            galleryControlsHTML = `
                <button class="gallery-nav-btn gallery-prev" onclick="window.samiCatalog.galleryPrev()" aria-label="Previous image">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button class="gallery-nav-btn gallery-next" onclick="window.samiCatalog.galleryNext()" aria-label="Next image">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
                <div class="gallery-counter" id="gallery-counter-display">1 / ${productImages.length}</div>
            `;
        }

        // Point 3: Dynamic Smart Related Products & Category Siblings First
        modalLowerFilter = 'same';
        const otherProducts = allProducts.filter(p => p.id !== prod.id);
        const sameCategoryProducts = otherProducts.filter(p => p.category === prod.category);
        const otherCategoryProducts = otherProducts.filter(p => p.category !== prod.category);
        
        // Initial list to display: Same category products first!
        const initialRelated = sameCategoryProducts.length > 0 ? sameCategoryProducts : otherCategoryProducts;

        let allOtherCardsHTML = '';
        initialRelated.forEach(rel => {
            const relImages = rel.images && rel.images.length > 0 ? rel.images : [rel.img];
            const relCountBadge = relImages.length > 1 ? `<span class="product-gallery-count-badge"><i class="fa-regular fa-images mr-1"></i>${relImages.length}</span>` : '';

            allOtherCardsHTML += `
                <div class="product-card lower-catalog-card" data-category="${rel.category}" onclick="window.samiCatalog.openProductModal(${rel.id})">
                    <div class="product-img-wrapper">
                        <img src="${rel.img}" alt="${rel.name}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/cat_tableware.jpg';">
                        <span class="product-badge">${rel.categoryName}</span>
                        ${relCountBadge}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title" title="${rel.name}">${rel.name}</h3>
                        <div class="product-card-actions">
                            <button class="card-btn-cart" id="modal-card-cart-btn-${rel.id}" onclick="event.stopPropagation(); window.samiCatalog.quickAddToCart(${rel.id})">
                                <i class="fa-solid fa-cart-plus"></i>
                                <span>Add to Cart</span>
                            </button>
                            <button class="card-btn-buy" onclick="event.stopPropagation(); window.samiCatalog.quickBuyNow(${rel.id})">
                                <i class="fa-brands fa-whatsapp"></i>
                                <span>Buy Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        content.innerHTML = `
            <div class="fullscreen-detail-container">
                <div class="fullscreen-detail-main-grid">
                    <!-- Left Column: 1:1 Multi-Image Gallery Slider -->
                    <div class="fullscreen-image-col">
                        <div class="fullscreen-img-wrapper relative overflow-hidden">
                            <img src="${productImages[0]}" alt="${prod.name}" id="modal-main-gallery-img" class="fullscreen-img transition-opacity duration-300" onerror="this.onerror=null; this.src='assets/images/cat_tableware.jpg';">
                            ${galleryControlsHTML}
                        </div>
                        ${thumbsHTML}
                    </div>

                    <!-- Right Column: Product Specifications & Actions -->
                    <div class="fullscreen-info-col">
                        <div class="fullscreen-badge-row">
                            <span class="fullscreen-badge">${prod.categoryName}</span>
                            <span class="fullscreen-artisan-tag"><i class="fa-solid fa-award text-accent mr-1"></i> Saharanpur Mastercraft</span>
                        </div>

                        <h1 class="fullscreen-title">${prod.name}</h1>
                        
                        <div class="fullscreen-spec-tag">
                            <i class="fa-solid fa-tree text-accent mr-1.5"></i>
                            <span><strong>Material Specification:</strong> ${prod.wood}</span>
                        </div>

                        <div class="fullscreen-desc-box">
                            <h3 class="text-xs font-bold text-primary uppercase tracking-wider mb-1">Product Details & Craftsmanship</h3>
                            <p class="fullscreen-desc">${prod.desc}</p>
                        </div>

                        <div class="fullscreen-highlights">
                            <div class="highlight-item">
                                <i class="fa-solid fa-circle-check text-accent"></i>
                                <span>100% Solid Kiln-Seasoned Natural Hardwood</span>
                            </div>
                            <div class="highlight-item">
                                <i class="fa-solid fa-hammer text-accent"></i>
                                <span>Traditional Hand-Chiseled Saharanpur Woodcraft</span>
                            </div>
                            <div class="highlight-item">
                                <i class="fa-solid fa-shield-halved text-accent"></i>
                                <span>Termite-Treated & Moisture-Resistant Protective Polish</span>
                            </div>
                            <div class="highlight-item">
                                <i class="fa-solid fa-truck-fast text-accent"></i>
                                <span>Direct Workshop Dispatch • Safe Pan-India Transit</span>
                            </div>
                        </div>

                        <!-- Quantity Selector -->
                        <div class="fullscreen-qty-section">
                            <span class="text-xs font-bold text-muted uppercase tracking-wider">Select Quantity:</span>
                            <div class="modal-qty-control-group">
                                <button class="modal-qty-btn" onclick="window.samiCatalog.modalQtyChange(-1)" aria-label="Decrease quantity">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <span class="modal-qty-display" id="modal-qty-val">1</span>
                                <button class="modal-qty-btn" onclick="window.samiCatalog.modalQtyChange(1)" aria-label="Increase quantity">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="fullscreen-actions-row">
                            <button class="btn-fullscreen-add-cart" id="btn-modal-add-cart" onclick="window.samiCatalog.modalAddToCart()">
                                <i class="fa-solid fa-cart-plus mr-2"></i>
                                <span>Add to Cart</span>
                            </button>
                            <button class="btn-fullscreen-whatsapp" onclick="window.samiCatalog.modalDirectWhatsApp()">
                                <i class="fa-brands fa-whatsapp text-lg mr-1.5"></i>
                                <span>Direct WhatsApp Order</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Complete Browsable Collection Section with Dynamic Related Items -->
                <div class="modal-related-section">
                    <div class="related-section-header flex justify-between items-end flex-wrap gap-3">
                        <div>
                            <span class="text-[10px] uppercase font-bold tracking-widest text-accent block">Recommended For You</span>
                            <h3 class="related-section-title">
                                <i class="fa-solid fa-layer-group text-accent mr-1.5"></i> Related & Handcrafted Collection
                            </h3>
                            <p class="text-xs text-muted">Explore matching pieces from ${prod.categoryName} and our mastercraft collection</p>
                        </div>
                    </div>

                    <!-- Lower Filter Tabs inside detail view -->
                    <div class="catalog-filters-wrapper my-4">
                        <div class="catalog-filters-track">
                            <button class="catalog-filter-btn active" onclick="window.samiCatalog.filterLowerGrid('same', this)">
                                <i class="fa-solid fa-star text-accent"></i> ${prod.categoryName} (${sameCategoryProducts.length})
                            </button>
                            <button class="catalog-filter-btn" onclick="window.samiCatalog.filterLowerGrid('all', this)">
                                <i class="fa-solid fa-cubes"></i> All Handcrafted (${otherProducts.length})
                            </button>
                            <button class="catalog-filter-btn" onclick="window.samiCatalog.filterLowerGrid('pooja-spiritual', this)">
                                <i class="fa-solid fa-om"></i> Pooja & Spiritual
                            </button>
                            <button class="catalog-filter-btn" onclick="window.samiCatalog.filterLowerGrid('kitchen-dining', this)">
                                <i class="fa-solid fa-utensils"></i> Kitchen & Dining
                            </button>
                            <button class="catalog-filter-btn" onclick="window.samiCatalog.filterLowerGrid('furniture-partitions', this)">
                                <i class="fa-solid fa-chair"></i> Furniture
                            </button>
                            <button class="catalog-filter-btn" onclick="window.samiCatalog.filterLowerGrid('wall-decor', this)">
                                <i class="fa-solid fa-layer-group"></i> Wall Decor
                            </button>
                            <button class="catalog-filter-btn" onclick="window.samiCatalog.filterLowerGrid('keepsakes-novelties', this)">
                                <i class="fa-solid fa-gift"></i> Keepsakes
                            </button>
                        </div>
                    </div>

                    <!-- All Products Grid with Dual Action Buttons -->
                    <div class="catalog-products-grid" id="modal-lower-products-grid">
                        ${allOtherCardsHTML}
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.classList.add('modal-open');
        modal.scrollTop = 0;
        updateCartBadge();
        syncThemeIcons();
    }

    function filterLowerGrid(cat, btnElement) {
        const grid = document.getElementById('modal-lower-products-grid');
        if (!grid || !activeModalProduct) return;

        const allProducts = window.SAMI_CATALOG_PRODUCTS || [];
        const otherProducts = allProducts.filter(p => p.id !== activeModalProduct.id);
        
        let filtered = [];
        if (cat === 'same') {
            filtered = otherProducts.filter(p => p.category === activeModalProduct.category);
        } else if (cat === 'all') {
            const same = otherProducts.filter(p => p.category === activeModalProduct.category);
            const diff = otherProducts.filter(p => p.category !== activeModalProduct.category);
            filtered = [...same, ...diff];
        } else {
            filtered = otherProducts.filter(p => p.category === cat);
        }

        document.querySelectorAll('#product-detail-modal .catalog-filter-btn').forEach(btn => btn.classList.remove('active'));
        if (btnElement) btnElement.classList.add('active');

        let html = '';
        filtered.forEach(rel => {
            const relImages = rel.images && rel.images.length > 0 ? rel.images : [rel.img];
            const relCountBadge = relImages.length > 1 ? `<span class="product-gallery-count-badge"><i class="fa-regular fa-images mr-1"></i>${relImages.length}</span>` : '';

            html += `
                <div class="product-card lower-catalog-card" data-category="${rel.category}" onclick="window.samiCatalog.openProductModal(${rel.id})">
                    <div class="product-img-wrapper">
                        <img src="${rel.img}" alt="${rel.name}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/cat_tableware.jpg';">
                        <span class="product-badge">${rel.categoryName}</span>
                        ${relCountBadge}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title" title="${rel.name}">${rel.name}</h3>
                        <div class="product-card-actions">
                            <button class="card-btn-cart" id="modal-card-cart-btn-${rel.id}" onclick="event.stopPropagation(); window.samiCatalog.quickAddToCart(${rel.id})">
                                <i class="fa-solid fa-cart-plus"></i>
                                <span>Add to Cart</span>
                            </button>
                            <button class="card-btn-buy" onclick="event.stopPropagation(); window.samiCatalog.quickBuyNow(${rel.id})">
                                <i class="fa-brands fa-whatsapp"></i>
                                <span>Buy Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = html;
    }

    function closeProductModalInternal() {
        const modal = document.getElementById('product-detail-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
        
        isModalOpen = false;
        activeModalProduct = null;

        // Seamlessly restore original catalog scroll position
        const targetY = savedCatalogScrollY || 0;
        window.scrollTo({
            top: targetY,
            left: 0,
            behavior: 'instant'
        });
        requestAnimationFrame(() => {
            window.scrollTo(0, targetY);
        });
    }

    function closeProductModal() {
        if (window.location.hash.startsWith('#product-')) {
            window.history.back();
        } else {
            closeProductModalInternal();
        }
    }

    function handleModalBackdropClick(event) {
        if (event.target && event.target.id === 'product-detail-modal') {
            closeProductModal();
        }
    }

    function modalQtyChange(delta) {
        modalSelectedQty = Math.max(1, modalSelectedQty + delta);
        const qtyDisplay = document.getElementById('modal-qty-val');
        if (qtyDisplay) {
            qtyDisplay.innerText = modalSelectedQty;
        }
    }

    function quickAddToCart(productId) {
        const allProducts = window.SAMI_CATALOG_PRODUCTS || [];
        const prod = allProducts.find(p => p.id === productId);
        if (!prod) return;

        const existing = cartItems.find(item => item.id === prod.id);
        if (existing) {
            existing.qty += 1;
        } else {
            cartItems.push({
                id: prod.id,
                name: prod.name,
                categoryName: prod.categoryName,
                img: prod.img,
                qty: 1
            });
        }

        saveCart();

        // Button visual feedback on main grid
        const btn = document.getElementById(`card-cart-btn-${prod.id}`);
        if (btn) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<i class="fa-solid fa-check mr-1.5"></i> <span>Added</span>`;
            btn.classList.add('btn-added-state');
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('btn-added-state');
            }, 1200);
        }

        // Button visual feedback on modal grid
        const modalBtn = document.getElementById(`modal-card-cart-btn-${prod.id}`);
        if (modalBtn) {
            const originalHTML = modalBtn.innerHTML;
            modalBtn.innerHTML = `<i class="fa-solid fa-check mr-1.5"></i> <span>Added</span>`;
            modalBtn.classList.add('btn-added-state');
            setTimeout(() => {
                modalBtn.innerHTML = originalHTML;
                modalBtn.classList.remove('btn-added-state');
            }, 1200);
        }

        showToast(`${prod.name} added to cart!`);
    }

    function quickBuyNow(productId) {
        const allProducts = window.SAMI_CATALOG_PRODUCTS || [];
        const prod = allProducts.find(p => p.id === productId);
        if (!prod) return;

        const phone = "919045388600";
        const message = `Direct Order Inquiry — Sami Enterprises\n\n` +
                        `Product: ${prod.name}\n` +
                        `Category: ${prod.categoryName}\n` +
                        `Quantity: 1\n` +
                        `Material: ${prod.wood}\n\n` +
                        `Please confirm availability, price, and shipping details.`;

        const encodedMsg = encodeURIComponent(message);
        window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
    }

    function modalAddToCart() {
        if (!activeModalProduct) return;

        const existing = cartItems.find(item => item.id === activeModalProduct.id);
        if (existing) {
            existing.qty += modalSelectedQty;
        } else {
            cartItems.push({
                id: activeModalProduct.id,
                name: activeModalProduct.name,
                categoryName: activeModalProduct.categoryName,
                img: activeModalProduct.img,
                qty: modalSelectedQty
            });
        }

        saveCart();

        const btn = document.getElementById('btn-modal-add-cart');
        if (btn) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<i class="fa-solid fa-check mr-2"></i> Added to Cart!`;
            btn.classList.add('btn-added-state');
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('btn-added-state');
            }, 1400);
        }

        showToast(`${modalSelectedQty}x ${activeModalProduct.name} added to cart!`);
    }

    function modalDirectWhatsApp() {
        if (!activeModalProduct) return;

        const phone = "919045388600";
        const message = `Direct Order Inquiry — Sami Enterprises\n\n` +
                        `Product: ${activeModalProduct.name}\n` +
                        `Category: ${activeModalProduct.categoryName}\n` +
                        `Quantity: ${modalSelectedQty}\n` +
                        `Material: ${activeModalProduct.wood}\n\n` +
                        `Please confirm availability, price, and shipping details.`;

        const encodedMsg = encodeURIComponent(message);
        window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
    }

    // 6. Cart Drawer Management
    function updateCartBadge() {
        const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
        
        const navCount = document.getElementById('nav-cart-count');
        const modalNavCount = document.getElementById('modal-nav-cart-count');
        const drawerCount = document.getElementById('cart-drawer-item-count');
        const totalQtySpan = document.getElementById('cart-total-qty');

        if (navCount) {
            navCount.innerText = totalCount;
            navCount.style.display = totalCount > 0 ? 'inline-flex' : 'none';
        }
        if (modalNavCount) {
            modalNavCount.innerText = totalCount;
            modalNavCount.style.display = totalCount > 0 ? 'inline-flex' : 'none';
        }
        if (drawerCount) drawerCount.innerText = totalCount;
        if (totalQtySpan) totalQtySpan.innerText = `${totalCount} item${totalCount !== 1 ? 's' : ''}`;
    }

    function renderCartDrawer() {
        const container = document.getElementById('cart-items-container');
        const footer = document.getElementById('cart-drawer-footer');
        if (!container) return;

        if (cartItems.length === 0) {
            container.innerHTML = `
                <div class="cart-empty-state">
                    <div class="cart-empty-icon">
                        <i class="fa-solid fa-basket-shopping"></i>
                    </div>
                    <h3 class="font-bold text-primary">Your Cart is Empty</h3>
                    <p class="text-muted text-xs mt-1">Browse our 53 handcrafted wood products and add items to your cart to order via WhatsApp.</p>
                </div>
            `;
            if (footer) footer.style.display = 'none';
            return;
        }

        if (footer) footer.style.display = 'block';

        let html = '';
        cartItems.forEach(item => {
            html += `
                <div class="cart-item-card" data-id="${item.id}">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='assets/images/cat_tableware.jpg';">
                    <div class="cart-item-details">
                        <span class="cart-item-cat">${item.categoryName}</span>
                        <h4 class="cart-item-title" title="${item.name}">${item.name}</h4>
                        <div class="cart-item-qty-row">
                            <div class="qty-control-group">
                                <button class="qty-btn" onclick="window.samiCatalog.updateCartQty(${item.id}, -1)" aria-label="Decrease quantity">
                                    <i class="fa-solid fa-minus text-[9px]"></i>
                                </button>
                                <span class="qty-value">${item.qty}</span>
                                <button class="qty-btn" onclick="window.samiCatalog.updateCartQty(${item.id}, 1)" aria-label="Increase quantity">
                                    <i class="fa-solid fa-plus text-[9px]"></i>
                                </button>
                            </div>
                            <button class="cart-item-remove" onclick="window.samiCatalog.removeCartItem(${item.id})" title="Remove item">
                                <i class="fa-regular fa-trash-can"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    function openCartDrawer(pushState = true) {
        const overlay = document.getElementById('cart-overlay');
        const drawer = document.getElementById('cart-drawer');
        if (overlay && drawer) {
            overlay.classList.add('active');
            drawer.classList.add('active');
            document.body.classList.add('cart-drawer-open');
            document.documentElement.classList.add('cart-drawer-open');
            if (pushState) {
                window.history.pushState({ modal: 'cart' }, '', '#cart');
            }
        }
    }

    function closeCartDrawerInternal() {
        const overlay = document.getElementById('cart-overlay');
        const drawer = document.getElementById('cart-drawer');
        if (overlay && drawer) {
            overlay.classList.remove('active');
            drawer.classList.remove('active');
            document.body.classList.remove('cart-drawer-open');
            document.documentElement.classList.remove('cart-drawer-open');
        }
    }

    function closeCartDrawer() {
        if (window.location.hash === '#cart') {
            window.history.back();
        } else {
            closeCartDrawerInternal();
        }
    }

    function updateCartQty(id, delta) {
        const item = cartItems.find(i => i.id === id);
        if (!item) return;

        item.qty += delta;
        if (item.qty <= 0) {
            cartItems = cartItems.filter(i => i.id !== id);
        }

        saveCart();
    }

    function removeCartItem(id) {
        cartItems = cartItems.filter(i => i.id !== id);
        saveCart();
        showToast('Item removed from cart');
    }

    function sendCartToWhatsApp() {
        if (cartItems.length === 0) {
            alert('Your cart is empty. Please select products to place an inquiry.');
            return;
        }

        const phone = "919045388600";
        const pincodeInput = document.getElementById('cart-delivery-location');
        const pincodeVal = (pincodeInput && pincodeInput.value.trim()) ? pincodeInput.value.trim() : 'Not Specified';
        const totalItemsCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

        let itemsListText = '';
        cartItems.forEach((item, index) => {
            itemsListText += `${index + 1}. ${item.name} (Quantity: ${item.qty})\n`;
        });

        const rawMessage = `New Order Inquiry — Sami Enterprises\n\n` +
                           `Selected Items List:\n` +
                           `${itemsListText}\n` +
                           `Total Items Selected: ${totalItemsCount}\n` +
                           `Delivery Pincode / Area: ${pincodeVal}\n\n` +
                           `Please confirm availability and shipping details.`;

        const encodedMsg = encodeURIComponent(rawMessage);
        const waUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
        window.open(waUrl, '_blank');
    }

    function showToast(msg) {
        const toast = document.getElementById('cart-toast');
        const msgEl = document.getElementById('cart-toast-msg');
        if (!toast || !msgEl) return;

        msgEl.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    function setFilter(cat, btnElement) {
        currentFilter = cat;
        document.querySelectorAll('.catalog-filters-wrapper .catalog-filter-btn').forEach(btn => btn.classList.remove('active'));
        if (btnElement) btnElement.classList.add('active');
        renderProductGrid(cat);
    }

    function syncThemeIcons() {
        const isDark = document.body.classList.contains('dark-theme');
        const mainIcon = document.querySelector('#theme-toggle i');
        const modalIcon = document.querySelector('#modal-theme-toggle i');
        if (mainIcon) mainIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        if (modalIcon) modalIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }

    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        document.documentElement.classList.toggle('dark-theme', isDark);
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch(e){}
        syncThemeIcons();
    }

    function initListeners() {
        // Apply saved theme
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                document.documentElement.classList.add('dark-theme');
            }
        } catch(e){}
        syncThemeIcons();

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (nav) {
                if (window.scrollY > 40) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }
        }, { passive: true });

        // Close modal on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeProductModal();
                closeCartDrawer();
            }
        });

        // Prevent background scrolling through cart overlay
        const cartOverlay = document.getElementById('cart-overlay');
        if (cartOverlay) {
            cartOverlay.addEventListener('touchmove', (e) => {
                e.preventDefault();
            }, { passive: false });
        }
    }

    // 7. Background Canvas Particles
    function initCanvas() {
        const canvas = document.getElementById('bunki-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }, { passive: true });

        const dots = [];
        const numDots = Math.min(22, Math.floor(width / 50));

        for (let i = 0; i < numDots; i++) {
            dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.5 + 1
            });
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            const isDark = document.body.classList.contains('dark-theme');
            const dotColor = isDark ? 'rgba(255, 82, 119, 0.25)' : 'rgba(201, 138, 68, 0.22)';
            const lineColor = isDark ? 'rgba(255, 82, 119, 0.08)' : 'rgba(201, 138, 68, 0.06)';

            for (let i = 0; i < dots.length; i++) {
                const d = dots[i];
                d.x += d.vx;
                d.y += d.vy;

                if (d.x < 0 || d.x > width) d.vx *= -1;
                if (d.y < 0 || d.y > height) d.vy *= -1;

                ctx.beginPath();
                ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
                ctx.fillStyle = dotColor;
                ctx.fill();

                for (let j = i + 1; j < dots.length; j++) {
                    const d2 = dots[j];
                    const dist = Math.hypot(d.x - d2.x, d.y - d2.y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(d.x, d.y);
                        ctx.lineTo(d2.x, d2.y);
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        }
        draw();
    }

    // Expose Global Public API
    window.samiCatalog = {
        setFilter,
        filterLowerGrid,
        openProductModal,
        closeProductModal,
        handleModalBackdropClick,
        modalQtyChange,
        modalAddToCart,
        modalDirectWhatsApp,
        quickAddToCart,
        quickBuyNow,
        switchGalleryImage,
        galleryNext,
        galleryPrev,
        openCartDrawer,
        closeCartDrawer,
        updateCartQty,
        removeCartItem,
        sendCartToWhatsApp,
        toggleTheme
    };

    // Auto initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderCatalogApp);
    } else {
        renderCatalogApp();
    }

})();
