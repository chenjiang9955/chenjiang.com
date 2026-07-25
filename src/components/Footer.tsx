'use client'

import { usePathname } from 'next/navigation'
import type { Locale } from '@/i18n'

export default function Footer() {
  const pathname = usePathname()
  const currentLocale = (pathname.startsWith('/en') ? 'en' : 'zh') as Locale

  const t = {
    tagline: currentLocale === 'zh'
      ? '在思想的旷野里漫步，在觉察的微光中清醒。'
      : 'Wandering the wilderness of thought, awakening in the glimmer of awareness.',
    copyright: currentLocale === 'zh'
      ? '陈江 · 内在漫游'
      : 'Chen Jiang · Inner Wandering',
  }

  return (
    <footer className="border-t border-neutral-200 mt-20">
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <p className="text-sm text-neutral-500 mb-2">{t.tagline}</p>
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} {t.copyright}
        </p>
      </div>
    </footer>
  )
}
