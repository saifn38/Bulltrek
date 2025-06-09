import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function TwoFactorModal() {
  return (
    <Card className="w-[400px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="pr-8">
            <p>Please enter the 2 factor authentication code below to verify it is you</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 justify-center mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Input key={i} className="w-12 h-12 text-center text-lg" maxLength={1} />
          ))}
        </div>
        <Button className="w-full bg-[#5D1D21] hover:bg-[#4D1921]">
          Submit
        </Button>
      </CardContent>
    </Card>
  )
}

