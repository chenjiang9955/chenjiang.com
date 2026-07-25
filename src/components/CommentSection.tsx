'use client'

import { useEffect, useRef } from 'react'
import type { Locale } from '@/i18n'

interface GiscusProps {
  locale: Locale
  slug: string
}

export default function CommentSection({ locale, slug }: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    // Clear existing script
    container.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'chenjiang9955/chenjiang.com')
    script.setAttribute('data-repo-id', 'R_kgDOTi6kew')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDOTi6ke84DB7GZ')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', locale === 'zh' ? 'zh-CN' : 'en')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    container.appendChild(script)
  }, [locale, slug])

  const t = {
    title: locale === 'zh' ? '评论' : 'Comments',
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4">{t.title}</h3>
      <div ref={ref} />
    </div>
  )
}
