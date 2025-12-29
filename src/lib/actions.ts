'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function authenticate(formData: FormData) {
    // Stub authentication
    redirect('/')
}

export async function createStudent(formData: FormData) {
    const nameSurname = formData.get('nameSurname') as string
    const birthDateRaw = formData.get('birthDate') as string
    const notes = formData.get('notes') as string

    let therapist = await prisma.therapist.findFirst()
    if (!therapist) {
        therapist = await prisma.therapist.create({
            data: {
                email: 'demo@terapist.com',
                password_hash: 'demo',
                full_name: 'Demo Terapist'
            }
        })
    }

    await prisma.student.create({
        data: {
            nameSurname,
            birthDate: birthDateRaw ? new Date(birthDateRaw) : null,
            notes,
            therapistId: therapist.id
        }
    })

    revalidatePath('/')
    redirect('/')
}

export async function saveSession(studentId: string, rawData: { [key: string]: string }) {
    // Calculate Score
    let score = 0

    // Logic: Yes = 2 points, No = 0
    Object.values(rawData).forEach(answer => {
        if (answer === 'yes') score += 2
    })

    // Determine Clinical Result
    let result = 'Red'
    if (score >= 21) result = 'Green'
    else if (score >= 11) result = 'Yellow'

    // Save to DB
    const session = await prisma.session.create({
        data: {
            studentId,
            rawAnswers: rawData,
            calculatedScore: score,
            clinicalResult: result,
            date: new Date()
        }
    })

    revalidatePath(`/students/${studentId}`)

    // We cannot use redirect in a try/catch block commonly, but here it's fine as the last action
    // However, Server Actions inside Client Components (SessionForm) should handle the redirect result or we return the ID.
    // Actually, redirect works in Server Actions.
    // But since we are calling this from a Client Component via a wrapper or prop, let's just redirect.
    redirect(`/sessions/${session.id}`)
}
