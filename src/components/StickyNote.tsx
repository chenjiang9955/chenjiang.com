import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import { type Locale, type Section } from '@/i18n'
import type { Post } from '@/lib/posts'

interface Props {
  post: Post
  locale: Locale
  section: Section
}

export default function StickyNote({ post, locale }: Props) {
  const dateLocale = locale === 'zh' ? zhCN : enUS
  const dateFmt = locale === 'zh' ? 'yyyy年M月d日' : 'MMM d, yyyy'

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group block p-5 rounded border border-cream-300/70 bg-cream-100/70 backdrop-blur-sm hover:border-cream-300 hover:bg-cream-100 hover:shadow-md transition-all duration-200"
    >
      {/* Date */}
      <p className="text-xs text-neutral-400 mb-3 tracking-wide">
        {format(new Date(post.date), dateFmt, { locale: dateLocale })}
      </p>

      {/* Title */}
      <h3 className="text-base font-semibold text-neutral-900 leading-snug mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
        {post.title}
      </h3>

      <div className="flex items-center justify-end mt-auto pt-3 border-t border-neutral-100">
        <span className="text-[0.65rem] text-neutral-400 whitespace-nowrap">
          {post.readingTime}{locale === 'zh' ? '分钟' : 'min'}
        </span>
      </div>
    </Link>
  )
}
