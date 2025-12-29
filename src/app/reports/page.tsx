import { BarChart3, TrendingUp, FileText, Download } from 'lucide-react'

export default function ReportsPage() {
    return (
        <div className="animate-fade-in">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Raporlar</h1>
                <p className="text-gray-600">Gelişim raporları ve istatistikler</p>
            </header>

            {/* Report Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card p-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                        <BarChart3 className="w-6 h-6 text-violet-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Gelişim Grafikleri</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Öğrencilerin zaman içindeki gelişim trendlerini görüntüleyin
                    </p>
                    <button className="text-sm font-medium text-violet-600 hover:text-violet-700">
                        Raporları Görüntüle →
                    </button>
                </div>

                <div className="card p-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                        <TrendingUp className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Performans Analizi</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Detaylı skor analizleri ve değerlendirme raporları
                    </p>
                    <button className="text-sm font-medium text-teal-600 hover:text-teal-700">
                        Analizleri İncele →
                    </button>
                </div>

                <div className="card p-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Raporları</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Yazdırılabilir detaylı gelişim raporları oluşturun
                    </p>
                    <button className="text-sm font-medium text-orange-600 hover:text-orange-700">
                        Rapor Oluştur →
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="card p-8 mt-8 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                        <Download className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Rapor İndirme</h3>
                        <p className="text-gray-700 mb-4">
                            Tüm raporlarınızı PDF formatında indirebilir, yazdırabilir veya paylaşabilirsiniz.
                            Her öğrenci için ayrı ayrı veya toplu rapor oluşturma seçenekleri mevcuttur.
                        </p>
                        <button className="btn btn-primary">
                            <Download className="w-4 h-4" />
                            Toplu Rapor İndir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
