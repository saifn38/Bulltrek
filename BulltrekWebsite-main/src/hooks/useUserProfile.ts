import apiClient from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
}

interface UserProfileResponse {
  status: string;
  message: string;
  data: UserProfile;
  code: number;
}

export function useUserProfile() {
  return useQuery<UserProfileResponse>({
    queryKey: ["userProfile"],
    queryFn: () => apiClient.get("/api/v1/users/profile").then(res => res.data),
  });
} 