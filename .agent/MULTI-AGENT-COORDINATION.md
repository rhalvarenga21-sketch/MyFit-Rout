# MyFitRout - Guia de Coordenação Multi-Agente

## 📋 Visão Geral

Este documento coordena o trabalho de 5 agentes especializados trabalhando em paralelo no MyFitRout. Cada agente tem seu próprio domínio de expertise e deve seguir os padrões definidos em seus respectivos guias.

## 🤖 Agentes e Responsabilidades

### Agent 1: UI/UX Specialist
**Arquivo**: `AGENT-1-UI-PATTERNS.md`
**Domínio**: React, TypeScript, Tailwind CSS, Componentes Visuais
**Responsabilidades**:
- Criar e manter componentes React
- Implementar design system
- Garantir responsividade
- Animações e transições
- Acessibilidade (a11y)

### Agent 2: Backend Specialist
**Arquivo**: `AGENT-2-BACKEND-PATTERNS.md`
**Domínio**: Supabase, PostgreSQL, Autenticação, Database
**Responsabilidades**:
- CRUD operations
- Autenticação e autorização
- Real-time subscriptions
- Storage de arquivos
- Schema do banco de dados

### Agent 3: AI/ML Specialist
**Arquivo**: `AGENT-3-AI-PATTERNS.md`
**Domínio**: Google Gemini API, Processamento de Linguagem
**Responsabilidades**:
- Integração com Gemini API
- Sistema de quota
- Extração de metadados
- Histórico de conversação
- Otimização de prompts

### Agent 4: Media Specialist
**Arquivo**: `AGENT-4-MEDIA-PATTERNS.md`
**Domínio**: Vídeos, Imagens, Assets, Biblioteca de Exercícios
**Responsabilidades**:
- Gerenciamento de vídeos
- Biblioteca de exercícios
- Validação de URLs
- Otimização de mídia
- Multilíngue (PT/EN/ES)

### Agent 5: Build & Deploy Specialist
**Arquivo**: `AGENT-5-BUILD-PATTERNS.md`
**Domínio**: Vite, Vercel, CI/CD, Performance
**Responsabilidades**:
- Configuração de build
- Deploy para produção
- Otimizações de performance
- Variáveis de ambiente
- Monitoramento

## 🔄 Workflow de Colaboração

### 1. Antes de Começar
Cada agente deve:
1. Ler seu guia de padrões específico
2. Verificar dependências com outros agentes
3. Consultar este documento para coordenação
4. Verificar o estado atual do projeto

### 2. Durante o Desenvolvimento
- **Comunicação**: Documentar mudanças que afetam outros agentes
- **Padrões**: Seguir rigorosamente os padrões definidos
- **Testes**: Validar antes de integrar
- **Conflitos**: Resolver via este documento

### 3. Após Implementação
- Atualizar documentação se necessário
- Notificar agentes dependentes
- Validar integração end-to-end

## 🔗 Matriz de Dependências

| Agente | Depende de | É dependência de |
|--------|-----------|------------------|
| UI/UX | Backend, AI, Media | - |
| Backend | - | UI/UX, AI |
| AI | Backend | UI/UX |
| Media | - | UI/UX |
| Build | Todos | Todos |

## 📝 Regras Universais

### 1. TypeScript First
```typescript
// ✅ Sempre tipar
interface Props {
    value: string;
    onChange: (value: string) => void;
}

// ❌ Nunca usar any
const data: any = {};
```

### 2. Translations Obrigatórias
```typescript
// ✅ Usar translations
const t = translations[lang];
<p>{t.welcome}</p>

// ❌ Hardcoded
<p>Welcome</p>
```

### 3. Error Handling
```typescript
// ✅ Sempre tratar erros
try {
    await operation();
} catch (error) {
    console.error('Operation failed:', error);
    // UI feedback
}

// ❌ Ignorar erros
await operation(); // Pode falhar silenciosamente
```

### 4. Naming Conventions
```typescript
// Componentes: PascalCase
export const UserProfile: React.FC = () => {};

// Funções: camelCase
export const getUserData = () => {};

// Constantes: UPPER_SNAKE_CASE
export const API_BASE_URL = '';

// Interfaces: PascalCase com 'I' opcional
export interface UserData {}
```

### 5. File Organization
```
src/
├── components/     # Agent 1 (UI)
├── services/       # Agent 2 (Backend) + Agent 3 (AI)
├── data/          # Agent 4 (Media)
├── types/         # Shared
├── translations/  # Shared
└── utils/         # Shared
```

## 🚨 Resolução de Conflitos

### Cenário 1: Mudança de Interface
**Problema**: Agent 2 muda estrutura de dados
**Solução**:
1. Agent 2 atualiza types em `types/index.ts`
2. Agent 2 notifica Agent 1 e Agent 3
3. Agents afetados atualizam código
4. Agent 5 valida build

### Cenário 2: Nova Feature
**Problema**: Feature requer mudanças em múltiplos domínios
**Solução**:
1. Definir interface no início
2. Cada agent implementa sua parte
3. Integração incremental
4. Validação conjunta

### Cenário 3: Performance Issue
**Problema**: Bundle size muito grande
**Solução**:
1. Agent 5 identifica problema
2. Agent 1 implementa lazy loading
3. Agent 5 valida melhoria
4. Deploy

## 📊 Checklist de Qualidade

### Para Todos os Agentes
- [ ] TypeScript sem erros
- [ ] Sem console.log em produção
- [ ] Translations completas
- [ ] Error handling implementado
- [ ] Código documentado

### Agent 1 (UI)
- [ ] Responsivo (mobile-first)
- [ ] Acessibilidade (a11y)
- [ ] Animações suaves
- [ ] Design system seguido

### Agent 2 (Backend)
- [ ] RLS configurado
- [ ] Índices criados
- [ ] Validação client-side
- [ ] Tratamento de erros

### Agent 3 (AI)
- [ ] Quota implementada
- [ ] Fallback configurado
- [ ] Histórico filtrado
- [ ] Prompts otimizados

### Agent 4 (Media)
- [ ] URLs validadas
- [ ] Lazy loading ativo
- [ ] Multilíngue completo
- [ ] Fallback UI

### Agent 5 (Build)
- [ ] Build sem warnings
- [ ] Bundle size OK
- [ ] Env vars configuradas
- [ ] Deploy testado

## 🎯 Objetivos de Performance

### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90
- **Bundle Size**: < 500kb (inicial)

### Responsabilidades
- **Agent 1**: Otimizar componentes, lazy loading
- **Agent 2**: Queries eficientes, índices
- **Agent 3**: Respostas rápidas, cache
- **Agent 4**: Imagens otimizadas, lazy loading
- **Agent 5**: Code splitting, minificação

## 📚 Recursos Compartilhados

### Types (types/index.ts)
```typescript
export interface UserProfile {
    id: string;
    name: string;
    email: string;
    age: number;
    weight: number;
    height: number;
    goal: FitnessGoal;
    subscription: SubscriptionType;
}

export enum Language {
    PT = 'PT',
    EN = 'EN',
    ES = 'ES'
}

export enum FitnessGoal {
    LOSE = 'LOSE',
    GAIN = 'GAIN',
    HEALTH = 'HEALTH',
    STRENGTHEN = 'STRENGTHEN'
}
```

### Translations (translations.ts)
- Estrutura compartilhada
- Todos os agentes devem adicionar suas chaves
- Manter sincronizado entre idiomas

### Environment Variables
```env
# Shared
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GEMINI_API_KEY=
```

## 🔄 Processo de Deploy

1. **Agent 1-4**: Implementam features
2. **Agent 5**: Valida build local
3. **Agent 5**: Deploy para preview
4. **Todos**: Validam preview
5. **Agent 5**: Deploy para produção
6. **Todos**: Monitoram métricas

## 📞 Comunicação

### Quando Notificar Outros Agentes
- Mudança em interfaces compartilhadas
- Nova dependência adicionada
- Breaking change
- Performance issue detectado
- Bug crítico encontrado

### Como Notificar
- Atualizar este documento
- Comentar no código
- Documentar em CHANGELOG.md

## 🎓 Onboarding de Novos Agentes

1. Ler este documento
2. Ler guia específico do domínio
3. Revisar código existente
4. Fazer pequena contribuição de teste
5. Validar com agent experiente

---

**Última Atualização**: 2026-01-23
**Versão**: 1.0.0
**Mantido por**: Agent Coordinator
