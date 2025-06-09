"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from "react"

interface ScrollButtonsProps {
  scrollContainerId: string
}

export function ScrollButtons({ scrollContainerId }: ScrollButtonsProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollButtons = () => {
    const container = document.getElementById(scrollContainerId)
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      )
    }
  }

  useEffect(() => {
    const container = document.getElementById(scrollContainerId)
    if (container) {
      updateScrollButtons()
      container.addEventListener('scroll', updateScrollButtons)
      window.addEventListener('resize', updateScrollButtons)

      return () => {
        container.removeEventListener('scroll', updateScrollButtons)
        window.removeEventListener('resize', updateScrollButtons)
      }
    }
  }, [scrollContainerId])

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(scrollContainerId)
    if (container) {
      const scrollAmount = container.clientWidth
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (!canScrollLeft && !canScrollRight) return null

  return (
    <>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-200 z-10"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-200 z-10"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </>
  )
}

