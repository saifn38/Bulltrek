import { useQuery } from "@tanstack/react-query";
import apiClient from "@/api/apiClient";

interface Transaction {
  symbol: string;
  id: number;
  orderId: number;
  orderListId: number;
  price: string;
  qty: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  time: number;
  isBuyer: boolean;
  isMaker: boolean;
  isBestMatch: boolean;
}

interface TransactionHistoryResponse {
  status: string;
  message: string;
  data: Transaction[];
  code: number;
}

export function useTransactionHistory(symbol: string) {
  return useQuery<TransactionHistoryResponse, Error>({
    queryKey: ['transactionHistory', symbol],
    queryFn: async () => {
      const response = await apiClient.get<TransactionHistoryResponse>(
        '/api/v1/brokerage/binance/transaction/history',
        {
          params: { symbol }  // Changed from data to params
        }
      );
      return response.data;
    },
    enabled: !!symbol,
  });
}