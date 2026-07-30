import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { type Locale } from '@/i18n'

export default function HeroSection({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh'

  return (
    <section className="hero-shell masthead">
      <div className="masthead-rule" />
      <div className="masthead-grid">
        <div className="masthead-aside">
          <span className="masthead-kicker">{isZh ? '陈江' : 'CHEN JIANG'}</span>
          <span className="masthead-kicker muted">{isZh ? '内在漫游' : 'INNER WANDERING'}</span>
        </div>

        <div className="masthead-main">
          <p className="masthead-lead">
            {isZh
              ? '培养一种不被即时刺激支配的生命节奏。'
              : 'Cultivating a life rhythm less ruled by instant stimulation.'}
          </p>
          <h1 className="masthead-title">
            {isZh ? (
              <>
                <span className="masthead-title-line">在忙碌、比较与欲望之间，</span>
                <span className="masthead-title-line">学会看清现实，也照见自己的感受。</span>
              </>
            ) : (
              <>
                <span className="masthead-title-line">Amid busyness, comparison, and desire,</span>
                <span className="masthead-title-line">I learn to see reality clearly,</span>
                <span className="masthead-title-line">and to notice what I feel.</span>
              </>
            )}
          </h1>
          <p className="masthead-note">
            {isZh
              ? '这里记录我的旅行、读书、观心与日常思考：在被催促的时代，慢慢安顿自己的心。'
              : 'Here I write about travel, books, watching the mind, and everyday thoughts: learning to live a little more steadily in an age that keeps rushing us along.'}
          </p>
          <Link href="#themes" className="masthead-enter">
            {isZh ? '了解更多' : 'Explore more'}
            <ArrowDown size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
