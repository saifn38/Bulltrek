import { useState } from 'react';
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useBrokerage } from "@/hooks/useBrokerage";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface Brokerage {
  id: string;
  name: string;
  website: string | null;
  brokerage_type: string | null;
  created_at: string;
  updated_at: string;
}

interface BrokerageResponse {
  status: string;
  message: string;
  data: Brokerage[];
  code: number;
}

export function BrokeragesTable() {
  const { data: brokerages, isLoading, error, getBrokerageById, deleteBrokerage } = useBrokerage();
  const [selectedBrokerage, setSelectedBrokerage] = useState<Brokerage | null>(null);
  const [searchId, setSearchId] = useState<string>("");
  const [brokerageToDelete, setBrokerageToDelete] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId) {
      try {
        const brokerageDetails = await getBrokerageById(searchId);
        setSelectedBrokerage(brokerageDetails.data);
      } catch (error) {
        console.error('Error fetching brokerage details:', error);
        setSelectedBrokerage(null);
      }
    } else {
      setSelectedBrokerage(null);
    }
  };

  const handleRowClick = async (id: string) => {
    try {
      const brokerageDetails = await getBrokerageById(id);
      setSelectedBrokerage(brokerageDetails.data);
    } catch (error) {
      console.error('Error fetching brokerage details:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBrokerage(id);
      toast.success('Brokerage deleted successfully');
      if (selectedBrokerage?.id === id) {
        setSelectedBrokerage(null);
      }
    } catch (error) {
      toast.error('Failed to delete brokerage');
    } finally {
      setBrokerageToDelete(null);
    }
  };

  return (
    <Card className="border bg-white rounded-lg shadow-sm">
      <CardHeader className="bg-[#4A0D0D] text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Brokerages</CardTitle>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-[200px] bg-white text-black"
            />
            <Button type="submit" variant="secondary" size="sm">
              Search
            </Button>
          </form>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Loading brokerages...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-red-500">
                    Error loading brokerages
                  </TableCell>
                </TableRow>
              ) : selectedBrokerage ? (
                <TableRow className="hover:bg-muted/50">
                  <TableCell>{selectedBrokerage.id}</TableCell>
                  <TableCell>{selectedBrokerage.name}</TableCell>
                  <TableCell>
                    {selectedBrokerage.website ? (
                      <a 
                        href={selectedBrokerage.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedBrokerage.website}
                      </a>
                    ) : '-'}
                  </TableCell>
                  <TableCell>{selectedBrokerage.brokerage_type || '-'}</TableCell>
                  <TableCell>
                    {format(new Date(selectedBrokerage.created_at), 'dd MMM yyyy HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    {format(new Date(selectedBrokerage.updated_at), 'dd MMM yyyy HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBrokerageToDelete(selectedBrokerage.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ) : !brokerages?.data?.length ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No brokerages available
                  </TableCell>
                </TableRow>
              ) : (
                brokerages.data.map((brokerage: Brokerage) => (
                  <TableRow 
                    key={brokerage.id} 
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleRowClick(brokerage.id)}
                  >
                    <TableCell>{brokerage.id}</TableCell>
                    <TableCell>{brokerage.name}</TableCell>
                    <TableCell>
                      {brokerage.website ? (
                        <a 
                          href={brokerage.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {brokerage.website}
                        </a>
                      ) : '-'}
                    </TableCell>
                    <TableCell>{brokerage.brokerage_type || '-'}</TableCell>
                    <TableCell>
                      {format(new Date(brokerage.created_at), 'dd MMM yyyy HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                      {format(new Date(brokerage.updated_at), 'dd MMM yyyy HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBrokerageToDelete(brokerage.id);
                        }}
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
      </CardContent>
      <AlertDialog open={!!brokerageToDelete} onOpenChange={() => setBrokerageToDelete(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the brokerage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => brokerageToDelete && handleDelete(brokerageToDelete)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}