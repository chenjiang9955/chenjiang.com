import { getPostsBySection, getPostsByLocale } from '@/lib/posts'
import { sectionOrder, type Locale } from '@/i18n'
import HeroSection from '@/components/HeroSection'
import LatestPosts from '@/components/LatestPosts'
import SectionCarousel from '@/components/SectionCarousel'
import SubscribeForm from '@/components/SubscribeForm'

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }]
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const currentLocale = locale as Locale
  const allPosts = getPostsByLocale(currentLocale)

  // Group posts by section
  const sectionsWithPosts = sectionOrder.map((section) => ({
    section,
    posts: getPostsBySection(section, currentLocale),
  }))

  return (
    <div className="min-h-screen pb-16">
      {/* Hero section */}
      <HeroSection locale={currentLocale} />

      {/* Latest posts: horizontal strip */}
      <LatestPosts posts={allPosts} locale={currentLocale} />

      {/* Section carousel */}
      <SectionCarousel
        sectionsWithPosts={sectionsWithPosts}
        locale={currentLocale}
      />

      {/* Empty state */}
      {allPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-neutral-400 text-lg">
            {currentLocale === 'zh' ? '还没有文章' : 'No posts yet'}
          </p>
        </div>
      )}

      {/* Subscribe */}
      {allPosts.length > 0 && (
        <section className="max-w-md mx-auto px-6 mt-12">
          <SubscribeForm locale={currentLocale} />
        </section>
      )}
    </div>
  )
}
