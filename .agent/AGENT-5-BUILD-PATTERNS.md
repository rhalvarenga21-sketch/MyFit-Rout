# Agent 5: Build & Deploy Patterns - MyFitRout

## Stack Atual
- **Build Tool**: Vite 6.2.0
- **Deployment**: Vercel
- **Package Manager**: npm
- **TypeScript**: 5.8.2

## Configuração Vite

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'lucide-vendor': ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});
```

## Package.json

### Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  }
}
```

### Dependencies
```json
{
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "@supabase/supabase-js": "^2.39.0",
    "lucide-react": "^0.562.0",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "recharts": "^3.6.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
```

## TypeScript Configuration

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Variáveis de Ambiente

### .env (Local Development)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GEMINI_API_KEY=your-gemini-key
```

### .env.production (Vercel)
```env
# Configurado no dashboard da Vercel
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GEMINI_API_KEY=
```

### Acesso no código
```typescript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
```

## Vercel Deployment

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Deploy via CLI
```bash
# Produção
vercel --prod

# Produção com force rebuild
vercel --prod --force

# Preview
vercel
```

### Deploy automático (Git)
- Push para `main` → Deploy automático em produção
- Pull Request → Deploy de preview

## Otimizações de Build

### 1. Code Splitting
```typescript
// Lazy loading de componentes
const CoachChat = lazy(() => import('./components/CoachChat'));

// Uso
<Suspense fallback={<LoadingSpinner />}>
  <CoachChat />
</Suspense>
```

### 2. Tree Shaking
```typescript
// ✅ Bom - Import específico
import { Sparkles } from 'lucide-react';

// ❌ Ruim - Import geral
import * as Icons from 'lucide-react';
```

### 3. Minificação
- CSS: Automático via Vite
- JS: Terser (configurado)
- HTML: Automático

### 4. Compression
```typescript
// Vercel faz automaticamente
// Gzip e Brotli habilitados
```

## Performance Checklist

### Build Time
- [ ] Dependencies atualizadas
- [ ] Sem warnings no build
- [ ] Source maps desabilitados em produção
- [ ] Tree shaking ativo
- [ ] Code splitting configurado

### Runtime
- [ ] Lazy loading de rotas/componentes
- [ ] Imagens otimizadas
- [ ] Fonts preloaded
- [ ] CSS crítico inline
- [ ] Service Worker (PWA) - futuro

## Comandos Úteis

### Development
```bash
# Iniciar dev server
npm run dev

# Type checking
npm run type-check

# Build local
npm run build

# Preview do build
npm run preview
```

### Production
```bash
# Deploy para produção
vercel --prod --force

# Ver logs
vercel logs

# Ver deployments
vercel ls
```

### Maintenance
```bash
# Atualizar dependências
npm update

# Verificar vulnerabilidades
npm audit

# Limpar cache
rm -rf node_modules dist
npm install
```

## CI/CD Pipeline (Futuro)

### GitHub Actions
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Monitoramento

### Vercel Analytics
- Habilitado automaticamente
- Web Vitals tracking
- Real User Monitoring (RUM)

### Error Tracking (Futuro)
- Sentry integration
- Error boundaries em React
- Logging estruturado

## Regras de Ouro

1. **Sempre teste o build** - `npm run build` antes de deploy
2. **Variáveis de ambiente** - Nunca commitar .env
3. **Type checking** - Rodar antes de deploy
4. **Versionamento** - Semantic versioning
5. **Rollback plan** - Manter deploys anteriores
6. **Performance budget** - Monitorar bundle size

## Anti-Patterns (Evitar)

❌ Build sem type check
❌ Variáveis hardcoded
❌ Dependencies desatualizadas
❌ Source maps em produção
❌ Console.log em produção
❌ Bundle size > 500kb (inicial)

## Bundle Analysis

### Comando
```bash
npm run build -- --mode analyze
```

### Targets
- Initial bundle: < 300kb
- Lazy chunks: < 100kb cada
- Total: < 1MB

## Deployment Checklist

- [ ] Type check passou
- [ ] Build local funcionou
- [ ] Variáveis de ambiente configuradas
- [ ] .env não commitado
- [ ] Tests passaram (quando implementados)
- [ ] Performance OK (Lighthouse > 90)
- [ ] SEO OK (meta tags)
- [ ] Acessibilidade OK (a11y)
