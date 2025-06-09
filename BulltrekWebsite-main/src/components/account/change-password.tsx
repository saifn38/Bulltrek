import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function ChangePassword() {
  return (
    <Card className="w-[400px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <p className="text-sm pr-8">
            Please enter your password below and your new password to update it.
          </p>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4 mb-4">
          <Input type="password" placeholder="Enter Old Password" />
          <Input type="password" placeholder="Enter New Password" />
          <Input type="password" placeholder="Re-Enter New Password" />
        </div>
        <Button className="w-full bg-[#5D1D21] hover:bg-[#4D1921]">
          Submit
        </Button>
      </CardContent>
    </Card>
  )
}

