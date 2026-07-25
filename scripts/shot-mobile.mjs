import { chromium, devices } from '@playwright/test'

const url = process.argv[2] || 'http://localhost:8890/zh/blog/love-seen-clearly'
const out = process.argv[3] || 'output/shot-mobile.png'

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ ...devices['iPhone 14 Pro Max'], deviceScaleFactor: 2 })
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.screenshot({ path: out, fullPage: true })
await browser.close()
console.log('saved', out)
