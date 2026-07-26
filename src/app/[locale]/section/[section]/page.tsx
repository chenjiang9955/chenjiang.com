import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import { getHomepagePostsBySection } from '@/lib/posts'
import { sectionNames, sectionDescriptions, sectionOrder, type Locale, type Section } from '@/i18n'

export function generateStaticParams() {
  const params: { locale: string; section: string }[] = []
  for (const locale of ['zh', 'en']) {
    for (const section of sectionOrder) {
      params.push({ locale, section })
    }
  }
  return params
}

export default function SectionPage({
  params: { locale, section },
}: {
  params: { locale: string; section: string }
}) {
  const currentLocale = locale as Locale
  const currentSection = section as Section
  const posts = getHomepagePostsBySection(currentSection, currentLocale)
  const dateLocale = currentLocale === 'zh' ? zhCN : enUS
  const dateFmt = currentLocale === 'zh' ? 'yyyy年M月d日' : 'MMM d, yyyy'

  return (
    <div className={`section-page section-page-${currentSection}`}>
      {/* Back link */}
      <Link
        href={`/${currentLocale}`}
        className="section-page-back inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 mb-8 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {currentLocale === 'zh' ? '返回首页' : 'Back to Home'}
      </Link>

      {/* Section header */}
      <div className="section-page-header mb-12">
        <h1 className="section-page-title text-3xl font-semibold text-neutral-900 mb-2">
          {sectionNames[currentSection][currentLocale]}
        </h1>
        <p className="section-page-description text-neutral-400">
          {sectionDescriptions[currentSection][currentLocale]}
        </p>
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-400 text-lg">
            {currentLocale === 'zh' ? '该分区暂无文章' : 'No posts in this section yet'}
          </p>
        </div>
      ) : (
        <div className="section-page-list space-y-0">
          {posts.map((post, index) => (
            <Link
              key={post.slug + post.locale}
              href={`/${post.locale}/blog/${post.slug}`}
              className="section-page-post group block py-5 border-b border-neutral-200 last:border-b-0
                         hover:bg-neutral-50 -mx-3 px-3 rounded transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <span className="section-post-date text-xs text-neutral-400 mb-1.5 block">
                    {format(new Date(post.date), dateFmt, { locale: dateLocale })}
                    {post.locale !== currentLocale && (
                      <span className="ml-2">
                        {currentLocale === 'zh' ? '英文版本' : 'Chinese original'}
                      </span>
                    )}
                  </span>

                  <h2 className="section-post-title text-lg font-semibold text-neutral-900 mb-1.5
                                 group-hover:text-accent-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="section-post-excerpt text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>

                  <div className="section-post-meta flex items-center gap-3 text-xs text-neutral-400">
                    <span>{post.readingTime}{currentLocale === 'zh' ? '分钟阅读' : 'min read'}</span>
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="section-post-arrow flex-shrink-0 mt-1.5 text-neutral-300 group-hover:text-accent-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {posts.length > 0 && (
        <p className="section-page-count text-center text-xs text-neutral-400 mt-10">
          {currentLocale === 'zh'
            ? `共 ${posts.length} 篇文章`
            : `${posts.length} post${posts.length > 1 ? 's' : ''}`}
        </p>
      )}
    </div>
  )
}
