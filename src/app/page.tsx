import Link from 'next/link'
import { Plus } from 'lucide-react'
import { prisma } from '@/lib/db'
import { StudentCard } from '@/components/StudentCard'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  type DashboardStudent = {
    id: string
    nameSurname: string
    lastSessionDate?: Date | null
    lastScore?: number | null
    lastResult?: string | null
  }

  let students: DashboardStudent[] = []
  let totalStudents = 0
  let activeStudents = 0
  let attentionNeeded = 0

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

    totalStudents = students.length
    activeStudents = students.filter(s => s.lastResult === 'Green' || s.lastResult === 'Yellow').length
    attentionNeeded = students.filter(s => s.lastResult === 'Red').length

  } catch (error) {
    console.error("Failed to fetch students:", error)
  }

  return (
    <main className="container py-8 animate-fade-in relative z-10">

      {/* Welcome / Stats Section */}
      <section className="mb-10 text-white">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-sm">Terapist Paneli</h1>
        <p className="text-lg opacity-90 mb-8 font-medium">Hoş geldin. Bugün kimin hayatına dokunuyoruz?</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-4 text-gray-800 flex flex-col items-center justify-center text-center bg-white/80">
            <span className="text-3xl font-bold text-primary">{totalStudents}</span>
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Toplam Öğrenci</span>
          </div>
          <div className="glass-card p-4 text-gray-800 flex flex-col items-center justify-center text-center bg-white/80">
            <span className="text-3xl font-bold text-status-yellow">{activeStudents}</span>
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Aktif Takip</span>
          </div>
          <div className="glass-card p-4 text-gray-800 flex flex-col items-center justify-center text-center bg-white/80">
            <span className="text-3xl font-bold text-status-red">{attentionNeeded}</span>
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Destek Gerekli</span>
          </div>
          <Link href="/students/new" className="glass-card p-4 flex flex-col items-center justify-center text-center hover:bg-white/40 transition-colors cursor-pointer group border-2 border-dashed border-white/50 bg-white/10">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-bold text-white">Yeni Öğrenci Ekle</span>
          </Link>
        </div>
      </section>

      {/* Student List Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">Öğrencilerim</h2>
        </div>

        {students.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {students.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="glass-card text-center py-16 px-4 bg-white/90">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Listeniz Boş Görünüyor</h3>
            <p className="text-gray-600 max-w-sm mx-auto mb-8">
              Takip ettiğiniz ilk öğrenciyi ekleyerek yolculuğa başlayın. Seansları kaydedin ve gelişimi izleyin.
            </p>
            <Link href="/students/new" className="btn btn-primary px-8 py-3 text-lg shadow-xl">
              İlk Öğrenciyi Ekle
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
