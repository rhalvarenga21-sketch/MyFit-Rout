import Image from "next/image";

export default function Footer({ lang = "pt" }: { lang?: string }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: 80, padding: "48px 24px 32px", background: "var(--bg-card)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 48 }}>

          <div>
            <div style={{ position: "relative", height: 28, width: 150, marginBottom: 16 }}>
              <Image
                src="/images/logo-text.png"
                alt="MyFitRout"
                fill
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              {lang === "pt"
                ? "Conteúdo gratuito sobre treino, nutrição e saúde para atingires os teus objetivos fitness."
                : "Free content about training, nutrition and health to help you reach your fitness goals."}
            </p>
            <a href="https://myfitrout.com" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", marginTop: 20,
              background: "linear-gradient(135deg, var(--purple), var(--purple-light))",
              color: "#fff", fontWeight: 700, fontSize: 13,
              padding: "9px 20px", borderRadius: 8, textDecoration: "none",
            }}>
              {lang === "pt" ? "🚀 Experimentar Grátis" : "🚀 Try Free"}
            </a>
          </div>

          <div>
            <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, color: "var(--text-primary)", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Blog</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(lang === "pt" ? ["Treino", "Nutrição", "Perda de Peso", "Motivação"] : ["Training", "Nutrition", "Weight Loss", "Motivation"]).map(cat => (
                <span key={cat} style={{ color: "var(--text-secondary)", fontSize: 14 }}>{cat}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, color: "var(--text-primary)", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
              {lang === "pt" ? "Produto" : "Product"}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: lang === "pt" ? "App MyFitRout" : "MyFitRout App", href: "https://myfitrout.com" },
                { label: lang === "pt" ? "Planos" : "Pricing", href: "https://myfitrout.com/#pricing" },
                { label: "FAQ", href: "https://myfitrout.com/#faq" },
                { label: lang === "pt" ? "Suporte" : "Support", href: "mailto:suporte@myfitrout.com" },
              ].map(link => (
                <a key={link.label} href={link.href} style={{ color: "var(--text-secondary)", fontSize: 14, textDecoration: "none" }}>{link.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>© {new Date().getFullYear()} MyFitRout. {lang === "pt" ? "Todos os direitos reservados." : "All rights reserved."}</span>
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{lang === "pt" ? "Feito com 💜 para atletas" : "Made with 💜 for athletes"}</span>
        </div>
      </div>
    </footer>
  );
}
