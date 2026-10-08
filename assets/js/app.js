/**
 * Sami Enterprises - Core Web Application Engine (Original Restored + Global Theme Sync)
 * Handcrafted Wooden Handicrafts & Bespoke Furniture - Saharanpur
 */

(function() {
    'use strict';

    let capturedMainScrollPos = 0;

    const primaryWorkCategories = [
        {
            id: "solid-wood-furniture",
            title: "Bespoke Solid Wood Furniture",
            desc: "Hand-carved Sheesham, Teak, and Mango wood living, bedroom, and dining furniture crafted with traditional joinery.",
            img: "assets/images/cat_furniture.jpg",
            bannerImg: "assets/images/banner_furniture.jpg",
            services: [
                {
                    title: "Handcrafted Wooden Chairs & Stools",
                    desc: "Custom solid wood chairs with ergonomic back support and hand-turned spindle legs. Available in matte and glossy finishes.",
                    img: "assets/images/service_chairs.jpg",
                    highlights: ["100% Solid Seasoned Wood", "Hand-Turned Spindles", "Sturdy Joinery"]
                },
                {
                    title: "Luxury Carved Sofa Sets",
                    desc: "Royal living room seating with detailed floral crown carvings, robust hardwood frames, and premium cushioning upholstery.",
                    img: "assets/images/service_sofas.jpg",
                    highlights: ["Floral Wood Relief Carvings", "High-Density Cushions", "Custom Fabric Selection"]
                },
                {
                    title: "Solid Timber Dining Tables",
                    desc: "Heavy-duty 4, 6, and 8-seater dining tables crafted from selected Sheesham grain with water-resistant surface coatings.",
                    img: "assets/images/service_dining.jpg",
                    highlights: ["Natural Grain Accentuation", "Scratch & Spill Resistance", "Handcrafted Matching Chairs"]
                },
                {
                    title: "Bespoke Bed Frames & Dressers",
                    desc: "Durable wooden beds featuring carved headboards, integrated hydraulic storage, and matching wooden dressing consoles.",
                    img: "assets/images/service_beds.jpg",
                    highlights: ["Termite-Treated Timber", "Smooth Drawer Slides", "Custom Dimensioning"]
                }
            ]
        },
        {
            id: "partitions-joinery",
            title: "Partitions & Architectural Joinery",
            desc: "Traditional 2, 3, and 4-panel foldable Jali room dividers, carved doors, window casings, and modular woodwork.",
            img: "assets/images/cat_partitions.jpg",
            bannerImg: "assets/images/banner_partitions.jpg",
            services: [
                {
                    title: "Foldable 3-Panel Room Dividers",
                    desc: "Signature Saharanpur folding screen partitions with intricate lattice fretwork and antique brass hinges. (Approx ₹3,500 - ₹4,500).",
                    img: "assets/images/service_divider_3panel.jpg",
                    highlights: ["Geometric & Floral Jali Patterns", "Portable & Foldable Design", "Solid Wood & MDF Options"]
                },
                {
                    title: "Multi-Panel Partition Screens (2-4 Panels)",
                    desc: "Large 5ft to 6ft room dividers ideal for living rooms, restaurants, puja rooms, and office space separation.",
                    img: "assets/images/service_divider_multipanel.jpg",
                    highlights: ["Versatile Space Management", "Double-Sided Carving", "Custom Color Finishes"]
                },
                {
                    title: "Custom Modular Kitchen & Cabinetry",
                    desc: "Solid wood and veneer kitchen shutters, pantry cabinets, and pull-out storage built with precise joinery.",
                    img: "assets/images/service_modular_kitchen.jpg",
                    highlights: ["Water-Resistant Wood Treatment", "Soft-Close Hinges", "Custom Layout Planning"]
                },
                {
                    title: "Carved Architectural Doors & Windows",
                    desc: "Heavy entrance doors and decorative temple gates with traditional brass studs and deep relief carvings.",
                    img: "assets/images/service_doors_windows.jpg",
                    highlights: ["Heavy-Timber Structural Strength", "Heritage Aesthetic", "Weather-Proof Polishing"]
                }
            ]
        },
        {
            id: "handicrafts-tableware",
            title: "Handcrafted Novelties & Tableware",
            desc: "Artisanal wooden serving platters, pizza trays, carved coin banks, jewelry boxes, and luxury sandalwood carvings.",
            img: "assets/images/cat_tableware.jpg",
            bannerImg: "assets/images/banner_tableware.jpg",
            services: [
                {
                    title: "Wooden Pizza Trays & Serving Platters",
                    desc: "Handcrafted food-safe round and square wooden platters and pizza boards with ergonomic handles. (₹149 - ₹299).",
                    img: "assets/images/service_pizza_platters.jpg",
                    highlights: ["Food-Grade Polish Finish", "Durable Mango & Sheesham Wood", "Wholesale & Retail Supply"]
                },
                {
                    title: "Carved Wooden Coin Banks & Piggy Boxes",
                    desc: "Artisan-carved money saving boxes with secure brass hasps and locks. Highly popular for gifting.",
                    img: "assets/images/service_coin_banks.jpg",
                    highlights: ["Intricate Brass Inlay Work", "Metallic Lock Hardware", "Artisan Handmade Keepsake"]
                },
                {
                    title: "Handmade Jewelry Boxes & Organizers",
                    desc: "Velvet-lined wooden jewelry chests adorned with traditional brass inlays and secret compartments.",
                    img: "assets/images/service_jewelry_boxes.jpg",
                    highlights: ["Velvet Interior Lining", "Fine Carved Lids", "Antique Finish Brass Inlay"]
                },
                {
                    title: "Desk Utilities & Fine Art Carvings",
                    desc: "Wooden pen holders, key racks, wood perfume blocks, and genuine sandalwood elephant figurines.",
                    img: "assets/images/service_desk_decor.jpg",
                    highlights: ["Genuine Sandalwood Options", "Minimal Desk Decor", "Natural Fragrance Retaining"]
                }
            ]
        }
    ];

    function renderApp() {
        const app = document.getElementById('app');
        if (!app) return;

        let designsCardsHTML = '';
        primaryWorkCategories.forEach((item, index) => {
            designsCardsHTML += `
                <div class="design-card scale-up" onclick="window.samiApp.triggerExploreView(${index})">
                    <div class="design-img-wrapper overflow-hidden">
                        <img src="${item.img}" alt="${item.title}" loading="lazy">
                    </div>
                    <div class="design-info">
                        <div>
                            <h3 style="color: var(--primary-color);">${item.title}</h3>
                            <p style="margin-top: 4px;">${item.desc}</p>
                        </div>
                        <span class="explore-trigger">Explore ${item.services.length} Products <i class="fa-solid fa-arrow-right text-[9px]"></i></span>
                    </div>
                </div>
            `;
        });

        app.innerHTML = `
            <canvas id="bunki-canvas"></canvas>

            <nav id="navbar">
                <div class="logo-container" onclick="window.samiApp.scrollToTop()">
                    <img src="assets/images/logo.png" alt="Sami Enterprises Logo">
                    <span>Sami Enterprises</span>
                </div>
                <div class="flex items-center gap-3">
                    <div id="theme-toggle" title="Toggle Dark/Light Mode">
                        <i class="fas fa-sun"></i>
                    </div>
                    <div class="nav-toggle" id="mobile-menu-btn" onclick="window.samiApp.toggleMenu()">
                        <i class="fas fa-bars"></i>
                    </div>
                </div>
                <ul class="nav-links" id="nav-links">
                    <li><a href="#home" class="nav-link active" onclick="window.samiApp.navigateToSection('home', event)">Home</a></li>
                    <li><a href="#products" class="nav-link" onclick="window.samiApp.navigateToSection('products', event)">Work Categories</a></li>
                    <li><a href="#services" class="nav-link" onclick="window.samiApp.navigateToSection('services', event)">Solutions</a></li>
                    <li><a href="#about" class="nav-link" onclick="window.samiApp.navigateToSection('about', event)">About Us</a></li>
                    <li><a href="#founder" class="nav-link" onclick="window.samiApp.navigateToSection('founder', event)">Vision</a></li>
                    <li><a href="#contact" class="nav-link" onclick="window.samiApp.navigateToSection('contact', event)">Contact</a></li>
                    <li class="mobile-only-menu-item"><a href="catalog.html" class="nav-link nav-link-shop" onclick="window.samiApp.closeMenuOnNavigate()"><i class="fa-solid fa-bag-shopping mr-1.5"></i> Shop Products Catalog</a></li>
                </ul>
                <div class="nav-glow-line"></div>
            </nav>

            <section id="home">
                <picture>
                    <source media="(max-width: 768px)" srcset="assets/images/hero_mobile.jpg">
                    <source media="(min-width: 769px)" srcset="assets/images/hero_desktop.jpg">
                    <img src="assets/images/hero_desktop.jpg" alt="Sami Enterprises Handcrafted Wood Furniture" class="hero-bg desktop">
                </picture>
                <img src="assets/images/hero_mobile.jpg" alt="Sami Enterprises Handcrafted Wood Mobile Banner" class="hero-bg mobile">
                <div class="hero-overlay"></div>
                
                <div class="hero-content">
                    <h1 class="fade-up">HANDCRAFTED TIMBER & <span>LIVING ART</span></h1>
                    <p class="fade-up delay-1">Master Artisans of Handcrafted Solid Wood Furniture, Traditional Room Partitions & Architectural Joinery — Saharanpur.</p>
                    
                    <div class="fade-up delay-2 mt-4 flex items-center justify-center gap-3 flex-wrap">
                        <a href="catalog.html" class="magnetic-btn"><i class="fa-solid fa-bag-shopping mr-1.5"></i> Shop 50+ Products</a>
                        <a href="#products" onclick="window.samiApp.navigateToSection('products', event)" class="magnetic-btn btn-secondary-outline">Work Categories</a>
                    </div>

                    <div class="flex gap-3 justify-center mt-6 fade-up delay-3 flex-wrap">
                        <a href="javascript:void(0)" class="btn-circle btn-youtube" title="YouTube"><i class="fab fa-youtube"></i></a>
                        <a href="javascript:void(0)" class="btn-circle btn-instagram" title="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="javascript:void(0)" class="btn-circle btn-facebook" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                    </div>
                </div>
            </section>

            <!-- Structural Stats Section -->
            <section id="structural-stats" class="px-5 py-12 max-w-4xl mx-auto" style="border-bottom: 1px solid var(--card-border);">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div class="fade-left text-center md:text-left">
                        <span class="text-[10px] tracking-wider uppercase font-bold block mb-1" style="color: var(--accent-color);">Heritage & Joinery Mastery</span>
                        <h2 style="color: var(--primary-color);" class="text-xl md:text-2xl font-bold leading-tight">Mastering Natural <span style="color: var(--accent-color);">Wood Craftsmanship</span></h2>
                        <p style="color: var(--text-muted);" class="text-xs leading-relaxed mt-2">
                            Sami Enterprises combines traditional hand-carving techniques with modern architectural joinery using seasoned Sheesham, Teak, and Mango wood.
                        </p>
                    </div>
                    
                    <div class="bg-luxury-card rounded-xl p-4 fade-right delay-1 w-full">
                        <div class="grid grid-cols-2 gap-3 text-center">
                            <div class="p-2 border-b border-r border-stone-200/20">
                                <i class="fa-solid fa-couch text-sm mb-1 block" style="color: var(--accent-color);"></i>
                                <span style="color: var(--primary-color);" class="text-base md:text-lg font-bold">1000+</span>
                                <span class="text-[9px] uppercase font-semibold mt-0.5 block tracking-wider" style="color: var(--text-muted);">Custom Builds</span>
                            </div>
                            <div class="p-2 border-b border-stone-200/20">
                                <i class="fa-solid fa-award text-sm mb-1 block" style="color: var(--accent-color);"></i>
                                <span style="color: var(--primary-color);" class="text-base md:text-lg font-bold">10+</span>
                                <span class="text-[9px] uppercase font-semibold mt-0.5 block tracking-wider" style="color: var(--text-muted);">Years Experience</span>
                            </div>
                            <div class="p-2 border-r border-stone-200/20">
                                <i class="fa-solid fa-star text-sm mb-1 block" style="color: var(--accent-color);"></i>
                                <span style="color: var(--primary-color);" class="text-base md:text-lg font-bold">4.9 / 5</span>
                                <span class="text-[9px] uppercase font-semibold mt-0.5 block tracking-wider" style="color: var(--text-muted);">Verified Rating</span>
                            </div>
                            <div class="p-2">
                                <i class="fa-solid fa-truck-fast text-sm mb-1 block" style="color: var(--accent-color);"></i>
                                <span style="color: var(--primary-color);" class="text-base md:text-lg font-bold">PAN-India</span>
                                <span class="text-[9px] uppercase font-semibold mt-0.5 block tracking-wider" style="color: var(--text-muted);">Doorstep Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Work Categories -->
            <section id="products" class="container py-12">
                <div class="text-center mb-8">
                    <span class="text-[9px] tracking-widest uppercase font-bold fade-up" style="color: var(--accent-color); display: inline-block;">Artisan Portfolio</span>
                    <h2 style="color: var(--primary-color);" class="text-2xl md:text-3xl font-bold mt-1 fade-up delay-1">Explore Work Categories</h2>
                    <p class="text-xs mt-1.5 opacity-80 fade-up delay-2 modal-text-color">Click on any category card below to view custom specifications</p>
                </div>
                <div class="designs-grid" id="premium-designs-box">
                    ${designsCardsHTML}
                </div>
            </section>

            <div class="decorative-transition">
                <div class="container" style="padding: 25px 15px;">
                    <h3 class="fade-up">BRING TIMELESS WOODEN ARTISTRY HOME<br><span>Saharanpur's Benchmark in Architectural Woodwork & Carved Novelties</span></h3>
                    <div class="separator-heart fade-up delay-1">
                        <hr><i class="fas fa-hammer"></i><hr>
                    </div>
                </div>
            </div>

            <section id="services">
                <div class="container">
                    <h2 class="section-title slide-up-fade">Handcrafted Wood Solutions</h2>
                    <div class="fees-grid">
                        <div class="fee-card hover-lift fade-up delay-1 w-full" style="border-top: 4px solid var(--accent-color) !important; padding: 26px;">
                            <h3 class="text-lg md:text-xl font-bold mb-2 text-center fade-up delay-2" style="color: var(--primary-color);">Authentic Materials & Master Carving</h3>
                            <p class="text-xs leading-relaxed mb-6 text-center max-w-2xl mx-auto italic fade-up delay-3" style="color: var(--text-muted);">
                                "At Sami Enterprises, every cut of wood is treated with reverence. From hand-chiseled Jali room partitions to solid Sheesham dining sets, we bridge traditional craftsmanship with modern durability."
                            </p>
                            
                            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto pt-2">
                                <li class="flex items-start gap-3 fade-left delay-4">
                                    <span class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent-color);"></span>
                                    <div>
                                        <h4 class="font-bold text-sm mb-0.5" style="color: var(--primary-color);">Bespoke Solid Wood Furniture</h4>
                                        <p class="text-xs leading-relaxed" style="color: var(--text-muted);">Handcrafted chairs, heavy dining tables, bed frames, and luxury upholstered sofas with mortise and tenon joinery.</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 fade-right delay-4">
                                    <span class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent-color);"></span>
                                    <div>
                                        <h4 class="font-bold text-sm mb-0.5" style="color: var(--primary-color);">Architectural Partitions & Screens</h4>
                                        <p class="text-xs leading-relaxed" style="color: var(--text-muted);">Foldable 2, 3, and 4-panel room dividers crafted in hardwood and MDF with geometric Jali fretwork.</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 fade-left delay-4">
                                    <span class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent-color);"></span>
                                    <div>
                                        <h4 class="font-bold text-sm mb-0.5" style="color: var(--primary-color);">Architectural Joinery & Cabinetry</h4>
                                        <p class="text-xs leading-relaxed" style="color: var(--text-muted);">Solid wood doors, fluted window casings, carved wooden ceilings, and modular kitchen cabinetry.</p>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3 fade-right delay-4">
                                    <span class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent-color);"></span>
                                    <div>
                                        <h4 class="font-bold text-sm mb-0.5" style="color: var(--primary-color);">Artisanal Tableware & Novelties</h4>
                                        <p class="text-xs leading-relaxed" style="color: var(--text-muted);">Handmade wooden pizza platters, serving trays, brass-inlaid jewelry boxes, and sandalwood art carvings.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about">
                <div class="container">
                    <div class="join-family-text flip-up">
                        <i class="fa-solid fa-tree text-amber-500 mr-1"></i> Authentic Saharanpur Woodcraft<br>
                        <span>Where Natural Timber Meets Architectural Precision <i class="fa-solid fa-circle-check text-amber-500 ml-1"></i></span>
                    </div>
                    <h2 class="section-title slide-up-fade">Who We Are</h2>
                    
                    <div class="about-grid">
                        <div class="about-text fade-left delay-1">
                            <p style="color: var(--text-color);">Sami Enterprises (under the leadership of S. Zuberi) is a registered woodworking and artisanal furniture enterprise located at the heart of Saharanpur's historic craft cluster. We specialize in solid wood furniture fabrication, architectural interior joinery, and wholesale handcrafted novelties for homes and commercial venues across India.</p>
                            <button onclick="window.samiApp.openAboutUsModal()" class="magnetic-btn" style="margin-top: 10px;">Read More</button>
                        </div>
                        <div class="about-image-wrapper hover-lift zoom-in delay-2">
                            <img src="assets/images/about_workshop.jpg" alt="Sami Enterprises Workshop" class="about-img" style="aspect-ratio: 4 / 3; object-fit: cover; width: 100%; max-width: 400px; display: block; margin: 0 auto;">
                        </div>
                    </div>
                </div>
            </section>

            <section id="founder">
                <div class="container">
                    <h2 class="section-title slide-up-fade">Management Vision</h2>
                    <div class="founder-grid hover-lift fade-up delay-1">
                        <div class="founder-img-wrapper fade-left delay-2">
                            <img src="assets/images/founder_portrait.jpg" alt="S. Zuberi - Founder" class="founder-img" style="object-fit: cover;">
                        </div>
                        <div class="fade-right delay-3">
                            <p class="founder-text">"Our deep commitment to structural timber integrity, authentic Saharanpur carving, and transparent client partnerships ensures that every furniture piece and architectural installation is built to last generations."</p>
                            <h3 class="founder-name">S. Zuberi (Shamsher Zuberi)</h3>
                            <span class="founder-title">Founder & CEO — Sami Enterprises</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" class="container">
                <h2 class="section-title slide-up-fade">Contact & Showroom Location</h2>
                <div class="contact-grid">
                    <div class="contact-info fade-left delay-1">
                        
                        <a href="https://maps.app.goo.gl/xJjUJv4ZZiWK6C577" target="_blank" class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Primary Showroom</h4>
                                <p>Thana Mandi Shahbilol, Ram Nagar, Abdul Salam Road, Saharanpur, UP 247001</p>
                            </div>
                        </a>
                        
                        <a href="mailto:shamsherzuberi55@gmail.com" class="contact-item" title="Send Email">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <h4>Email Us</h4>
                                <p>shamsherzuberi55@gmail.com</p>
                            </div>
                        </a>
                        
                        <a href="tel:+919045388600" class="contact-item" title="Call Us">
                            <i class="fas fa-phone-alt"></i>
                            <div>
                                <h4>Call Us</h4>
                                <p>+91 90453 88600</p>
                            </div>
                        </a>

                        <a href="https://share.google/L10WunucHcGhfvlth" target="_blank" class="contact-item" title="Google Listing">
                            <i class="fab fa-google"></i>
                            <div>
                                <h4>Google Business Profile</h4>
                                <p>4.9 Rating (57+ Verified Reviews)</p>
                            </div>
                        </a>

                        <div class="contact-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <h4>Business Hours</h4>
                                <p>Mon - Sun: 9:00 AM - 9:30 PM (Open 7 Days)</p>
                            </div>
                        </div>
                        
                        <div class="map-container">
                            <a href="https://maps.app.goo.gl/xJjUJv4ZZiWK6C577" target="_blank" class="map-click-overlay" title="Open Google Maps Location"></a>
                            <iframe src="https://maps.google.com/maps?q=Sami+Enterprises+Wooden+Handicrafts+Furniture+Saharanpur&t=&z=15&ie=UTF8&iwloc=&output=embed" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>

                    <div class="contact-form fade-right delay-2">
                        <h3 style="margin-bottom: 16px; font-size: 1.25rem;">Custom Order Inquiry</h3>
                        <form id="smart-form" onsubmit="return false;">
                            <div class="form-group">
                                <input type="text" id="frmName" class="form-control" placeholder="Full Name" required>
                            </div>
                            <div class="form-group">
                                <input type="tel" id="frmPhone" class="form-control" placeholder="Phone Number" required>
                            </div>
                            <div class="form-group">
                                <input type="email" id="frmEmail" class="form-control" placeholder="Email Address" required>
                            </div>
                            <div class="form-group">
                                <textarea id="frmMsg" class="form-control" placeholder="Describe your custom furniture, partition divider, or bulk handicraft order requirements..." required></textarea>
                            </div>
                            
                            <div class="form-actions">
                                <button type="button" class="btn-action btn-whatsapp" onclick="window.samiApp.sendWhatsApp()">
                                    <i class="fab fa-whatsapp"></i> Send WhatsApp
                                </button>
                                <button type="button" class="btn-action btn-email" onclick="window.samiApp.sendEmail()">
                                    <i class="fas fa-envelope"></i> Send Email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <div id="explore-modal"></div>

            <!-- Estimate Price Calculator Modal -->
            <div id="estimatorModal">
                <div class="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md p-5 text-zinc-200 shadow-2xl relative">
                    <div class="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2.5">
                        <h2 class="text-base font-bold text-white">Custom Woodwork Calculator</h2>
                        <button onclick="window.samiApp.closeEstimatorModal()" class="text-zinc-400 hover:text-white text-xl focus:outline-none">×</button>
                    </div>
                    
                    <p class="text-[10px] text-zinc-400 mb-3 leading-relaxed bg-zinc-950 p-2 rounded border border-zinc-800/60">
                        Select your woodwork requirement, timber tier, and enter quantity or area size.
                    </p>

                    <div class="space-y-3 text-xs">
                        <div>
                            <label class="text-zinc-400 font-semibold text-[10px] uppercase tracking-wider block mb-1">1. Select Requirement</label>
                            <select id="calcService" onchange="window.samiApp.runCostEngine()" class="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-white text-xs focus:outline-none">
                                <option value="furniture" selected>Solid Wood Furniture (Sheesham / Teak)</option>
                                <option value="partition">Carved Room Divider / Partition (Per Panel Set)</option>
                                <option value="kitchen">Custom Modular Kitchen & Shutters</option>
                                <option value="handicrafts">Handcrafted Tableware & Novelties (Bulk Lot)</option>
                            </select>
                        </div>

                        <div>
                            <label class="text-zinc-400 font-semibold text-[10px] uppercase tracking-wider block mb-1">2. Timber Tier</label>
                            <select id="calcQuality" onchange="window.samiApp.runCostEngine()" class="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-white text-xs focus:outline-none">
                                <option value="standard" selected>Standard Grade (Mango Wood / Engineered MDF)</option>
                                <option value="medium">Deluxe Grade (Pure Seasoned Sheesham Wood)</option>
                                <option value="premium">Masterpiece Grade (Solid Teak / Hand-Carved Antique Finish)</option>
                            </select>
                        </div>

                        <div>
                            <label class="text-zinc-400 font-semibold text-[10px] uppercase tracking-wider block mb-1">3. Units / Area Size [Max: 20,000]</label>
                            <input type="number" id="calcArea" max="20000" min="1" value="" oninput="window.samiApp.validateAndRunCostEngine()" class="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-white text-xs focus:outline-none" placeholder="Enter quantity or sq. ft. area (e.g. 5)">
                        </div>

                        <div class="bg-zinc-950 p-3 rounded border border-zinc-800 space-y-1.5 mt-2 text-xs">
                            <div class="flex justify-between text-zinc-400"><span>Timber & Joinery Cost:</span><span id="lblDesignCost" class="text-white font-medium">₹0</span></div>
                            <div class="flex justify-between text-zinc-400"><span>Finishing & Polish:</span><span id="lblExecCost" class="text-white font-medium">₹0</span></div>
                            <div class="flex justify-between pt-1.5 border-t border-zinc-800 text-xs font-bold"><span>ESTIMATED INVESTMENT:</span><span id="lblTotalCost" style="color: var(--accent-color);">₹0</span></div>
                        </div>

                        <button onclick="window.samiApp.handleEstimatorDone()" class="w-full py-2.5 text-white font-bold rounded uppercase tracking-wider text-xs hover:opacity-90 transition mt-1" style="background-color: var(--accent-color);">Inquire Estimate via WhatsApp</button>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <footer>
                <p>© 2026 Sami Enterprises. All Rights Reserved. Master Artisans of Saharanpur Woodcraft.</p>
            </footer>

            <!-- Floating Action Buttons -->
            <div class="fab-container">
                <a href="tel:+919045388600" class="fab fab-phone text-white" title="Call Us"><i class="fas fa-phone-alt"></i></a>
                <a href="https://wa.me/919045388600?text=New%20lead%20from%20website" target="_blank" class="fab fab-whatsapp text-white" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                <a href="https://maps.app.goo.gl/xJjUJv4ZZiWK6C577" target="_blank" class="fab fab-map text-white" title="Get Directions"><i class="fas fa-map-marker-alt"></i></a>
            </div>
        `;

        initListeners();
    }

    function initListeners() {
        // Synchronize Theme from localStorage
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                document.documentElement.classList.add('dark-theme');
                const themeIcon = document.querySelector('#theme-toggle i');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            } else {
                document.body.classList.remove('dark-theme');
                document.documentElement.classList.remove('dark-theme');
            }
        } catch(e){}

        const themeToggleBtn = document.getElementById('theme-toggle');
        if (themeToggleBtn) {
            const themeIcon = themeToggleBtn.querySelector('i');
            themeToggleBtn.addEventListener('click', () => {
                const isDark = document.body.classList.toggle('dark-theme');
                document.documentElement.classList.toggle('dark-theme', isDark);
                try {
                    localStorage.setItem('theme', isDark ? 'dark' : 'light');
                } catch(e){}
                if (isDark) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                } else {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            });
        }

        const navbar = document.getElementById('navbar');
        const navbarLinksNodes = document.querySelectorAll('.nav-links a');

        const sectionsConfig = [
            { id: 'contact' },
            { id: 'founder' },
            { id: 'about' },
            { id: 'services' },
            { id: 'products' },
            { id: 'home' }
        ];

        function syncScrollSpyNav() {
            if (document.body.classList.contains('modal-open')) return;
            
            const scrollPos = window.scrollY + 100;
            let activeId = 'home';
            for (let i = 0; i < sectionsConfig.length; i++) {
                const s = sectionsConfig[i];
                const el = document.getElementById(s.id);
                if (el && el.offsetTop <= scrollPos) {
                    activeId = s.id;
                    break;
                }
            }

            navbarLinksNodes.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${activeId}`) {
                    link.classList.add('active');
                } else if (!link.classList.contains('nav-link-shop')) {
                    link.classList.remove('active');
                }
            });
        }

        window.samiAppSyncNav = syncScrollSpyNav;

        let isNavigatingBack = false;

        // Handle incoming hash link on page load (e.g. index.html#contact from catalog)
        const initialHash = window.location.hash;
        if (initialHash && initialHash !== '#home' && initialHash !== '#scrolled' && initialHash !== '') {
            setTimeout(() => {
                const target = document.querySelector(initialHash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 250);
        }

        // Ensure base state on initial load without wiping out hash
        if (!window.history.state) {
            window.history.replaceState({ section: initialHash ? initialHash.replace('#', '') : 'home' }, '', window.location.href);
        }

        let isScrollTicking = false;
        window.addEventListener('scroll', () => {
            if (isNavigatingBack) return;

            if (!isScrollTicking) {
                window.requestAnimationFrame(() => {
                    if (!document.body.classList.contains('modal-open')) {
                        navbar.classList.toggle('scrolled', window.scrollY > 40);
                        syncScrollSpyNav();
                    }
                    isScrollTicking = false;
                });
                isScrollTicking = true;
            }
        }, { passive: true });

        // Initial sync on load
        syncScrollSpyNav();

        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    scaleObserver.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.12 });

        document.querySelectorAll('.scale-up, .fade-up, .fade-left, .fade-right, .zoom-in, .slide-up-fade, .flip-up').forEach(el => scaleObserver.observe(el));

        initParticles();

        // Global PopState Handler: Browser & Mobile Hardware Back Button Engine
        window.addEventListener('popstate', (e) => {
            // 1. If Estimator Modal is active, close it
            const estimator = document.getElementById('estimatorModal');
            if (estimator && estimator.classList.contains('active')) {
                closeEstimatorModalInternal();
                return;
            }

            // 2. If Explore Modal (Category or About Us) is open, close it & restore scroll
            const exploreModal = document.getElementById('explore-modal');
            if (exploreModal && exploreModal.style.display === 'block') {
                closeExploreModalInternal();
                return;
            }

            // 3. If Mobile Navigation Menu is active, close it
            const navLinks = document.getElementById('nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                closeMenuInternal();
                return;
            }

            // Ensure scroll is completely free and unlocked
            unlockScroll();

            // 4. Section Navigation via hash
            const hash = window.location.hash;
            if (hash && hash !== '#home' && hash !== '#scrolled' && hash !== '') {
                const targetEl = document.querySelector(hash);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
            }

            // 5. Back to Home: if user is scrolled down anywhere, smoothly scroll to top (Hero banner)
            if (window.scrollY > 60) {
                isNavigatingBack = true;
                scrollToTop();
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'auto' });
                    isNavigatingBack = false;
                    hasPushedScrolledState = false;
                }, 500);
            }
        });
    }

    function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

    function unlockScroll() {
        document.body.classList.remove('modal-open', 'menu-open', 'cart-drawer-open');
        document.documentElement.classList.remove('modal-open', 'menu-open', 'cart-drawer-open');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }

    function toggleMenu() {
        const navLinksContainer = document.getElementById('nav-links');
        const navBtnIcon = document.querySelector('#mobile-menu-btn i');
        if (navLinksContainer) {
            const isOpen = navLinksContainer.classList.toggle('active');
            if (isOpen) {
                document.body.classList.add('menu-open');
                document.documentElement.classList.add('menu-open');
                window.history.pushState({ menu: true }, '', '#menu');
                if (typeof window.samiAppSyncNav === 'function') {
                    window.samiAppSyncNav();
                }
            } else {
                closeMenuInternal();
                if (window.location.hash === '#menu') {
                    window.history.back();
                }
            }
            if (navBtnIcon) {
                navBtnIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        }
    }

    function closeMenuInternal() {
        const navLinksContainer = document.getElementById('nav-links');
        const navBtnIcon = document.querySelector('#mobile-menu-btn i');
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            unlockScroll();
            if (navBtnIcon) navBtnIcon.className = 'fas fa-bars';
        }
    }

    function closeMenuOnNavigate() {
        closeMenuInternal();
        if (window.location.hash === '#menu') {
            window.history.back();
        }
    }

    function navigateToSection(sectionId, e) {
        if (e && e.preventDefault) e.preventDefault();
        closeMenuInternal();
        if (window.location.hash === '#menu') {
            window.history.back();
        }

        const target = document.getElementById(sectionId);
        if (target) {
            const navHeight = 70;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
                top: Math.max(0, targetPos),
                behavior: 'smooth'
            });

            const links = document.querySelectorAll('.nav-links a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${sectionId}`) {
                    link.classList.add('active');
                } else if (!link.classList.contains('nav-link-shop')) {
                    link.classList.remove('active');
                }
            });
        }
    }

    function quickInquireWhatsApp(serviceName) {
        const text = `Hi Sami Enterprises, I am interested in: ${serviceName}. Please share details, catalog, and pricing.`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/919045388600?text=${encodedText}`, '_blank');
    }

    function triggerExploreView(idx, pushState = true) {
        capturedMainScrollPos = window.scrollY;
        const category = primaryWorkCategories[idx];
        const modalPageContainer = document.getElementById('explore-modal');
        
        let servicesHTML = '';
        category.services.forEach((srv) => {
            let highlightsList = '';
            if (srv.highlights) {
                srv.highlights.forEach(h => {
                    highlightsList += `<li class="flex items-center gap-1.5 text-[10.5px] modal-text-color opacity-90 mb-0.5"><i class="fa-solid fa-check text-[9px]" style="color: var(--accent-color);"></i> ${h}</li>`;
                });
            }

            servicesHTML += `
                <div class="service-detail-card hover-lift modal-anim-up">
                    <div class="service-card-img-wrapper">
                        <img src="${srv.img}" alt="${srv.title}" loading="lazy">
                    </div>
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <h4 class="text-sm font-bold mb-1" style="color: var(--primary-color);">${srv.title}</h4>
                            <p class="text-xs leading-relaxed modal-text-color opacity-85 mb-2">${srv.desc}</p>
                            <ul class="mb-3">${highlightsList}</ul>
                        </div>
                        <button onclick="window.samiApp.quickInquireWhatsApp('${srv.title.replace(/'/g, "\\'")}')" class="w-full py-2 rounded text-xs font-bold uppercase tracking-wider transition border flex items-center justify-center gap-1.5" style="border-color: var(--accent-color); color: var(--accent-color);">
                            <i class="fab fa-whatsapp"></i> Inquire Now
                        </button>
                    </div>
                </div>
            `;
        });

        modalPageContainer.innerHTML = `
            <div class="explore-page-content detail-page-animate">
                <div class="explore-sticky-header flex justify-between items-center mb-6 border-b modal-anim-up">
                    <div class="flex items-center font-bold text-xs cursor-pointer transition modal-text-color" onclick="window.samiApp.closeExploreModal()">
                        <i class="fa-solid fa-arrow-left mr-1.5"></i> Back to Categories
                    </div>
                    <div class="flex items-center gap-1.5 cursor-pointer" onclick="window.samiApp.closeExploreModalAndGoHome()">
                        <img src="assets/images/logo.png" class="w-5 h-5 rounded object-cover" alt="Logo">
                        <span class="text-[9px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full" style="color: #ffffff; background: var(--accent-color);">Sami Enterprises</span>
                    </div>
                </div>

                <div class="w-full rounded-xl overflow-hidden shadow-lg mb-6 modal-anim-zoom" style="aspect-ratio: 16 / 9; width: 100%;">
                    <img src="${category.bannerImg}" class="w-full h-full object-cover" alt="${category.title}">
                </div>

                <div class="space-y-5">
                    <div>
                        <h2 class="text-2xl font-bold mb-1.5" style="color: var(--primary-color);">${category.title}</h2>
                        <p class="text-xs leading-relaxed modal-text-color opacity-90">${category.desc}</p>
                    </div>
                    
                    <div class="p-4 rounded-xl border shadow-sm modal-card-bg">
                        <h3 class="text-[11px] uppercase tracking-wider font-bold mb-3 border-b pb-1.5" style="color: var(--accent-color); border-color: var(--card-border);">Available Products Under ${category.title}</h3>
                        <div class="services-detail-grid">
                            ${servicesHTML}
                        </div>
                    </div>

                    <div class="flex gap-3 pt-2">
                        <button onclick="window.samiApp.openEstimatorModal()" class="w-full py-3 font-bold rounded-lg uppercase tracking-wider text-xs transition shadow flex items-center justify-center gap-2" style="background-color: var(--accent-color); color: #ffffff;">
                            <i class="fas fa-calculator"></i> Calculate Custom Price Estimate
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modalPageContainer.style.display = 'block';
        document.body.classList.add('modal-open');
        modalPageContainer.scrollTop = 0; 

        if (pushState) {
            window.history.pushState({ modal: 'explore', categoryIdx: idx }, '', '#category-' + category.id);
        }
    }

    function openAboutUsModal(pushState = true) {
        capturedMainScrollPos = window.scrollY;
        const modalPageContainer = document.getElementById('explore-modal');
        
        modalPageContainer.innerHTML = `
            <div class="explore-page-content detail-page-animate">
                <div class="explore-sticky-header flex justify-between items-center mb-8 border-b modal-anim-up">
                    <div class="flex items-center font-bold text-xs cursor-pointer transition modal-text-color" onclick="window.samiApp.closeExploreModal()">
                        <i class="fa-solid fa-arrow-left mr-1.5"></i> Back
                    </div>
                    <div class="flex items-center gap-1.5 cursor-pointer" onclick="window.samiApp.closeExploreModalAndGoHome()">
                        <img src="assets/images/logo.png" class="w-5 h-5 rounded object-cover" alt="Logo">
                        <span class="text-[9px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full" style="color: #ffffff; background: var(--accent-color);">Sami Enterprises</span>
                    </div>
                </div>

                <div class="space-y-12">
                    <!-- Section 1: Management Leader -->
                    <div class="flex flex-col md:flex-row gap-6 items-center">
                        <div class="w-full max-w-[320px] mx-auto md:w-5/12 rounded-2xl overflow-hidden shadow-xl" style="aspect-ratio: 3 / 4;">
                            <img src="assets/images/founder_portrait.jpg" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="S. Zuberi - Founder">
                        </div>
                        <div class="w-full md:w-7/12">
                            <span class="text-[9px] tracking-widest uppercase font-bold block mb-1" style="color: var(--accent-color);">Leadership & Craftsmanship</span>
                            <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">S. Zuberi (Shamsher Zuberi)</h2>
                            <p class="text-xs leading-relaxed modal-text-color mb-4">Leading Sami Enterprises with an unwavering focus on genuine wood selection, precision hand-carving, and reliable client fulfillment across India. Our enterprise stands as a registered sole proprietorship committed to preserving traditional Indian woodworking.</p>
                            <ul class="space-y-2">
                                <li class="flex items-start gap-2 py-0.5">
                                    <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent-color);"></span> 
                                    <span class="font-medium text-xs modal-text-color">GST Registered Sole Proprietorship (GSTIN: 09AANPZ8057B1Z4).</span>
                                </li>
                                <li class="flex items-start gap-2 py-0.5">
                                    <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent-color);"></span> 
                                    <span class="font-medium text-xs modal-text-color">4.9 Verified Google & Justdial Client Satisfaction Record.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Section 2: Showroom -->
                    <div class="flex flex-col md:flex-row gap-6 items-center border-t pt-8" style="border-color: var(--card-border);">
                        <div class="w-full md:w-7/12">
                            <span class="text-[9px] tracking-widest uppercase font-bold block mb-1" style="color: var(--accent-color);">Artisan Showroom & Workshop</span>
                            <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Our Showroom & Facilities</h2>
                            <p class="text-xs leading-relaxed modal-text-color mb-4">Visit our flagship showroom on Abdul Salam Road or our specialized woodcrafting workshop in Shahbelol, Saharanpur. We maintain strict quality control for seasoning timber, chiseled joinery, and antique finish polishing.</p>
                            <ul class="space-y-2">
                                <li class="flex items-start gap-2 py-0.5">
                                    <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent-color);"></span> 
                                    <span class="font-medium text-xs modal-text-color">Showroom: Thana Mandi Shahbilol, Ram Nagar, Abdul Salam Road, Saharanpur.</span>
                                </li>
                                <li class="flex items-start gap-2 py-0.5">
                                    <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent-color);"></span> 
                                    <span class="font-medium text-xs modal-text-color">Direct Contact: +91 90453 88600 | Open All 7 Days (9:00 AM - 9:30 PM)</span>
                                </li>
                            </ul>
                        </div>
                        <div class="w-full max-w-[320px] mx-auto md:w-5/12 rounded-2xl overflow-hidden shadow-xl" style="aspect-ratio: 3 / 4;">
                            <img src="assets/images/showroom_facade.jpg" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="Showroom Display">
                        </div>
                    </div>

                    <!-- Section 3: Interactive 3D Business Card -->
                    <div class="business-card-section pt-8 border-t" style="border-color: var(--card-border);">
                        <h2 class="text-xl md:text-2xl font-bold mb-3 text-center" style="color: var(--primary-color);">Our Official Business Card</h2>
                        
                        <div class="business-card-container" 
                             onmousemove="window.samiApp.handleBizCardMove(event, this)" 
                             onmouseleave="window.samiApp.handleBizCardReset(this)">
                            <div class="business-card-inner">
                                <img src="assets/images/business_card.png" alt="Sami Enterprises Official Business Card" class="w-full h-full object-cover rounded-xl">
                                <div class="card-glare-overlay"></div>
                            </div>
                        </div>
                        
                        <div class="mt-4 text-center">
                            <button onclick="window.samiApp.downloadBusinessCard()" class="magnetic-btn inline-flex items-center gap-1.5" style="padding: 9px 22px; font-size: 0.8rem;">
                                <i class="fa-solid fa-download"></i> Download Our Card
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        `;
        
        modalPageContainer.style.display = 'block';
        document.body.classList.add('modal-open');
        modalPageContainer.scrollTop = 0;
        setupBizCardTouchEvents();

        if (pushState) {
            window.history.pushState({ modal: 'about' }, '', '#about-modal');
        }
    }

    function downloadBusinessCard() {
        const link = document.createElement('a');
        link.href = 'assets/images/business_card.png';
        link.download = 'Sami_Enterprises_Business_Card.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function handleBizCardMove(e, container) {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
            handleBizCardReset(container);
            return;
        }

        container.classList.add('is-tilting');

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (((centerY - y) / centerY) * 15).toFixed(2);
        const rotateY = (((x - centerX) / centerX) * 15).toFixed(2);
        
        const inner = container.querySelector('.business-card-inner');
        if (inner) {
            inner.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        }
        
        const glareX = ((x / rect.width) * 100).toFixed(2);
        const glareY = ((y / rect.height) * 100).toFixed(2);
        container.style.setProperty('--glare-x', `${glareX}%`);
        container.style.setProperty('--glare-y', `${glareY}%`);
    }

    function handleBizCardReset(container) {
        if (!container) return;
        container.classList.remove('is-tilting');
        const inner = container.querySelector('.business-card-inner');
        if (inner) {
            inner.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
    }

    function setupBizCardTouchEvents() {
        setTimeout(() => {
            const container = document.querySelector('.business-card-container');
            if (!container) return;
            
            container.addEventListener('touchstart', (e) => {
                container.classList.add('touch-active');
                handleBizCardMove(e, container);
            }, { passive: true });
            
            container.addEventListener('touchmove', (e) => {
                handleBizCardMove(e, container);
            }, { passive: true });
            
            container.addEventListener('touchend', () => {
                container.classList.remove('touch-active');
                handleBizCardReset(container);
            });
            container.addEventListener('touchcancel', () => {
                container.classList.remove('touch-active');
                handleBizCardReset(container);
            });
        }, 50);
    }

    function closeExploreModalInternal() {
        const modal = document.getElementById('explore-modal');
        if (!modal) return;
        modal.style.display = 'none';
        modal.scrollTop = 0;
        unlockScroll();
        
        window.scrollTo(0, capturedMainScrollPos);
    }

    function closeExploreModal() {
        if (window.location.hash.startsWith('#category-') || window.location.hash === '#about-modal') {
            window.history.back();
        } else {
            closeExploreModalInternal();
        }
    }

    function closeExploreModalAndGoHome() {
        closeExploreModalInternal();
        isNavigatingBack = true;
        scrollToTop();
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            isNavigatingBack = false;
            hasPushedScrolledState = false;
        }, 500);
        if (window.location.hash.startsWith('#category-') || window.location.hash === '#about-modal') {
            window.history.replaceState({ section: 'home' }, '', window.location.pathname);
        }
    }

    function validateAndRunCostEngine() {
        const areaInput = document.getElementById('calcArea');
        let rawVal = areaInput.value;
        
        if (rawVal === "" || rawVal === null) {
            document.getElementById('lblDesignCost').innerText = `₹0`;
            document.getElementById('lblExecCost').innerText = `₹0`;
            document.getElementById('lblTotalCost').innerText = `₹0`;
            return;
        }

        let val = parseFloat(rawVal);
        if (val > 20000) {
            val = 20000;
            areaInput.value = 20000;
        } else if (val < 0) {
            areaInput.value = "";
            document.getElementById('lblDesignCost').innerText = `₹0`;
            document.getElementById('lblExecCost').innerText = `₹0`;
            document.getElementById('lblTotalCost').innerText = `₹0`;
            return;
        }

        runCostEngine();
    }

    function runCostEngine() {
        let service = document.getElementById('calcService').value;
        let quality = document.getElementById('calcQuality').value;
        let rawArea = document.getElementById('calcArea').value;
        let area = parseFloat(rawArea);

        if (isNaN(area) || area <= 0) {
            document.getElementById('lblDesignCost').innerText = `₹0`;
            document.getElementById('lblExecCost').innerText = `₹0`;
            document.getElementById('lblTotalCost').innerText = `₹0`;
            return;
        }

        let baseRate = 0;
        if (service === 'furniture') {
            if (quality === 'standard') baseRate = 3500;
            else if (quality === 'medium') baseRate = 6500;
            else if (quality === 'premium') baseRate = 11500;
        } else if (service === 'partition') {
            if (quality === 'standard') baseRate = 3500;
            else if (quality === 'medium') baseRate = 4500;
            else if (quality === 'premium') baseRate = 6500;
        } else if (service === 'kitchen') {
            if (quality === 'standard') baseRate = 1200;
            else if (quality === 'medium') baseRate = 1600;
            else if (quality === 'premium') baseRate = 2200;
        } else if (service === 'handicrafts') {
            if (quality === 'standard') baseRate = 250;
            else if (quality === 'medium') baseRate = 550;
            else if (quality === 'premium') baseRate = 1200;
        }

        let materialCost = Math.round(area * baseRate);
        let laborCost = Math.round(materialCost * 0.15);
        let total = materialCost + laborCost;

        const fmt = new Intl.NumberFormat('en-IN');
        document.getElementById('lblDesignCost').innerText = `₹${fmt.format(materialCost)}`;
        document.getElementById('lblExecCost').innerText = `₹${fmt.format(laborCost)}`;
        document.getElementById('lblTotalCost').innerText = `₹${fmt.format(total)}`;
    }

    function openEstimatorModal(pushState = true) {
        document.getElementById('estimatorModal').classList.add('active');
        runCostEngine();
        if (pushState) {
            window.history.pushState({ modal: 'estimator' }, '', '#estimator');
        }
    }

    function closeEstimatorModalInternal() {
        const m = document.getElementById('estimatorModal');
        if (m) m.classList.remove('active');
        const exploreModal = document.getElementById('explore-modal');
        if (!exploreModal || exploreModal.style.display !== 'block') {
            unlockScroll();
        }
    }

    function closeEstimatorModal() {
        if (window.location.hash === '#estimator') {
            window.history.back();
        } else {
            closeEstimatorModalInternal();
        }
    }

    function handleEstimatorDone() {
        closeEstimatorModal();
        const serviceTxt = document.getElementById('calcService').options[document.getElementById('calcService').selectedIndex].text;
        const qualityTxt = document.getElementById('calcQuality').options[document.getElementById('calcQuality').selectedIndex].text;
        const units = document.getElementById('calcArea').value || "0";
        const totalEst = document.getElementById('lblTotalCost').innerText;
        
        const text = `Hi Sami Enterprises, I calculated an estimate from your website:\n\nRequirement: ${serviceTxt}\nTimber / Finish Tier: ${qualityTxt}\nQuantity / Area: ${units}\nEstimated Cost: ${totalEst}\n\nPlease share catalog and confirm bulk/retail availability.`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/919045388600?text=${encodedText}`, '_blank');
    }

    function sendWhatsApp() {
        const name = document.getElementById('frmName').value;
        const phone = document.getElementById('frmPhone').value;
        const email = document.getElementById('frmEmail').value || "Not Provided";
        const msg = document.getElementById('frmMsg').value;
        if (!name || !phone || !msg) {
            alert("Please complete the required fields before submitting.");
            return;
        }
        const text = `New Custom Inquiry from Sami Enterprises Website\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nRequirement: ${msg}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/919045388600?text=${encodedText}`, '_blank');
    }

    function sendEmail() {
        const name = document.getElementById('frmName').value;
        const phone = document.getElementById('frmPhone').value;
        const email = document.getElementById('frmEmail').value || "Not Provided";
        const msg = document.getElementById('frmMsg').value;
        if (!name || !phone || !msg) {
            alert("Please complete the required fields before submitting.");
            return;
        }
        const studioEmail = "shamsherzuberi55@gmail.com";
        const subject = encodeURIComponent("New Custom Inquiry - Sami Enterprises");
        const bodyText = `New Customer Inquiry Details:\n\nName: ${name}\nPhone: ${phone}\nUser Email: ${email}\nRequirement: ${msg}`;
        const encodedBody = encodeURIComponent(bodyText);
        
        window.location.href = `mailto:${studioEmail}?subject=${subject}&body=${encodedBody}`;
    }

    function initParticles() {
        const canvas = document.getElementById('bunki-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            particles = [];
            for (let i = 0; i < (width < 768 ? 25 : 50); i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 1.0,
                    vy: (Math.random() - 0.5) * 1.0,
                    radius: Math.random() * 1.8 + 1
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            const rs = getComputedStyle(document.body);
            let currentAccent = rs.getPropertyValue('--accent-rgb').trim() || '201, 138, 68'; 
            
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx = -p.vx;
                if (p.y < 0 || p.y > height) p.vy = -p.vy;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${currentAccent}, 0.3)`;
                ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${currentAccent}, ${0.15 - dist / 650})`;
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        }

        resize();
        animate();
        window.addEventListener('resize', resize);
    }

    // Expose global methods
    window.samiApp = {
        scrollToTop,
        navigateToSection,
        toggleMenu,
        closeMenuOnNavigate,
        triggerExploreView,
        openAboutUsModal,
        closeExploreModal,
        closeExploreModalAndGoHome,
        downloadBusinessCard,
        handleBizCardMove,
        handleBizCardReset,
        validateAndRunCostEngine,
        runCostEngine,
        openEstimatorModal,
        closeEstimatorModal,
        handleEstimatorDone,
        quickInquireWhatsApp,
        sendWhatsApp,
        sendEmail
    };

    // Auto boot on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderApp);
    } else {
        renderApp();
    }
})();
