import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBrokerageDetails } from '@/hooks/useBrokerageDetails';

interface PlatformDetailsProps {
  onDelete: (id: number) => void;
}

export function PlatformDetails({ onDelete }: PlatformDetailsProps) {
  const { data: brokerageData, isLoading: isBrokerageLoading, error: brokerageError } = useBrokerageDetails();

  return (
    <div className="max-h-[300px] overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Exchange/Broker Name</TableHead>
            <TableHead>Added Date</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isBrokerageLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Loading brokerage details...
              </TableCell>
            </TableRow>
          ) : brokerageError ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-red-500">
                Error loading brokerage details
              </TableCell>
            </TableRow>
          ) : brokerageData?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No brokerage accounts connected
              </TableCell>
            </TableRow>
          ) : (
            brokerageData?.data.map((brokerage, index) => (
              <TableRow key={brokerage.id} className="hover:bg-muted/50">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{brokerage.brokerage.name}</TableCell>
                <TableCell>{format(new Date(brokerage.created_at), 'dd MMM yyyy')}</TableCell>
                <TableCell>{format(new Date(brokerage.updated_at), 'dd MMM yyyy')}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDelete(brokerage.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}