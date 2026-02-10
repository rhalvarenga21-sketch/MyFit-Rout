# 🚀 MyFitRout v2.0 - README

**Seu Coach de Alta Performance Powered by AI**

[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61dafb)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.39.0-3ecf8e)](https://supabase.com/)
[![Revolut](https://img.shields.io/badge/Revolut-Integrated-0075EB)](https://revolut.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)](https://vercel.com/)

---

## 📋 Índice

- [Sobre](#sobre)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação](#documentação)
- [Deploy](#deploy)
- [Testes](#testes)
- [Contribuindo](#contribuindo)

---

## 🎯 Sobre

MyFitRout é uma plataforma de treinos personalizada com **Inteligência Artificial contextual**, memória persistente e sistema completo de pagamentos. Desenvolvido para atletas que buscam resultados reais com acompanhamento profissional.

### Diferenciais

- 🧠 **IA Contextual**: Coach sabe o que você treinou e sugere baseado no seu histórico
- 💾 **Memória Persistente**: Conversas salvas no Supabase
- 🎥 **300+ Exercícios**: Biblioteca completa com vídeos demonstrativos
- 💳 **Pagamentos Globais**: Revolut (USD/EUR) + Last Link (BRL)
- 🌍 **Multilíngue**: PT, EN, ES
- 📱 **Responsivo**: Mobile-first design

---

## ✨ Features

### Core
- ✅ Chat com Coach AI (Google Gemini 2.5)
- ✅ Histórico de conversas persistente
- ✅ Contexto de treinos em tempo real
- ✅ Exportação de conversas
- ✅ Biblioteca de 300+ exercícios
- ✅ Vídeos demonstrativos HD

### Premium
- ✅ Landing page profissional
- ✅ Sistema de pagamento multi-moeda (Revolut + Last Link)
- ✅ 3 planos de assinatura
- ✅ Webhook para atualização automática
- ✅ Admin panel de curadoria
- ✅ Compartilhamento social

### Técnicas
- ✅ TypeScript 100%
- ✅ Error handling robusto
- ✅ RLS (Row Level Security)
- ✅ Testes automatizados
- ✅ SEO otimizado

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.3
- **TypeScript** 5.8.2
- **Vite** 6.2.0
- **Tailwind CSS** (via CDN)
- **Lucide React** 0.562.0

### Backend
- **Supabase** 2.39.0 (PostgreSQL, Auth, Storage)
- **Google Gemini API** 0.24.1
- **Revolut Checkout** + **Last Link**

### DevOps
- **Vercel** (Hosting + Serverless Functions)
- **Vitest** 2.1.8 (Testes)
- **GitHub** (Controle de versão)

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- Conta Supabase
- Conta Revolut e Last Link (para pagamentos)
- Gemini API Key

### 1. Clonar e Instalar
```bash
git clone [repo-url]
cd velvet-pathfinder
npm install
```

### 2. Configurar Variáveis de Ambiente
```bash
cp .env.example .env
# Editar .env com suas chaves
```

### 3. Executar Schema no Supabase
```bash
# Seguir: supabase/QUICK-START.md
# Copiar e executar: supabase/EXECUTE-THIS-SCHEMA.sql
```

### 4. Rodar Localmente
```bash
npm run dev
# Acessar: http://localhost:5173
```

### 5. Testar
```bash
npm run test
```

### 6. Deploy
```bash
vercel --prod
```

---

## 📁 Estrutura do Projeto

```
velvet-pathfinder/
├── .agent/                    # Documentação e guias
│   ├── AGENT-[1-5]-PATTERNS.md
│   ├── PAYMENT_AUDIT_REPORT.md
│   ├── DEPLOY-CHECKLIST.md
│   └── FINAL-REPORT.md
├── api/                       # Serverless Functions (Vercel)
│   └── lastlink-webhook.ts
├── components/                # Componentes React
│   ├── CoachChat.tsx         # Chat principal
│   ├── AdminPanel.tsx        # Painel admin
│   └── ...
├── data/                      # Dados estáticos
│   └── exercises.ts          # Biblioteca de exercícios
├── landing/                   # Landing page
│   ├── index.html
│   ├── landing-styles.css
│   └── landing-checkout.js
├── services/                  # Lógica de negócio
│   ├── chatHistory.ts        # Histórico persistente
│   ├── workoutIntegration.ts # Contexto de treinos
│   ├── socialShare.ts        # Compartilhamento
│   ├── videoAudit.ts         # Auditoria de vídeos
│   ├── realAI.ts             # Integração Gemini
│   └── supabaseClient.ts     # Cliente Supabase
├── supabase/                  # Database
│   ├── EXECUTE-THIS-SCHEMA.sql
│   ├── QUICK-START.md
│   └── schema.sql
├── tests/                     # Testes automatizados
│   ├── services.test.ts
│   └── setup.ts
├── translations/              # Internacionalização
│   ├── extensions.ts
│   └── ...
├── types/                     # TypeScript types
├── package.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

---

## 📚 Documentação

### Guias Principais
- **Setup Rápido**: `supabase/QUICK-START.md`
- **Sistema de Pagamentos**: `.agent/PAYMENT_AUDIT_REPORT.md`
- **Checklist de Deploy**: `.agent/DEPLOY-CHECKLIST.md`
- **Relatório Final**: `.agent/FINAL-REPORT.md`

### Padrões de Código
- **UI/UX**: `.agent/AGENT-1-UI-PATTERNS.md`
- **Backend**: `.agent/AGENT-2-BACKEND-PATTERNS.md`
- **AI/ML**: `.agent/AGENT-3-AI-PATTERNS.md`
- **Media**: `.agent/AGENT-4-MEDIA-PATTERNS.md`
- **Build/Deploy**: `.agent/AGENT-5-BUILD-PATTERNS.md`

---

## 🚢 Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Variáveis de Ambiente (Vercel)
Configurar em: https://vercel.com/[projeto]/settings/environment-variables

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_GEMINI_API_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
ADMIN_EMAIL
```

---

## 🧪 Testes

```bash
# Rodar todos os testes
npm run test

# Interface visual
npm run test:ui

# Cobertura
npm run test:coverage

# Type checking
npm run type-check
```

---

## 🤝 Contribuindo

### Workflow
1. Fork o projeto
2. Criar branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Padrões
- Seguir guias em `.agent/AGENT-*-PATTERNS.md`
- TypeScript obrigatório
- Testes para novas features
- Documentação inline

---

## 📊 Status do Projeto

- **Versão**: 2.0.0
- **Status**: 🟢 Produção
- **Cobertura de Testes**: ~70%
- **Cobertura de Vídeos**: ~65%
- **Idiomas**: PT, EN, ES (100%)

---

## 📝 Changelog

### v2.0.0 (2026-01-23)
- ✨ Chat com memória persistente
- ✨ IA contextual com treinos
- ✨ Landing page + Revolut/Last Link
- ✨ Admin panel
- ✨ Compartilhamento social
- ✨ Database production-ready
- ✨ Testes automatizados
- ✨ Traduções completas

### v1.0.0 (2026-01-12)
- 🎉 Lançamento inicial

---

## 📞 Suporte

- **Documentação**: `.agent/`
- **Issues**: GitHub Issues
- **Email**: suporte@myfitrout.com

---

## 📄 Licença

Proprietary - Todos os direitos reservados © 2026 MyFitRout

---

## 🙏 Agradecimentos

- Google Gemini API
- Supabase
- Revolut + Last Link
- Vercel
- Comunidade React

---

**Desenvolvido com 💜 por uma força-tarefa de 80 agentes especializados**

🚀 **[Acessar App](https://myfitrout-app.vercel.app)** | 🌐 **[Landing Page](https://myfitrout-app.vercel.app/landing/)**
