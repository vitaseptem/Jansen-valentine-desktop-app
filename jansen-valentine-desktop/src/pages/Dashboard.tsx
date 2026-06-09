import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Banknote, ShoppingBag, Heart, AlertTriangle, TrendingUp,
  Package, ArrowUpRight, Sparkles,
} from "lucide-react";

import { Panel, Pill } from "@/components/ui/Panel";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { dashboardService } from "@/services";
import { ORDER_STATUS_META } from "@/utils/constants";
import { formatBRL, formatCompactBRL, timeAgo } from "@/utils/format";
import { useAuthStore } from "@/store/authStore";
import type { DashboardMetrics } from "@/types";

export function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const d = await dashboardService.metrics();
        setData(d);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !data) {
    return (
      <div className="grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="stat-card h-36 shimmer" />
        ))}
      </div>
    );
  }

  const firstName = user?.name.split(" ")[0] || "Maison";

  return (
    <div className="space-y-8">
      {/* ── Salutation ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between"
      >
        <div>
          <p className="editorial-eyebrow flex items-center gap-2 mb-2">
            <Sparkles className="w-3 h-3" />
            Bem-vinda, {firstName}
          </p>
          <h1 className="font-display text-4xl text-ivory tracking-tight">
            O atelier <span className="italic text-gradient-champagne">desperta</span>.
          </h1>
          <p className="text-sm text-stone mt-2">
            Acompanhe em tempo real o pulso da sua maison.
          </p>
        </div>
        <div className="flex gap-2">
          <Pill color="text-champagne" bg="bg-champagne/10" border="border-champagne/30">
            {data.orders_pending} pedidos aguardando
          </Pill>
        </div>
      </motion.div>

      {/* ── KPI Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-5">
        <KPICard
          eyebrow="Receita do mês"
          value={formatCompactBRL(data.revenue_month)}
          hint={`Hoje · ${formatBRL(data.revenue_today)}`}
          icon={Banknote}
          accent="champagne"
          delay={0.05}
        />
        <KPICard
          eyebrow="Pedidos hoje"
          value={String(data.orders_today)}
          hint={`${data.orders_pending} pendentes`}
          icon={ShoppingBag}
          accent="rosedust"
          delay={0.1}
        />
        <KPICard
          eyebrow="Clientela"
          value={String(data.customers_total)}
          hint={`+${data.customers_new_month} este mês`}
          icon={Heart}
          accent="wine"
          delay={0.15}
        />
        <KPICard
          eyebrow="Estoque crítico"
          value={String(data.products_low_stock)}
          hint={`${data.products_total} produtos ativos`}
          icon={AlertTriangle}
          accent="stone"
          delay={0.2}
        />
      </div>

      {/* ── Main grid: Chart + Recent ─────────────────── */}
      <div className="grid grid-cols-3 gap-5">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="col-span-2"
        >
          <Panel variant="elevated" className="p-7">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="editorial-eyebrow flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" />
                  Receita · 30 dias
                </p>
                <p className="font-display text-3xl text-ivory tracking-tight mt-1">
                  {formatBRL(data.revenue_month)}
                </p>
                <p className="text-2xs font-mono uppercase tracking-luxe text-stone mt-1">
                  Ticket médio · <span className="text-champagne">{formatBRL(data.avg_ticket)}</span>
                </p>
              </div>
            </div>
            <SalesChart data={data.sales_chart} />
          </Panel>
        </motion.div>

        {/* Recent orders */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <Panel variant="elevated" className="p-7 h-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="editorial-eyebrow">◆ Atelier</p>
                <h3 className="font-display text-lg text-ivory mt-1">Pedidos recentes</h3>
              </div>
              <button className="btn-icon">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {data.recent_orders.slice(0, 6).map((o, i) => {
                const meta = ORDER_STATUS_META[o.status as keyof typeof ORDER_STATUS_META] ?? ORDER_STATUS_META.pending;
                return (
                  <motion.div
                    key={o.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="group flex items-center justify-between py-2.5 px-3 -mx-3 rounded
                               hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-ivory truncate">{o.order_number}</p>
                      <p className="text-2xs text-stone mt-0.5">{timeAgo(o.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-display text-sm text-champagne">
                        {formatBRL(o.total)}
                      </span>
                      <Pill color={meta.color} bg={meta.bg} border={meta.border}>
                        {meta.label}
                      </Pill>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Panel>
        </motion.div>
      </div>

      {/* ── Top products ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <Panel variant="elevated" className="p-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="editorial-eyebrow flex items-center gap-2">
                <Package className="w-3 h-3" />
                Mais procurados · 30 dias
              </p>
              <h3 className="font-display text-lg text-ivory mt-1">Coleção em destaque</h3>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {data.top_products.slice(0, 6).map((p, i) => (
              <motion.div
                key={p.sku}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="group relative overflow-hidden p-5 rounded-md
                           bg-gradient-to-br from-noir-800/40 to-noir-900/20
                           border border-white/[0.04]
                           hover:border-champagne/20 transition-all duration-500"
              >
                <p className="font-mono text-2xs uppercase tracking-luxe text-champagne/60 mb-3">
                  Posição {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display text-base text-ivory truncate">{p.name}</p>
                <p className="font-mono text-2xs text-stone mt-1">{p.sku}</p>
                <div className="flex items-end justify-between mt-4 pt-4 border-t border-white/[0.04]">
                  <div>
                    <p className="text-2xs font-mono uppercase tracking-luxe text-stone">Receita</p>
                    <p className="font-display text-base text-champagne">{formatBRL(p.revenue)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xs font-mono uppercase tracking-luxe text-stone">Vendidos</p>
                    <p className="font-display text-base text-ivory">{p.quantity}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>
      </motion.div>
    </div>
  );
}
