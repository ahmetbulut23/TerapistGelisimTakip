'use server'

import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Hatalı email veya şifre.'
                default:
                    return 'Bir hata oluştu.'
            }
        }
        throw error
    }
}

export async function register(prevState: string | undefined, formData: FormData) {
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!fullName || !email || !password) {
        return 'Tüm alanları doldurun.'
    }

    try {
        const existingUser = await prisma.therapist.findUnique({
            where: { email }
        })

        if (existingUser) {
            return 'Bu email adresi zaten kayıtlı.'
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.therapist.create({
            data: {
                full_name: fullName,
                email: email,
                password_hash: hashedPassword
            }
        })
    } catch (error) {
        return 'Kayıt sırasında bir hata oluştu.'
    }

    redirect('/login')
}

export async function logout() {
    await signOut({ redirectTo: '/login' })
}

export async function createStudent(formData: FormData) {
    const nameSurname = formData.get('nameSurname') as string
    const birthDateRaw = formData.get('birthDate') as string
    const notes = formData.get('notes') as string

    // In a real app we'd get the logged in user's ID
    const therapist = await prisma.therapist.findFirst()

    if (!therapist) {
        throw new Error("Önce bir terapist hesabı oluşturmalısınız.")
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
    redirect(`/sessions/${session.id}`)
}
