// MyFitRout - Global Checkout & GeoIP
// Agent 3.0 - Full Page Translation (Hero + Features + FAQ) & Robust Checkout

// Payment Integration: Revolut (Global) + Last Link (Brazil)
// Stripe removed per user request

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
const TRANSLATIONS = {
    PT: {
        // Hero
        hero_badge: "Vagas Limitadas & Exclusivas",
        hero_title: `Seu Coach de <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Alta Performance</span>`,
        hero_subtitle: "Treinos personalizados com Inteligência Artificial. Transforme seu corpo de forma inteligente, segura e definitiva.",
        hero_cta_primary: "Garantir Minha Vaga →",
        hero_cta_secondary: "Testar App Grátis",

        // Pricing Headers
        choose_plan: "Escolha seu",
        plan_word: "Plano",
        subtitle: "Invista em você. Cancele quando quiser.",
        essential_desc: "Para quem está começando",
        pro_desc: "Para resultados sérios",
        annual_title: "PRO Anual",
        annual_desc: "Melhor custo-benefício",
        btn_start: "Começar Agora",
        btn_pro: "Assinar PRO",
        btn_annual: "Assinar Anual",
        per_month: "/mês",
        per_year: "/ano",
        equiv: "Equivale a",

        // Features - Essential
        feat_ess_1: "100 perguntas ao Coach/mês",
        feat_ess_2: "Biblioteca completa de exercícios",
        feat_ess_3: "Acompanhamento de progresso",
        feat_ess_4: "Suporte por email",

        // Features - Pro
        feat_pro_1: "Consultas IA ilimitadas",
        feat_pro_2: "Planos 100% personalizados",
        feat_pro_3: "Livro de Receitas Fit (Inverno & Verão)",
        feat_pro_4: "Análises avançadas de performance",
        feat_pro_5: "Suporte prioritário",
        feat_pro_6: "Acesso antecipado a novidades",

        // Features - Annual
        feat_ann_1: "Tudo do plano PRO",
        feat_ann_2: "2 meses grátis",
        feat_ann_3: "Garantia de 30 dias",
        feat_ann_4: "Pagamento único",

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
        hero_cta_primary: "Secure My Spot →",
        hero_cta_secondary: "Try App Free",

        // Pricing Headers
        choose_plan: "Choose your",
        plan_word: "Plan",
        subtitle: "Invest in yourself. Cancel anytime.",
        essential_desc: "For beginners",
        pro_desc: "For serious results",
        annual_title: "PRO Annual",
        annual_desc: "Best value",
        btn_start: "Start Now",
        btn_pro: "Subscribe PRO",
        btn_annual: "Subscribe Annual",
        per_month: "/mo",
        per_year: "/yr",
        equiv: "Equiv. to",

        // Features - Essential
        feat_ess_1: "100 AI Coach questions/mo",
        feat_ess_2: "Complete exercise library",
        feat_ess_3: "Progress tracking dashboard",
        feat_ess_4: "Email support",

        // Features - Pro
        feat_pro_1: "Unlimited AI Consultations",
        feat_pro_2: "100% Personalized Plans",
        feat_pro_3: "Fit Recipe Book (Winter & Summer)",
        feat_pro_4: "Advanced Performance Analytics",
        feat_pro_5: "Priority Support",
        feat_pro_6: "Early Access to New Features",

        // Features - Annual
        feat_ann_1: "Everything in PRO",
        feat_ann_2: "2 Months Free",
        feat_ann_3: "30-Day Money-Back Guarantee",
        feat_ann_4: "One-time payment",

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

        // Disclaimer
        disclaimer_ai: "Note: Workouts are generated by advanced Artificial Intelligence. The Coach is a virtual assistant trained for interactive high performance.",

        // Modal
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
        hero_cta_primary: "Asegurar Mi Plaza →",
        hero_cta_secondary: "Probar App Gratis",

        // Pricing Headers
        choose_plan: "Elige tu",
        plan_word: "Plan",
        subtitle: "Invierte en ti. Cancela cuando quieras.",
        essential_desc: "Para principiantes",
        pro_desc: "Para resultados serios",
        annual_title: "PRO Anual",
        annual_desc: "Mejor valor",
        btn_start: "Empezar Ahora",
        btn_pro: "Suscribir PRO",
        btn_annual: "Suscribir Anual",
        per_month: "/mes",
        per_year: "/año",
        equiv: "Equivale a",

        // Features - Essential
        feat_ess_1: "100 preguntas al Coach/mes",
        feat_ess_2: "Biblioteca completa de ejercicios",
        feat_ess_3: "Seguimiento de progreso",
        feat_ess_4: "Soporte por email",

        // Features - Pro
        feat_pro_1: "Consultas IA ilimitadas",
        feat_pro_2: "Planes 100% personalizados",
        feat_pro_3: "Libro de Recetas Fit (Invierno y Verano)",
        feat_pro_4: "Análisis avanzado de rendimiento",
        feat_pro_5: "Soporte prioritario",
        feat_pro_6: "Acceso anticipado a novedades",

        // Features - Annual
        feat_ann_1: "Todo del plan PRO",
        feat_ann_2: "2 Meses Gratis",
        feat_ann_3: "Garantía de 30 días",
        feat_ann_4: "Pago único",

        // FAQ
        faq_title: "Preguntas",
        faq_word: "Frecuentes",
        faq_q1: "¿Cómo funciona la IA de MyFitRout?",
        faq_a1: "Usamos Google Gemini 2.5, una de las IAs más avanzadas. Analiza tu perfil y objetivos para crear entrenamientos personalizados.",
        faq_q2: "¿Puedo cancelar cuando quiera?",
        faq_a2: "¡Sí! Sin compromiso. Puedes cancelar tu suscripción en cualquier momento desde la app.",
        faq_q3: "¿Funciona para principiantes?",
        faq_a3: "¡Perfectamente! MyFitRout se adapta a tu nivel. Tenemos ejercicios para principiantes, intermedios y avanzados.",
        faq_q4: "¿Cómo funciona el pago?",
        faq_a4: "Procesamos pagos vía Revolut (global) y Last Link (Brasil). Plataformas seguras. Aceptamos tarjetas de crédito y Apple/Google Pay.",

        // Disclaimer
        disclaimer_ai: "Nota: Los entrenamientos son generados por Inteligencia Artificial avanzada. El Coach es un asistente virtual entrenado para alto rendimiento interactivo.",

        // Modal
        modal_title: "¡Ya casi estás!",
        modal_desc: "Ingresa tu email para procesar tu inscripción y enviar los datos de acceso.",
        modal_btn: "Continuar →",
        modal_security: "Ambiente seguro. Tus datos están protegidos."
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
        if (country === 'BR') targetCurrency = 'BRL';
        else if (currency === 'EUR' || country === 'CH') targetCurrency = 'EUR';
        else if (currency === 'GBP') targetCurrency = 'GBP';
        else if (currency === 'USD' || country === 'US') targetCurrency = 'USD';

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
        console.warn('GeoIP failed, falling back:', error);
        const fallback = localStorage.getItem('myfitrout_currency_locked') || 'BRL';
        updateUI(fallback, (fallback === 'BRL' ? 'PT' : 'EN'));
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
        if (el) el.innerText = text;
    };
    const setHtml = (id, html) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    };

    // --- 1. HERO ---
    setText('hero-badge', t.hero_badge);
    setHtml('hero-title', t.hero_title);
    setText('hero-subtitle', t.hero_subtitle);
    setText('hero-cta-primary', t.hero_cta_primary);
    setText('hero-cta-secondary', t.hero_cta_secondary);

    // --- 2. PRICING HEADERS ---
    setText('txt-choose-plan', t.choose_plan);
    setText('txt-plan-word', t.plan_word);
    setText('txt-subtitle', t.subtitle);
    setText('txt-essential-desc', t.essential_desc);
    setText('txt-pro-desc', t.pro_desc);
    setText('txt-annual-title', t.annual_title);
    setText('txt-annual-desc', t.annual_desc);
    setText('btn-essential', t.btn_start);
    setText('btn-pro', t.btn_pro);
    setText('btn-annual', t.btn_annual);

    // --- 3. FEATURES LIST ---
    setText('feat-ess-1', t.feat_ess_1); setText('feat-ess-2', t.feat_ess_2);
    setText('feat-ess-3', t.feat_ess_3); setText('feat-ess-4', t.feat_ess_4);

    setText('feat-pro-1', t.feat_pro_1); setText('feat-pro-2', t.feat_pro_2);
    setText('feat-pro-3', t.feat_pro_3); setText('feat-pro-4', t.feat_pro_4);
    setText('feat-pro-5', t.feat_pro_5); setText('feat-pro-6', t.feat_pro_6);

    setText('feat-ann-1', t.feat_ann_1); setText('feat-ann-2', t.feat_ann_2);
    setText('feat-ann-3', t.feat_ann_3); setText('feat-ann-4', t.feat_ann_4);


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
    setHtml('price-essential-monthly',
        `${sym} ${p.essential_monthly.amount}<span class="text-lg text-slate-400 font-normal">${t.per_month}</span>`
    );
    setHtml('price-pro-monthly',
        `${sym} ${p.pro_monthly.amount}<span class="text-lg text-slate-300 font-normal">${t.per_month}</span>`
    );
    setHtml('price-pro-annual',
        `${sym} ${p.pro_annual.amount}<span class="text-lg text-slate-400 font-normal">${t.per_year}</span>`
    );
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
            if (currentSearch) {
                const separator = finalUrl.includes('?') ? '&' : '?';
                finalUrl += separator + currentSearch.substring(1);
            }
            openLeadModal(finalUrl, planType, 'Checking', 'BRL');
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
            const targetUrlReal = planUrls ? planUrls[targetCurr] : "https://checkout.revolut.com/pay/c08ffc90-35fe-4701-8029-7a947c0ae1bb";

            openLeadModal(targetUrlReal, planType, 'Checking', targetCurr);
            return;

            const finalUrl = planUrls[targetCurr];
            console.log(`🔗 Redirecting to Revolut [${targetCurr}]: ${finalUrl}`);
            window.location.href = finalUrl;
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
