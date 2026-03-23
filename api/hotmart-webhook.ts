import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// =============================================================
// MyFitRout - Hotmart Webhook
// Handles: PURCHASE_APPROVED, PURCHASE_COMPLETE,
//          PURCHASE_CANCELED, PURCHASE_REFUNDED,
//          SUBSCRIPTION_CANCELLATION
// =============================================================

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ---- Planos Hotmart → MyFitRout ----
const OFFER_MAP: Record<string, { plan: string; tier: string }> = {
  a24mmass: { plan: "pro_monthly", tier: "pro" },
  v775lxjs: { plan: "pro_yearly", tier: "pro" },
  uptevh7a: { plan: "pro_weekly", tier: "pro" },
  n3bo8q0c: { plan: "essential_monthly", tier: "essential" },
  njxtdc3t: { plan: "essential_yearly", tier: "essential" },
};

// ---- Tipos ----
interface HotmartBuyer {
  email: string;
  name: string;
  first_name?: string;
  last_name?: string;
  checkout_phone?: string;
  document?: string;
}

interface HotmartPayload {
  id: string;
  creation_date: number;
  event: string;
  version?: string;
  data: {
    product?: { id: number; name: string; ucode?: string };
    buyer: HotmartBuyer;
    purchase?: {
      transaction?: string;
      order_date?: number;
      approved_date?: number;
      status?: string;
      price?: { value: number; currency_value?: string };
      payment?: { type?: string; installments_number?: number };
      offer?: { code?: string };
      subscription?: {
        subscriber_code?: string;
        status?: string;
        plan?: { id?: number; name?: string };
      };
    };
    subscription?: {
      subscriber_code?: string;
      status?: string;
      plan?: { id?: number; name?: string };
    };
  };
  hottok?: string;
}

// ---- Health check ----
export async function GET() {
  const hasResendKey = !!process.env.RESEND_API_KEY;
  const hasResendFrom = !!process.env.RESEND_FROM_EMAIL;
  const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasSupabaseKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hasHottok = !!process.env.HOTMART_HOTTOK;

  return NextResponse.json({
    status: "ok",
    service: "MyFitRout Hotmart Webhook",
    config: {
      RESEND_API_KEY: hasResendKey ? "✅" : "❌ MISSING",
      RESEND_FROM_EMAIL: hasResendFrom ? "✅" : "❌ MISSING",
      SUPABASE_URL: hasSupabaseUrl ? "✅" : "❌ MISSING",
      SUPABASE_SERVICE_ROLE_KEY: hasSupabaseKey ? "✅" : "❌ MISSING",
      HOTMART_HOTTOK: hasHottok ? "✅ (signature verification enabled)" : "⚠️ Not set (verification disabled)",
    },
    timestamp: new Date().toISOString(),
  });
}

// ---- Main webhook handler ----
export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log("\n" + "=".repeat(60));
  console.log("🔔 HOTMART WEBHOOK RECEIVED -", new Date().toISOString());
  console.log("=".repeat(60));

  try {
    // 1. Parse body
    const body: HotmartPayload = await req.json();
    console.log("📦 Event:", body.event);
    console.log("📦 Payload ID:", body.id);
    console.log("📦 Version:", body.version || "unknown");

    // 2. Verify hottok (if configured)
    const hottok = process.env.HOTMART_HOTTOK;
    if (hottok) {
      const receivedToken =
        body.hottok ||
        req.headers.get("x-hotmart-hottok") ||
        "";
      if (receivedToken !== hottok) {
        console.log("❌ HOTTOK MISMATCH - Request rejected");
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
      console.log("🔐 Hottok verified ✅");
    }

    // 3. Extract data
    const event = body.event;
    const buyer = body.data?.buyer;
    const purchase = body.data?.purchase;
    const product = body.data?.product;
    const subscription =
      body.data?.subscription || body.data?.purchase?.subscription;
    const offerCode =
      body.data?.purchase?.offer?.code || "";
    const planInfo = OFFER_MAP[offerCode] || {
      plan: "unknown",
      tier: "unknown",
    };

    console.log("\n📊 EXTRACTED DATA:");
    console.log("  Event:", event);
    console.log("  Buyer:", buyer?.email, "-", buyer?.name);
    console.log("  Product:", product?.name, `(ID: ${product?.id})`);
    console.log("  Offer code:", offerCode, "→", planInfo.plan);
    console.log(
      "  Subscription:",
      subscription?.subscriber_code || "N/A"
    );

    // 4. Route by event type
    switch (event) {
      case "PURCHASE_APPROVED":
      case "PURCHASE_COMPLETE":
        return await handlePurchaseApproved(buyer, purchase, planInfo, offerCode, startTime);

      case "PURCHASE_CANCELED":
      case "PURCHASE_REFUNDED":
      case "PURCHASE_CHARGEBACK":
        return await handlePurchaseCanceled(buyer, event, startTime);

      case "SUBSCRIPTION_CANCELLATION":
        return await handleSubscriptionCanceled(buyer, subscription, startTime);

      default:
        console.log(`⚠️ Event "${event}" not handled - ignoring`);
        return NextResponse.json({
          success: true,
          message: `Event "${event}" acknowledged but not processed`,
          duration: Date.now() - startTime + "ms",
        });
    }
  } catch (error: any) {
    console.error("❌ WEBHOOK ERROR:", error.message);
    console.error(error.stack);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}

// =============================================================
// PURCHASE APPROVED / COMPLETE
// → Create Supabase account + send welcome email
// =============================================================
async function handlePurchaseApproved(
  buyer: HotmartBuyer | undefined,
  purchase: HotmartPayload["data"]["purchase"],
  planInfo: { plan: string; tier: string },
  offerCode: string,
  startTime: number
) {
  if (!buyer?.email) {
    console.log("❌ No buyer email in payload");
    return NextResponse.json(
      { error: "Buyer email missing" },
      { status: 400 }
    );
  }

  const email = buyer.email.toLowerCase().trim();
  const name = buyer.name || buyer.first_name || "Cliente";
  const firstName = buyer.first_name || name.split(" ")[0];

  console.log("\n🟢 PROCESSING PURCHASE APPROVED");
  console.log("  Email:", email);
  console.log("  Name:", name);
  console.log("  Plan:", planInfo.plan);

  // --- Step 1: Create or retrieve Supabase user ---
  let userId: string | null = null;
  let tempPassword: string | null = null;
  let isNewUser = false;

  try {
    // Check if user already exists
    const { data: existingUsers } =
      await supabaseAdmin.auth.admin.listUsers();
    const existing = existingUsers?.users?.find(
      (u) => u.email?.toLowerCase() === email
    );

    if (existing) {
      userId = existing.id;
      console.log("  👤 User already exists:", userId);
    } else {
      // Generate temporary password
      tempPassword = generatePassword();
      const { data: newUser, error: createError } =
        await supabaseAdmin.auth.admin.createUser({
          email,
          password: tempPassword,
          email_confirm: true,
          user_metadata: {
            full_name: name,
            first_name: firstName,
            source: "hotmart",
            plan: planInfo.plan,
            tier: planInfo.tier,
            offer_code: offerCode,
          },
        });

      if (createError) {
        console.error("  ❌ Error creating user:", createError.message);
        // If user already exists error, try to find them
        if (createError.message.includes("already been registered")) {
          const { data: retryList } =
            await supabaseAdmin.auth.admin.listUsers();
          const retryUser = retryList?.users?.find(
            (u) => u.email?.toLowerCase() === email
          );
          if (retryUser) {
            userId = retryUser.id;
            console.log("  👤 Found existing user on retry:", userId);
          }
        } else {
          throw createError;
        }
      } else {
        userId = newUser.user.id;
        isNewUser = true;
        console.log("  ✅ New user created:", userId);
      }
    }
  } catch (err: any) {
    console.error("  ❌ Supabase auth error:", err.message);
    // Continue to send email even if auth fails
  }

  // --- Step 2: Save purchase in database ---
  if (userId) {
    try {
      const { error: upsertError } = await supabaseAdmin
        .from("user_subscriptions")
        .upsert(
          {
            user_id: userId,
            email,
            name,
            plan: planInfo.plan,
            tier: planInfo.tier,
            offer_code: offerCode,
            status: "active",
            hotmart_transaction: purchase?.transaction || null,
            subscriber_code:
              purchase?.subscription?.subscriber_code || null,
            price: purchase?.price?.value || null,
            payment_method: purchase?.payment?.type || null,
            purchased_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

      if (upsertError) {
        console.error("  ⚠️ DB upsert error:", upsertError.message);
        // Don't fail the webhook for DB errors
      } else {
        console.log("  ✅ Subscription saved in DB");
      }
    } catch (err: any) {
      console.error("  ⚠️ DB error:", err.message);
    }
  }

  // --- Step 3: Send welcome email ---
  try {
    const appUrl = "https://myfitrout-app.vercel.app";
    const loginUrl = `${appUrl}/login`;

    const planDisplayName = getPlanDisplayName(planInfo.plan);
    const showPassword = isNewUser && tempPassword;

    const emailHtml = buildWelcomeEmail({
      firstName,
      email,
      tempPassword: showPassword ? tempPassword! : null,
      loginUrl,
      planName: planDisplayName,
      isNewUser,
    });

    console.log("\n📧 SENDING WELCOME EMAIL:");
    console.log("  From:", process.env.RESEND_FROM_EMAIL);
    console.log("  To:", email);

    const { data: emailResult, error: emailError } =
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: `🏋️ Bem-vindo ao MyFitRout, ${firstName}! Seu treino está pronto`,
        html: emailHtml,
      });

    if (emailError) {
      console.error("  ❌ Email error:", emailError);
      return NextResponse.json(
        {
          success: false,
          error: "Email send failed",
          details: emailError,
          userId,
          duration: Date.now() - startTime + "ms",
        },
        { status: 500 }
      );
    }

    console.log("  🎉 EMAIL SENT! ID:", emailResult?.id);

    return NextResponse.json({
      success: true,
      event: "PURCHASE_APPROVED",
      userId,
      isNewUser,
      emailId: emailResult?.id,
      plan: planInfo.plan,
      duration: Date.now() - startTime + "ms",
    });
  } catch (err: any) {
    console.error("  ❌ Email send error:", err.message);
    return NextResponse.json(
      {
        success: false,
        error: "Email send failed",
        message: err.message,
        userId,
        duration: Date.now() - startTime + "ms",
      },
      { status: 500 }
    );
  }
}

// =============================================================
// PURCHASE CANCELED / REFUNDED / CHARGEBACK
// → Deactivate subscription
// =============================================================
async function handlePurchaseCanceled(
  buyer: HotmartBuyer | undefined,
  event: string,
  startTime: number
) {
  if (!buyer?.email) {
    console.log("❌ No buyer email for cancellation");
    return NextResponse.json(
      { error: "Buyer email missing" },
      { status: 400 }
    );
  }

  const email = buyer.email.toLowerCase().trim();
  console.log(`\n🔴 PROCESSING ${event}`);
  console.log("  Email:", email);

  try {
    const { error } = await supabaseAdmin
      .from("user_subscriptions")
      .update({
        status: event === "PURCHASE_REFUNDED" ? "refunded" : "canceled",
        updated_at: new Date().toISOString(),
      })
      .eq("email", email);

    if (error) {
      console.error("  ⚠️ DB update error:", error.message);
    } else {
      console.log("  ✅ Subscription deactivated");
    }
  } catch (err: any) {
    console.error("  ⚠️ DB error:", err.message);
  }

  return NextResponse.json({
    success: true,
    event,
    email,
    duration: Date.now() - startTime + "ms",
  });
}

// =============================================================
// SUBSCRIPTION CANCELLATION
// → Deactivate subscription
// =============================================================
async function handleSubscriptionCanceled(
  buyer: HotmartBuyer | undefined,
  subscription: any,
  startTime: number
) {
  if (!buyer?.email) {
    console.log("❌ No buyer email for subscription cancellation");
    return NextResponse.json(
      { error: "Buyer email missing" },
      { status: 400 }
    );
  }

  const email = buyer.email.toLowerCase().trim();
  console.log("\n🟡 PROCESSING SUBSCRIPTION CANCELLATION");
  console.log("  Email:", email);
  console.log(
    "  Subscriber code:",
    subscription?.subscriber_code || "N/A"
  );

  try {
    const { error } = await supabaseAdmin
      .from("user_subscriptions")
      .update({
        status: "canceled",
        updated_at: new Date().toISOString(),
      })
      .eq("email", email);

    if (error) {
      console.error("  ⚠️ DB update error:", error.message);
    } else {
      console.log("  ✅ Subscription canceled in DB");
    }
  } catch (err: any) {
    console.error("  ⚠️ DB error:", err.message);
  }

  return NextResponse.json({
    success: true,
    event: "SUBSCRIPTION_CANCELLATION",
    email,
    duration: Date.now() - startTime + "ms",
  });
}

// =============================================================
// HELPERS
// =============================================================

function generatePassword(): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let password = "";
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function getPlanDisplayName(plan: string): string {
  const names: Record<string, string> = {
    pro_monthly: "PRO Mensal",
    pro_yearly: "PRO Anual",
    pro_weekly: "PRO Semanal",
    essential_monthly: "Essential Mensal",
    essential_yearly: "Essential Anual",
  };
  return names[plan] || plan;
}

function buildWelcomeEmail(params: {
  firstName: string;
  email: string;
  tempPassword: string | null;
  loginUrl: string;
  planName: string;
  isNewUser: boolean;
}): string {
  const { firstName, email, tempPassword, loginUrl, planName, isNewUser } =
    params;

  const credentialsBlock = isNewUser && tempPassword
    ? `
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:24px 0;">
        <p style="margin:0 0 12px;font-weight:600;color:#166534;">🔑 Seus dados de acesso:</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#374151;font-weight:500;">Email:</td>
            <td style="padding:6px 0;color:#111827;font-family:monospace;">${email}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#374151;font-weight:500;">Senha temporária:</td>
            <td style="padding:6px 0;color:#111827;font-family:monospace;font-size:16px;font-weight:700;">${tempPassword}</td>
          </tr>
        </table>
        <p style="margin:12px 0 0;font-size:13px;color:#6b7280;">⚠️ Recomendamos trocar a senha após o primeiro login.</p>
      </div>`
    : `
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:20px;margin:24px 0;">
        <p style="margin:0;color:#1e40af;">Você já tem uma conta! Faça login com seu email <strong>${email}</strong> e sua senha atual.</p>
      </div>`;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4338ca 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">MyFitRout</h1>
      <p style="margin:8px 0 0;color:#a5b4fc;font-size:14px;">Seu Treino Personalizado Inteligente</p>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;padding:32px;border-radius:0 0 16px 16px;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
      
      <h2 style="margin:0 0 16px;color:#1e1b4b;font-size:22px;">Olá, ${firstName}! 🎉</h2>
      
      <p style="color:#374151;font-size:16px;line-height:1.6;">
        Sua assinatura <strong style="color:#4338ca;">${planName}</strong> está ativa! 
        Agora você tem acesso completo ao MyFitRout para treinar de forma inteligente e personalizada.
      </p>

      ${credentialsBlock}

      <!-- CTA Button -->
      <div style="text-align:center;margin:28px 0;">
        <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#4338ca,#7c3aed);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:16px;font-weight:600;box-shadow:0 4px 12px rgba(67,56,202,0.4);">
          🏋️ Acessar Meu Treino
        </a>
      </div>

      <!-- What you get -->
      <div style="background:#faf5ff;border-radius:12px;padding:20px;margin:24px 0;">
        <p style="margin:0 0 12px;font-weight:600;color:#581c87;">O que você pode fazer agora:</p>
        <p style="margin:4px 0;color:#374151;font-size:14px;">✅ Treinos personalizados baseados no seu nível</p>
        <p style="margin:4px 0;color:#374151;font-size:14px;">✅ Vídeos demonstrativos dos exercícios</p>
        <p style="margin:4px 0;color:#374151;font-size:14px;">✅ Acompanhamento de progresso</p>
        <p style="margin:4px 0;color:#374151;font-size:14px;">✅ Suporte via email</p>
      </div>

      <p style="color:#6b7280;font-size:14px;line-height:1.5;">
        Qualquer dúvida, responda este email ou entre em contato pelo 
        <a href="mailto:r.alvarenga@myfitrout.com" style="color:#4338ca;">r.alvarenga@myfitrout.com</a>.
      </p>

      <p style="color:#374151;font-size:14px;margin-top:24px;">
        Bons treinos! 💪<br/>
        <strong>Equipe MyFitRout</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px;color:#9ca3af;font-size:12px;">
      <p style="margin:4px 0;">MyFitRout - Seu Treino Personalizado</p>
      <p style="margin:4px 0;">
        <a href="https://myfitrout.com" style="color:#6366f1;">myfitrout.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}