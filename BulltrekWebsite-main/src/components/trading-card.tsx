import { Card } from "@/components/ui/card"
import { BadgeCustom } from "@/components/ui/badge-custom"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { Users } from 'lucide-react'

interface TradingCardProps {
  pair: string
  apy: number
  investment: number
  duration: string
  followers: number
  chartData: { value: number }[]
  type: "Forward" | "Spot grid"
  aiStatus: string
}

export function TradingCard({
  pair,
  apy,
  investment,
  duration,
  followers,
  chartData,
  type,
  aiStatus,
}: TradingCardProps) {
  return (
    <Card className="w-[280px] flex-shrink-0 border border-gray-200 rounded-xl bg-white">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex flex-col gap-2 mb-2">
              <h3 className="font-semibold text-sm">{pair}</h3>
              <BadgeCustom variant="green">
                {type}
              </BadgeCustom>
            </div>
            <div className="text-2xl font-bold text-green-500 mb-1">
              {apy.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-500 mb-2">
              30-day APY
            </div>
            <div className="font-medium text-sm">
              {investment.toFixed(2)} USDT
            </div>
            <div className="text-xs text-gray-500">
              Min Investment
            </div>
          </div>
          <div className="flex items-end flex-col">
            <div className="text-xs text-gray-500 mb-1">
              {aiStatus}
            </div>
            <div className="w-24 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    fill="#22c55e20"
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs font-medium mt-1">
              {duration}
            </div>
            <div className="text-xs text-gray-500">
              Recommended Duration
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-4 pb-4 w-full justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Users className="h-3 w-3" />
          <span>{followers}</span>
        </div>
        <Button 
          className="w-fit bg-[#581C3D] hover:bg-[#581C3D]/90 text-white h-8 rounded-md"
        >
          Use
        </Button>
      </div>
    </Card>
  )
}

