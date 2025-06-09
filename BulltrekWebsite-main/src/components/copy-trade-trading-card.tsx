import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

interface TradingCardProps {
  id: string
  subtitle: string
  percentage: number
  totalPnl: number
  aumValues: number[]
  chartData: { value: number }[]
}

export function TradingCard({
  id,
  subtitle,
  percentage,
  totalPnl,
  aumValues,
  chartData,
}: TradingCardProps) {
  return (
    <Card className="w-[280px] flex-shrink-0 border-2 border-[#581C3D] rounded-xl p-4 bg-white">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarFallback className="bg-gray-100 text-gray-600">
              {id}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-sm text-gray-500">{subtitle}</div>
            <div className="text-xl font-bold text-green-500 mt-1">
              +{percentage.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>ROI</span>
          <span>30D</span>
        </div>
        
        <div className="h-20 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                fill="url(#colorValue)"
                strokeWidth={1.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total PnL</span>
            <span>₹{totalPnl.toFixed(2)}</span>
          </div>
          {aumValues.map((value, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600">AUM</span>
              <span>₹{value.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-3 space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="flex -space-x-1">
                <div className="w-2 h-2 rounded-full bg-pink-200"></div>
                <div className="w-2 h-2 rounded-full bg-pink-300"></div>
                <div className="w-2 h-2 rounded-full bg-pink-400"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
                <span>4</span>
              </div>
              <div className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                <span>22%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="px-12 py-2 bg-[#581C3D] text-white rounded-md hover:bg-[#581C3D]/90 transition-colors w-full">
              Copy
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}

