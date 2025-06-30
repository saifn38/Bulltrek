import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { toast } from 'sonner';

interface TradeDirection {
  id: number;
  direction: string;
}

export const useDirections = () => {
  const queryClient = useQueryClient();

  // Get all directions
  const { data: directions, isLoading, error } = useQuery<TradeDirection[]>({
    queryKey: ['directions'],
    queryFn: async () => {
      const response = await apiClient.get('/api/v1/directions');
      return response.data;
    }
  });

  // Create direction
  const createDirection = useMutation({
    mutationFn: async (direction: string) => {
      const response = await apiClient.post('/api/v1/directions', { direction });
      return response.data;
    },
    onSuccess: (newDirection) => {
      toast.success(`Direction "${newDirection.direction}" created`);
      queryClient.invalidateQueries({ queryKey: ['directions'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create direction');
    }
  });

  // Update direction
  // Update the updateDirection mutation
const updateDirection = useMutation({
  mutationFn: async ({ id, direction }: { id: number; direction: string }) => {
    const response = await apiClient.put(`/api/v1/directions/${id}`, { direction });
    return response.data;
  },
  onMutate: async ({ id, direction }) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['directions'] });
    
    // Snapshot the previous value
    const previousDirections = queryClient.getQueryData<TradeDirection[]>(['directions']);
    
    // Optimistically update
    queryClient.setQueryData<TradeDirection[]>(['directions'], old => 
      old?.map(d => d.id === id ? { ...d, direction } : d) || []
    );
    
    return { previousDirections };
  },
  onError: (error: any, _, context) => {
    // Revert on error
    toast.error(error.response?.data?.message || 'Failed to update direction');
    queryClient.setQueryData(['directions'], context?.previousDirections);
  },
  onSuccess: (updatedDirection) => {
    toast.success(`Direction updated successfully`);
  },
  onSettled: () => {
    // Refetch after error or success
    queryClient.invalidateQueries({ queryKey: ['directions'] });
  }
});

  // Delete direction (with optimistic update)
  const deleteDirection = useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/api/v1/directions/${id}`);
    },
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['directions'] });
      
      // Snapshot the previous value
      const previousDirections = queryClient.getQueryData<TradeDirection[]>(['directions']);
      
      // Optimistically update
      queryClient.setQueryData<TradeDirection[]>(['directions'], old => 
        old?.filter(d => d.id !== id) || []);
      
      return { previousDirections };
    },
    onError: (error: any, _, context) => {
      // Revert on error
      toast.error(error.response?.data?.message || 'Failed to delete direction');
      queryClient.setQueryData(['directions'], context?.previousDirections);
    },
    onSuccess: () => {
      toast.success('Direction deleted successfully');
    },
    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['directions'] });
    }
  });

  return {
    directions,
    isLoading,
    error,
    createDirection,
    updateDirection,
    deleteDirection
  };
};