import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await prisma.document.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Failed to delete document:', error)
        return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 })
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const document = await prisma.document.findUnique({
            where: { id }
        })

        if (!document) {
            return NextResponse.json({ error: 'Document not found' }, { status: 404 })
        }

        // Return full document data (including base64) for download
        return NextResponse.json(document)
    } catch (error) {
        console.error('Failed to fetch document:', error)
        return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 })
    }
}
