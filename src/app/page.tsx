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
    <main className="container py-8 animate-fade-in">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Öğrencilerim</h1>
          <p className="text-muted-foreground">Gelişim takibi ve raporlama.</p>
        </div>
        <Link href="/students/new" className="btn btn-primary gap-2">
          <Plus className="w-4 h-4" />
          <span>Yeni Öğrenci</span>
        </Link>
      </header>

      {students.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {students.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-xl">
          <p className="text-muted-foreground mb-4">Henüz kayıtlı öğrenci bulunmuyor.</p>
          <Link href="/students/new" className="text-primary font-medium hover:underline">
            İlk öğrencinizi ekleyin.
          </Link>
        </div>
      )}
    </main>
  );
}
