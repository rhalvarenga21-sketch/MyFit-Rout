import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  console.log("\n" + "=".repeat(60));
  console.log("🔔 WEBHOOK EVENT RECEIVED - " + new Date().toISOString());
  console.log("=".repeat(60));

  try {
    // 1. PARSE DO BODY
    const body = await req.json();
    console.log("📦 Raw Body:", JSON.stringify(body, null, 2));

    // 2. EXTRAIR DADOS (suporta múltiplos formatos)
    const eventType = (body.eventType || body.event_type || body.EventType || "unknown").toLowerCase();
    const buyerEmail = body.Buyer?.Email || body.buyer?.email || body.Buyer?.email;
    const productId = body.Product?.Id || body.product?.id || body.Product?.id;
    const buyerName = body.Buyer?.Name || body.buyer?.name || body.Buyer?.name || "Cliente";

    console.log("\n📊 EXTRACTED DATA:");
    console.log("  Event Type:", eventType);
    console.log("  Buyer Email:", buyerEmail);
    console.log("  Buyer Name:", buyerName);
    console.log("  Product ID:", productId);

    // 3. VALIDAR CONFIGURAÇÕES DO RESEND
    console.log("\n⚙️  VALIDATING CONFIGURATION:");
    const hasApiKey = !!process.env.RESEND_API_KEY;
    const isValidKey = process.env.RESEND_API_KEY?.startsWith('re_');
    const hasFromEmail = !!process.env.RESEND_FROM_EMAIL;

    console.log("  RESEND_API_KEY exists:", hasApiKey);
    console.log("  RESEND_API_KEY valid format:", isValidKey);
    console.log("  RESEND_FROM_EMAIL exists:", hasFromEmail);
    console.log("  RESEND_FROM_EMAIL value:", process.env.RESEND_FROM_EMAIL);

    if (!hasApiKey || !isValidKey) {
      console.error("\n❌ CRITICAL: RESEND_API_KEY is invalid or missing");
      return NextResponse.json({ 
        error: "RESEND_API_KEY is invalid or missing"
      }, { status: 500 });
    }

    if (!hasFromEmail) {
      console.error("\n❌ CRITICAL: RESEND_FROM_EMAIL is missing");
      return NextResponse.json({ 
        error: "RESEND_FROM_EMAIL is missing"
      }, { status: 500 });
    }

    // 4. VERIFICAR CONDIÇÕES PARA ENVIO
    console.log("\n🔍 CHECKING SEND CONDITIONS:");
    
    const isOrderSuccess = eventType === "order.success";
    const hasEmail = !!buyerEmail;
    const isValidEmail = buyerEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail);

    console.log("  Condition 1 - Order.Success:", isOrderSuccess, `(got: '${eventType}')`);
    console.log("  Condition 2 - Has email:", hasEmail);
    console.log("  Condition 3 - Valid email format:", isValidEmail);

    if (!isOrderSuccess) {
      console.log("\n⚠️  EVENT IGNORED: Not an Order.Success event");
      return NextResponse.json({ 
        success: false,
        message: "Event type not handled",
        eventType: eventType
      });
    }

    if (!hasEmail || !isValidEmail) {
      console.log("\n⚠️  EMAIL INVALID OR MISSING");
      return NextResponse.json({ 
        success: false,
        message: "Invalid or missing email"
      });
    }

    // 5. ENVIAR E-MAIL COM HTML PURO
    console.log("\n✅ ALL CONDITIONS MET - PROCEEDING TO SEND EMAIL");
    
    try {
      console.log("\n📧 EMAIL DETAILS:");
      console.log("  From:", process.env.RESEND_FROM_EMAIL);
      console.log("  To:", buyerEmail);

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                        <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: bold;">
                          🎉 Bem-vindo ao MyFitRout!
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="color: #333; font-size: 18px; margin: 0 0 20px 0;">
                          Olá <strong>${buyerName}</strong>,
                        </p>
                        
                        <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                          Obrigado por sua compra! Estamos muito felizes em tê-lo conosco. 🚀
                        </p>
                        
                        <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                          Seu <strong>treino personalizado</strong> está pronto e aguardando por você!
                        </p>
                        
                        <!-- Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px 0;">
                              <a href="https://myfitrout.com" style="background-color: #4CAF50; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: bold; display: inline-block;">
                                Acessar Meu Treino
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                          💪 Prepare-se para alcançar seus objetivos!<br>
                          Qualquer dúvida, estamos à disposição.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
                        <p style="color: #999; font-size: 14px; margin: 0 0 10px 0;">
                          Equipe MyFitRout
                        </p>
                        <p style="color: #ccc; font-size: 12px; margin: 0;">
                          © 2026 MyFitRout. Todos os direitos reservados.
                        </p>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;

      console.log("\n📤 Calling Resend API...");
      
      const emailData = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: buyerEmail,
        subject: "🎉 Bem-vindo ao MyFitRout - Seu Treino Está Pronto!",
        html: htmlContent,
      });

      console.log("\n🎉 EMAIL SENT SUCCESSFULLY!");
      console.log("  Email ID:", emailData.id);
      console.log("=".repeat(60) + "\n");

      return NextResponse.json({ 
        success: true, 
        message: "Email sent successfully",
        emailId: emailData.id,
        to: buyerEmail
      });

    } catch (emailError: any) {
      console.error("\n❌ EMAIL SEND FAILED");
      console.error("  Error:", emailError.message);
      console.error("=".repeat(60) + "\n");

      return NextResponse.json({ 
        error: "Failed to send email",
        details: emailError.message
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error("\n💥 CRITICAL ERROR");
    console.error("  Error:", error.message);
    console.error("=".repeat(60) + "\n");

    return NextResponse.json({ 
      error: "Internal webhook error",
      details: error.message
    }, { status: 500 });
  }
}

// Health check
export async function GET() {
  const hasApiKey = !!process.env.RESEND_API_KEY;
  const isValidKey = process.env.RESEND_API_KEY?.startsWith('re_');
  const hasFromEmail = !!process.env.RESEND_FROM_EMAIL;
  
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    config: {
      resendApiKey: hasApiKey && isValidKey ? "configured" : "missing/invalid",
      resendFromEmail: hasFromEmail ? "configured" : "missing",
      fromEmail: process.env.RESEND_FROM_EMAIL || "not set"
    }
  });
}