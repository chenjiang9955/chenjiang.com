'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { sectionNames, sectionOrder, type Locale, type Section } from '@/i18n'
import type { Post } from '@/lib/posts'
import WallSection from './WallSection'

interface Props {
  sectionsWithPosts: { section: Section; posts: Post[] }[]
  locale: Locale
}

const AUTO_PLAY_INTERVAL = 4000

export default function SectionCarousel({ sectionsWithPosts, locale }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringTab, setIsHoveringTab] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalSlides = sectionsWithPosts.length

  const goTo = useCallback((index: number) => {
    if (isTransitioning || index === activeIndex) return
    setIsTransitioning(true)
    setActiveIndex(index)
  }, [activeIndex, isTransitioning])

  // Auto-play
  useEffect(() => {
    if (isHovering || isHoveringTab) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides)
    }, AUTO_PLAY_INTERVAL)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isHovering, isHoveringTab, totalSlides])

  // Reset transition flag
  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [isTransitioning])

  const handleTabEnter = (index: number) => {
    setIsHoveringTab(true)
    setActiveIndex(index)
  }

  const handleTabLeave = () => {
    setIsHoveringTab(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Tab bar — clean underline style, Tesla-inspired */}
      <div
        className="flex justify-center mb-8"
        onMouseEnter={() => setIsHoveringTab(true)}
        onMouseLeave={handleTabLeave}
      >
        <div className="inline-flex gap-8 relative">
          {/* Underline indicator */}
          <div
            className="absolute bottom-0 h-0.5 bg-accent-500 transition-all duration-400 ease-out"
            style={{
              left: `${activeIndex * (100 / totalSlides)}%`,
              width: `${100 / totalSlides}%`,
            }}
          />
          {sectionOrder.map((section, index) => (
            <button
              key={section}
              onMouseEnter={() => handleTabEnter(index)}
              onClick={() => goTo(index)}
              className={`
                relative pb-2 text-sm font-medium transition-colors duration-300
                ${activeIndex === index
                  ? 'text-neutral-900'
                  : 'text-neutral-400 hover:text-neutral-600'
                }
              `}
            >
              {sectionNames[section][locale]}
            </button>
          ))}
        </div>
      </div>

      {/* Sliding content */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {sectionsWithPosts.map(({ section, posts }) => (
            <div key={section} className="w-full flex-shrink-0">
              <WallSection section={section} locale={locale} posts={posts} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {sectionOrder.map((section, index) => (
          <button
            key={section}
            onClick={() => goTo(index)}
            className={`
              w-1.5 h-1.5 rounded-full transition-all duration-300
              ${activeIndex === index
                ? 'bg-accent-500 w-4'
                : 'bg-neutral-300 hover:bg-neutral-400'
              }
            `}
            aria-label={sectionNames[section][locale]}
          />
        ))}
      </div>
    </div>
  )
}
