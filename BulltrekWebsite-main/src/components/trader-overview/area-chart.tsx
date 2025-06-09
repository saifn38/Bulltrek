'use client'

import { Area, AreaChart as RechartsAreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { ChartData } from "@/types/dashboard"

interface AreaChartProps {
  data: ChartData[]
  title: string
}

export function AreaChart({ data, title }: AreaChartProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => {
                const date = new Date(value)
                return `${date.getMonth() + 1}-${date.getDate()}`
              }}
              tick={{ fill: '#64748B', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value.toFixed(2)}%`}
              domain={['dataMin - 0.1', 'dataMax + 0.1']}
              tick={{ fill: '#64748B', fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)}%`, title]}
              labelFormatter={(label) => {
                const date = new Date(label)
                return `${date.toLocaleDateString()}`
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#16A34A"
              strokeWidth={2}
              fill="url(#colorValue)"
              fillOpacity={1}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

