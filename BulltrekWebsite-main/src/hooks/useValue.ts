import { valueApi, type IndicatorValue } from '@/api/tradeMaster';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useIndicatorValues = () => {
  const queryClient = useQueryClient();

  // Get all values
  const { 
    data: values, 
    isLoading, 
    error 
  } = useQuery<IndicatorValue[]>({
    queryKey: ['indicatorValues'],
    queryFn: () => valueApi.getAll().then(res => res.data),
    staleTime: 1000 * 60 * 5 // 5 minutes cache
  });

  // Create value
  const createValue = useMutation({
    mutationFn: (value: number) => 
      valueApi.create(value).then(res => res.data),
    onSuccess: () => {
      toast.success('Threshold value created');
      queryClient.invalidateQueries({queryKey: ['indicatorValues']});
    }
  });

  // Update value
  const updateValue = useMutation({
    mutationFn: ({ id, value }: { id: number; value: number }) =>
      valueApi.update(id, value).then(res => res.data),
    onSuccess: (updatedValue) => {
      toast.success(`Value updated to ${updatedValue.value}`);
      queryClient.invalidateQueries({queryKey: ['indicatorValues']});
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update value');
    }
  });

  // Delete value
  const deleteValue = useMutation({
    mutationFn: (id: number) => valueApi.delete(id),
    onSuccess: () => {
      toast.success('Value deleted');
      queryClient.invalidateQueries({queryKey: ['indicatorValues']});
    }
  });

  return { 
    values,
    isLoading,
    error,
    createValue,
    updateValue,
    deleteValue
  };
};