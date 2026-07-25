import { NextRequest, NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = body?.email?.trim()?.toLowerCase()

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (!apiKey || !audienceId) {
      console.error('Missing RESEND_API_KEY or RESEND_AUDIENCE_ID')
      return NextResponse.json(
        { error: '订阅服务暂未配置' },
        { status: 503 }
      )
    }

    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    )

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Resend API error:', res.status, errorText)

      // Contact already exists — treat as success
      if (res.status === 422 || res.status === 409) {
        return NextResponse.json({ success: true, message: 'already_subscribed' })
      }

      return NextResponse.json(
        { error: '订阅失败，请稍后再试' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe route error:', err)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
