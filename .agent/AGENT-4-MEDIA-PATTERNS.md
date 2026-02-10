# Agent 4: Media & Assets Patterns - MyFitRout

## Stack Atual
- **Vídeos**: YouTube embeds
- **Imagens**: Google Fonts, Lucide Icons
- **Fontes**: Inter (Google Fonts)

## Estrutura de Exercícios

### 1. Modelo de Exercício
```typescript
export interface Exercise {
    id: string;
    name: {
        PT: string;
        EN: string;
        ES: string;
    };
    muscleGroup: string;
    difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    equipment: string[];
    videoUrl?: string;
    executionTips: {
        PT: string[];
        EN: string[];
        ES: string[];
    };
    commonMistakes: {
        PT: string[];
        EN: string[];
        ES: string[];
    };
}
```

### 2. Biblioteca de Exercícios (exercises.ts)
```typescript
export const EXERCISE_LIBRARY: Exercise[] = [
    {
        id: 'bench-press',
        name: {
            PT: 'Supino Reto',
            EN: 'Bench Press',
            ES: 'Press de Banca'
        },
        muscleGroup: 'CHEST',
        difficulty: 'INTERMEDIATE',
        equipment: ['Barra', 'Banco'],
        videoUrl: 'https://www.youtube.com/watch?v=example',
        executionTips: {
            PT: [
                'Mantenha os pés firmes no chão',
                'Escápulas retraídas',
                'Barra na linha dos mamilos'
            ],
            EN: [
                'Keep feet flat on the ground',
                'Retract shoulder blades',
                'Bar at nipple line'
            ],
            ES: [
                'Mantén los pies firmes en el suelo',
                'Escápulas retraídas',
                'Barra a la altura de los pezones'
            ]
        },
        commonMistakes: {
            PT: [
                'Arquear demais as costas',
                'Não tocar a barra no peito',
                'Pés instáveis'
            ],
            EN: [
                'Excessive back arch',
                'Not touching bar to chest',
                'Unstable feet'
            ],
            ES: [
                'Arquear demasiado la espalda',
                'No tocar la barra en el pecho',
                'Pies inestables'
            ]
        }
    }
];
```

### 3. Player de Vídeo (ExerciseVideoPlayer.tsx)
```typescript
import React from 'react';

interface VideoPlayerProps {
    videoUrl: string;
    exerciseName: string;
}

export const ExerciseVideoPlayer: React.FC<VideoPlayerProps> = ({ 
    videoUrl, 
    exerciseName 
}) => {
    // Extrai ID do YouTube
    const getYouTubeId = (url: string): string | null => {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
            /youtube\.com\/embed\/([^&\n?#]+)/
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return null;
    };

    const videoId = getYouTubeId(videoUrl);
    
    if (!videoId) {
        return (
            <div className="bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-sm">Vídeo não disponível</p>
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={exerciseName}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
};
```

### 4. Validação de Links de Vídeo
```typescript
export const validateVideoUrl = (url: string): boolean => {
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubePattern.test(url);
};

export const isYouTubeShort = (url: string): boolean => {
    return url.includes('/shorts/');
};

export const normalizeYouTubeUrl = (url: string): string => {
    const videoId = getYouTubeId(url);
    if (!videoId) return url;
    return `https://www.youtube.com/watch?v=${videoId}`;
};
```

### 5. Categorização de Exercícios
```typescript
export const MUSCLE_GROUPS = {
    CHEST: 'Peito',
    BACK: 'Costas',
    SHOULDERS: 'Ombros',
    BICEPS: 'Bíceps',
    TRICEPS: 'Tríceps',
    LEGS: 'Pernas',
    GLUTES: 'Glúteos',
    CALVES: 'Panturrilhas',
    ABS: 'Abdômen',
    CARDIO: 'Cardio'
} as const;

export const filterExercisesByMuscle = (
    exercises: Exercise[], 
    muscleGroup: string
): Exercise[] => {
    if (muscleGroup === 'ALL') return exercises;
    return exercises.filter(ex => ex.muscleGroup === muscleGroup);
};

export const filterExercisesByDifficulty = (
    exercises: Exercise[], 
    difficulty: string
): Exercise[] => {
    return exercises.filter(ex => ex.difficulty === difficulty);
};
```

### 6. Busca de Exercícios
```typescript
export const searchExercises = (
    exercises: Exercise[], 
    query: string, 
    language: Language
): Exercise[] => {
    const lowerQuery = query.toLowerCase();
    
    return exercises.filter(ex => {
        const name = ex.name[language].toLowerCase();
        const muscleGroup = ex.muscleGroup.toLowerCase();
        
        return name.includes(lowerQuery) || 
               muscleGroup.includes(lowerQuery);
    });
};
```

## Otimização de Imagens

### 1. Lazy Loading
```typescript
<img 
    src={imageUrl} 
    alt={description}
    loading="lazy"
    className="w-full h-auto"
/>
```

### 2. Placeholder durante carregamento
```typescript
const [imageLoaded, setImageLoaded] = useState(false);

<div className="relative">
    {!imageLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse" />
    )}
    <img 
        src={imageUrl}
        onLoad={() => setImageLoaded(true)}
        className={`transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
    />
</div>
```

## Fontes

### Google Fonts (index.html)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### CSS Global
```css
body {
    font-family: 'Inter', sans-serif;
}
```

## Ícones (Lucide React)

### Importação
```typescript
import { 
    Sparkles, 
    Zap, 
    Dumbbell, 
    Heart, 
    TrendingUp,
    Play,
    Pause,
    CheckCircle2
} from 'lucide-react';
```

### Uso
```typescript
<Sparkles size={24} className="text-indigo-400" />
<Zap size={16} className="text-amber-500 fill-amber-500" />
```

## Auditoria de Vídeos

### Checklist
- [ ] URL válida (YouTube)
- [ ] Vídeo acessível (não privado)
- [ ] Demonstração clara do exercício
- [ ] Sem links duplicados
- [ ] Qualidade mínima 720p
- [ ] Idioma compatível (PT/EN/ES)

### Script de Validação
```typescript
export const auditVideoLinks = async (exercises: Exercise[]) => {
    const report = {
        total: exercises.length,
        withVideo: 0,
        withoutVideo: 0,
        invalidUrls: [] as string[],
        duplicates: [] as string[]
    };

    const seenUrls = new Set<string>();

    for (const exercise of exercises) {
        if (exercise.videoUrl) {
            report.withVideo++;
            
            if (!validateVideoUrl(exercise.videoUrl)) {
                report.invalidUrls.push(exercise.id);
            }
            
            if (seenUrls.has(exercise.videoUrl)) {
                report.duplicates.push(exercise.id);
            }
            seenUrls.add(exercise.videoUrl);
        } else {
            report.withoutVideo++;
        }
    }

    return report;
};
```

## Regras de Ouro

1. **Sempre valide URLs** - Antes de salvar
2. **Lazy loading** - Para imagens e vídeos
3. **Fallback UI** - Para vídeos indisponíveis
4. **Multilíngue** - Todos os textos traduzidos
5. **Aspect ratio** - Manter proporções corretas
6. **Acessibilidade** - Alt text e títulos descritivos

## Anti-Patterns (Evitar)

❌ URLs hardcoded sem validação
❌ Vídeos autoplay sem controle do usuário
❌ Imagens sem lazy loading
❌ Textos sem tradução
❌ Links duplicados
❌ Vídeos privados ou removidos
