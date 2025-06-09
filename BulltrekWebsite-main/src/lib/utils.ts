import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDateTime(date: string) {
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', '')
}

// Generate mock data
export function generateMockData(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    platform: 'Zerodha',
    accountName: 'Account/API Name',
    botName: 'Indy UTC',
    dateTime: '2024-01-12T12:00:00',
    type: 'Coin',
    buy: 'Buy',
    sell: 'Sell',
    quantity: 300,
    pl: i % 3 === 0 ? 89 : i % 4 === 0 ? -900 : -88,
    transactionId: '1234GHY'
  }))
}

