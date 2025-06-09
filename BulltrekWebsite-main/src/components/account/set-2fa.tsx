import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function Set2FA() {
  return (
    <Card className="w-[400px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm mb-4">
              To set up two factor authentication you need to scan this QR code with your Google authentication app complete the verification code below.
            </p>
            <div className="bg-white p-4 w-32 h-32 mx-auto mb-4">
              <img src="/placeholder.svg?height=120&width=120" alt="QR Code" className="w-full h-full" />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 justify-center mb-4">
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

