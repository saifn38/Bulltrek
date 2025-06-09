'use client'

import * as React from "react"
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"

export default function IndyTrend() {
  const [isIndyOpen, setIsIndyOpen] = React.useState(true)
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false)

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="space-y-4">
        <Collapsible
          open={isIndyOpen}
          onOpenChange={setIsIndyOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-md bg-[#4A1515] p-4 font-medium text-white hover:bg-[#5A2525]">
            <span>Indy Trend</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isIndyOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 rounded-b-md border border-t-0 p-4">
            <div className="space-y-2">
              <Label htmlFor="strategy">Strategy Name</Label>
              <Input id="strategy" placeholder="Enter Name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="investment">Investment</Label>
              <div className="relative">
                <Input id="investment" placeholder="Value" />
                <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">USTD</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="investment-cap">Investment CAP</Label>
              <div className="relative">
                <Input id="investment-cap" placeholder="Value" />
                <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">USTD</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Leverage</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Input placeholder="Lower Limit" />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">USTD</span>
                </div>
                <div className="relative">
                  <Input placeholder="Upper Limit" />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">USTD</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Price Trigger</Label>
              <div className="space-y-4">
                <div className="relative">
                  <Input placeholder="Start Value" />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">USTD</span>
                </div>
                <div className="relative">
                  <Input placeholder="Stop Value" />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">USTD</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stop-loss">Stop Loss By</Label>
              <div className="relative">
                <Input id="stop-loss" placeholder="Value" />
                <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">USTD</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={isAdvancedOpen}
          onOpenChange={setIsAdvancedOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-md bg-[#4A1515] p-4 font-medium text-white hover:bg-[#5A2525]">
            <span>Advanced Settings</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 rounded-b-md border border-t-0 p-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="supertread" />
              <Label htmlFor="supertread">Supertread</Label>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" size="sm">Neutral</Button>
              <Button variant="outline" size="sm">Long</Button>
              <Button variant="outline" size="sm">Short</Button>
            </div>

            {['RSI 1', 'RSI 2', 'RSI 3', 'ADX'].map((item, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id={item.toLowerCase().replace(' ', '-')} />
                  <Label htmlFor={item.toLowerCase().replace(' ', '-')}>{item}</Label>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Length</Label>
                    <Input defaultValue="21" />
                  </div>
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Select defaultValue="close">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="close">Close</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timeframe</Label>
                    <Input defaultValue="6S" />
                  </div>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <div className="flex gap-4">
          <Button className="flex-1 bg-[#4A1515] text-white hover:bg-[#5A2525]">Proceed</Button>
          <Button variant="outline" className="flex-1">Reset</Button>
        </div>
      </form>
    </div>
  )
}

