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
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-2xl">
          Terapist Paneli
        </h1>
        <p className="text-xl text-gray-300 font-light max-w-2xl leading-relaxed">
          Hoş geldin. Bugün gelişimi takip et, geleceği şekillendir.
        </p>
      </section>

      {/* Stats Grid - Inspired by the "Dashboard Widgets" look */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Total Students Widget */}
        <div className="glass-card p-6 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-blue-500/50 transition-all cursor-default">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
          <span className="text-sm font-semibold text-blue-200 uppercase tracking-widest">Toplam Öğrenci</span>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-bold text-white shadow-neon">{totalStudents}</span>
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <User className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Active Students Widget */}
        <div className="glass-card p-6 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-yellow-500/50 transition-all cursor-default">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
          <span className="text-sm font-semibold text-yellow-200 uppercase tracking-widest">Aktif Takip</span>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-bold text-white">{activeStudents}</span>
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Attention Needed Widget */}
        <div className="glass-card p-6 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-red-500/50 transition-all cursor-default">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
          <span className="text-sm font-semibold text-red-200 uppercase tracking-widest">Destek Gerekli</span>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-bold text-white">{attentionNeeded}</span>
            <div className="bg-red-500/20 p-2 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        {/* Add New Action Widget */}
        <Link href="/students/new" className="glass-card p-0 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-all cursor-pointer group border-2 border-dashed border-white/20 hover:border-primary/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
              <Plus className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            {/* New Dashboard Layout with MenuGrid and Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Left: Menu Grid */}
              <div className="order-2 md:order-1">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 opacity-80">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Hızlı İşlemler
                </h2>
                <MenuGrid />
              </div>

              {/* Right: Quick Stats */}
              <div className="order-1 md:order-2 space-y-4">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 opacity-80">
                  <span className="w-1 h-6 bg-status-yellow rounded-full"></span>
                  Durum Özeti
                </h2>

                <div className="glass-card p-6 flex items-center justify-between group hover:bg-white/5 transition-colors">
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">Toplam Öğrenci</p>
                    <p className="text-4xl font-bold text-white mt-1">{totalStudents}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6 text-blue-400" />
                  </div>
                </div>

                <div className="glass-card p-6 flex items-center justify-between group hover:bg-white/5 transition-colors">
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">Aktif Takip</p>
                    <p className="text-4xl font-bold text-white mt-1">{activeStudents}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-status-yellow/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-status-yellow" />
                  </div>
                </div>

                <div className="glass-card p-6 flex items-center justify-between group hover:bg-white/5 transition-colors">
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">Destek Gerekli</p>
                    <p className="text-4xl font-bold text-white mt-1">{attentionNeeded}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-status-red/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertCircle className="w-6 h-6 text-status-red" />
                  </div>
                </div>
              </div>
            </div>

            {/* Student List Section */}
            <section>
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Users className="w-8 h-8 text-primary" />
                  Öğrencilerim
                </h2>
                <span className="text-sm text-gray-400 font-mono bg-white/5 px-3 py-1 rounded-full border border-white/10">
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
                <div className="glass-card text-center py-20 px-4 border border-white/10 bg-black/20">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-white/10">
                    <Plus className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Listeniz Boş</h3>
                  <p className="text-gray-400 max-w-sm mx-auto mb-8 font-light">
                    Takip sistemine başlamak için ilk öğrenci kaydını oluşturun.
                  </p>
                  <Link href="/students/new" className="btn btn-primary px-10 py-4 text-lg shadow-2xl hover:shadow-primary/50">
                    Yeni Kayıt Oluştur
                  </Link>
                </div>
              )}
            </section>
          </main>
          );
}
