"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isEN = pathname.startsWith("/en");
  const lang = isEN ? "en" : "pt";
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const isDark = mounted && theme === "dark";

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link href={"/" + lang} style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <div style={{ position: "relative", height: 44, width: 220 }}>
            <Image src="/images/logo-text.png" alt="MyFitRout" fill style={{ objectFit: "contain", objectPosition: "left center" }} />
          </div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={toggleTheme} style={{ width: 36, height: 36, background: isDark ? "#2a1f4e" : "#f0eeff", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: isDark ? "#f5c518" : "#6b3fc4" }}>
            {isDark ? "☀" : "☾"}
          </button>
          <div style={{ display: "flex", background: "var(--bg-card)", borderRadius: 8, border: "1px solid var(--border)", overflow: "hidden" }}>
            <Link href="/pt" style={{ padding: "6px 12px", fontSize: 12, fontWeight: 700, textDecoration: "none", background: !isEN ? "var(--purple)" : "transparent", color: !isEN ? "#fff" : "var(--text-muted)" }}>PT</Link>
            <Link href="/en" style={{ padding: "6px 12px", fontSize: 12, fontWeight: 700, textDecoration: "none", background: isEN ? "var(--purple)" : "transparent", color: isEN ? "#fff" : "var(--text-muted)" }}>EN</Link>
          </div>
          <a href="https://myfitrout.com" target="_blank" rel="noopener noreferrer" style={{ background: "linear-gradient(135deg, var(--purple), var(--purple-light))", color: "#fff", fontWeight: 700, fontSize: 13, padding: "8px 16px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap" }}>
            {isEN ? "Try Free" : "Experimentar"}
          </a>
        </div>
      </div>
    </nav>
  );
}
