import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/apiClient';

interface TradesResponse {
  status: string;
  message: string;
  data: {
    open_trades?: string[];
    closed_trades?: string[];
  };
  code: number;
}

export function usePaperTrades(botId: number) {
  const openTrades = useQuery<TradesResponse>({
    queryKey: ['paperTrades', 'open', botId],
    queryFn: async () => {
      console.log('Fetching open trades...');
      try {
        const response = await apiClient.get(`/api/v1/bots/${botId}/paper/open-trades`);
        console.log('Open trades response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching open trades:', error);
        throw error;
      }
    },
  });

  const closedTrades = useQuery<TradesResponse>({
    queryKey: ['paperTrades', 'closed', botId],
    queryFn: async () => {
      console.log('Fetching closed trades...');
      try {
        const response = await apiClient.get(`/api/v1/bots/${botId}/paper/closed-trades`);
        console.log('Closed trades response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching closed trades:', error);
        throw error;
      }
    },
  });

  return {
    openTrades: openTrades.data?.data?.open_trades || [],
    closedTrades: closedTrades.data?.data?.closed_trades || [],
    isLoading: openTrades.isLoading || closedTrades.isLoading,
    error: openTrades.error || closedTrades.error,
  };
}