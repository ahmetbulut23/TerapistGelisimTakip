'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Calendar, FileText, Settings, BarChart3, Brain, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Sidebar() {
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
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-[60] p-2 bg-white rounded-lg shadow-md border border-gray-100 text-gray-700 hover:text-violet-600"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[45] md:hidden backdrop-blur-sm animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`sidebar transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-2xl' : ''
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
                <div className="absolute bottom-8 left-6 right-6">
                    <div className="card-flat p-4 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                AT
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">Ahmet Terapist</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Uzman Terapist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
