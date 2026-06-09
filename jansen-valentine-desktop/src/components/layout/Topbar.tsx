import { Menu, Search, Bell, Sparkles } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { StatusIndicator } from "@/components/common/StatusIndicator";
import { Logo } from "@/components/common/Logo";

interface TopbarProps {
  title?: string;
  eyebrow?: string;
}

export function Topbar({ title, eyebrow = "Maison 2026" }: TopbarProps) {
  const toggle = useUIStore((s) => s.toggleSidebar);

  return (
    <header
      data-tauri-drag-region
      className="relative flex items-center justify-between h-16 px-8 border-b border-white/[0.04] bg-noir-950/60 backdrop-blur"
    >
      <div className="flex items-center gap-6">
        <button onClick={toggle} className="btn-icon" title="Recolher menu">
          <Menu className="w-4 h-4" />
        </button>
        <div>
          <p className="editorial-eyebrow flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            {eyebrow}
          </p>
          {title && (
            <h1 className="font-display text-xl text-ivory tracking-tight mt-0.5">
              {title}
            </h1>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search command */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
          <input
            type="text"
            placeholder="Buscar peças, pedidos, clientes…"
            className="w-72 pl-9 pr-12 py-2 bg-noir-900/60 border border-white/[0.04] rounded
                       text-sm text-ivory placeholder:text-stone/40
                       focus:outline-none focus:border-champagne/40 transition-colors"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded
                          font-mono text-[10px] text-stone/60 bg-noir-800/60 border border-white/5">
            ⌘K
          </kbd>
        </div>

        <StatusIndicator />

        <button className="btn-icon relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
        </button>
      </div>
    </header>
  );
}
