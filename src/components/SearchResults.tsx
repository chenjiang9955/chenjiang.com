'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import type { Locale } from '@/i18n'
import { categoryNames } from '@/i18n'

interface PostMeta {
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  date: string
  readingTime: number
}

function SearchResultsInner({ locale, posts }: { locale: Locale; posts: PostMeta[] }) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const dateLocale = locale === 'zh' ? zhCN : enUS
  const dateFmt = locale === 'zh' ? 'yyyy年M月d日' : 'MMM d, yyyy'

  const q = query.toLowerCase()
  const results = query.trim()
    ? posts.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      )
    : posts

  return (
    <div>
      {query && (
        <p className="text-sm text-neutral-500 mb-8">
          {locale === 'zh'
            ? `搜索「${query}」：找到 ${results.length} 篇文章`
            : `Search for "${query}": ${results.length} results`}
        </p>
      )}

      {results.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-400 text-lg">
            {locale === 'zh' ? '没有找到相关文章' : 'No matching articles found'}
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {results.map(post => (
            <article key={post.slug} className="group">
              <div className="flex items-center gap-3 mb-2">
                <Link
                  href={`/${locale}/category/${post.category}`}
                  className="category-tag"
                >
                  {categoryNames[post.category]?.[locale] || post.category}
                </Link>
                <span className="text-xs text-neutral-400">
                  {format(new Date(post.date), dateFmt, { locale: dateLocale })}
                </span>
                <span className="text-xs text-neutral-400">·</span>
                <span className="text-xs text-neutral-400">
                  {post.readingTime} {locale === 'zh' ? '分钟' : 'min'}
                </span>
              </div>

              <Link href={`/${locale}/blog/${post.slug}`}>
                <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 group-hover:text-accent-600 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SearchResults({ locale, posts }: { locale: Locale; posts: PostMeta[] }) {
  return (
    <Suspense>
      <SearchResultsInner locale={locale} posts={posts} />
    </Suspense>
  )
}
