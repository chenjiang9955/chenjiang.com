import { type Locale } from '@/i18n'

interface Props {
  locale: Locale
}

export default function HeroSection({ locale }: Props) {
  const isZh = locale === 'zh'

  return (
    <section className="text-center pt-16 pb-10 md:pt-24 md:pb-14">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 tracking-tight">
        {isZh ? '陈江' : 'Jiang Chen'}
      </h1>
      <h2 className="mt-3 text-lg md:text-xl font-normal text-neutral-500 tracking-wide">
        {isZh ? '内在漫游' : 'Inner Wandering'}
      </h2>
      <p className="mt-4 text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
        {isZh
          ? '在思想的旷野里漫步，在觉察的微光中清醒。'
          : 'Wandering the wilderness of thought, awakening in the glimmer of awareness.'}
      </p>
    </section>
  )
}
