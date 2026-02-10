# 🤖 Guia: AI Coach & Google Play

## 1. Conectando o AI Coach (Vital) na Versão Online

Para que a Inteligência Artificial funcione no link público (`myfitrout-app.vercel.app`), você precisa configurar a chave de segurança na Vercel. Por motivos de segurança, as chaves do seu computador não sobem automaticamente.

### Passo a Passo Rápido:
1. Acesse o [Painel da Vercel](https://vercel.com/dashboard).
2. Selecione o projeto **myfitrout-app**.
3. Vá em **Settings** (Configurações) > **Environment Variables** (Variáveis de Ambiente).
4. Adicione uma nova variável:
   - **Key (Nome):** `VITE_GEMINI_API_KEY`
   - **Value (Valor):** `AIzaSyAsCFHIvtOFBcCQ25Pe5o8kEsbjo1bPUr4` *(Sua chave atual do .env)*
5. Clique em **Save**.
6. **Importante:** Vá na aba **Deployments**, clique nos três pontinhos do último deploy e selecione **Redeploy** para que a chave comece a funcionar.

---

## 2. Publicando na Google Play Store (Android)

Seu aplicativo é tecnicamente um "Web App" (PWA). Para entrar na Play Store, precisamos transformá-lo em uma **TWA (Trusted Web Activity)**.

### O Que Você Precisa:
1. **Conta de Desenvolvedor Google Play**: Custa US$ 25 (taxa única). [Criar aqui](https://play.google.com/console).
2. **Transformar em APK/AAB**: Usar uma ferramenta que "empacota" seu site como um app.

### Caminho Recomendado (Mais Fácil): **PWABuilder**

1. **Torne o App "Instalável" (PWA)**:
   - Precisamos adicionar um arquivo `manifest.json` e ícones no código (eu posso fazer isso para você agora).
2. **Gere o Pacote**:
   - Acesse [PWABuilder.com](https://www.pwabuilder.com/).
   - Digite a URL do seu app: `https://myfitrout-app.vercel.app`.
   - Clique em **Build for Store**.
   - Escolha **Android** e baixe o pacote.
3. **Suba na Play Store**:
   - No Google Play Console, crie um novo app.
   - Suba o arquivo `.aab` que o PWABuilder gerou.
   - Preencha as informações (Nome, Ícone, Capturas de Tela, Descrição).
   - Envie para revisão.

### Deseja que eu configure o modo PWA agora?
Isso ativará o botão "Instalar App" para quem acessa pelo navegador e é o primeiro passo obrigatório para a Google Play.
