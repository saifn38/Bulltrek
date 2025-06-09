import { Slider } from "@/components/ui/slider"

interface SpotSliderProps {
  value: number
  onChange: (value: number) => void
  available: string
}

export function SpotSlider({ value, onChange, available }: SpotSliderProps) {
  return (
    <div className="space-y-4">
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={100}
        step={1}
        className="py-2"
      />
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">From</span>
          <select className="rounded border-none bg-transparent font-medium outline-none">
            <option>Spot</option>
          </select>
          <span className="text-muted-foreground">Available: {available}</span>
        </div>
        <button className="text-[#4A1D2F]">Transfer | Buy</button>
      </div>
    </div>
  )
}

