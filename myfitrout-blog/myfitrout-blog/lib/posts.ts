import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export type Lang = 'pt' | 'en'

export interface Post {
  slug: string
  lang: Lang
  title: string
  description: string
  date: string
  category: string
  readingTime: string
  content: string
  image?: string
}

const contentDir = path.join(process.cwd(), 'content')

export function getAllPosts(lang: Lang): Post[] {
  const dir = path.join(contentDir, lang)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))

  return files
    .map(filename => {
      const slug = filename.replace('.md', '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data, content } = matter(raw)
      const rt = readingTime(content)

      return {
        slug,
        lang,
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category,
        readingTime: lang === 'pt' ? `${Math.ceil(rt.minutes)} min de leitura` : `${Math.ceil(rt.minutes)} min read`,
        content,
        image: data.image || null,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string, lang: Lang): Post | null {
  const filepath = path.join(contentDir, lang, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    lang,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    readingTime: lang === 'pt' ? `${Math.ceil(rt.minutes)} min de leitura` : `${Math.ceil(rt.minutes)} min read`,
    content,
    image: data.image || null,
  }
}

export function getAllCategories(lang: Lang): string[] {
  const posts = getAllPosts(lang)
  const cats = posts.map(p => p.category)
  return [...new Set(cats)]
}
