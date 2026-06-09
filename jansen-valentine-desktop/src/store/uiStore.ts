import { create } from "zustand";

interface UIState {
  sidebarCollapsed: boolean;
  wsStatus: "connecting" | "online" | "offline";
  toggleSidebar: () => void;
  setWsStatus: (s: "connecting" | "online" | "offline") => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  wsStatus: "connecting",
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setWsStatus: (wsStatus) => set({ wsStatus }),
}));
