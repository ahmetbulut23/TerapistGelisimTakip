import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

// Register fonts if needed, but standard fonts work for MVP
// Font.register({ family: 'Roboto', src: '...' });

const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: 'Helvetica' },
    header: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
    section: { margin: 10, padding: 10, flexGrow: 1 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    label: { fontSize: 12, color: '#666' },
    value: { fontSize: 12, fontWeight: 'bold' },
    scoreBox: {
        marginVertical: 20,
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    score: { fontSize: 36, fontWeight: 'bold', color: 'black' },
    scoreTotal: { fontSize: 12, color: 'rgba(0,0,0,0.6)', marginTop: 5 },
    result: { fontSize: 18, marginTop: 10, textTransform: 'uppercase', color: 'black', fontWeight: 'bold' }
});

type SessionPDFProps = {
    studentName: string
    date: Date
    score: number
    result: string
    answers: any
}

const colors = {
    Green: '#10b981', // emerald-500
    Yellow: '#fbbf24', // amber-400
    Red: '#ef4444',    // red-500
}

export const SessionPDF = ({ studentName, date, score, result, answers }: SessionPDFProps) => {
    const bgColor = colors[result as keyof typeof colors] || colors.Red

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text>Terapist Gelişim Raporu</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Öğrenci:</Text>
                        <Text style={styles.value}>{studentName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Tarih:</Text>
                        <Text style={styles.value}>{date.toLocaleDateString('tr-TR')}</Text>
                    </View>
                </View>

                <View style={[styles.scoreBox, { backgroundColor: bgColor }]}>
                    <Text style={styles.score}>{score}</Text>
                    <Text style={styles.scoreTotal}>/ 30</Text>
                </View>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={[styles.result, { color: bgColor }]}>{result}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10, borderBottom: '1px solid #eee', paddingBottom: 5 }}>Detaylar</Text>
                    {/* We can map answers here if needed */}
                    <Text style={{ fontSize: 10, color: '#999' }}>Bu rapor otomatik olarak oluşturulmuştur.</Text>
                </View>
            </Page>
        </Document>
    )
}
