import api, { tokenStore } from "@/lib/api";
import type { LoginResponse, User } from "@/types";

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/api/v1/auth/login", { email, password });
    tokenStore.set(data.tokens.access_token, data.tokens.refresh_token);
    return data;
  },

  async me(): Promise<User> {
    const { data } = await api.get<User>("/api/v1/auth/me");
    return data;
  },

  logout() {
    tokenStore.clear();
  },
};
