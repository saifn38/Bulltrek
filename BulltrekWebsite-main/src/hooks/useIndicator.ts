import { indicatorApi, type TradeIndicator } from '@/api/tradeMaster';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useIndicators = () => {
  const queryClient = useQueryClient();

  // Get all indicators
  const { 
    data: indicators, 
    isLoading, 
    error 
  } = useQuery<TradeIndicator[]>({
    queryKey: ['tradeIndicators'],
    queryFn: () => indicatorApi.getAll().then(res => res.data)
  });

  // Create indicator
  const createIndicator = useMutation({
    mutationFn: (name: string) => 
      indicatorApi.create(name).then(res => res.data),
    onSuccess: () => {
      toast.success('Indicator created');
      queryClient.invalidateQueries({queryKey: ['tradeIndicators']});
    },
    onError: () => {
      toast.error('Failed to create indicator');
    }
  });

  // Update indicator
  const updateIndicator = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      indicatorApi.update(id, name).then(res => res.data),
    onSuccess: (updatedIndicator) => {
      toast.success(`Indicator updated to ${updatedIndicator.name}`);
      queryClient.invalidateQueries({queryKey: ['tradeIndicators']});
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update indicator');
    }
  });

  // Delete indicator
  const deleteIndicator = useMutation({
    mutationFn: (id: number) => indicatorApi.delete(id),
    onSuccess: () => {
      toast.success('Indicator deleted');
      queryClient.invalidateQueries({queryKey: ['tradeIndicators']});
    },
    onError: () => {
      toast.error('Failed to delete indicator');
    }
  });

  return { 
    indicators,
    isLoading,
    error,
    createIndicator,
    updateIndicator,
    deleteIndicator
  };
};