import Link from 'next/link'
import { sectionNames, sectionDescriptions, type Locale } from '@/i18n'
import type { Post } from '@/lib/posts'

interface Props {
  sectionsWithPosts: { section: 'travel' | 'depth' | 'daily'; posts: Post[] }[]
  locale: Locale
}

export default function SectionCarousel({ sectionsWithPosts, locale }: Props) {
  return (
    <nav className="essay-index" aria-label={locale === 'zh' ? '文章分类' : 'Essay paths'}>
      {sectionsWithPosts.map(({ section, posts }) => (
        <Link
          key={section}
          href={`/${locale}/section/${section}`}
          className={`essay-index-row essay-index-${section}`}
        >
          <span className="essay-index-image" aria-hidden="true" />
          <span className="essay-index-overlay" aria-hidden="true" />
          <span className="essay-index-content">
          <span className="essay-index-name">{sectionNames[section][locale]}</span>
          <span className="essay-index-desc">{sectionDescriptions[section][locale]}</span>
          <span className="essay-index-count">
            {posts.length.toString().padStart(2, '0')}
            <span aria-hidden="true" className="essay-index-arrow">→</span>
          </span>
          </span>
        </Link>
      ))}
    </nav>
  )
}
