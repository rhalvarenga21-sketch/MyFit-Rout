// translations.js - Sistema COMPLETO de traduções PT/EN/ES
// Versão FINAL - 100% dos textos mapeados

const translations = {
  pt: {
    // ========== META TAGS ==========
    meta: {
      title: "MyFitRout - Seu Coach de Alta Performance | Treinos Personalizados com IA",
      description: "Transforme seu corpo com treinos personalizados, IA avançada e acompanhamento profissional. Planos a partir de R$ 29,90/mês. Comece grátis hoje!",
      keywords: "treino personalizado, fitness, musculação, coach virtual, IA fitness, app de treino",
      ogTitle: "MyFitRout - Seu Coach de Alta Performance",
      ogDescription: "Treinos personalizados com IA. Transforme seu corpo de forma inteligente e segura."
    },

    // ========== NAVIGATION ==========
    nav: {
      features: "Recursos",
      pricing: "Planos",
      faq: "FAQ",
      login: "Entrar"
    },

    // ========== HERO SECTION ==========
    hero: {
      badge: "Vagas Limitadas & Exclusivas",
      title: "Seu Coach de",
      titleHighlight: "Alta Performance",
      subtitle: "Treinos personalizados com Inteligência Artificial. Transforme seu corpo de forma inteligente, segura e definitiva.",
      ctaPrimary: "Garantir Minha Vaga →",
      ctaSecondary: "Testar App Grátis",
      socialProof: "+1.200 atletas ativos",
      rating: "4.8/5 (1.247 avaliações)"
    },

    // ========== FEATURES SECTION ==========
    features: {
      sectionTitle: "Por que",
      sectionTitleBrand: "MyFitRout",
      sectionSubtitle: "Tecnologia de ponta para resultados reais",
      
      feature1: {
        title: "IA Avançada",
        description: "Coach virtual com Google Gemini 2.5. Respostas técnicas, personalizadas e em tempo real."
      },
      feature2: {
        title: "Treinos Personalizados",
        description: "Planos adaptados ao seu objetivo: emagrecimento, hipertrofia, força ou longevidade."
      },
      feature3: {
        title: "Vídeos Demonstrativos",
        description: "300+ exercícios com vídeos HD. Aprenda a técnica correta e evite lesões."
      },
      feature4: {
        title: "Acompanhamento Total",
        description: "Registre treinos, monitore progresso e receba feedback inteligente sobre sua evolução."
      },
      feature5: {
        title: "Disponível 24/7",
        description: "Tire suas dúvidas com o Coach a qualquer momento. Orientações personalizadas de acordo com sua realidade."
      },
      feature6: {
        title: "Multiplataforma",
        description: "Acesse de qualquer dispositivo. Seus dados sincronizados na nuvem automaticamente."
      }
    },

    // ========== PRICING SECTION ==========
    pricing: {
      sectionTitle: "Escolha seu",
      sectionTitleWord: "Plano",
      sectionSubtitle: "Invista em você. Cancele quando quiser.",
      
      // Essential Plan
      essential: {
        title: "Essential",
        description: "Para quem está começando",
        period: "/mês",
        features: {
          f1: "100 perguntas ao Coach/mês",
          f2: "Biblioteca completa de exercícios",
          f3: "Acompanhamento de progresso",
          f4: "Suporte por email"
        },
        button: "Começar Agora"
      },

      // Pro Plan
      pro: {
        badge: "Mais Popular",
        title: "PRO",
        description: "Para resultados sérios",
        period: "/mês",
        features: {
          f1: "Consultas IA ilimitadas",
          f2: "Planos 100% personalizados",
          f3: "Livro de Receitas Fit (Inverno & Verão)",
          f4: "Análises avançadas de performance",
          f5: "Suporte prioritário",
          f6: "Acesso antecipado a novidades"
        },
        button: "Assinar PRO"
      },

      // Annual Plan
      annual: {
        title: "PRO Anual",
        badge: "-33%",
        description: "Melhor custo-benefício",
        period: "/ano",
        equivalent: "Equivale a R$ 16,65/mês",
        features: {
          f1: "Tudo do plano PRO",
          f2: "2 meses grátis",
          f3: "Garantia de 30 dias",
          f4: "Pagamento único"
        },
        button: "Assinar Anual"
      },

      // Footer de pagamento
      paymentFooter: "💳 Pagamento seguro via Stripe • 🔒 Dados criptografados",
      refundPolicyTitle: "Política de Cancelamento Justa:",
      refundPolicy1: "Reembolso integral (100%) em até 7 dias.",
      refundPolicy2: "Para planos anuais, após 7 dias, será cobrada uma taxa de 20% sobre o valor restante a ser restituído.",
      disclaimer: "Nota: Os treinos são gerados por Inteligência Artificial avançada. O Coach é um assistente virtual treinado para alta performance interativa."
    },

    // ========== FAQ SECTION ==========
    faq: {
      sectionTitle: "Perguntas",
      sectionTitleWord: "Frequentes",
      
      q1: "Como funciona a IA do MyFitRout?",
      a1: "Utilizamos o Google Gemini 2.5, uma das IAs mais avançadas do mundo. Ela analisa seu perfil, objetivos e histórico para criar treinos personalizados e responder dúvidas técnicas em tempo real.",
      
      q2: "Posso cancelar a qualquer momento?",
      a2: "Sim! Não há fidelidade. Você pode cancelar sua assinatura a qualquer momento pelo próprio app, sem burocracia.",
      
      q3: "Funciona para iniciantes?",
      a3: "Perfeitamente! O MyFitRout se adapta ao seu nível. Temos exercícios e orientações para iniciantes, intermediários e avançados.",
      
      q4: "Preciso de equipamentos?",
      a4: "Temos treinos para academia e para casa. Você escolhe o que funciona melhor para você. Nosso catálogo inclui exercícios com e sem equipamentos.",
      
      q5: "Como funciona o pagamento?",
      a5: "Processamos pagamentos via Stripe, uma das plataformas mais seguras do mundo. Aceitamos cartão de crédito e débito. Seus dados são 100% protegidos."
    },

    // ========== CTA FINAL ==========
    cta: {
      title: 'Pronto para <span class="text-indigo-400">Transformar</span><br />seu Corpo?',
      subtitle: "Junte-se a mais de 1.200 atletas que já estão alcançando seus objetivos com MyFitRout.",
      button: "Começar Agora"
    },

    // ========== FOOTER ==========
    footer: {
      tagline: "Seu coach de alta performance powered by AI.",
      productTitle: "Produto",
      supportTitle: "Suporte",
      socialTitle: "Social",
      
      links: {
        features: "Recursos",
        pricing: "Planos",
        app: "App",
        faq: "FAQ",
        contact: "Contato",
        terms: "Termos de Uso"
      },
      
      copyright: "© 2026 MyFitRout. Todos os direitos reservados. Feito com 💜 para atletas."
    },

    // ========== LEAD MODAL ==========
    leadModal: {
      title: "Quase lá!",
      subtitle: "Digite seu e-mail para processar sua inscrição e enviar os dados de acesso.",
      emailLabel: "E-mail",
      emailPlaceholder: "seu@email.com",
      button: "Continuar →",
      disclaimer: "Ambiente seguro. Seus dados estão protegidos."
    }
  },

  en: {
    // ========== META TAGS ==========
    meta: {
      title: "MyFitRout - Your High Performance Coach | AI-Powered Personalized Workouts",
      description: "Transform your body with personalized workouts, advanced AI and professional tracking. Plans from $5.90/month. Start free today!",
      keywords: "personalized workout, fitness, bodybuilding, virtual coach, AI fitness, workout app",
      ogTitle: "MyFitRout - Your High Performance Coach",
      ogDescription: "AI-powered personalized workouts. Transform your body intelligently and safely."
    },

    // ========== NAVIGATION ==========
    nav: {
      features: "Features",
      pricing: "Pricing",
      faq: "FAQ",
      login: "Sign In"
    },

    // ========== HERO SECTION ==========
    hero: {
      badge: "Limited & Exclusive Spots",
      title: "Your",
      titleHighlight: "High Performance Coach",
      subtitle: "AI-powered personalized workouts. Transform your body intelligently, safely and permanently.",
      ctaPrimary: "Secure My Spot →",
      ctaSecondary: "Try App Free",
      socialProof: "+1,200 active athletes",
      rating: "4.8/5 (1,247 reviews)"
    },

    // ========== FEATURES SECTION ==========
    features: {
      sectionTitle: "Why",
      sectionTitleBrand: "MyFitRout",
      sectionSubtitle: "Cutting-edge technology for real results",
      
      feature1: {
        title: "Advanced AI",
        description: "Virtual coach powered by Google Gemini 2.5. Technical, personalized answers in real-time."
      },
      feature2: {
        title: "Personalized Workouts",
        description: "Plans adapted to your goal: weight loss, hypertrophy, strength or longevity."
      },
      feature3: {
        title: "Demo Videos",
        description: "300+ exercises with HD videos. Learn proper technique and avoid injuries."
      },
      feature4: {
        title: "Complete Tracking",
        description: "Log workouts, track progress and get smart feedback on your evolution."
      },
      feature5: {
        title: "Available 24/7",
        description: "Ask the Coach anytime. Personalized guidance according to your reality."
      },
      feature6: {
        title: "Cross-Platform",
        description: "Access from any device. Your data automatically synced to the cloud."
      }
    },

    // ========== PRICING SECTION ==========
    pricing: {
      sectionTitle: "Choose your",
      sectionTitleWord: "Plan",
      sectionSubtitle: "Invest in yourself. Cancel anytime.",
      
      // Essential Plan
      essential: {
        title: "Essential",
        description: "For beginners",
        period: "/mo",
        features: {
          f1: "100 Coach questions/month",
          f2: "Complete exercise library",
          f3: "Progress tracking",
          f4: "Email support"
        },
        button: "Get Started"
      },

      // Pro Plan
      pro: {
        badge: "Most Popular",
        title: "PRO",
        description: "For serious results",
        period: "/mo",
        features: {
          f1: "Unlimited AI consultations",
          f2: "100% personalized plans",
          f3: "Fit Recipe Book (Winter & Summer)",
          f4: "Advanced performance analytics",
          f5: "Priority support",
          f6: "Early access to new features"
        },
        button: "Subscribe PRO"
      },

      // Annual Plan
      annual: {
        title: "PRO Annual",
        badge: "-33%",
        description: "Best value",
        period: "/yr",
        equivalent: "Equals $8.32/month",
        features: {
          f1: "Everything in PRO",
          f2: "2 months free",
          f3: "30-day guarantee",
          f4: "One-time payment"
        },
        button: "Subscribe Annual"
      },

      // Footer de pagamento
      paymentFooter: "💳 Secure payment via Stripe • 🔒 Encrypted data",
      refundPolicyTitle: "Fair Cancellation Policy:",
      refundPolicy1: "Full refund (100%) within 7 days.",
      refundPolicy2: "For annual plans, after 7 days, a 20% fee will be charged on the remaining amount to be refunded.",
      disclaimer: "Note: Workouts are generated by advanced Artificial Intelligence. The Coach is a virtual assistant trained for high-performance interaction."
    },

    // ========== FAQ SECTION ==========
    faq: {
      sectionTitle: "Frequently Asked",
      sectionTitleWord: "Questions",
      
      q1: "How does MyFitRout AI work?",
      a1: "We use Google Gemini 2.5, one of the world's most advanced AIs. It analyzes your profile, goals and history to create personalized workouts and answer technical questions in real-time.",
      
      q2: "Can I cancel anytime?",
      a2: "Yes! No commitment. You can cancel your subscription anytime through the app itself, hassle-free.",
      
      q3: "Does it work for beginners?",
      a3: "Absolutely! MyFitRout adapts to your level. We have exercises and guidance for beginners, intermediate and advanced users.",
      
      q4: "Do I need equipment?",
      a4: "We have workouts for gym and home. You choose what works best for you. Our catalog includes exercises with and without equipment.",
      
      q5: "How does payment work?",
      a5: "We process payments via Stripe, one of the world's most secure platforms. We accept credit and debit cards. Your data is 100% protected."
    },

    // ========== CTA FINAL ==========
    cta: {
      title: 'Ready to <span class="text-indigo-400">Transform</span><br />Your Body?',
      subtitle: "Join over 1,200 athletes already achieving their goals with MyFitRout.",
      button: "Get Started Now"
    },

    // ========== FOOTER ==========
    footer: {
      tagline: "Your AI-powered high performance coach.",
      productTitle: "Product",
      supportTitle: "Support",
      socialTitle: "Social",
      
      links: {
        features: "Features",
        pricing: "Pricing",
        app: "App",
        faq: "FAQ",
        contact: "Contact",
        terms: "Terms of Use"
      },
      
      copyright: "© 2026 MyFitRout. All rights reserved. Made with 💜 for athletes."
    },

    // ========== LEAD MODAL ==========
    leadModal: {
      title: "Almost there!",
      subtitle: "Enter your email to process your registration and send access details.",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      button: "Continue →",
      disclaimer: "Secure environment. Your data is protected."
    }
  },

  es: {
    // ========== META TAGS ==========
    meta: {
      title: "MyFitRout - Tu Coach de Alto Rendimiento | Entrenamientos Personalizados con IA",
      description: "Transforma tu cuerpo con entrenamientos personalizados, IA avanzada y seguimiento profesional. Planes desde $5.90/mes. ¡Comienza gratis hoy!",
      keywords: "entrenamiento personalizado, fitness, musculación, coach virtual, IA fitness, app de entrenamiento",
      ogTitle: "MyFitRout - Tu Coach de Alto Rendimiento",
      ogDescription: "Entrenamientos personalizados con IA. Transforma tu cuerpo de forma inteligente y segura."
    },

    // ========== NAVIGATION ==========
    nav: {
      features: "Características",
      pricing: "Planes",
      faq: "FAQ",
      login: "Entrar"
    },

    // ========== HERO SECTION ==========
    hero: {
      badge: "Plazas Limitadas y Exclusivas",
      title: "Tu Coach de",
      titleHighlight: "Alto Rendimiento",
      subtitle: "Entrenamientos personalizados con Inteligencia Artificial. Transforma tu cuerpo de forma inteligente, segura y definitiva.",
      ctaPrimary: "Asegurar Mi Plaza →",
      ctaSecondary: "Probar App Gratis",
      socialProof: "+1.200 atletas activos",
      rating: "4.8/5 (1.247 valoraciones)"
    },

    // ========== FEATURES SECTION ==========
    features: {
      sectionTitle: "Por qué",
      sectionTitleBrand: "MyFitRout",
      sectionSubtitle: "Tecnología de punta para resultados reales",
      
      feature1: {
        title: "IA Avanzada",
        description: "Coach virtual con Google Gemini 2.5. Respuestas técnicas, personalizadas y en tiempo real."
      },
      feature2: {
        title: "Entrenamientos Personalizados",
        description: "Planes adaptados a tu objetivo: adelgazamiento, hipertrofia, fuerza o longevidad."
      },
      feature3: {
        title: "Videos Demostrativos",
        description: "300+ ejercicios con videos HD. Aprende la técnica correcta y evita lesiones."
      },
      feature4: {
        title: "Seguimiento Total",
        description: "Registra entrenamientos, monitorea progreso y recibe feedback inteligente sobre tu evolución."
      },
      feature5: {
        title: "Disponible 24/7",
        description: "Consulta al Coach en cualquier momento. Orientaciones personalizadas según tu realidad."
      },
      feature6: {
        title: "Multiplataforma",
        description: "Accede desde cualquier dispositivo. Tus datos sincronizados en la nube automáticamente."
      }
    },

    // ========== PRICING SECTION ==========
    pricing: {
      sectionTitle: "Elige tu",
      sectionTitleWord: "Plan",
      sectionSubtitle: "Invierte en ti. Cancela cuando quieras.",
      
      // Essential Plan
      essential: {
        title: "Essential",
        description: "Para quien está comenzando",
        period: "/mes",
        features: {
          f1: "100 preguntas al Coach/mes",
          f2: "Biblioteca completa de ejercicios",
          f3: "Seguimiento de progreso",
          f4: "Soporte por email"
        },
        button: "Comenzar Ahora"
      },

      // Pro Plan
      pro: {
        badge: "Más Popular",
        title: "PRO",
        description: "Para resultados serios",
        period: "/mes",
        features: {
          f1: "Consultas IA ilimitadas",
          f2: "Planes 100% personalizados",
          f3: "Libro de Recetas Fit (Invierno y Verano)",
          f4: "Análisis avanzados de rendimiento",
          f5: "Soporte prioritario",
          f6: "Acceso anticipado a novedades"
        },
        button: "Suscribir PRO"
      },

      // Annual Plan
      annual: {
        title: "PRO Anual",
        badge: "-33%",
        description: "Mejor relación calidad-precio",
        period: "/año",
        equivalent: "Equivale a $8.32/mes",
        features: {
          f1: "Todo del plan PRO",
          f2: "2 meses gratis",
          f3: "Garantía de 30 días",
          f4: "Pago único"
        },
        button: "Suscribir Anual"
      },

      // Footer de pagamento
      paymentFooter: "💳 Pago seguro vía Stripe • 🔒 Datos encriptados",
      refundPolicyTitle: "Política de Cancelación Justa:",
      refundPolicy1: "Reembolso completo (100%) en hasta 7 días.",
      refundPolicy2: "Para planes anuales, después de 7 días, se cobrará una tarifa del 20% sobre el monto restante a ser restituido.",
      disclaimer: "Nota: Los entrenamientos son generados por Inteligencia Artificial avanzada. El Coach es un asistente virtual entrenado para interacción de alto rendimiento."
    },

    // ========== FAQ SECTION ==========
    faq: {
      sectionTitle: "Preguntas",
      sectionTitleWord: "Frecuentes",
      
      q1: "¿Cómo funciona la IA de MyFitRout?",
      a1: "Utilizamos Google Gemini 2.5, una de las IAs más avanzadas del mundo. Analiza tu perfil, objetivos e historial para crear entrenamientos personalizados y responder dudas técnicas en tiempo real.",
      
      q2: "¿Puedo cancelar en cualquier momento?",
      a2: "¡Sí! No hay fidelidad. Puedes cancelar tu suscripción en cualquier momento desde la propia app, sin burocracia.",
      
      q3: "¿Funciona para principiantes?",
      a3: "¡Perfectamente! MyFitRout se adapta a tu nivel. Tenemos ejercicios y orientaciones para principiantes, intermedios y avanzados.",
      
      q4: "¿Necesito equipamiento?",
      a4: "Tenemos entrenamientos para gimnasio y para casa. Tú eliges lo que funciona mejor para ti. Nuestro catálogo incluye ejercicios con y sin equipamiento.",
      
      q5: "¿Cómo funciona el pago?",
      a5: "Procesamos pagos vía Stripe, una de las plataformas más seguras del mundo. Aceptamos tarjeta de crédito y débito. Tus datos están 100% protegidos."
    },

    // ========== CTA FINAL ==========
    cta: {
      title: '¿Listo para <span class="text-indigo-400">Transformar</span><br />tu Cuerpo?',
      subtitle: "Únete a más de 1.200 atletas que ya están alcanzando sus objetivos con MyFitRout.",
      button: "Comenzar Ahora"
    },

    // ========== FOOTER ==========
    footer: {
      tagline: "Tu coach de alto rendimiento impulsado por IA.",
      productTitle: "Producto",
      supportTitle: "Soporte",
      socialTitle: "Social",
      
      links: {
        features: "Características",
        pricing: "Planes",
        app: "App",
        faq: "FAQ",
        contact: "Contacto",
        terms: "Términos de Uso"
      },
      
      copyright: "© 2026 MyFitRout. Todos los derechos reservados. Hecho con 💜 para atletas."
    },

    // ========== LEAD MODAL ==========
    leadModal: {
      title: "¡Casi listo!",
      subtitle: "Ingresa tu email para procesar tu inscripción y enviar los datos de acceso.",
      emailLabel: "Email",
      emailPlaceholder: "tu@email.com",
      button: "Continuar →",
      disclaimer: "Ambiente seguro. Tus datos están protegidos."
    }
  }
};

// Export para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = translations;
}
