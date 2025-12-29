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

    // SVG line chart dimensions
    const width = 800
    const height = 300
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Calculate points for the line
    const points = sessions.map((session, index) => {
        const x = padding + (index / Math.max(sessions.length - 1, 1)) * chartWidth
        const y = padding + chartHeight - (session.score / maxScore) * chartHeight
        return { x, y, score: session.score, date: session.date, result: session.result }
    })

    // Create SVG path
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

    // Create area fill path
    const areaPath = `${linePath} L ${points[points.length - 1]?.x || padding} ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`

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
                            {/* Line Chart */}
                            <div className="mb-8 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6">
                                <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ maxHeight: '400px' }}>
                                    {/* Grid lines */}
                                    {[0, 1, 2, 3, 4].map(i => {
                                        const y = padding + (i / 4) * chartHeight
                                        return (
                                            <g key={i}>
                                                <line
                                                    x1={padding}
                                                    y1={y}
                                                    x2={width - padding}
                                                    y2={y}
                                                    stroke="#e5e7eb"
                                                    strokeWidth="1"
                                                    strokeDasharray="4"
                                                />
                                                <text
                                                    x={padding - 10}
                                                    y={y + 5}
                                                    textAnchor="end"
                                                    fontSize="12"
                                                    fill="#6b7280"
                                                >
                                                    {maxScore - (i / 4) * maxScore}
                                                </text>
                                            </g>
                                        )
                                    })}

                                    {/* Area fill */}
                                    <path
                                        d={areaPath}
                                        fill="url(#gradient)"
                                        opacity="0.3"
                                    />

                                    {/* Gradient definition */}
                                    <defs>
                                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#8B5CF6" />
                                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>

                                    {/* Line */}
                                    <path
                                        d={linePath}
                                        fill="none"
                                        stroke="#8B5CF6"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {/* Data points */}
                                    {points.map((point, index) => {
                                        const colors = {
                                            'Green': '#10b981',
                                            'Yellow': '#f59e0b',
                                            'Red': '#ef4444'
                                        }
                                        const color = colors[point.result as keyof typeof colors] || '#6b7280'

                                        return (
                                            <g key={index}>
                                                <circle
                                                    cx={point.x}
                                                    cy={point.y}
                                                    r="6"
                                                    fill="white"
                                                    stroke={color}
                                                    strokeWidth="3"
                                                />
                                                <circle
                                                    cx={point.x}
                                                    cy={point.y}
                                                    r="3"
                                                    fill={color}
                                                />

                                                {/* Score label */}
                                                <text
                                                    x={point.x}
                                                    y={point.y - 15}
                                                    textAnchor="middle"
                                                    fontSize="12"
                                                    fontWeight="bold"
                                                    fill="#1f2937"
                                                >
                                                    {point.score}
                                                </text>

                                                {/* Session label */}
                                                <text
                                                    x={point.x}
                                                    y={padding + chartHeight + 20}
                                                    textAnchor="middle"
                                                    fontSize="11"
                                                    fill="#6b7280"
                                                >
                                                    S{index + 1}
                                                </text>
                                            </g>
                                        )
                                    })}

                                    {/* Axes */}
                                    <line
                                        x1={padding}
                                        y1={padding + chartHeight}
                                        x2={width - padding}
                                        y2={padding + chartHeight}
                                        stroke="#9ca3af"
                                        strokeWidth="2"
                                    />
                                    <line
                                        x1={padding}
                                        y1={padding}
                                        x2={padding}
                                        y2={padding + chartHeight}
                                        stroke="#9ca3af"
                                        strokeWidth="2"
                                    />
                                </svg>
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
