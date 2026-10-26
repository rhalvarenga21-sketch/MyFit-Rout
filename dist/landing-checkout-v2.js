// MyFitRout - Global Checkout & GeoIP (V2 - UltraThink Fix)
// Agent 4.0 - 100% Full Page Localization

// Stripe initialization removed per user request
const stripe = null;

// ==========================================
// 🔗 LAST LINK CONFIGURATION
// ==========================================
// Default BRL Links
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
        // 0. Nav & Footer
        nav_features: "Recursos",
        nav_pricing: "Planos",
        nav_faq: "FAQ",
        nav_login: "Entrar",
        footer_prod: "Produto",
        footer_support: "Suporte",
        footer_social: "Social",
        footer_contact: "Contato",
        footer_terms: "Termos de Uso",
        footer_app: "App",

        // 1. Hero
        hero_badge: "VAGAS LIMITADAS",
        hero_title: `Seu Coach Pessoal de <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Alta Performance</span>`,
        hero_subtitle: "Chega de treinos genéricos. O MyFitRout cria sua rotina ideal com IA avançada, adaptando cada série ao seu progresso real. Resultados rápidos, seguros e definitivos.",
        hero_cta_primary: "COMEÇAR AGORA",
        hero_cta_secondary: "TESTAR A DEMO",
        hero_trial: "Teste Grátis por 48 horas",
        social_active: "Junte-se à nossa comunidade",
        social_reviews: "Já somos mais de 200 membros ativos",

        // 2. Features (Why)
        why_title: "Por que MyFitRout?",
        why_subtitle: "Tecnologia de ponta para resultados reais",
        feat_t_1: "IA de Elite",
        feat_d_1: "Seu corpo não é um teste. Receba ajustes inteligentes em tempo real com tecnologia avançada de IA. Mais precisão, menos estagnação, resultados consistentes.",
        feat_t_2: "Hiper-Personalização",
        feat_d_2: "Não existe treino padrão. Criamos rotinas ajustadas ao seu corpo, objetivos e nível. Queime gordura ou ganhe músculos sem tentativa e erro.",
        feat_t_3: "Execução Perfeita",
        feat_d_3: "Técnica antes de carga. Mais de 150 vídeos em HD para você dominar cada movimento, evitar lesões e extrair o máximo de cada repetição.",
        feat_t_4: "Progresso Visível",
        feat_d_4: "O que é medido, evolui. Acompanhe cargas, treinos e evolução em um dashboard claro e motivador. Veja seu progresso e mantenha a consistência.",
        feat_t_5: "Suporte Contínuo",
        feat_d_5: "Você nunca treina sozinho. Dúvidas sobre treino, recuperação ou dores? Seu Coach está disponível 24h para ajustar sua rota quando necessário.",
        feat_t_6: "Multiplataforma",
        feat_d_6: "Treine onde estiver. Acesse de qualquer dispositivo. Seus dados ficam sincronizados automaticamente para uma experiência contínua.",

        // 3. Pricing Headers
        choose_plan: "Escolha seu",
        plan_word: "Plano",
        subtitle: "Invista em você. Cancele quando quiser.",

        // 4. Products Titles & Descs
        week_passed_title: "Passe PRO Semanal",
        week_passed_desc: "Teste o poder do PRO por apenas €7.90",
        essential_title: "Essential",
        essential_desc: "Transforme seu corpo com inteligência",
        essential_ann_title: "Essential Anual",
        essential_ann_desc: "Economize €38 - Consistência que transforma",
        pro_title: "PRO",
        pro_desc: "Resultados reais, rápidos e definitivos",
        annual_title: "PRO Anual",
        annual_desc: "Economize €100 - Compromisso com seus resultados",

        // 5. Buttons
        btn_start: "COMEÇAR AGORA",
        btn_pro: "COMEÇAR AGORA",
        btn_annual: "COMEÇAR AGORA",

        // 6. Suffixes
        per_week: "/semana",
        per_month: "/mês",
        per_year: "/ano",
        equiv: "Equivale a",

        // 7. Features List
        feat_week_1: "7 dias de acesso TOTAL ao PRO - sem limitações",
        feat_week_2: "Zero compromisso",
        feat_week_3: "Conversas ILIMITADAS com o Coach (IA) 24/7",
        feat_week_4: "Perfeito para decidir se: 'O plano PRO é para mim?'",
        feat_week_5: "Risco zero: apenas €7.90",

        // Essential
        feat_ess_1: "100 perguntas mensais com Coach (IA) personalizado",
        feat_ess_2: "Biblioteca completa: 150+ exercícios em vídeo",
        feat_ess_3: "Dashboard inteligente de progresso e evolução",
        feat_ess_4: "App mobile: treine em qualquer lugar, qualquer hora",

        // Pro
        feat_pro_1: "Conversas ILIMITADAS com o Coach (IA) 24/7",
        feat_pro_2: "Planos de treino personalizados para seu objetivo",
        feat_pro_3: "Receitas fit exclusivas (inverno + verão)",
        feat_pro_4: "Análises avançadas: veja sua evolução em tempo real",
        feat_pro_5: "Treinos ilimitados + todos os programas prontos",
        feat_pro_6: "Acesso antecipado: teste novidades antes de todos",

        // Annual Extras
        feat_ann_1: "Tudo do PRO + desconto de 33% (R$ 100 economizados)",
        feat_ann_2: "Pague R$ 199 - treine 365 dias sem preocupação (Pagamento simplificado)",
        feat_ann_3: "Apenas R$ 16.65/mês (Vale a economia)",
        feat_ann_4: "Garantia estendida: 7 dias para testar sem risco",
        feat_ann_5: "Foco total: um ano para transformar seu corpo",

        // Essential Annual
        feat_ess_ann_1: "Todos os benefícios do Essential Mensal incluídos",
        feat_ess_ann_2: "Desconto de 25%: economize R$ 38 por ano",
        feat_ess_ann_3: "Apenas R$ 8.32/mês - investimento mínimo, máximo resultado",
        feat_ess_ann_4: "Pague R$ 99.90 - treine 365 dias sem preocupação (Pagamento simplificado)",
        feat_ess_ann_5: "Compromisso inteligente: 12 meses para criar hábitos",

        // 8. Policy & Footer
        txt_secure_title: "💳 Pagamento seguro via RevolutPay • 🔒 Dados Criptografados",
        txt_cancel_title: "Política de Cancelamento Justa:",
        txt_refund_policy: "Reembolso integral (100%) em até 7 dias.",
        txt_annual_policy: "Para planos anuais, após 7 dias, aplica-se multa de 20% sobre o valor restante.",
        disclaimer_ai: "Nota: Treinos gerados por tecnologia avançada. O Coach é um assistente virtual treinado para alta performance interativa.",

        faq_title: "Perguntas",
        faq_word: "Frequentes",
        faq_q1: "Como funciona a IA do MyFitRout?",
        faq_a1: "Utilizamos o Google Gemini 2.5, uma das IAs mais avançadas do mundo. Ela analisa seu perfil, objetivos e histórico para criar treinos personalizados e responder dúvidas técnicas em tempo real.",
        faq_q2: "Posso cancelar a qualquer momento?",
        faq_a2: "Sim! Não há fidelidade. Você pode cancelar sua assinatura a qualquer momento pelo próprio app, sem burocracia.",
        faq_q3: "Funciona para iniciantes?",
        faq_a3: "Perfeitamente! O MyFitRout se adapta ao seu nível. Temos exercícios e orientações para iniciantes, intermediários e avançados.",
        faq_q_equip: "Preciso de equipamentos?",
        faq_a_equip: "Temos treinos para academia e para casa. Você escolhe o que funciona melhor para você. Nosso catálogo inclui exercícios com e sem equipamentos.",
        faq_q4: "Como funciona o pagamento?",
        faq_a4: "Processamos pagamentos via (Revolut e Lastlink). Aceitamos cartão de crédito e débito. Seus dados são 100% protegidos.",

        txt_final_cta_title: `Pronto para <span class="text-indigo-400">Transformar</span><br />seu Corpo?`,
        txt_final_cta_desc: "Junte-se a mais de 1.200 membros que já estão alcançando seus objetivos com MyFitRout.",
        btn_final_cta: "Começar Agora",
        txt_footer_slogan: "Seu coach de alta performance.",
        txt_copyright: "© 2026 MyFitRout. Todos os direitos reservados."
    },
    EN: {
        // 0. Nav & Footer
        nav_features: "Features",
        nav_pricing: "Pricing",
        nav_faq: "FAQ",
        nav_login: "Login",
        footer_prod: "Product",
        footer_support: "Support",
        footer_social: "Social",
        footer_contact: "Contact",
        footer_terms: "Terms of Use",
        footer_app: "App",

        // 1. Hero
        hero_badge: "LIMITED ACCESS",
        hero_title: `Your High-Performance <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Personal Coach</span>`,
        hero_subtitle: "No more generic workouts. MyFitRout designs your ideal routine with advanced AI, adapting every set to your real progress. Fast, safe, and definitive results.",
        hero_cta_primary: "START NOW",
        hero_cta_secondary: "TRY THE DEMO",
        hero_trial: "Free trial for 48 hours",
        social_active: "Join our community",
        social_reviews: "We are already 200+ active members",

        // 2. Features
        why_title: "Why MyFitRout?",
        why_subtitle: "Cutting-edge technology for real results",
        feat_t_1: "Elite AI",
        feat_d_1: "Your body is not a test. Get precise real-time adjustments with Google Gemini 2.5 intelligence. Goodbye, stagnation.",
        feat_t_2: "Hyper-Personalization",
        feat_d_2: "There is no 'standard workout'. We create the exact routine for your biology and goals. Burn fat or build muscle without trial and error.",
        feat_t_3: "Perfect Execution",
        feat_d_3: "150+ HD videos. Master professional athlete techniques, avoid injury, and get the most out of every rep.",
        feat_t_4: "Visible Progress",
        feat_d_4: "Full dashboard tracking every lb lifted. See your daily evolution and get addicted to beating your best self.",
        feat_t_5: "Endless Support",
        feat_d_5: "Questions about diet or shoulder pain? Your Coach is ready 24/7 to adjust your route. You will never train alone again.",
        feat_t_6: "Total Freedom",
        feat_d_6: "Carry your Coach in your pocket. Works on any device. Your data syncs to the cloud so you just focus on training.",

        // 3. Pricing Headers
        choose_plan: "Choose Your",
        plan_word: "Plan",
        subtitle: "Invest in yourself. Cancel anytime.",

        // 4. Products
        week_passed_title: "Weekly PRO Pass",
        week_passed_desc: "Test PRO's power for just €7.90",
        essential_title: "Essential",
        essential_desc: "Transform your body with intelligence",
        essential_ann_title: "Essential Annual",
        essential_ann_desc: "Save €38 - Consistency that transforms",
        pro_title: "PRO",
        pro_desc: "Real, fast, and definitive results",
        annual_title: "PRO Annual",
        annual_desc: "Save €100 - Commitment to your results",

        // 5. Buttons
        btn_start: "START NOW",
        btn_pro: "START NOW",
        btn_annual: "START NOW",

        // 6. Suffixes
        per_week: "/week",
        per_month: "/month",
        per_year: "/year",
        equiv: "Equivalent to",

        // 7. Features List
        feat_week_1: "7 days of FULL PRO access - no limitations",
        feat_week_2: "Zero commitment",
        feat_week_3: "UNLIMITED conversations with AI Coach 24/7",
        feat_week_4: "Perfect to decide if: 'Is the PRO plan for me?'",
        feat_week_5: "Zero risk: just €7.90",

        // Essential
        feat_ess_1: "100 monthly questions with personalized AI Coach",
        feat_ess_2: "Complete library: 150+ video exercises",
        feat_ess_3: "Smart progress and evolution dashboard",
        feat_ess_4: "Mobile app: train anywhere, anytime",

        // Pro
        feat_pro_1: "UNLIMITED conversations with AI Coach 24/7",
        feat_pro_2: "Personalized workout plans for your goal",
        feat_pro_3: "Exclusive fit recipes (winter + summer)",
        feat_pro_4: "Advanced analytics: see your evolution in real-time",
        feat_pro_5: "Unlimited workouts + all ready-made programs",
        feat_pro_6: "Early access: test new features before everyone",

        // Annual Extras
        feat_ann_1: "Everything in PRO + 33% discount (€100 saved)",
        feat_ann_2: "Pay €199 - train 365 days worry-free",
        feat_ann_3: "Just €16.65/month (Worth the savings)",
        feat_ann_4: "Extended guarantee: 7 days to test risk-free",
        feat_ann_5: "Total focus: one year to transform your body",

        // Essential Annual
        feat_ess_ann_1: "All Essential Monthly benefits included",
        feat_ess_ann_2: "25% discount: save €38 per year",
        feat_ess_ann_3: "Just €8.32/month - minimum investment, maximum results",
        feat_ess_ann_4: "Pay €99.90 - train 365 days worry-free",
        feat_ess_ann_5: "Smart commitment: 12 months to build habits",

        // 8. Policy & Footer
        txt_secure_title: "💳 Secure payment via RevolutPay • 🔒 Encrypted data",
        txt_cancel_title: "Fair Cancellation Policy:",
        txt_refund_policy: "Full refund (100%) within 7 days.",
        txt_annual_policy: "For annual plans, after 7 days, a 20% fee applies to the remaining value.",
        disclaimer_ai: "Note: Workouts generated by advanced technology. The Coach is a virtual assistant trained for high performance.",

        faq_title: "Frequently Asked",
        faq_word: "Questions",
        faq_q1: "How does the technology work?",
        faq_a1: "We use Google Gemini 2.5. It analyzes your profile and goals to create fully personalized workouts.",
        faq_q2: "Can I cancel anytime?",
        faq_a2: "Yes! No strings attached. You can cancel your subscription anytime via the app.",
        faq_q3: "Does it work for beginners?",
        faq_a3: "Absolutely! MyFitRout adapts to your level.",
        faq_q_equip: "Do I need equipment?",
        faq_a_equip: "We have workouts for gym and home, with or without equipment.",
        faq_q4: "How does payment work?",
        faq_a4: "We process payments via Revolut (global) and Last Link (Brazil). Secure platforms with encrypted data.",

        txt_final_cta_title: `Ready to <span class="text-indigo-400">Transform</span><br />your Body?`,
        txt_final_cta_desc: "Join over 1,200 active members.",
        btn_final_cta: "Start Now",
        txt_footer_slogan: "Your high-performance coach.",
        txt_copyright: "© 2026 MyFitRout. All rights reserved."
    },
    ES: {
        // 0. Nav & Footer
        nav_features: "Funciones",
        nav_pricing: "Planes",
        nav_faq: "FAQ",
        nav_login: "Entrar",
        footer_prod: "Producto",
        footer_support: "Soporte",
        footer_social: "Social",
        footer_contact: "Contacto",
        footer_terms: "Términos de Uso",
        footer_app: "App",

        // 1. Hero
        hero_badge: "ACCESO LIMITADO",
        hero_title: `Tu Coach Personal de <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Alto Rendimiento</span>`,
        hero_subtitle: "Basta de entrenamientos genéricos. MyFitRout crea tu rutina ideal con IA avanzada, adaptando cada série a tu progreso real. Resultados rápidos, seguros y definitivos.",
        hero_cta_primary: "EMPEZAR AHORA",
        hero_cta_secondary: "PROBAR DEMO",
        hero_trial: "Prueba gratis por 48 horas",
        social_active: "Únete a nuestra comunidad",
        social_reviews: "Ya somos más de 200 miembros activos",

        // 2. Features
        why_title: "¿Por qué MyFitRout?",
        why_subtitle: "Tecnología de punta para resultados reales",
        feat_t_1: "IA de Élite",
        feat_d_1: "Tu cuerpo no es una prueba. Recibe ajustes precisos en tiempo real con la inteligencia de Google Gemini 2.5. Adiós al estancamiento.",
        feat_t_2: "Hiper-Personalización",
        feat_d_2: "No existe el 'entrenamiento estándar'. Creamos la rutina exacta para tu biología y objetivos. Quema grasa o gana músculo sin ensayo y error.",
        feat_t_3: "Ejecución Perfecta",
        feat_d_3: "150+ videos en HD. Domina la técnica de atletas profesionales, evita lesiones y exprime al máximo cada repetición.",
        feat_t_4: "Progreso Visible",
        feat_d_4: "Panel completo que monitorea cada kg levantado. Ve tu evolución diaria y vuélvete adicto a superarte a ti mismo.",
        feat_t_5: "Soporte Sin Fin",
        feat_d_5: "¿Dudas sobre dieta o dolor de hombro? Tu Coach está listo 24/7 para ajustar tu ruta. Nunca más entrenarás solo.",
        feat_t_6: "Libertad Total",
        feat_d_6: "Lleva tu Coach en el bolsillo. Funciona en cualquier dispositivo. Tus datos se sincronizan en la nube para que solo te enfoques en entrenar.",

        // 3. Pricing Headers
        choose_plan: "Elige tu",
        plan_word: "Plan",
        subtitle: "Invierte en ti. Cancela cuando quieras.",

        // 4. Products
        week_passed_title: "Pase PRO Semanal",
        week_passed_desc: "Prueba el poder del PRO por solo €7.90",
        essential_title: "Essential",
        essential_desc: "Transforma tu cuerpo con inteligencia",
        essential_ann_title: "Essential Anual",
        essential_ann_desc: "Ahorra €38 - Consistencia que transforma",
        pro_title: "PRO",
        pro_desc: "Resultados reales, rápidos y definitivos",
        annual_title: "PRO Anual",
        annual_desc: "Ahorra €100 - Compromiso con tus resultados",

        // 5. Buttons
        btn_start: "EMPEZAR AHORA",
        btn_pro: "EMPEZAR AHORA",
        btn_annual: "EMPEZAR AHORA",

        // 6. Suffixes
        per_week: "/semana",
        per_month: "/mes",
        per_year: "/año",
        equiv: "Equivale a",

        // 7. Features List
        feat_week_1: "7 días de acceso TOTAL al PRO - sin limitaciones",
        feat_week_2: "Cero compromiso",
        feat_week_3: "Conversaciones ILIMITADAS con el Coach (IA) 24/7",
        feat_week_4: "Perfecto para decidir si: '¿El plan PRO es para mí?'",
        feat_week_5: "Riesgo cero: solo €7.90",

        // Essential
        feat_ess_1: "100 preguntas mensuales con Coach (IA) personalizado",
        feat_ess_2: "Biblioteca completa: 150+ ejercicios en video",
        feat_ess_3: "Panel inteligente de progreso y evolución",
        feat_ess_4: "App móvil: entrena donde sea, cuando sea",

        // Pro
        feat_pro_1: "Conversaciones ILIMITADAS con el Coach (IA) 24/7",
        feat_pro_2: "Planes de entrenamiento personalizados para tu objetivo",
        feat_pro_3: "Recetas fit exclusivas (invierno + verano)",
        feat_pro_4: "Análisis avanzados: ve tu evolución en tiempo real",
        feat_pro_5: "Entrenamientos ilimitados + todos los programas listos",
        feat_pro_6: "Acceso anticipado: prueba novedades antes que todos",

        // Annual Extras
        feat_ann_1: "Todo del PRO + 33% de descuento (€100 ahorrados)",
        feat_ann_2: "Paga €199 - entrena 365 días sin preocupación",
        feat_ann_3: "Solo €16.65/mes (Vale el ahorro)",
        feat_ann_4: "Garantía extendida: 7 días para probar sin riesgo",
        feat_ann_5: "Enfoque total: un año para transformar tu cuerpo",

        // Essential Annual
        feat_ess_ann_1: "Todos los beneficios del Essential Mensual incluidos",
        feat_ess_ann_2: "25% de descuento: ahorra €38 por año",
        feat_ess_ann_3: "Solo €8.32/mes - inversión mínima, máximo resultado",
        feat_ess_ann_4: "Paga €99.90 - entrena 365 días sin preocupación",
        feat_ess_ann_5: "Compromiso inteligente: 12 meses para crear hábitos",

        // 8. Policy & Footer
        txt_secure_title: "💳 Pago seguro vía RevolutPay • 🔒 Datos encriptados",
        txt_cancel_title: "Política de Cancelación Justa:",
        txt_refund_policy: "Reembolso integral (100%) en hasta 7 días.",
        txt_annual_policy: "Para planes anuales, después de 7 días, multa del 20% sobre el valor restante.",
        disclaimer_ai: "Nota: Entrenamientos generados por tecnología avanzada. El Coach es un asistente virtual entrenado para alto rendimiento.",

        faq_title: "Preguntas",
        faq_word: "Frequentes",
        faq_q1: "Como funciona a tecnologia?",
        faq_a1: "Utilizamos o Google Gemini 2.5. Ela analisa seu perfil e objetivos para criar treinos personalizados.",
        faq_q2: "Posso cancelar?",
        faq_a2: "Sim! Sem fidelidade. Cancele quando quiser pelo app.",
        faq_q3: "Serve para iniciantes?",
        faq_a3: "Perfeitamente! Adaptamos tudo ao seu nível.",
        faq_q_equip: "Preciso de equipamentos?",
        faq_a_equip: "Temos treinos para casa e academia, com ou sem equipamentos.",
        faq_q4: "Como funciona o pagamento?",
        faq_a4: "Via Revolut (global) y Last Link (Brasil). Aceptamos tarjetas de crédito y Apple/Google Pay.",

        txt_final_cta_title: `Listo para <span class="text-indigo-400">Transformar</span><br />tu Cuerpo?`,
        txt_final_cta_desc: "Únete a más de 1.200 miembros activos.",
        btn_final_cta: "Empezar Ahora",
        txt_footer_slogan: "Tu coach de alto rendimiento.",
        txt_copyright: "© 2026 MyFitRout. Todos los derechos reservados."
    }
};

// ==========================================
// 🌍 GLOBAL PRICING CONFIG
// ==========================================
const GLOBAL_PRICING = {
    BRL: {
        symbol: 'R$',
        lang: 'PT',
        products: {
            essential_monthly: { link: LASTLINK_CONFIG.essential_monthly, amount: '12,90' },
            essential_annual: { link: LASTLINK_CONFIG.essential_annual, amount: '99,90', equiv: '8,32' },
            pro_weekly: { link: LASTLINK_CONFIG.pro_weekly, amount: '7,90' },
            pro_monthly: { link: LASTLINK_CONFIG.pro_monthly, amount: '24,90' },
            pro_annual: { link: LASTLINK_CONFIG.pro_annual, amount: '199,90', equiv: '16,65' }
        }
    },
    USD: {
        symbol: '$',
        lang: 'EN',
        products: {
            essential_monthly: { link: "https://checkout.revolut.com/pay/c08ffc90-35fe-4701-8029-7a947c0ae1bb", amount: '12.90' },
            essential_annual: { link: "https://checkout.revolut.com/pay/4c7f4d85-413f-455a-a753-7c7be9535103", amount: '99.90' },
            pro_weekly: { link: "https://checkout.revolut.com/pay/371c21b0-020e-4bbf-bc5a-4b2e1cd179fc", amount: '7.90' },
            pro_monthly: { link: "https://checkout.revolut.com/pay/120ecee5-fb51-4ccf-b8f4-de6ca59df310", amount: '24.90' },
            pro_annual: { link: "https://checkout.revolut.com/pay/71190496-e02a-4ebf-bacc-f22bde2e0da1", amount: '199.90', equiv: '16.65' }
        }
    },
    EUR: {
        symbol: '€',
        lang: 'EN',
        products: {
            essential_monthly: { link: "https://checkout.revolut.com/pay/e4aad20a-068b-49e9-adb6-bb48e09da1de", amount: '12.90' },
            essential_annual: { link: "https://checkout.revolut.com/pay/f5514a23-333a-403d-8899-a0458433d466", amount: '99.90' },
            pro_weekly: { link: "https://checkout.revolut.com/pay/be2ef2b1-2774-47ed-ac96-316e8f524238", amount: '7.90' },
            pro_monthly: { link: "https://checkout.revolut.com/pay/44bfee78-ac75-4c1b-a3e0-2639be29ef4f", amount: '24.90' },
            pro_annual: { link: "https://checkout.revolut.com/pay/3c4dd027-3d72-4c3c-bc75-e264d8f9360f", amount: '199.90', equiv: '16.65' }
        }
    },
    GBP: {
        symbol: '£',
        lang: 'EN',
        products: {
            // Using USD Links as Global Fallback for GBP
            essential_monthly: { link: "https://checkout.revolut.com/pay/c08ffc90-35fe-4701-8029-7a947c0ae1bb", amount: '12.90' },
            essential_annual: { link: "https://checkout.revolut.com/pay/4c7f4d85-413f-455a-a753-7c7be9535103", amount: '99.90' },
            pro_weekly: { link: "https://checkout.revolut.com/pay/371c21b0-020e-4bbf-bc5a-4b2e1cd179fc", amount: '7.90' },
            pro_monthly: { link: "https://checkout.revolut.com/pay/120ecee5-fb51-4ccf-b8f4-de6ca59df310", amount: '24.90' },
            pro_annual: { link: "https://checkout.revolut.com/pay/71190496-e02a-4ebf-bacc-f22bde2e0da1", amount: '199.90', equiv: '16.65' }
        }
    }
};

// ==========================================
// 🕵️ GEO-IP LOGIC
// ==========================================
async function detectAndSetCurrency() {
    const params = new URLSearchParams(window.location.search);
    const debugCurrency = params.get('currency');

    // 0. Manual Debug Override (Strongest)
    if (debugCurrency && GLOBAL_PRICING[debugCurrency.toUpperCase()]) {
        console.log(`🔧 Debug Override: Forcing ${debugCurrency}`);
        const target = debugCurrency.toUpperCase();
        // Update lock so it persists even after removing param
        localStorage.setItem('myfitrout_currency_locked', target);
        const lang = (target === 'BRL') ? 'PT' : 'EN';
        updateUI(target, lang);
        return;
    }

    // 1. Check for Existing Lock (Sticky Anti-VPN)
    const lockedCurrency = localStorage.getItem('myfitrout_currency_locked');
    if (lockedCurrency && GLOBAL_PRICING[lockedCurrency]) {
        console.log(`🔒 Currency Locked (Anti-VPN): ${lockedCurrency}`);

        // Recover or infer language
        let lang = localStorage.getItem('myfitrout_lang_locked');
        if (!lang) {
            lang = (lockedCurrency === 'BRL') ? 'PT' : 'EN';
        }

        updateUI(lockedCurrency, lang);
        return;
    }

    // 2. No Lock? Fetch from GeoIP
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

        // Set Locks
        localStorage.setItem('myfitrout_currency_locked', targetCurrency);
        localStorage.setItem('myfitrout_lang_locked', targetLang);

        updateUI(targetCurrency, targetLang);

    } catch (error) {
        console.warn('GeoIP failed, falling back:', error);
        // Default Fallback
        const fallback = 'BRL';
        updateUI(fallback, 'PT');
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

    if (!t) {
        console.error("Missing translation for lang:", lang);
        return;
    }

    // Helpers
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) {
            if (text === undefined || text === null) console.warn("Missing text for ID:", id);
            el.innerText = text || "";
        }
    };
    const setHtml = (id, html) => {
        const el = document.getElementById(id);
        if (el) {
            if (html === undefined || html === null) console.warn("Missing HTML for ID:", id);
            el.innerHTML = html || "";
        }
    };

    // --- 0. NAV ---
    setText('nav-features', t.nav_features);
    setText('nav-pricing', t.nav_pricing);
    setText('nav-faq', t.nav_faq);
    setText('nav-login', t.nav_login);

    // --- 1. HERO ---
    setText('hero-badge', t.hero_badge);
    setHtml('hero-title', t.hero_title);
    setText('hero-subtitle', t.hero_subtitle);
    setText('hero-cta-primary', t.hero_cta_primary);
    setText('hero-cta-secondary', t.hero_cta_secondary);
    setText('hero-trial-text', t.hero_trial);
    setText('social-active', t.social_active);
    setText('social-reviews', t.social_reviews);

    // --- 2. FEATURES (WHY) ---
    setText('why-title', t.why_title);
    setText('why-subtitle', t.why_subtitle);
    setText('feat-t-1', t.feat_t_1); setText('feat-d-1', t.feat_d_1);
    setText('feat-t-2', t.feat_t_2); setText('feat-d-2', t.feat_d_2);
    setText('feat-t-3', t.feat_t_3); setText('feat-d-3', t.feat_d_3);
    setText('feat-t-4', t.feat_t_4); setText('feat-d-4', t.feat_d_4);
    setText('feat-t-5', t.feat_t_5); setText('feat-d-5', t.feat_d_5);
    setText('feat-t-6', t.feat_t_6); setText('feat-d-6', t.feat_d_6);

    // --- 3. PRICING HEADERS ---
    setText('txt-choose-plan', t.choose_plan);
    setText('txt-plan-word', t.plan_word);
    setText('txt-subtitle', t.subtitle);

    // --- 4. PLANS ---

    // Weekly
    setText('week_passed_title', t.week_passed_title);
    setText('week_passed_desc', t.week_passed_desc);
    setText('price-pro-weekly', `${sym}${p.pro_weekly.amount}`);
    setText('per-week-w', t.per_week);
    setText('btn-week', t.btn_start);
    setText('feat_week_1', t.feat_week_1);
    setText('feat_week_2', t.feat_week_2); // New
    setText('feat_week_3', t.feat_week_3); // New
    setText('feat_week_4', t.feat_week_4); // New
    setText('feat_week_5', t.feat_week_5); // New

    // Essential (Monthly)
    setText('txt-essential-title', t.essential_title);
    setText('txt-essential-desc', t.essential_desc);
    setText('price-essential-monthly', `${sym}${p.essential_monthly.amount}`);
    setText('per-month-e', t.per_month);
    setText('btn-essential', t.btn_start);
    setText('feat-ess-1', t.feat_ess_1);
    setText('feat-ess-2', t.feat_ess_2);
    setText('feat-ess-3', t.feat_ess_3);
    setText('feat-ess-4', t.feat_ess_4); // New
    setText('feat-ess-5', t.feat_ess_5); // New

    // Annual (Essential Annual)
    if (document.getElementById('essential_ann_title')) {
        setText('essential_ann_title', t.essential_ann_title);
        setText('essential_ann_desc', t.essential_ann_desc);
        setText('price-essential-annual', `${sym}${p.essential_annual.amount}`);
        setText('feat-ess-ann-1', t.feat_ess_ann_1);
        setText('feat-ess-ann-2', t.feat_ess_ann_2);
        setText('feat-ess-ann-3', t.feat_ess_ann_3);
        setText('feat-ess-ann-4', t.feat_ess_ann_4);
        setText('feat-ess-ann-5', t.feat_ess_ann_5); // New
        setText('btn-essential-ann', t.btn_start);
    }

    // PRO Center
    setText('txt-pro-title', t.pro_title);
    setText('txt-pro-desc', t.pro_desc);
    setText('price-pro-monthly', `${sym}${p.pro_monthly.amount}`);
    setText('per-month-p', t.per_month);
    setText('btn-pro', t.btn_pro);
    setText('feat-pro-1', t.feat_pro_1);
    setText('feat-pro-2', t.feat_pro_2);
    setText('feat-pro-3', t.feat_pro_3);
    setText('feat-pro-4', t.feat_pro_4);
    setText('feat-pro-5', t.feat_pro_5);
    setText('feat-pro-6', t.feat_pro_6);

    // Annual PRO
    setText('txt-annual-title', t.annual_title);
    setText('txt-annual-desc', t.annual_desc);
    setText('price-pro-annual', `${sym}${p.pro_annual.amount}`);
    setText('per-year-a', t.per_year);
    if (p.pro_annual.equiv) {
        setText('equiv-text', t.equiv);
        setText('price-equiv', `${sym}${p.pro_annual.equiv}`);
    }
    setText('btn-annual', t.btn_annual);
    setText('feat-ann-1', t.feat_ann_1);
    setText('feat-ann-2', t.feat_ann_2);
    setText('feat-ann-3', t.feat_ann_3);
    setText('feat-ann-4', t.feat_ann_4); // New
    setText('feat-ann-5', t.feat_ann_5); // New

    // --- 5. POLICY & FOOTER ---
    setText('txt-secure-title', t.txt_secure_title);
    setText('txt-cancel-title', t.txt_cancel_title);
    setText('txt-refund-policy', t.txt_refund_policy);
    setText('txt-annual-policy', t.txt_annual_policy);
    setText('disclaimer-ai', t.disclaimer_ai);

    setText('txt-faq-title', t.faq_title);
    setText('txt-faq-word', t.faq_word);
    setText('faq-q1', t.faq_q1); setText('faq-a1', t.faq_a1);
    setText('faq-q2', t.faq_q2); setText('faq-a2', t.faq_a2);
    setText('faq-q3', t.faq_q3); setText('faq-a3', t.faq_a3);
    setText('faq-q-equip', t.faq_q_equip); setText('faq-a-equip', t.faq_a_equip);
    setText('faq-q4', t.faq_q4); setText('faq-a4', t.faq_a4);

    setHtml('txt-final-cta-title', t.txt_final_cta_title);
    setText('txt-final-cta-desc', t.txt_final_cta_desc);
    setText('btn-final-cta', t.btn_final_cta);
    setText('txt-footer-slogan', t.txt_footer_slogan);
    setText('txt-copyright', t.txt_copyright);

    // Footer Links
    setText('footer-t-prod', t.footer_prod);
    setText('footer-l-features', t.nav_features);
    setText('footer-l-pricing', t.nav_pricing);
    setText('footer-l-app', t.footer_app);
    setText('footer-t-support', t.footer_support);
    setText('footer-l-faq', t.nav_faq);
    setText('footer-l-contact', t.footer_contact);
    setText('footer-l-terms', t.footer_terms);
    setText('footer-t-social', t.footer_social);

    // --- 6. CHECKOUT LINKS / ACTIONS ---
    const bindLink = (btnId, link) => {
        const btn = document.getElementById(btnId);
        if (btn) {
            if (link) {
                btn.onclick = () => window.location.href = link;
                btn.style.opacity = "1";
                btn.style.pointerEvents = "auto";
                if (t.btn_start) btn.innerText = t.btn_start;
            } else {
                console.warn(`No checkout link found for ${btnId} in ${currencyCode}`);
                btn.onclick = () => alert("Checkout coming soon for " + currencyCode);
            }
        }
    };

    bindLink('btn-essential', p.essential_monthly.link);
    bindLink('btn-essential-ann', p.essential_annual.link);
    bindLink('btn-week', p.pro_weekly.link);
    bindLink('btn-pro', p.pro_monthly.link);
    bindLink('btn-annual', p.pro_annual.link);

    // SECONDARY CTA: Go to Demo
    const btnSecondary = document.getElementById('hero-cta-secondary');
    if (btnSecondary) {
        btnSecondary.onclick = () => window.location.href = '/app';
    }
}

// Init
detectAndSetCurrency();
