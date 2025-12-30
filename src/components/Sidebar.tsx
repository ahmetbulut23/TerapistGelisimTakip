'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Calendar, FileText, Settings, BarChart3, Brain, Menu, X, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { logout } from '@/lib/actions'

export function Sidebar({ user }: { user?: { name?: string | null, email?: string | null } }) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    // Close sidebar on route change
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const navItems = [
        { icon: Home, label: 'Ana Sayfa', href: '/' },
        { icon: Users, label: 'Öğrenciler', href: '/students' },
        { icon: Calendar, label: 'Seanslar', href: '/sessions' },
        { icon: BarChart3, label: 'Raporlar', href: '/reports' },
        { icon: FileText, label: 'Dökümanlar', href: '/documents' },
        { icon: Settings, label: 'Ayarlar', href: '/settings' },
    ]

    return (
        <>
            {/* Mobile Header & Toggle */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-[60] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 h-16 flex items-center justify-between shadow-sm transition-all duration-300">
                <div>
                    <h1 className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight">Terapi Gelişim Takip</h1>
                    <p className="text-[10px] uppercase tracking-wider text-violet-600 dark:text-violet-400 font-semibold">Hoşgeldiniz</p>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[50] md:hidden backdrop-blur-sm animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`sidebar z-[70] transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-2xl' : ''
                    }`}
                style={isOpen ? { transform: 'translateX(0)' } : undefined}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">TerapiPanel</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Gelişim Takip</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`sidebar-link ${isActive ? 'active' : ''}`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="absolute bottom-8 left-6 right-6 space-y-3">
                    <div className="card-flat p-4 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                {user?.name?.charAt(0).toUpperCase() || 'T'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{user?.name || 'Misafir'}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Terapist</p>
                            </div>
                        </div>
                    </div>

                    <form action={logout}>
                        <button type="submit" className="w-full btn btn-outline flex items-center justify-center gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300">
                            <LogOut className="w-4 h-4" />
                            Çıkış Yap
                        </button>
                    </form>
                </div>
            </aside>
        </>
    )
}
