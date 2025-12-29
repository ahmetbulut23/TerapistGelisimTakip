'use client'

import { BarChart3, TrendingUp, FileText, Download, Users, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { StudentProgressModal } from '@/components/StudentProgressModal'

type Student = {
    id: string
    name: string
    sessionCount: number
    avgScore: number
    lastScore: number | null
    lastResult: string | null
    trend: string
    sessions: Array<{
        date: Date
        score: number
        result: string
    }>
}

export default function ReportsPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [totalSessions, setTotalSessions] = useState(0)
    const [avgScore, setAvgScore] = useState(0)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/reports')
                const data = await res.json()
                setStudents(data.students)
                setTotalSessions(data.totalSessions)
                setAvgScore(data.avgScore)
            } catch (error) {
                console.error('Failed to fetch reports:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleExportPDF = () => {
        const printContent = document.getElementById('report-table')
        if (!printContent) return

        const printWindow = window.open('', '', 'height=600,width=800')
        if (!printWindow) return

        printWindow.document.write('<html><head><title>Gelişim Raporları</title>')
        printWindow.document.write('<style>')
        printWindow.document.write('body { font-family: Arial, sans-serif; padding: 20px; }')
        printWindow.document.write('table { width: 100%; border-collapse: collapse; }')
        printWindow.document.write('th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }')
        printWindow.document.write('th { background-color: #8B5CF6; color: white; }')
        printWindow.document.write('h1 { color: #8B5CF6; }')
        printWindow.document.write('.badge { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 10px; }')
        printWindow.document.write('.success { background: #D1FAE5; color: #065F46; }')
        printWindow.document.write('.warning { background: #FEF3C7; color: #92400E; }')
        printWindow.document.write('.danger { background: #FEE2E2; color: #991B1B; }')
        printWindow.document.write('</style></head><body>')
        printWindow.document.write('<h1>TerapiPanel - Gelişim Raporları</h1>')
        printWindow.document.write('<p>Rapor Tarihi: ' + new Date().toLocaleDateString('tr-TR') + '</p>')
        printWindow.document.write(printContent.innerHTML)
        printWindow.document.write('</body></html>')
        printWindow.document.close()
        printWindow.focus()
        // Print and close when done
        printWindow.onload = () => {
            printWindow.print()
            printWindow.onafterprint = () => {
                printWindow.close()
            }
        }
    }

    if (loading) {
        return (
            <div className="animate-fade-in flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Raporlar yükleniyor...</p>
                </div>
            </div>
        )
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
                    <button
                        onClick={handleExportPDF}
                        className="text-sm font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1"
                    >
                        <Download className="w-4 h-4" />
                        Tabloyu PDF İndir
                    </button>
                </div>

                {students.length > 0 ? (
                    <div className="card overflow-hidden" id="report-table">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full whitespace-nowrap">
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
                                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
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
                                                    <span className="badge success">BAŞARILI</span>
                                                )}
                                                {student.lastResult === 'Yellow' && (
                                                    <span className="badge warning">ORTA</span>
                                                )}
                                                {student.lastResult === 'Red' && (
                                                    <span className="badge danger">DESTEK GEREKLİ</span>
                                                )}
                                                {!student.lastResult && (
                                                    <span className="text-xs text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() => setSelectedStudent(student)}
                                                    className="text-violet-600 hover:text-violet-700 font-medium mr-3"
                                                >
                                                    Grafik
                                                </button>
                                                <Link
                                                    href={`/students/${student.id}`}
                                                    className="text-teal-600 hover:text-teal-700 font-medium"
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
                    <div className="card p-6 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                            <BarChart3 className="w-6 h-6 text-violet-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gelişim Grafikleri</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Yukarıdaki tabloda her öğrencinin yanındaki "Grafik" butonuna tıklayarak gelişim grafiklerini görüntüleyebilirsiniz
                        </p>
                        <div className="text-sm font-medium text-violet-600">↑ Tablodaki "Grafik" butonlarını kullanın</div>
                    </div>

                    <Link href="/students" className="card p-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                            <TrendingUp className="w-6 h-6 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Detaylı Analiz</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Öğrenci profil sayfalarında soru bazlı detaylı analizler
                        </p>
                        <div className="text-sm font-medium text-teal-600">Öğrencilere Git →</div>
                    </Link>

                    <button
                        onClick={handleExportPDF}
                        className="card p-6 hover:shadow-lg transition-shadow text-left"
                    >
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                            <Download className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Toplu PDF İndir</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Tüm öğrenciler için performans tablosunu PDF olarak kaydet
                        </p>
                        <div className="text-sm font-medium text-orange-600">PDF Oluştur →</div>
                    </button>
                </div>
            )}

            {/* Progress Modal */}
            {selectedStudent && (
                <StudentProgressModal
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                />
            )}
        </div>
    )
}
