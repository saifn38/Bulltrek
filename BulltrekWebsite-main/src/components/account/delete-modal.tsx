import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface DeleteModalProps {
  requirePassword?: boolean
}

export function DeleteModal({ requirePassword = true }: DeleteModalProps) {
  return (
    <Card className="w-[400px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="pr-8">
            {requirePassword ? (
              <p>Please enter your account password to delete the selected scanner.</p>
            ) : (
              <p>The selected scanner will be deleted, please confirm to proceed.</p>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        {requirePassword && (
          <Input 
            type="password" 
            placeholder="Enter Account Password"
            className="mb-4"
          />
        )}
        <Button className="w-full bg-[#5D1D21] hover:bg-[#4D1921]">
          Confirm
        </Button>
      </CardContent>
    </Card>
  )
}

