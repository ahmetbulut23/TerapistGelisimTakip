'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

type SessionData = {
    date: string
    score: number
}

// Custom Tooltip for premium feel
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
                <p className="font-semibold text-sm mb-1">{label}</p>
                <p className="text-primary text-sm font-bold">
                    Skor: {payload[0].value} / 30
                </p>
            </div>
        )
    }
    return null
}

export function StudentProgressChart({ data }: { data: SessionData[] }) {
    if (data.length === 0) {
        return (
            <div className="h-[300px] w-full flex items-center justify-center border rounded-lg bg-gray-50/50">
                <p className="text-muted-foreground text-sm">Grafik için veri yok.</p>
            </div>
        )
    }

    // Use CSS variable HSL values for colors
    const primaryColor = "hsl(220, 90%, 56%)" // Match --primary

    return (
        <div className="h-[300px] w-full animate-fade-in">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: -20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(214, 32%, 91%)" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                    />
                    <YAxis
                        domain={[0, 30]}
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }} />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke={primaryColor}
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: primaryColor }}
                        activeDot={{ r: 6, strokeWidth: 0, fill: primaryColor }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
