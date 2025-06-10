import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/apiClient';

interface PaperTradeResponse {
  status: string;
  message: string;
  data: PaperTrade[];
  code: number;
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

interface OpenTradesResponse {
  status: string;
  message: string;
  data: {
    open_trades: string[];
  };
  code: number;
}

export function usePaperTrades(botId: number) {
  const openTrades = useQuery<PaperTradeResponse>({
    queryKey: ['paperTrades', 'open', botId],
    queryFn: async () => {
      const response = await apiClient.get(`/api/v1/bots/${botId}/paper/open-trades`);
      return response.data;
    },
  });

  const closedTrades = useQuery<PaperTradeResponse>({
    queryKey: ['paperTrades', 'closed', botId],
    queryFn: async () => {
      const response = await apiClient.get(`/api/v1/bots/${botId}/paper/closed-trades`);
      return response.data;
    },
  });

  return {
    openTrades: openTrades.data?.data || [],
    closedTrades: closedTrades.data?.data || [],
    isLoading: openTrades.isLoading || closedTrades.isLoading,
    error: openTrades.error || closedTrades.error,
  };
}