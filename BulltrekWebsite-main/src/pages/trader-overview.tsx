import { AreaChart } from "@/components/trader-overview/area-chart"
import { AssetAllocation } from "@/components/trader-overview/asset-allocation"
import { AssetMetrics } from "@/components/trader-overview/asset-metrics"
import { FollowersTable } from "@/components/trader-overview/followers-table"
import { LatestCopiers } from "@/components/trader-overview/latest-copiers"
import { NavTabs } from "@/components/trader-overview/nav-tabs"
import { OrdersTable } from "@/components/trader-overview/orders-table"
import { PerformanceMetrics } from "@/components/trader-overview/performance-metrics"
import { PositionDuration } from "@/components/trader-overview/position-duration"
import { ProfileHeader } from "@/components/trader-overview/profile-header"
import { TimeFilters } from "@/components/trader-overview/time-filters"
import {
  mockProfile,
  mockChartData,
  mockAssetAllocation,
  mockPerformanceMetrics,
  mockAssetMetrics,
  mockCopiers,
  mockPositionDuration,
  mockOrders,
  mockFollowers
} from "@/lib/mock-data"
import { useState } from "react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background w-full flex flex-col gap-8 pt-16 max-w-7xl">
      <ProfileHeader profile={mockProfile} />
      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === "overview" && (
        <>
          <TimeFilters />
          <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <AreaChart data={mockChartData} title="ROI" />
              <AreaChart data={mockChartData} title="Total Profit" />
              <AssetAllocation data={mockAssetAllocation} />
              <PositionDuration 
                averageHoldingTime={mockPositionDuration.averageHoldingTime}
                longestHoldingTime={mockPositionDuration.longestHoldingTime}
                distributions={mockPositionDuration.distributions}
              />
            </div>
            <div className="space-y-6">
              <PerformanceMetrics metrics={mockPerformanceMetrics} />
              <AssetMetrics metrics={mockAssetMetrics} />
              <LatestCopiers copiers={mockCopiers} />
            </div>
          </div>
        </>
      )}

      {activeTab === "orders" && (
        <div className="p-4">
          <OrdersTable orders={mockOrders} />
        </div>
      )}

      {activeTab === "followers" && (
        <div className="p-4">
          <FollowersTable followers={mockFollowers} />
        </div>
      )}
    </div>
  )
}

