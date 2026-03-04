"use client";
import { useState } from "react";

const TOPICS = [
  { emoji: "📚", pt: "Resumo de livro", en: "Book summary" },
  { emoji: "🔬", pt: "Estudo científico", en: "Scientific study" },
  { emoji: "🎧", pt: "Podcast/Vídeo", en: "Podcast/Video" },
  { emoji: "🏋️", pt: "Técnica de treino", en: "Training technique" },
  { emoji: "🥗", pt: "Nutrição/Receita", en: "Nutrition/Recipe" },
  { emoji: "🧠", pt: "Mentalidade", en: "Mindset" },
];

export default function SuggestionBox({ lang }: { lang: "pt" | "en" }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const toggle = (topic: string) => {
    setSelected(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const handleSubmit = async () => {
    if (selected.length === 0 && !custom.trim()) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    setSending(false);
    setSent(true);
  };

  const isPT = lang === "pt";

  if (sent) {
    return (
      <div style={{ marginTop: 56, padding: "36px 32px", borderRadius: 18, textAlign: "center", background: "linear-gradient(135deg, rgba(123,79,212,0.12), rgba(34,197,94,0.08))", border: "1px solid rgba(123,79,212,0.25)" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
        <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
          {isPT ? "Obrigado! 🙌" : "Thank you! 🙌"}
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 22 }}>
          {isPT ? "A tua sugestão foi recebida. Vemo-nos no próximo artigo!" : "Your suggestion has been received. See you in the next article!"}
        </p>
        <a href="https://myfitrout.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "linear-gradient(135deg, #7B4FD4, #9B6FF4)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "11px 24px", borderRadius: 10, textDecoration: "none" }}>
          {isPT ? "Experimenta o MyFitRout gratuitamente →" : "Try MyFitRout for free →"}
        </a>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 56, padding: "32px", borderRadius: 18, background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
        {isPT ? "O que queres ler a seguir? 🤔" : "What do you want to read next? 🤔"}
      </h3>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 20 }}>
        {isPT ? "As tuas sugestões moldam o próximo artigo:" : "Your suggestions shape the next article:"}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {TOPICS.map(topic => {
          const label = isPT ? topic.pt : topic.en;
          const isOn = selected.includes(label);
          return (
            <button key={label} onClick={() => toggle(label)} style={{ padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, border: isOn ? "1px solid #7B4FD4" : "1px solid var(--border)", background: isOn ? "rgba(123,79,212,0.15)" : "transparent", color: isOn ? "#9B6FF4" : "var(--text-secondary)", transition: "all 0.18s" }}>
              {topic.emoji} {label}
            </button>
          );
        })}
      </div>
      <input type="text" placeholder={isPT ? "Ex: Resumo do Atomic Habits..." : "E.g. Summary of Atomic Habits..."} value={custom} onChange={e => setCustom(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} style={{ width: "100%", padding: "11px 16px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-main)", color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit", outline: "none", marginBottom: 16, boxSizing: "border-box" as const }} />
      <button onClick={handleSubmit} disabled={sending || (selected.length === 0 && !custom.trim())} style={{ background: (selected.length > 0 || custom.trim()) ? "linear-gradient(135deg, #7B4FD4, #9B6FF4)" : "var(--border)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "11px 28px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit", opacity: sending ? 0.7 : 1 }}>
        {sending ? (isPT ? "A enviar..." : "Sending...") : (isPT ? "Enviar Sugestão" : "Send Suggestion")}
      </button>
    </div>
  );
}
