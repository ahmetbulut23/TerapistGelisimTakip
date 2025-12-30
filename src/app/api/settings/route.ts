import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const therapist = await prisma.therapist.findUnique({
            where: { email: session.user.email }
        })

        if (!therapist) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json({
            full_name: therapist.full_name,
            email: therapist.email,
            preferences: therapist.preferences
        })
    } catch (error) {
        console.error('Failed to fetch settings:', error)
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { full_name, email, preferences } = body

        // Note: Changing email might require re-verification in a production app
        // For now we allow it but it might invalidate the session if not handled.
        // To be safe, we will NOT update email here for now, or user must re-login.
        // Let's allow updating full_name and preferences.

        const updatedTherapist = await prisma.therapist.update({
            where: { email: session.user.email },
            data: {
                full_name,
                // email, // Keeping email update disabled to prevent locking out without re-auth logic
                preferences
            }
        })

        return NextResponse.json({
            full_name: updatedTherapist.full_name,
            email: updatedTherapist.email,
            preferences: updatedTherapist.preferences
        })
    } catch (error) {
        console.error('Failed to update settings:', error)
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
    }
}
