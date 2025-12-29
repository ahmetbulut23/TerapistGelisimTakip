import { createStudent } from '@/lib/actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewStudentPage() {
    return (
        <main className="container max-w-lg py-8 animate-fade-in">
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Panele Dön
            </Link>

            <div className="mb-8">
                <h1 className="text-2xl font-bold">Yeni Öğrenci Ekle</h1>
                <p className="text-muted-foreground">Takip edeceğiniz öğrenci bilgilerini giriniz.</p>
            </div>

            <div className="card p-6">
                <form action={createStudent} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="nameSurname" className="text-sm font-medium block">Ad Soyad</label>
                        <input
                            id="nameSurname"
                            name="nameSurname"
                            type="text"
                            required
                            placeholder="Ahmet Yılmaz"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="birthDate" className="text-sm font-medium block">Doğum Tarihi (Opsiyonel)</label>
                        <input
                            id="birthDate"
                            name="birthDate"
                            type="date"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="notes" className="text-sm font-medium block">Notlar</label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            placeholder="Özel klinik notları..."
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans resize-none"
                        />
                    </div>

                    <button type="submit" className="w-full btn btn-primary py-3">
                        Öğrenciyi Kaydet
                    </button>
                </form>
            </div>
        </main>
    )
}
