import { useQuery } from "@tanstack/react-query";
import apiClient from "@/api/apiClient";

interface Transaction {
  id: string;
  symbol: string;
  orderId: string;
  price: string;
  qty: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  time: number;
  isBuyer: boolean;
}

interface TransactionResponse {
  status: string;
  message: string;
  data: Transaction[];
  code: number;
}

export function useTransactionHistory(symbol: string) {
  return useQuery<TransactionResponse, Error>({
    queryKey: ['transactions', symbol],
    queryFn: async () => {
      // Updated endpoint to match the backend API structure
      const response = await apiClient.get(`/api/v1/brokerage/binance/transaction/history`, {
        params: { symbol }
      });
      return response.data;
    },
    select: (data) => ({
      ...data,
      data: Array.isArray(data.data) ? data.data : []
    }),
    enabled: !!symbol,
    retry: 1, // Only retry once if failed
    // onError: (error) => {
    //   console.error('Transaction fetch error:', error);
    // }
  });
}