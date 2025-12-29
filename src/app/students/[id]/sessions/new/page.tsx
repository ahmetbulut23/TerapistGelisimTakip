import { SessionForm } from '@/components/SessionForm'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function NewSessionPage({ params }: { params: { id: string } }) {
    const student = await prisma.student.findUnique({
        where: { id: params.id }
    })

    if (!student) notFound()

    return (
        <main className="container max-w-3xl py-8">
            <Link href={`/students/${student.id}`} className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Öğrenci Profiline Dön
            </Link>

            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">{student.nameSurname} - Seans Değerlendirmesi</h1>
                <p className="text-muted-foreground">Aşağıdaki 15 soruyu seans gözlemlerinize göre yanıtlayınız.</p>
            </div>

            <SessionForm studentId={student.id} />
        </main>
    )
}
