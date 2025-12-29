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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {menuItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className={`
                        glass-card aspect-square flex flex-col items-center justify-center gap-2 p-4
                        group hover:shadow-md transition-all duration-200 relative overflow-hidden
                        ${item.active ? 'bg-blue-50 border-blue-200' : 'bg-white'}
                        ${item.placeholder ? 'opacity-50 cursor-not-allowed' : ''}
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
                    {/* Active Indicator */}
                    {item.active && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                    )}

                    <div className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center
                        ${item.active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}
                        group-hover:scale-105 transition-transform
                    `}>
                        <item.icon className="w-6 h-6" />
                    </div>

                    <span className={`
                        text-xs font-medium
                        ${item.active ? 'text-blue-700' : 'text-gray-600'}
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
