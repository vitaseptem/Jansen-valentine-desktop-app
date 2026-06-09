import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/utils/constants";

const TOKEN_KEY = "jv_access_token";
const REFRESH_KEY = "jv_refresh_token";

export const tokenStore = {
  getAccess: () => localStorage.getItem(TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  set: (access: string, refresh: string) => {
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

// ── Request interceptor — inject token ──────────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStore.getAccess();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor — auto refresh on 401 ──────────────
let refreshing: Promise<string | null> | null = null;

async function refreshToken(): Promise<string | null> {
  const refresh = tokenStore.getRefresh();
  if (!refresh) return null;
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/auth/refresh`,
      { refresh_token: refresh },
      { headers: { "Content-Type": "application/json" } }
    );
    tokenStore.set(data.access_token, data.refresh_token);
    return data.access_token;
  } catch {
    tokenStore.clear();
    return null;
  }
}

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !original?._retry) {
      original._retry = true;
      if (!refreshing) refreshing = refreshToken();
      const newToken = await refreshing;
      refreshing = null;
      if (newToken && original.headers) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
      // Hard fail → bounce to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
