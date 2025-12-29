import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
    try {
        const studentsData = await prisma.student.findMany({
            include: {
                sessions: {
                    orderBy: { date: 'desc' }
                }
            },
            orderBy: { nameSurname: 'asc' }
        })

        const students = studentsData.map(s => {
            const sessions = s.sessions.map((sess: any) => ({
                date: sess.date,
                score: sess.calculatedScore,
                result: sess.clinicalResult
            })).filter((sess: any) => sess.score !== null)

            const scores = sessions.map((sess: any) => sess.score)
            const avgStudentScore = scores.length > 0 ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length : 0

            let trend = 'stable'
            if (sessions.length >= 2) {
                const recentScore = scores[0]
                const previousScore = scores[1]
                if (recentScore > previousScore) trend = 'up'
                else if (recentScore < previousScore) trend = 'down'
            }

            return {
                id: s.id,
                name: s.nameSurname,
                sessionCount: sessions.length,
                avgScore: avgStudentScore,
                lastScore: scores[0] || null,
                lastResult: sessions[0]?.result || null,
                trend,
                sessions
            }
        })

        const totalSessions = students.reduce((sum, s) => sum + s.sessionCount, 0)
        const totalScores = students.filter(s => s.avgScore > 0).map(s => s.avgScore)
        const avgScore = totalScores.length > 0 ? totalScores.reduce((a, b) => a + b, 0) / totalScores.length : 0

        return NextResponse.json({
            students,
            totalSessions,
            avgScore
        })
    } catch (error) {
        console.error('Failed to fetch reports:', error)
        return NextResponse.json({ students: [], totalSessions: 0, avgScore: 0 })
    }
}
