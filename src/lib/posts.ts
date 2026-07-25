import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'
import { getSectionByCategory, type Section } from '@/i18n'

export interface PostFrontmatter {
  slug: string
  locale: 'zh' | 'en'
  title: string
  excerpt: string
  coverImage?: string
  category: string
  tags: string[]
  date: string
  relatedId?: string
  featured?: boolean
  section?: Section
}

export interface Post extends PostFrontmatter {
  content: string
  readingTime: number
}

const postsDir = path.join(process.cwd(), 'content', 'posts')

function parseDate(dateStr: string): Date {
  return new Date(dateStr)
}

export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(postsDir)) return []

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))

  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8')
    const { data, content } = matter(raw)

    const wordCount = content.replace(/\s+/g, '').length
    const readingTime = Math.ceil(wordCount / 400) // Chinese chars per minute

    return {
      slug: data.slug || file.replace('.md', ''),
      locale: data.locale || 'zh',
      title: data.title || '',
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || undefined,
      category: data.category || 'personal-growth',
      tags: data.tags || [],
      date: data.date || new Date().toISOString().split('T')[0],
      relatedId: data.relatedId || undefined,
      featured: data.featured || false,
      content,
      readingTime,
    } as Post
  })

  return posts.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
})

export const getPostsByLocale = cache((locale: string): Post[] => {
  return getAllPosts().filter(p => p.locale === locale)
})

export const getPostBySlug = cache((slug: string, locale?: string): Post | null => {
  const all = getAllPosts()
  if (locale) {
    return all.find(p => p.slug === slug && p.locale === locale) || null
  }
  return all.find(p => p.slug === slug) || null
})

export const getPostsByCategory = cache((category: string, locale: string): Post[] => {
  return getAllPosts().filter(p => p.category === category && p.locale === locale)
})

export const getCategories = cache((locale: string): { name: string; count: number }[] => {
  const posts = getPostsByLocale(locale)
  const catMap: Record<string, number> = {}

  for (const post of posts) {
    catMap[post.category] = (catMap[post.category] || 0) + 1
  }

  return Object.entries(catMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

export const getRelatedPost = cache((post: Post): Post | null => {
  if (!post.relatedId) return null
  return getAllPosts().find(p => p.slug === post.relatedId && p.locale !== post.locale) || null
})

export const getAllTags = cache((locale: string): string[] => {
  const posts = getPostsByLocale(locale)
  const tagSet = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
})

export const searchPosts = cache((query: string, locale: string): Post[] => {
  const posts = getPostsByLocale(locale)
  if (!query.trim()) return posts

  const q = query.toLowerCase()
  return posts.filter(
    p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
  )
})

export const getFeaturedPosts = cache((locale: string): Post[] => {
  return getPostsByLocale(locale).filter(p => p.featured)
})

export function resolveSection(post: Post): Section {
  if (post.section) return post.section
  return getSectionByCategory(post.category)
}

export const getPostsBySection = cache((section: Section, locale: string): Post[] => {
  return getPostsByLocale(locale).filter(p => resolveSection(p) === section)
})

export const getHomepagePosts = cache((locale: string): Post[] => {
  const localePosts = getPostsByLocale(locale)

  if (locale === 'zh') return localePosts

  const translatedSourceSlugs = new Set(
    localePosts
      .map(post => post.relatedId)
      .filter((slug): slug is string => Boolean(slug))
  )

  const fallbackPosts = getAllPosts().filter(
    post => post.locale === 'zh' && !translatedSourceSlugs.has(post.slug)
  )

  return [...localePosts, ...fallbackPosts].sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
  )
})

export const getHomepagePostsBySection = cache((section: Section, locale: string): Post[] => {
  return getHomepagePosts(locale).filter(post => resolveSection(post) === section)
})
