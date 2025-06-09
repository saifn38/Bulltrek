
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface AssetAllocationChartProps {
  data: {
    name: string
    value: number
    color: string
  }[]
}

export function AssetAllocationChart({ data }: AssetAllocationChartProps) {
  return (
    <div className="relative aspect-square w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#F97316"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? "#F97316" : "#E2E8F0"}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold">USTD</div>
          <div className="text-sm">53.46%</div>
        </div>
      </div>
    </div>
  )
}

