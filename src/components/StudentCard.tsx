import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type StudentProps = {
    id: string
    nameSurname: string
    lastSessionDate?: Date | null
    lastScore?: number | null
    lastResult?: string | null
}

export function StudentCard({ student }: { student: StudentProps }) {
    const statusColor = {
        'Red': 'bg-status-red text-white shadow-lg shadow-status-red/30',
        'Yellow': 'bg-status-yellow text-black shadow-lg shadow-status-yellow/30',
        'Green': 'bg-status-green text-white shadow-lg shadow-status-green/30',
    }[student.lastResult || ''] || 'bg-gray-200 text-gray-500'

    const statusText = {
        'Red': 'Yoğun Destek',
        'Yellow': 'Gelişimde',
        'Green': 'Hedefe Ulaşıldı',
    }[student.lastResult || ''] || 'Henüz Seans Yok'

    return (
        <Link href={`/students/${student.id}`} className="block group">
            <div className="card glass-card h-full flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group-hover:border-primary/50">

                {/* Decorational Gradient Orb */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-all"></div>

                <div className="relative z-10 p-2">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md ring-2 ring-white/50">
                            {student.nameSurname.charAt(0).toUpperCase()}
                        </div>
                        <span className={`badge ${statusColor} px-3 py-1 text-xs font-bold rounded-full`}>
                            {statusText}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        {student.nameSurname}
                    </h3>

                    <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                        {student.lastSessionDate
                            ? `Son Seans: ${new Date(student.lastSessionDate).toLocaleDateString('tr-TR')}`
                            : 'Henüz işlem yapılmadı'}
                    </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                    Profili Görüntüle <ArrowRight className="w-4 h-4 ml-1" />
                </div>
            </div>
        </Link>
    )
}
