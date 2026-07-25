import { getPostBySlug, getAllPosts, getRelatedPost } from '@/lib/posts'
import { categoryNames, type Locale } from '@/i18n'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import CommentSection from '@/components/CommentSection'
import TableOfContents from '@/components/TableOfContents'

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({
    locale: p.locale,
    slug: p.slug,
  }))
}

export default function BlogPostPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const post = getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  const currentLocale = locale as Locale
  const relatedPost = getRelatedPost(post)
  const dateLocale = currentLocale === 'zh' ? zhCN : enUS
  const dateFmt = currentLocale === 'zh' ? 'yyyy年M月d日' : 'MMM d, yyyy'

  return (
    <div className="min-h-screen">
      <article className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-10 max-w-3xl mx-auto pb-8 border-b border-neutral-200">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link
              href={`/${currentLocale}/category/${post.category}`}
              className="category-tag"
            >
              {categoryNames[post.category]?.[currentLocale] || post.category}
            </Link>
            <span className="h-3.5 w-px bg-neutral-300" />
            <span className="text-sm text-neutral-400">
              {format(new Date(post.date), dateFmt, { locale: dateLocale })}
            </span>
            <span className="text-sm text-neutral-400">·</span>
            <span className="text-sm text-neutral-400">
              {post.readingTime} {currentLocale === 'zh' ? '分钟阅读' : 'min read'}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight mb-5">
            {post.title}
          </h1>

          <p className="text-lg text-neutral-500 leading-relaxed">
            {post.excerpt}
          </p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-neutral-100">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Body: TOC sidebar + content */}
        <div className="flex gap-8 lg:gap-12 pt-2">
          <TableOfContents content={post.content} locale={currentLocale} />

          <div className="min-w-0 flex-1 article-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-16 pt-10 border-t border-neutral-200 max-w-3xl">
          {/* Related post (other language version) */}
          {relatedPost && (
            <div className="p-5 bg-white rounded border border-neutral-200">
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">
                {currentLocale === 'zh' ? 'English Version' : '中文版本'}
              </p>
              <Link
                href={`/${relatedPost.locale}/blog/${relatedPost.slug}`}
                className="text-accent-600 hover:text-accent-800 font-medium transition-colors"
              >
                {relatedPost.title} →
              </Link>
            </div>
          )}

          {/* Back link */}
          <div className={relatedPost ? 'mt-8' : ''}>
            <Link
              href={`/${currentLocale}`}
              className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              ← {currentLocale === 'zh' ? '返回首页' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </article>

      {/* Comments */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <CommentSection locale={currentLocale} slug={post.slug} />
      </div>
    </div>
  )
}
