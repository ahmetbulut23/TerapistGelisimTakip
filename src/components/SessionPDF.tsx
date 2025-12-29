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
        margin: 20,
        padding: 20,
        border: '2px solid #ccc',
        alignItems: 'center',
        borderRadius: 10
    },
    score: { fontSize: 40, fontWeight: 'bold' },
    result: { fontSize: 18, marginTop: 10, textTransform: 'uppercase' }
});

type SessionPDFProps = {
    studentName: string
    date: Date
    score: number
    result: string
    answers: any
}

export const SessionPDF = ({ studentName, date, score, result, answers }: SessionPDFProps) => (
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

            <View style={[styles.scoreBox, { borderColor: result === 'Green' ? 'green' : result === 'Yellow' ? 'orange' : 'red' }]}>
                <Text style={[styles.score, { color: result === 'Green' ? 'green' : result === 'Yellow' ? 'orange' : 'red' }]}>{score} / 30</Text>
                <Text style={styles.result}>{result}</Text>
            </View>

            <View style={styles.section}>
                <Text style={{ fontSize: 14, marginBottom: 10, borderBottom: '1px solid #eee', paddingBottom: 5 }}>Detaylar</Text>
                {/* We can map answers here if needed */}
                <Text style={{ fontSize: 10, color: '#999' }}>Bu rapor otomatik olarak oluşturulmuştur.</Text>
            </View>
        </Page>
    </Document>
)
