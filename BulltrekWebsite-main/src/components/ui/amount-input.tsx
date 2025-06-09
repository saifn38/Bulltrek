"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

interface AmountInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string
}

export function AmountInput({ suffix = "USTD", ...props }: AmountInputProps) {
  return (
    <div className="relative">
      <Input
        {...props}
        className="h-12 rounded-lg border-input px-4 py-3 pr-16 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600">
        {suffix}
      </div>
    </div>
  )
}

