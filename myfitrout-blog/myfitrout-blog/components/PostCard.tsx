import Link from 'next/link'
import { Post, categoryLabels } from '@/lib/blog'

interface PostCardProps {
  post: Post
  index?: number
}

const categoryColors: Record<string, string> = {
  treino: '#00E87A',
  nutricao: '#60B0FF',
  motivacao: '#FFA000',
  saude: '#FF6060',
  fitness: '#00E87A',
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const catLabel = categoryLabels[post.category]?.[post.lang] || post.category
  const catColor = categoryColors[post.category] || '#00E87A'

  const formattedDate = new Date(post.date).toLocaleDateString(
    post.lang === 'pt' ? 'pt-BR' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <Link
      href={`/blog/${post.lang}/${post.slug}`}
      style={{ animationDelay: `${index * 0.1}s`, textDecoration: 'none', display: 'block' }}
      className="animate-fade-up group"
    >
      <article
        style={{
          background: '#111810',
          border: '1px solid #1E2B22',
          borderRadius: '16px',
          padding: '28px 24px',
          transition: 'border-color 0.3s, transform 0.3s',
          height: '100%',
        }}
        className="group-hover:border-green-500/40 group-hover:-translate-y-1"
      >
        {/* Category tag */}
        <div className="flex items-center justify-between mb-4">
          <span style={{
            background: `${catColor}18`,
            color: catColor,
            border: `1px solid ${catColor}40`,
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '20px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            {catLabel}
          </span>
          <span style={{ fontSize: '12px', color: '#5A7060' }}>{post.readingTime}</span>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-syne, sans-serif)',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: 'white',
          lineHeight: 1.3,
          marginBottom: '10px',
          transition: 'color 0.2s',
        }} className="group-hover:text-green-400">
          {post.title}
        </h2>

        {/* Description */}
        <p style={{ fontSize: '14px', color: '#5A7060', lineHeight: 1.6, marginBottom: '20px' }}>
          {post.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span style={{ fontSize: '12px', color: '#5A7060' }}>{formattedDate}</span>
          <span style={{ fontSize: '13px', color: '#00E87A', fontWeight: 600 }}>
            {post.lang === 'pt' ? 'Ler artigo →' : 'Read more →'}
          </span>
        </div>
      </article>
    </Link>
  )
}
