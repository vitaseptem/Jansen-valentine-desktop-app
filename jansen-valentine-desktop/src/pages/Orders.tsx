import { useEffect, useState } from "react";
import { Plus, Search, MessageCircle, MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

import { Panel, Pill, EmptyState } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { ordersService, whatsappService } from "@/services";
import { ORDER_STATUS_META } from "@/utils/constants";
import { formatBRL, formatDateTime } from "@/utils/format";
import type { Order, OrderStatus } from "@/types";

const STATUSES: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all",       label: "Todos" },
  { value: "pending",   label: "Pendentes" },
  { value: "confirmed", label: "Confirmados" },
  { value: "paid",      label: "Pagos" },
  { value: "shipped",   label: "Enviados" },
  { value: "delivered", label: "Entregues" },
  { value: "cancelled", label: "Cancelados" },
];

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    try {
      const r = await ordersService.list({
        page_size: 100,
        ...(filter !== "all" ? { status: filter } : {}),
        ...(search ? { search } : {}),
      });
      setOrders(r.items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [filter]);

  async function shareWhatsApp(orderId: number) {
    try {
      const { url, message } = await whatsappService.orderConfirmation(orderId);
      if (url) {
        window.open(url, "_blank");
      } else {
        navigator.clipboard.writeText(message);
        toast.success("Mensagem copiada para a área de transferência");
      }
    } catch {
      toast.error("Cliente não possui telefone cadastrado");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="editorial-eyebrow mb-2">◆ Atelier · Vendas</p>
          <h1 className="font-display text-4xl text-ivory tracking-tight">
            Pedidos
          </h1>
          <p className="text-sm text-stone mt-2">
            Acompanhe cada pedido do rascunho à entrega.
          </p>
        </div>
        <Button variant="ink" icon={<Plus className="w-4 h-4" />}>
          Novo pedido
        </Button>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`pill border transition-all ${
              filter === s.value
                ? "text-noir-900 bg-champagne border-champagne"
                : "text-stone bg-noir-900/40 border-white/[0.06] hover:border-champagne/30 hover:text-ivory"
            }`}
          >
            {s.label}
          </button>
        ))}
        <div className="flex-1" />
        <div className="relative w-72">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
          <input
            type="text"
            placeholder="Buscar pedido…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()}
            className="input-couture pl-10"
          />
        </div>
      </div>

      <Panel variant="elevated" className="overflow-hidden">
        {loading ? (
          <div className="p-12 shimmer h-96" />
        ) : orders.length === 0 ? (
          <EmptyState title="Nenhum pedido encontrado" hint="Crie o primeiro pedido para começar." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {["Pedido", "Data", "Itens", "Total", "Status", ""].map((h, i) => (
                    <th key={i} className="px-5 py-4 text-left font-mono text-2xs uppercase tracking-luxe text-stone/70">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const meta = ORDER_STATUS_META[o.status];
                  return (
                    <tr key={o.id} className="border-b border-white/[0.02] hover:bg-white/[0.015] transition-colors group">
                      <td className="px-5 py-4">
                        <p className="font-mono text-sm text-ivory">{o.order_number}</p>
                        {o.payment_method && (
                          <p className="font-mono text-2xs text-stone mt-0.5 uppercase tracking-luxe">
                            {o.payment_method}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs text-stone-light">{formatDateTime(o.created_at)}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-mono text-sm text-ivory">
                          {o.items.length} <span className="text-stone">peças</span>
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-display text-base text-champagne">{formatBRL(o.total)}</p>
                      </td>
                      <td className="px-5 py-4">
                        <Pill color={meta.color} bg={meta.bg} border={meta.border}>
                          {meta.label}
                        </Pill>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => shareWhatsApp(o.id)}
                            className="btn-icon text-success"
                            title="Enviar via WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button className="btn-icon">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
