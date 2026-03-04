import { getPostBySlug, getAllPosts, Lang, categoryLabels } from '@/lib/blog'
import Navbar from '@/components/Navbar'
import AdBanner from '@/components/AdBanner'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const ptPosts = getAllPosts('pt').map(p => ({ lang: 'pt', slug: p.slug }))
  const enPosts = getAllPosts('en').map(p => ({ lang: 'en', slug: p.slug }))
  return [...ptPosts, ...enPosts]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const post = getPostBySlug(lang as Lang, slug)
  if (!post) return {}
  return { title: post.title, description: post.description }
}

function parseMarkdown(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])(.+)$/gm, (line) => line.trim() ? line : '')
    .replace(/^<\/p><p>(<[hul])/gm, '$1')
    .replace(/(<\/[hul][^>]*>)<\/p><p>/gm, '$1')
}

export default async function PostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (lang !== 'pt' && lang !== 'en') notFound()
  const post = getPostBySlug(lang as Lang, slug)
  if (!post) notFound()

  const catLabel = categoryLabels[post.category]?.[lang as Lang] || post.category
  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === 'pt' ? 'pt-BR' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  const htmlContent = `<p>${parseMarkdown(post.content)}</p>`

  const backLabel = lang === 'pt' ? '← Voltar ao Blog' : '← Back to Blog'
  const ctaTitle = lang === 'pt' ? 'Quer um treino personalizado?' : 'Want a personalized workout?'
  const ctaDesc = lang === 'pt' ? 'O MyFitRout usa IA para criar o plano perfeito para ti.' : 'MyFitRout uses AI to create the perfect plan for you.'
  const ctaBtn = lang === 'pt' ? 'Experimentar grátis →' : 'Try for free →'

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        {/* Header */}
        <section style={{ background: 'linear-gradient(135deg, #0A0F0D 0%, #0d1f14 100%)', borderBottom: '1px solid #1E2B22', padding: '56px 24px 48px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <Link href={`/blog/${lang}`} style={{ color: '#5A7060', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
              {backLabel}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ background: 'rgba(0,232,122,0.15)', color: '#00E87A', border: '1px solid rgba(0,232,122,0.3)', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {catLabel}
              </span>
              <span style={{ color: '#5A7060', fontSize: '13px' }}>{formattedDate}</span>
              <span style={{ color: '#5A7060', fontSize: '13px' }}>·</span>
              <span style={{ color: '#5A7060', fontSize: '13px' }}>{post.readingTime}</span>
            </div>
            <h1 style={{ fontFamily: 'sans-serif', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>
              {post.title}
            </h1>
            <p style={{ fontSize: '17px', color: '#5A7060', lineHeight: 1.6 }}>{post.description}</p>
          </div>
        </section>

        {/* Ad top */}
        <div style={{ maxWidth: '720px', margin: '32px auto 0', padding: '0 24px' }}>
          <AdBanner format="horizontal" />
        </div>

        {/* Article content */}
        <article style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px' }}>
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>

        {/* Ad mid */}
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px 40px' }}>
          <AdBanner format="rectangle" />
        </div>

        {/* CTA */}
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(0,232,122,0.08), rgba(0,232,122,0.03))', border: '1px solid rgba(0,232,122,0.3)', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'sans-serif', fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '10px' }}>{ctaTitle}</h3>
            <p style={{ color: '#5A7060', fontSize: '15px', marginBottom: '24px' }}>{ctaDesc}</p>
            <a href="https://myfitrout.com" style={{ background: '#00E87A', color: '#000', fontWeight: 700, fontSize: '15px', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>{ctaBtn}</a>
          </div>
        </div>

        <footer style={{ borderTop: '1px solid #1E2B22', padding: '32px 24px', textAlign: 'center' }}>
          <p style={{ color: '#5A7060', fontSize: '13px' }}>© 2024 MyFitRout Blog · <a href="https://myfitrout.com" style={{ color: '#00E87A', textDecoration: 'none' }}>myfitrout.com</a></p>
        </footer>
      </main>
    </>
  )
}
