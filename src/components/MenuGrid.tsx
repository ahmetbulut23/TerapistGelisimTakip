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
        { icon: Plus, label: 'Ekle', href: '/students/new', color: 'text-status-green' },
        { icon: Users, label: 'Öğrenciler', href: '#students-list', color: 'text-blue-400' },
        { icon: Calendar, label: 'Takvim', href: '#', placeholder: true },
        { icon: BarChart, label: 'Raporlar', href: '#', placeholder: true },
        { icon: Search, label: 'Ara', href: '#', placeholder: true },
        { icon: Settings, label: 'Ayarlar', href: '#', placeholder: true },
        { icon: LogOut, label: 'Çıkış', href: '#', color: 'text-status-red', placeholder: true },
    ]

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {menuItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className={`
                        glass-card aspect-square flex flex-col items-center justify-center gap-3
                        group hover:bg-white/10 transition-all duration-300 relative overflow-hidden
                        ${item.active ? 'bg-primary/20 border-primary/50' : ''}
                    `}
                    onClick={(e) => item.placeholder && e.preventDefault()}
                >
                    {/* Active Indicator Line */}
                    {item.active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary blur-sm rounded-r-full" />
                    )}

                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className={`
                        p-4 rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-lg
                        group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300
                        ${item.active ? 'bg-primary/20 ring-primary/30' : ''}
                    `}>
                        <item.icon className={`w-8 h-8 ${item.color || 'text-white'} ${item.active ? 'text-primary-foreground' : ''}`} />
                    </div>

                    <span className={`
                        text-sm font-semibold tracking-wide
                        ${item.active ? 'text-primary-foreground' : 'text-gray-300'}
                        group-hover:text-white transition-colors
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
