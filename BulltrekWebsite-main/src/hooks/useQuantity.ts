import { quantityApi, type TradeQuantity } from '@/api/tradeMaster';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useQuantities = () => {
  const queryClient = useQueryClient();

  // Fetch all quantities
  const { data: quantities, isLoading, error } = useQuery<TradeQuantity[]>({
    queryKey: ['tradeQuantities'],
    queryFn: () => quantityApi.getAll().then(res => res.data)
  });

  // Create quantity
  const createQuantity = useMutation({
    mutationFn: (quantity: number) => 
      quantityApi.create(quantity).then(res => res.data),
    onSuccess: (newQuantity) => {
      toast.success(`Quantity ${newQuantity.quantity} created`);
      queryClient.invalidateQueries({ queryKey: ['tradeQuantities'] });
    }
  });

  // Update quantity
  const updateQuantity = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      quantityApi.update(id, quantity).then(res => res.data),
    onSuccess: (updatedQuantity) => {
      toast.success(`Quantity updated to ${updatedQuantity.quantity}`);
      queryClient.invalidateQueries({ queryKey: ['tradeQuantities'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    }
  });

    // Delete quantity
  const deleteQuantity = useMutation({
    mutationFn: (id: number) => quantityApi.delete(id),
    onSuccess: () => {
      toast.success('Quantity deleted');
      queryClient.invalidateQueries({ queryKey: ['tradeQuantities'] });
    },
    onError: () => {
      toast.error('Failed to delete quantity');
    }
  });

  return { 
    quantities, 
    isLoading, 
    error, 
    createQuantity, 
    updateQuantity,
    deleteQuantity 
  };
};