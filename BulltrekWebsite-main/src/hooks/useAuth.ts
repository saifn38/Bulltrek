import apiClient from "@/api/apiClient";
import { LoginResponse } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setAuthData = (token: string, user: any) => {
    localStorage.setItem("AUTH_TOKEN", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const clearAuthData = () => {
    localStorage.removeItem("AUTH_TOKEN");
    localStorage.removeItem("user");
  };

  const login = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      apiClient.post<LoginResponse>("/api/v1/auth", { 
        username: email, 
        password 
      }),
    onSuccess: (response) => {
      const { data } = response;
      setAuthData(data.data.token, data.data.user);
      toast.success("Login successful");
      navigate("/dashboard");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    }
  });

  const register = useMutation({
    mutationFn: (userData: {
      first_name: string;
      last_name: string;
      email: string;
      mobile: string;
      password: string;
      password_confirmation: string;
    }) => apiClient.post("/api/v1/signup", userData),
    onSuccess: (response) => {
      toast.success(response.data.message || "Registration successful");
      navigate("/login");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Registration failed";
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach((err: any) => {
          toast.error(err[0]);
        });
      } else {
        toast.error(errorMessage);
      }
    }
  });

  const logout = () => {
    clearAuthData();
    queryClient.removeQueries(); // or be more specific with query keys
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return { login, register, logout };
}