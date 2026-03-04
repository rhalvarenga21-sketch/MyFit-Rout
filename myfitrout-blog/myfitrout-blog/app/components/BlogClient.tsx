"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Post } from "@/lib/posts";
import PostCard from "./PostCard";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CATEGORIES = {
  pt: ["Todos", "Treino", "Nutricao", "Perda de Peso", "Motivacao"],
  en: ["All", "Training", "Nutrition", "Weight Loss", "Motivation"],
};
const LABELS: Record<string, string> = { "Nutricao": "Nutrição", "Motivacao": "Motivação" };
const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function BlogClient({ posts, lang }: { posts: Post[]; lang: "pt" | "en" }) {
  const cats = CATEGORIES[lang];
  const allLabel = lang === "pt" ? "Todos" : "All";
  const [active, setActive] = useState(allLabel);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(t);
    const obs = new MutationObserver(() => setTheme(document.documentElement.getAttribute("data-theme") || "dark"));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const label = (cat: string) => LABELS[cat] ?? cat;
  const filtered = active === allLabel ? posts : posts.filter(p => normalize(p.category) === normalize(active));

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <section style={{ padding: "48px 0 44px", textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: 900, height: 340, background: "radial-gradient(ellipse, rgba(123,79,212,0.13) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", width: "min(680px, 90vw)", height: "min(136px, 18vw)", margin: "0 auto 28px" }}>
            <Image src={theme === "light" ? "/images/hero-light.png" : "/images/hero-dark.png"} alt="MyFitRout" fill style={{ objectFit: "contain" }} priority />
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 440, margin: "0 auto 32px", lineHeight: 1.65 }}>
            {lang === "pt" ? "Artigos práticos e baseados em ciência para transformares o teu corpo." : "Practical, science-based articles to transform your body and health."}
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{ background: active === cat ? "linear-gradient(135deg, var(--purple), var(--purple-light))" : "var(--bg-card)", color: active === cat ? "#fff" : "var(--text-secondary)", border: "1px solid " + (active === cat ? "transparent" : "var(--border)"), fontSize: 13, fontWeight: 600, padding: "8px 20px", borderRadius: 20, cursor: "pointer", boxShadow: active === cat ? "0 4px 14px rgba(123,79,212,0.3)" : "none", transition: "all 0.2s", fontFamily: "inherit" }}>{label(cat)}</button>
            ))}
          </div>
        </section>
        <section style={{ paddingBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
              {active === allLabel ? (lang === "pt" ? "Artigos Recentes" : "Recent Articles") : label(active)}
            </h2>
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{filtered.length} {lang === "pt" ? "artigos" : "articles"}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {filtered.map((post, i) => <PostCard key={post.slug} post={post} delay={i * 60} />)}
          </div>
        </section>
        <section style={{ background: "linear-gradient(135deg, var(--purple-dim), transparent)", border: "1px solid rgba(123,79,212,0.2)", borderRadius: 20, padding: "48px 40px", textAlign: "center", marginBottom: 56 }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
            {lang === "pt" ? "Quer treinos personalizados? 💪" : "Want personalized workouts? 💪"}
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, margin: "0 auto 28px", maxWidth: 460 }}>
            {lang === "pt" ? "O MyFitRout cria programas adaptados ao teu nível — powered by Google Gemini AI." : "MyFitRout creates programs adapted to your level — powered by Google Gemini AI."}
          </p>
          <a href="https://myfitrout.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "linear-gradient(135deg, var(--purple), var(--purple-light))", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 30px", borderRadius: 10, textDecoration: "none", boxShadow: "0 6px 24px rgba(123,79,212,0.3)" }}>
            {lang === "pt" ? "Começar Agora — É Grátis →" : "Start Now — It's Free →"}
          </a>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}