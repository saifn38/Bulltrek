import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface AssetAllocationProps {
  data: Record<string, number>
}

export function AssetAllocation({ data }: AssetAllocationProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value
  }))

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Asset Allocation</h3>
      <div className="h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {chartData.map((_, index) => (
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
            <div className="text-2xl font-bold">USTD</div>
            <div className="text-lg">{data.USTD}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

