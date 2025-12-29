import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
    try {
        // Demo: Get the first therapist or create a default one
        let therapist = await prisma.therapist.findFirst()

        if (!therapist) {
            therapist = await prisma.therapist.create({
                data: {
                    email: 'demo@terapist.com',
                    password_hash: 'hashed_password', // In real app, hash this
                    full_name: 'Demo Terapist',
                    preferences: {
                        theme: 'light',
                        emailNotifications: true,
                        sessionReminders: true,
                        language: 'Türkçe'
                    }
                }
            })
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
        const body = await request.json()
        const { full_name, email, preferences } = body

        // Demo: Update the first therapist
        const therapist = await prisma.therapist.findFirst()

        if (!therapist) {
            return NextResponse.json({ error: 'Therapist not found' }, { status: 404 })
        }

        const updatedTherapist = await prisma.therapist.update({
            where: { id: therapist.id },
            data: {
                full_name,
                email,
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
