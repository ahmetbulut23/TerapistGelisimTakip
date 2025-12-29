import Link from 'next/link'
import { Plus, Activity, AlertCircle, Users, TrendingUp, Calendar, ArrowRight } from 'lucide-react'
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
    <div className="animate-fade-in">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hoş Geldiniz 👋</h1>
        <p className="text-gray-600">Bugünün gelişim takiplerine genel bakış</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Students */}
        <div className="card-gradient-purple p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/80 text-[13px] font-medium">TOPLAM</span>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-1">{totalStudents}</div>
            <div className="text-white/90 text-sm font-medium">Öğrenci</div>
          </div>
        </div>

        {/* Active Tracking */}
        <div className="card-gradient-teal p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/80 text-[13px] font-medium">AKTİF</span>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-1">{activeStudents}</div>
            <div className="text-white/90 text-sm font-medium">Takip Ediliyor</div>
          </div>
        </div>

        {/* Attention Needed */}
        <div className="card-gradient-orange p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/80 text-[13px] font-medium">DİKKAT</span>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-1">{attentionNeeded}</div>
            <div className="text-white/90 text-sm font-medium">Destek Gerekli</div>
          </div>
        </div>

        {/* Quick Action */}
        <Link href="/students/new" className="card group hover:border-violet-200 transition-all">
          <div className="p-6 flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center mb-3 group-hover:bg-violet-500 group-hover:scale-110 transition-all">
              <Plus className="w-7 h-7 text-violet-600 group-hover:text-white transition-colors" />
            </div>
            <div className="text-base font-semibold text-gray-700 mb-1">Yeni Öğrenci Ekle</div>
            <div className="text-sm text-gray-500">Hızlı kayıt oluştur</div>
          </div>
        </Link>
      </div>

      {/* Recent Activity & Students */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Son Aktiviteler</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {students.slice(0, 5).map((student) => (
                <div key={student.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {student.nameSurname.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{student.nameSurname}</p>
                    <p className="text-xs text-gray-500">
                      {student.lastSessionDate
                        ? new Date(student.lastSessionDate).toLocaleDateString('tr-TR')
                        : 'Henüz seans yok'}
                    </p>
                  </div>
                  {student.lastScore !== null && (
                    <div className="text-xs font-bold text-violet-600">{student.lastScore}/30</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Hızlı İşlemler</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/students" className="card p-5 text-center group hover:border-violet-200">
              <div className="w-12 h-12 rounded-xl bg-violet-50 mx-auto mb-3 flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                <Users className="w-6 h-6 text-violet-600" />
              </div>
              <div className="text-sm font-semibold text-gray-700">Öğrenciler</div>
            </Link>

            <Link href="/sessions" className="card p-5 text-center group hover:border-teal-200">
              <div className="w-12 h-12 rounded-xl bg-teal-50 mx-auto mb-3 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                <Calendar className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-sm font-semibold text-gray-700">Seanslar</div>
            </Link>

            <Link href="/reports" className="card p-5 text-center group hover:border-orange-200">
              <div className="w-12 h-12 rounded-xl bg-orange-50 mx-auto mb-3 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-sm font-semibold text-gray-700">Raporlar</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tüm Öğrenciler</h2>
          <Link href="/students" className="text-sm font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1">
            Tümünü Gör
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {students.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-10 h-10 text-gray-400" />
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
    </div>
  )
}
