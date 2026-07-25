import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-20">
          {/* Chinese Section */}
          <section className="mb-16">
            <h1 className="text-3xl font-semibold text-neutral-900 mb-8">
              关于我
            </h1>

            <div className="article-content">
              <p>
                我是<strong>陈江</strong>，一个在深圳生活和工作的思考者。
              </p>
              <p>
                过去十二年，我在地产行业做财务管理——税务、资金、预算、投融资，和数字打了半辈子交道。
                但数字之外，那些真正触动我的东西，却无法放进报表里：比如<strong>佛法的智慧</strong>如何照亮日常的困惑，
                比如<strong>内在的观察</strong>如何让我们从惯性中醒来，比如<strong>关系中的痛与爱</strong>如何同时是牢笼和道场。
              </p>
              <p>
                这个博客是我的<strong>内在漫游笔记</strong>。不是布道，不是教学，只是一个普通人在这个混乱又美丽的世界里，
                试图看得更清楚一点、爱得更清醒一点的过程记录。
              </p>
              <p>
                这里会聊佛学、聊内在觉察、聊情感与成长、聊旅途中的感悟。没有标准答案，只有诚实的探索。
              </p>
            </div>
          </section>

          {/* English Section */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              About Me
            </h2>

            <div className="article-content">
              <p>
                I'm <strong>Chen Jiang</strong>, a thinker based in Shenzhen, China.
              </p>
              <p>
                For the past twelve years, I worked in real estate finance—tax planning, capital management,
                budgeting, M&A. Numbers have been my professional language. But beyond the spreadsheets,
                what truly moves me can't be captured in a P&L: the wisdom of <strong>Buddhism</strong>
                illuminating daily confusion, the practice of <strong>inner observation</strong> waking us
                from autopilot, and how <strong>love and pain in relationships</strong> serve simultaneously
                as prison and path.
              </p>
              <p>
                This blog is my <strong>inner wandering journal</strong>. Not preaching, not teaching—just
                one person's honest attempt to see more clearly and love more wisely in this chaotic,
                beautiful world.
              </p>
              <p>
                Topics: Buddhism, inner observation, relationships, personal growth, and travel reflections.
                No definitive answers—just sincere exploration.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mt-16 pt-8 border-t border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
              联系 / Contact
            </h3>
            <p className="text-sm text-neutral-500">
              Email: 837006228@qq.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
