import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'TerapiPanel - Gelişim Takip Sistemi',
  description: 'Modern terapi ve gelişim takip platformu',
}

import { AppSettingsProvider } from '@/components/AppSettingsProvider'

import { auth } from '@/auth'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="tr">
      <body className={inter.className}>
        <AppSettingsProvider>
          <div className="flex">
            {/* Conditional sidebar rendering */}
            {!session?.user ? null : <Sidebar user={session?.user} />}
            <div className={`flex-1 ${session?.user ? 'main-content' : 'w-full'}`}>
              {children}
            </div>
          </div>
        </AppSettingsProvider>
      </body>
    </html>
  )
}
