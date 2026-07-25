import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: '陈江',
    template: '%s · 内在漫游',
  },
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const currentLocale = locale === 'en' ? 'en' : 'zh'

  return (
    <div lang={currentLocale === 'zh' ? 'zh-CN' : 'en'} className={`site-locale-${currentLocale} flex flex-col min-h-screen`}>
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
