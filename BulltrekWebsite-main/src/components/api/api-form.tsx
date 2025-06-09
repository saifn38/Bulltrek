import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ApiFormProps {
  withPassphrase?: boolean
}

export function ApiForm({ withPassphrase = false }: ApiFormProps) {
  return (
    <Card className="w-[500px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-medium">Add API</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Platform</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="binance">Binance</SelectItem>
                <SelectItem value="coinbase">Coinbase</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">API Key</label>
              <Input placeholder="Enter API Key" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">API Secret</label>
              <Input placeholder="Enter API Secret" />
            </div>
          </div>
          {withPassphrase && (
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Pass Phrase</label>
              <Input placeholder="Enter Pass Phrase" />
            </div>
          )}
        </div>
        <Button className="w-full bg-[#5D1D21] hover:bg-[#4D1921]">
          Submit
        </Button>
      </CardContent>
    </Card>
  )
}

