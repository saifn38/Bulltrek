import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function PromotionalBanners() {
  return (
    <div className="space-y-4">
      <div className="bg-[#F5A623] p-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div>
            <span className="font-medium">Offer Ends In</span>
            <div className="flex gap-2 mt-1">
              <span className="bg-[#5D1D21] text-white px-2 py-1 rounded">2 Days</span>
              <span className="bg-[#5D1D21] text-white px-2 py-1 rounded">5 Hrs</span>
              <span className="bg-[#5D1D21] text-white px-2 py-1 rounded">30 Mins</span>
              <span className="bg-[#5D1D21] text-white px-2 py-1 rounded">38 Sec</span>
            </div>
          </div>
          <span className="font-medium">Save big and get Unlimited access for Strategies @999</span>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-[#5D1D21] hover:bg-[#4D1921] text-white">
            Enroll Now!
          </Button>
          <Button variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-[#5D1D21] p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">🎉</span>
          <span>Get 10% off on your 1st trade</span>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-[#F5A623] hover:bg-[#E59613] text-black">
            Enroll Now!
          </Button>
          <Button variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

