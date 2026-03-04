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
  coverImage?: string
}

const contentDir = path.join(process.cwd(), 'content')

export function getAllPosts(lang: Lang): Post[] {
  const dir = path.join(contentDir, lang)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const filePath = path.join(dir, filename)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const stats = readingTime(content)

    return {
      slug,
      lang,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      category: data.category || 'fitness',
      readingTime: stats.text,
      content,
      coverImage: data.coverImage || null,
    } as Post
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(lang: Lang, slug: string): Post | null {
  const filePath = path.join(contentDir, lang, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const stats = readingTime(content)

  return {
    slug,
    lang,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    category: data.category || 'fitness',
    readingTime: stats.text,
    content,
    coverImage: data.coverImage || null,
  }
}

export function getAllCategories(lang: Lang): string[] {
  const posts = getAllPosts(lang)
  const cats = [...new Set(posts.map(p => p.category))]
  return cats
}

export const categoryLabels: Record<string, { pt: string; en: string }> = {
  treino: { pt: 'Treino', en: 'Workout' },
  nutricao: { pt: 'Nutrição', en: 'Nutrition' },
  motivacao: { pt: 'Motivação', en: 'Motivation' },
  saude: { pt: 'Saúde', en: 'Health' },
  fitness: { pt: 'Fitness', en: 'Fitness' },
}
