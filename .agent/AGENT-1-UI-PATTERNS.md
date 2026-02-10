# Agent 1: UI/UX Patterns - MyFitRout

## Stack Atual
- **React**: 19.2.3
- **TypeScript**: 5.8.2
- **Tailwind CSS**: Via CDN (latest)
- **Lucide React**: 0.562.0 (ícones)

## Padrões de Componentes

### 1. Estrutura de Componente Funcional
```typescript
import React, { useState, useRef, useEffect } from 'react';
import { IconName } from 'lucide-react';
import { Language, UserProfile } from '../types';
import { translations } from '../translations';

interface ComponentProps {
    profile: UserProfile;
    lang: Language;
    onAction: () => void;
}

export const ComponentName: React.FC<ComponentProps> = ({
    profile,
    lang,
    onAction
}) => {
    const t = translations[lang] as any;
    const [state, setState] = useState<Type>(initialValue);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Side effects
    }, [dependencies]);

    return (
        <div className="container-classes">
            {/* JSX */}
        </div>
    );
};
```

### 2. Sistema de Cores Premium (Padrão MyFitRout)
```css
/* Backgrounds */
bg-slate-900          /* Background principal */
bg-slate-800          /* Cards e containers */
bg-slate-800/90       /* Cards com transparência */
bg-slate-800/40       /* Hover states */

/* Acentos */
bg-indigo-600         /* Primary actions */
bg-indigo-500         /* Hover primary */
bg-indigo-500/10      /* Subtle highlights */
bg-indigo-500/20      /* Hover highlights */

/* Bordas */
border-white/5        /* Bordas sutis */
border-white/10       /* Bordas visíveis */
border-indigo-500/30  /* Bordas com acento */

/* Texto */
text-white            /* Texto principal */
text-slate-100        /* Texto secundário */
text-slate-400        /* Texto terciário */
text-indigo-400       /* Links e destaques */
```

### 3. Glassmorphism Pattern
```typescript
<div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
    {/* Content */}
</div>
```

### 4. Botões Premium
```typescript
// Primary Action
<button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg">
    Action
</button>

// Secondary Action
<button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-bold transition-all border border-white/5">
    Action
</button>

// Chip/Tag
<button className="px-3 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[10px] font-bold text-indigo-300 hover:bg-indigo-500/20 transition-all">
    Tag
</button>
```

### 5. Animações e Transições
```typescript
// Fade in
className="animate-in fade-in duration-500"

// Slide in from bottom
className="animate-in slide-in-from-bottom-2 duration-300"

// Hover scale
className="transition-all hover:scale-105"

// Active press
className="active:scale-95 transition-all"

// Loading bounce
<span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" 
      style={{ animationDelay: '0ms' }} />
```

### 6. Tipografia
```typescript
// Headers
className="text-4xl font-black italic uppercase tracking-tighter text-white"

// Subheaders
className="text-lg font-black uppercase tracking-tighter text-white"

// Body
className="text-sm font-medium text-slate-100"

// Small labels
className="text-[10px] font-black uppercase tracking-widest text-slate-400"
```

### 7. Layout Responsivo
```typescript
// Container padrão
<div className="max-w-2xl mx-auto w-full px-4">
    {/* Content */}
</div>

// Grid responsivo
<div className="grid grid-cols-2 gap-3">
    {/* Items */}
</div>

// Flex com gap
<div className="flex items-center gap-3">
    {/* Items */}
</div>
```

### 8. Scroll Customizado
```css
/* No CSS global */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #1e293b;
}

::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 10px;
}

/* No componente */
className="overflow-y-auto scrollbar-hide"
```

### 9. Estados de Loading
```typescript
{loading && (
    <div className="flex justify-center">
        <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" 
                  style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" 
                  style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" 
                  style={{ animationDelay: '300ms' }} />
        </div>
    </div>
)}
```

### 10. Ícones (Lucide React)
```typescript
import { Sparkles, Zap, Dumbbell, ChevronLeft } from 'lucide-react';

// Uso padrão
<Sparkles size={18} className="text-indigo-400" />

// Com fill
<Zap size={10} className="text-amber-500 fill-amber-500" />
```

## Regras de Ouro

1. **Sempre use TypeScript** - Tipos explícitos para props e state
2. **Translations first** - Nunca hardcode texto, sempre use `translations[lang]`
3. **Mobile-first** - Design responsivo por padrão
4. **Acessibilidade** - IDs únicos, labels descritivos
5. **Performance** - useCallback e useMemo quando necessário
6. **Consistência** - Siga os padrões de cores e espaçamento acima

## Anti-Patterns (Evitar)

❌ Cores genéricas (red, blue, green)
❌ Fontes do sistema (usar Inter via Google Fonts)
❌ Inline styles (usar Tailwind)
❌ Magic numbers (usar variáveis semânticas)
❌ Texto hardcoded (usar translations)
