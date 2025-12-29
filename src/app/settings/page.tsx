'use client'

import { User, Bell, Lock, Palette, Globe, Mail, Save, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        preferences: {
            theme: 'light',
            emailNotifications: false,
            sessionReminders: true,
            language: 'Türkçe'
        }
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    async function fetchSettings() {
        try {
            const res = await fetch('/api/settings')
            const data = await res.json()
            setFormData({
                full_name: data.full_name,
                email: data.email,
                preferences: {
                    theme: 'light',
                    emailNotifications: false,
                    sessionReminders: true,
                    language: 'Türkçe',
                    ...data.preferences
                }
            })
        } catch (error) {
            console.error('Failed to fetch settings:', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleSave() {
        setSaving(true)
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                alert('Ayarlar başarıyla kaydedildi!')
            } else {
                alert('Kaydetme başarısız oldu.')
            }
        } catch (error) {
            console.error('Failed to save settings:', error)
            alert('Bir hata oluştu.')
        } finally {
            setSaving(false)
        }
    }

    const updatePreference = (key: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [key]: value
            }
        }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
            </div>
        )
    }

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
                                value={formData.full_name}
                                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-violet-600 rounded"
                                checked={formData.preferences.emailNotifications}
                                onChange={e => updatePreference('emailNotifications', e.target.checked)}
                            />
                        </label>
                        <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <Bell className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700">Seans hatırlatıcıları</span>
                            </div>
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-violet-600 rounded"
                                checked={formData.preferences.sessionReminders}
                                onChange={e => updatePreference('sessionReminders', e.target.checked)}
                            />
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
                    <button className="btn btn-outline" onClick={() => alert('Şifre değiştirme e-postası gönderildi!')}>
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
                        <button
                            onClick={() => updatePreference('theme', 'light')}
                            className={`flex-1 p-3 border rounded-xl text-sm font-medium transition-colors ${formData.preferences.theme === 'light'
                                    ? 'border-violet-500 bg-violet-50 text-violet-600'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Açık Tema
                        </button>
                        <button
                            onClick={() => updatePreference('theme', 'dark')}
                            className={`flex-1 p-3 border rounded-xl text-sm font-medium transition-colors ${formData.preferences.theme === 'dark'
                                    ? 'border-violet-500 bg-gray-800 text-white'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
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
                    <select
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                        value={formData.preferences.language}
                        onChange={e => updatePreference('language', e.target.value)}
                    >
                        <option value="Türkçe">Türkçe</option>
                        <option value="English">English</option>
                    </select>
                </div>

                {/* Save Button */}
                <div className="sticky bottom-6 flex justify-end gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100">
                    <button className="btn btn-outline" onClick={fetchSettings}>Değişiklikleri Geri Al</button>
                    <button
                        className="btn btn-primary min-w-[150px]"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Kaydediliyor...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Değişiklikleri Kaydet
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
