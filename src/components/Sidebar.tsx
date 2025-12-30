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
            {/* Mobile Header & Toggle */}
            {/* Mobile Header & Toggle */}
            <div className={`md:hidden fixed top-0 left-0 right-0 z-[60] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 h-16 flex items-center justify-between shadow-sm transition-transform duration-300 ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}>
                {/* Centered Title */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center gap-2 pointer-events-none">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 text-lg tracking-tight">
                        Terapi Gelişim Takip
                    </h1>
                </div>

                {/* Empty left side to balance space if needed, or just let valid elements take space. 
                    Since title is absolute, we just need the button on the right. 
                    The justify-between on container might not be enough if there is no left item. 
                    Let's use ml-auto for button to ensure it goes right.
                */}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="ml-auto relative z-10 p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                {/* Logo & Close Button */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">TerapiPanel</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Gelişim Takip</p>
                        </div>
                    </div>
                    {/* Internal Close Button for Mobile */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
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
