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
              ? '在念头起落之间，我学着把看见的写下来。'
              : 'Between arising and passing thoughts, I try to write what I see.'}
          </p>
          <h1 className="masthead-title">
            {isZh ? (
              <>
                不忙着回答，<br />
                只练习看得更清一点。
              </>
            ) : (
              <>
                Not in a hurry to answer —<br />
                only to see a little more clearly.
              </>
            )}
          </h1>
          <p className="masthead-note">
            {isZh
              ? '这里收着关于佛学、内在观察、情感与旅途的文字。写给自己，也写给同样在觉察的人。'
              : 'Notes on Buddhism, inner observation, love, and the road — written for myself, and for anyone else paying attention.'}
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
