import { User, Bell, Lock, Palette, Globe, Mail } from 'lucide-react'

export default function SettingsPage() {
    return (
        <div className="animate-fade-in">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Ayarlar</h1>
                <p className="text-gray-600">Uygulama tercihlerinizi yönetin</p>
            </header>

            {/* Settings Sections */}
            <div className="space-y-6">
                {/* Profile Settings */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Profil Bilgileri</h3>
                            <p className="text-sm text-gray-600">Kişisel bilgilerinizi güncelleyin</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                                placeholder="Ahmet Terapist"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                                placeholder="ahmet@example.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Bildirimler</h3>
                            <p className="text-sm text-gray-600">Bildirim tercihlerinizi ayarlayın</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700">E-posta bildirimleri</span>
                            </div>
                            <input type="checkbox" className="w-5 h-5 text-violet-600 rounded" />
                        </label>
                        <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <Bell className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700">Seans hatırlatıcıları</span>
                            </div>
                            <input type="checkbox" className="w-5 h-5 text-violet-600 rounded" defaultChecked />
                        </label>
                    </div>
                </div>

                {/* Security */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Güvenlik</h3>
                            <p className="text-sm text-gray-600">Şifre ve güvenlik ayarları</p>
                        </div>
                    </div>
                    <button className="btn btn-outline">
                        Şifreyi Değiştir
                    </button>
                </div>

                {/* Appearance */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Palette className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Görünüm</h3>
                            <p className="text-sm text-gray-600">Tema ve görünüm tercihleri</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex-1 p-3 border-2 border-violet-500 rounded-xl text-sm font-medium text-violet-600 bg-violet-50">
                            Açık Tema
                        </button>
                        <button className="flex-1 p-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Koyu Tema
                        </button>
                    </div>
                </div>

                {/* Language */}
                <div className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Dil</h3>
                            <p className="text-sm text-gray-600">Uygulama dilini seçin</p>
                        </div>
                    </div>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500">
                        <option>Türkçe</option>
                        <option>English</option>
                    </select>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-3">
                    <button className="btn btn-outline">İptal</button>
                    <button className="btn btn-primary">Değişiklikleri Kaydet</button>
                </div>
            </div>
        </div>
    )
}
