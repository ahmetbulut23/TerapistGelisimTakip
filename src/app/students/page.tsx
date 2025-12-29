import Link from 'next/link'
import { Plus, Search, Filter, Users } from 'lucide-react'
import { prisma } from '@/lib/db'
import { StudentCard } from '@/components/StudentCard'

export const dynamic = 'force-dynamic'

export default async function StudentsPage() {
    type Student = {
        id: string
        nameSurname: string
        lastSessionDate?: Date | null
        lastScore?: number | null
        lastResult?: string | null
    }

    let students: Student[] = []

    try {
        const studentsData = await prisma.student.findMany({
            include: {
                sessions: {
                    orderBy: { date: 'desc' },
                    take: 1
                }
            },
            orderBy: { updatedAt: 'desc' }
        })

        students = studentsData.map((s: any) => ({
            id: s.id,
            nameSurname: s.nameSurname,
            lastSessionDate: s.sessions[0]?.date,
            lastScore: s.sessions[0]?.calculatedScore,
            lastResult: s.sessions[0]?.clinicalResult
        }))
    } catch (error) {
        console.error("Failed to fetch students:", error)
    }

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <header className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Öğrenciler</h1>
                        <p className="text-gray-600">Tüm öğrencilerinizi görüntüleyin ve yönetin</p>
                    </div>
                    <Link href="/students/new" className="btn btn-primary">
                        <Plus className="w-4 h-4" />
                        Yeni Öğrenci Ekle
                    </Link>
                </div>

                {/* Search and Filter */}
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Öğrenci ara..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <button className="btn btn-outline">
                        <Filter className="w-4 h-4" />
                        Filtrele
                    </button>
                </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="card p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Toplam Öğrenci</div>
                            <div className="text-2xl font-bold text-gray-900">{students.length}</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-violet-600" />
                        </div>
                    </div>
                </div>

                <div className="card p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Aktif Takip</div>
                            <div className="text-2xl font-bold text-gray-900">
                                {students.filter(s => s.lastResult === 'Green' || s.lastResult === 'Yellow').length}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-teal-600" />
                        </div>
                    </div>
                </div>

                <div className="card p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">İyi Gidiyor</div>
                            <div className="text-2xl font-bold text-gray-900">
                                {students.filter(s => s.lastResult === 'Green').length}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                </div>

                <div className="card p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Destek Gerekli</div>
                            <div className="text-2xl font-bold text-gray-900">
                                {students.filter(s => s.lastResult === 'Red').length}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Student List */}
            {students.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {students.map(student => (
                        <StudentCard key={student.id} student={student} />
                    ))}
                </div>
            ) : (
                <div className="card p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-violet-50 mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-10 h-10 text-violet-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz öğrenci yok</h3>
                    <p className="text-gray-600 mb-6">İlk öğrencinizi ekleyerek başlayın</p>
                    <Link href="/students/new" className="btn btn-primary">
                        <Plus className="w-4 h-4" />
                        Öğrenci Ekle
                    </Link>
                </div>
            )}
        </div>
    )
}
