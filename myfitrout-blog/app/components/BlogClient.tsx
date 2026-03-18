"use client";
import Image from "next/image";
import { useState } from "react";
import { Post } from "@/lib/posts";
import PostCard from "./PostCard";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CATEGORIES = {
  pt: ["Todos", "Treino", "Nutrição", "Perda de Peso", "Motivação"],
  en: ["All", "Training", "Nutrition", "Weight Loss", "Motivation"],
};

export default function BlogClient({ posts, lang }: { posts: Post[]; lang: "pt" | "en" }) {
  const cats = CATEGORIES[lang];
  const allLabel = lang === "pt" ? "Todos" : "All";
  const [active, setActive] = useState(allLabel);

  const filtered = active === allLabel
    ? posts
    : posts.filter(p => {
        const cat = p.category.toLowerCase();
        const sel = active.toLowerCase();
        if (sel === "nutrição" || sel === "nutrition") return ["nutrição","nutricao","nutrition"].includes(cat);
        return cat === sel;
      });

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* HERO BANNER */}
        <section style={{ padding: "64px 0 52px", textAlign: "center", position: "relative" }}>
          {/* Background glow */}
          <div style={{
            position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)",
            width: 700, height: 400,
            background: "radial-gradient(ellipse, rgba(123,79,212,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          {/* Logo grande */}
          <div style={{ position: "relative", height: 80, width: 360, margin: "0 auto 4px" }}>
            <Image src="/images/logo-text.png" alt="MyFitRout" fill style={{ objectFit: "contain" }} priority />
          </div>

          {/* BLOG label */}
          <p style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: 14, letterSpacing: 7, textTransform: "uppercase",
            color: "var(--text-muted)", marginBottom: 28,
          }}>BLOG</p>

          {/* Título */}
          <h1 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: 800, color: "var(--text-primary)",
            lineHeight: 1.12, marginBottom: 16, letterSpacing: "-1.5px",
          }}>
            {lang === "pt" ? <>Treino, Nutrição &{" "}<span style={{ background: "linear-gradient(135deg, var(--purple), var(--purple-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Saúde</span></> : <>Training, Nutrition &{" "}<span style={{ background: "linear-gradient(135deg, var(--purple), var(--purple-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Health</span></>}
          </h1>

          <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.65 }}>
            {lang === "pt"
              ? "Artigos práticos e baseados em ciência para transformares o teu corpo."
              : "Practical, science-based articles to transform your body and health."}
          </p>

          {/* Filtros — funcionais */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                background: active === cat ? "linear-gradient(135deg, var(--purple), var(--purple-light))" : "var(--bg-card)",
                color: active === cat ? "#fff" : "var(--text-secondary)",
                border: `1px solid ${active === cat ? "transparent" : "var(--border)"}`,
                fontSize: 13, fontWeight: 600, padding: "8px 20px",
                borderRadius: 20, cursor: "pointer",
                boxShadow: active === cat ? "0 4px 14px rgba(123,79,212,0.3)" : "none",
                transition: "all 0.2s", fontFamily: "inherit",
              }}>{cat}</button>
            ))}
          </div>
        </section>

        {/* Lista de artigos */}
        <section style={{ paddingBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
              {active === allLabel ? (lang === "pt" ? "Artigos Recentes" : "Recent Articles") : active}
            </h2>
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
              {filtered.length} {lang === "pt" ? (filtered.length === 1 ? "artigo" : "artigos") : (filtered.length === 1 ? "article" : "articles")}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <p>{lang === "pt" ? "Nenhum artigo nesta categoria ainda." : "No articles in this category yet."}</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
              {filtered.map((post, i) => <PostCard key={post.slug} post={post} delay={i * 60} />)}
            </div>
          )}
        </section>

        {/* CTA */}
        <section style={{
          background: "linear-gradient(135deg, var(--purple-dim), transparent)",
          border: "1px solid rgba(123,79,212,0.2)",
          borderRadius: 20, padding: "48px 40px", textAlign: "center", marginBottom: 56,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -60, top: -60, width: 280, height: 280, background: "radial-gradient(circle, rgba(123,79,212,0.1) 0%, transparent 70%)", borderRadius: "50%" }} />
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
            {lang === "pt" ? "Quer treinos personalizados? 💪" : "Want personalized workouts? 💪"}
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, margin: "0 auto 28px", maxWidth: 460 }}>
            {lang === "pt"
              ? "O MyFitRout cria programas adaptados ao teu nível, objetivos e equipamento — powered by Google Gemini AI."
              : "MyFitRout creates programs adapted to your level, goals and equipment — powered by Google Gemini AI."}
          </p>
          <a href="https://myfitrout.com" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, var(--purple), var(--purple-light))",
            color: "#fff", fontWeight: 700, fontSize: 15,
            padding: "13px 30px", borderRadius: 10, textDecoration: "none",
            boxShadow: "0 6px 24px rgba(123,79,212,0.3)",
          }}>
            {lang === "pt" ? "Começar Agora — É Grátis →" : "Start Now — It's Free →"}
          </a>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
