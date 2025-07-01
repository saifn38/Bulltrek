'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CollapsibleCardProps {
  title: React.ReactNode // Changed from string to ReactNode
  children: React.ReactNode
  className?: string
  defaultExpanded?: boolean
  action?: React.ReactNode
  contentClassName?: string
}

export function CollapsibleCard({ 
  title, 
  children, 
  className,
  defaultExpanded = true,
  action,
  contentClassName
}: CollapsibleCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <Card className={className}>
      <CardHeader 
        className="bg-[#4A1C24] text-white cursor-pointer flex flex-row items-center justify-between p-4 rounded-t-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {action}
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </CardHeader>
      <div className={cn(
        "transition-all duration-200 ease-in-out",
        isExpanded ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
      )}>
        <CardContent className={contentClassName ?? "p-6"}>
          {children}
        </CardContent>
      </div>
    </Card>
  )
}

