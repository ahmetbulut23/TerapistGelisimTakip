import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { PDFDownloadButton } from '@/components/PDFDownloadButton'

export default async function SessionResultPage({ params }: { params: { id: string } }) {
    const session = await prisma.session.findUnique({
        where: { id: params.id },
        include: { student: true }
    })

    if (!session) notFound()

    const resultColor: { [key: string]: string } = {
        'Red': 'text-status-red bg-red-50 border-status-red',
        'Yellow': 'text-status-yellow bg-yellow-50 border-status-yellow',
        'Green': 'text-status-green bg-green-50 border-status-green',
    }
    const colorClass = resultColor[session.clinicalResult] || resultColor['Red'] // Fallback

    const resultText: { [key: string]: string } = {
        'Red': 'Yoğun destek gerekli.',
        'Yellow': 'Gelişim devam ediyor, takibe devam.',
        'Green': 'Hedefe ulaşıldı, seyreltilebilir.',
    }
    const text = resultText[session.clinicalResult] || resultText['Red']

    const icons: { [key: string]: typeof CheckCircle } = {
        'Red': XCircle,
        'Yellow': AlertTriangle,
        'Green': CheckCircle,
    }
    const Icon = icons[session.clinicalResult] || icons['Red']

    return (
        <main className="container max-w-2xl py-12 animate-fade-in">
            <Link href={`/students/${session.studentId}`} className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Öğrenci Profiline Dön
            </Link>

            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Seans Değerlendirme Sonucu</h1>
                <p className="text-muted-foreground">{session.student.nameSurname} - {new Date(session.date).toLocaleDateString('tr-TR')}</p>
            </div>

            <div className={`card p-8 border-2 ${colorClass} flex flex-col items-center justify-center text-center space-y-6 mb-8`}>
                <div className="w-24 h-24 rounded-full border-4 border-current flex items-center justify-center bg-white">
                    <span className="text-4xl font-bold">{session.calculatedScore}</span>
                    <span className="text-sm text-gray-400 absolute mt-12">/30</span>
                </div>

                <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Icon className="w-6 h-6" />
                        <h2 className="text-xl font-bold uppercase tracking-wide">{session.clinicalResult}</h2>
                    </div>
                    <p className="font-medium text-lg opacity-90">{text}</p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <PDFDownloadButton
                    studentName={session.student.nameSurname}
                    date={session.date}
                    score={session.calculatedScore}
                    result={session.clinicalResult}
                    answers={session.rawAnswers}
                />
            </div>
        </main>
    )
}
