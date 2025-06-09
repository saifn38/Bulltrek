import { tradeMappingApi, type TradeMapping } from '@/api/tradeMaster';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useTradeMappings = () => {
  const queryClient = useQueryClient();

  // Get all trade mappings
  const { 
    data: mappings, 
    isLoading, 
    error 
  } = useQuery<TradeMapping[]>({
    queryKey: ['tradeMappings'],
    queryFn: () => tradeMappingApi.getAll().then(res => res.data)
  });

  // Create mapping
  const createMapping = useMutation({
    mutationFn: (mapping: Omit<TradeMapping, 'id'|'created_at'>) => 
      tradeMappingApi.create(mapping),
    onSuccess: () => {
      toast.success('Trade rule created');
      queryClient.invalidateQueries({queryKey: ['tradeMappings']});
    },
    onError: () => {
      toast.error('Failed to create trade rule');
    }
  });

  // Delete mapping
  const deleteMapping = useMutation({
    mutationFn: (id: number) => tradeMappingApi.delete(id),
    onSuccess: () => {
      toast.success('Trade rule deleted');
      queryClient.invalidateQueries({queryKey: ['tradeMappings']});
    },
    onError: () => {
      toast.error('Failed to delete trade rule');
    }
  });

  return { 
    mappings,
    isLoading,
    error,
    createMapping,
    deleteMapping
  };
};