'use client'

import { useForm } from 'react-hook-form'
import { SESSION_QUESTIONS } from '@/lib/constants'
import { saveSession } from '@/lib/actions'
import { clsx } from 'clsx'
import { useState } from 'react'

type FormData = {
    [key: string]: string // 'yes' | 'no'
}

export function SessionForm({ studentId }: { studentId: string }) {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>()
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async (data: FormData) => {
        try {
            await saveSession(studentId, data)
        } catch (e) {
            console.error(e)
            setError("Kaydetme işlemi sırasında bir hata oluştu.")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                {SESSION_QUESTIONS.map((q, index) => (
                    <div key={q.id} className="card p-4 transition-all hover:border-primary/30">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold bg-gray-100">
                                    {index + 1}
                                </span>
                                <p className="font-medium">{q.text}</p>
                            </div>

                            <div className="flex items-center gap-4 pl-9 md:pl-0">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="radio"
                                        value="yes"
                                        {...register(q.id, { required: true })}
                                        className="w-4 h-4 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm font-medium group-hover:text-primary transition-colors">Evet</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register(q.id, { required: true })}
                                        className="w-4 h-4 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm font-medium group-hover:text-status-red transition-colors">Hayır</span>
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sticky bottom-4 z-10 glass-effect p-4 -mx-4 md:static md:p-0 md:bg-transparent md:mx-0">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto md:ml-auto btn btn-primary py-3 px-8 shadow-lg shadow-primary/25"
                >
                    {isSubmitting ? 'Hesaplanıyor...' : 'Analizi Tamamla ve Kaydet'}
                </button>
            </div>
        </form>
    )
}
