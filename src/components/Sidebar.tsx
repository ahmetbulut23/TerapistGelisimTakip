'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Calendar, FileText, Settings, BarChart3, Brain } from 'lucide-react'

export function Sidebar() {
    const pathname = usePathname()

    const navItems = [
        { icon: Home, label: 'Ana Sayfa', href: '/' },
        { icon: Users, label: 'Öğrenciler', href: '/students' },
        { icon: Calendar, label: 'Seanslar', href: '/sessions' },
        { icon: BarChart3, label: 'Raporlar', href: '/reports' },
        { icon: FileText, label: 'Dökümanlar', href: '/documents' },
        { icon: Settings, label: 'Ayarlar', href: '/settings' },
    ]

    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-gray-900">TerapiPanel</h1>
                    <p className="text-xs text-gray-500">Gelişim Takip</p>
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
                <div className="card-flat p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            AT
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">Ahmet Terapist</p>
                            <p className="text-xs text-gray-500">Uzman Terapist</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
