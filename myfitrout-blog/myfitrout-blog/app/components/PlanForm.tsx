"use client";
import { useState, useEffect } from "react";

type Lang = "pt" | "en" | "es";

const GOALS = [
  { id: "perder-gordura",  emoji: "🔥", pt: "Perder Gordura",       en: "Lose Fat",           es: "Perder Grasa" },
  { id: "ganhar-musculo",  emoji: "💪", pt: "Ganhar Músculo",       en: "Build Muscle",       es: "Ganar Músculo" },
  { id: "gluteos-pernas",  emoji: "🍑", pt: "Glúteos & Pernas",     en: "Glutes & Legs",      es: "Glúteos & Piernas" },
  { id: "condicionamento", emoji: "🏃", pt: "Condicionamento",      en: "Conditioning",       es: "Acondicionamiento" },
  { id: "corrida",         emoji: "👟", pt: "Corrida",              en: "Running",            es: "Correr" },
  { id: "alimentacao",     emoji: "🥗", pt: "Alimentação Saudável", en: "Healthy Eating",     es: "Alimentación Sana" },
  { id: "motivacao",       emoji: "🧠", pt: "Motivação & Foco",     en: "Motivation & Focus", es: "Motivación & Enfoque" },
  { id: "disciplina",      emoji: "⚡", pt: "Disciplina",           en: "Discipline",         es: "Disciplina" },
];

const LEVELS = [
  { id: "iniciante",  pt: "Iniciante",  en: "Beginner",     es: "Principiante", desc_pt: "< 6 meses",   desc_en: "< 6 months",  desc_es: "< 6 meses" },
  { id: "intermedio", pt: "Intermédio", en: "Intermediate", es: "Intermedio",   desc_pt: "6m — 2 anos", desc_en: "6m — 2 yrs",  desc_es: "6m — 2 años" },
  { id: "avancado",   pt: "Avançado",   en: "Advanced",     es: "Avanzado",     desc_pt: "> 2 anos",    desc_en: "> 2 years",   desc_es: "> 2 años" },
];

const T = {
  pt: {
    step1: "Qual é o teu objetivo principal?",
    step2: "O teu perfil",
    step3: "Para onde enviamos o teu plano?",
    age: "Idade", weight: "Peso (kg)", height: "Altura (cm)",
    gender: "Género", male: "Masculino", female: "Feminino", other: "Outro",
    days: "Dias disponíveis por semana",
    restrictions: "Restrições alimentares (opcional)",
    restrictions_ph: "Ex: vegetariano, intolerante ao glúten...",
    level: "Nível de experiência",
    name: "Nome", name_ph: "O teu nome",
    next: "Continuar →", back: "← Voltar",
    send: "Gerar e Enviar Plano 🚀",
    sending: "A gerar o teu plano com IA...",
    doneTitle: "Plano enviado! 🎉",
    doneMsg: "Verifica o teu email — o teu plano personalizado está a caminho!",
    doneSpam: "Não encontras? Verifica a pasta de spam.",
    ctaBtn: "Experimentar o MyFitRout Grátis →",
    disclaimer: "⚕️ Valores baseados em estudos científicos. Recomendamos sempre consultar um nutricionista e médico.",
    error_required: "Nome e email são obrigatórios",
    error_conn: "Erro de ligação. Tenta novamente.",
  },
  en: {
    step1: "What is your main goal?",
    step2: "Your profile",
    step3: "Where should we send your plan?",
    age: "Age", weight: "Weight (kg)", height: "Height (cm)",
    gender: "Gender", male: "Male", female: "Female", other: "Other",
    days: "Available days per week",
    restrictions: "Food restrictions (optional)",
    restrictions_ph: "E.g. vegetarian, gluten intolerant...",
    level: "Experience level",
    name: "Name", name_ph: "Your name",
    next: "Continue →", back: "← Back",
    send: "Generate & Send Plan 🚀",
    sending: "Generating your plan with AI...",
    doneTitle: "Plan sent! 🎉",
    doneMsg: "Check your email — your personalized plan is on its way!",
    doneSpam: "Can't find it? Check your spam folder.",
    ctaBtn: "Try MyFitRout for Free →",
    disclaimer: "⚕️ Values based on scientific studies. We always recommend consulting a nutritionist and doctor.",
    error_required: "Name and email are required",
    error_conn: "Connection error. Please try again.",
  },
  es: {
    step1: "¿Cuál es tu objetivo principal?",
    step2: "Tu perfil",
    step3: "¿Dónde enviamos tu plan?",
    age: "Edad", weight: "Peso (kg)", height: "Altura (cm)",
    gender: "Género", male: "Masculino", female: "Femenino", other: "Otro",
    days: "Días disponibles por semana",
    restrictions: "Restricciones alimentarias (opcional)",
    restrictions_ph: "Ej: vegetariano, intolerante al gluten...",
    level: "Nivel de experiencia",
    name: "Nombre", name_ph: "Tu nombre",
    next: "Continuar →", back: "← Volver",
    send: "Generar y Enviar Plan 🚀",
    sending: "Generando tu plan con IA...",
    doneTitle: "¡Plan enviado! 🎉",
    doneMsg: "Revisa tu email — ¡tu plan personalizado está en camino!",
    doneSpam: "¿No lo encuentras? Revisa la carpeta de spam.",
    ctaBtn: "Probar MyFitRout Gratis →",
    disclaimer: "⚕️ Valores basados en estudios científicos. Siempre recomendamos consultar un nutricionista y médico.",
    error_required: "Nombre y email son obligatorios",
    error_conn: "Error de conexión. Inténtalo de nuevo.",
  },
};

// Auto-detect language from browser or prop
function detectLang(prop?: string): Lang {
  if (prop && ["pt","en","es"].includes(prop)) return prop as Lang;
  if (typeof navigator !== "undefined") {
    const bl = navigator.language?.toLowerCase() || "";
    if (bl.startsWith("pt")) return "pt";
    if (bl.startsWith("es")) return "es";
  }
  return "en";
}

type Step = "goal" | "profile" | "contact" | "sending" | "done";

export default function PlanForm({ lang: langProp }: { lang?: string }) {
  const [lang, setLang] = useState<Lang>("pt");
  useEffect(() => { setLang(detectLang(langProp)); }, [langProp]);

  const [step, setStep] = useState<Step>("goal");
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [form, setForm] = useState({ name:"", email:"", age:"", weight:"", height:"", gender:"", daysPerWeek:"3", restrictions:"" });
  const [error, setError] = useState("");

  const t = T[lang];
  const accent = "#7B4FD4";
  const inputStyle = { width:"100%", padding:"11px 14px", borderRadius:10, border:"1px solid var(--border)", background:"var(--bg-main)", color:"var(--text-primary)", fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box" as const };
  const labelStyle = { color:"var(--text-secondary)", fontSize:13, fontWeight:600 as const, display:"block" as const, marginBottom:6 };

  const handleSend = async () => {
    if (!form.name || !form.email) { setError(t.error_required); return; }
    setError(""); setStep("sending");
    try {
      const res = await fetch("/api/plano-gratis", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...form, goal, level, lang }),
      });
      const data = await res.json();
      if (data.success) setStep("done");
      else { setStep("contact"); setError(data.error || "Error"); }
    } catch { setStep("contact"); setError(t.error_conn); }
  };

  // Language switcher
  const LangSwitch = () => (
    <div style={{ display:"flex", gap:6, justifyContent:"flex-end", marginBottom:16 }}>
      {(["pt","en","es"] as Lang[]).map(l => (
        <button key={l} onClick={() => setLang(l)} style={{ padding:"3px 10px", borderRadius:20, border:`1px solid ${lang===l ? accent : "var(--border)"}`, background: lang===l ? `${accent}20` : "transparent", color: lang===l ? accent : "var(--text-muted)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit", textTransform:"uppercase" as const }}>
          {l}
        </button>
      ))}
    </div>
  );

  if (step === "done") return (
    <div style={{ textAlign:"center", padding:"40px 0" }}>
      <div style={{ fontSize:52, marginBottom:14 }}>🎉</div>
      <h3 style={{ fontFamily:"Syne,sans-serif", fontSize:22, fontWeight:800, color:"var(--text-primary)", marginBottom:8 }}>{t.doneTitle}</h3>
      <p style={{ color:"var(--text-secondary)", marginBottom:6 }}>{t.doneMsg}</p>
      <p style={{ color:"var(--text-muted)", fontSize:13, marginBottom:28 }}>{t.doneSpam}</p>
      <a href="https://myfitrout.com" target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", background:`linear-gradient(135deg,${accent},#9B6FF4)`, color:"#fff", fontWeight:700, fontSize:15, padding:"13px 28px", borderRadius:12, textDecoration:"none" }}>
        {t.ctaBtn}
      </a>
    </div>
  );

  if (step === "sending") return (
    <div style={{ textAlign:"center", padding:"40px 0" }}>
      <div style={{ width:44, height:44, border:`3px solid ${accent}`, borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 18px" }} />
      <p style={{ color:"var(--text-secondary)" }}>{t.sending}</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div>
      <LangSwitch />

      {/* Progress */}
      <div style={{ display:"flex", gap:4, marginBottom:24 }}>
        {["goal","profile","contact"].map((s,i) => (
          <div key={s} style={{ flex:1, height:4, borderRadius:4, background:["goal","profile","contact"].indexOf(step)>=i ? accent : "var(--border)", transition:"background 0.3s" }} />
        ))}
      </div>

      {/* STEP 1 — Goal */}
      {step === "goal" && (
        <div>
          <h3 style={{ fontFamily:"Syne,sans-serif", fontSize:17, fontWeight:800, color:"var(--text-primary)", marginBottom:14 }}>{t.step1}</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:22 }}>
            {GOALS.map(g => {
              const label = g[lang];
              const active = goal === label;
              return (
                <button key={g.id} onClick={() => setGoal(label)} style={{ padding:"11px 10px", borderRadius:12, border:`2px solid ${active ? accent : "var(--border)"}`, background: active ? `${accent}18` : "transparent", color: active ? accent : "var(--text-secondary)", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:8, transition:"all 0.15s" }}>
                  <span style={{ fontSize:18 }}>{g.emoji}</span>{label}
                </button>
              );
            })}
          </div>
          <button onClick={() => goal && setStep("profile")} disabled={!goal} style={{ width:"100%", padding:"13px", borderRadius:12, border:"none", background: goal ? `linear-gradient(135deg,${accent},#9B6FF4)` : "var(--border)", color:"#fff", fontWeight:700, fontSize:15, cursor: goal ? "pointer" : "not-allowed", fontFamily:"inherit" }}>
            {t.next}
          </button>
        </div>
      )}

      {/* STEP 2 — Profile */}
      {step === "profile" && (
        <div>
          <h3 style={{ fontFamily:"Syne,sans-serif", fontSize:17, fontWeight:800, color:"var(--text-primary)", marginBottom:14 }}>{t.step2}</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            <div><label style={labelStyle}>{t.age}</label><input type="number" placeholder="25" value={form.age} onChange={e=>setForm(f=>({...f,age:e.target.value}))} style={inputStyle} /></div>
            <div><label style={labelStyle}>{t.gender}</label>
              <select value={form.gender} onChange={e=>setForm(f=>({...f,gender:e.target.value}))} style={inputStyle}>
                <option value="">--</option>
                <option value="masculino">{t.male}</option>
                <option value="feminino">{t.female}</option>
                <option value="outro">{t.other}</option>
              </select>
            </div>
            <div><label style={labelStyle}>{t.weight}</label><input type="number" placeholder="70" value={form.weight} onChange={e=>setForm(f=>({...f,weight:e.target.value}))} style={inputStyle} /></div>
            <div><label style={labelStyle}>{t.height}</label><input type="number" placeholder="170" value={form.height} onChange={e=>setForm(f=>({...f,height:e.target.value}))} style={inputStyle} /></div>
          </div>
          <div style={{ marginBottom:12 }}>
            <label style={labelStyle}>{t.level}</label>
            <div style={{ display:"flex", gap:6 }}>
              {LEVELS.map(l => {
                const label = l[lang]; const desc = l[`desc_${lang}` as keyof typeof l];
                const active = level === label;
                return <button key={l.id} onClick={()=>setLevel(label)} style={{ flex:1, padding:"9px 6px", borderRadius:10, border:`2px solid ${active?accent:"var(--border)"}`, background:active?`${accent}18`:"transparent", color:active?accent:"var(--text-secondary)", cursor:"pointer", fontFamily:"inherit", fontSize:12, fontWeight:600, textAlign:"center" as const }}>
                  <div>{label}</div><div style={{ fontSize:10, opacity:0.7, marginTop:2 }}>{desc}</div>
                </button>;
              })}
            </div>
          </div>
          <div style={{ marginBottom:12 }}>
            <label style={labelStyle}>{t.days}: <strong style={{ color:accent }}>{form.daysPerWeek}x</strong></label>
            <input type="range" min="2" max="6" value={form.daysPerWeek} onChange={e=>setForm(f=>({...f,daysPerWeek:e.target.value}))} style={{ width:"100%", accentColor:accent }} />
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={labelStyle}>{t.restrictions}</label>
            <input type="text" placeholder={t.restrictions_ph} value={form.restrictions} onChange={e=>setForm(f=>({...f,restrictions:e.target.value}))} style={inputStyle} />
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setStep("goal")} style={{ padding:"12px 18px", borderRadius:12, border:"1px solid var(--border)", background:"transparent", color:"var(--text-secondary)", cursor:"pointer", fontFamily:"inherit" }}>{t.back}</button>
            <button onClick={()=>setStep("contact")} style={{ flex:1, padding:"13px", borderRadius:12, border:"none", background:`linear-gradient(135deg,${accent},#9B6FF4)`, color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"inherit" }}>{t.next}</button>
          </div>
        </div>
      )}

      {/* STEP 3 — Contact */}
      {step === "contact" && (
        <div>
          <h3 style={{ fontFamily:"Syne,sans-serif", fontSize:17, fontWeight:800, color:"var(--text-primary)", marginBottom:14 }}>{t.step3}</h3>
          <div style={{ marginBottom:12 }}>
            <label style={labelStyle}>{t.name}</label>
            <input type="text" placeholder={t.name_ph} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={inputStyle} />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={labelStyle}>Email</label>
            <input type="email" placeholder="email@exemplo.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} style={inputStyle} onKeyDown={e=>e.key==="Enter"&&handleSend()} />
          </div>
          {error && <p style={{ color:"#ef4444", fontSize:13, marginBottom:12 }}>{error}</p>}
          <p style={{ color:"var(--text-muted)", fontSize:12, lineHeight:1.6, marginBottom:14, padding:"10px 14px", background:"rgba(249,115,22,0.06)", borderRadius:8, borderLeft:"3px solid #F97316" }}>
            {t.disclaimer}
          </p>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setStep("profile")} style={{ padding:"12px 18px", borderRadius:12, border:"1px solid var(--border)", background:"transparent", color:"var(--text-secondary)", cursor:"pointer", fontFamily:"inherit" }}>{t.back}</button>
            <button onClick={handleSend} style={{ flex:1, padding:"13px", borderRadius:12, border:"none", background:`linear-gradient(135deg,${accent},#9B6FF4)`, color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"inherit" }}>{t.send}</button>
          </div>
        </div>
      )}
    </div>
  );
}
