'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface PositionDurationProps {
  averageHoldingTime: string
  longestHoldingTime: string
  distributions: {
    range: string
    profitCount: number
    lossCount: number
  }[]
}

export function PositionDuration({ 
  averageHoldingTime, 
  longestHoldingTime, 
  distributions 
}: PositionDurationProps) {
  return (
    <div className="space-y-6 rounded-lg border p-6">
      <h3 className="text-xl font-semibold">Position Duration</h3>
      
      <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted p-4">
        <div>
          <div className="text-lg font-semibold">{averageHoldingTime}</div>
          <div className="text-sm text-muted-foreground">Average Holding time</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{longestHoldingTime}</div>
          <div className="text-sm text-muted-foreground">Longest Holding time</div>
        </div>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={distributions}
            layout="vertical"
            margin={{ top: 0, right: 30, left: 150, bottom: 0 }}
            barGap={0}
          >
            <CartesianGrid 
              horizontal={false} 
              stroke="#E2E8F0" 
              strokeDasharray="3 3"
            />
            <XAxis
              type="number"
              domain={[-50, 50]}
              ticks={[-47.89, -35.92, -23.95, -11.97, 0, 11.97, 23.95, 35.92, 47.89]}
              tickFormatter={(value) => `${Math.abs(value).toFixed(2)}K`}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="range"
              axisLine={false}
              tickLine={false}
              width={140}
              tick={{ fontSize: 12 }}
            />
            <Bar
              dataKey="lossCount"
              fill="#EF4444"
              stackId="stack"
              barSize={20}
            />
            <Bar
              dataKey="profitCount"
              fill="#16A34A"
              stackId="stack"
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

