import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface StrategyCondition {
  indicator: string;
  action: string;
  value: number;
}

interface CreateStrategyData {
  user_id: number;
  name: string;
  conditions: StrategyCondition[];
  operators: string[];
  direction: string;
  quantity: number;
  asset: string;
  start_time: string;
  end_time: string;
}

interface StrategyResponse {
  status: string;
  message: string;
  data: {
    user_id: number;
    name: string;
    expression: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
  code: number;
}

export function useStrategy() {
  const queryClient = useQueryClient();

  const createStrategy = useMutation({
    mutationFn: async (data: CreateStrategyData) => {
      const response = await axios.post<StrategyResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/strategies`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategies'] });
    },
  });

  return {
    createStrategy,
  };
} 