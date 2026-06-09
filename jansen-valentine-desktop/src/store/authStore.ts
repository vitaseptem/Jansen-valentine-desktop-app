import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { tokenStore } from "@/lib/api";
import { authService } from "@/services/auth.service";

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      isAuthenticated: false,

      login: async (email, password) => {
        set({ loading: true });
        try {
          const data = await authService.login(email, password);
          set({ user: data.user, isAuthenticated: true, loading: false });
        } catch (e) {
          set({ loading: false });
          throw e;
        }
      },

      logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false });
      },

      hydrate: async () => {
        if (!tokenStore.getAccess()) {
          set({ isAuthenticated: false, user: null });
          return;
        }
        try {
          const user = await authService.me();
          set({ user, isAuthenticated: true });
        } catch {
          tokenStore.clear();
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    { name: "jv-auth", partialize: (s) => ({ user: s.user }) },
  ),
);
