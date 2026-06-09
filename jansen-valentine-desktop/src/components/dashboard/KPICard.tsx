import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface KPICardProps {
  eyebrow: string;
  value: string;
  hint?: string;
  trend?: number;
  icon: LucideIcon;
  accent?: "champagne" | "rosedust" | "wine" | "stone";
  delay?: number;
}

const accents = {
  champagne: { iconBg: "bg-champagne/[0.08]", iconColor: "text-champagne", glow: "from-champagne/20" },
  rosedust:  { iconBg: "bg-rosedust/[0.08]",  iconColor: "text-rosedust",  glow: "from-rosedust/20" },
  wine:      { iconBg: "bg-wine/[0.12]",      iconColor: "text-wine-light",glow: "from-wine/20" },
  stone:     { iconBg: "bg-stone/[0.08]",     iconColor: "text-stone-light",glow: "from-stone/20" },
};

export function KPICard({
  eyebrow, value, hint, trend, icon: Icon, accent = "champagne", delay = 0
}: KPICardProps) {
  const a = accents[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="stat-card group"
    >
      {/* Decorative gradient backdrop */}
      <div className={cn(
        "absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-50 blur-3xl pointer-events-none",
        "bg-gradient-radial",
        a.glow,
      )} />

      <div className="relative flex items-start justify-between mb-6">
        <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", a.iconBg)}>
          <Icon className={cn("w-4 h-4", a.iconColor)} />
        </div>
        {trend !== undefined && (
          <div className={cn(
            "px-2 py-0.5 rounded-full font-mono text-2xs uppercase tracking-luxe",
            trend >= 0 ? "text-success bg-success/10" : "text-danger bg-danger/10",
          )}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>

      <p className="editorial-eyebrow mb-2">{eyebrow}</p>
      <p className="font-display text-3xl text-ivory tracking-tight">
        {value}
      </p>
      {hint && (
        <p className="text-xs text-stone mt-2 font-mono uppercase tracking-luxe">
          {hint}
        </p>
      )}

      {/* Bottom rim */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/20 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
