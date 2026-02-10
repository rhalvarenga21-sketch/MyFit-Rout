// MyFitRout - Global Checkout & GeoIP
// Agent 3.0 - Full Page Translation (Hero + Features + FAQ) & Robust Checkout

// Payment Integration: Revolut (Global) + Last Link (Brazil)

// ==========================================
// 🔗 LAST LINK CONFIGURATION
// ==========================================
const LASTLINK_CONFIG = {
    essential_monthly: "https://lastlink.com/p/CD85C185A/checkout-payment/",
    essential_annual: "https://lastlink.com/p/C00235787/checkout-payment/",
    pro_weekly: "https://lastlink.com/p/CD7968A27/checkout-payment/",
    pro_monthly: "https://lastlink.com/p/C3A4ECD3D/checkout-payment/",
    pro_annual: "https://lastlink.com/p/C35F0D49B/checkout-payment/"
};

// ==========================================
// 🗣️ TRANSLATIONS MATRIX
// ==========================================
// Using user provided texts as golden source.
// Values will be injected dynamically (e.g. €100 -> {sym}100)

const TRANSLATIONS = {
    PT: {
        // Hero
        hero_badge: "Vagas Limitadas & Exclusivas",
        hero_title: `Seu Coach de <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Alta Performance</span>`,
        hero_subtitle: "Treinos personalizados com Inteligência Artificial. Transforme seu corpo de forma inteligente, segura e definitiva.",
        cta_primary: "GARANTIR MINHA VAGA →",
        cta_secondary: "TESTAR APP GRÁTIS",

        // Section Titles
        features_title: "RECURSOS <span class='text-indigo-400'>PREMIUM</span>",
        pricing_title: "ESCOLHA SEU <span class='text-indigo-400'>PLANO</span>",
        pricing_subtitle: "Invista em você. Cancele quando quiser.",
        faq_title: "PERGUNTAS <span class='text-indigo-400'>FREQUENTES</span>",

        // --- PRICING CARDS (NEW COPY) ---

        // 1. Essential Monthly
        p_ess_month_title: "Essential Mensal",
        p_ess_month_desc: "Transforme seu corpo com inteligência",
        p_ess_month_feats: [
            "100 perguntas mensais com Coach (IA) personalizado",
            "Biblioteca completa: 150+ exercícios em vídeo",
            "Dashboard inteligente de progresso e evolução",
            "App mobile: treine em qualquer lugar, qualquer hora"
        ],
        p_ess_month_btn: "COMEÇAR AGORA",

        // 2. Essential Annual
        p_ess_annual_title: "Essential Anual",
        p_ess_annual_desc: "Economize {sym}38 - Consistência que transforma",
        p_ess_annual_feats: [
            "Todos os benefícios do Essential Mensal incluídos",
            "Desconto de 25%: economize {sym}38 por ano",
            "Apenas {sym}8.32/mês - investimento mínimo, máximo resultado",
            "Pague {sym}99.90 treine 365 dias sem preocupação *(Pagamento simplificado)*",
            "Compromisso inteligente: 12 meses para criar hábitos"
        ],
        p_ess_annual_btn: "COMEÇAR AGORA",

        // 3. Pro Weekly (Passe)
        p_pro_week_title: "Passe PRO Semanal",
        p_pro_week_desc: "Teste o poder do PRO por apenas {sym}7.90",
        p_pro_week_feats: [
            "7 dias de acesso TOTAL ao PRO - sem limitações",
            "Zero compromisso",
            "Conversas ILIMITADAS com o Coach (IA) 24/7",
            "Perfeito para decider se: \"O plano PRO é para mim?\"",
            "Risco zero: apenas {sym}7.90."
        ],
        p_pro_week_btn: "COMEÇAR AGORA",

        // 4. Pro Monthly
        p_pro_month_title: "PRO Mensal",
        p_pro_month_desc: "Resultados reais, rápidos e definitivos",
        p_pro_month_feats: [
            "Conversas ILIMITADAS com o Coach (IA) 24/7",
            "Planos de treino personalizados para seu objetivo",
            "Receitas fit exclusivas (inverno + verão)",
            "Análises avançadas: veja sua evolução em tempo real",
            "Treinos ilimitados + todos os programas prontos",
            "Acesso antecipado: teste novidades antes de todos"
        ],
        p_pro_month_btn: "COMEÇAR AGORA",

        // 5. Pro Annual
        p_pro_annual_title: "PRO Anual",
        p_pro_annual_desc: "Economize {sym}100 - Compromisso com seus resultados",
        p_pro_annual_feats: [
            "Tudo do PRO + desconto de 33% ({sym}100 economizados)",
            "Pague {sym}199- treine 365 dias sem preocupação *(Pagamento simplificado)*",
            "Apenas {sym}16.65/mês - menos que 2 cafés por semana",
            "Garantia estendida: 7 dias para testar sem risco",
            "Foco total: um ano para transformar seu corpo"
        ],
        p_pro_annual_btn: "COMEÇAR AGORA",
        // Suffixes
        per_month: "/mês",
        per_year: "/ano",
        per_week: "/sem",
        equiv: "Equivale a",

        // FAQ
        faq_title: "Perguntas",
        faq_word: "Frequentes",
        faq_q1: "Como funciona a IA do MyFitRout?",
        faq_a1: "Utilizamos o Google Gemini 2.5, uma das IAs mais avançadas do mundo. Ela analisa seu perfil, objetivos e histórico para criar treinos personalizados.",
        faq_q2: "Posso cancelar a qualquer momento?",
        faq_a2: "Sim! Não há fidelidade. Você pode cancelar sua assinatura a qualquer momento pelo próprio app, sem burocracia.",
        faq_q3: "Funciona para iniciantes?",
        faq_a3: "Perfeitamente! O MyFitRout se adapta ao seu nível. Temos exercícios e orientações para iniciantes, intermediários e avançados.",
        faq_q4: "Como funciona o pagamento?",
        faq_a4: "Processamos pagamentos via Revolut (internacional) e Last Link (Brasil). Aceitamos cartão de crédito, débito e Pix.",

        // Disclaimer
        disclaimer_ai: "Nota: Os treinos são gerados por Inteligência Artificial avançada. O Coach é um assistente virtual treinado para alta performance interativa.",

        // Modal
        modal_title: "Quase lá!",
        modal_desc: "Digite seu e-mail para processar sua inscrição e enviar os dados de acesso.",
        modal_btn: "Continuar →",
        modal_security: "Ambiente seguro. Seus dados estão protegidos."
    },
    EN: {
        // Hero
        hero_badge: "Limited & Exclusive Spots",
        hero_title: `Your High Performance <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">AI Coach</span>`,
        hero_subtitle: "Personalized workouts with Artificial Intelligence. Transform your body intelligently, safely, and definitively.",
        cta_primary: "SECURE MY SPOT →",
        cta_secondary: "TRY APP FREE",

        // Section Titles
        features_title: "PREMIUM <span class='text-indigo-400'>FEATURES</span>",
        pricing_title: "CHOOSE YOUR <span class='text-indigo-400'>PLAN</span>",
        pricing_subtitle: "Invest in yourself. Cancel anytime.",
        faq_title: "COMMON <span class='text-indigo-400'>QUESTIONS</span>",

        // 1. Essential Monthly
        p_ess_month_title: "Essential Monthly",
        p_ess_month_desc: "Transform your body with intelligence",
        p_ess_month_feats: [
            "100 AI Coach questions/mo (Personalized)",
            "Complete library: 150+ video exercises",
            "Smart progress & evolution dashboard",
            "Mobile App: train anywhere, anytime"
        ],
        p_ess_month_btn: "START NOW",

        // 2. Essential Annual
        p_ess_annual_title: "Essential Annual",
        p_ess_annual_desc: "Save {sym}38 - Consistency that transforms",
        p_ess_annual_feats: [
            "All Essential Monthly benefits included",
            "25% Discount: save {sym}38 per year",
            "Just {sym}8.32/mo - minimum investment, maximum result",
            "Pay {sym}99.90 train 365 days worry-free *(Simplified payment)*",
            "Smart commitment: 12 months to build habits"
        ],
        p_ess_annual_btn: "START NOW",

        // 3. Pro Weekly
        p_pro_week_title: "PRO Weekly Pass",
        p_pro_week_desc: "Test PRO power for just {sym}7.90",
        p_pro_week_feats: [
            "7 days of FULL PRO access - no limitations",
            "Zero commitment",
            "UNLIMITED AI Coach conversations 24/7",
            "Perfect to decide: \"Is PRO plan for me?\"",
            "Zero risk: just {sym}7.90."
        ],
        p_pro_week_btn: "START NOW",

        // 4. Pro Monthly
        p_pro_month_title: "PRO Monthly",
        p_pro_month_desc: "Real, fast, and definitive results",
        p_pro_month_feats: [
            "UNLIMITED AI Coach conversations 24/7",
            "Personalized workout plans for your goal",
            "Exclusive fit recipes (winter + summer)",
            "Advanced analytics: see your evolution in real-time",
            "Unlimited workouts + all ready-made programs",
            "Early Access: test new features before everyone"
        ],
        p_pro_month_btn: "START NOW",

        // 5. Pro Annual
        p_pro_annual_title: "PRO Annual",
        p_pro_annual_desc: "Save {sym}100 - Commitment to your results",
        p_pro_annual_feats: [
            "Everything in PRO + 33% discount ({sym}100 saved)",
            "Pay {sym}199- train 365 days worry-free *(Simplified payment)*",
            "Just {sym}16.65/mo - less than 2 coffees/week",
            "Extended guarantee: 7 days to test risk-free",
            "Total focus: one year to transform your body"
        ],
        p_pro_annual_btn: "START NOW",

        // Common
        per_month: "/mo",
        per_year: "/yr",
        per_week: "/wk",

        // FAQ
        faq_title: "Common",
        faq_word: "Questions",
        faq_q1: "How does MyFitRout AI work?",
        faq_a1: "We use Google Gemini 2.5, one of the most advanced AIs. It analyzes your profile and goals to create fully personalized workouts.",
        faq_q2: "Can I cancel anytime?",
        faq_a2: "Yes! No strings attached. You can cancel your subscription anytime via the app, hassle-free.",
        faq_q3: "Does it work for beginners?",
        faq_a3: "Absolutely! MyFitRout adapts to your level. We have exercises and guidance for beginners, intermediates, and advanced users.",
        faq_q4: "How does payment work?",
        faq_a4: "We process payments via Revolut (global) and Last Link (Brazil). Secure platforms. We accept credit cards and Apple/Google Pay.",
        disclaimer_ai: "Note: Workouts are generated by advanced Artificial Intelligence. The Coach is a virtual assistant trained for interactive high performance.",
        modal_title: "Almost there!",
        modal_desc: "Enter your email to process your registration and receive access details.",
        modal_btn: "Continue →",
        modal_security: "Secure environment. Your data is protected."
    },
    ES: {
        // Hero
        hero_badge: "Plazas Limitadas y Exclusivas",
        hero_title: `Tu Coach de <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Alto Rendimiento</span>`,
        hero_subtitle: "Entrenamientos personalizados con Inteligencia Artificial. Transforma tu cuerpo de forma inteligente, segura y definitiva.",
        cta_primary: "ASEGURAR MI PLAZA →",
        cta_secondary: "PROBAR APP GRATIS",

        // Section Titles
        features_title: "RECURSOS <span class='text-indigo-400'>PREMIUM</span>",
        pricing_title: "ELIGE TU <span class='text-indigo-400'>PLAN</span>",
        pricing_subtitle: "Invierte en ti. Cancela cuando quieras.",
        faq_title: "PREGUNTAS <span class='text-indigo-400'>FRECUENTES</span>",

        // 1. Essential Mensual
        p_ess_month_title: "Essential Mensual",
        p_ess_month_desc: "Transforma tu cuerpo con inteligencia",
        p_ess_month_feats: [
            "100 preguntas mensuales al Coach (IA) personalizado",
            "Biblioteca completa: 150+ ejercicios en video",
            "Dashboard inteligente de progreso y evolución",
            "App móvil: entrena donde sea, cuando sea"
        ],
        p_ess_month_btn: "EMPEZAR AHORA",

        // 2. Essential Anual
        p_ess_annual_title: "Essential Anual",
        p_ess_annual_desc: "Ahorra {sym}38 - Consistencia que transforma",
        p_ess_annual_feats: [
            "Todos los beneficios de Essential Mensual",
            "Descuento de 25%: ahorra {sym}38 al año",
            "Solo {sym}8.32/mes - inversión mínima",
            "Paga {sym}99.90 entrena 365 días sin preocupaciones",
            "Compromiso inteligente: 12 meses para crear hábitos"
        ],
        p_ess_annual_btn: "SUSCRIBIR AHORA",

        // 3. Pro Semanal
        p_pro_week_title: "Pase PRO Semanal",
        p_pro_week_desc: "Prueba el poder de PRO por solo {sym}7.90",
        p_pro_week_feats: [
            "7 días de acceso TOTAL a PRO - sin límites",
            "Cero compromiso",
            "Conversaciones ILIMITADAS con Coach (IA) 24/7",
            "Perfecto para decidir: '¿El plan PRO es para mí?'",
            "Riesgo cero: solo {sym}7.90"
        ],
        p_pro_week_btn: "EMPEZAR AHORA",

        // 4. Pro Mensual
        p_pro_month_title: "PRO Mensual",
        p_pro_month_desc: "Resultados reales, rápidos y definitivos",
        p_pro_month_feats: [
            "Conversaciones ILIMITADAS con Coach (IA) 24/7",
            "Planes de entrenamiento personalizados",
            "Recetas fit exclusivas (invierno + verano)",
            "Análisis avanzados: evolución en tiempo real",
            "Entrenamientos ilimitados + programas listos",
            "Acceso anticipado: prueba novedades antes"
        ],
        p_pro_month_btn: "EMPEZAR AHORA",

        // 5. Pro Anual
        p_pro_annual_title: "PRO Anual",
        p_pro_annual_desc: "Ahorra {sym}100 - Compromiso con resultados",
        p_pro_annual_feats: [
            "Todo de PRO + descuento de 33% ({sym}100 off)",
            "Paga {sym}199.90 - entrena 365 días sin preocupaciones",
            "Solo {sym}16.65/mes - menos que 2 cafés por semana",
            "Garantía extendida: 7 días para probar sin riesgo",
            "Foco total: un año para transformar tu cuerpo"
        ],
        p_pro_annual_btn: "SUSCRIBIR AHORA",

        // Common
        per_month: "/mes",
        per_year: "/año",
        per_week: "/sem",
    }
};

// ==========================================
// 🌍 GLOBAL PRICING MATRIX
// ==========================================
const GLOBAL_PRICING = {
    BRL: {
        symbol: 'R$',
        lang: 'PT',
        products: {
            essential_monthly: { id: 'price_essential_monthly', amount: '12,90' },
            essential_annual: { id: 'price_essential_annual', amount: '99,90' },
            pro_weekly: { id: 'price_pro_weekly', amount: '7,90' },
            pro_monthly: { id: 'price_pro_monthly', amount: '24,90' },
            pro_annual: { id: 'price_pro_annual', amount: '199,90', equiv: '16,65' }
        }
    },
    USD: {
        symbol: '$',
        lang: 'EN',
        products: {
            essential_monthly: { id: 'price_essential_monthly_usd', amount: '12.90' },
            essential_annual: { id: 'price_essential_annual_usd', amount: '99.90' },
            pro_weekly: { id: 'price_pro_weekly_usd', amount: '7.90' },
            pro_monthly: { id: 'price_pro_monthly_usd', amount: '24.90' },
            pro_annual: { id: 'price_pro_annual_usd', amount: '199.90', equiv: '16.65' }
        }
    },
    EUR: {
        symbol: '€',
        lang: 'EN',
        products: {
            essential_monthly: { id: 'price_essential_monthly_eur', amount: '12.90' },
            essential_annual: { id: 'price_essential_annual_eur', amount: '99.90' },
            pro_weekly: { id: 'price_pro_weekly_eur', amount: '7.90' },
            pro_monthly: { id: 'price_pro_monthly_eur', amount: '24.90' },
            pro_annual: { id: 'price_pro_annual_eur', amount: '199.90', equiv: '16.65' }
        }
    },
    GBP: {
        symbol: '£',
        lang: 'EN',
        products: {
            essential_monthly: { id: 'price_essential_monthly_gbp', amount: '12.90' },
            essential_annual: { id: 'price_essential_annual_gbp', amount: '99.90' },
            pro_weekly: { id: 'price_pro_weekly_gbp', amount: '7.90' },
            pro_monthly: { id: 'price_pro_monthly_gbp', amount: '24.90' },
            pro_annual: { id: 'price_pro_annual_gbp', amount: '199.90', equiv: '16.65' }
        }
    }
};

// ==========================================
// 🕵️ GEO-IP LOGIC
// ==========================================
async function detectAndSetCurrency() {
    const params = new URLSearchParams(window.location.search);
    const debugCurrency = params.get('currency');

    if (debugCurrency && GLOBAL_PRICING[debugCurrency.toUpperCase()]) {
        console.log(`🔧 Debug Override: Forcing ${debugCurrency}`);
        const target = debugCurrency.toUpperCase();
        localStorage.setItem('myfitrout_currency_locked', target);
        // Infer lang for debug
        const lang = (target === 'BRL') ? 'PT' : (target === 'EUR' ? 'EN' : 'EN');
        updateUI(target, lang);
        return;
    }

    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code;
        const currency = data.currency;

        let targetCurrency = 'USD';
        let targetLang = 'EN';

        // Map Currency
        // Map Currency
        if (country === 'BR') targetCurrency = 'BRL';
        else if (currency === 'EUR' || country === 'CH') targetCurrency = 'EUR';
        // else if (currency === 'GBP') targetCurrency = 'GBP'; // Removed to ensure consistency (Charge in USD)
        else targetCurrency = 'USD'; // Default Global (includes GBP, CAD, etc)

        // Map Language
        if (['BR', 'PT', 'AO', 'MZ'].includes(country)) targetLang = 'PT';
        else if (['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'EC', 'UY'].includes(country)) targetLang = 'ES';
        else targetLang = 'EN';

        console.log(`🌍 Detected: ${country} (${currency}) -> Target: ${targetCurrency} / ${targetLang}`);

        const lockedCurrency = localStorage.getItem('myfitrout_currency_locked');
        if (lockedCurrency !== targetCurrency) {
            localStorage.setItem('myfitrout_currency_locked', targetCurrency);
        }

        updateUI(targetCurrency, targetLang);

    } catch (error) {
        console.warn('GeoIP failed, trying browser heuristic:', error);

        // 1. Try LocalStorage
        const locked = localStorage.getItem('myfitrout_currency_locked');
        if (locked) {
            const lang = (locked === 'BRL') ? 'PT' : 'EN';
            updateUI(locked, lang);
            return;
        }

        // 2. Browser Language Fallback
        const navLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();

        if (navLang.includes('pt')) {
            // Probably BR or PT
            // Heuristic: If PT-PT, maybe EUR? Safer to default BRL for language consistency or USD?
            // User requested location logic. PT-BR -> BRL. PT-PT -> EUR/USD.
            // Simplified: PT -> BRL for text match, but timezone/IP matters.
            // Let's stick to: PT -> BRL for now (Risk: Portuguese user paying in Real).
            localStorage.setItem('myfitrout_currency_locked', 'BRL');
            updateUI('BRL', 'PT');
        } else if (navLang.includes('es')) {
            localStorage.setItem('myfitrout_currency_locked', 'USD');
            updateUI('USD', 'ES');
        } else {
            // Default to Global USD
            localStorage.setItem('myfitrout_currency_locked', 'USD');
            updateUI('USD', 'EN');
        }
    }
}

// ==========================================
// 🎨 UI UPDATER
// ==========================================

function updateUI(currencyCode, langCode) {
    const config = GLOBAL_PRICING[currencyCode];
    if (!config) return;

    // Determine Language
    const lang = (langCode && TRANSLATIONS[langCode]) ? langCode : config.lang;
    const t = TRANSLATIONS[lang];
    const sym = config.symbol;
    const p = config.products;

    // Helpers
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el && text) el.innerText = text.replace(/{sym}/g, sym);
    };
    const setHtml = (id, html) => {
        const el = document.getElementById(id);
        if (el && html) el.innerHTML = html.replace(/{sym}/g, sym);
    };

    // List Generator Helper
    const updateList = (id, items) => {
        const ul = document.getElementById(id);
        if (!ul || !items) return;

        // Generate list items HTML
        const html = items.map(item => {
            const cleanItem = item.replace(/{sym}/g, sym);
            return `
            <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 9.293l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-slate-300 text-sm md:text-base">${cleanItem}</span>
            </li>`;
        }).join('');

        ul.innerHTML = html;
    };


    // --- 1. HERO ---
    setText('hero-badge', t.hero_badge);
    setHtml('hero-title', t.hero_title);
    setText('hero-subtitle', t.hero_subtitle);
    setText('hero-cta-primary', t.cta_primary);
    setText('hero-cta-secondary', t.cta_secondary);

    // --- 2. SECTION TITLES ---
    setHtml('features-title', t.features_title);
    setHtml('txt-choose-plan', t.pricing_title);
    setText('txt-subtitle', t.pricing_subtitle);
    setHtml('txt-faq-title', t.faq_title);

    // --- 3. PRICING CARDS ---

    // Essential Monthly
    setText('txt-essential-title', t.p_ess_month_title);
    setText('txt-essential-desc', t.p_ess_month_desc);
    updateList('features-essential', t.p_ess_month_feats);
    setText('btn-essential', t.p_ess_month_btn);

    // Essential Annual
    setText('txt-essential-title-annual', t.p_ess_annual_title);
    setText('txt-essential-desc-annual', t.p_ess_annual_desc);
    updateList('features-essential-annual', t.p_ess_annual_feats);
    setText('btn-essential-annual', t.p_ess_annual_btn);

    // Pro Weekly
    setText('txt-pro-weekly-title', t.p_pro_week_title);
    setText('txt-pro-weekly-desc', t.p_pro_week_desc);
    updateList('features-pro-weekly', t.p_pro_week_feats);
    setText('btn-pro-weekly', t.p_pro_week_btn);

    // Pro Monthly
    setText('txt-pro-title', t.p_pro_month_title);
    setText('txt-pro-desc', t.p_pro_month_desc);
    updateList('features-pro', t.p_pro_month_feats);
    setText('btn-pro-monthly', t.p_pro_month_btn);

    // Pro Annual
    setText('txt-annual-title', t.p_pro_annual_title);
    setText('txt-annual-desc', t.p_pro_annual_desc);
    updateList('features-annual', t.p_pro_annual_feats);
    setText('btn-annual', t.p_pro_annual_btn);


    // --- 4. FAQ ---
    setText('txt-faq-title', t.faq_title);
    setText('txt-faq-word', t.faq_word);
    setText('faq-q1', t.faq_q1); setText('faq-a1', t.faq_a1);
    setText('faq-q2', t.faq_q2); setText('faq-a2', t.faq_a2);
    setText('faq-q3', t.faq_q3); setText('faq-a3', t.faq_a3);
    setText('faq-q4', t.faq_q4); setText('faq-a4', t.faq_a4);

    // Disclaimer
    setText('disclaimer-ai', t.disclaimer_ai);

    // --- 5. PRICES (With i18n suffix) ---
    // Essential Monthly
    setHtml('price-essential-monthly',
        `${sym} ${p.essential_monthly.amount}<span class="text-lg text-slate-400 font-normal">${t.per_month}</span>`
    );
    // Essential Annual
    setHtml('price-essential-annual',
        `${sym} ${p.essential_annual.amount}<span class="text-lg text-slate-400 font-normal">${t.per_year}</span>`
    );
    // Pro Weekly
    setHtml('price-pro-weekly',
        `${sym} ${p.pro_weekly.amount}<span class="text-lg text-slate-400 font-normal">${t.per_week}</span>`
    );
    // Pro Monthly
    setHtml('price-pro-monthly',
        `${sym} ${p.pro_monthly.amount}<span class="text-lg text-slate-300 font-normal">${t.per_month}</span>`
    );
    // Pro Annual
    setHtml('price-pro-annual',
        `${sym} ${p.pro_annual.amount}<span class="text-lg text-slate-400 font-normal">${t.per_year}</span>`
    );
    // Equiv
    setText('price-equiv-pro-annual', `${t.equiv} ${sym} ${p.pro_annual.equiv}${t.per_month}`);

    // Update Badge
    setText('txt-discount-badge', '-33%');

    // Modal Translations
    if (t.modal_title) {
        setText('modal-title', t.modal_title);
        setText('modal-desc', t.modal_desc);
        setText('modal-btn', t.modal_btn);
        setText('modal-security', t.modal_security);
    }

    // Banner
    const banner = document.getElementById('current-currency-display');
    if (banner) banner.innerText = `${currencyCode} | ${langCode}`;
}

// ==========================================
// 💳 CHECKOUT LOGIC
// ==========================================
async function checkout(planType) {
    // Analytics Tracking
    if (window.va) {
        window.va('event', { name: 'Landing Checkout Click', data: { plan: planType } });
    }

    try {
        const currency = localStorage.getItem('myfitrout_currency_locked') || 'BRL';

        // 🇧🇷 LASTLINK (BR)
        if (currency === 'BRL') {
            const checkoutUrl = LASTLINK_CONFIG[planType];
            if (!checkoutUrl) return alert("Erro: Link BR não configurado.");

            const currentSearch = window.location.search;
            let finalUrl = checkoutUrl;
            if (currentSearch) {
                const separator = finalUrl.includes('?') ? '&' : '?';
                finalUrl += separator + currentSearch.substring(1);
            }
            // Direct Checkout (Released)
            window.location.href = finalUrl;
            return;
        }

        // 🌍 REVOLUT (GLOBAL)
        else {
            // MAPPING: PLAN -> { CURRENCY: URL }
            const REVOLUT_MAP = {
                // ESSENTIAL
                essential_monthly: {
                    EUR: "https://checkout.revolut.com/pay/e4aad20a-068b-49e9-adb6-bb48e09da1de",
                    USD: "https://checkout.revolut.com/pay/c08ffc90-35fe-4701-8029-7a947c0ae1bb"
                },
                essential_annual: {
                    EUR: "https://checkout.revolut.com/pay/f5514a23-333a-403d-8899-a0458433d466",
                    USD: "https://checkout.revolut.com/pay/4c7f4d85-413f-455a-a753-7c7be9535103"
                },

                // PRO
                pro_weekly: {
                    EUR: "https://checkout.revolut.com/pay/be2ef2b1-2774-47ed-ac96-316e8f524238",
                    USD: "https://checkout.revolut.com/pay/371c21b0-020e-4bbf-bc5a-4b2e1cd179fc"
                },
                pro_monthly: {
                    EUR: "https://checkout.revolut.com/pay/44bfee78-ac75-4c1b-a3e0-2639be29ef4f",
                    USD: "https://checkout.revolut.com/pay/120ecee5-fb51-4ccf-b8f4-de6ca59df310"
                },
                pro_annual: {
                    EUR: "https://checkout.revolut.com/pay/3c4dd027-3d72-4c3c-bc75-e264d8f9360f",
                    USD: "https://checkout.revolut.com/pay/71190496-e02a-4ebf-bacc-f22bde2e0da1"
                }
            };

            // Detect target currency (Default to USD if not EUR)
            const targetCurr = (currency === 'EUR') ? 'EUR' : 'USD';

            // Get URL
            const planUrls = REVOLUT_MAP[planType];
            let targetUrlReal = planUrls ? planUrls[targetCurr] : "https://checkout.revolut.com/pay/c08ffc90-35fe-4701-8029-7a947c0ae1bb";

            // Support UTMs for Global
            const currentSearch = window.location.search;
            if (currentSearch) {
                const separator = targetUrlReal.includes('?') ? '&' : '?';
                targetUrlReal += separator + currentSearch.substring(1);
            }

            // Direct Checkout (Released)
            window.location.href = targetUrlReal;
        }
    } catch (e) {
        console.error(e);
        // Fallback catastrophe
        window.location.href = "https://checkout.revolut.com/pay/c08ffc90-35fe-4701-8029-7a947c0ae1bb";
    }
}

// ==========================================
// 🎣 LEAD CAPTURE LOGIC
// ==========================================
let pendingCheckoutUrl = '';
let pendingPlanData = {};

function openLeadModal(url, plan, price, currency) {
    pendingCheckoutUrl = url;
    pendingPlanData = { plan, price, currency };

    // Analytics
    if (window.va) window.va('event', { name: 'Open Lead Modal', data: { plan } });

    const modal = document.getElementById('lead-modal');
    const backdrop = document.getElementById('lead-backdrop');
    const content = document.getElementById('lead-content');

    modal.classList.remove('hidden');

    // Tiny delay to allow display:block to apply before opacity transition
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        content.classList.remove('opacity-0', 'scale-95');
        content.classList.add('scale-100');
        document.getElementById('lead-email').focus();
    }, 10);
}

function closeLeadModal() {
    const modal = document.getElementById('lead-modal');
    const backdrop = document.getElementById('lead-backdrop');
    const content = document.getElementById('lead-content');

    backdrop.classList.add('opacity-0');
    content.classList.add('opacity-0', 'scale-95');
    content.classList.remove('scale-100');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

async function submitLead(e) {
    e.preventDefault();
    const emailInput = document.getElementById('lead-email');
    const btn = document.getElementById('modal-btn');

    if (!emailInput.value) return;

    // Loading State
    const originalText = btn.innerText;
    btn.innerText = "Processando...";
    btn.disabled = true;
    btn.classList.add('opacity-75', 'cursor-not-allowed');

    try {
        // Fire and forget (almost) - await fast API
        // Use full URL if needed, but relative /api/capture_lead should work on Vercel
        const response = await fetch('/api/capture_lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: emailInput.value,
                ...pendingPlanData
            })
        });

        if (window.va) window.va('event', { name: 'Lead Captured', data: { email: emailInput.value } });

    } catch (err) {
        console.error('Lead capture issue (ignoring to proceed to payment):', err);
    }

    // Redirect to Payment
    window.location.href = pendingCheckoutUrl;
}

// Init
window.addEventListener('DOMContentLoaded', () => {
    detectAndSetCurrency();
});

// Expose
window.checkout = checkout;
