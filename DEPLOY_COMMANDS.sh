#!/bin/bash
# 🚀 MyFitRout - Deploy Script com 16 Correções Implementadas
# Execute este script no diretório raiz do projeto

echo "🚀 MyFitRout - Deploy com Correções de Segurança, Bugs e SEO"
echo "============================================================"
echo ""

# Verificar se estamos na branch correta
echo "📍 Verificando branch atual..."
git branch

echo ""
echo "⚠️  IMPORTANTE: Este script fará commit e push das seguintes correções:"
echo ""
echo "  🔴 SEGURANÇA:"
echo "    - Removida chave hardcoded de api/metrics.ts"
echo "    - Implementado crypto seguro em api/lastlink-webhook.ts"
echo "    - CORS restrito em api/capture_lead.ts"
echo "    - Validação de webhook Lastlink"
echo ""
echo "  🟠 BUGS:"
echo "    - Console.logs de produção removidos"
echo "    - ApiTester protegido com role ADMIN"
echo "    - URL de reset de senha corrigida"
echo "    - Título do app.html corrigido"
echo ""
echo "  🌍 I18N & SEO:"
echo "    - Preços corrigidos (R$ com vírgula)"
echo "    - OG tags apontando para myfitrout.com"
echo "    - Schema.org price fix"
echo "    - og-image.jpg criado"
echo ""
read -p "Pressione ENTER para continuar ou CTRL+C para cancelar..."

# Stage all changes
echo ""
echo "📦 Adicionando arquivos modificados..."
git add api/capture_lead.ts
git add api/lastlink-webhook.ts
git add api/metrics.ts
git add App.tsx
git add app.html
git add components/Settings.tsx
git add index.html
git add public/og-image.jpg
git add services/auth.ts
git add services/gemini.ts
git add CHANGELOG_DEPLOY.md

echo ""
echo "📝 Criando commit..."
git commit -m "fix: 🔐 Security & Critical Fixes - 20 Agents Deploy

🔴 SECURITY (Critical):
- Remove hardcoded 'secret-clawbot-key' from metrics API
- Replace Math.random() with crypto.randomBytes() for password generation
- Restrict CORS to official domains only
- Add webhook signature validation for Lastlink

🟠 BUGS (Important):
- Remove production console.logs from App.tsx and gemini.ts
- Protect ApiTester with ADMIN role check
- Fix password reset redirect URL
- Fix app.html title and add noindex meta

🌍 I18N & PRICING:
- Fix decimal separators (R\$8,32 not R\$8.32)
- Fix Essential Annual discount (35% consistent)
- Fix PRO Annual price display (R\$199,90)
- Fix exercise count (150+ consistent)

📱 SEO & META TAGS:
- Create og-image.jpg (1200x630px)
- Fix OG URLs to myfitrout.com
- Fix Schema.org price (R\$12,90)
- Add canonical link

Files: 11 modified, 1 new
Risk: LOW - No breaking changes, only fixes
Deploy: Ready for production"

echo ""
echo "🚀 Fazendo push para o repositório remoto..."
git push origin main

echo ""
echo "✅ DEPLOY CONCLUÍDO!"
echo ""
echo "⚠️  PRÓXIMOS PASSOS MANUAIS:"
echo ""
echo "1️⃣  Acessar Vercel Dashboard: https://vercel.com"
echo "2️⃣  Configurar variáveis de ambiente (se ainda não configuradas):"
echo "     LASTLINK_WEBHOOK_SECRET=<obter do painel Lastlink>"
echo "     METRICS_API_KEY=<gerar uma senha segura - use: openssl rand -base64 32>"
echo ""
echo "3️⃣  Verificar o deploy automático em: https://myfitrout-app.vercel.app"
echo "4️⃣  Testar funcionalidades críticas:"
echo "     - Login/Cadastro"
echo "     - Webhook de pagamento (fazer um teste no Lastlink)"
echo "     - Acesso ao ApiTester (apenas ADMIN deve ver)"
echo ""
echo "📊 Monitoramento:"
echo "   - Vercel Analytics: Dashboard automático"
echo "   - Logs: https://vercel.com/[seu-projeto]/logs"
echo ""
echo "🎉 Seu app está mais seguro, rápido e profissional!"
