import Link from 'next/link'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { ArrowLeft, User, Calendar, FileText, Plus } from 'lucide-react'
import { StudentProgressChart } from '@/components/StudentProgressChart'

export default async function StudentDetailPage({
    params
}: {
    params: { id: string }
}) {
    const student = await prisma.student.findUnique({
        where: { id: params.id },
        include: {
            sessions: {
                orderBy: { date: 'asc' }
            }
        }
    })

    if (!student) {
        notFound()
    }

    const chartData = student.sessions.map(s => ({
        date: new Date(s.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
        score: s.calculatedScore
    }))

    const orderedSessions = [...student.sessions].reverse() // Show newest first in list

    return (
        <main className="container py-8 animate-fade-in space-y-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <Link href="/" className="mt-1 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">{student.nameSurname}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground text-sm mt-1">
                            {student.birthDate && (
                                <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {new Date(student.birthDate).toLocaleDateString('tr-TR')}
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {student.sessions.length} Seans
                            </span>
                        </div>
                    </div>
                </div>

                <Link href={`/students/${student.id}/sessions/new`} className="btn btn-primary gap-2">
                    <Plus className="w-4 h-4" />
                    Yeni Seans Değerlendir
                </Link>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column: Info & Notes */}
                <div className="md:col-span-1 space-y-6">
                    <div className="card p-6">
                        <h2 className="font-semibold text-lg mb-4">Öğrenci Bilgileri</h2>
                        {student.notes ? (
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md border">
                                <p className="font-medium text-xs text-gray-400 mb-1">NOTLAR</p>
                                {student.notes}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground italic">Not eklenmemiş.</p>
                        )}

                        <div className="mt-6 pt-6 border-t">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Kayıt Tarihi</span>
                                    <span>{new Date(student.createdAt).toLocaleDateString('tr-TR')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Chart & History */}
                <div className="md:col-span-2 space-y-6">
                    {/* Chart Section */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-semibold text-lg">Gelişim Grafiği</h2>
                            {chartData.length > 0 && (
                                <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                                    Son 30 Gün
                                </span>
                            )}
                        </div>
                        <StudentProgressChart data={chartData} />
                    </div>

                    {/* History List */}
                    <div className="card p-6">
                        <h2 className="font-semibold text-lg mb-4">Geçmiş Seanslar</h2>
                        {orderedSessions.length > 0 ? (
                            <div className="space-y-3">
                                {orderedSessions.map(session => (
                                    <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-10 rounded-full ${session.clinicalResult === 'Green' ? 'bg-status-green' :
                                                    session.clinicalResult === 'Yellow' ? 'bg-status-yellow' : 'bg-status-red'
                                                }`} />
                                            <div>
                                                <p className="font-medium">{new Date(session.date).toLocaleDateString('tr-TR', { dateStyle: 'long' })}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">Skor: {session.calculatedScore}</p>
                                            </div>
                                        </div>
                                        <Link href={`/sessions/${session.id}`} className="text-sm font-medium text-primary hover:underline">
                                            Raporu Gör
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground py-4">Henüz seans kaydı bulunmuyor.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
