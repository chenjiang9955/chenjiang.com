'use client'

import { useEffect, useState, useCallback } from 'react'
import { extractHeadings, type HeadingItem } from '@/lib/headings'

interface Props {
  content: string
  locale: string
}

export default function TableOfContents({ content, locale }: Props) {
  const [headings, setHeadings] = useState<HeadingItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Extract headings from markdown content
  useEffect(() => {
    setHeadings(extractHeadings(content))
  }, [content])

  // Track active heading with IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    )

    const elements = headings
      .map(h => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
      observer.disconnect()
    }
  }, [headings])

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${id}`)
      setActiveId(id)
      setMobileOpen(false)
    }
  }, [])

  if (headings.length === 0) return null

  const title = locale === 'zh' ? '目录' : 'Contents'

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="toc-sidebar hidden lg:block w-56 flex-shrink-0">
        <div className="toc-container">
          <h4>
            {title}
          </h4>
          <nav>
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  scrollToHeading(h.id)
                }}
                className={`toc-link ${h.level === 3 ? 'toc-h3' : ''} ${
                  activeId === h.id ? 'active' : ''
                }`}
                aria-current={activeId === h.id ? 'location' : undefined}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile toggle */}
      <div className="toc-mobile-toggle lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="toc-mobile-button"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="15" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          {title} <span>{mobileOpen ? '收起' : '展开'}</span>
        </button>

        {mobileOpen && (
          <nav className="toc-mobile-panel">
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  scrollToHeading(h.id)
                }}
                className={`toc-link w-full text-left ${h.level === 3 ? 'toc-h3' : ''} ${
                  activeId === h.id ? 'active' : ''
                }`}
                aria-current={activeId === h.id ? 'location' : undefined}
              >
                {h.text}
              </a>
            ))}
          </nav>
        )}
      </div>
    </>
  )
}
