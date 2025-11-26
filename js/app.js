// --- Configuration ---
const config = {
    brand: {
        name: "WELLGEN",
        subtitle: "Laboratories",
        description: "A Wellgen Labs combina rigor científico com uma estética moderna para construir confiança por meio da transparência e do design. Nossa missão é simples — resultados que começam com controle.",
        copyright: "© 2025 Wellgen Laboratories. Todos os direitos reservados."
    },
    menu: [
        { label: "Início", action: "home" },
        { label: "Sobre Nós", action: "about" },
        { label: "Produtos", action: "products" },
        { label: "Qualidade", action: "quality" }
    ],
    footerLinks: {
        nav: [
            { label: "Início", action: "home" },
            { label: "Sobre a Wellgen", action: "about" },
            { label: "Catálogo Completo", action: "products" },
            { label: "Tecnologia HPLC", action: "quality" }
        ],
        support: [
            { label: "Verificar Lote", action: "verify", icon: "verified_user" },
            { label: "Fale Conosco", href: "#" },
            { label: "Política de Privacidade", href: "#" }
        ]
    }
};

// --- Controller ---
const app = {
    init() {
        this.renderLayout();
        this.initScrollAnimations();
        this.navigate('home');
    },

    renderLayout() {
        // Render Desktop Nav
        const desktopNav = document.getElementById('desktop-nav');
        if (desktopNav) {
            desktopNav.innerHTML = config.menu.map(item => 
                `<button class="text-base font-semibold text-slate-600 hover:text-wellgen-600 transition-colors" onclick="app.navigate('${item.action}')">${item.label}</button>`
            ).join('');
        }

        // Render Mobile Nav
        const mobileNav = document.getElementById('mobile-nav-items');
        if (mobileNav) {
            mobileNav.innerHTML = [
                ...config.menu,
                { label: "Verificar Lote", action: "verify" }
            ].map(item => 
                `<button class="block w-full text-left text-base font-semibold text-slate-600 hover:text-wellgen-600" onclick="app.navigate('${item.action}'); document.getElementById('mobile-menu').classList.add('hidden')">${item.label}</button>`
            ).join('');
        }

        // Render Footer
        const footer = document.getElementById('main-footer');
        if (footer) {
            footer.innerHTML = `
                <div class="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                        <!-- Brand -->
                        <div>
                            <div class="flex items-center gap-3 mb-8">
                                <span class="material-symbols-rounded text-wellgen-400 text-4xl">science</span>
                                <div class="flex flex-col">
                                    <span class="font-display font-bold text-3xl tracking-tight leading-none">${config.brand.name}</span>
                                    <span class="text-[10px] uppercase tracking-widest text-wellgen-400">${config.brand.subtitle}</span>
                                </div>
                            </div>
                            <p class="text-slate-400 text-base leading-relaxed mb-8">
                                ${config.brand.description}
                            </p>
                        </div>
                        <!-- Nav -->
                        <div>
                            <h4 class="font-display font-bold text-lg text-white mb-8">Navegação</h4>
                            <ul class="space-y-4 text-base text-slate-400">
                                ${config.footerLinks.nav.map(link => 
                                    `<li><button class="hover:text-wellgen-400 transition-colors" onclick="app.navigate('${link.action}')">${link.label}</button></li>`
                                ).join('')}
                            </ul>
                        </div>
                        <!-- Support -->
                        <div>
                            <h4 class="font-display font-bold text-lg text-white mb-8">Suporte</h4>
                            <ul class="space-y-4 text-base text-slate-400">
                                ${config.footerLinks.support.map(link => {
                                    if (link.action) {
                                        return `<li><button class="hover:text-wellgen-400 transition-colors flex items-center gap-2" onclick="app.navigate('${link.action}')">${link.icon ? `<span class="material-symbols-rounded text-sm">${link.icon}</span>` : ''} ${link.label}</button></li>`;
                                    } else {
                                        return `<li><a class="hover:text-wellgen-400 transition-colors" href="${link.href}">${link.label}</a></li>`;
                                    }
                                }).join('')}
                            </ul>
                        </div>
                        <!-- Legal -->
                        <div>
                            <h4 class="font-display font-bold text-lg text-white mb-8">Aviso Legal</h4>
                            <div class="p-6 rounded-xl bg-white/5 border border-white/10">
                                <p class="text-xs text-slate-400 leading-relaxed text-justify">
                                    A Wellgen Laboratories opera estritamente de acordo com as diretrizes internacionais. O conteúdo deste site é informativo e destinado a profissionais da saúde. A verificação de autenticidade é a única forma de garantir a procedência do produto.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p class="text-sm text-slate-500">${config.brand.copyright}</p>
                        <div class="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span class="text-xs text-emerald-400 font-bold tracking-widest">SYSTEM ONLINE</span>
                        </div>
                    </div>
                </div>
            `;
        }
    },

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observe elements after view change
        const observeElements = () => {
            const elements = document.querySelectorAll('.fade-up, .scale-up');
            elements.forEach(el => observer.observe(el));
        };

        // Hook into navigate
        const originalNavigate = this.navigate.bind(this);
        this.navigate = async (viewName, param) => {
            await originalNavigate(viewName, param);
            setTimeout(observeElements, 100); // Wait for render
        };
    },

    async navigate(viewName, param = null) {
        const container = document.getElementById('app-view');
        
        // Animate Out
        container.classList.add('view-hidden');
        
        // Simulate delay for smooth transition
        await new Promise(r => setTimeout(r, 400));
        window.scrollTo(0, 0);
        
        let content = '';
        try {
            switch(viewName) {
                case 'home': content = this.views.home(); break;
                case 'about': content = this.views.about(); break;
                case 'products': content = this.views.products(); break;
                case 'product-detail': content = this.views.productDetail(param); break;
                case 'quality': content = this.views.quality(); break;
                case 'verify': content = this.views.verify(); break;
            }
        } catch(e) {
            console.error("View Error", e);
            content = `<div class='p-20 text-center'>Erro ao carregar página. Tente recarregar.</div>`;
        }

        container.innerHTML = content;
        
        // Animate In
        requestAnimationFrame(() => {
            container.classList.remove('view-hidden');
        });
    },

    filterProducts(category) {
        const grid = document.getElementById('product-grid');
        const buttons = document.querySelectorAll('.filter-btn');
        
        // Update buttons
        buttons.forEach(btn => {
            if(btn.dataset.category === category) {
                btn.classList.add('bg-wellgen-900', 'text-white');
                btn.classList.remove('bg-white', 'text-slate-600');
            } else {
                btn.classList.remove('bg-wellgen-900', 'text-white');
                btn.classList.add('bg-white', 'text-slate-600');
            }
        });

        // Filter items
        const filtered = category === 'all' 
            ? products 
            : products.filter(p => p.category === category);

        // Render
        grid.innerHTML = filtered.map(p => `
            <div onclick="app.navigate('product-detail', '${p.id}')" class="group bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:border-wellgen-200 transition-all duration-300 cursor-pointer scale-up animate-in">
                <div class="aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden mb-6 relative">
                    <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-wellgen-700 border border-slate-100">
                        ${p.category}
                    </div>
                </div>
                <div class="px-2">
                    <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-wellgen-600 transition-colors">${p.name}</h3>
                    <p class="text-base text-slate-500 line-clamp-2 mb-6">${p.shortDesc}</p>
                    <div class="flex items-center justify-between pt-6 border-t border-slate-100">
                        <span class="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md">${p.specs.concentration}</span>
                        <div class="w-8 h-8 rounded-full bg-wellgen-50 flex items-center justify-center text-wellgen-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                            <span class="material-symbols-rounded text-sm">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    views: {
        cta: () => `
            <div class="bg-slate-900 py-24 relative overflow-hidden">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Precisa de ajuda com seu pedido?</h2>
                    <p class="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                        Nossa equipe de suporte está disponível para auxiliar com dúvidas sobre produtos, envios e autenticidade.
                    </p>
                    <a href="https://wa.me/5511999999999" target="_blank" class="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-green-500/25">
                        <span class="material-symbols-rounded text-2xl">chat</span>
                        Falar no WhatsApp
                    </a>
                </div>
            </div>
        `,

        home: () => `
            <div class="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-20">
                <!-- Hero -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div class="order-last lg:order-first">
                        <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 text-wellgen-600 border border-blue-100 mb-8">
                            <span class="w-2.5 h-2.5 rounded-full bg-wellgen-600 animate-pulse"></span>
                            <span class="text-xs font-bold uppercase tracking-widest">Tecnologia Farmacêutica Avançada</span>
                        </div>
                        <h1 class="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 fade-up">
                            Controle. Ciência.<br>
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-wellgen-600 to-wellgen-400">Resultado.</span>
                        </h1>
                        <p class="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg fade-up">
                            Autenticidade e tecnologia em cada composto. A Wellgen Labs combina rigor científico com uma estética moderna para construir confiança por meio da transparência e do design.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-5 fade-up">
                            <button onclick="app.navigate('products')" class="px-8 py-5 bg-wellgen-900 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-800 hover:shadow-xl transition-all hover:-translate-y-1">
                                Ver Catálogo Oficial
                            </button>
                            <button onclick="app.navigate('about')" class="px-8 py-5 bg-white text-slate-700 text-lg font-bold rounded-xl border-2 border-slate-100 hover:border-wellgen-600 hover:text-wellgen-600 transition-all">
                                Conheça a Empresa
                            </button>
                        </div>
                    </div>
                    
                    <div class="relative lg:h-[600px] flex items-center justify-center scale-up order-first lg:order-last">
                        <div class="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-full blur-3xl scale-75"></div>
                        <img src="img/products/propionato.webp" 
                             class="relative z-10 w-full h-[210px] lg:h-[550px] object-cover rounded-2xl drop-shadow-2xl hover:scale-105 transition-transform duration-700" alt="Wellgen Product">
                        
                        <!-- Float Card -->
                        <div class="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-20 animate-bounce" style="animation-duration: 4s;">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 border border-green-100">
                                    <span class="material-symbols-rounded text-2xl">verified</span>
                                </div>
                                <div>
                                    <p class="text-xs text-slate-400 font-bold uppercase tracking-wide">Pureza Certificada</p>
                                    <p class="text-xl font-bold text-slate-900">99.8% HPLC</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Features Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 border-t border-slate-200 pt-16 fade-up">
                    <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                        <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-wellgen-600 mb-6 group-hover:scale-110 transition-transform">
                            <span class="material-symbols-rounded text-3xl">precision_manufacturing</span>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Precisão</h3>
                        <p class="text-slate-500 leading-relaxed">Cada formulação é desenvolvida sob rigoroso controle científico.</p>
                    </div>
                    <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                        <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-wellgen-600 mb-6 group-hover:scale-110 transition-transform">
                            <span class="material-symbols-rounded text-3xl">verified_user</span>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Transparência</h3>
                        <p class="text-slate-500 leading-relaxed">Autenticidade verificada. Confiança visível.</p>
                    </div>
                    <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                        <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-wellgen-600 mb-6 group-hover:scale-110 transition-transform">
                            <span class="material-symbols-rounded text-3xl">auto_awesome</span>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Inovação</h3>
                        <p class="text-slate-500 leading-relaxed">A evolução do design e da tecnologia farmacêutica.</p>
                    </div>
                </div>

                <!-- Best Sellers -->
                <div class="mt-32 fade-up">
                    <div class="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 class="text-3xl font-bold text-slate-900">Destaques da Linha</h2>
                            <p class="text-lg text-slate-500 mt-2">As formulações mais prescritas por especialistas.</p>
                        </div>
                        <button onclick="app.navigate('products')" class="text-wellgen-600 font-bold hover:text-wellgen-800 flex items-center gap-2 mt-4 md:mt-0 transition-colors">
                            Ver todos <span class="material-symbols-rounded">arrow_forward</span>
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${products.slice(0, 4).map(p => `
                            <div onclick="app.navigate('product-detail', '${p.id}')" class="group bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:border-wellgen-200 transition-all duration-300 cursor-pointer scale-up">
                                <div class="aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden mb-6 relative">
                                    <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-wellgen-700 border border-slate-100">
                                        ${p.category}
                                    </div>
                                </div>
                                <div class="px-2">
                                    <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-wellgen-600 transition-colors">${p.name}</h3>
                                    <p class="text-base text-slate-500 line-clamp-2 mb-6">${p.shortDesc}</p>
                                    <div class="flex items-center justify-between pt-6 border-t border-slate-100">
                                        <span class="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md">${p.specs.concentration}</span>
                                        <div class="w-8 h-8 rounded-full bg-wellgen-50 flex items-center justify-center text-wellgen-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                            <span class="material-symbols-rounded text-sm">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        ` + app.views.cta(),

        products: () => `
            <div class="bg-slate-50">
                <div class="bg-white border-b border-slate-200 py-20">
                    <div class="max-w-7xl mx-auto px-6 lg:px-8">
                        <h1 class="text-5xl font-bold text-slate-900 mb-6">Catálogo Oficial</h1>
                        <p class="text-xl text-slate-600 max-w-3xl mb-10">
                            Nossa linha completa de produtos. Selecione um item para visualizar a ficha técnica completa, dosagens recomendadas e relatórios de análise.
                        </p>
                        
                        <!-- Filters -->
                        <div class="flex flex-wrap gap-3">
                            <button onclick="app.filterProducts('all')" data-category="all" class="filter-btn px-6 py-2.5 rounded-xl font-bold text-sm transition-all bg-wellgen-900 text-white shadow-lg">Todos</button>
                            <button onclick="app.filterProducts('Injetáveis')" data-category="Injetáveis" class="filter-btn px-6 py-2.5 rounded-xl font-bold text-sm transition-all bg-white text-slate-600 border border-slate-200 hover:border-wellgen-600 hover:text-wellgen-600">Injetáveis</button>
                            <button onclick="app.filterProducts('Orais')" data-category="Orais" class="filter-btn px-6 py-2.5 rounded-xl font-bold text-sm transition-all bg-white text-slate-600 border border-slate-200 hover:border-wellgen-600 hover:text-wellgen-600">Orais</button>
                        </div>
                    </div>
                </div>

                <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <div id="product-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        ${products.map(p => `
                            <div onclick="app.navigate('product-detail', '${p.id}')" class="group bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:border-wellgen-200 transition-all duration-300 cursor-pointer scale-up">
                                <div class="aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden mb-6 relative">
                                    <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-wellgen-700 border border-slate-100">
                                        ${p.category}
                                    </div>
                                </div>
                                <div class="px-2">
                                    <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-wellgen-600 transition-colors">${p.name}</h3>
                                    <p class="text-base text-slate-500 line-clamp-2 mb-6">${p.shortDesc}</p>
                                    <div class="flex items-center justify-between pt-6 border-t border-slate-100">
                                        <span class="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md">${p.specs.concentration}</span>
                                        <div class="w-8 h-8 rounded-full bg-wellgen-50 flex items-center justify-center text-wellgen-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                            <span class="material-symbols-rounded text-sm">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        ` + app.views.cta(),

        productDetail: (id) => {
            const p = products.find(x => x.id === id);
            if(!p) return app.views.products();

            // Related Products Logic
            const related = products
                .filter(x => x.category === p.category && x.id !== p.id)
                .slice(0, 4);
            
            // If not enough related in category, fill with others
            if(related.length < 4) {
                const others = products
                    .filter(x => x.category !== p.category && x.id !== p.id)
                    .slice(0, 4 - related.length);
                related.push(...others);
            }

            return `
                <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    <button onclick="app.navigate('products')" class="flex items-center gap-2 text-slate-500 hover:text-wellgen-600 mb-8 font-medium transition-colors">
                        <span class="material-symbols-rounded">arrow_back</span> Voltar ao Catálogo
                    </button>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                        <div class="lg:col-span-5">
                            <div class="aspect-square bg-white rounded-3xl border border-slate-200 p-8 flex items-center justify-center relative shadow-lg sticky top-32">
                                <img src="${p.image}" class="w-full h-full object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-500">
                                <div class="absolute top-6 right-6 flex flex-col gap-3">
                                    <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-wellgen-600 border border-slate-100" title="Autenticidade Garantida">
                                        <span class="material-symbols-rounded text-2xl">verified_user</span>
                                    </div>
                                    <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-wellgen-600 border border-slate-100" title="Grau Farmacêutico">
                                        <span class="material-symbols-rounded text-2xl">science</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="lg:col-span-7">
                            <span class="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-wellgen-700 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">${p.category}</span>
                            <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">${p.name}</h1>
                            <p class="text-xl text-slate-600 leading-relaxed mb-10 font-light border-l-4 border-wellgen-500 pl-6">
                                ${p.fullDesc}
                            </p>

                            <div class="space-y-6 mb-10">
                                <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                    <div class="bg-slate-50 px-8 py-4 border-b border-slate-200">
                                        <h3 class="font-bold text-slate-800 flex items-center gap-2">
                                            <span class="material-symbols-rounded text-wellgen-600">dataset</span> Especificações
                                        </h3>
                                    </div>
                                    <div class="p-8 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                        <div>
                                            <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Concentração</span>
                                            <span class="text-lg font-mono font-bold text-slate-900">${p.specs.concentration}</span>
                                        </div>
                                        <div>
                                            <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Apresentação</span>
                                            <span class="text-lg font-medium text-slate-900">${p.specs.presentation}</span>
                                        </div>
                                        <div>
                                            <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Meia-Vida</span>
                                            <span class="text-lg font-medium text-slate-900">${p.specs.halfLife}</span>
                                        </div>
                                        <div>
                                            <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Veículo</span>
                                            <span class="text-lg font-medium text-slate-900">USP Grape Seed Oil</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                                    <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <span class="material-symbols-rounded text-wellgen-600">info</span> Recomendações de Armazenamento
                                    </h3>
                                    <p class="text-slate-600 text-sm leading-relaxed mb-4">
                                        Manter em temperatura ambiente controlada (20°C a 25°C). Proteger da luz solar direta. Não refrigerar, pois isso pode causar cristalização do composto.
                                    </p>
                                    <div class="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg text-sm font-medium border border-amber-100">
                                        <span class="material-symbols-rounded">warning</span> Uso estritamente profissional.
                                    </div>
                                </div>
                            </div>

                            <div class="bg-wellgen-900 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                                <div class="absolute inset-0 bg-wellgen-600/20"></div>
                                <div class="relative z-10">
                                    <h4 class="text-xl font-bold text-white mb-2">Possui este produto?</h4>
                                    <p class="text-blue-200 text-sm">Verifique a procedência e autenticidade agora mesmo.</p>
                                </div>
                                <button onclick="app.navigate('verify')" class="relative z-10 px-6 py-3 bg-white text-wellgen-900 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                                    Verificar Lote
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Related Products -->
                    <div class="border-t border-slate-200 pt-16">
                        <h2 class="text-3xl font-bold text-slate-900 mb-8">Produtos Relacionados</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            ${related.map(rp => `
                                <div onclick="app.navigate('product-detail', '${rp.id}')" class="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full">
                                    <div class="aspect-square bg-slate-100 relative overflow-hidden">
                                        <img src="${rp.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                                    </div>
                                    <div class="p-5">
                                        <span class="text-[10px] font-bold uppercase tracking-wide text-wellgen-600 mb-1 block">${rp.category}</span>
                                        <h3 class="text-lg font-bold text-slate-900 mb-1 group-hover:text-wellgen-600 transition-colors">${rp.name}</h3>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            ` + app.views.cta();
        },

        verify: () => `
            <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                    <div class="bg-wellgen-900 p-10 text-center relative overflow-hidden">
                        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div class="relative z-10">
                            <div class="w-20 h-20 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-glow">
                                <span class="material-symbols-rounded text-4xl text-wellgen-400">verified_user</span>
                            </div>
                            <h1 class="text-3xl font-bold text-white mb-2">Validação de Segurança</h1>
                            <p class="text-wellgen-200">Sistema de rastreabilidade Wellgen Labs v2.4</p>
                        </div>
                    </div>

                    <div class="p-10">
                        <form onsubmit="event.preventDefault(); verifyCode();" id="verifyForm">
                            <div class="mb-8">
                                <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Código Serial (Scratch Code)</label>
                                <div class="relative">
                                    <input type="text" id="code" 
                                        class="w-full pl-14 pr-4 py-5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xl font-mono text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-wellgen-100 focus:border-wellgen-600 outline-none transition-all uppercase tracking-widest"
                                        placeholder="XXXX-XXXX-XXXX" maxlength="14">
                                    <div class="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400">
                                        <span class="material-symbols-rounded text-2xl">qr_code_2</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button type="submit" class="w-full py-5 bg-wellgen-600 text-white font-bold text-lg rounded-2xl hover:bg-wellgen-700 transition-all shadow-lg hover:shadow-wellgen-600/30 active:scale-95 flex items-center justify-center gap-2">
                                <span id="btnText">Verificar Autenticidade</span>
                            </button>
                        </form>

                        <!-- Loader Container -->
                        <div id="loaderContainer" class="hidden mt-8 flex justify-center">
                            <div class="loader">
                                <div class="circle"></div>
                                <div class="circle"></div>
                                <div class="circle"></div>
                                <div class="circle"></div>
                            </div>
                        </div>

                        <!-- Result Container -->
                        <div id="result" class="hidden mt-8 pt-8 border-t border-slate-100"></div>
                    </div>
                </div>
            </div>
        `,

        about: () => `
            <div class="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-20">
                <div class="text-center max-w-3xl mx-auto mb-20 fade-up">
                    <h1 class="text-5xl font-bold text-slate-900 mb-6">Sobre a Wellgen Labs</h1>
                    <p class="text-xl text-slate-600 leading-relaxed">
                        Ciência, autenticidade e precisão em cada detalhe.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                    <div class="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative scale-up">
                        <img src="img/sobre-1.png" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold text-slate-900 mb-6">Nossa Missão</h2>
                        <div class="space-y-6 text-lg text-slate-600">
                            <p>
                                A Wellgen Labs combina rigor científico com uma estética moderna para construir confiança por meio da transparência e do design.
                            </p>
                            <p>
                                Nossa missão é simples — resultados que começam com controle. Utilizamos matérias-primas de grau farmacêutico e processos de fabricação que seguem os mais altos padrões internacionais.
                            </p>
                            <p>
                                Acreditamos que a informação é a chave para a segurança. Por isso, disponibilizamos ferramentas de verificação de autenticidade e relatórios detalhados de cada lote produzido.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="relative rounded-3xl overflow-hidden h-96 mb-32 shadow-2xl fade-up">
                    <img src="img/banner.webp" class="absolute inset-0 w-full h-full object-cover">
                    <div class="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                        <div class="text-center text-white max-w-2xl px-6">
                            <h3 class="text-3xl font-bold mb-4">Compromisso com a Excelência</h3>
                            <p class="text-lg text-slate-200">
                                Cada produto Wellgen é o resultado de anos de pesquisa e desenvolvimento, focado em entregar a máxima eficácia e segurança.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ` + app.views.cta(),

        quality: () => `
            <div class="bg-wellgen-900 text-white pt-32 pb-48 relative overflow-hidden">
                <div class="absolute inset-0 opacity-30">
                    <img src="img/controle-de-qualidade.png" class="w-full h-full object-cover">
                </div>
                <div class="absolute inset-0 bg-gradient-to-b from-wellgen-900/80 via-wellgen-900/50 to-wellgen-900"></div>
                <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center fade-up">
                    <h1 class="text-5xl md:text-6xl font-bold mb-6">Controle de Qualidade</h1>
                    <p class="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        A ciência por trás da nossa reputação. Entenda como garantimos a pureza, esterilidade e concentração exata de cada lote.
                    </p>
                </div>
            </div>

            <div class="max-w-5xl mx-auto px-6 lg:px-8 -mt-32 relative z-20 space-y-8 pb-20">
                <div class="bg-white rounded-3xl p-10 shadow-xl flex flex-col md:flex-row gap-8 items-start fade-up border border-slate-100">
                    <div class="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-wellgen-600 flex-shrink-0">
                        <span class="material-symbols-rounded text-4xl">biotech</span>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 mb-4">Análise HPLC</h2>
                        <p class="text-slate-600 text-lg leading-relaxed">
                            Utilizamos Cromatografia Líquida de Alta Eficiência (HPLC) para testar a pureza de cada lote de sal bruto que entra em nosso laboratório. Se a pureza for inferior a 99%, o lote é rejeitado. Sem exceções.
                        </p>
                    </div>
                </div>

                <div class="bg-white rounded-3xl p-10 shadow-xl flex flex-col md:flex-row gap-8 items-start fade-up border border-slate-100">
                    <div class="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-wellgen-600 flex-shrink-0">
                        <span class="material-symbols-rounded text-4xl">filter_alt</span>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 mb-4">Micro-Filtração Estéril</h2>
                        <p class="text-slate-600 text-lg leading-relaxed">
                            O produto final passa por um sistema de filtração de membrana de 0.22 mícron. Este padrão é capaz de remover 100% das bactérias e esporos fúngicos, garantindo uma solução cristalina e segura.
                        </p>
                    </div>
                </div>
                
                <div class="bg-white rounded-3xl p-10 shadow-xl flex flex-col md:flex-row gap-8 items-start fade-up border border-slate-100">
                    <div class="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-wellgen-600 flex-shrink-0">
                        <span class="material-symbols-rounded text-4xl">science</span>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 mb-4">Veículos de Grau Farmacêutico</h2>
                        <p class="text-slate-600 text-lg leading-relaxed">
                            Utilizamos apenas óleos carreadores de grau USP (United States Pharmacopeia), como o Óleo de Semente de Uva, garantindo baixa viscosidade, absorção ideal e risco mínimo de reações inflamatórias.
                        </p>
                    </div>
                </div>
            </div>
        ` + app.views.cta()
    }
};

function verifyCode() {
    const btnText = document.getElementById('btnText');
    const loaderContainer = document.getElementById('loaderContainer');
    const result = document.getElementById('result');
    const code = document.getElementById('code').value;

    if(code.length < 5) {
        alert("Por favor, insira um código válido.");
        return;
    }

    // Hide text, show loader
    btnText.classList.add('hidden');
    loaderContainer.classList.remove('hidden');
    result.classList.add('hidden');

    // Simulation
    setTimeout(() => {
        btnText.classList.remove('hidden');
        loaderContainer.classList.add('hidden');
        result.classList.remove('hidden');

        const isValid = Math.random() > 0.3;

        if(isValid) {
            result.innerHTML = `
                <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <span class="material-symbols-rounded text-2xl">check_circle</span>
                        </div>
                        <div>
                            <h4 class="font-bold text-green-800 text-lg">Produto Autêntico</h4>
                            <p class="text-green-700">Código verificado com sucesso na base de dados.</p>
                            <div class="mt-2 inline-block px-3 py-1 bg-white rounded border border-green-200 text-xs font-mono text-green-800">
                                LOTE: WG-${Math.floor(Math.random() * 9000) + 1000}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            result.innerHTML = `
                <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                            <span class="material-symbols-rounded text-2xl">warning</span>
                        </div>
                        <div>
                            <h4 class="font-bold text-red-800 text-lg">Código Inválido</h4>
                            <p class="text-red-700">Este serial não existe em nosso sistema. Cuidado.</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }, 2000);
}

// Initialize App
// document.addEventListener('DOMContentLoaded', () => {
//     app.init();
// });
