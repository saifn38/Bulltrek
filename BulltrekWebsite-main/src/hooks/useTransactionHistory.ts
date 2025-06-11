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
      const response = await apiClient.get(`/api/v1/transactions/${symbol}`);
      return response.data;
    },
    select: (data) => ({
      ...data,
      data: Array.isArray(data.data) ? data.data : []
    }),
    enabled: !!symbol,
  });
}