import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { usePaperTrades } from "@/hooks/usePaperTrades";

interface PaperTradingTablesProps {
  botId: number;
}

export function PaperTradingTables({ botId }: PaperTradingTablesProps) {
  const { openTrades, closedTrades, isLoading, error } = usePaperTrades(botId);

  const renderTradesTable = (trades: string[], status: "OPEN" | "CLOSED") => (
    <div className="max-h-[400px] overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-4">
                Loading trades...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-4 text-red-500">
                Error loading trades
              </TableCell>
            </TableRow>
          ) : !trades?.length ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-4">
                No {status.toLowerCase()} trades
              </TableCell>
            </TableRow>
          ) : (
            trades.map((symbol: string, index: number) => (
              <TableRow key={index}>
                <TableCell>{symbol}</TableCell>
                <TableCell>
                  <Badge variant={status === "OPEN" ? "success" : "secondary"}>
                    {status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Tabs defaultValue="open" className="w-full">
      <TabsList>
        <TabsTrigger value="open">Open Trades</TabsTrigger>
        <TabsTrigger value="closed">Closed Trades</TabsTrigger>
      </TabsList>

      <TabsContent value="open">
        {renderTradesTable(openTrades, "OPEN")}
      </TabsContent>

      <TabsContent value="closed">
        {renderTradesTable(closedTrades, "CLOSED")}
      </TabsContent>
    </Tabs>
  );
}