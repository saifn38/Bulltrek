import { directionApi, type TradeDirection } from '@/api/tradeMaster';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDirections = () => {
  const queryClient = useQueryClient();

  // Get all directions
  const { data: directions, isLoading, error } = useQuery<TradeDirection[]>({
    queryKey: ['tradeDirections'],
    queryFn: () => directionApi.getAll().then(res => res.data)
  });

  // Create direction
  const createDirection = useMutation({
    mutationFn: (direction: string) => 
      directionApi.create(direction).then(res => res.data),
    onSuccess: (newDirection) => {
      toast.success(`Direction "${newDirection.direction}" created`);
      queryClient.invalidateQueries({ 
        queryKey: ['tradeDirections'] 
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create direction');
    }
  });

  // Update direction
  const updateDirection = useMutation({
    mutationFn: ({ id, direction }: { id: number; direction: string }) =>
      directionApi.update(id, direction).then(res => res.data),
    onSuccess: (updatedDirection) => {
      toast.success(`Direction updated to "${updatedDirection.direction}"`);
      queryClient.invalidateQueries({ 
        queryKey: ['tradeDirections'] 
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update direction');
    }
  });

  // Delete direction (with optimistic update)
  const deleteDirection = useMutation({
    mutationFn: (id: number) => directionApi.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ 
        queryKey: ['tradeDirections'] 
      });
      
      const previousDirections = queryClient.getQueryData<TradeDirection[]>(['tradeDirections']);
      
      queryClient.setQueryData<TradeDirection[]>(['tradeDirections'], old => 
        old?.filter(d => d.id !== id) || []);
      
      return { previousDirections };
    },
    onError: (error, _, context) => {
      toast.error(error.message || 'Failed to delete direction');
      queryClient.setQueryData(['tradeDirections'], context?.previousDirections);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['tradeDirections'] 
      });
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