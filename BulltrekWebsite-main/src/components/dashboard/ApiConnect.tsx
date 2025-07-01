import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/api/apiClient";

interface ApiConnectProps {
  userId?: string;
}

const useBrokerageState = () => {
  return useQuery({
    queryKey: ["brokerageState"],
    queryFn: async () => {
      const response = await apiClient.get("/api/v1/users/1/brokerages/details/fetch");
      const brokerages = response.data?.data || [];
      return {
        binance: brokerages.some(
          (brokerage: any) => 
            brokerage.brokerage_name.toLowerCase() === "binance"
        ),
        zerodha: brokerages.some(
          (brokerage: any) => 
            brokerage.brokerage_name.toLowerCase() === "zerodha"
        )
      };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

const useBinanceConnection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await apiClient.put(`/api/v1/users/${userId}/brokerages/details/link`, {
        brokerage_name: "binance",
        brokerage_api_key: import.meta.env.VITE_BINANCE_API_KEY || "jcramxjcrjejdr80",
        brokerage_api_secret: import.meta.env.VITE_BINANCE_API_SECRET || "x5bkuvcvbaqgh3yke4qzl1teuhxqna66"
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["brokerageState"] });
      toast.success(data.message || "Binance connected successfully");
    },
    onError: (error: any) => {
      console.error("Binance connection error:", error);
      toast.error(error.response?.data?.message || "Failed to connect Binance");
    }
  });
};

export function ApiConnect({ userId }: ApiConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { data: brokerageState, isLoading } = useBrokerageState();
  const binanceConnection = useBinanceConnection();

  const handleBinanceConnect = () => {
    if (!brokerageState?.binance && userId) {
      setIsConnecting(true);
      binanceConnection.mutate(userId);
    }
  };

  useEffect(() => {
    if (binanceConnection.isSuccess || binanceConnection.isError) {
      setIsConnecting(false);
    }
  }, [binanceConnection.isSuccess, binanceConnection.isError]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>Zerodha</span>
        </div>
        <div className='w-full text-center'>REST API</div>
        <Button 
          variant="default"
          className="bg-[#4A1C24] text-white hover:bg-[#3A161C] w-fit"
          onClick={() => {
            window.open(`https://kite.zerodha.com/connect/login?v=3&api_key=jcramxjcrjejdr80&user_id=${userId}`, '_blank');
          }}
        >
          Connect
        </Button>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>Binance</span>
        </div>
        <div className='w-full text-center'>REST API</div>
        <Button 
          variant={brokerageState?.binance ? "outline" : "default"}
          className={brokerageState?.binance ? "border-green-500 text-green-500 hover:bg-green-50" : "bg-[#4A1C24] text-white hover:bg-[#3A161C]"}
          onClick={handleBinanceConnect}
          disabled={isConnecting || brokerageState?.binance}
        >
          {isConnecting ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {brokerageState?.binance ? "Connected" : "Connect"}
        </Button>
      </div>
    </div>
  );
}