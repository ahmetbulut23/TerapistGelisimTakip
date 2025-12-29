'use client'

import { register } from '@/lib/actions'
import Link from 'next/link'
import { Brain } from 'lucide-react'
import { useFormState, useFormStatus } from 'react-dom'

export default function RegisterPage() {
    const [state, dispatch] = useFormState(register, undefined)

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in text-gray-900">
            <div className="card w-full max-w-md p-8 shadow-lg bg-white border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-violet-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Hesap Oluştur</h1>
                    <p className="text-gray-500">Terapist Gelişim Takip Sistemine Kayıt Olun</p>
                </div>

                <form action={dispatch} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="fullName" className="text-sm font-medium text-gray-700 block">Ad Soyad</label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            placeholder="Adınız Soyadınız"
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-sans"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email Adresi</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="ornek@email.com"
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-sans"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Şifre</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="******"
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-sans"
                        />
                    </div>

                    <div className="pt-2">
                        <SignUpButton />
                    </div>

                    {state && (
                        <div className="text-red-500 text-sm text-center mt-2">
                            {state}
                        </div>
                    )}
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-500">Zaten hesabınız var mı? <Link href="/login" className="text-violet-600 font-semibold hover:underline">Giriş Yap</Link></p>
                </div>
            </div>
        </div>
    )
}

function SignUpButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full btn btn-primary py-3 rounded-xl flex items-center justify-center gap-2"
        >
            {pending ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
        </button>
    )
}
