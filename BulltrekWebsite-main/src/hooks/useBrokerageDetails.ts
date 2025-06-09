import apiClient from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";

interface Brokerage {
  id: number;
  name: string;
  website: string | null;
  registration_link: string | null;
  description: string | null;
  icon: string | null;
  color_code: string | null;
  brokerage_type: string | null;
  api_base_url: string | null;
  created_at: string;
  updated_at: string;
}

interface BrokerageDetail {
  id: number;
  brokerage_name: string;
  brokerage_api_key: string;
  brokerage_api_secret: string;
  brokerage_id: number;
  created_at: string;
  updated_at: string;
  brokerage: Brokerage;
}

interface BrokerageDetailsResponse {
  status: string;
  message: string;
  data: BrokerageDetail[];
  code: number;
}

export function useBrokerageDetails() {
  return useQuery<BrokerageDetailsResponse>({
    queryKey: ["brokerageDetails"],
    queryFn: () => apiClient.get("/api/v1/users/1/brokerages/details/fetch").then(res => res.data),
  });
} 