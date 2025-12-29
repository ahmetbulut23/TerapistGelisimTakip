import { FileText, Upload, Folder, Download } from 'lucide-react'

export default function DocumentsPage() {
    return (
        <div className="animate-fade-in">
            {/* Header */}
            <header className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dökümanlar</h1>
                        <p className="text-gray-600">Dosya ve belge yönetimi</p>
                    </div>
                    <button className="btn btn-primary">
                        <Upload className="w-4 h-4" />
                        Döküman Yükle
                    </button>
                </div>
            </header>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="card p-5 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                            <Folder className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Tüm Dosyalar</div>
                            <div className="text-lg font-bold text-gray-900">0</div>
                        </div>
                    </div>
                </div>

                <div className="card p-5 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">PDF</div>
                            <div className="text-lg font-bold text-gray-900">0</div>
                        </div>
                    </div>
                </div>

                <div className="card p-5 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Formlar</div>
                            <div className="text-lg font-bold text-gray-900">0</div>
                        </div>
                    </div>
                </div>

                <div className="card p-5 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Download className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">İndirilenler</div>
                            <div className="text-lg font-bold text-gray-900">0</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            <div className="card p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-violet-50 mx-auto mb-4 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz döküman yok</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Form şablonları, raporlar ve diğer belgeleri buradan yönetebilirsiniz. İlk dökümanınızı yükleyin.
                </p>
                <button className="btn btn-primary">
                    <Upload className="w-4 h-4" />
                    İlk Dökümanı Yükle
                </button>
            </div>
        </div>
    )
}
