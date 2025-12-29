import Link from 'next/link'
import { clsx } from 'clsx'
import { Calendar, ChevronRight } from 'lucide-react'

// Mock type until we have the full Prisma type inferred or shared
type StudentSummary = {
    id: string
    nameSurname: string
    lastSessionDate?: Date | null
    lastScore?: number | null
    lastResult?: string | null // 'Red' | 'Yellow' | 'Green'
}

export function StudentCard({ student }: { student: StudentSummary }) {
    const scoreColor = {
        'Red': 'text-status-red bg-status-red/10',
        'Yellow': 'text-status-yellow bg-status-yellow/10',
        'Green': 'text-status-green bg-status-green/10',
    }[student.lastResult || ''] || 'text-muted-foreground bg-gray-100'

    return (
        <Link href={`/students/${student.id}`} className="block group">
            <div className="card p-4 flex items-center justify-between transition-all group-hover:border-primary/50 group-hover:shadow-md">
                <div>
                    <h3 className="font-semibold text-lg">{student.nameSurname}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                            {student.lastSessionDate
                                ? new Date(student.lastSessionDate).toLocaleDateString('tr-TR')
                                : 'Henüz seans yok'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {student.lastScore !== null && student.lastScore !== undefined && (
                        <div className={clsx("px-3 py-1 rounded-full text-sm font-bold", scoreColor)}>
                            {student.lastScore}/30
                        </div>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                </div>
            </div>
        </Link>
    )
}
