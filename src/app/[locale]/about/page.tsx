import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { type Locale } from '@/i18n'

const shelves = [
  {
    name: '佛学',
    books: ['《金刚经》', '《心经》', '《六祖坛经》', '《正见》', '《佛陀的启示》'],
  },
  {
    name: '中国思想',
    books: ['《道德经》', '《庄子》', '《传习录》', '《易经》', '《近思录》'],
  },
  {
    name: '哲学与生活',
    books: ['《沉思录》', '《活出生命的意义》', '《悉达多》', '《禅与摩托车维修艺术》'],
  },
]

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const zh = (locale as Locale) === 'zh'

  if (!zh) {
    return (
      <article className="plain-about">
        <header>
          <span>ABOUT</span>
          <h1>I’m Chen Jiang.</h1>
          <p>I live and work in Shenzhen. For the past twelve years, I have worked in finance in the real-estate industry.</p>
        </header>
        <div className="plain-about-body">
          <p>Outside work, I read Buddhism, Chinese philosophy and books about how people live. This blog is where I keep notes from that reading and from ordinary life.</p>
          <p>If something here speaks to you, feel free to write. I’m always glad to meet a new friend.</p>
        </div>
      </article>
    )
  }

  return (
    <article className="plain-about">
      <header>
        <div className="plain-about-meta">
          <span>关于我</span>
          <span><MapPin size={13} /> 深圳</span>
        </div>
        <h1>我是陈江。</h1>
        <p>一个在深圳生活和工作的思考者。</p>
      </header>

      <div className="plain-about-body">
        <p>过去十二年，我一直在地产行业做财务管理，做过税务、资金、预算和投融资。工作里每天面对数字，时间久了，我越来越关心数字解释不了的那些事。</p>

        <p>我对佛学很感兴趣。最初是生活里有些困惑，想找个说法；后来慢慢发现，读佛学不是为了找到一句管用的答案，而是练习怎么看自己的念头、情绪和关系。读得并不系统，也谈不上有什么修为，遇到有感触的地方就记下来，再放回日常里试一试。</p>

        <p>平时也读《道德经》《庄子》这些中国传统思想，以及哲学、心理和个人成长方面的书。玄学也会看一点。我对这些东西的兴趣比较杂，常常从一本书跳到另一本书，再从书里绕回自己的生活。</p>

        <p>这个博客就是这些年留下来的笔记。有工作之外的思考，有关系里的体会，也有旅行时冒出来的念头。有些文章写完以后，我的想法可能又变了。我想把这种变化也留下来。</p>

        <p>如果你也住在深圳，或者碰巧对这些话题感兴趣，欢迎来找我聊聊。喝茶、聊书、交换近况，都可以。</p>
      </div>

      <section className="bookshelf">
        <div className="bookshelf-heading">
          <h2>常放在手边的书</h2>
          <p>有些读完了，有些还在慢慢读。</p>
        </div>
        <div className="shelves">
          {shelves.map((shelf) => (
            <div className="shelf" key={shelf.name}>
              <h3>{shelf.name}</h3>
              <ul>
                {shelf.books.map((book) => <li key={book}>{book}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="plain-contact">
        <h2>认识一下</h2>
        <div>
          <span><MessageCircle size={16} /> 微信</span>
          <strong>ArcherR1025</strong>
        </div>
        <a href="mailto:837006228@qq.com">
          <span><Mail size={16} /> 邮箱</span>
          <strong>837006228@qq.com</strong>
        </a>
      </section>
    </article>
  )
}
