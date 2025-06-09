import * as React from "react"
import { Button } from "@/components/ui/button"
import { AmountInput } from "@/components/ui/amount-input"
import { CustomSlider } from "@/components/ui/custom-slider"

import { ToggleButton } from "@/components/ui/toggle-button"
import { SpotSelector } from "../ui/spot-selector"

export function CopyTradeSettings() {
  const [amount, setAmount] = React.useState(50)
  const [mode, setMode] = React.useState<"fixed" | "multiplier">("fixed")

  return (
    <div className="space-y-6 rounded-lg border bg-white p-6">
      <h3 className="text-lg font-semibold">Copy Trade Settings</h3>

      <div className="flex gap-2">
        <ToggleButton
          active={mode === "fixed"}
          onClick={() => setMode("fixed")}
        >
          Fixed Amount
        </ToggleButton>
        <ToggleButton
          active={mode === "multiplier"}
          onClick={() => setMode("multiplier")}
        >
          Multiplier
        </ToggleButton>
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
        Next
      </Button>
    </div>
  )
}

