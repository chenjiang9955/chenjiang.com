'use client'

import { useState } from 'react'
import { Mail, Loader2 } from 'lucide-react'
import type { Locale } from '@/i18n'

export default function SubscribeForm({ locale }: { locale: Locale }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const t = {
    title: locale === 'zh' ? '订阅更新' : 'Stay Updated',
    desc: locale === 'zh'
      ? '新文章发布时，通过邮件通知你。'
      : 'Get notified when new articles are published.',
    placeholder: locale === 'zh' ? '你的邮箱地址' : 'Your email',
    button: locale === 'zh' ? '订阅' : 'Subscribe',
    thanks: locale === 'zh'
      ? '感谢订阅！新文章发布时你会收到邮件通知。'
      : 'Thanks for subscribing! You\'ll be notified when new articles are published.',
    errorDefault: locale === 'zh' ? '订阅失败，请稍后再试' : 'Something went wrong. Please try again.',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error || t.errorDefault)
      } else {
        setStatus('success')
        setEmail('')
      }
    } catch {
      setStatus('error')
      setErrorMsg(t.errorDefault)
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center p-6 bg-accent-50 rounded border border-accent-200">
        <p className="text-accent-600 text-sm">{t.thanks}</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded border border-neutral-200">
      <div className="flex items-center gap-2 mb-2">
        <Mail size={16} className="text-neutral-500" />
        <h3 className="text-sm font-medium text-neutral-900">{t.title}</h3>
      </div>
      <p className="text-xs text-neutral-400 mb-4">{t.desc}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={t.placeholder}
          required
          disabled={status === 'loading'}
          className="flex-1 px-3 py-2 bg-neutral-100 border border-neutral-200 rounded text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-accent-400 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 py-2 bg-accent-500 text-white text-sm font-medium rounded hover:bg-accent-600 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {status === 'loading' && <Loader2 size={14} className="animate-spin" />}
          {t.button}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-xs text-red-500 mt-2">{errorMsg}</p>
      )}
    </div>
  )
}
