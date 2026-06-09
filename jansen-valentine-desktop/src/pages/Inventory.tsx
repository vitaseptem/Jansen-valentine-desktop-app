import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Package, ArrowDownUp, History } from "lucide-react";
import toast from "react-hot-toast";

import { Panel, Pill, EmptyState } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { inventoryService } from "@/services";
import { formatBRL, timeAgo } from "@/utils/format";
import { cn } from "@/lib/cn";
import type { LowStockItem } from "@/types";

interface Movement {
  id: number;
  variant_id: number;
  type: string;
  quantity: number;
  quantity_before: number;
  quantity_after: number;
  reason?: string;
  created_at: string;
}

const TYPE_META: Record<string, { label: string; color: string; bg: string }> = {
  entry:      { label: "Entrada",   color: "text-success",   bg: "bg-success/10" },
  sale:       { label: "Venda",     color: "text-champagne", bg: "bg-champagne/10" },
  return:     { label: "Devolução", color: "text-info",      bg: "bg-info/10" },
  adjustment: { label: "Ajuste",    color: "text-stone",     bg: "bg-stone/10" },
  loss:       { label: "Perda",     color: "text-danger",    bg: "bg-danger/10" },
  transfer:   { label: "Transfer.", color: "text-rosedust",  bg: "bg-rosedust/10" },
};

export function Inventory() {
  const [lowStock, setLowStock] = useState<LowStockItem[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    setLoading(true);
    try {
      const [ls, mv, v] = await Promise.all([
        inventoryService.lowStock(),
        inventoryService.movements(30),
        inventoryService.value(),
      ]);
      setLowStock(ls);
      setMovements(mv);
      setTotalValue(v.total_value);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAll(); }, []);

  async function adjust(variantId: number, delta: number) {
    try {
      await inventoryService.adjust(variantId, delta, "Ajuste manual no atelier");
      toast.success("Estoque atualizado");
      loadAll();
    } catch {
      toast.error("Não foi possível atualizar");
    }
  }

  return (
    <div className="space-y-8">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex items-end justify-between">
        <div>
          <p className="editorial-eyebrow mb-2">◆ Inventário · Atelier</p>
          <h1 className="font-display text-4xl text-ivory tracking-tight">
            Controle de Estoque
          </h1>
          <p className="text-sm text-stone mt-2">
            Auditoria viva do acervo. Cada movimento registrado, cada peça rastreada.
          </p>
        </div>
        <Button variant="couture" icon={<History className="w-4 h-4" />}>
          Histórico
        </Button>
      </div>

      {/* ── Summary cards ──────────────────────────────── */}
      <div className="grid grid-cols-3 gap-5">
        <Panel variant="elevated" className="p-6">
          <p className="editorial-eyebrow flex items-center gap-2 mb-3">
            <Package className="w-3 h-3" /> Valor em estoque
          </p>
          <p className="font-display text-3xl text-champagne tracking-tight">
            {formatBRL(totalValue)}
          </p>
          <p className="font-mono text-2xs text-stone mt-2 uppercase tracking-luxe">
            ao custo de aquisição
          </p>
        </Panel>

        <Panel variant="elevated" className="p-6">
          <p className="editorial-eyebrow flex items-center gap-2 mb-3">
            <AlertTriangle className="w-3 h-3" /> Estoque crítico
          </p>
          <p className="font-display text-3xl text-danger tracking-tight">
            {lowStock.length}
          </p>
          <p className="font-mono text-2xs text-stone mt-2 uppercase tracking-luxe">
            variantes abaixo do limite
          </p>
        </Panel>

        <Panel variant="elevated" className="p-6">
          <p className="editorial-eyebrow flex items-center gap-2 mb-3">
            <ArrowDownUp className="w-3 h-3" /> Movimentos (recentes)
          </p>
          <p className="font-display text-3xl text-ivory tracking-tight">
            {movements.length}
          </p>
          <p className="font-mono text-2xs text-stone mt-2 uppercase tracking-luxe">
            últimas operações
          </p>
        </Panel>
      </div>

      {/* ── Low Stock Alert ────────────────────────────── */}
      <Panel variant="elevated" className="overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.04] flex items-center justify-between">
          <div>
            <p className="editorial-eyebrow">⚠ Alerta · Estoque baixo</p>
            <h3 className="font-display text-lg text-ivory mt-1">Variantes que pedem reposição</h3>
          </div>
        </div>
        {loading ? (
          <div className="p-12 shimmer h-48" />
        ) : lowStock.length === 0 ? (
          <EmptyState
            icon={<Package className="w-10 h-10" />}
            title="Inventário saudável"
            hint="Nenhuma variante abaixo do limite mínimo."
          />
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {lowStock.slice(0, 10).map((item, i) => (
              <motion.div
                key={item.variant_id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.01] transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={cn(
                    "w-10 h-10 rounded-md flex items-center justify-center shrink-0",
                    item.stock === 0 ? "bg-danger/15 text-danger" : "bg-warning/15 text-warning",
                  )}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-sm text-ivory truncate">{item.product_name}</p>
                    <p className="font-mono text-2xs text-stone mt-0.5">
                      {item.sku} · {item.size || "—"} · {item.color || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className={cn(
                      "font-display text-lg",
                      item.stock === 0 ? "text-danger" : "text-warning",
                    )}>
                      {item.stock}
                    </p>
                    <p className="font-mono text-2xs uppercase tracking-luxe text-stone">
                      mín · {item.threshold}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => adjust(item.variant_id, -1)} className="btn-icon" title="-1">−</button>
                    <button onClick={() => adjust(item.variant_id, +5)} className="btn-icon" title="+5">+5</button>
                    <button onClick={() => adjust(item.variant_id, +20)} className="btn-icon text-champagne" title="+20">+20</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Panel>

      {/* ── Recent movements ───────────────────────────── */}
      <Panel variant="elevated" className="overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.04]">
          <p className="editorial-eyebrow">◇ Auditoria · Movimentos</p>
          <h3 className="font-display text-lg text-ivory mt-1">Últimas operações</h3>
        </div>
        {movements.length === 0 ? (
          <EmptyState title="Sem movimentos recentes" />
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {movements.slice(0, 15).map((m) => {
              const meta = TYPE_META[m.type] ?? TYPE_META.adjustment;
              return (
                <div key={m.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-white/[0.01]">
                  <div className="flex items-center gap-4">
                    <Pill color={meta.color} bg={meta.bg} border="border-white/[0.06]">
                      {meta.label}
                    </Pill>
                    <p className="text-sm text-stone-light">
                      Variante <span className="font-mono text-ivory">#{m.variant_id}</span>
                    </p>
                    {m.reason && (
                      <p className="text-xs text-stone italic">"{m.reason}"</p>
                    )}
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className={cn(
                        "font-mono text-sm",
                        m.quantity > 0 ? "text-success" : "text-danger",
                      )}>
                        {m.quantity > 0 ? "+" : ""}{m.quantity}
                      </p>
                      <p className="font-mono text-2xs text-stone mt-0.5">
                        {m.quantity_before} → {m.quantity_after}
                      </p>
                    </div>
                    <p className="font-mono text-2xs text-stone w-28 text-right">
                      {timeAgo(m.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Panel>
    </div>
  );
}
