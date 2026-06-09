import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/cn";

export function StatusIndicator() {
  const status = useUIStore((s) => s.wsStatus);

  const cfg = {
    connecting: { label: "Conectando", color: "text-warning", dot: "bg-warning" },
    online:     { label: "Online",     color: "text-success", dot: "bg-success" },
    offline:    { label: "Offline",    color: "text-danger",  dot: "bg-danger"  },
  }[status];

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-noir-900/40 border border-white/[0.04]">
      <span className="relative flex w-2 h-2">
        <span className={cn(
          "absolute inline-flex w-full h-full rounded-full opacity-50 animate-ping",
          cfg.dot,
          status === "online" && "opacity-50",
          status === "offline" && "hidden",
        )} />
        <span className={cn("relative inline-flex w-2 h-2 rounded-full", cfg.dot)} />
      </span>
      <span className={cn("font-mono text-2xs uppercase tracking-luxe", cfg.color)}>
        {cfg.label}
      </span>
    </div>
  );
}
