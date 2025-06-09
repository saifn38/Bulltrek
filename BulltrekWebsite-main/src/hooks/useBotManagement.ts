import apiClient from "@/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Bot {
  id: number;
  user_id: number;
  strategy_id: number;
  name: string;
  status: 'idle' | 'running' | 'stopped';
  mode: 'paper' | 'live';
  execution_type: 'manual' | 'scheduled';
  schedule_expression: string | null;
  created_at: string;
  updated_at: string;
}

interface BotResponse {
  status: string;
  message: string;
  data: Bot[];
  code: number;
}

interface BotDetailsResponse {
  id: number;
  user_id: number;
  strategy_id: number;
  name: string;
  status: 'idle' | 'running' | 'stopped';
  mode: 'paper' | 'live';
  execution_type: 'manual' | 'scheduled';
  schedule_expression: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateBotRequest {
  name: string;
  strategy_id: number;
  mode: 'paper' | 'live';
  execution_type: 'manual' | 'scheduled';
}

interface UpdateBotRequest {
  name?: string;
  mode?: 'paper' | 'live';
  execution_type?: 'manual' | 'scheduled';
  schedule_expression?: string;
}

export function useBotManagement(selectedBotId?: string) {
  const queryClient = useQueryClient();

  const { data: bots, isLoading, error } = useQuery<BotResponse>({
    queryKey: ["bots"],
    queryFn: async () => {
      try {
        console.log('Fetching bots...');
        const token = localStorage.getItem('AUTH_TOKEN');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await apiClient.get("/api/v1/bots", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('Bot API Response:', response.data);
        
        if (Array.isArray(response.data)) {
          return {
            status: 'success',
            message: 'Bots retrieved successfully',
            data: response.data,
            code: 200
          };
        }
        
        if (!response.data || !response.data.data) {
          console.error('Invalid bot response format:', response.data);
          throw new Error('Invalid response format');
        }
        
        return response.data;
      } catch (error) {
        console.error('Bot API Error:', error);
        throw error;
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const getBotDetails = useQuery<BotDetailsResponse>({
    queryKey: ["botDetails", selectedBotId],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (!token) {
          throw new Error('No authentication token found');
        }

        if (!selectedBotId) {
          throw new Error('Bot ID is required');
        }

        const response = await apiClient.get(`/api/v1/bots/${selectedBotId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('Bot Details Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Bot Details Error:', error);
        throw error;
      }
    },
    enabled: !!selectedBotId,
  });

  const createBot = useMutation({
    mutationFn: async (data: CreateBotRequest) => {
      try {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await apiClient.post("/api/v1/bots", data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Create Bot Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Create Bot Error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bots"] });
    },
  });

  const updateBot = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateBotRequest }) => {
      try {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await apiClient.put(`/api/v1/bots/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Update Bot Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Update Bot Error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bots"] });
    },
  });

  const deleteBot = useMutation({
    mutationFn: async (id: number) => {
      try {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await apiClient.delete(`/api/v1/bots/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Delete Bot Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Delete Bot Error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bots"] });
    },
  });

  return {
    bots,
    isLoading,
    error,
    createBot,
    updateBot,
    deleteBot,
    getBotDetails,
  };
} 