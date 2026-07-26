import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import { categoryNames, type Locale } from '@/i18n'
import type { Post } from '@/lib/posts'

export default function LatestPosts({ posts, locale }: { posts: Post[]; locale: Locale }) {
  if (!posts.length) return null
  const dateLocale = locale === 'zh' ? zhCN : enUS
  const dateFmt = locale === 'zh' ? 'yyyy.MM.dd' : 'MMM dd, yyyy'
  const readLabel = locale === 'zh' ? '分钟' : 'min'

  return (
    <section className="latest-shell">
      <div className="section-heading">
        <span>{locale === 'zh' ? '近作' : 'RECENT'}</span>
        <span>{posts.length.toString().padStart(2, '0')}</span>
      </div>
      <div className="latest-list">
        {posts.slice(0, 5).map((post, i) => (
          <Link
            key={post.slug}
            href={`/${post.locale}/blog/${post.slug}`}
            className={`latest-row${i === 0 ? ' latest-row-featured' : ''}`}
          >
            <div className="latest-row-main">
              <span className="latest-row-category">
                {i === 0
                  ? (locale === 'zh' ? '精选 · ' : 'FEATURED · ') +
                    (categoryNames[post.category]?.[locale] || post.category)
                  : categoryNames[post.category]?.[locale] || post.category}
                {post.locale !== locale && (
                  <span className="latest-row-origin">
                    {locale === 'zh' ? ' · 英文版本' : ' · Chinese original'}
                  </span>
                )}
              </span>
              <h2>{post.title}</h2>
              {post.excerpt && <p className="latest-row-excerpt">{post.excerpt}</p>}
              <div className="latest-row-meta">
                <time>{format(new Date(post.date), dateFmt, { locale: dateLocale })}</time>
                <span>·</span>
                <span>{post.readingTime} {readLabel}</span>
              </div>
            </div>
            {i === 0 && <span className="latest-row-media" aria-hidden="true" />}
            <span className="latest-row-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
