import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

const LANG_CONFIG = {
  pt: {
    subject: (name: string) => `${name}, o teu plano nutricional personalizado está aqui 🎯`,
    greeting: (name: string, goal: string) => `Olá ${name}! Aqui está o teu plano nutricional base personalizado para o objetivo: <strong style="color:#7B4FD4">${goal}</strong>.`,
    disclaimer: "⚕️ <strong>Aviso importante:</strong> Este plano é baseado em estudos científicos e serve como orientação geral. Recomendamos sempre a consulta com um nutricionista certificado e médico para uma avaliação personalizada.",
    ctaTitle: "Quer treinos também personalizados? 💪",
    ctaDesc: "O MyFitRout cria programas de treino adaptados ao teu nível, equipamento e objetivos — powered by IA.",
    ctaBtn: "Experimentar Grátis →",
    footer: "Conteúdo baseado em evidência científica. Não é aconselhamento médico.",
    promptLang: "português europeu",
  },
  en: {
    subject: (name: string) => `${name}, your personalized nutrition plan is here 🎯`,
    greeting: (name: string, goal: string) => `Hi ${name}! Here is your personalized base nutrition plan for your goal: <strong style="color:#7B4FD4">${goal}</strong>.`,
    disclaimer: "⚕️ <strong>Important notice:</strong> This plan is based on scientific studies and serves as general guidance. We always recommend consulting a certified nutritionist and doctor for a personalized assessment.",
    ctaTitle: "Want personalized workouts too? 💪",
    ctaDesc: "MyFitRout creates training programs adapted to your level, equipment and goals — powered by AI.",
    ctaBtn: "Try for Free →",
    footer: "Content based on scientific evidence. Not medical advice.",
    promptLang: "English",
  },
  es: {
    subject: (name: string) => `${name}, tu plan nutricional personalizado está aquí 🎯`,
    greeting: (name: string, goal: string) => `¡Hola ${name}! Aquí está tu plan nutricional base personalizado para el objetivo: <strong style="color:#7B4FD4">${goal}</strong>.`,
    disclaimer: "⚕️ <strong>Aviso importante:</strong> Este plan está basado en estudios científicos y sirve como orientación general. Siempre recomendamos consultar con un nutricionista certificado y médico para una evaluación personalizada.",
    ctaTitle: "¿Quieres entrenamientos también personalizados? 💪",
    ctaDesc: "MyFitRout crea programas de entrenamiento adaptados a tu nivel, equipamiento y objetivos — powered by IA.",
    ctaBtn: "Probar Gratis →",
    footer: "Contenido basado en evidencia científica. No es consejo médico.",
    promptLang: "español",
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, age, weight, height, gender, goal, level, daysPerWeek, restrictions, lang = "pt" } = body;

    if (!email || !name || !goal) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const lc = LANG_CONFIG[lang as keyof typeof LANG_CONFIG] || LANG_CONFIG.pt;

    const prompt = `
You are a sports nutritionist. Create a detailed personalized base nutrition plan.
Respond ONLY in ${lc.promptLang}.

USER PROFILE:
- Name: ${name}
- Age: ${age || "not specified"}
- Weight: ${weight ? weight + "kg" : "not specified"}
- Height: ${height ? height + "cm" : "not specified"}
- Gender: ${gender || "not specified"}
- Main goal: ${goal}
- Experience level: ${level || "beginner"}
- Available days per week: ${daysPerWeek || "3"}
- Food restrictions: ${restrictions || "none"}

Create a structured nutrition plan with:
## 1. Daily Caloric Needs
(with explanation of calculation: BMR + activity factor)

## 2. Macronutrient Distribution
(protein, carbs, fats in grams and %)

## 3. Sample Daily Meal Plan
(breakfast, lunch, snack, dinner with specific portions)

## 4. Recommended Foods for This Goal
(top 10 foods with brief explanation)

## 5. Foods to Reduce or Avoid

## 6. 3 Key Nutritional Tips for ${goal}

## 7. Hydration
(daily water intake recommendation)

Rules:
- Be specific with quantities and portions
- Use **bold** for key numbers
- Keep tone motivating but scientific
- Use ## for section headers
- Respond ONLY with the plan content, no intro or outro
`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
        })
      }
    );

    if (!geminiRes.ok) {
      console.error("Gemini error:", await geminiRes.text());
      return NextResponse.json({ error: "Error generating plan" }, { status: 500 });
    }

    const geminiData = await geminiRes.json();
    const planText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (!planText) return NextResponse.json({ error: "Empty plan" }, { status: 500 });

    // Markdown → HTML
    const planHtml = planText
      .replace(/^## (.+)$/gm, `<h2 style="color:#7B4FD4;font-size:17px;font-weight:700;margin:22px 0 8px;padding-bottom:6px;border-bottom:1px solid #eee;">$1</h2>`)
      .replace(/^### (.+)$/gm, `<h3 style="color:#333;font-size:15px;font-weight:700;margin:16px 0 6px;">$1</h3>`)
      .replace(/\*\*(.+?)\*\*/g, `<strong style="color:#1a1a2e;">$1</strong>`)
      .replace(/^- (.+)$/gm, `<li style="margin:5px 0;color:#555;line-height:1.6;">$1</li>`)
      .replace(/(<li[^>]*>.*<\/li>\n?)+/g, m => `<ul style="padding-left:20px;margin:10px 0;">${m}</ul>`)
      .split("\n\n")
      .map(b => b.startsWith("<h") || b.startsWith("<ul") ? b : `<p style="color:#444;line-height:1.75;margin:0 0 12px;">${b}</p>`)
      .join("");

    const emailHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f0f5;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
<tr><td>
<table width="600" cellpadding="0" cellspacing="0" style="margin:0 auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">

  <tr><td style="background:linear-gradient(135deg,#7B4FD4,#9B6FF4);padding:32px 40px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:26px;letter-spacing:-0.5px;">MyFitRout</h1>
    <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">myfitrout.com</p>
  </td></tr>

  <tr><td style="padding:32px 40px 0;">
    <p style="color:#333;font-size:16px;line-height:1.7;margin:0 0 12px;">${lc.greeting(name, goal)}</p>
    <div style="padding:12px 16px;background:#fff8f0;border-left:3px solid #F97316;border-radius:6px;margin-bottom:24px;">
      <p style="color:#666;font-size:13px;line-height:1.6;margin:0;">${lc.disclaimer}</p>
    </div>
  </td></tr>

  <tr><td style="padding:0 40px 32px;">
    <div style="background:#fafafa;border-radius:12px;padding:28px;border:1px solid #eee;">
      ${planHtml}
    </div>
  </td></tr>

  <tr><td style="padding:0 40px 40px;">
    <div style="background:linear-gradient(135deg,rgba(123,79,212,0.07),rgba(155,111,244,0.03));border:1px solid rgba(123,79,212,0.18);border-radius:14px;padding:28px;text-align:center;">
      <h3 style="color:#1a1a2e;margin:0 0 10px;font-size:18px;">${lc.ctaTitle}</h3>
      <p style="color:#666;font-size:14px;margin:0 0 20px;line-height:1.6;">${lc.ctaDesc}</p>
      <a href="https://myfitrout.com" style="display:inline-block;background:linear-gradient(135deg,#7B4FD4,#9B6FF4);color:#fff;text-decoration:none;padding:13px 30px;border-radius:10px;font-weight:700;font-size:15px;">${lc.ctaBtn}</a>
    </div>
  </td></tr>

  <tr><td style="background:#f9f9f9;padding:18px 40px;text-align:center;border-top:1px solid #eee;">
    <p style="color:#aaa;font-size:12px;margin:0;">© 2025 MyFitRout · ${lc.footer}</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: RESEND_FROM_EMAIL, to: email, subject: lc.subject(name), html: emailHtml })
    });

    if (!resendRes.ok) {
      console.error("Resend error:", await resendRes.text());
      return NextResponse.json({ error: "Error sending email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
