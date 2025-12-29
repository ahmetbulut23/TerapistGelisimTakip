import { Calendar, Clock, Users, Plus } from 'lucide-react'
import Link from 'next/link'

export default function SessionsPage() {
    return (
        <div className="animate-fade-in">
            {/* Header */}
            <header className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Seanslar</h1>
                        <p className="text-gray-600">Tüm seans kayıtlarını görüntüleyin ve yönetin</p>
                    </div>
                    <Link href="/students" className="btn btn-primary">
                        <Plus className="w-4 h-4" />
                        Yeni Seans Ekle
                    </Link>
                </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-violet-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">0</div>
                            <div className="text-sm text-gray-600">Bu Hafta</div>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">0</div>
                            <div className="text-sm text-gray-600">Bugün</div>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">0</div>
                            <div className="text-sm text-gray-600">Toplam Seans</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            <div className="card p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-violet-50 mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz seans kaydı yok</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Öğrencilerinizle yapacağınız seansları buradan takip edebilirsiniz. İlk seansı eklemek için bir öğrenci profili seçin.
                </p>
                <Link href="/students" className="btn btn-primary">
                    Öğrencilere Git
                </Link>
            </div>
        </div>
    )
}
