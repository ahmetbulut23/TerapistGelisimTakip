import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TerapiPanel - Gelişim Takip Sistemi',
  description: 'Modern terapi ve gelişim takip platformu',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
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
            {/* Conditional rendering for sidebar. 
                Ideally, we should not render Sidebar on login/register pages, 
                but our middleware redirects unintented access anyway. 
                Also, creating a clean layout for auth pages is better, 
                but for now we pass the user. 
             */}
            {!session?.user ? null : <Sidebar user={session?.user} />}
            <div className={`main-content flex-1 ${!session?.user ? 'ml-0 p-0 !pt-0' : ''}`}>
              {children}
            </div>
          </div>
        </AppSettingsProvider>
      </body>
    </html>
  )
}
