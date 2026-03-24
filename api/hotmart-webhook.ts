import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// =============================================================
// MyFitRout - Hotmart Webhook (Vercel Serverless Function)
// Handles: PURCHASE_APPROVED, PURCHASE_COMPLETE,
//          PURCHASE_CANCELED, PURCHASE_REFUNDED,
//          SUBSCRIPTION_CANCELLATION
// Supports: PT / EN / ES emails based on buyer country
// =============================================================

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ---- Planos Hotmart → MyFitRout ----
const OFFER_MAP: Record<string, { plan: string; tier: string }> = {
  // BRL
  a24mmass: { plan: "pro_monthly", tier: "pro" },
  v775lxjs: { plan: "pro_yearly", tier: "pro" },
  uptevh7a: { plan: "pro_weekly", tier: "pro" },
  n3bo8q0c: { plan: "essential_monthly", tier: "essential" },
  njxtdc3t: { plan: "essential_yearly", tier: "essential" },
  // EUR
  "1zl6d8w9": { plan: "pro_monthly", tier: "pro" },
  c0r9s3og: { plan: "pro_yearly", tier: "pro" },
  mte3dfmj: { plan: "pro_weekly", tier: "pro" },
  phalz1au: { plan: "essential_monthly", tier: "essential" },
  qw0idc8f: { plan: "essential_yearly", tier: "essential" },
};

// ---- Países hispanofalantes ----
const SPANISH_COUNTRIES = [
  "ES", "MX", "AR", "CO", "CL", "PE", "UY", "PY", "EC",
  "VE", "BO", "CR", "GT", "HN", "SV", "NI", "PA", "DO", "CU",
];

// ---- Detectar idioma pelo país ----
function detectLanguage(countryIso: string | undefined): "pt" | "en" | "es" {
  if (!countryIso) return "en";
  const iso = countryIso.toUpperCase();
  if (iso === "BR") return "pt";
  if (SPANISH_COUNTRIES.includes(iso)) return "es";
  return "en";
}

// ---- Traduções ----
function getTranslations(lang: "pt" | "en" | "es") {
  const translations = {
    pt: {
      emailSubject: "🏋️ Bem-vindo ao MyFitRout, {name}! Seu treino está pronto",
      tagline: "Seu Treino Personalizado Inteligente",
      greeting: "Olá, {name}! 🎉",
      subscriptionActive: "Sua assinatura <strong style=\"color:#4338ca;\">{plan}</strong> está ativa! Agora você tem acesso completo ao MyFitRout para treinar de forma inteligente e personalizada.",
      credentialsTitle: "🔑 Seus dados de acesso:",
      emailLabel: "Email:",
      passwordLabel: "Senha temporária:",
      changePasswordNote: "⚠️ Recomendamos trocar a senha após o primeiro login.",
      existingAccount: "Você já tem uma conta! Faça login com seu email <strong>{email}</strong> e sua senha atual.",
      ctaButton: "🏋️ Acessar Meu Treino",
      featuresTitle: "O que você pode fazer agora:",
      feature1: "✅ Treinos personalizados baseados no seu nível",
      feature2: "✅ Vídeos demonstrativos dos exercícios",
      feature3: "✅ Acompanhamento de progresso",
      feature4: "✅ Suporte via email",
      supportText: "Qualquer dúvida, responda este email ou entre em contato pelo",
      closing: "Bons treinos! 💪",
      team: "Equipe MyFitRout",
      footer: "MyFitRout - Seu Treino Personalizado",
    },
    en: {
      emailSubject: "🏋️ Welcome to MyFitRout, {name}! Your workout is ready",
      tagline: "Your Smart Personalized Training",
      greeting: "Hi, {name}! 🎉",
      subscriptionActive: "Your <strong style=\"color:#4338ca;\">{plan}</strong> subscription is active! You now have full access to MyFitRout for smart, personalized training.",
      credentialsTitle: "🔑 Your login details:",
      emailLabel: "Email:",
      passwordLabel: "Temporary password:",
      changePasswordNote: "⚠️ We recommend changing your password after your first login.",
      existingAccount: "You already have an account! Log in with your email <strong>{email}</strong> and your current password.",
      ctaButton: "🏋️ Access My Workout",
      featuresTitle: "What you can do now:",
      feature1: "✅ Personalized workouts based on your level",
      feature2: "✅ Exercise demonstration videos",
      feature3: "✅ Progress tracking",
      feature4: "✅ Email support",
      supportText: "Any questions? Reply to this email or contact us at",
      closing: "Happy training! 💪",
      team: "MyFitRout Team",
      footer: "MyFitRout - Your Personalized Training",
    },
    es: {
      emailSubject: "🏋️ Bienvenido a MyFitRout, {name}! Tu entrenamiento está listo",
      tagline: "Tu Entrenamiento Personalizado Inteligente",
      greeting: "¡Hola, {name}! 🎉",
      subscriptionActive: "Tu suscripción <strong style=\"color:#4338ca;\">{plan}</strong> está activa. Ahora tienes acceso completo a MyFitRout para entrenar de forma inteligente y personalizada.",
      credentialsTitle: "🔑 Tus datos de acceso:",
      emailLabel: "Email:",
      passwordLabel: "Contraseña temporal:",
      changePasswordNote: "⚠️ Te recomendamos cambiar tu contraseña después del primer inicio de sesión.",
      existingAccount: "¡Ya tienes una cuenta! Inicia sesión con tu email <strong>{email}</strong> y tu contraseña actual.",
      ctaButton: "🏋️ Acceder a Mi Entrenamiento",
      featuresTitle: "Lo que puedes hacer ahora:",
      feature1: "✅ Entrenamientos personalizados según tu nivel",
      feature2: "✅ Videos demostrativos de los ejercicios",
      feature3: "✅ Seguimiento de progreso",
      feature4: "✅ Soporte por email",
      supportText: "¿Alguna pregunta? Responde a este email o contáctanos en",
      closing: "¡Buenos entrenamientos! 💪",
      team: "Equipo MyFitRout",
      footer: "MyFitRout - Tu Entrenamiento Personalizado",
    },
  };
  return translations[lang];
}

// ---- Nomes dos planos por idioma ----
function getPlanDisplayName(plan: string, lang: "pt" | "en" | "es"): string {
  const names: Record<string, Record<string, string>> = {
    pro_monthly: { pt: "PRO Mensal", en: "PRO Monthly", es: "PRO Mensual" },
    pro_yearly: { pt: "PRO Anual", en: "PRO Annual", es: "PRO Anual" },
    pro_weekly: { pt: "PRO Semanal", en: "PRO Weekly", es: "PRO Semanal" },
    essential_monthly: { pt: "Essential Mensal", en: "Essential Monthly", es: "Essential Mensual" },
    essential_yearly: { pt: "Essential Anual", en: "Essential Annual", es: "Essential Anual" },
  };
  return names[plan]?.[lang] || plan;
}

export default async function handler(req: any, res: any) {
  // ---- Health check (GET) ----
  if (req.method === "GET") {
    const hasResendKey = !!process.env.RESEND_API_KEY;
    const hasResendFrom = !!process.env.RESEND_FROM_EMAIL;
    const hasSupabaseUrl = !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL);
    const hasSupabaseKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
    const hasHottok = !!process.env.HOTMART_HOTTOK;

    return res.status(200).json({
      status: "ok",
      service: "MyFitRout Hotmart Webhook",
      config: {
        RESEND_API_KEY: hasResendKey ? "✅" : "❌ MISSING",
        RESEND_FROM_EMAIL: hasResendFrom ? "✅" : "❌ MISSING",
        SUPABASE_URL: hasSupabaseUrl ? "✅" : "❌ MISSING",
        SUPABASE_SERVICE_ROLE_KEY: hasSupabaseKey ? "✅" : "❌ MISSING",
        HOTMART_HOTTOK: hasHottok ? "✅" : "⚠️ Not set",
      },
      timestamp: new Date().toISOString(),
    });
  }

  // ---- Only POST allowed ----
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const startTime = Date.now();
  console.log("\n" + "=".repeat(60));
  console.log("🔔 HOTMART WEBHOOK RECEIVED -", new Date().toISOString());
  console.log("=".repeat(60));

  try {
    // 1. Parse body
    const body = req.body;
    console.log("📦 Event:", body.event);
    console.log("📦 Payload ID:", body.id);
    console.log("📦 Version:", body.version || "unknown");

    // 2. Verify hottok (if configured)
    const hottok = process.env.HOTMART_HOTTOK;
    if (hottok) {
      const receivedToken =
        body.hottok ||
        req.headers["x-hotmart-hottok"] ||
        "";
      if (receivedToken !== hottok) {
        console.log("❌ HOTTOK MISMATCH - Request rejected");
        return res.status(401).json({ error: "Unauthorized" });
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
    const offerCode = body.data?.purchase?.offer?.code || "";
    const planInfo = OFFER_MAP[offerCode] || {
      plan: "unknown",
      tier: "unknown",
    };
    const countryIso =
      purchase?.checkout_country?.iso ||
      buyer?.address?.country_iso ||
      "";
    const lang = detectLanguage(countryIso);

    console.log("\n📊 EXTRACTED DATA:");
    console.log("  Event:", event);
    console.log("  Buyer:", buyer?.email, "-", buyer?.name);
    console.log("  Product:", product?.name, `(ID: ${product?.id})`);
    console.log("  Offer code:", offerCode, "→", planInfo.plan);
    console.log("  Country:", countryIso, "→ Language:", lang);
    console.log("  Subscription:", subscription?.subscriber_code || "N/A");

    // 4. Route by event type
    switch (event) {
      case "PURCHASE_APPROVED":
      case "PURCHASE_COMPLETE":
        return await handlePurchaseApproved(buyer, purchase, planInfo, offerCode, lang, startTime, res);

      case "PURCHASE_CANCELED":
      case "PURCHASE_REFUNDED":
      case "PURCHASE_CHARGEBACK":
        return await handlePurchaseCanceled(buyer, event, startTime, res);

      case "SUBSCRIPTION_CANCELLATION":
        return await handleSubscriptionCanceled(buyer, subscription, startTime, res);

      default:
        console.log(`⚠️ Event "${event}" not handled - ignoring`);
        return res.status(200).json({
          success: true,
          message: `Event "${event}" acknowledged but not processed`,
          duration: Date.now() - startTime + "ms",
        });
    }
  } catch (error: any) {
    console.error("❌ WEBHOOK ERROR:", error.message);
    console.error(error.stack);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}

// =============================================================
// PURCHASE APPROVED / COMPLETE
// =============================================================
async function handlePurchaseApproved(
  buyer: any,
  purchase: any,
  planInfo: { plan: string; tier: string },
  offerCode: string,
  lang: "pt" | "en" | "es",
  startTime: number,
  res: any
) {
  if (!buyer?.email) {
    console.log("❌ No buyer email in payload");
    return res.status(400).json({ error: "Buyer email missing" });
  }

  const email = buyer.email.toLowerCase().trim();
  const name = buyer.name || buyer.first_name || "Cliente";
  const firstName = buyer.first_name || name.split(" ")[0];

  console.log("\n🟢 PROCESSING PURCHASE APPROVED");
  console.log("  Email:", email);
  console.log("  Name:", name);
  console.log("  Plan:", planInfo.plan);
  console.log("  Language:", lang);

  // --- Step 1: Create or retrieve Supabase user ---
  let userId: string | null = null;
  let tempPassword: string | null = null;
  let isNewUser = false;

  try {
    const { data: existingUsers } =
      await supabaseAdmin.auth.admin.listUsers();
    const existing = existingUsers?.users?.find(
      (u: any) => u.email?.toLowerCase() === email
    );

    if (existing) {
      userId = existing.id;
      console.log("  👤 User already exists:", userId);
    } else {
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
            language: lang,
          },
        });

      if (createError) {
        console.error("  ❌ Error creating user:", createError.message);
        if (createError.message.includes("already been registered")) {
          const { data: retryList } =
            await supabaseAdmin.auth.admin.listUsers();
          const retryUser = retryList?.users?.find(
            (u: any) => u.email?.toLowerCase() === email
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
              purchase?.subscription?.subscriber?.code ||
              purchase?.subscription?.subscriber_code ||
              null,
            price: purchase?.price?.value || null,
            payment_method: purchase?.payment?.type || null,
            purchased_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

      if (upsertError) {
        console.error("  ⚠️ DB upsert error:", upsertError.message);
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
    const planDisplayName = getPlanDisplayName(planInfo.plan, lang);
    const showPassword = isNewUser && tempPassword;
    const t = getTranslations(lang);

    const emailHtml = buildWelcomeEmail({
      firstName,
      email,
      tempPassword: showPassword ? tempPassword! : null,
      loginUrl,
      planName: planDisplayName,
      isNewUser,
      t,
      lang,
    });

    console.log("\n📧 SENDING WELCOME EMAIL:");
    console.log("  From:", process.env.RESEND_FROM_EMAIL);
    console.log("  To:", email);
    console.log("  Language:", lang);

    const { data: emailResult, error: emailError } =
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: t.emailSubject.replace("{name}", firstName),
        html: emailHtml,
      });

    if (emailError) {
      console.error("  ❌ Email error:", emailError);
      return res.status(500).json({
        success: false,
        error: "Email send failed",
        details: emailError,
        userId,
        duration: Date.now() - startTime + "ms",
      });
    }

    console.log("  🎉 EMAIL SENT! ID:", emailResult?.id);

    return res.status(200).json({
      success: true,
      event: "PURCHASE_APPROVED",
      userId,
      isNewUser,
      emailId: emailResult?.id,
      plan: planInfo.plan,
      language: lang,
      duration: Date.now() - startTime + "ms",
    });
  } catch (err: any) {
    console.error("  ❌ Email send error:", err.message);
    return res.status(500).json({
      success: false,
      error: "Email send failed",
      message: err.message,
      userId,
      duration: Date.now() - startTime + "ms",
    });
  }
}

// =============================================================
// PURCHASE CANCELED / REFUNDED / CHARGEBACK
// =============================================================
async function handlePurchaseCanceled(
  buyer: any,
  event: string,
  startTime: number,
  res: any
) {
  if (!buyer?.email) {
    console.log("❌ No buyer email for cancellation");
    return res.status(400).json({ error: "Buyer email missing" });
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

  return res.status(200).json({
    success: true,
    event,
    email,
    duration: Date.now() - startTime + "ms",
  });
}

// =============================================================
// SUBSCRIPTION CANCELLATION
// =============================================================
async function handleSubscriptionCanceled(
  buyer: any,
  subscription: any,
  startTime: number,
  res: any
) {
  if (!buyer?.email) {
    console.log("❌ No buyer email for subscription cancellation");
    return res.status(400).json({ error: "Buyer email missing" });
  }

  const email = buyer.email.toLowerCase().trim();
  console.log("\n🟡 PROCESSING SUBSCRIPTION CANCELLATION");
  console.log("  Email:", email);
  console.log("  Subscriber code:", subscription?.subscriber_code || subscription?.subscriber?.code || "N/A");

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

  return res.status(200).json({
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

function buildWelcomeEmail(params: {
  firstName: string;
  email: string;
  tempPassword: string | null;
  loginUrl: string;
  planName: string;
  isNewUser: boolean;
  t: ReturnType<typeof getTranslations>;
  lang: "pt" | "en" | "es";
}): string {
  const { firstName, email, tempPassword, loginUrl, planName, isNewUser, t, lang } =
    params;

  const htmlLang = lang === "pt" ? "pt-BR" : lang === "es" ? "es" : "en";

  const credentialsBlock =
    isNewUser && tempPassword
      ? `
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:24px 0;">
        <p style="margin:0 0 12px;font-weight:600;color:#166534;">${t.credentialsTitle}</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#374151;font-weight:500;">${t.emailLabel}</td>
            <td style="padding:6px 0;color:#111827;font-family:monospace;">${email}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#374151;font-weight:500;">${t.passwordLabel}</td>
            <td style="padding:6px 0;color:#111827;font-family:monospace;font-size:16px;font-weight:700;">${tempPassword}</td>
          </tr>
        </table>
        <p style="margin:12px 0 0;font-size:13px;color:#6b7280;">${t.changePasswordNote}</p>
      </div>`
      : `
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:20px;margin:24px 0;">
        <p style="margin:0;color:#1e40af;">${t.existingAccount.replace("{email}", email)}</p>
      </div>`;

  return `<!DOCTYPE html>
<html lang="${htmlLang}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4338ca 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">MyFitRout</h1>
      <p style="margin:8px 0 0;color:#a5b4fc;font-size:14px;">${t.tagline}</p>
    </div>
    <div style="background:#ffffff;padding:32px;border-radius:0 0 16px 16px;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
      <h2 style="margin:0 0 16px;color:#1e1b4b;font-size:22px;">${t.greeting.replace("{name}", firstName)}</h2>
      <p style="color:#374151;font-size:16px;line-height:1.6;">
        ${t.subscriptionActive.replace("{plan}", planName)}
      </p>
      ${credentialsBlock}
      <div style="text-align:center;margin:28px 0;">
        <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#4338ca,#7c3aed);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:16px;font-weight:600;box-shadow:0 4px 12px rgba(67,56,202,0.4);">
          ${t.ctaButton}
        </a>
      </div>
      <div style="background:#faf5ff;border-radius:12px;padding:20px;margin:24px 0;">
        <p style="margin:0 0 12px;font-weight:600;color:#581c87;">${t.featuresTitle}</p>
        <p style="margin:4px 0;color:#374151;font-size:14px;">${t.feature1}</p>
        <p style="margin:4px 0;color:#374151;font-size:14px;">${t.feature2}</p>
        <p style="margin:4px 0;color:#374151;font-size:14px;">${t.feature3}</p>
        <p style="margin:4px 0;color:#374151;font-size:14px;">${t.feature4}</p>
      </div>
      <p style="color:#6b7280;font-size:14px;line-height:1.5;">
        ${t.supportText}
        <a href="mailto:support@myfitrout.com" style="color:#4338ca;">support@myfitrout.com</a>.
      </p>
      <p style="color:#374151;font-size:14px;margin-top:24px;">
        ${t.closing}<br/>
        <strong>${t.team}</strong>
      </p>
    </div>
    <div style="text-align:center;padding:20px;color:#9ca3af;font-size:12px;">
      <p style="margin:4px 0;">${t.footer}</p>
      <p style="margin:4px 0;">
        <a href="https://myfitrout.com" style="color:#6366f1;">myfitrout.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}