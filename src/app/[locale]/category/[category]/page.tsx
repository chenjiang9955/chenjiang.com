import { getPostsByCategory, getAllPosts } from '@/lib/posts'
import { categoryNames, type Locale } from '@/i18n'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'

export function generateStaticParams() {
  const posts = getAllPosts()
  const cats = Array.from(new Set(posts.map(p => `${p.locale}:${p.category}`)))
  return cats.map(c => {
    const [locale, category] = c.split(':')
    return { locale, category }
  })
}

export default function CategoryPage({
  params: { locale, category },
}: {
  params: { locale: string; category: string }
}) {
  const currentLocale = locale as Locale
  const posts = getPostsByCategory(category, currentLocale)
  const catName = categoryNames[category]?.[currentLocale]

  if (!catName) {
    notFound()
  }

  const dateLocale = currentLocale === 'zh' ? zhCN : enUS
  const dateFmt = currentLocale === 'zh' ? 'yyyy年M月d日' : 'MMM d, yyyy'

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <Link
            href={`/${currentLocale}`}
            className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-4 inline-block"
          >
            ← {currentLocale === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
          <h1 className="text-3xl font-semibold text-neutral-900 mt-2">
            {catName}
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            {currentLocale === 'zh'
              ? `${posts.length} 篇文章`
              : `${posts.length} posts`}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-400">
              {currentLocale === 'zh' ? '该分类下暂无文章' : 'No posts in this category'}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {posts.map(post => (
              <article key={post.slug + post.locale} className="group">
                <Link href={`/${currentLocale}/blog/${post.slug}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-neutral-400">
                      {format(new Date(post.date), dateFmt, { locale: dateLocale })}
                    </span>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs text-neutral-400">
                      {post.readingTime} {currentLocale === 'zh' ? '分钟' : 'min'}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-accent-600 transition-colors mb-1">
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
    </div>
  )
}
