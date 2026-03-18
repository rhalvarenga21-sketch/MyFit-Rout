// i18n.js - Sistema de Internacionalização para Landing Page
// Detecta idioma por IP (ipapi.co) e permite troca manual

(function() {
  'use strict';

  // ====== CONFIGURAÇÃO ======
  const STORAGE_KEY = 'myfitrout_language';
  const DEFAULT_LANG = 'pt';
  const SUPPORTED_LANGS = ['pt', 'en', 'es'];

  // Mapeamento de países para idiomas
  const COUNTRY_TO_LANG = {
    // Português
    'BR': 'pt', 'PT': 'pt', 'AO': 'pt', 'MZ': 'pt',
    // Espanhol
    'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 
    'CL': 'es', 'PE': 'es', 'VE': 'es', 'EC': 'es',
    'GT': 'es', 'CU': 'es', 'BO': 'es', 'DO': 'es',
    'HN': 'es', 'PY': 'es', 'SV': 'es', 'NI': 'es',
    'CR': 'es', 'PA': 'es', 'UY': 'es',
    // Inglês (default para resto do mundo)
  };

  // ====== ESTADO ======
  let currentLang = DEFAULT_LANG;
  let isInitialized = false;

  // ====== DETECÇÃO DE IDIOMA ======
  
  /**
   * Detecta idioma baseado em múltiplas fontes
   * Prioridade: 1) localStorage, 2) IP geolocalização, 3) Navegador, 4) Default
   */
  async function detectLanguage() {
    // 1. Verificar localStorage (preferência salva)
    const savedLang = localStorage.getItem(STORAGE_KEY);
    if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
      console.log('🌍 Idioma detectado (localStorage):', savedLang);
      return savedLang;
    }

    // 2. Detecção por IP usando ipapi.co (mesma API do app)
    try {
      const response = await fetch('https://ipapi.co/json/', {
        timeout: 3000 // 3 segundos de timeout
      });
      
      if (response.ok) {
        const data = await response.json();
        const countryCode = data.country_code;
        const detectedLang = COUNTRY_TO_LANG[countryCode] || 'en';
        
        console.log('🌍 Idioma detectado (IP):', {
          country: countryCode,
          language: detectedLang
        });
        
        return detectedLang;
      }
    } catch (error) {
      console.warn('⚠️ Falha na detecção por IP:', error.message);
    }

    // 3. Fallback: Idioma do navegador
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang) {
      const langCode = browserLang.split('-')[0].toLowerCase();
      if (SUPPORTED_LANGS.includes(langCode)) {
        console.log('🌍 Idioma detectado (navegador):', langCode);
        return langCode;
      }
    }

    // 4. Default
    console.log('🌍 Usando idioma padrão:', DEFAULT_LANG);
    return DEFAULT_LANG;
  }

  /**
   * Salva preferência de idioma
   */
  function saveLanguagePreference(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    console.log('💾 Idioma salvo:', lang);
  }

  // ====== APLICAÇÃO DAS TRADUÇÕES ======

  /**
   * Obtém tradução de uma chave no idioma atual
   */
  function getTranslation(key, lang = currentLang) {
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Retorna a chave se não encontrar tradução
      }
    }
    
    return value || key;
  }

  /**
   * Aplica traduções em elementos com data-i18n
   */
  function applyTranslations(lang) {
    currentLang = lang;
    
    // Atualizar elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = getTranslation(key, lang);
      
      if (translation) {
        element.textContent = translation;
      }
    });

    // Atualizar elementos com data-i18n-html (para conteúdo HTML)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      const translation = getTranslation(key, lang);
      
      if (translation) {
        element.innerHTML = translation;
      }
    });

    // Atualizar placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = getTranslation(key, lang);
      
      if (translation) {
        element.setAttribute('placeholder', translation);
      }
    });

    // Atualizar meta tags
    updateMetaTags(lang);

    // Atualizar atributo lang do HTML
    document.documentElement.setAttribute('lang', getLangCode(lang));

    console.log('✅ Traduções aplicadas para:', lang);
  }

  /**
   * Atualiza meta tags de SEO
   */
  function updateMetaTags(lang) {
    const meta = translations[lang].meta;
    
    // Title
    if (meta.title) {
      document.title = meta.title;
    }

    // Description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && meta.description) {
      descMeta.setAttribute('content', meta.description);
    }

    // Keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta && meta.keywords) {
      keywordsMeta.setAttribute('content', meta.keywords);
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && meta.title) {
      ogTitle.setAttribute('content', meta.title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && meta.description) {
      ogDesc.setAttribute('content', meta.description);
    }

    // Twitter
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle && meta.title) {
      twitterTitle.setAttribute('content', meta.title);
    }

    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc && meta.description) {
      twitterDesc.setAttribute('content', meta.description);
    }
  }

  /**
   * Converte código de idioma curto para código completo
   */
  function getLangCode(lang) {
    const codes = {
      'pt': 'pt-BR',
      'en': 'en-US',
      'es': 'es-ES'
    };
    return codes[lang] || 'en-US';
  }

  // ====== SELETOR DE IDIOMA ======

  /**
   * Cria botões de seleção de idioma
   */
  function createLanguageSelector() {
    const selector = document.createElement('div');
    selector.className = 'language-selector';
    selector.innerHTML = `
      <div class="flex items-center gap-2">
        <button data-lang="pt" class="lang-btn ${currentLang === 'pt' ? 'active' : ''}">
          🇧🇷 PT
        </button>
        <button data-lang="en" class="lang-btn ${currentLang === 'en' ? 'active' : ''}">
          🇺🇸 EN
        </button>
        <button data-lang="es" class="lang-btn ${currentLang === 'es' ? 'active' : ''}">
          🇪🇸 ES
        </button>
      </div>
    `;

    // Adicionar estilos inline
    const style = document.createElement('style');
    style.textContent = `
      .language-selector {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
      }
      .lang-btn {
        padding: 8px 16px;
        background: rgba(30, 41, 59, 0.8);
        border: 1px rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: rgba(148, 163, 184, 1);
        font-weight: 700;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s;
        backdrop-filter: blur(10px);
      }
      .lang-btn:hover {
        background: rgba(51, 65, 85, 0.8);
        color: white;
      }
      .lang-btn.active {
        background: linear-gradient(to right, rgb(79, 70, 229), rgb(147, 51, 234));
        color: white;
        border-color: rgba(99, 102, 241, 0.5);
      }
    `;
    document.head.appendChild(style);

    // Event listeners
    selector.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        changeLanguage(lang);
      });
    });

    return selector;
  }

  /**
   * Troca o idioma
   */
  function changeLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      console.error('❌ Idioma não suportado:', lang);
      return;
    }

    currentLang = lang;
    saveLanguagePreference(lang);
    applyTranslations(lang);
    updateActiveButton(lang);

    // Trigger custom event
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: lang } 
    }));
  }

  /**
   * Atualiza botão ativo do seletor
   */
  function updateActiveButton(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // ====== INICIALIZAÇÃO ======

  /**
   * Inicializa o sistema i18n
   */
  async function init() {
    if (isInitialized) return;

    console.log('🚀 Inicializando sistema i18n...');

    // Detectar idioma
    const detectedLang = await detectLanguage();
    currentLang = detectedLang;

    // Aplicar traduções
    applyTranslations(currentLang);

    // Adicionar seletor de idioma
    const selector = createLanguageSelector();
    document.body.appendChild(selector);

    isInitialized = true;
    console.log('✅ Sistema i18n inicializado com sucesso!');
  }

  // ====== API PÚBLICA ======

  window.MyFitRoutI18n = {
    init,
    changeLanguage,
    getCurrentLanguage: () => currentLang,
    getTranslation,
    SUPPORTED_LANGS
  };

  // Auto-inicializar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
