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
      <body className={clsx(outfit.className, 'bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden relative')}>
        {/* Ambient Background Glows */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/40 via-background to-background pointer-events-none" />
        <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none mix-blend-screen animate-pulse" />
        <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[100px] pointer-events-none mix-blend-screen" />

        {children}
      </body>
    </html>
  )
}
