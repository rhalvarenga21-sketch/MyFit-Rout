import { getAllPosts, Lang } from '@/lib/blog'
import PostCard from '@/components/PostCard'
import Navbar from '@/components/Navbar'
import AdBanner from '@/components/AdBanner'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return {
    title: lang === 'pt' ? 'Blog — Treino, Nutrição e Motivação' : 'Blog — Workout, Nutrition and Motivation',
    description: lang === 'pt' ? 'Artigos práticos sobre fitness, treino e nutrição.' : 'Practical articles about fitness, workouts and nutrition.',
  }
}

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (lang !== 'pt' && lang !== 'en') notFound()
  const posts = getAllPosts(lang as Lang)

  const ui = lang === 'pt' ? {
    heroSub: 'Treino, Nutrição e Motivação',
    hero: 'Blog MyFitRout',
    heroDesc: 'Artigos práticos para atingires os teus objetivos fitness.',
    allPosts: 'Todos os Artigos',
    noPosts: 'Nenhum artigo ainda. Em breve!',
    switchLang: '🇺🇸 Read in English',
    switchHref: '/blog/en',
    ctaTitle: 'Pronto para treinar?',
    ctaDesc: 'O MyFitRout cria o teu plano de treino personalizado com IA.',
    ctaBtn: 'Começar grátis →',
  } : {
    heroSub: 'Workout, Nutrition & Motivation',
    hero: 'MyFitRout Blog',
    heroDesc: 'Practical articles to help you reach your fitness goals.',
    allPosts: 'All Articles',
    noPosts: 'No articles yet. Coming soon!',
    switchLang: '🇧🇷 Ler em Português',
    switchHref: '/blog/pt',
    ctaTitle: 'Ready to train?',
    ctaDesc: 'MyFitRout creates your personalized AI-powered workout plan.',
    ctaBtn: 'Start for free →',
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        <section style={{ background: 'linear-gradient(135deg, #0A0F0D 0%, #0d1f14 100%)', borderBottom: '1px solid #1E2B22', padding: '72px 24px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(0,232,122,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,232,122,0.1)', border: '1px solid rgba(0,232,122,0.3)', color: '#00E87A', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '20px', marginBottom: '20px' }}>
              💪 {ui.heroSub}
            </div>
            <h1 style={{ fontFamily: 'sans-serif', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>{ui.hero}</h1>
            <p style={{ fontSize: '17px', color: '#5A7060', marginBottom: '24px', lineHeight: 1.6 }}>{ui.heroDesc}</p>
            <Link href={ui.switchHref} style={{ color: '#5A7060', fontSize: '13px', textDecoration: 'none', border: '1px solid #1E2B22', padding: '6px 14px', borderRadius: '8px' }}>{ui.switchLang}</Link>
          </div>
        </section>

        <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 24px' }}>
          <AdBanner format="horizontal" />
        </div>

        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
          <h2 style={{ fontFamily: 'sans-serif', fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '28px' }}>
            {ui.allPosts} <span style={{ color: '#5A7060', fontSize: '16px', fontWeight: 400 }}>({posts.length})</span>
          </h2>
          {posts.length === 0 ? (
            <p style={{ color: '#5A7060', textAlign: 'center', padding: '60px 0' }}>{ui.noPosts}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {posts.map((post, i) => <PostCard key={post.slug} post={post} index={i} />)}
            </div>
          )}
        </section>

        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(0,232,122,0.08), rgba(0,232,122,0.03))', border: '1px solid rgba(0,232,122,0.3)', borderRadius: '20px', padding: '48px 40px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'sans-serif', fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>{ui.ctaTitle}</h3>
            <p style={{ color: '#5A7060', fontSize: '16px', marginBottom: '28px' }}>{ui.ctaDesc}</p>
            <a href="https://myfitrout.com" style={{ background: '#00E87A', color: '#000', fontWeight: 700, fontSize: '16px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', display: 'inline-block' }}>{ui.ctaBtn}</a>
          </div>
        </section>

        <footer style={{ borderTop: '1px solid #1E2B22', padding: '32px 24px', textAlign: 'center' }}>
          <p style={{ color: '#5A7060', fontSize: '13px' }}>© 2024 MyFitRout Blog · <a href="https://myfitrout.com" style={{ color: '#00E87A', textDecoration: 'none' }}>myfitrout.com</a></p>
        </footer>
      </main>
    </>
  )
}
