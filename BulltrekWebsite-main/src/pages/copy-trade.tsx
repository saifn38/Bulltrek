"use client"

import { BadgeCustom } from "@/components/ui/badge-custom"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from 'lucide-react'
import { TradingCard } from "@/components/copy-trade-trading-card"
import { ScrollButtons } from "@/components/scroll-buttons"

// Generate dummy chart data
const generateChartData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    value: 50 + Math.random() * 20 + i
  }))
}

// Generate dummy trading cards data
const tradingCards = Array.from({ length: 8 }, () => ({
  id: "ABCD",
  subtitle: "Lorem ipsum",
  percentage: 31645.58,
  totalPnl: 2345.89,
  aumValues: [2345.89, 2345.89, 2345.89],
  chartData: generateChartData()
}))

const sections = [
  { id: "high-roi", label: "High ROI" },
  { id: "high-yields", label: "High Yields" },
  { id: "followers", label: "Followers" },
  { id: "broker-exchange", label: "Broker / Exchange" },
  { id: "reputation", label: "Reputation" }
]

export default function CopyTradePage() {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 border-2  px-[16px] py-[10px] rounded-md border-[#581C3D]">
            <span className="text-sm font-medium">Copy Trading Assets:</span>
            <BadgeCustom>2</BadgeCustom>
          </button>
          <button className="flex items-center gap-2 border-2 px-[16px] py-[10px] rounded-md border-[#581C3D]">
            <span className="text-sm font-medium">Profit:</span>
            <BadgeCustom>2</BadgeCustom>
          </button>
          <button className="flex items-center gap-2 border-2 px-[16px] py-[10px] rounded-md border-[#581C3D]">
            <span className="text-sm font-medium">Net Profit:</span>
            <BadgeCustom>2</BadgeCustom>
          </button>
          <button className="flex items-center gap-2 border-2 px-[16px] py-[10px] rounded-md border-[#581C3D]">
            <span className="text-sm font-medium">Unrealized PnL:</span>
            <BadgeCustom>2</BadgeCustom>
          </button>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search Seller/Strategy Name"
            className="pl-8 border-gray-200"
          />
        </div>
      </div>

      <Tabs defaultValue="high-yields" className="space-y-6">
        <div className="border-b border-gray-200">
          <TabsList className="bg-transparent w-full justify-start rounded-none p-0 h-auto">
            {sections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="px-4 py-2 rounded-t-md data-[state=active]:bg-[#581C3D] data-[state=active]:text-white"
              >
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {["high-roi", "high-yields", "most-copied"].map((section, _) => (
          <TabsContent key={section} value={section} className="space-y-4">
            <div className="text-sm text-gray-500">
              Lorem ipsum dolor
            </div>
            <div className="relative">
              <div 
                id={`scroll-container-${section}`}
                className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide relative"
              >
                {tradingCards.map((card, i) => (
                  <TradingCard key={i} {...card} />
                ))}
              </div>
              <ScrollButtons scrollContainerId={`scroll-container-${section}`} />
            </div>
            <div className="relative">
              <div 
                id={`scroll-container-${section}`}
                className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide relative"
              >
                {tradingCards.map((card, i) => (
                  <TradingCard key={i} {...card} />
                ))}
              </div>
              <ScrollButtons scrollContainerId={`scroll-container-${section}`} />
            </div>
            <div className="relative">
              <div 
                id={`scroll-container-${section}`}
                className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide relative"
              >
                {tradingCards.map((card, i) => (
                  <TradingCard key={i} {...card} />
                ))}
              </div>
              <ScrollButtons scrollContainerId={`scroll-container-${section}`} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

