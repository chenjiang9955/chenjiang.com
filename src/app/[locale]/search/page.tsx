import { getAllPosts } from '@/lib/posts'
import { type Locale } from '@/i18n'
import Link from 'next/link'
import SearchResults from '@/components/SearchResults'

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }]
}

export default function SearchPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const currentLocale = locale as Locale
  const posts = getAllPosts()
    .filter(p => p.locale === currentLocale)
    .map(p => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      tags: p.tags,
      date: p.date,
      readingTime: p.readingTime,
    }))

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link
            href={`/${currentLocale}`}
            className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-4 inline-block"
          >
            ← {currentLocale === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
          <h1 className="text-3xl font-semibold text-neutral-900 mt-2">
            {currentLocale === 'zh' ? '搜索文章' : 'Search Articles'}
          </h1>
        </div>

        <SearchResults locale={currentLocale} posts={posts} />
      </div>
    </div>
  )
}
