import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProceedPopupProps {
  variant?: 'default' | 'extended'
  className?: string
}

export function ProceedPopup({ variant = 'default', className }: ProceedPopupProps) {
  const sections = [
    {
      title: 'Account Details',
      fields: [
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
      ]
    },
    {
      title: 'Bot Details',
      fields: [
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
      ]
    },
    {
      title: 'Advanced Settings',
      fields: [
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
        { label: 'Label Name', value: 'Input Value' },
      ]
    }
  ]

  return (
    <Card className={`w-[800px] ${variant === 'default' ? 'ring-2 ring-blue-500' : ''} ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Account Details</h2>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-medium mb-4">{section.title}</h3>
              <div className="grid grid-cols-3 gap-4">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="space-y-1.5">
                    <Label>{field.label}:</Label>
                    <Input value={field.value} readOnly />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-start space-x-2 mt-6">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              *I Agree Bulltrek's Terms & Conditions, Privacy policy and disclaimers
            </label>
          </div>

          <div className="flex gap-4 mt-6">
            {variant === 'extended' && (
              <Button className="flex-1 bg-green-500 hover:bg-green-600">
                Go Live
              </Button>
            )}
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
              Edit
            </Button>
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
              Backtest
            </Button>
            {variant === 'extended' && (
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                Paper Trade
              </Button>
            )}
            <Button className="flex-1 bg-[#5D1D21] hover:bg-[#4D1921]">
              Publish
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

