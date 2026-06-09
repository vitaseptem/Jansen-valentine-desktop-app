import { tokenStore } from "@/lib/api";
import { WS_URL } from "@/utils/constants";
import { useUIStore } from "@/store/uiStore";
import type { WSEvent } from "@/types";

type Listener = (event: WSEvent) => void;

class WSClient {
  private ws: WebSocket | null = null;
  private listeners = new Set<Listener>();
  private reconnectAttempts = 0;
  private pingInterval: number | null = null;
  private shouldReconnect = true;

  connect() {
    const token = tokenStore.getAccess();
    if (!token) return;
    useUIStore.getState().setWsStatus("connecting");

    try {
      this.ws = new WebSocket(`${WS_URL}?token=${token}`);
    } catch {
      this.scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      useUIStore.getState().setWsStatus("online");
      this.pingInterval = window.setInterval(() => {
        this.ws?.readyState === WebSocket.OPEN &&
          this.ws.send(JSON.stringify({ type: "ping" }));
      }, 25_000);
    };

    this.ws.onmessage = (event) => {
      try {
        const data: WSEvent = JSON.parse(event.data);
        if (data.type === "pong") return;
        this.listeners.forEach((l) => l(data));
      } catch { /* ignore */ }
    };

    this.ws.onclose = () => {
      useUIStore.getState().setWsStatus("offline");
      if (this.pingInterval) clearInterval(this.pingInterval);
      if (this.shouldReconnect) this.scheduleReconnect();
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  private scheduleReconnect() {
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 30_000);
    this.reconnectAttempts++;
    setTimeout(() => this.connect(), delay);
  }

  disconnect() {
    this.shouldReconnect = false;
    if (this.pingInterval) clearInterval(this.pingInterval);
    this.ws?.close();
    this.ws = null;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const wsClient = new WSClient();
