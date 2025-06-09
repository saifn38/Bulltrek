"use client"

import { AddFundsSection } from "@/components/diverse-flow/add-funds-sction"
import { AssetAllocationChart } from "@/components/diverse-flow/asset-allocation-chart"
import { CopyTradeSettings } from "@/components/diverse-flow/copy-trade-settings"


const assetAllocationData = [
  { name: "USTD", value: 53.46, color: "#F97316" },
  { name: "Active 1", value: 10.2, color: "#E2E8F0" },
  { name: "Active 2", value: 10.2, color: "#E2E8F0" },
  { name: "Active 3", value: 10.2, color: "#E2E8F0" },
  { name: "Active 4", value: 10.2, color: "#E2E8F0" },
]

export default function DiverseFollowPage() {
  return (
    <div className="mx-auto max-w-7xl w-full  p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Diverse Follow</h1>
          <AddFundsSection />
          <CopyTradeSettings />
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg"
                alt="Profile"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h2 className="font-semibold">Lorem Name</h2>
                <p className="text-sm text-muted-foreground">@subname</p>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum this is status line
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Asset Allocation</h3>
              <AssetAllocationChart data={assetAllocationData} />
              <div className="mt-4 grid grid-cols-2 gap-2">
                {assetAllocationData.slice(1).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#F97316]" />
                    <span className="text-sm">Active</span>
                    <span className="text-sm text-muted-foreground">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">ROI</span>
                <span className="text-sm font-medium text-red-500">-90.87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Maximum drawdown</span>
                <span className="text-sm font-medium">34.67%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Followers</span>
                <span className="text-sm font-medium">200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Follower's PnL</span>
                <span className="text-sm font-medium">₹2345.89</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

