'use client'

import { X, TrendingUp, Calendar } from 'lucide-react'

type StudentProgressModalProps = {
    student: {
        name: string
        sessions: Array<{
            date: Date
            score: number
            result: string
        }>
    }
    onClose: () => void
}

export function StudentProgressModal({ student, onClose }: StudentProgressModalProps) {
    const maxScore = 30
    const sessions = student.sessions.slice(0, 10).reverse() // Son 10 seans

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                        <p className="text-sm text-gray-600">Gelişim Grafiği</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {sessions.length > 0 ? (
                        <>
                            {/* Chart */}
                            <div className="mb-8">
                                <div className="flex items-end justify-between h-64 gap-2">
                                    {sessions.map((session, index) => {
                                        const height = (session.score / maxScore) * 100
                                        const colors = {
                                            'Green': 'bg-emerald-500',
                                            'Yellow': 'bg-amber-500',
                                            'Red': 'bg-red-500'
                                        }
                                        const color = colors[session.result as keyof typeof colors] || 'bg-gray-400'

                                        return (
                                            <div key={index} className="flex-1 flex flex-col items-center">
                                                <div className="w-full flex flex-col justify-end items-center h-full">
                                                    <div className="text-xs font-semibold text-gray-700 mb-1">{session.score}</div>
                                                    <div
                                                        className={`w-full rounded-t-lg ${color} transition-all hover:opacity-80 relative group`}
                                                        style={{ height: `${height}%`, minHeight: '20px' }}
                                                    >
                                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                            {new Date(session.date).toLocaleDateString('tr-TR')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-2 text-center">S{index + 1}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="card-flat p-4 text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {sessions.length}
                                    </div>
                                    <div className="text-sm text-gray-600">Toplam Seans</div>
                                </div>
                                <div className="card-flat p-4 text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {(sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length).toFixed(1)}
                                    </div>
                                    <div className="text-sm text-gray-600">Ortalama Skor</div>
                                </div>
                                <div className="card-flat p-4 text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {sessions[sessions.length - 1]?.score || '-'}
                                    </div>
                                    <div className="text-sm text-gray-600">Son Skor</div>
                                </div>
                            </div>

                            {/* Session List */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Seans Detayları</h3>
                                <div className="space-y-2">
                                    {sessions.reverse().map((session, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-900">
                                                    {new Date(session.date).toLocaleDateString('tr-TR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold text-gray-900">{session.score}/30</span>
                                                {session.result === 'Green' && <span className="badge badge-success text-xs">BAŞARILI</span>}
                                                {session.result === 'Yellow' && <span className="badge badge-warning text-xs">ORTA</span>}
                                                {session.result === 'Red' && <span className="badge badge-danger text-xs">DESTEK</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">Henüz seans kaydı bulunmuyor</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
