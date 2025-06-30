import { useMutation } from "@tanstack/react-query";
import apiClient from "@/api/apiClient";
import { toast } from "sonner";

interface InviteResponse {
  status: string;
  message: string;
  data: null;
  code: number;
}

export function useResendInvite() {
  return useMutation<InviteResponse, unknown, number>({
    mutationFn: async (userId: number) => {
      const response = await apiClient.post(`/api/v1/users/resend-invite/${userId}`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Invite sent successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to send invite");
    }
  });
}