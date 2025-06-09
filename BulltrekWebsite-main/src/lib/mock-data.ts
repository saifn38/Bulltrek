import { ChartData, Copier, PerformanceMetrics, AssetMetrics, UserProfile } from '@/types/dashboard'
import { Order } from '@/types/orders'

export const mockProfile: UserProfile = {
  name: "Lorem Name",
  username: "@username",
  avatar: "/placeholder.svg",
  registeredDate: "500 days ago",
  statusLine: "Lorem ipsum this is status line"
}

export const mockPerformanceMetrics: PerformanceMetrics = {
  roi: -4.55,
  totalProfit: 2345.89,
  maxDrawdown: 34.67,
  totalFollowers: 200,
  followersInPnl: 2345.89,
  tradingFrequency: 8,
  winRate: 12.43,
  profitableTrades: 6,
  losingTrades: 6
}

export const mockAssetMetrics: AssetMetrics = {
  aum: 2345.89,
  totalAssets: 23458.89,
  lastTrade: "2024/10/12 05:47:56",
  profitShareRatio: 0,
  watches: 2900
}

export const mockCopiers: Copier[] = Array.from({ length: 6 }, (_, i) => ({
  id: `copier-${i}`,
  name: "ABCD Name Name",
  username: "@Lorem ipsum",
  avatar: "/placeholder.svg",
  timeAgo: "14h"
}))

export const mockChartData: ChartData[] = [
  { date: "2024-03-06", value: 47.45 },
  { date: "2024-03-07", value: 47.38 },
  { date: "2024-03-08", value: 47.52 },
  { date: "2024-03-09", value: 47.41 },
  { date: "2024-03-10", value: 47.48 },
  { date: "2024-03-11", value: 47.43 },
  { date: "2024-03-12", value: 47.39 },
  { date: "2024-03-13", value: 47.44 },
  { date: "2024-03-14", value: 47.50 },
  { date: "2024-03-15", value: 47.47 }
]

export const mockAssetAllocation = {
  USTD: 53.46,
  Active1: 10.2,
  Active2: 10.2,
  Active3: 10.2,
  Active4: 10.2
}

export const mockPositionDuration = {
  averageHoldingTime: "7 Days 18 Hours",
  longestHoldingTime: "23 Days 18 Hours",
  distributions: [
    {
      range: "<7 Days 18 Hours",
      profitCount: 0,
      lossCount: -35.92
    },
    {
      range: "7 Days 18 Hours - 7 Days 18 Hours",
      profitCount: 0,
      lossCount: -47.89
    },
    {
      range: "7 Days 18 Hours - 7 Days 18 Hours",
      profitCount: 35.92,
      lossCount: 0
    },
    {
      range: "7 Days 18 Hours - 7 Days 18 Hours",
      profitCount: 47.89,
      lossCount: 0
    },
    {
      range: ">7 Days 18 Hours",
      profitCount: 0,
      lossCount: -35.92
    }
  ]
}

export const mockOrders:Order[] = Array.from({ length: 8 }, (_, i) => ({
  id: `order-${i}`,
  position: "BTCUSTD",
  type: "Long",
  leverage: "50X",
  crossType: "Cross USTD",
  openPrice: 36908.8,
  exitPrice: 36908.8,
  avgPositionPrice: 36908.8,
  realizedPnL: 36908.8,
  orderNumber: "12345689",
  timestamp: "2024-02-12 12:44:08"
}))

export const mockFollowers = Array.from({ length: 7 }, (_, i) => ({
  id: `follower-${i}`,
  name: "ABCD Name Name",
  username: "@Lorem ipsum",
  avatar: "/placeholder.svg",
  totalVolume: 36908.8,
  percentageChange: 3.5
}))

