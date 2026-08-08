'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, Circle } from 'lucide-react'
import { useState } from 'react'
import { type Locale } from '@/i18n'

export default function NavBar() {
  const pathname = usePathname()
  const currentLocale = (pathname.startsWith('/en') ? 'en' : 'zh') as Locale
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const localeTarget = (() => {
    const articleMatch = pathname.match(/^\/(zh|en)\/blog\/([^/]+)$/)
    if (articleMatch) {
      const [, articleLocale, slug] = articleMatch
      const translatedSlug = articleLocale === 'zh' ? `${slug}-en` : slug.replace(/-en$/, '')
      const translatedLocale = articleLocale === 'zh' ? 'en' : 'zh'
      return `/${translatedLocale}/blog/${translatedSlug}`
    }

    return pathname.replace(/^\/(zh|en)/, currentLocale === 'zh' ? '/en' : '/zh')
  })()

  const t = {
    home: currentLocale === 'zh' ? '首页' : 'Home',
    about: currentLocale === 'zh' ? '关于' : 'About',
    search: currentLocale === 'zh' ? '搜索' : 'Search',
  }

  const isActive = (path: string) => {
    if (path === `/${currentLocale}`) return pathname === `/${currentLocale}`
    return pathname.startsWith(path)
  }

  return (
    <header className="site-header">
      <nav className="site-nav">
        {/* Logo */}
        <Link
          href={`/${currentLocale}`}
          className="brand-mark"
        >
          <Circle size={9} fill="currentColor" />
          <span>{currentLocale === 'zh' ? '内在漫游' : 'INNER WANDERING'}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href={`/${currentLocale}`}
            className={`text-sm font-medium transition-colors ${
              isActive(`/${currentLocale}`)
                ? 'text-neutral-900'
                : 'text-neutral-400 hover:text-neutral-700'
            }`}
          >
            {t.home}
          </Link>
          <Link
            href={`/${currentLocale}/about`}
            className={`text-sm font-medium transition-colors ${
              isActive(`/${currentLocale}/about`)
                ? 'text-neutral-900'
                : 'text-neutral-400 hover:text-neutral-700'
            }`}
          >
            {t.about}
          </Link>

          {/* Search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-neutral-400 hover:text-neutral-700 transition-colors"
            aria-label={t.search}
          >
            <Search size={17} />
          </button>

          {/* Language toggle — plain text, no pill */}
          <Link
            href={localeTarget}
            className="text-xs font-medium text-neutral-400 hover:text-accent-500 transition-colors tracking-wide"
          >
            {currentLocale === 'zh' ? 'EN' : '中文'}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-neutral-600"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-cream-200 bg-cream-50 px-6 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (searchQuery.trim()) {
                window.location.href = `/${currentLocale}/search?q=${encodeURIComponent(searchQuery.trim())}`
              }
            }}
            className="max-w-5xl mx-auto flex gap-3"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLocale === 'zh' ? '搜索文章...' : 'Search articles...'}
              className="flex-1 px-3 py-2 bg-neutral-100 border border-neutral-200 rounded text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-accent-400 transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-accent-500 text-white text-sm font-medium rounded hover:bg-accent-600 transition-colors"
            >
              {t.search}
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-cream-200 bg-cream-50 px-6 py-4">
          <div className="flex flex-col gap-4">
            <Link
              href={`/${currentLocale}`}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-neutral-800"
            >
              {t.home}
            </Link>
            <Link
            href={`/${currentLocale}/about`}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-neutral-800"
            >
              {t.about}
            </Link>
            <Link
              href={localeTarget}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-neutral-500"
            >
              {currentLocale === 'zh' ? 'English' : '中文'}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
