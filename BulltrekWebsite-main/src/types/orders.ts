export interface Order {
    id: string
    position: string
    type: "Long" | "Short"
    leverage: string
    crossType: string
    openPrice: number
    exitPrice: number
    avgPositionPrice: number
    realizedPnL: number
    orderNumber: string
    timestamp: string
  }
  
  