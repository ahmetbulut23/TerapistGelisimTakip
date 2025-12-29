import Link from 'next/link'
import { Plus, Activity, AlertCircle, Users, User } from 'lucide-react'
import { prisma } from '@/lib/db'
import { StudentCard } from '@/components/StudentCard'
import { MenuGrid } from '@/components/MenuGrid'

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
    <main className="container py-12 animate-fade-in relative z-10">

      {/* Hero Section */}
      <section className="mb-12 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 drop-shadow-sm">
          Terapist Paneli
        </h1>
        <p className="text-xl text-gray-600 font-light max-w-2xl leading-relaxed">
          Hoş geldin. Bugün gelişimi takip et, geleceği şekillendir.
        </p>
      </section>

      {/* New Dashboard Layout with MenuGrid and Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left: Menu Grid */}
        <div className="order-2 md:order-1">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 opacity-90">
            <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
            Hızlı İşlemler
          </h2>
          <MenuGrid />
        </div>

        {/* Right: Quick Stats */}
        <div className="order-1 md:order-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 opacity-90">
            <span className="w-1 h-6 bg-status-yellow rounded-full"></span>
            Durum Özeti
          </h2>

          <div className="glass-card p-6 flex items-center justify-between group hover:bg-white/80 transition-colors">
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wider font-medium">Toplam Öğrenci</p>
              <p className="text-4xl font-bold text-gray-900 mt-1">{totalStudents}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
          </div>

          <div className="glass-card p-6 flex items-center justify-between group hover:bg-white/80 transition-colors">
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wider font-medium">Aktif Takip</p>
              <p className="text-4xl font-bold text-gray-900 mt-1">{activeStudents}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-amber-600" />
            </div>
          </div>

          <div className="glass-card p-6 flex items-center justify-between group hover:bg-white/80 transition-colors">
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wider font-medium">Destek Gerekli</p>
              <p className="text-4xl font-bold text-gray-900 mt-1">{attentionNeeded}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Student List Section */}
      <section id="students-list">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="w-8 h-8 text-indigo-600" />
            Öğrencilerim
          </h2>
          <span className="text-sm text-gray-500 font-mono bg-white/50 px-3 py-1 rounded-full border border-gray-200">
            {students.length} Kayıt
          </span>
        </div>

        {students.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {students.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="glass-card text-center py-20 px-4 border border-dashed border-gray-300 bg-white/40">
            <div className="w-24 h-24 bg-white/60 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-gray-200 shadow-sm">
              <Plus className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Listeniz Boş</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8 font-light">
              Takip sistemine başlamak için ilk öğrenci kaydını oluşturun.
            </p>
            <Link href="/students/new" className="inline-flex items-center px-8 py-4 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-600/30">
              Yeni Kayıt Oluştur
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
