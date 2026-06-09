import { useEffect, useState } from "react";
import { BarChart3, Download, Calendar, TrendingUp } from "lucide-react";
import { Panel, Pill, Divider } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { dashboardService } from "@/services";
import { formatBRL, formatCompactBRL } from "@/utils/format";
import type { DashboardMetrics } from "@/types";

export function Reports() {
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

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="editorial-eyebrow mb-2">◆ Analítica · Maison</p>
          <h1 className="font-display text-4xl text-ivory tracking-tight">
            Relatórios
          </h1>
          <p className="text-sm text-stone mt-2">
            A história da maison contada em números.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<Calendar className="w-4 h-4" />}>
            Período
          </Button>
          <Button variant="couture" icon={<Download className="w-4 h-4" />}>
            Exportar
          </Button>
        </div>
      </div>

      {loading || !data ? (
        <div className="space-y-5">
          <div className="h-80 shimmer rounded-lg bg-noir-900/40" />
          <div className="grid grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-44 shimmer rounded-lg bg-noir-900/40" />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Hero metrics */}
          <div className="grid grid-cols-3 gap-5">
            <Panel variant="elevated" className="p-7 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-champagne/10 blur-3xl" />
              <p className="editorial-eyebrow flex items-center gap-2 mb-3">
                <TrendingUp className="w-3 h-3" /> Receita · Anual
              </p>
              <p className="font-display text-4xl text-gradient-champagne tracking-tight">
                {formatCompactBRL(data.revenue_year)}
              </p>
              <Divider label="vs mês" className="my-4" />
              <p className="text-sm text-stone">
                Este mês: <span className="text-champagne font-mono">{formatBRL(data.revenue_month)}</span>
              </p>
            </Panel>

            <Panel variant="elevated" className="p-7">
              <p className="editorial-eyebrow mb-3">Ticket médio</p>
              <p className="font-display text-4xl text-ivory tracking-tight">{formatBRL(data.avg_ticket)}</p>
              <Divider label="pedidos confirmados" className="my-4" />
              <p className="text-sm text-stone">
                {data.orders_today} pedidos hoje
              </p>
            </Panel>

            <Panel variant="elevated" className="p-7">
              <p className="editorial-eyebrow mb-3">Clientela ativa</p>
              <p className="font-display text-4xl text-ivory tracking-tight">{data.customers_total}</p>
              <Divider label="novos no mês" className="my-4" />
              <p className="text-sm text-stone">
                <span className="text-success">+{data.customers_new_month}</span> novas clientes
              </p>
            </Panel>
          </div>

          {/* Big chart */}
          <Panel variant="elevated" className="p-7">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="editorial-eyebrow flex items-center gap-2">
                  <BarChart3 className="w-3 h-3" /> Curva · 30 dias
                </p>
                <h3 className="font-display text-xl text-ivory mt-1">Performance de vendas</h3>
              </div>
              <Pill color="text-champagne" bg="bg-champagne/10" border="border-champagne/30">
                {data.sales_chart.reduce((acc, p) => acc + p.orders, 0)} pedidos
              </Pill>
            </div>
            <SalesChart data={data.sales_chart} />
          </Panel>

          {/* Top products listing */}
          <Panel variant="elevated" className="p-7">
            <p className="editorial-eyebrow mb-2">◇ Best-sellers</p>
            <h3 className="font-display text-xl text-ivory">Peças mais vendidas</h3>

            <div className="mt-6 space-y-2">
              {data.top_products.map((p, i) => (
                <div
                  key={p.sku}
                  className="flex items-center justify-between p-4 rounded-md
                             border border-white/[0.04] hover:border-champagne/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-2xl text-champagne/40 w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-base text-ivory">{p.name}</p>
                      <p className="font-mono text-2xs text-stone mt-0.5">{p.sku}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="font-mono text-2xs uppercase tracking-luxe text-stone">Unidades</p>
                      <p className="font-display text-lg text-ivory">{p.quantity}</p>
                    </div>
                    <div className="text-right min-w-32">
                      <p className="font-mono text-2xs uppercase tracking-luxe text-stone">Receita</p>
                      <p className="font-display text-lg text-champagne">{formatBRL(p.revenue)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </>
      )}
    </div>
  );
}
