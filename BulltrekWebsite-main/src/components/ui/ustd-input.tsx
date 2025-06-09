"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

interface USTDInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function USTDInput({ label, ...props }: USTDInputProps) {
  return (
    <div className="relative">
      <Input
        {...props}
        className="h-12 rounded-lg border-input bg-white px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600">
        USTD
      </div>
    </div>
  )
}

