import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/common/Logo";
import { NAV_ITEMS } from "@/utils/constants";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/cn";
import { initials } from "@/utils/format";

export function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const collapsed = useUIStore((s) => s.sidebarCollapsed);

  return (
    <aside className={cn(
      "relative flex flex-col h-screen",
      "bg-noir-950/80 border-r border-white/[0.04]",
      "transition-all duration-500 ease-out",
      collapsed ? "w-20" : "w-64",
    )}>
      {/* Vertical gold sliver */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-champagne/20 to-transparent" />

      {/* Logo */}
      <div className="flex items-center justify-center py-8 px-6 border-b border-white/[0.04]">
        {collapsed ? (
          <Logo variant="mark" className="w-9 h-9" />
        ) : (
          <Logo variant="stacked" size="md" />
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <p className={cn(
          "px-3 mb-3 editorial-eyebrow",
          collapsed && "text-center text-[8px]",
        )}>
          {collapsed ? "—" : "Navegação"}
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = (Icons as any)[item.icon] || Icons.Circle;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-md relative",
                "font-sans text-sm transition-all duration-300",
                isActive
                  ? "text-ivory bg-gradient-to-r from-champagne/[0.08] to-transparent"
                  : "text-stone hover:text-ivory hover:bg-white/[0.02]",
                collapsed && "justify-center px-2",
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-champagne rounded-r"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive ? "text-champagne" : "text-stone group-hover:text-champagne/70"
                  )} />
                  {!collapsed && (
                    <span className="font-normal tracking-tight">{item.label}</span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User card / logout */}
      <div className={cn("border-t border-white/[0.04] p-4", collapsed && "px-2")}>
        <div className={cn(
          "flex items-center gap-3 p-2 rounded",
          collapsed && "flex-col p-0",
        )}>
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-champagne to-rosedust-dark
                            flex items-center justify-center text-noir-900 font-display font-medium text-sm">
              {user ? initials(user.name) : "—"}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-noir-950" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs text-ivory font-medium truncate">{user?.name || "—"}</p>
              <p className="text-2xs font-mono uppercase tracking-luxe text-champagne/60">
                {user?.role || ""}
              </p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={logout}
              className="btn-icon"
              title="Sair"
            >
              <Icons.LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
