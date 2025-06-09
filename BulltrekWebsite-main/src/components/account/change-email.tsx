import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface EmailChangeModalProps {
  withCode?: boolean
}

export function EmailChangeModal({ withCode = false }: EmailChangeModalProps) {
  return (
    <Card className="w-[400px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="pr-8">
            <p className="text-sm">
              {withCode 
                ? "To OTP has been sent to verify the email address. Please enter the OTP below to verify your email address."
                : "Please enter your new email address below and your account password to update it."}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        {withCode ? (
          <div className="flex gap-2 justify-center mb-4">
            {[1, 2, 3, 4].map((i) => (
              <Input key={i} className="w-12 h-12 text-center text-lg" maxLength={1} />
            ))}
          </div>
        ) : (
          <div className="space-y-4 mb-4">
            <Input placeholder="Enter Email" />
            <Input type="password" placeholder="Enter Account Password" />
          </div>
        )}
        <Button className="w-full bg-[#5D1D21] hover:bg-[#4D1921]">
          Submit
        </Button>
      </CardContent>
    </Card>
  )
}

