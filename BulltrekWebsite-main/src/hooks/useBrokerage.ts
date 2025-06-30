import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/api/apiClient';

export function useBrokerage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['brokerages'],
    queryFn: async () => {
      const response = await apiClient.get('/api/v1/brokerage');
      return response.data;
    },
  });
  
  const createBrokerageMutation = useMutation({
  mutationFn: async (data: FormData) => {
    const response = await apiClient.post('/api/v1/brokerage', data);
    return response.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['brokerages'] });
  },
});
  const deleteBrokerage = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/api/v1/brokerage/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brokerages'] });
    },
  });

  // Get brokerage by ID
  const getBrokerageById = async (id: string) => {
    try {
      const response = await apiClient.post(`/api/v1/brokerage/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch brokerage details');
    }
  };

  return {
    data,
    isLoading,
    error,
    getBrokerageById,
    deleteBrokerage: deleteBrokerage.mutate,
    createBrokerage: createBrokerageMutation.mutateAsync,
    isDeletingBrokerage: deleteBrokerage.isPending,
  };
}