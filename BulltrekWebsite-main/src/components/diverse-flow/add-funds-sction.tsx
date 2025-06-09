"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { AmountInput } from "@/components/ui/amount-input"
import { CustomSlider } from "@/components/ui/custom-slider"
import { SpotSelector } from "@/components/ui/spot-selector"

export function AddFundsSection() {
  const [amount, setAmount] = React.useState(50)

  return (
    <div className="space-y-6 rounded-lg border bg-white p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Add Funds</h3>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci
        </p>
      </div>

      <AmountInput
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Minimum 50 USTD"
      />

      <div className="space-y-2">
        <CustomSlider
          value={[amount]}
          onValueChange={([value]) => setAmount(value)}
          min={0}
          max={100}
          step={1}
        />
        <SpotSelector
          available="22 USTD"
          onTransferClick={() => console.log("Transfer clicked")}
        />
      </div>

      <Button className="bg-[#4A1D2F] text-white hover:bg-[#3A1525]">
        Confirm
      </Button>
    </div>
  )
}

