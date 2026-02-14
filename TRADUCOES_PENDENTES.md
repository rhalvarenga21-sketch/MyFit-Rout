\# 🔧 CORREÇÕES DE TRADUÇÕES PENDENTES



\## ✅ CONCLUÍDO:

\- translations.ts atualizado com PT/EN/ES



\## ⏳ PENDENTE - Corrigir Componentes:



\### 1. PaymentModal.tsx (Linha 78)

\*\*ANTES:\*\*

```tsx

placeholder="John Doe"

```



\*\*DEPOIS:\*\*

```tsx

placeholder={t.payment.cardNamePlaceholder}

```



---



\### 2. SocialShareModal.tsx (Linhas 26-66)

\*\*REMOVER:\*\* Todo o objeto `messages` hardcoded



\*\*SUBSTITUIR POR:\*\* Usar `t.socialShare`



\*\*Código correto:\*\*

```tsx

// No topo do componente

const t = translations\[language];



// Depois usar:

{t.socialShare.header}

{t.socialShare.copy}

{t.socialShare.download}

{t.socialShare.join}

```



---



\### 3. ExerciseVideoPlayer.tsx (Linha 10)

\*\*ANTES:\*\*

```tsx

"Coming Soon"

```



\*\*DEPOIS:\*\*

```tsx

{t.videoPlayer.comingSoon}

```



---



\### 4. CoachChat.tsx (Linha 347)

\*\*ANTES:\*\*

```tsx

title="Exportar Chat"

```



\*\*DEPOIS:\*\*

```tsx

title={t.videoPlayer.exportChat}

```



---



\### 5. DebugConsole.tsx (Linha 39)

\*\*ANTES:\*\*

```tsx

title="Copy Logs"

```



\*\*DEPOIS:\*\*

```tsx

title={t.videoPlayer.copyLogs}

```



---



\### 6. ActiveWorkout.tsx (Linha 499)

\*\*ANTES:\*\*

```tsx

title={t.activeWorkout?.swap || "Swap Exercise"}

```



\*\*DEPOIS:\*\*

```tsx

title={t.videoPlayer.swapExercise}

```



E adicionar em translations.ts:

```typescript

activeWorkout: {

&nbsp; swap: "Trocar Exercício" // PT

&nbsp; swap: "Swap Exercise"    // EN

&nbsp; swap: "Cambiar Ejercicio" // ES

}

```



---



\## 🚀 PRÓXIMOS PASSOS:

1\. Corrigir cada componente acima

2\. Testar troca de idioma

3\. Commit: "Fix hardcoded texts in components - use translation system"

