export interface HeadingItem {
  id: string
  text: string
  level: 2 | 3
}

export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function extractHeadings(content: string): HeadingItem[] {
  const regex = /^(#{2,3})\s+(.+)$/gm
  const headings: HeadingItem[] = []
  let match: RegExpExecArray | null

  while ((match = regex.exec(content)) !== null) {
    const text = match[2].trim()
    headings.push({
      id: slugifyHeading(text),
      text,
      level: match[1].length as 2 | 3,
    })
  }

  return headings
}
