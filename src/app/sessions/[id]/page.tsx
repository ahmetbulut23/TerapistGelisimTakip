import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { PDFDownloadButton } from '@/components/PDFDownloadButton'

export default async function SessionResultPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const session = await prisma.session.findUnique({
        where: { id },
        include: { student: true }
    })

    if (!session) notFound()

    const resultColor: { [key: string]: { card: string, circle: string, text: string } } = {
        'Red': {
            card: 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800',
            circle: 'bg-red-500 border-red-500 text-black',
            text: 'text-red-700 dark:text-red-400'
        },
        'Yellow': {
            card: 'bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800',
            circle: 'bg-amber-400 border-amber-400 text-black',
            text: 'text-amber-800 dark:text-amber-400'
        },
        'Green': {
            card: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800',
            circle: 'bg-emerald-500 border-emerald-500 text-black',
            text: 'text-emerald-800 dark:text-emerald-400'
        },
    }
    const colors = resultColor[session.clinicalResult] || resultColor['Red'] // Fallback

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

            <div className={`card p-8 border-2 ${colors.card} flex flex-col items-center justify-center text-center space-y-6 mb-8`}>
                <div className={`w-32 h-32 rounded-full border-[6px] ${colors.circle} flex flex-col items-center justify-center shadow-lg transition-all relative`}>
                    <span className="text-5xl font-bold tracking-tighter">{session.calculatedScore}</span>
                    <span className="text-xs font-bold opacity-75 absolute bottom-6">/30</span>
                </div>

                <div>
                    <div className={`flex items-center justify-center gap-2 mb-2 ${colors.text}`}>
                        <Icon className="w-7 h-7" />
                        <h2 className="text-2xl font-bold uppercase tracking-wide">{session.clinicalResult}</h2>
                    </div>
                    <p className={`font-medium text-lg ${colors.text} opacity-90`}>{text}</p>
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
