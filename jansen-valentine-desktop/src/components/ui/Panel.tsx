import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

// ── Maison Panel ───────────────────────────────────────────
interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline";
  framed?: boolean;
}

export function Panel({
  variant = "default",
  framed,
  className,
  children,
  ...props
}: PanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg",
        variant === "default" && "bg-noir-900/40 border border-white/[0.04]",
        variant === "elevated" && "bg-gradient-to-br from-noir-800/60 to-noir-900/30 border border-white/[0.04] shadow-panel",
        variant === "outline" && "border border-white/10 bg-transparent",
        framed && "corner-frame",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Section Header ─────────────────────────────────────────
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between gap-6 mb-8", className)}>
      <div>
        {eyebrow && <p className="editorial-eyebrow mb-2">{eyebrow}</p>}
        <h2 className="font-display text-3xl font-medium text-ivory tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-stone max-w-2xl">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

// ── Pill / Badge ───────────────────────────────────────────
interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  dot?: boolean;
  color?: string;
  bg?: string;
  border?: string;
}

export function Pill({ dot, color, bg, border, className, children, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "font-mono text-2xs uppercase tracking-luxe whitespace-nowrap",
        "border",
        color,
        bg,
        border,
        className,
      )}
      {...props}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full bg-current animate-pulse")} />
      )}
      {children}
    </span>
  );
}

// ── Maison Divider ─────────────────────────────────────────
export function Divider({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-champagne/15 to-transparent" />
      {label && (
        <span className="font-mono text-2xs uppercase tracking-editorial text-champagne/50">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-champagne/15 to-transparent" />
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────
export function EmptyState({ icon, title, hint }: { icon?: ReactNode; title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {icon && <div className="text-stone/40 mb-4">{icon}</div>}
      <h3 className="font-display text-lg text-ivory/80">{title}</h3>
      {hint && <p className="mt-2 text-sm text-stone max-w-sm">{hint}</p>}
    </div>
  );
}
