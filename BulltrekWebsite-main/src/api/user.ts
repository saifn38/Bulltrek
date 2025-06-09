import { UserProfile } from "@/types/userProfile";

export async function fetchUserProfile(): Promise<UserProfile> {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch user profile");
    }
  
    return await res.json();
  }