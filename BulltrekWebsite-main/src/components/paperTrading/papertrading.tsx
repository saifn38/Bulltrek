import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { usePaperTrades } from "@/hooks/usePaperTrades";
import { formatCurrency } from "@/lib/utils";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

interface PaperTradingTablesProps {
  botId: number;
}

interface PaperTrade {
  id: number;
  symbol: string;
  entry_price: number;
  exit_price: number | null;
  quantity: number;
  side: 'BUY' | 'SELL';
  status: 'OPEN' | 'CLOSED';
  pnl: number | null;
  created_at: string;
  closed_at: string | null;
}

export function PaperTradingTables({ botId }: PaperTradingTablesProps) {
  const { openTrades, closedTrades, isLoading, error } = usePaperTrades(botId);

  return (
    <Tabs defaultValue="open" className="w-full">
      <TabsList>
        <TabsTrigger value="open">Open Trades</TabsTrigger>
        <TabsTrigger value="closed">Closed Trades</TabsTrigger>
      </TabsList>

      <TabsContent value="open">
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Side</TableHead>
                <TableHead>Entry Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Entry Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading trades...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-red-500">
                    Error loading trades
                  </TableCell>
                </TableRow>
              ) : !openTrades?.length ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No open trades
                  </TableCell>
                </TableRow>
              ) : (
                openTrades.map((trade: PaperTrade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.symbol}</TableCell>
                    <TableCell>
                      <Badge variant={trade.side === 'BUY' ? 'success' : 'destructive'}>
                        {trade.side}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(trade.entry_price)}</TableCell>
                    <TableCell>{trade.quantity}</TableCell>
                    <TableCell>{formatCurrency(trade.entry_price * trade.quantity)}</TableCell>
                    <TableCell>{format(new Date(trade.created_at), 'dd MMM yyyy HH:mm:ss')}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="closed">
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Side</TableHead>
                <TableHead>Entry Price</TableHead>
                <TableHead>Exit Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>PnL</TableHead>
                <TableHead>Close Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Loading trades...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-red-500">
                    Error loading trades
                  </TableCell>
                </TableRow>
              ) : !closedTrades?.length ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No closed trades
                  </TableCell>
                </TableRow>
              ) : (
                closedTrades.map((trade: PaperTrade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.symbol}</TableCell>
                    <TableCell>
                      <Badge variant={trade.side === 'BUY' ? 'success' : 'destructive'}>
                        {trade.side}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(trade.entry_price)}</TableCell>
                    <TableCell>{formatCurrency(trade.exit_price!)}</TableCell>
                    <TableCell>{trade.quantity}</TableCell>
                    <TableCell className={trade.pnl! >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(trade.pnl!)}
                    </TableCell>
                    <TableCell>{format(new Date(trade.closed_at!), 'dd MMM yyyy HH:mm:ss')}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}