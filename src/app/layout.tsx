import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '内在漫游 · Inner Wandering',
    template: '%s · 内在漫游',
  },
  description: '在思想的旷野里漫步，在觉察的微光中清醒。陈江的个人博客，关于佛学、内在观察、情感、成长与旅途。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="bg-cream-50 text-neutral-700 antialiased">
        {children}
      </body>
    </html>
  )
}
