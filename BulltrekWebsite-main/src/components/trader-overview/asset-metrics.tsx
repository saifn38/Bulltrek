import type { AssetMetrics } from "@/types/dashboard"

interface AssetMetricsProps {
  metrics: AssetMetrics
}

export function AssetMetrics({ metrics }: AssetMetricsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-semibold">300/500</h3>
        <div className="text-sm text-muted-foreground">Maximum following</div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>AUM</span>
          <span>₹{metrics.aum}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Total assets</span>
          <span>₹{metrics.totalAssets}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Last trade</span>
          <span>{metrics.lastTrade}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Profit share ratio</span>
          <span>{metrics.profitShareRatio}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Watches</span>
          <span>{metrics.watches}</span>
        </div>
      </div>
    </div>
  )
}

