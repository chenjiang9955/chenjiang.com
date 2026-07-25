import { getHomepagePosts, getHomepagePostsBySection } from '@/lib/posts'
import { sectionOrder, type Locale } from '@/i18n'
import HeroSection from '@/components/HeroSection'
import LatestPosts from '@/components/LatestPosts'
import SectionCarousel from '@/components/SectionCarousel'
import ContactPanel from '@/components/ContactPanel'

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }]
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const currentLocale = locale as Locale
  const allPosts = getHomepagePosts(currentLocale)

  // Group posts by section
  const sectionsWithPosts = sectionOrder.map((section) => ({
    section,
    posts: getHomepagePostsBySection(section, currentLocale),
  }))

  return (
    <div className="min-h-screen">
      <HeroSection locale={currentLocale} />
      <div id="recent"><LatestPosts posts={allPosts} locale={currentLocale} /></div>
      <section className="collection-shell">
        <div className="section-heading">
          <span>{currentLocale === 'zh' ? '随笔' : 'ESSAYS'}</span>
        </div>
        <SectionCarousel sectionsWithPosts={sectionsWithPosts} locale={currentLocale} />
      </section>

      {/* Empty state */}
      {allPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-neutral-400 text-lg">
            {currentLocale === 'zh' ? '还没有文章' : 'No posts yet'}
          </p>
        </div>
      )}

      <ContactPanel locale={currentLocale} />
    </div>
  )
}
