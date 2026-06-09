import type { OrderStatus } from "@/types";

export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL || "http://localhost:8000";

export const WS_URL =
  (import.meta as any).env?.VITE_WS_URL || "ws://localhost:8000/ws";

export const ORDER_STATUS_META: Record<
  OrderStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  draft:     { label: "Rascunho",   color: "text-stone",        bg: "bg-stone/10",       border: "border-stone/20" },
  pending:   { label: "Pendente",   color: "text-warning",      bg: "bg-warning/10",     border: "border-warning/30" },
  confirmed: { label: "Confirmado", color: "text-info",         bg: "bg-info/10",        border: "border-info/30" },
  paid:      { label: "Pago",       color: "text-champagne",    bg: "bg-champagne/10",   border: "border-champagne/30" },
  shipped:   { label: "Enviado",    color: "text-rosedust",     bg: "bg-rosedust/10",    border: "border-rosedust/30" },
  delivered: { label: "Entregue",   color: "text-success",      bg: "bg-success/10",     border: "border-success/30" },
  cancelled: { label: "Cancelado",  color: "text-danger",       bg: "bg-danger/10",      border: "border-danger/30" },
  returned:  { label: "Devolvido",  color: "text-stone-light",  bg: "bg-stone/10",       border: "border-stone/20" },
};

export const TIER_META: Record<
  string,
  { label: string; color: string; bg: string; symbol: string }
> = {
  bronze:   { label: "Bronze",   color: "text-rosedust-dark",     bg: "bg-rosedust/10",     symbol: "◇" },
  silver:   { label: "Silver",   color: "text-stone-light",       bg: "bg-stone/10",        symbol: "◆" },
  gold:     { label: "Gold",     color: "text-champagne",         bg: "bg-champagne/10",    symbol: "❖" },
  platinum: { label: "Platinum", color: "text-ivory",             bg: "bg-ivory/10",        symbol: "✦" },
};

export const NAV_ITEMS = [
  { to: "/dashboard",  label: "Visão Geral",  icon: "LayoutDashboard" },
  { to: "/catalog",    label: "Catálogo",     icon: "Sparkles" },
  { to: "/products",   label: "Produtos",     icon: "Tag" },
  { to: "/inventory",  label: "Estoque",      icon: "Package" },
  { to: "/orders",     label: "Pedidos",      icon: "ShoppingBag" },
  { to: "/customers",  label: "Clientes",     icon: "Heart" },
  { to: "/labels",     label: "Etiquetas",    icon: "QrCode" },
  { to: "/reports",    label: "Relatórios",   icon: "BarChart3" },
  { to: "/settings",   label: "Configurações", icon: "Settings" },
] as const;
