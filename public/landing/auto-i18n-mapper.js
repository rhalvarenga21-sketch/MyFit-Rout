// auto-i18n-mapper.js - Adiciona automaticamente data-i18n aos elementos
// Execute este script ANTES do i18n.js para mapear os elementos automaticamente

(function() {
  'use strict';

  console.log('🔧 Mapeando elementos para i18n...');

  // Mapeamento de IDs/seletores para chaves de tradução
  const mappings = [
    // Navigation
    { selector: 'a[href="#features"]', attr: 'data-i18n', value: 'nav.features' },
    { selector: 'a[href="#pricing"]', attr: 'data-i18n', value: 'nav.pricing' },
    { selector: 'a[href="#faq"]', attr: 'data-i18n', value: 'nav.faq' },
    { selector: 'a[href="https://myfitrout-app.vercel.app"]', attr: 'data-i18n', value: 'nav.login' },

    // Hero Section
    { id: 'hero-badge', attr: 'data-i18n', value: 'hero.badge' },
    { id: 'hero-title', attr: 'data-i18n', value: 'hero.title' },
    { id: 'hero-subtitle', attr: 'data-i18n', value: 'hero.subtitle' },
    { id: 'hero-cta-primary', attr: 'data-i18n', value: 'hero.ctaPrimary' },
    { id: 'hero-cta-secondary', attr: 'data-i18n', value: 'hero.ctaSecondary' },

    // Features Section
    { id: 'txt-choose-plan', attr: 'data-i18n', value: 'pricing.choosePlan' },
    { id: 'txt-plan-word', attr: 'data-i18n', value: 'pricing.planWord' },
    { id: 'txt-subtitle', attr: 'data-i18n', value: 'pricing.subtitle' },

    // Essential Plan
    { id: 'txt-essential-title', attr: 'data-i18n', value: 'pricing.essential.title' },
    { id: 'txt-essential-desc', attr: 'data-i18n', value: 'pricing.essential.description' },
    { id: 'price-essential-monthly', attr: 'data-i18n', value: 'pricing.essential.price' },
    { id: 'feat-ess-1', attr: 'data-i18n', value: 'pricing.essential.features.f1' },
    { id: 'feat-ess-2', attr: 'data-i18n', value: 'pricing.essential.features.f2' },
    { id: 'feat-ess-3', attr: 'data-i18n', value: 'pricing.essential.features.f3' },
    { id: 'feat-ess-4', attr: 'data-i18n', value: 'pricing.essential.features.f4' },
    { id: 'btn-essential', attr: 'data-i18n', value: 'pricing.essential.button' },

    // Pro Plan
    { id: 'txt-pro-title', attr: 'data-i18n', value: 'pricing.pro.title' },
    { id: 'txt-pro-desc', attr: 'data-i18n', value: 'pricing.pro.description' },
    { id: 'price-pro-monthly', attr: 'data-i18n', value: 'pricing.pro.price' },
    { id: 'feat-pro-1', attr: 'data-i18n', value: 'pricing.pro.features.f1' },
    { id: 'feat-pro-2', attr: 'data-i18n', value: 'pricing.pro.features.f2' },
    { id: 'feat-pro-3', attr: 'data-i18n', value: 'pricing.pro.features.f3' },
    { id: 'feat-pro-4', attr: 'data-i18n', value: 'pricing.pro.features.f4' },
    { id: 'feat-pro-5', attr: 'data-i18n', value: 'pricing.pro.features.f5' },
    { id: 'feat-pro-6', attr: 'data-i18n', value: 'pricing.pro.features.f6' },

    // Annual Plan
    { id: 'txt-annual-title', attr: 'data-i18n', value: 'pricing.annual.title' },
    { id: 'txt-discount-badge', attr: 'data-i18n', value: 'pricing.annual.badge' },
    { id: 'txt-annual-desc', attr: 'data-i18n', value: 'pricing.annual.description' },
    { id: 'price-pro-annual', attr: 'data-i18n', value: 'pricing.annual.price' },
    { id: 'price-equiv-pro-annual', attr: 'data-i18n', value: 'pricing.annual.equivalent' },
    { id: 'feat-ann-1', attr: 'data-i18n', value: 'pricing.annual.features.f1' },
    { id: 'feat-ann-2', attr: 'data-i18n', value: 'pricing.annual.features.f2' },
    { id: 'feat-ann-3', attr: 'data-i18n', value: 'pricing.annual.features.f3' },
    { id: 'feat-ann-4', attr: 'data-i18n', value: 'pricing.annual.features.f4' },
    { id: 'btn-annual', attr: 'data-i18n', value: 'pricing.annual.button' },

    // Disclaimer
    { id: 'disclaimer-ai', attr: 'data-i18n', value: 'pricing.disclaimer' },

    // FAQ
    { id: 'txt-faq-title', attr: 'data-i18n', value: 'faq.title' },
    { id: 'txt-faq-word', attr: 'data-i18n', value: 'faq.titleWord' },
    { id: 'faq-q1', attr: 'data-i18n', value: 'faq.q1' },
    { id: 'faq-a1', attr: 'data-i18n', value: 'faq.a1' },
    { id: 'faq-q2', attr: 'data-i18n', value: 'faq.q2' },
    { id: 'faq-a2', attr: 'data-i18n', value: 'faq.a2' },
    { id: 'faq-q3', attr: 'data-i18n', value: 'faq.q3' },
    { id: 'faq-a3', attr: 'data-i18n', value: 'faq.a3' },
    { id: 'faq-q4', attr: 'data-i18n', value: 'faq.q5' }, // Note: q4 no HTML = q5 nas traduções (pagamento)
    { id: 'faq-a4', attr: 'data-i18n', value: 'faq.a5' },
  ];

  // Aplicar mapeamentos
  function applyMappings() {
    let mapped = 0;
    let failed = 0;

    mappings.forEach(mapping => {
      let element;
      
      if (mapping.id) {
        element = document.getElementById(mapping.id);
      } else if (mapping.selector) {
        element = document.querySelector(mapping.selector);
      }

      if (element) {
        element.setAttribute(mapping.attr, mapping.value);
        mapped++;
      } else {
        console.warn(`❌ Elemento não encontrado:`, mapping);
        failed++;
      }
    });

    console.log(`✅ Mapeamento concluído: ${mapped} elementos mapeados, ${failed} falhas`);
  }

  // Executar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyMappings);
  } else {
    applyMappings();
  }

})();
