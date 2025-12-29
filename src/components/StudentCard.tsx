import Link from 'next/link'
import { User, Calendar, TrendingUp } from 'lucide-react'

type StudentCardProps = {
    student: {
        id: string
        nameSurname: string
        lastSessionDate?: Date | null
        lastScore?: number | null
        lastResult?: string | null
    }
}

export function StudentCard({ student }: StudentCardProps) {
    const resultColorMap = {
        Red: 'bg-red-100 text-red-700 border-red-200',
        Yellow: 'bg-amber-100 text-amber-700 border-amber-200',
        Green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    }

    const resultLabelMap = {
        Red: 'Destek Gerekli',
        Yellow: 'İyi Gidiyor',
        Green: 'Mükemmel',
    }

    const bgColor = student.lastResult ? resultColorMap[student.lastResult as keyof typeof resultColorMap] : 'bg-gray-100 text-gray-700 border-gray-200'
    const resultLabel = student.lastResult ? resultLabelMap[student.lastResult as keyof typeof resultLabelMap] : 'Henüz Değerlendirilmedi'

    return (
        <Link href={`/students/${student.id}`}>
            <div className="glass-card p-6 hover:shadow-xl transition-all duration-300 group bg-white border border-gray-100">
                {/* Avatar Circle */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform ring-4 ring-white">
                        {student.nameSurname.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {student.nameSurname}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            Öğrenci
                        </p>
                    </div>
                </div>

                {/* Status Badge */}
                <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${bgColor} border mb-3 inline-flex items-center gap-1`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${student.lastResult === 'Red' ? 'bg-red-500' : student.lastResult === 'Yellow' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                    {resultLabel}
                </div>

                {/* Info Grid */}
                <div className="space-y-2 text-sm">
                    {student.lastSessionDate && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-xs">{new Date(student.lastSessionDate).toLocaleDateString('tr-TR')}</span>
                        </div>
                    )}
                    {student.lastScore !== null && student.lastScore !== undefined && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                            <span className="text-xs font-medium">Skor: {student.lastScore}/30</span>
                        </div>
                    )}
                </div>

                {/* Hover Arrow */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Detayları görüntüle</span>
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}
