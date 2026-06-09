import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useAuthStore } from "@/store/authStore";
import { wsClient } from "@/websocket/client";

const PAGE_META: Record<string, { title: string; eyebrow: string }> = {
  "/dashboard": { title: "Visão Geral", eyebrow: "Maison 2026 · Painel" },
  "/catalog":   { title: "Catálogo",    eyebrow: "Coleção · Boutique" },
  "/products":  { title: "Produtos",    eyebrow: "Acervo · Maison" },
  "/inventory": { title: "Estoque",     eyebrow: "Inventário · Atelier" },
  "/orders":    { title: "Pedidos",     eyebrow: "Atelier · Vendas" },
  "/customers": { title: "Clientes",    eyebrow: "Maison · Clientela" },
  "/labels":    { title: "Etiquetas",   eyebrow: "Identificação · QR" },
  "/reports":   { title: "Relatórios",  eyebrow: "Analítica · Maison" },
  "/settings":  { title: "Configurações", eyebrow: "Conta · Sistema" },
};

export function DashboardLayout() {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] || { title: "", eyebrow: "Maison" };
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) wsClient.connect();
    return () => wsClient.disconnect();
  }, [isAuthenticated]);

  return (
    <div className="flex h-screen bg-maison overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={meta.title} eyebrow={meta.eyebrow} />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="px-10 py-8"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
