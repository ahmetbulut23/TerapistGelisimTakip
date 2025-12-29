```javascript
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TerapiPanel - Gelişim Takip Sistemi',
  description: 'Modern terapi ve gelişim takip platformu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Sidebar />
        <div className="main-content">
          {children}
        </div>
      </body>
    </html>
  )
}
```
