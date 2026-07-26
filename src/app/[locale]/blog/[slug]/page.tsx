import { getPostBySlug, getAllPosts, getRelatedPost } from '@/lib/posts'
import { categoryNames, type Locale } from '@/i18n'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
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
      <article className="article-shell max-w-5xl mx-auto px-6 py-12">
        <header className="article-header">
          <Link href={`/${currentLocale}`} className="article-back">
            ← {currentLocale === 'zh' ? '内在漫游' : 'Inner Wandering'}
          </Link>

          <h1>{post.title}</h1>

          <div className="article-properties">
            <Link
              href={`/${currentLocale}/category/${post.category}`}
              className="category-tag"
            >
              {categoryNames[post.category]?.[currentLocale] || post.category}
            </Link>
            <span>·</span>
            <span>
              {format(new Date(post.date), dateFmt, { locale: dateLocale })}
            </span>
            <span>·</span>
            <span>
              {post.readingTime} {currentLocale === 'zh' ? '分钟阅读' : 'min read'}
            </span>
          </div>
        </header>

        <div className="article-layout">
          <TableOfContents content={post.content} locale={currentLocale} />

          <div className="min-w-0 flex-1 article-content article-reading-panel">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
            >
              {post.content}
            </ReactMarkdown>

            <div className="article-end">
              {/* Related post (other language version) */}
              {relatedPost && (
                <div className="article-translation">
                  <p>
                    {currentLocale === 'zh' ? 'English Version' : '中文版本'}
                  </p>
                  <Link
                    href={`/${relatedPost.locale}/blog/${relatedPost.slug}`}
                    className="article-translation-link"
                  >
                    {relatedPost.title} →
                  </Link>
                </div>
              )}

              <div>
                <Link
                  href={`/${currentLocale}`}
                  className="article-home-link"
                >
                  ← {currentLocale === 'zh' ? '返回首页' : 'Back to Home'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
