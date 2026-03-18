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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "var(--nav-bg)" : "var(--nav-bg)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 64,
      }}>

        {/* Logo — apenas logo escrita com mix-blend */}
        <Link href={`/${lang}`} style={{ display: "flex", alignItems: "center", gap: 0, textDecoration: "none", flexShrink: 0 }}>
          <div style={{ position: "relative", height: 32, width: 160 }}>
            <Image
              src="/images/logo-text.png"
              alt="MyFitRout"
              fill
              style={{
                objectFit: "contain",
                objectPosition: "left center",
                mixBlendMode: theme === "light" ? "multiply" : "normal",
              }}
            />
          </div>
        </Link>

        {/* Center — Blog label */}
        <span style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700, fontSize: 13,
          color: "var(--text-muted)",
          letterSpacing: 2, textTransform: "uppercase",
          position: "absolute", left: "50%", transform: "translateX(-50%)",
        }}>
          Blog
        </span>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

          {/* Theme toggle */}
          <button onClick={toggleTheme} style={{
            width: 36, height: 36,
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: 8, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, transition: "all 0.2s",
          }}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Lang switcher */}
          <div style={{
            display: "flex", background: "var(--bg-card)",
            borderRadius: 8, border: "1px solid var(--border)", overflow: "hidden",
          }}>
            <Link href="/pt" style={{
              padding: "6px 12px", fontSize: 12, fontWeight: 700,
              textDecoration: "none",
              background: !isEN ? "var(--purple)" : "transparent",
              color: !isEN ? "#fff" : "var(--text-muted)",
            }}>PT</Link>
            <Link href="/en" style={{
              padding: "6px 12px", fontSize: 12, fontWeight: 700,
              textDecoration: "none",
              background: isEN ? "var(--purple)" : "transparent",
              color: isEN ? "#fff" : "var(--text-muted)",
            }}>EN</Link>
          </div>

          {/* CTA */}
          <a href="https://myfitrout.com" target="_blank" rel="noopener noreferrer" style={{
            background: "linear-gradient(135deg, var(--purple), var(--purple-light))",
            color: "#fff", fontWeight: 700, fontSize: 13,
            padding: "8px 16px", borderRadius: 8, textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            {isEN ? "Try Free →" : "Experimentar →"}
          </a>
        </div>
      </div>
    </nav>
  );
}
