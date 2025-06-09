import { indicatorActionApi, type IndicatorAction } from '@/api/tradeMaster';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useIndicatorActions = () => {
  const queryClient = useQueryClient();

  // Get all actions
  const { 
    data: actions, 
    isLoading, 
    error 
  } = useQuery<IndicatorAction[]>({
    queryKey: ['indicatorActions'],
    queryFn: () => indicatorActionApi.getAll().then(res => res.data)
  });

  // Create action
  const createAction = useMutation({
    mutationFn: (action: string) => 
      indicatorActionApi.create(action).then(res => res.data),
    onSuccess: () => {
      toast.success('Action created');
      queryClient.invalidateQueries({queryKey: ['indicatorActions']});
    },
    onError: () => {
      toast.error('Failed to create action');
    }
  });

  // Update action
  const updateAction = useMutation({
    mutationFn: ({ id, action }: { id: number; action: string }) =>
      indicatorActionApi.update(id, action).then(res => res.data),
    onSuccess: (updatedAction) => {
      toast.success(`Action updated to ${updatedAction.action}`);
      queryClient.invalidateQueries({queryKey: ['indicatorActions']});
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update action');
    }
  });

  // Delete action
  const deleteAction = useMutation({
    mutationFn: (id: number) => indicatorActionApi.delete(id),
    onSuccess: () => {
      toast.success('Action deleted');
      queryClient.invalidateQueries({queryKey: ['indicatorActions']});
    },
    onError: () => {
      toast.error('Failed to delete action');
    }
  });

  return { 
    actions,
    isLoading,
    error,
    createAction,
    updateAction,
    deleteAction
  };
};