# 🎯 INSTRUÇÃO PARA ADICIONAR VÍDEO - TESTE DE SINCRONIZAÇÃO

## ⚠️ IMPORTANTE: Faça isso no seu projeto ORIGINAL (não nesta cópia)

### 📍 Localização do Arquivo:
`data/exercises.ts`

### 🔍 Procure por esta linha (aproximadamente linha 113):
```typescript
  {
    id: "Sentadilla trasera — Barra alta",
    name: {
      [Language.PT]: "Agachamento com barra (costas) (Barra alta)",
      [Language.EN]: "Back Squat (High bar)",
      [Language.ES]: "Sentadilla trasera (Barra alta)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Depth + neutral spine"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",  // ← ESTA LINHA ESTÁ VAZIA
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },
```

### ✏️ Mude APENAS esta linha:
**DE:**
```typescript
    videoUrl: "",
```

**PARA:**
```typescript
    videoUrl: "nhoikoUEI8U",
```

### 💾 Depois de salvar:
```bash
git add data/exercises.ts
git commit -m "test: add video to Back Squat High bar"
git push
```

### ✅ Resultado Esperado:
- Vercel detectará automaticamente a mudança
- Fará deploy em 1-2 minutos
- O vídeo aparecerá no app

---

**Vídeo adicionado:** High Bar Back Squat Tutorial
**ID do YouTube:** nhoikoUEI8U
**Duração:** ~60 segundos
