export type Locale = 'zh' | 'en'

export const locales: Locale[] = ['zh', 'en']

export const categoryNames: Record<string, Record<Locale, string>> = {
  buddhism: { zh: '佛学', en: 'Buddhism' },
  'inner-observation': { zh: '内在观察', en: 'Inner Observation' },
  relationships: { zh: '情感关系', en: 'Relationships' },
  'personal-growth': { zh: '个人成长', en: 'Personal Growth' },
  travel: { zh: '旅行感悟', en: 'Travel' },
}

export const categorySlugs: Record<string, string> = {
  '佛学': 'buddhism',
  '内在观察': 'inner-observation',
  '情感关系': 'relationships',
  '个人成长': 'personal-growth',
  '旅行感悟': 'travel',
  'Buddhism': 'buddhism',
  'Inner Observation': 'inner-observation',
  'Relationships': 'relationships',
  'Personal Growth': 'personal-growth',
  'Travel': 'travel',
}

// --- Section system ---
export type Section = 'travel' | 'depth' | 'daily'

export const sectionNames: Record<Section, Record<Locale, string>> = {
  travel: { zh: '🧭 旅行', en: '🧭 Travel' },
  depth: { zh: '🌿 深度', en: '🌿 Depth' },
  daily: { zh: '☕ 日常', en: '☕ Daily' },
}

export const sectionDescriptions: Record<Section, Record<Locale, string>> = {
  travel: {
    zh: '路上的觉察与相遇',
    en: 'Encounters and awareness on the road',
  },
  depth: {
    zh: '佛学、内在观察与跨学科思辨',
    en: 'Buddhism, inner observation, and interdisciplinary reflections',
  },
  daily: {
    zh: '情感、成长与人生随笔',
    en: 'Relationships, growth, and life essays',
  },
}

export const categoryToSection: Record<string, Section> = {
  travel: 'travel',
  buddhism: 'depth',
  'inner-observation': 'depth',
  relationships: 'daily',
  'personal-growth': 'daily',
}

export function getSectionByCategory(category: string): Section {
  return categoryToSection[category] || 'daily'
}

export const sectionOrder: Section[] = ['travel', 'depth', 'daily']
