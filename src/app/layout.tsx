import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Terapist Gelişim Takip',
  description: 'Gelişmiş öğrenci takibi ve raporlama sistemi.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={clsx(inter.className, 'bg-background text-foreground antialiased')}>
        {children}
      </body>
    </html>
  )
}
