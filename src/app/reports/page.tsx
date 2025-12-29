import { BarChart3, TrendingUp, FileText, Download, Users, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
    let students: any[] = []
    let totalSessions = 0
    let avgScore = 0

    try {
        const studentsData = await prisma.student.findMany({
            include: {
                sessions: {
                    orderBy: { date: 'desc' }
                }
            },
            orderBy: { nameSurname: 'asc' }
        })

        students = studentsData.map(s => {
            const sessions = s.sessions
            const scores = sessions.map((sess: any) => sess.calculatedScore).filter((score: any) => score !== null)
            const avgStudentScore = scores.length > 0 ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length : 0

            let trend = 'stable'
            if (sessions.length >= 2 && scores.length >= 2) {
                const recentScore = scores[0]
                const previousScore = scores[1]
                if (recentScore > previousScore) trend = 'up'
                else if (recentScore < previousScore) trend = 'down'
            }

            return {
                id: s.id,
                name: s.nameSurname,
                sessionCount: sessions.length,
                avgScore: avgStudentScore,
                lastScore: scores[0] || null,
                lastResult: sessions[0]?.clinicalResult || null,
                trend
            }
        })

        totalSessions = students.reduce((sum, s) => sum + s.sessionCount, 0)
        const totalScores = students.filter(s => s.avgScore > 0).map(s => s.avgScore)
        avgScore = totalScores.length > 0 ? totalScores.reduce((a, b) => a + b, 0) / totalScores.length : 0

    } catch (error) {
        console.error("Failed to fetch reports:", error)
    }

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Raporlar ve Analizler</h1>
                <p className="text-gray-600">Gelişim raporları, istatistikler ve performans analizleri</p>
            </header>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-600">Toplam Öğrenci</div>
                        <Users className="w-5 h-5 text-violet-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{students.length}</div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-600">Toplam Seans</div>
                        <BarChart3 className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{totalSessions}</div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-600">Ortalama Skor</div>
                        <TrendingUp className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{avgScore.toFixed(1)}</div>
                    <div className="text-xs text-gray-500 mt-1">/ 30 üzerinden</div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-600">Başarı Oranı</div>
                        <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                        {students.length > 0 ? Math.round((students.filter(s => s.lastResult === 'Green').length / students.length) * 100) : 0}%
                    </div>
                </div>
            </div>

            {/* Performance Analysis */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Performans Analizi</h2>
                    <button className="text-sm font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        PDF İndir
                    </button>
                </div>

                {students.length > 0 ? (
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Öğrenci</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seans Sayısı</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ortalama Skor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Skor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {students.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div className="font-medium text-gray-900">{student.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {student.sessionCount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {student.avgScore > 0 ? student.avgScore.toFixed(1) : '-'}
                                                </div>
                                                <div className="text-xs text-gray-500">/ 30</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {student.lastScore !== null ? student.lastScore : '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {student.trend === 'up' && (
                                                    <div className="flex items-center text-emerald-600">
                                                        <ArrowUp className="w-4 h-4 mr-1" />
                                                        <span className="text-xs font-medium">Yükseliş</span>
                                                    </div>
                                                )}
                                                {student.trend === 'down' && (
                                                    <div className="flex items-center text-red-600">
                                                        <ArrowDown className="w-4 h-4 mr-1" />
                                                        <span className="text-xs font-medium">Düşüş</span>
                                                    </div>
                                                )}
                                                {student.trend === 'stable' && (
                                                    <div className="flex items-center text-gray-500">
                                                        <Minus className="w-4 h-4 mr-1" />
                                                        <span className="text-xs font-medium">Stabil</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {student.lastResult === 'Green' && (
                                                    <span className="badge badge-success">BAŞARILI</span>
                                                )}
                                                {student.lastResult === 'Yellow' && (
                                                    <span className="badge badge-warning">ORTA</span>
                                                )}
                                                {student.lastResult === 'Red' && (
                                                    <span className="badge badge-danger">DESTEK GEREKLİ</span>
                                                )}
                                                {!student.lastResult && (
                                                    <span className="text-xs text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <Link
                                                    href={`/students/${student.id}`}
                                                    className="text-violet-600 hover:text-violet-700 font-medium"
                                                >
                                                    Detay
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="card p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                            <BarChart3 className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz veri yok</h3>
                        <p className="text-gray-600 mb-6">
                            Rapor oluşturmak için önce öğrenci ve seans ekleyin
                        </p>
                        <Link href="/students/new" className="btn btn-primary">
                            Öğrenci Ekle
                        </Link>
                    </div>
                )}
            </div>

            {/* Export Options */}
            {students.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                            <BarChart3 className="w-6 h-6 text-violet-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gelişim Grafikleri</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Öğrencilerin zaman içindeki gelişim trendlerini görüntüleyin
                        </p>
                        <div className="text-sm font-medium text-violet-600">Yakında →</div>
                    </div>

                    <div className="card p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                            <TrendingUp className="w-6 h-6 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Detaylı Analiz</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Soru bazlı performans ve kategori analizleri
                        </p>
                        <div className="text-sm font-medium text-teal-600">Yakında →</div>
                    </div>

                    <button className="card p-6 hover:shadow-lg transition-shadow text-left">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                            <Download className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Toplu PDF İndir</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Tüm öğrenciler için detaylı PDF raporları oluştur
                        </p>
                        <div className="text-sm font-medium text-orange-600">İndir →</div>
                    </button>
                </div>
            )}
        </div>
    )
}
