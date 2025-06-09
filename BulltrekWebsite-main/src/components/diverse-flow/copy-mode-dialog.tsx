import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { X } from 'lucide-react'

export function CopyModeDialog({
  open = false,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle>Copy Mode</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="p-6">
          <RadioGroup defaultValue="smart" className="space-y-4">
            <div className="flex items-start space-x-4">
              <RadioGroupItem value="smart" id="smart" className="mt-1" />
              <div className="space-y-1">
                <Label htmlFor="smart" className="font-medium">
                  Smart Copy
                </Label>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit
                </p>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore et dolore magn
                </p>
                <Button variant="link" className="h-auto p-0 text-[#F79009]">
                  Learn More →
                </Button>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <RadioGroupItem value="diverse" id="diverse" className="mt-1" />
              <div className="space-y-1">
                <Label htmlFor="diverse" className="font-medium">
                  Diverse Follow
                </Label>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit
                </p>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore et dolore magn
                </p>
                <Button variant="link" className="h-auto p-0 text-[#F79009]">
                  Learn More →
                </Button>
              </div>
            </div>
          </RadioGroup>
          <Button className="mt-6 w-full bg-[#6D1C43] hover:bg-[#6D1C43]/90">
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

