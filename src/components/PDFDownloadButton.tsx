'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { SessionPDF } from './SessionPDF'
import { Download, Loader2 } from 'lucide-react'

type PDFDownloadButtonProps = {
    studentName: string
    date: Date
    score: number
    result: string
    answers: any
}

export function PDFDownloadButton(props: PDFDownloadButtonProps) {
    return (
        <PDFDownloadLink
            document={<SessionPDF {...props} />}
            fileName={`rapor-${props.studentName}-${props.date.toISOString().split('T')[0]}.pdf`}
            className="w-full"
        >
            {({ blob, url, loading, error }) => (
                <button
                    disabled={loading}
                    className="btn btn-primary w-full py-4 text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Rapor Hazırlanıyor...
                        </>
                    ) : (
                        <>
                            <Download className="w-5 h-5" />
                            Raporu İndir (PDF)
                        </>
                    )}
                </button>
            )}
        </PDFDownloadLink>
    )
}
