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
  travel: { zh: '行旅', en: 'Journey' },
  depth: { zh: '观心', en: 'Contemplation' },
  daily: { zh: '人间', en: 'Ordinary Life' },
}

export const sectionDescriptions: Record<Section, Record<Locale, string>> = {
  travel: {
    zh: '在行走中松开固有的自己',
    en: 'Loosening the familiar self through movement',
  },
  depth: {
    zh: '照见念头，也照见念头背后的执取',
    en: 'Seeing thought, and the grasping beneath it',
  },
  daily: {
    zh: '在关系与日常里练习清醒',
    en: 'Practising clarity in relationships and ordinary life',
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
