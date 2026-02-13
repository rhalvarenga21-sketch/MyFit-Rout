import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  console.log("\n" + "=".repeat(60));
  console.log("🔔 WEBHOOK EVENT RECEIVED - " + new Date().toISOString());
  console.log("=".repeat(60));

  // Health check (GET)
  if (req.method === 'GET') {
    const hasApiKey = !!process.env.RESEND_API_KEY;
    const isValidKey = process.env.RESEND_API_KEY?.startsWith('re_');
    const hasFromEmail = !!process.env.RESEND_FROM_EMAIL;
    
    return res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      config: {
        resendApiKey: hasApiKey && isValidKey ? "configured" : "missing/invalid",
        resendFromEmail: hasFromEmail ? "configured" : "missing",
        fromEmail: process.env.RESEND_FROM_EMAIL || "not set"
      }
    });
  }

  // Webhook (POST)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    console.log("📦 Raw Body:", JSON.stringify(body, null, 2));

    // Extrair dados
    const eventType = (body.eventType || body.event_type || body.EventType || "unknown").toLowerCase();
    const buyerEmail = body.Buyer?.Email || body.buyer?.email || body.Buyer?.email;
    const buyerName = body.Buyer?.Name || body.buyer?.name || body.Buyer?.name || "Cliente";

    console.log("\n📊 EXTRACTED DATA:");
    console.log("  Event Type:", eventType);
    console.log("  Buyer Email:", buyerEmail);
    console.log("  Buyer Name:", buyerName);

    // Validar configurações
    console.log("\n⚙️  VALIDATING CONFIGURATION:");
    const hasApiKey = !!process.env.RESEND_API_KEY;
    const isValidKey = process.env.RESEND_API_KEY?.startsWith('re_');
    const hasFromEmail = !!process.env.RESEND_FROM_EMAIL;

    console.log("  RESEND_API_KEY exists:", hasApiKey);
    console.log("  RESEND_API_KEY valid:", isValidKey);
    console.log("  RESEND_FROM_EMAIL exists:", hasFromEmail);

    if (!hasApiKey || !isValidKey) {
      console.error("\n❌ RESEND_API_KEY invalid or missing");
      return res.status(500).json({ error: "RESEND_API_KEY invalid" });
    }

    if (!hasFromEmail) {
      console.error("\n❌ RESEND_FROM_EMAIL missing");
      return res.status(500).json({ error: "RESEND_FROM_EMAIL missing" });
    }

    // Verificar condições
    const isOrderSuccess = eventType === "order.success";
    const hasEmail = !!buyerEmail;
    const isValidEmail = buyerEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail);

    console.log("\n🔍 CHECKING CONDITIONS:");
    console.log("  Order.Success:", isOrderSuccess);
    console.log("  Has email:", hasEmail);
    console.log("  Valid email:", isValidEmail);

    if (!isOrderSuccess) {
      console.log("\n⚠️  Event ignored");
      return res.status(200).json({ success: false, message: "Event not handled" });
    }

    if (!hasEmail || !isValidEmail) {
      console.log("\n⚠️  Invalid email");
      return res.status(200).json({ success: false, message: "Invalid email" });
    }

    // Enviar email
    console.log("\n✅ Sending email...");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 32px; margin: 0;">🎉 Bem-vindo ao MyFitRout!</h1>
            </div>
            <div style="padding: 40px 30px;">
              <p style="font-size: 18px; color: #333; margin: 0 0 20px 0;">Olá <strong>${buyerName}</strong>,</p>
              <p style="font-size: 16px; color: #666; line-height: 1.6; margin: 0 0 20px 0;">
                Obrigado por sua compra! Estamos muito felizes em tê-lo conosco. 🚀
              </p>
              <p style="font-size: 16px; color: #666; line-height: 1.6; margin: 0 0 30px 0;">
                Seu <strong>treino personalizado</strong> está pronto e aguardando por você!
              </p>
              <div style="text-align: center; padding: 20px 0;">
                <a href="https://myfitrout.com" style="background-color: #4CAF50; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: bold; display: inline-block;">
                  Acessar Meu Treino
                </a>
              </div>
              <p style="font-size: 14px; color: #666; margin: 30px 0 0 0;">
                💪 Prepare-se para alcançar seus objetivos!<br>Qualquer dúvida, estamos à disposição.
              </p>
            </div>
            <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px; margin: 0 0 10px 0;">Equipe MyFitRout</p>
              <p style="color: #ccc; font-size: 12px; margin: 0;">© 2026 MyFitRout. Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailData = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: buyerEmail,
      subject: "🎉 Bem-vindo ao MyFitRout - Seu Treino Está Pronto!",
      html: htmlContent,
    });

    console.log("\n🎉 EMAIL SENT!");
    console.log("  Email ID:", emailData.id);
    console.log("=".repeat(60) + "\n");

    return res.status(200).json({ 
      success: true, 
      message: "Email sent successfully",
      emailId: emailData.id,
      to: buyerEmail
    });

  } catch (error: any) {
    console.error("\n❌ ERROR:", error.message);
    console.error("=".repeat(60) + "\n");
    return res.status(500).json({ 
      error: "Internal error",
      details: error.message
    });
  }
}