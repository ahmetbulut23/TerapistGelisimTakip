'use client'

import { User, Bell, Lock, Palette, Globe, Mail, Save, Loader2, HelpCircle, Trash2, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAppSettings } from '@/components/AppSettingsProvider'
import { SESSION_QUESTIONS } from '@/lib/constants'

export default function SettingsPage() {
    const { setTheme, setLanguage } = useAppSettings()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState<any>({
        full_name: '',
        email: '',
        preferences: {
            theme: 'light',
            emailNotifications: false,
            sessionReminders: true,
            language: 'Türkçe'
        },
        customQuestions: []
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
                },
                customQuestions: (data.customQuestions && data.customQuestions.length > 0)
                    ? data.customQuestions
                    : SESSION_QUESTIONS
            })
            // Sync context
            if (data.preferences?.theme) setTheme(data.preferences.theme)
            if (data.preferences?.language) setLanguage(data.preferences.language)
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
        setFormData((prev: any) => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [key]: value
            }
        }))

        // Immediate context update for Theme & Language
        if (key === 'theme') setTheme(value)
        if (key === 'language') setLanguage(value)
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Ayarlar</h1>
                <p className="text-gray-600 dark:text-gray-400">Uygulama tercihlerinizi yönetin</p>
            </header>

            {/* Settings Sections */}
            <div className="space-y-6">
                {/* Profile Settings */}
                <div className="card p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                            <User className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Profil Bilgileri</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Kişisel bilgilerinizi güncelleyin</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ad Soyad</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                                value={formData.full_name}
                                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-posta</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Session Questions Editor */}
                <div className="card p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                            <HelpCircle className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Değerlendirme Soruları</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Seanslarda kullanılan soruları düzenleyin</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {formData.customQuestions && formData.customQuestions.map((q: any, index: number) => (
                            <div key={index} className="flex gap-2">
                                <span className="flex items-center justify-center w-8 h-10 text-gray-400 font-medium text-sm border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shrink-0">
                                    {index + 1}
                                </span>
                                <input
                                    type="text"
                                    value={q.text}
                                    onChange={(e) => {
                                        const newQuestions = [...formData.customQuestions]
                                        newQuestions[index].text = e.target.value
                                        setFormData({ ...formData, customQuestions: newQuestions })
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Soru metni..."
                                />
                                <button
                                    onClick={() => {
                                        const newQuestions = formData.customQuestions.filter((_: any, i: number) => i !== index)
                                        setFormData({ ...formData, customQuestions: newQuestions })
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Soruyu Sil"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={() => {
                                setFormData({
                                    ...formData,
                                    customQuestions: [...(formData.customQuestions || []), { id: `q${Date.now()}`, text: '' }]
                                })
                            }}
                            className="btn btn-outline w-full border-dashed border-2 flex items-center justify-center gap-2 py-3 text-gray-500 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                        >
                            <Plus className="w-5 h-5" />
                            Yeni Soru Ekle
                        </button>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="card p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Bildirimler</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Bildirim tercihlerinizi ayarlayın</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">E-posta bildirimleri</span>
                            </div>
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-violet-600 rounded"
                                checked={formData.preferences.emailNotifications}
                                onChange={e => updatePreference('emailNotifications', e.target.checked)}
                            />
                        </label>
                        <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <Bell className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Seans hatırlatıcıları</span>
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
                <div className="card p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Güvenlik</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Şifrenizi buradan değiştirebilirsiniz</p>
                        </div>
                    </div>

                    <PasswordChangeForm />
                </div>

                {/* Appearance */}
                <div className="card p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Palette className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Görünüm</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Tema ve görünüm tercihleri</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => updatePreference('theme', 'light')}
                            className={`flex-1 p-3 border rounded-xl text-sm font-medium transition-colors ${formData.preferences.theme === 'light'
                                ? 'border-violet-500 bg-violet-50 text-violet-600'
                                : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            Açık Tema
                        </button>
                        <button
                            onClick={() => updatePreference('theme', 'dark')}
                            className={`flex-1 p-3 border rounded-xl text-sm font-medium transition-colors ${formData.preferences.theme === 'dark'
                                ? 'border-violet-500 bg-gray-800 text-white shadow-sm ring-1 ring-violet-500'
                                : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            Koyu Tema
                        </button>
                    </div>
                </div>

                {/* Language */}
                <div className="card p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Dil</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Uygulama dilini seçin</p>
                        </div>
                    </div>
                    <select
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                        value={formData.preferences.language}
                        onChange={e => updatePreference('language', e.target.value)}
                    >
                        <option value="Türkçe">Türkçe</option>
                        <option value="English">English</option>
                    </select>
                </div>

                {/* Save Button */}
                <div className="sticky bottom-6 flex justify-end gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
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

import { useFormState, useFormStatus } from 'react-dom'
import { updatePassword } from '@/lib/actions'

function PasswordChangeForm() {
    const [state, dispatch] = useFormState(updatePassword, undefined)

    return (
        <form action={dispatch} className="space-y-4 max-w-md">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mevcut Şifre</label>
                <input
                    type="password"
                    name="currentPassword"
                    required
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Yeni Şifre</label>
                <input
                    type="password"
                    name="newPassword"
                    required
                    minLength={6}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Yeni Şifre (Tekrar)</label>
                <input
                    type="password"
                    name="confirmPassword"
                    required
                    minLength={6}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                />
            </div>

            <PasswordSubmitButton />

            {state && (
                <p className={`text-sm ${state.includes('başarıyla') ? 'text-green-600' : 'text-red-500'}`}>
                    {state}
                </p>
            )}
        </form>
    )
}

function PasswordSubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="btn btn-primary px-6"
        >
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Güncelleniyor...
                </>
            ) : (
                'Şifreyi Güncelle'
            )}
        </button>
    )
}
