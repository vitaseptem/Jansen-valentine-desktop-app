import { format as dfFormat, formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatBRL(value: number | string | null | undefined): string {
  const n = typeof value === "string" ? parseFloat(value) : value || 0;
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export function formatCompactBRL(value: number): string {
  if (Math.abs(value) >= 1_000_000)
    return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `R$ ${(value / 1_000).toFixed(1)}k`;
  return formatBRL(value);
}

export function formatDate(date: string | Date, pattern = "dd MMM yyyy"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return dfFormat(d, pattern, { locale: ptBR });
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return dfFormat(d, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}

export function timeAgo(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: ptBR });
}

export function formatPercent(n: number): string {
  return `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
