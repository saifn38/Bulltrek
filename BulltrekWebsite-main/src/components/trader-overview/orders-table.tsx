import { Copy } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Order } from "@/types/orders"

interface OrdersTableProps {
  orders: Order[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Position</TableHead>
          <TableHead>Open Price</TableHead>
          <TableHead>Exit Price</TableHead>
          <TableHead>Avg. Position Price</TableHead>
          <TableHead>Realized PnL</TableHead>
          <TableHead>Order Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>BTC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{order.position}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-green-700">
                      {order.type} {order.leverage}
                    </span>
                    <span className="text-muted-foreground">{order.crossType}</span>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div>{order.openPrice.toLocaleString()} USTD</div>
                <div className="text-xs text-muted-foreground">{order.timestamp}</div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div>{order.exitPrice.toLocaleString()} USTD</div>
                <div className="text-xs text-muted-foreground">{order.timestamp}</div>
              </div>
            </TableCell>
            <TableCell>{order.avgPositionPrice.toLocaleString()} USTD</TableCell>
            <TableCell>{order.realizedPnL.toLocaleString()} USTD</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {order.orderNumber}
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

