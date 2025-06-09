'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = React.useState('card')
  const [hasPromo, setHasPromo] = React.useState(false)
  const [cardNumber, setCardNumber] = React.useState('')

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value)
    setCardNumber(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add payment processing logic here
    console.log('Processing payment...')
  }

  return (
    <div className="min-h-screen bg-pink-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-5xl bg-[#693e4c] text-white">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-center mb-8">Payment Details</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg mb-4">Payment Method</h2>
                <RadioGroup
                  defaultValue="card"
                  onValueChange={setPaymentMethod}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" className="border-white" />
                    <Label htmlFor="card" className="text-white">Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" className="border-white" />
                    <Label htmlFor="upi" className="text-white">UPI</Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter Card Name"
                      className="bg-[#693e4c] border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength={19}
                      className="bg-[#693e4c] border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        maxLength={5}
                        className="bg-[#693e4c] border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="XXXX"
                        maxLength={4}
                        type="password"
                        className="bg-[#693e4c] border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="promo"
                      checked={hasPromo}
                      onCheckedChange={(checked:boolean) => setHasPromo(checked === true)}
                      className="border-white data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <Label htmlFor="promo" className="text-sm">I have a Promo Code</Label>
                  </div>

                  <div className="space-y-2 text-lg">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹ 1400/-</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₹ 100/-</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total Amount</span>
                      <span>₹ 1500/-</span>
                    </div>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12">
                    Make Payment
                  </Button>
                </form>
              )}
            </div>

            <div className="bg-[#532f3a] rounded-lg p-6 space-y-4">
              <p className="text-center text-white/80">Subscribe and start saving money</p>
              <h2 className="text-2xl font-bold text-center">Premium Plan</h2>
              <p className="text-2xl font-bold text-center">₹ 1400 / Month</p>
              
              <div className="space-y-3">
                {[
                  'Strategy 1: 5 Bots/ 7 Brokers',
                  'Strategy 2: 8 Bots/ 7 Brokers',
                  'Strategy 2: 8 Bots/ 7 Brokers',
                  'Strategy 2: 8 Bots/ 7 Brokers',
                  'Strategy 2: 8 Bots/ 7 Brokers',
                  'Strategy 2: 8 Bots/ 7 Brokers',
                  'Back Testing'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant="link" className="w-full text-white hover:text-white/80">
                Change Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}