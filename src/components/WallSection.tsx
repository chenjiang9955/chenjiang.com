import Link from 'next/link'
import { sectionNames, sectionDescriptions, type Locale, type Section } from '@/i18n'
import type { Post } from '@/lib/posts'
import StickyNote from './StickyNote'

interface Props {
  section: Section
  locale: Locale
  posts: Post[]
}

export default function WallSection({ section, locale, posts }: Props) {
  if (posts.length === 0) {
    return (
      <section>
        <div className="max-w-5xl mx-auto px-6 mb-4">
          <div className="flex items-baseline gap-3">
            <Link
              href={`/${locale}/section/${section}`}
              className="group flex items-baseline gap-2"
            >
              <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-accent-600 transition-colors">
                {sectionNames[section][locale]}
              </h2>
            </Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center py-10">
          <p className="text-sm text-neutral-400">
            {locale === 'zh' ? '暂无文章' : 'No posts yet'}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section>
      {/* Section header */}
      <div className="max-w-5xl mx-auto px-6 mb-5">
        <div className="flex items-baseline gap-3 pb-3 border-b border-neutral-100">
          <Link
            href={`/${locale}/section/${section}`}
            className="group flex items-baseline gap-2"
          >
            <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-accent-600 transition-colors">
              {sectionNames[section][locale]}
            </h2>
            <span className="text-xs text-neutral-400 group-hover:text-accent-500 transition-colors">
              {locale === 'zh' ? '查看全部 →' : 'View all →'}
            </span>
          </Link>
          <div className="flex-1" />
          <p className="text-xs text-neutral-400 hidden sm:block">
            {sectionDescriptions[section][locale]}
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {posts.map((post) => (
            <StickyNote
              key={post.slug + post.locale}
              post={post}
              locale={locale}
              section={section}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
