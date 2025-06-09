import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SpotSelectorProps {
  available: string
  onTransferClick: () => void
}

export function SpotSelector({ available, onTransferClick }: SpotSelectorProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">From</span>
      <Select defaultValue="spot">
        <SelectTrigger className="h-auto border-0 p-0 hover:bg-transparent [&>span]:font-medium [&>span]:text-foreground">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="spot">Spot</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-muted-foreground">Available: {available}</span>
      <button
        onClick={onTransferClick}
        className="ml-auto text-[#4A1D2F] hover:underline"
      >
        Transfer | Buy
      </button>
    </div>
  )
}

