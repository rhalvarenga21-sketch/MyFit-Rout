import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SuggestionBox from "../../components/SuggestionBox";

export async function generateStaticParams() {
  return getAllPosts("pt").map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "pt");
  if (!post) return {};
  return { title: post.title, description: post.description };
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 style="font-family:Syne,sans-serif;font-size:20px;font-weight:700;color:var(--text-primary);margin:36px 0 14px;letter-spacing:-0.3px">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-family:Syne,sans-serif;font-size:27px;font-weight:800;color:var(--text-primary);margin:48px 0 18px;letter-spacing:-0.5px">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text-primary);font-weight:700">$1</strong>')
    .replace(/^- (.+)$/gm, '<li style="color:var(--text-secondary);margin:8px 0;padding-left:8px;line-height:1.7">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul style="padding-left:24px;margin:16px 0;list-style:disc;color:var(--green)">${match}</ul>`)
    .split('\n\n')
    .map(block => {
      if (block.startsWith('<h') || block.startsWith('<ul')) return block;
      return `<p style="color:var(--text-secondary);font-size:16px;line-height:1.85;margin:0 0 20px">${block}</p>`;
    })
    .join('');
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "pt");
  if (!post) notFound();

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Navbar />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Back */}
        <a href="/pt" style={{
          color: "var(--green-text)", fontSize: 14, fontWeight: 600,
          textDecoration: "none", display: "inline-flex", alignItems: "center",
          gap: 6, marginBottom: 40,
          padding: "8px 16px", background: "var(--bg-card)",
          border: "1px solid var(--border)", borderRadius: 10,
          transition: "border-color 0.2s",
        }}>
          ← Voltar ao blog
        </a>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
            <span style={{ background: "var(--green-dim)", color: "var(--green-text)", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>
              {post.category}
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{post.readingTime}</span>
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>·</span>
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
              {new Date(post.date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          <h1 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 800, color: "var(--text-primary)",
            lineHeight: 1.15, marginBottom: 18, letterSpacing: "-1px",
          }}>
            {post.title}
          </h1>

          <p style={{ color: "var(--text-secondary)", fontSize: 19, lineHeight: 1.65, borderLeft: "3px solid var(--green)", paddingLeft: 16 }}>
            {post.description}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: 44 }} />

        {/* Content */}
        <article dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

        {/* Suggestion Box */}
        <SuggestionBox lang="pt" />

        {/* CTA */}
        <div style={{
          marginTop: 72,
          background: "linear-gradient(135deg, var(--green-dim), transparent)",
          border: "1px solid rgba(0,232,100,0.25)",
          borderRadius: 18, padding: "36px 32px", textAlign: "center",
        }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text-primary)", marginBottom: 10 }}>
            Quer um treino personalizado? 💪
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 22 }}>
            O MyFitRout cria programas adaptados ao teu nível e objetivos — powered by AI.
          </p>
          <a href="https://myfitrout.com" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", background: "var(--green)", color: "#000",
            fontWeight: 700, fontSize: 14, padding: "12px 26px", borderRadius: 10, textDecoration: "none",
          }}>
            Começar Agora — É Grátis →
          </a>
        </div>
      </main>
      <Footer lang="pt" />
    </div>
  );
}
