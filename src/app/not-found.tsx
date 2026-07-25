import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50">
      <div className="text-center px-6">
        <h1 className="text-6xl font-semibold text-neutral-300 mb-4">404</h1>
        <p className="text-neutral-500 mb-8">
          这页不存在 / Page not found
        </p>
        <Link
          href="/zh"
          className="text-sm text-accent-500 hover:text-accent-700 underline underline-offset-4"
        >
          回到首页 / Back to Home
        </Link>
      </div>
    </div>
  )
}
