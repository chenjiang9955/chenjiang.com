import { Mail, MessageCircle } from 'lucide-react'
import type { Locale } from '@/i18n'

export default function ContactPanel({ locale }: { locale: Locale }) {
  const zh = locale === 'zh'
  return (
    <section className="home-contact">
      <p className="home-contact-note">
        {zh
          ? '若你愿意，留一封信。读到时，我会回。'
          : 'If you like, leave a letter. I read every one and write back when I can.'}
      </p>
      <div className="home-contact-methods">
        <a className="home-contact-method" href="mailto:837006228@qq.com">
          <Mail size={15} />
          <span className="home-contact-label">{zh ? '邮箱' : 'EMAIL'}</span>
          <span className="home-contact-value">837006228@qq.com</span>
        </a>
        <div className="home-contact-method">
          <MessageCircle size={15} />
          <span className="home-contact-label">{zh ? '微信' : 'WECHAT'}</span>
          <span className="home-contact-value">ArcherR1025</span>
        </div>
      </div>
    </section>
  )
}
