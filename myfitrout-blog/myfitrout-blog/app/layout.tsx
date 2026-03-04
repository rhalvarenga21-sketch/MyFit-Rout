import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MyFitRout Blog — Treino, Nutrição & Saúde",
    template: "%s | MyFitRout Blog",
  },
  description: "Artigos práticos e baseados em ciência sobre treino, nutrição e saúde. Conteúdo gratuito para atingires os teus objetivos fitness.",
  metadataBase: new URL("https://blog.myfitrout.com"),
  openGraph: { type: "website", siteName: "MyFitRout Blog" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4439834790483319"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const t = localStorage.getItem('theme') || 'dark';
              document.documentElement.setAttribute('data-theme', t);
            } catch(e) {}
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
