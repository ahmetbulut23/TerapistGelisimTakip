import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
    try {
        const documents = await prisma.document.findMany({
            select: {
                id: true,
                name: true,
                type: true,
                category: true,
                size: true,
                createdAt: true,
                // Don't fetch data here to keep it light
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(documents)
    } catch (error) {
        console.error('Failed to fetch documents:', error)
        return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, type, category, size, data } = body

        if (!name || !data) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const document = await prisma.document.create({
            data: {
                name,
                type,
                category,
                size,
                data, // Base64 content
            }
        })

        return NextResponse.json(document)
    } catch (error) {
        console.error('Failed to upload document:', error)
        return NextResponse.json({ error: 'Failed to upload document' }, { status: 500 })
    }
}
