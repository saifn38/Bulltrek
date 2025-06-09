'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NavTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  return (
    <div className="border-b">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="rounded-md border-b-2 border-transparent px-4 py-2 font-semibold data-[state=active]:bg-[#4A1D2F] data-[state=active]:text-white "
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="rounded-md border-b-2 border-transparent px-4 py-2 font-semibold data-[state=active]:bg-[#4A1D2F] data-[state=active]:text-white "
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="followers"
            className="rounded-md border-b-2 border-transparent px-4 py-2 font-semibold data-[state=active]:bg-[#4A1D2F] data-[state=active]:text-white "
          >
            Followers
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

