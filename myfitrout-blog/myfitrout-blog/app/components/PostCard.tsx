"use client";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/posts";

const categoryColors: Record<string, string> = {
  "treino": "#7B4FD4", "training": "#7B4FD4",
  "nutricao": "#22C55E", "nutrição": "#22C55E", "nutrition": "#22C55E",
  "perda de peso": "#F97316", "weight loss": "#F97316",
  "motivação": "#EC4899", "motivacao": "#EC4899", "motivation": "#EC4899",
};

const categoryDisplay: Record<string, string> = {
  "nutricao": "Nutrição",
  "nutrição": "Nutrição",
  "motivacao": "Motivação",
  "motivação": "Motivação",
};

export default function PostCard({ post, delay = 0 }: { post: Post; delay?: number }) {
  const href = `/${post.lang}/${post.slug}`;
  const cat = post.category.toLowerCase();
  const color = categoryColors[cat] || "#7B4FD4";
  const displayCat = categoryDisplay[cat] || post.category;

  return (
    <Link href={href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <article
        className="animate-up"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 16, overflow: "hidden",
          transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
          cursor: "pointer", animationDelay: `${delay}ms`,
          height: "100%", display: "flex", flexDirection: "column",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = color;
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = `0 12px 40px ${color}30`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "var(--border)";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Image area */}
        <div style={{ position: "relative", height: 190, overflow: "hidden", background: "var(--bg-card-hover)", flexShrink: 0 }}>
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              background: `linear-gradient(135deg, ${color}22, ${color}08)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 48,
            }}>💪</div>
          )}
          {/* Category badge over image */}
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}>
            <span style={{
              background: color, color: "#fff",
              fontSize: 10, fontWeight: 700,
              padding: "4px 10px", borderRadius: 20,
              letterSpacing: 0.8, textTransform: "uppercase",
            }}>{displayCat}</span>
          </div>
        </div>

        <div style={{ padding: "16px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
          <span style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 8, display: "block" }}>
            {post.readingTime}
          </span>

          <h2 style={{
            fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700,
            color: "var(--text-primary)", lineHeight: 1.35, marginBottom: 10, flex: 1,
          }}>{post.title}</h2>

          <p style={{
            color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.65,
            marginBottom: 16, display: "-webkit-box",
            WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{post.description}</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
              {new Date(post.date).toLocaleDateString(
                post.lang === "pt" ? "pt-BR" : "en-US",
                { day: "numeric", month: "short", year: "numeric" }
              )}
            </span>
            <span style={{ color, fontSize: 13, fontWeight: 700 }}>
              {post.lang === "pt" ? "Ler →" : "Read →"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
