import { Resend } from "resend";
import { EmailTemplate } from "../emails/WelcomeEmail";
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
      console.error("   Please check Vercel Environment Variables");
      console.error("   Key should start with 're_'");
      console.error("=".repeat(60) + "\n");
      
      return NextResponse.json({ 
        error: "Email service not configured properly",
        details: "RESEND_API_KEY is invalid or missing",
        action: "Check Vercel Environment Variables"
      }, { status: 500 });
    }

    if (!hasFromEmail) {
      console.error("\n❌ CRITICAL: RESEND_FROM_EMAIL is missing");
      console.error("   Please add RESEND_FROM_EMAIL to Vercel Environment Variables");
      console.error("   Example: onboarding@resend.dev or noreply@yourdomain.com");
      console.error("=".repeat(60) + "\n");
      
      return NextResponse.json({ 
        error: "Email service not configured properly",
        details: "RESEND_FROM_EMAIL is missing",
        action: "Add RESEND_FROM_EMAIL to Environment Variables"
      }, { status: 500 });
    }

    // 4. VERIFICAR CONDIÇÕES PARA ENVIO
    console.log("\n🔍 CHECKING SEND CONDITIONS:");
    
    // Suporta tanto "Order.Success" quanto "order.success"
    const isOrderSuccess = eventType === "order.success";
    const hasEmail = !!buyerEmail;
    const isValidEmail = buyerEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail);

    console.log("  Condition 1 - Order.Success:", isOrderSuccess, 
                `(got: '${eventType}')`);
    console.log("  Condition 2 - Has email:", hasEmail);
    console.log("  Condition 3 - Valid email format:", isValidEmail);

    if (!isOrderSuccess) {
      console.log("\n⚠️  EVENT IGNORED: Not an Order.Success event");
      console.log("   Expected: 'order.success'");
      console.log("   Got: '" + eventType + "'");
      console.log("=".repeat(60) + "\n");
      
      return NextResponse.json({ 
        success: false,
        message: "Event type not handled",
        eventType: eventType,
        expectedType: "order.success"
      });
    }

    if (!hasEmail) {
      console.log("\n⚠️  EMAIL MISSING: Buyer email not found in payload");
      console.log("   Checked paths: Buyer.Email, buyer.email");
      console.log("=".repeat(60) + "\n");
      
      return NextResponse.json({ 
        success: false,
        message: "Buyer email is missing from payload",
        action: "Check Lastlink webhook configuration"
      });
    }

    if (!isValidEmail) {
      console.log("\n⚠️  INVALID EMAIL FORMAT: '" + buyerEmail + "'");
      console.log("=".repeat(60) + "\n");
      
      return NextResponse.json({ 
        success: false,
        message: "Invalid email format",
        email: buyerEmail
      });
    }

    // 5. TUDO OK - ENVIAR E-MAIL
    console.log("\n✅ ALL CONDITIONS MET - PROCEEDING TO SEND EMAIL");
    
    try {
      console.log("\n📧 EMAIL DETAILS:");
      console.log("  From:", process.env.RESEND_FROM_EMAIL);
      console.log("  To:", buyerEmail);
      console.log("  Subject: Seu Treino Personalizado - MyFitRout");
      console.log("  Name:", buyerName);

      console.log("\n📤 Calling Resend API...");
      
      const emailData = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: buyerEmail,
        subject: "Seu Treino Personalizado - MyFitRout",
        react: EmailTemplate({ firstName: buyerName }),
      });

      console.log("\n🎉 EMAIL SENT SUCCESSFULLY!");
      console.log("  Email ID:", emailData.id);
      console.log("  Status: Delivered to Resend");
      console.log("  Check Resend Dashboard for delivery status");
      console.log("=".repeat(60) + "\n");

      return NextResponse.json({ 
        success: true, 
        message: "Email sent successfully",
        emailId: emailData.id,
        to: buyerEmail
      });

    } catch (emailError: any) {
      console.error("\n❌ EMAIL SEND FAILED");
      console.error("  Error Name:", emailError.name);
      console.error("  Error Message:", emailError.message);
      
      // Erros comuns do Resend
      if (emailError.message?.includes("API key")) {
        console.error("  → Problem: Invalid or expired API key");
        console.error("  → Solution: Check RESEND_API_KEY in Vercel");
      } else if (emailError.message?.includes("from")) {
        console.error("  → Problem: Invalid 'from' email address");
        console.error("  → Solution: Verify domain in Resend or use onboarding@resend.dev");
      } else if (emailError.message?.includes("rate limit")) {
        console.error("  → Problem: Rate limit exceeded");
        console.error("  → Solution: Wait or upgrade Resend plan");
      }
      
      console.error("\n  Full Error Object:");
      console.error(JSON.stringify(emailError, null, 2));
      console.error("=".repeat(60) + "\n");

      return NextResponse.json({ 
        error: "Failed to send email",
        details: emailError.message,
        type: emailError.name,
        action: "Check logs above for specific solution"
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error("\n💥 CRITICAL ERROR IN WEBHOOK HANDLER");
    console.error("  Error Name:", error.name);
    console.error("  Error Message:", error.message);
    console.error("  Error Stack:");
    console.error(error.stack);
    console.error("\n  Full Error Object:");
    console.error(JSON.stringify(error, null, 2));
    console.error("=".repeat(60) + "\n");

    return NextResponse.json({ 
      error: "Internal webhook error",
      details: error.message,
      type: error.name
    }, { status: 500 });
  }
}

// Health check endpoint
export async function GET() {
  console.log("🏥 Health check requested");
  
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
