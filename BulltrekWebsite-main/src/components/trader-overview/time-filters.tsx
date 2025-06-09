'use client'

import { Button } from "@/components/ui/button"

const periods = [
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
  { label: "180D", value: "180d" },
]

export function TimeFilters() {
  return (
    <div className="flex gap-2 p-4">
      {periods.map((period) => (
        <Button
          key={period.value}
          variant="outline"
          size="sm"
          className="h-7 rounded-full"
        >
          {period.label}
        </Button>
      ))}
    </div>
  )
}

