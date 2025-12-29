import Link from 'next/link'
import { User, Calendar, TrendingUp, ArrowRight } from 'lucide-react'

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
        Red: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
        Yellow: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
        Green: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    }

    const resultLabelMap = {
        Red: 'Destek Gerekli',
        Yellow: 'İlerleme Kaydediliyor',
        Green: 'Hedeflere Ulaşıldı',
    }

    const colors = student.lastResult
        ? resultColorMap[student.lastResult as keyof typeof resultColorMap]
        : { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-400' }

    const label = student.lastResult
        ? resultLabelMap[student.lastResult as keyof typeof resultLabelMap]
        : 'Henüz Değerlendirilmedi'

    return (
        <Link href={`/students/${student.id}`}>
            <div className="card p-0 overflow-hidden group hover:shadow-xl">
                {/* Header with Avatar */}
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-6 pb-8">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg ring-4 ring-white/30">
                            {student.nameSurname.charAt(0).toUpperCase()}
                        </div>
                        {student.lastScore !== null && student.lastScore !== undefined && (
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <span className="text-white text-sm font-bold">{student.lastScore}/30</span>
                            </div>
                        )}
                    </div>
                    <h3 className="text-white font-bold text-lg group-hover:translate-x-1 transition-transform">
                        {student.nameSurname}
                    </h3>
                </div>

                {/* Content */}
                <div className="p-5 bg-white">
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} mb-4`}>
                        <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                        <span className={`text-xs font-semibold ${colors.text}`}>{label}</span>
                    </div>

                    {/* Info */}
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                        {student.lastSessionDate && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>Son Seans: {new Date(student.lastSessionDate).toLocaleDateString('tr-TR')}</span>
                            </div>
                        )}
                        {student.lastScore !== null && student.lastScore !== undefined && (
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-gray-400" />
                                <span>Gelişim Skoru</span>
                            </div>
                        )}
                    </div>

                    {/* Action Link */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-sm font-medium text-gray-700">Detayları görüntüle</span>
                        <div className="w-7 h-7 rounded-full bg-violet-50 group-hover:bg-violet-500 flex items-center justify-center transition-colors">
                            <ArrowRight className="w-4 h-4 text-violet-600 group-hover:text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
