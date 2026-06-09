import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

import { Panel, Pill, EmptyState } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { customersService } from "@/services";
import { TIER_META } from "@/utils/constants";
import { formatBRL, initials, timeAgo } from "@/utils/format";
import { cn } from "@/lib/cn";
import type { Customer } from "@/types";

const TIERS = [
  { value: "all",      label: "Todas" },
  { value: "platinum", label: "Platinum" },
  { value: "gold",     label: "Gold" },
  { value: "silver",   label: "Silver" },
  { value: "bronze",   label: "Bronze" },
];

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<string>("all");
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    try {
      const r = await customersService.list({
        page_size: 60,
        ...(tier !== "all" ? { tier } : {}),
        ...(search ? { search } : {}),
      });
      setCustomers(r.items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [tier]);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="editorial-eyebrow mb-2">◆ Maison · Clientela</p>
          <h1 className="font-display text-4xl text-ivory tracking-tight">
            Clientes
          </h1>
          <p className="text-sm text-stone mt-2">
            Cada cliente, uma relação cultivada. Conheça a clientela da maison.
          </p>
        </div>
        <Button variant="ink" icon={<Plus className="w-4 h-4" />}>
          Nova cliente
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {TIERS.map((t) => {
          const meta = t.value !== "all" ? TIER_META[t.value] : null;
          return (
            <button
              key={t.value}
              onClick={() => setTier(t.value)}
              className={cn(
                "pill border transition-all",
                tier === t.value
                  ? "text-noir-900 bg-champagne border-champagne"
                  : "text-stone bg-noir-900/40 border-white/[0.06] hover:border-champagne/30 hover:text-ivory"
              )}
            >
              {meta && <span>{meta.symbol}</span>}
              {t.label}
            </button>
          );
        })}
        <div className="flex-1" />
        <div className="relative w-72">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
          <input
            type="text"
            placeholder="Buscar cliente…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()}
            className="input-couture pl-10"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-44 rounded-lg shimmer bg-noir-900/40" />
          ))}
        </div>
      ) : customers.length === 0 ? (
        <Panel className="p-12">
          <EmptyState title="Nenhuma cliente encontrada" />
        </Panel>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {customers.map((c, i) => {
            const tierMeta = TIER_META[c.tier] || TIER_META.bronze;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Panel variant="elevated" className="p-6 hover:border-champagne/20 transition-all duration-500 group cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-champagne to-rosedust-dark
                                      flex items-center justify-center text-noir-900 font-display text-base">
                        {initials(c.name)}
                      </div>
                      <div>
                        <p className="font-display text-base text-ivory">{c.name}</p>
                        {c.city && (
                          <p className="font-mono text-2xs text-stone mt-0.5 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />
                            {c.city}{c.state && `, ${c.state}`}
                          </p>
                        )}
                      </div>
                    </div>
                    <Pill color={tierMeta.color} bg={tierMeta.bg} border="border-white/[0.06]">
                      {tierMeta.symbol} {tierMeta.label}
                    </Pill>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/[0.04]">
                    <div>
                      <p className="font-mono text-2xs uppercase tracking-luxe text-stone">Pedidos</p>
                      <p className="font-display text-base text-ivory mt-0.5">{c.total_orders}</p>
                    </div>
                    <div>
                      <p className="font-mono text-2xs uppercase tracking-luxe text-stone">LTV</p>
                      <p className="font-display text-base text-champagne mt-0.5">
                        {formatBRL(c.total_spent)}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-2xs uppercase tracking-luxe text-stone">Ticket</p>
                      <p className="font-display text-base text-ivory mt-0.5">
                        {formatBRL(c.avg_ticket)}
                      </p>
                    </div>
                  </div>

                  {/* Contact row */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      {c.whatsapp && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/${c.whatsapp?.replace(/\D/g, "")}`, "_blank");
                          }}
                          className="btn-icon text-success"
                          title={c.whatsapp}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      )}
                      {c.email && (
                        <button className="btn-icon" title={c.email}>
                          <Mail className="w-4 h-4" />
                        </button>
                      )}
                      {c.phone && (
                        <button className="btn-icon" title={c.phone}>
                          <Phone className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="font-mono text-2xs text-stone/60 uppercase tracking-luxe">
                      desde {timeAgo(c.created_at).replace("há ", "")}
                    </p>
                  </div>
                </Panel>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
