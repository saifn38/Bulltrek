import { Progress } from "@/components/ui/progress"
import type { PerformanceMetrics } from "@/types/dashboard"

interface PerformanceMetricsProps {
  metrics: PerformanceMetrics
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">Performance</h3>
        <div className="text-2xl font-bold text-red-500">{metrics.roi}%</div>
        <div className="text-xl">₹{metrics.totalProfit}</div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>ROI</span>
          <span>{metrics.roi}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Maximum drawdown</span>
          <span>{metrics.maxDrawdown}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Total Followers</span>
          <span>{metrics.totalFollowers}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Follower's PnL</span>
          <span>₹{metrics.followersInPnl}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Trading Frequency</span>
          <span>{metrics.tradingFrequency}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Win Rate</span>
          <span>{metrics.winRate}%</span>
        </div>
        <div className="space-y-2">
          <Progress value={50} className="h-2" />
          <div className="flex justify-between text-sm">
            <span>Profitable trades: {metrics.profitableTrades}</span>
            <span>Losing trades: {metrics.losingTrades}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

