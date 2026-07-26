import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { type Locale } from '@/i18n'

const shelves = [
  {
    name: '佛学',
    books: ['《心经》', '《妙法莲华经》', '《大佛顶首楞严经》', '《无量寿经》', '《正见》'],
  },
  {
    name: '中国思想',
    books: ['《论语》', '《道德经》', '《庄子》', '《传习录》', '《易经》'],
  },
  {
    name: '哲学与生活',
    books: ['《人心与人生》', '《作为意志和表象的世界》', '《沉思录》', '《活出生命的意义》', '《悉达多》'],
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
        <p>在深圳生活，也在慢慢把日子过明白。</p>
      </header>

      <div className="plain-about-body">
        <p>过去十二年，我在珠三角的快节奏里生活和工作，也在地产行业做财务管理。日子一直向前推，人却难免在一些转弯处慢下来。那些人生的波折、关系里的聚散离合，让我开始认真看待数字和效率之外的事。</p>

        <p>旅行给我换了看世界的角度，佛学和对人生的思考，则让我慢慢学会安顿自己。它们没有替我解决所有问题，却让我更能看清自己的念头、情绪和关系，也更愿意接受生活本来的样子。现在的我，比从前平静一些，也更自洽一些。</p>

        <p>这个博客记录的，就是这段变化里的所见、所感和所想。有工作之外的思考，有一段关系留下的体会，也有旅途中偶然冒出来的念头。我想把它们写下来，和同样在路上的人交换近况、聊聊书，也聊聊怎样把日子过得更明白。</p>
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
