import { Star, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function FeedbackForm() {
  return (
    <Card className="w-[400px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">Rate your experience</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-6 w-6 text-muted-foreground" />
            ))}
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Ticket Number" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Ticket 1</SelectItem>
              <SelectItem value="2">Ticket 2</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <div className="mb-2">Lorem ipsum illuminator jaj ?</div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-6 w-6 text-muted-foreground" />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2">Lorem ipsum illuminator jaj ?</div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-6 w-6 text-muted-foreground" />
              ))}
            </div>
          </div>
          <Textarea placeholder="Tell us more..." />
          <Button className="w-full bg-[#5D1D21] hover:bg-[#4D1921]">
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

