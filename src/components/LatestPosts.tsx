'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import { type Locale } from '@/i18n'
import type { Post } from '@/lib/posts'

interface Props {
  posts: Post[]
  locale: Locale
}

function TickerItem({ post, locale }: { post: Post; locale: Locale }) {
  const dateLocale = locale === 'zh' ? zhCN : enUS
  const dateFmt = locale === 'zh' ? 'M月d日' : 'MMM d'

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group block px-4 py-2.5 border-b border-cream-200/60 hover:bg-cream-100/60 transition-colors duration-200"
    >
      <div className="flex items-baseline gap-2">
        <span className="text-[0.6rem] text-neutral-400 whitespace-nowrap">
          {format(new Date(post.date), dateFmt, { locale: dateLocale })}
        </span>
        <span className="text-neutral-300 text-[0.5rem]">●</span>
        <h4 className="text-[0.78rem] font-medium text-neutral-600 leading-snug group-hover:text-accent-600 transition-colors line-clamp-1">
          {post.title}
        </h4>
      </div>
    </Link>
  )
}

function TickerColumn({ posts, locale, direction }: { posts: Post[]; locale: Locale; direction: 'up' | 'down' }) {
  // Duplicate posts for seamless infinite scroll
  const doubled = [...posts, ...posts]

  return (
    <div
      className="ticker-col overflow-hidden"
      style={{ animationName: direction === 'up' ? 'ticker-scroll-up' : 'ticker-scroll-down' }}
    >
      {doubled.map((post, i) => (
        <TickerItem key={`${post.slug}-${i}`} post={post} locale={locale} />
      ))}
    </div>
  )
}

export default function LatestPosts({ posts, locale }: Props) {
  if (posts.length === 0) return null

  const title = locale === 'zh' ? '最新文章' : 'Latest Posts'
  const leftPosts = posts.filter((_, i) => i % 2 === 0)
  const rightPosts = posts.filter((_, i) => i % 2 === 1)

  return (
    <section className="max-w-5xl mx-auto px-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <p className="text-[0.7rem] font-semibold text-neutral-400 uppercase tracking-wider">
          {title}
        </p>
        <div className="flex-1 h-px bg-cream-200" />
      </div>

      {/* Two-column auto-scrolling ticker */}
      <div className="grid grid-cols-2 gap-px bg-cream-200/40 rounded overflow-hidden border border-cream-200 h-56">
        <div className="bg-cream-50 ticker-pause overflow-hidden">
          <TickerColumn posts={leftPosts} locale={locale} direction="up" />
        </div>
        <div className="bg-cream-50 ticker-pause overflow-hidden">
          <TickerColumn posts={rightPosts} locale={locale} direction="up" />
        </div>
      </div>
    </section>
  )
}
