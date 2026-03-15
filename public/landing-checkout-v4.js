// MyFitRout - Global Checkout & GeoIP v4 (Redundant & Hardened & Full Translation)
// Agent 3.0 - Full Page Translation (Nav + Hero + Features + Pricing + FAQ + Footer)
// v4.1 - Updated copy: science-based, no AI/Gemini mentions, honest social proof

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
        // Nav
        nav_features: "Recursos",
        nav_plans: "Planos",
        nav_faq: "FAQ",
        nav_login: "Entrar",

        // Hero
        hero_badge: "Seu Treino Personalizado Começa Aqui",
        hero_title: `Treino Inteligente, <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Resultado Real</span>`,
        hero_subtitle: "Treinos baseados em ciência, adaptados ao seu corpo, objetivos e rotina. Progressão inteligente. Resultados reais. Sem perda de tempo.",
        cta_primary: "COMEÇAR AGORA →",
        cta_secondary: "TESTAR DEMO GRÁTIS →",
        hero_social_active: "Membros Fundadores em Acesso Antecipado",
        hero_social_rating: "treinos baseados em ciência do exercício",

        // Features
        features_main_title: `Por que <span class="text-indigo-400">MyFitRout</span>?`,
        features_subtitle: "Ciência do exercício aplicada aos seus resultados",
        feat_1_title: "Coach Inteligente", feat_1_desc: "Respostas técnicas e personalizadas em tempo real. Tire dúvidas sobre técnica, nutrição e progressão — como ter um coach profissional sob demanda.",
        feat_2_title: "Treinos Personalizados", feat_2_desc: "Sem planos genéricos. Nunca. Seus treinos são feitos para seus objetivos — emagrecimento, hipertrofia, força ou longevidade — e evoluem com você.",
        feat_3_title: "Biblioteca de Exercícios", feat_3_desc: "150+ exercícios com vídeos HD. Aprenda a técnica correta, treine com confiança e reduza drasticamente o risco de lesões.",
        feat_4_title: "Monitoramento Completo", feat_4_desc: "Tudo rastreado. Cada evolução medida. Registre treinos, monitore performance e receba insights para manter seu progresso constante.",
        feat_5_title: "Coach Disponível 24/7", feat_5_desc: "Treine no seu horário. Tire dúvidas a qualquer momento e receba orientações que se adaptam à sua rotina e realidade.",
        feat_6_title: "Multiplataforma & Cloud", feat_6_desc: "Treine em qualquer lugar. Qualquer dispositivo. Seus dados sincronizam automaticamente na nuvem — seu progresso está sempre com você.",

        // Early Access Section (replaces testimonials)
        testim_label: "Programa de Acesso Antecipado",
        testim_title: `Seja um <span class="text-indigo-400">Membro Fundador</span>`,
        testim_subtitle: "Junte-se aos primeiros membros e ajude a construir o futuro do fitness personalizado.",
        t1_quote: "Garanta o menor preço que o MyFitRout terá. Membros Fundadores mantêm o valor promocional para sempre.", t1_tag: "Preço de Lançamento",
        t2_quote: "Influencie diretamente as próximas funcionalidades. Seus feedbacks moldam o produto.", t2_tag: "Sua Voz Importa",
        t3_quote: "Teste novidades antes de todos. Novos exercícios, funcionalidades e programas em primeira mão.", t3_tag: "Acesso Antecipado",
        t4_quote: "Membros Fundadores recebem um badge permanente no perfil — reconhecimento por apoiar desde o início.", t4_tag: "Badge Exclusivo",
        t5_quote: "Treinos baseados em princípios de periodização, sobrecarga progressiva e recuperação — não em achismo.", t5_tag: "Ciência Aplicada",
        t6_quote: "Faça parte de um grupo fechado de pessoas comprometidas com seus resultados.", t6_tag: "Comunidade Exclusiva",
        t7_quote: "", t7_tag: "",
        t8_quote: "", t8_tag: "",
        t9_quote: "", t9_tag: "",
        t10_quote: "", t10_tag: "",

        // Pricing Titles & Badges
        pricing_title: `Escolha seu <span class="text-indigo-400">Plano</span>`,
        pricing_subtitle: "Invista em você. Cancele quando quiser.",
        badge_popular: "MAIS POPULAR",

        // Pricing Cards
        p_ess_month_title: "Essential Mensal",
        p_ess_month_desc: "Transforme seu corpo com inteligência",
        p_ess_month_feats: ["100 perguntas mensais com Coach personalizado", "Biblioteca completa: 150+ exercícios em vídeo", "Dashboard de progresso e evolução", "App mobile: treine em qualquer lugar, qualquer hora"],
        p_ess_month_btn: "COMEÇAR AGORA",

        p_ess_annual_title: "Essential Anual",
        p_ess_annual_desc: "Consistência que transforma — economize 35%",
        p_ess_annual_feats: ["Todos os benefícios do Essential Mensal incluídos", "Apenas ~{sym}8.32/mês — investimento mínimo, máximo resultado", "Pague uma vez, treine 365 dias sem preocupação", "12 meses para criar hábitos que duram"],
        p_ess_annual_btn: "COMEÇAR AGORA",

        p_pro_week_title: "Passe PRO Semanal",
        p_pro_week_desc: "Teste o poder do PRO por apenas {sym}7.90",
        p_pro_week_feats: ["7 dias de acesso TOTAL ao PRO — sem limitações", "Zero compromisso", "Conversas ILIMITADAS com o Coach 24/7", "Perfeito para decidir se o plano PRO é para você", "Risco zero: apenas {sym}7.90"],
        p_pro_week_btn: "COMEÇAR AGORA",

        p_pro_month_title: "PRO Mensal",
        p_pro_month_desc: "Resultados reais, rápidos e definitivos",
        p_pro_month_feats: ["Conversas ILIMITADAS com o Coach 24/7", "Planos de treino personalizados para seu objetivo", "Receitas fit exclusivas (inverno + verão)", "Análises avançadas: veja sua evolução em tempo real", "Treinos ilimitados + todos os programas prontos", "Acesso antecipado a novidades"],
        p_pro_month_btn: "COMEÇAR AGORA",

        p_pro_annual_title: "PRO Anual",
        p_pro_annual_desc: "Compromisso com seus resultados — economize 33%",
        p_pro_annual_feats: ["Tudo do PRO + desconto de 33%", "Pague uma vez — treine 365 dias sem preocupação", "Apenas ~{sym}16.65/mês — menos que 2 cafés por semana", "Garantia estendida: 7 dias para testar sem risco", "Foco total: um ano para transformar seu corpo"],
        p_pro_annual_btn: "COMEÇAR AGORA",

        // Suffixes
        per_month: "/mês", per_year: "/ano", per_week: "/sem", equiv: "Equivale a",

        // FAQ
        faq_main_title: `Perguntas <span class="text-indigo-400">Frequentes</span>`,
        faq_q1: "Como funciona o Coach do MyFitRout?", faq_a1: "O Coach analisa seu perfil, objetivos e histórico para criar treinos personalizados baseados em ciência do exercício. Ele responde dúvidas sobre treino, nutrição e recuperação em tempo real — como ter um personal trainer disponível 24/7.",
        faq_q2: "Posso cancelar a qualquer momento?", faq_a2: "Sim! Não há contratos ou fidelidade. Você pode cancelar sua assinatura a qualquer momento diretamente no app, de forma rápida e sem burocracia.",
        faq_q3: "O MyFitRout serve para iniciantes?", faq_a3: "Perfeitamente! O MyFitRout foi pensado especialmente para iniciantes. Os treinos se adaptam ao seu nível, com vídeos demonstrativos e orientações claras para cada exercício.",
        faq_q_equip: "Preciso de equipamentos para treinar?", faq_a_equip: "Não necessariamente. Você pode escolher entre treinos em casa ou na academia. Nossa biblioteca inclui rotinas com ou sem equipamentos, para você treinar do seu jeito.",
        faq_q4: "Como funciona o pagamento?", faq_a4: "Os pagamentos são processados de forma segura via Revolut (Global) e Last Link (Brasil). Aceitamos cartões de crédito, Apple Pay e Google Pay. O mesmo valor nominal se aplica em R$, $ e €.",
        faq_q_privacy: "Meus dados estão seguros?", faq_a_privacy: "Sim. Sua privacidade é prioridade. O MyFitRout segue as diretrizes da GDPR (UE) e LGPD (Brasil). Seus dados pessoais e de treino são criptografados, nunca vendidos, e usados apenas para melhorar sua experiência.",
        disclaimer_ai: "Nota: Os treinos são gerados por tecnologia avançada. O Coach é um assistente virtual treinado para orientação de alta performance.",

        // Security & Policy
        secure_msg: "💳 Pagamento seguro via {provider} • 🔒 Dados criptografados",
        cancel_title: "Política de Cancelamento Justa:",
        cancel_desc: "Reembolso integral (100%) em até 7 dias.<br/>Para planos anuais, após 7 dias, será cobrada uma taxa de 20% sobre o valor restante a ser restituído.",

        // Final CTA
        cta_final_title: `Pronto para <span class="text-indigo-400">Transformar</span><br/>seu Corpo?`,
        cta_final_desc: "Junte-se aos Membros Fundadores que já estão treinando com ciência e alcançando seus objetivos com MyFitRout.",
        cta_final_btn: "Começar Agora",

        // Footer
        footer_desc: "Treinos baseados em ciência para todos.",
        footer_prod: "Produto",
        footer_support: "Suporte",
        footer_social: "Social",
        footer_copy: "© 2026 MyFitRout. Todos os direitos reservados. Feito com 💜 para atletas.",
        footer_terms: "Termos de Uso",
        footer_contact: "Contato"
    },
    EN: {
        // Nav
        nav_features: "Features",
        nav_plans: "Pricing",
        nav_faq: "FAQ",
        nav_login: "Login",

        // Hero
        hero_badge: "Your Personalized Training Starts Here",
        hero_title: `Train Smarter, <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Not Harder</span>`,
        hero_subtitle: "Science-backed workouts tailored to your body, goals, and schedule. Smart progression. Real results. Zero wasted time.",
        cta_primary: "GET STARTED →",
        cta_secondary: "TRY FREE DEMO →",
        hero_social_active: "Founding Members in Early Access",
        hero_social_rating: "evidence-based exercise science",

        // Features
        features_main_title: `Why <span class="text-indigo-400">MyFitRout</span>?`,
        features_subtitle: "Exercise science applied to your results",
        feat_1_title: "Smart Coach", feat_1_desc: "Precise, personalized guidance in real-time. Get answers on technique, nutrition, and progression — like having a professional coach on demand.",
        feat_2_title: "Personalized Workouts", feat_2_desc: "No generic plans. Ever. Your workouts are tailored to your goals — fat loss, muscle gain, strength, or longevity — and adapt as you evolve.",
        feat_3_title: "Exercise Demo Library", feat_3_desc: "150+ exercises with HD videos. Learn correct technique, train with confidence, and significantly reduce the risk of injuries.",
        feat_4_title: "Full Progress Tracking", feat_4_desc: "Everything tracked. Every improvement measured. Log workouts, monitor performance, and receive smart insights that keep you progressing week after week.",
        feat_5_title: "Coach Available 24/7", feat_5_desc: "Train on your schedule, not someone else's. Ask questions anytime and get guidance that fits your routine, level, and real-life constraints.",
        feat_6_title: "Multiplatform & Cloud Sync", feat_6_desc: "Train anywhere. Any device. Your data syncs automatically to the cloud — your progress is always with you.",

        // Early Access Section (replaces testimonials)
        testim_label: "Early Access Program",
        testim_title: `Become a <span class="text-indigo-400">Founding Member</span>`,
        testim_subtitle: "Join the first members and help build the future of personalized fitness.",
        t1_quote: "Lock in the lowest price MyFitRout will ever have. Founding Members keep their launch pricing forever.", t1_tag: "Launch Pricing",
        t2_quote: "Directly influence upcoming features. Your feedback shapes the product.", t2_tag: "Your Voice Matters",
        t3_quote: "Test new features before anyone else. New exercises, features, and programs — first access.", t3_tag: "Early Access",
        t4_quote: "Founding Members get a permanent profile badge — recognition for supporting from day one.", t4_tag: "Exclusive Badge",
        t5_quote: "Workouts built on periodization, progressive overload, and recovery principles — not guesswork.", t5_tag: "Applied Science",
        t6_quote: "Be part of a close-knit group of people committed to their results.", t6_tag: "Exclusive Community",
        t7_quote: "", t7_tag: "",
        t8_quote: "", t8_tag: "",
        t9_quote: "", t9_tag: "",
        t10_quote: "", t10_tag: "",

        // Pricing Titles
        pricing_title: `CHOOSE YOUR <span class="text-indigo-400">PLAN</span>`,
        pricing_subtitle: "Invest in yourself. Cancel anytime.",
        badge_popular: "MOST POPULAR",

        // Pricing Cards
        p_ess_month_title: "Essential Monthly", p_ess_month_desc: "Transform your body with intelligence", p_ess_month_feats: ["100 Coach questions/mo (Personalized)", "Complete library: 150+ video exercises", "Smart progress & evolution dashboard", "Mobile App: train anywhere, anytime"], p_ess_month_btn: "START NOW",
        p_ess_annual_title: "Essential Annual", p_ess_annual_desc: "Consistency that transforms — save 35%", p_ess_annual_feats: ["All Essential Monthly benefits included", "Just ~{sym}8.32/mo — minimum investment, maximum result", "Pay once, train 365 days worry-free", "12 months to build habits that last"], p_ess_annual_btn: "START NOW",
        p_pro_week_title: "PRO Weekly Pass", p_pro_week_desc: "Test PRO power for just {sym}7.90", p_pro_week_feats: ["7 days of FULL PRO access — no limitations", "Zero commitment", "UNLIMITED Coach conversations 24/7", "Perfect to decide if PRO is for you", "Zero risk: just {sym}7.90"], p_pro_week_btn: "START NOW",
        p_pro_month_title: "PRO Monthly", p_pro_month_desc: "Real, fast, and definitive results", p_pro_month_feats: ["UNLIMITED Coach conversations 24/7", "Personalized workout plans for your goal", "Exclusive fit recipes (winter + summer)", "Advanced analytics: see your evolution in real-time", "Unlimited workouts + all ready-made programs", "Early access to new features"], p_pro_month_btn: "START NOW",
        p_pro_annual_title: "PRO Annual", p_pro_annual_desc: "Commitment to your results — save 33%", p_pro_annual_feats: ["Everything in PRO + 33% discount", "Pay once — train 365 days worry-free", "Just ~{sym}16.65/mo — less than 2 coffees/week", "Extended guarantee: 7 days to test risk-free", "Total focus: one year to transform your body"], p_pro_annual_btn: "START NOW",

        // Suffixes
        per_month: "/mo", per_year: "/yr", per_week: "/wk", equiv: "Equivalent to",

        // FAQ
        faq_main_title: `Frequently Asked <span class="text-indigo-400">Questions</span>`,
        faq_q1: "How does the MyFitRout Coach work?", faq_a1: "The Coach analyzes your profile, goals, and history to create personalized workouts based on exercise science. It answers questions about training, nutrition, and recovery in real-time — like having a personal trainer available 24/7.",
        faq_q2: "Can I cancel anytime?", faq_a2: "Yes — absolutely. There are no contracts or commitments. You can cancel your subscription at any time directly in the app, quickly and hassle-free.",
        faq_q3: "Is MyFitRout suitable for beginners?", faq_a3: "Absolutely! MyFitRout was designed especially for beginners. Workouts adapt to your level, with demo videos and clear guidance for every exercise.",
        faq_q_equip: "Do I need equipment to train?", faq_a_equip: "Not necessarily. You can choose between home or gym workouts. Our exercise library includes routines with or without equipment, so you train your way.",
        faq_q4: "How does payment work?", faq_a4: "Payments are processed securely via Revolut (global) and Last Link (Brazil). We accept credit cards, Apple Pay, and Google Pay. The same nominal value applies in R$, $ and €.",
        faq_q_privacy: "Is my data safe and private?", faq_a_privacy: "Yes. Your privacy is a priority. MyFitRout follows GDPR (EU) and LGPD (Brazil) guidelines. Your personal and training data is encrypted, never sold, and used only to improve your personalized experience.",
        disclaimer_ai: "Note: Workouts are generated by advanced technology. The Coach is a virtual assistant trained for high-performance guidance.",

        // Security & Policy
        secure_msg: "💳 Secure payment via {provider} • 🔒 Encrypted data",
        cancel_title: "Fair Cancellation Policy:",
        cancel_desc: "Full refund (100%) within 7 days.<br/>For annual plans, after 7 days, a 20% fee applies to the remaining refundable amount.",

        // Final CTA
        cta_final_title: `Ready to <span class="text-indigo-400">Transform</span><br/>your Body?`,
        cta_final_desc: "Join the Founding Members already training with science and achieving their goals with MyFitRout.",
        cta_final_btn: "Get Started Now",

        // Footer
        footer_desc: "Science-based fitness coaching for everyone.",
        footer_prod: "Product",
        footer_support: "Support",
        footer_social: "Social",
        footer_copy: "© 2026 MyFitRout. All rights reserved. Made with 💜 for athletes.",
        footer_terms: "Terms of Use",
        footer_contact: "Contact"
    },
    ES: {
        // Nav
        nav_features: "Características",
        nav_plans: "Planes",
        nav_faq: "FAQ",
        nav_login: "Entrar",

        // Hero
        hero_badge: "Tu Entrenamiento Personalizado Empieza Aquí",
        hero_title: `Entrenamiento Inteligente, <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Resultado Real</span>`,
        hero_subtitle: "Entrenamientos basados en ciencia, adaptados a tu cuerpo, objetivos y rutina. Progresión inteligente. Resultados reales. Sin perder tiempo.",
        cta_primary: "EMPEZAR AHORA →",
        cta_secondary: "PRUEBA DEMO GRATIS →",
        hero_social_active: "Miembros Fundadores en Acceso Anticipado",
        hero_social_rating: "entrenamientos basados en ciencia del ejercicio",

        // Features
        features_main_title: `¿Por qué <span class="text-indigo-400">MyFitRout</span>?`,
        features_subtitle: "Ciencia del ejercicio aplicada a tus resultados",
        feat_1_title: "Coach Inteligente", feat_1_desc: "Respuestas técnicas y personalizadas en tiempo real. Resuelve dudas sobre técnica, nutrición y progresión — como tener un coach profesional a tu disposición.",
        feat_2_title: "Entrenamientos Personalizados", feat_2_desc: "Sin planes genéricos. Jamás. Tus entrenamientos se adaptan a tus objetivos — pérdida de peso, hipertrofia, fuerza o longevidad — y evolucionan contigo.",
        feat_3_title: "Biblioteca de Ejercicios", feat_3_desc: "150+ ejercicios con videos HD. Aprende la técnica correcta, entrena con confianza y reduce drásticamente el riesgo de lesiones.",
        feat_4_title: "Seguimiento Completo", feat_4_desc: "Todo rastreado. Cada mejora medida. Registra entrenamientos, monitorea tu rendimiento y recibe insights para mantener tu progreso.",
        feat_5_title: "Coach Disponible 24/7", feat_5_desc: "Entrena en tu horario. Haz preguntas en cualquier momento y recibe orientación que se adapta a tu rutina y realidad.",
        feat_6_title: "Multiplataforma & Cloud", feat_6_desc: "Entrena donde sea. Cualquier dispositivo. Tus datos se sincronizan automáticamente en la nube — tu progreso siempre contigo.",

        // Early Access Section (replaces testimonials)
        testim_label: "Programa de Acceso Anticipado",
        testim_title: `Sé un <span class="text-indigo-400">Miembro Fundador</span>`,
        testim_subtitle: "Únete a los primeros miembros y ayuda a construir el futuro del fitness personalizado.",
        t1_quote: "Asegura el precio más bajo que MyFitRout tendrá. Los Miembros Fundadores mantienen su precio promocional para siempre.", t1_tag: "Precio de Lanzamiento",
        t2_quote: "Influye directamente en las próximas funcionalidades. Tu feedback moldea el producto.", t2_tag: "Tu Voz Importa",
        t3_quote: "Prueba novedades antes que nadie. Nuevos ejercicios, funcionalidades y programas en primera mano.", t3_tag: "Acceso Anticipado",
        t4_quote: "Los Miembros Fundadores reciben un badge permanente en su perfil — reconocimiento por apoyar desde el inicio.", t4_tag: "Badge Exclusivo",
        t5_quote: "Entrenamientos basados en principios de periodización, sobrecarga progresiva y recuperación — no en suposiciones.", t5_tag: "Ciencia Aplicada",
        t6_quote: "Forma parte de un grupo exclusivo de personas comprometidas con sus resultados.", t6_tag: "Comunidad Exclusiva",
        t7_quote: "", t7_tag: "",
        t8_quote: "", t8_tag: "",
        t9_quote: "", t9_tag: "",
        t10_quote: "", t10_tag: "",

        // Pricing
        pricing_title: `ELIGE TU <span class="text-indigo-400">PLAN</span>`,
        pricing_subtitle: "Invierte en ti. Cancela cuando quieras.",
        badge_popular: "MÁS POPULAR",

        p_ess_month_title: "Essential Mensual", p_ess_month_desc: "Transforma tu cuerpo con inteligencia", p_ess_month_feats: ["100 preguntas mensuales al Coach personalizado", "Biblioteca completa: 150+ ejercicios en video", "Dashboard de progreso y evolución", "App móvil: entrena donde sea, cuando sea"], p_ess_month_btn: "EMPEZAR AHORA",
        p_ess_annual_title: "Essential Anual", p_ess_annual_desc: "Consistencia que transforma — ahorra 35%", p_ess_annual_feats: ["Todos los beneficios de Essential Mensual", "Solo ~{sym}8.32/mes — inversión mínima, máximo resultado", "Paga una vez, entrena 365 días sin preocupaciones", "12 meses para crear hábitos que duran"], p_ess_annual_btn: "EMPEZAR AHORA",
        p_pro_week_title: "Pase PRO Semanal", p_pro_week_desc: "Prueba el poder de PRO por solo {sym}7.90", p_pro_week_feats: ["7 días de acceso TOTAL a PRO — sin límites", "Cero compromiso", "Conversaciones ILIMITADAS con el Coach 24/7", "Perfecto para decidir si el plan PRO es para ti", "Riesgo cero: solo {sym}7.90"], p_pro_week_btn: "EMPEZAR AHORA",
        p_pro_month_title: "PRO Mensual", p_pro_month_desc: "Resultados reales, rápidos y definitivos", p_pro_month_feats: ["Conversaciones ILIMITADAS con el Coach 24/7", "Planes de entrenamiento personalizados", "Recetas fit exclusivas (invierno + verano)", "Análisis avanzados: evolución en tiempo real", "Entrenamientos ilimitados + programas listos", "Acceso anticipado a novedades"], p_pro_month_btn: "EMPEZAR AHORA",
        p_pro_annual_title: "PRO Anual", p_pro_annual_desc: "Compromiso con tus resultados — ahorra 33%", p_pro_annual_feats: ["Todo de PRO + descuento de 33%", "Paga una vez — entrena 365 días sin preocupaciones", "Solo ~{sym}16.65/mes — menos que 2 cafés por semana", "Garantía extendida: 7 días para probar sin riesgo", "Foco total: un año para transformar tu cuerpo"], p_pro_annual_btn: "EMPEZAR AHORA",
        per_month: "/mes", per_year: "/año", per_week: "/sem", equiv: "Equivale a",

        // FAQ
        faq_main_title: `Preguntas <span class="text-indigo-400">Frecuentes</span>`,
        faq_q1: "¿Cómo funciona el Coach de MyFitRout?", faq_a1: "El Coach analiza tu perfil, objetivos e historial para crear entrenamientos personalizados basados en ciencia del ejercicio. Responde dudas sobre entrenamiento, nutrición y recuperación en tiempo real — como tener un entrenador personal disponible 24/7.",
        faq_q2: "¿Puedo cancelar en cualquier momento?", faq_a2: "Sí — absolutamente. No hay contratos ni compromisos. Puedes cancelar tu suscripción en cualquier momento directamente en la app, de forma rápida y sin complicaciones.",
        faq_q3: "¿MyFitRout es apto para principiantes?", faq_a3: "¡Definitivamente! MyFitRout fue diseñado especialmente para principiantes. Los entrenamientos se adaptan a tu nivel, con videos demostrativos y orientaciones claras para cada ejercicio.",
        faq_q_equip: "¿Necesito equipo para entrenar?", faq_a_equip: "No necesariamente. Puedes elegir entre entrenamientos en casa o gimnasio. Nuestra biblioteca incluye rutinas con o sin equipo, para que entrenes a tu manera.",
        faq_q4: "¿Cómo funciona el pago?", faq_a4: "Los pagos se procesan de forma segura vía Revolut (Global) y Last Link (Brasil). Aceptamos tarjetas de crédito, Apple Pay y Google Pay. El mismo valor nominal se aplica en R$, $ y €.",
        faq_q_privacy: "¿Mis datos están seguros?", faq_a_privacy: "Sí. Tu privacidad es prioridad. MyFitRout sigue las directrices GDPR (UE) y LGPD (Brasil). Tus datos personales y de entrenamiento están encriptados, nunca se venden, y se usan solo para mejorar tu experiencia.",
        disclaimer_ai: "Nota: Los entrenamientos son generados por tecnología avanzada. El Coach es un asistente virtual entrenado para orientación de alto rendimiento.",

        // Security & Policy
        secure_msg: "💳 Pago seguro vía {provider} • 🔒 Datos encriptados",
        cancel_title: "Política de Cancelación Justa:",
        cancel_desc: "Reembolso completo (100%) en hasta 7 días.<br/>Para planes anuales, después de 7 días, se cobrará una tasa del 20% sobre el valor restante a restituir.",

        // Final CTA
        cta_final_title: `¿Listo para <span class="text-indigo-400">Transformar</span><br/>tu Cuerpo?`,
        cta_final_desc: "Únete a los Miembros Fundadores que ya están entrenando con ciencia y alcanzando sus objetivos con MyFitRout.",
        cta_final_btn: "Empezar Ahora",

        // Footer
        footer_desc: "Entrenamiento basado en ciencia para todos.",
        footer_prod: "Producto",
        footer_support: "Soporte",
        footer_social: "Social",
        footer_copy: "© 2026 MyFitRout. Todos los derechos reservados. Hecho con 💜 para atletas.",
        footer_terms: "Términos de Uso",
        footer_contact: "Contacto"
    }
};

// ==========================================
// 🌍 GLOBAL PRICING MATRIX
// ==========================================
const GLOBAL_PRICING = {
    BRL: {
        symbol: 'R$', lang: 'PT',
        products: {
            essential_monthly: { id: 'price_essential_monthly', amount: '12,90' },
            essential_annual: { id: 'price_essential_annual', amount: '99,90' },
            pro_weekly: { id: 'price_pro_weekly', amount: '7,90' },
            pro_monthly: { id: 'price_pro_monthly', amount: '24,90' },
            pro_annual: { id: 'price_pro_annual', amount: '199,90', equiv: '16,65' }
        }
    },
    USD: {
        symbol: '$', lang: 'EN',
        products: {
            essential_monthly: { id: 'price_essential_monthly_usd', amount: '12.90' },
            essential_annual: { id: 'price_essential_annual_usd', amount: '99.90' },
            pro_weekly: { id: 'price_pro_weekly_usd', amount: '7.90' },
            pro_monthly: { id: 'price_pro_monthly_usd', amount: '24.90' },
            pro_annual: { id: 'price_pro_annual_usd', amount: '199.90', equiv: '16.65' }
        }
    },
    EUR: {
        symbol: '€', lang: 'EN',
        products: {
            essential_monthly: { id: 'price_essential_monthly_eur', amount: '12.90' },
            essential_annual: { id: 'price_essential_annual_eur', amount: '99.90' },
            pro_weekly: { id: 'price_pro_weekly_eur', amount: '7.90' },
            pro_monthly: { id: 'price_pro_monthly_eur', amount: '24.90' },
            pro_annual: { id: 'price_pro_annual_eur', amount: '199.90', equiv: '16.65' }
        }
    }
};

// ==========================================
// 🕵️ GEO-IP LOGIC (REDUNDANT)
// ==========================================
async function fetchGeoIP() {
    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 3000);
        const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(id);
        const data = await response.json();
        if (data.error) throw new Error("ipapi error");
        return { country: data.country_code, currency: data.currency, source: 'ipapi.co' };
    } catch (e) { console.warn('ipapi.co failed:', e); }

    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 3000);
        const response = await fetch('https://ipwho.is/', { signal: controller.signal });
        clearTimeout(id);
        const data = await response.json();
        if (!data.success) throw new Error("ipwho.is failed");
        return { country: data.country_code, currency: data.currency, source: 'ipwho.is' };
    } catch (e) { console.warn('ipwho.is failed:', e); }

    throw new Error("All GeoIP services failed");
}

async function detectAndSetCurrency() {
    const params = new URLSearchParams(window.location.search);
    const debugCurrency = params.get('currency');

    if (debugCurrency && GLOBAL_PRICING[debugCurrency.toUpperCase()]) {
        console.log(`🔧 Debug Override: Forcing ${debugCurrency}`);
        const target = debugCurrency.toUpperCase();
        localStorage.setItem('myfitrout_currency_locked', target);
        const lang = (target === 'BRL') ? 'PT' : 'EN';
        updateUI(target, lang);
        showDebugBanner(target, "Manual Override");
        return;
    }

    try {
        const data = await fetchGeoIP();
        const country = data.country;
        const currency = data.currency;

        let targetCurrency = 'USD';
        let targetLang = 'EN';

        if (country === 'BR') targetCurrency = 'BRL';
        else if (currency === 'EUR' || country === 'CH') targetCurrency = 'EUR';
        else targetCurrency = 'USD';

        if (['BR', 'PT', 'AO', 'MZ'].includes(country)) targetLang = 'PT';
        else if (['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'EC', 'UY'].includes(country)) targetLang = 'ES';
        else targetLang = 'EN';

        console.log(`🌍 Detected (${data.source}): ${country}/${currency} -> Target: ${targetCurrency}`);

        localStorage.setItem('myfitrout_currency_locked', targetCurrency);
        updateUI(targetCurrency, targetLang);

        if (params.has('debug')) showDebugBanner(targetCurrency, data.source);

    } catch (error) {
        console.warn('GeoIP Critical Failure:', error);

        const navLang = (navigator.language || 'en').toLowerCase();
        let fallbackCurr = 'USD';
        let fallbackLang = 'EN';

        if (navLang.includes('pt')) {
            fallbackCurr = 'BRL'; fallbackLang = 'PT';
        } else if (navLang.includes('es')) {
            fallbackCurr = 'USD'; fallbackLang = 'ES';
        }

        localStorage.setItem('myfitrout_currency_locked', fallbackCurr);
        updateUI(fallbackCurr, fallbackLang);
        if (params.has('debug')) showDebugBanner(fallbackCurr, "Browser Fallback");
    }
}

function showDebugBanner(curr, source) {
    const div = document.createElement('div');
    div.className = "fixed bottom-0 left-0 bg-red-600 text-white text-xs p-1 z-50 opacity-75";
    div.innerText = `DEBUG: ${curr} via ${source}`;
    document.body.appendChild(div);
}

// ==========================================
// 🎨 UI UPDATER
// ==========================================
function updateUI(currencyCode, langCode) {
    const config = GLOBAL_PRICING[currencyCode];
    if (!config) return;

    const lang = (langCode && TRANSLATIONS[langCode]) ? langCode : config.lang;
    const t = TRANSLATIONS[lang] || TRANSLATIONS['EN'];

    const sym = config.symbol;
    const p = config.products;

    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el && text) el.innerText = text.replace(/{sym}/g, sym);
    };
    const setHtml = (id, html) => {
        const el = document.getElementById(id);
        if (el && html) el.innerHTML = html.replace(/{sym}/g, sym);
    };

    const updateList = (id, items) => {
        const ul = document.getElementById(id);
        if (!ul || !items) return;
        const html = items.map(item => `
            <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 9.293l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-slate-300 text-sm md:text-base">${item.replace(/{sym}/g, sym)}</span>
            </li>`).join('');
        ul.innerHTML = html;
    };

    // --- APPLY TRANSLATIONS ---

    // 1. Navigation
    setText('nav-features', t.nav_features);
    setText('nav-plans', t.nav_plans);
    setText('nav-faq', t.nav_faq);
    setText('nav-login', t.nav_login);

    // 2. Hero
    setText('hero-badge', t.hero_badge);
    setHtml('hero-title', t.hero_title);
    setText('hero-subtitle', t.hero_subtitle);
    setText('hero-cta-primary', t.cta_primary);
    setText('hero-cta-secondary', t.cta_secondary);
    setText('hero-social-active', t.hero_social_active);
    setText('hero-social-rating', t.hero_social_rating);

    // Testimonials / Early Access
    setText('testim-label', t.testim_label);
    setHtml('testim-title', t.testim_title);
    setText('testim-subtitle', t.testim_subtitle);
    for (let i = 1; i <= 10; i++) {
        if (t['t' + i + '_quote']) setText('t' + i + '-quote', t['t' + i + '_quote']);
        if (t['t' + i + '_tag']) setText('t' + i + '-tag', t['t' + i + '_tag']);
    }

    // 3. Features
    setHtml('features-main-title', t.features_main_title);
    setText('features-subtitle', t.features_subtitle);
    setText('feat-1-title', t.feat_1_title); setText('feat-1-desc', t.feat_1_desc);
    setText('feat-2-title', t.feat_2_title); setText('feat-2-desc', t.feat_2_desc);
    setText('feat-3-title', t.feat_3_title); setText('feat-3-desc', t.feat_3_desc);
    setText('feat-4-title', t.feat_4_title); setText('feat-4-desc', t.feat_4_desc);
    setText('feat-5-title', t.feat_5_title); setText('feat-5-desc', t.feat_5_desc);
    setText('feat-6-title', t.feat_6_title); setText('feat-6-desc', t.feat_6_desc);

    // 4. Pricing Headers
    setHtml('txt-choose-plan', t.pricing_title);
    setText('txt-subtitle', t.pricing_subtitle);
    setText('badge-popular', t.badge_popular);

    // 5. Pricing Cards
    setText('txt-essential-title', t.p_ess_month_title);
    setText('txt-essential-desc', t.p_ess_month_desc);
    updateList('features-essential', t.p_ess_month_feats);
    setText('btn-essential', t.p_ess_month_btn);

    setText('txt-essential-title-annual', t.p_ess_annual_title);
    setText('txt-essential-desc-annual', t.p_ess_annual_desc);
    updateList('features-essential-annual', t.p_ess_annual_feats);
    setText('btn-essential-annual', t.p_ess_annual_btn);

    setText('txt-pro-weekly-title', t.p_pro_week_title);
    setText('txt-pro-weekly-desc', t.p_pro_week_desc);
    updateList('features-pro-weekly', t.p_pro_week_feats);
    setText('btn-pro-weekly', t.p_pro_week_btn);

    setText('txt-pro-title', t.p_pro_month_title);
    setText('txt-pro-desc', t.p_pro_month_desc);
    updateList('features-pro', t.p_pro_month_feats);
    setText('btn-pro-monthly', t.p_pro_month_btn);

    setText('txt-annual-title', t.p_pro_annual_title);
    setText('txt-annual-desc', t.p_pro_annual_desc);
    updateList('features-annual', t.p_pro_annual_feats);
    setText('btn-annual', t.p_pro_annual_btn);

    // 6. Prices Numbers
    setHtml('price-essential-monthly', `${sym} ${p.essential_monthly.amount}<span class="text-lg text-slate-400 font-normal">${t.per_month}</span>`);
    setHtml('price-essential-annual', `${sym} ${p.essential_annual.amount}<span class="text-lg text-slate-400 font-normal">${t.per_year}</span>`);
    setHtml('price-pro-weekly', `${sym} ${p.pro_weekly.amount}<span class="text-lg text-slate-400 font-normal">${t.per_week}</span>`);
    setHtml('price-pro-monthly', `${sym} ${p.pro_monthly.amount}<span class="text-lg text-slate-300 font-normal">${t.per_month}</span>`);
    setHtml('price-pro-annual', `${sym} ${p.pro_annual.amount}<span class="text-lg text-slate-400 font-normal">${t.per_year}</span>`);

    const equivLabel = t.equiv || 'Equivalent to';
    setText('price-equiv-pro-annual', `${equivLabel} ${sym} ${p.pro_annual.equiv}${t.per_month}`);

    // 7. FAQ
    setHtml('faq-main-title', t.faq_main_title);
    setText('faq-q1', t.faq_q1); setText('faq-a1', t.faq_a1);
    setText('faq-q2', t.faq_q2); setText('faq-a2', t.faq_a2);
    setText('faq-q3', t.faq_q3); setText('faq-a3', t.faq_a3);
    setText('faq-q-equip', t.faq_q_equip); setText('faq-a-equip', t.faq_a_equip);
    setText('faq-q4', t.faq_q4); setText('faq-a4', t.faq_a4);
    setText('faq-q-privacy', t.faq_q_privacy); setText('faq-a-privacy', t.faq_a_privacy);
    setText('disclaimer-ai', t.disclaimer_ai);

    // Security & Policy
    const providerName = (currencyCode === 'BRL') ? 'Lastlink' : 'Revolut';
    setText('secure-msg', t.secure_msg.replace('{provider}', providerName));

    setText('cancel-title', t.cancel_title);
    setHtml('cancel-desc', t.cancel_desc);

    // Final CTA
    setHtml('cta-final-title', t.cta_final_title);
    setText('cta-final-desc', t.cta_final_desc);
    setText('btn-final-text', t.cta_final_btn);

    // 8. Footer
    setText('footer-desc', t.footer_desc);
    setText('footer-prod-title', t.footer_prod);
    setText('footer-support-title', t.footer_support);
    setText('footer-social-title', t.footer_social);
    setText('footer-copy', t.footer_copy);
    setText('footer-features', t.nav_features);
    setText('footer-plans', t.nav_plans);
    setText('footer-contact', t.footer_contact);
    setText('footer-terms', t.footer_terms);
}

// ==========================================
// 💳 CHECKOUT LOGIC
// ==========================================
async function checkout(planType) {
    if (window.va) window.va('event', { name: 'Landing Checkout Click', data: { plan: planType } });

    try {
        const currency = localStorage.getItem('myfitrout_currency_locked') || 'USD';

        // 🇧🇷 LASTLINK (BR)
        if (currency === 'BRL') {
            const checkoutUrl = LASTLINK_CONFIG[planType];
            if (!checkoutUrl) { alert("Check configuration"); return; }
            let finalUrl = checkoutUrl;
            if (window.location.search) {
                finalUrl += (finalUrl.includes('?') ? '&' : '?') + window.location.search.substring(1);
            }
            window.location.href = finalUrl;
        }
        // 🌍 REVOLUT (GLOBAL)
        else {
            const REVOLUT_MAP = {
                essential_monthly: { EUR: "https://checkout.revolut.com/pay/e4aad20a-068b-49e9-adb6-bb48e09da1de", USD: "https://checkout.revolut.com/pay/c08ffc90-35fe-4701-8029-7a947c0ae1bb" },
                essential_annual: { EUR: "https://checkout.revolut.com/pay/f5514a23-333a-403d-8899-a0458433d466", USD: "https://checkout.revolut.com/pay/4c7f4d85-413f-455a-a753-7c7be9535103" },
                pro_weekly: { EUR: "https://checkout.revolut.com/pay/be2ef2b1-2774-47ed-ac96-316e8f524238", USD: "https://checkout.revolut.com/pay/371c21b0-020e-4bbf-bc5a-4b2e1cd179fc" },
                pro_monthly: { EUR: "https://checkout.revolut.com/pay/44bfee78-ac75-4c1b-a3e0-2639be29ef4f", USD: "https://checkout.revolut.com/pay/120ecee5-fb51-4ccf-b8f4-de6ca59df310" },
                pro_annual: { EUR: "https://checkout.revolut.com/pay/3c4dd027-3d72-4c3c-bc75-e264d8f9360f", USD: "https://checkout.revolut.com/pay/71190496-e02a-4ebf-bacc-f22bde2e0da1" }
            };

            const targetCurr = (currency === 'EUR') ? 'EUR' : 'USD';
            const planUrls = REVOLUT_MAP[planType];
            let targetUrlReal = planUrls ? planUrls[targetCurr] : REVOLUT_MAP['essential_monthly']['USD'];

            if (window.location.search) {
                targetUrlReal += (targetUrlReal.includes('?') ? '&' : '?') + window.location.search.substring(1);
            }
            window.location.href = targetUrlReal;
        }
    } catch (e) {
        console.error("Checkout Fatal:", e);
        window.location.href = "https://checkout.revolut.com/pay/c08ffc90-35fe-4701-8029-7a947c0ae1bb";
    }
}

// Init
window.addEventListener('DOMContentLoaded', () => {
    detectAndSetCurrency();
});
window.checkout = checkout;