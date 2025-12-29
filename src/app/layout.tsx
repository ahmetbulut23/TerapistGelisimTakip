import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google' // More premium/modern font
import clsx from 'clsx'

const outfit = Outfit({ subsets: ['latin'] })

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
      <body className={clsx(outfit.className, 'bg-background text-foreground antialiased selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden relative')}>
        {/* Soft Background Gradients for Light Theme */}
        <div className="fixed top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10 pointer-events-none" />
        <div className="fixed -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-[100px] pointer-events-none mix-blend-multiply" />
        <div className="fixed top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-purple-100/40 blur-[100px] pointer-events-none mix-blend-multiply" />

        {children}
      </body>
    </html>
  )
}
