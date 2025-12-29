'use client'

import Link from 'next/link'
import {
    Home,
    Users,
    Calendar,
    Settings,
    FileText,
    BarChart,
    Search,
    LogOut,
    Plus
} from 'lucide-react'

export function MenuGrid() {
    const menuItems = [
        { icon: Home, label: 'Ana Sayfa', href: '/', active: true },
        { icon: Plus, label: 'Ekle', href: '/students/new', color: 'text-green-600' },
        { icon: Users, label: 'Öğrenciler', href: '#students-list', color: 'text-blue-600' },
        { icon: Calendar, label: 'Takvim', href: '#', placeholder: true },
        { icon: BarChart, label: 'Raporlar', href: '#', placeholder: true },
        { icon: Search, label: 'Ara', href: '#', placeholder: true },
        { icon: Settings, label: 'Ayarlar', href: '#', placeholder: true },
        { icon: Settings, label: 'Ayarlar', href: '#' },
        { icon: LogOut, label: 'Çıkış', href: '#', color: 'text-red-500', placeholder: true },
    ]

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {menuItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className={`
                        glass-card aspect-square flex flex-col items-center justify-center gap-3
                        group hover:bg-indigo-50 transition-all duration-300 relative overflow-hidden
                        ${item.active ? 'bg-indigo-100/50 border-indigo-200' : 'bg-white/60'}
                        ${item.placeholder ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                    onClick={(e) => {
                        if (item.placeholder) {
                            e.preventDefault();
                            return;
                        }
                        if (item.href.startsWith('#')) {
                            e.preventDefault();
                            document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    {/* Active Indicator Line */}
                    {item.active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-indigo-500 rounded-r-full" />
                    )}

                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className={`
                        p-4 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100
                        group-hover:scale-110 group-hover:shadow-md transition-all duration-300
                        ${item.active ? 'bg-white ring-indigo-100' : ''}
                    `}>
                        <item.icon className={`w-8 h-8 ${item.color || 'text-gray-600'} ${item.active ? 'text-indigo-600' : ''}`} />
                    </div>

                    <span className={`
                        text-sm font-semibold tracking-wide
                        ${item.active ? 'text-indigo-700' : 'text-gray-600'}
                        group-hover:text-indigo-800 transition-colors
                    `}>
                        {item.label}
                    </span>

                    {/* Placeholder Badge */}
                    {item.placeholder && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/10" />
                    )}
                </Link>
            ))}
        </div>
    )
}
