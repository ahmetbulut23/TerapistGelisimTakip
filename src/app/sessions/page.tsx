import { Calendar, Clock, Users, Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function SessionsPage() {
    let students: any[] = []
    let totalSessions = 0

    try {
        const studentsData = await prisma.student.findMany({
            include: {
                sessions: {
                    orderBy: { date: 'desc' }
                }
            },
            orderBy: { nameSurname: 'asc' }
        })

        students = studentsData
        totalSessions = studentsData.reduce((sum, s) => sum + s.sessions.length, 0)
    } catch (error) {
        console.error("Failed to fetch students:", error)
    }

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Seanslar</h1>
                <p className="text-gray-600">Tüm seans kayıtlarını görüntüleyin ve yönetin</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-violet-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{totalSessions}</div>
                            <div className="text-sm text-gray-600">Toplam Seans</div>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{students.length}</div>
                            <div className="text-sm text-gray-600">Aktif Öğrenci</div>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {students.length > 0 ? Math.round(totalSessions / students.length) : 0}
                            </div>
                            <div className="text-sm text-gray-600">Ortalama Seans</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Student List with Add Session */}
            {students.length > 0 ? (
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Öğrenci Seçin ve Seans Ekleyin</h2>
                    <div className="space-y-3">
                        {students.map((student) => (
                            <div key={student.id} className="card p-5 flex items-center justify-between hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                        {student.nameSurname.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{student.nameSurname}</h3>
                                        <p className="text-sm text-gray-500">
                                            {student.sessions.length} seans kayıtlı
                                            {student.sessions.length > 0 && (
                                                <> • Son seans: {new Date(student.sessions[0].date).toLocaleDateString('tr-TR')}</>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/students/${student.id}`}
                                        className="btn btn-outline text-sm"
                                    >
                                        Profili Gör
                                    </Link>
                                    <Link
                                        href={`/students/${student.id}/sessions/new`}
                                        className="btn btn-primary text-sm"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Seans Ekle
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="card p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-violet-50 mx-auto mb-4 flex items-center justify-center">
                        <Calendar className="w-10 h-10 text-violet-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz öğrenci yok</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Seans ekleyebilmek için önce öğrenci eklemeniz gerekiyor.
                    </p>
                    <Link href="/students/new" className="btn btn-primary">
                        <Plus className="w-4 h-4" />
                        İlk Öğrenciyi Ekle
                    </Link>
                </div>
            )}
        </div>
    )
}
