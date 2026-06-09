import { useEffect, useState } from "react";
import { Plus, Search, MoreVertical, Tag, Star } from "lucide-react";
import { Panel, Pill, EmptyState } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { productsService } from "@/services";
import { formatBRL, formatDate } from "@/utils/format";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await productsService.list({ page_size: 100 });
        setProducts(r.items);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = products.filter((p) =>
    !search ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="editorial-eyebrow mb-2">◆ Acervo · Maison</p>
          <h1 className="font-display text-4xl text-ivory tracking-tight">
            Produtos
          </h1>
          <p className="text-sm text-stone mt-2">
            Gerencie cada peça do seu acervo com precisão couture.
          </p>
        </div>
        <Button variant="ink" icon={<Plus className="w-4 h-4" />}>
          Nova Peça
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
          <input
            type="text"
            placeholder="Buscar por nome ou SKU…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-couture pl-10"
          />
        </div>
        <Pill color="text-stone" bg="bg-noir-900/40" border="border-white/[0.06]">
          {filtered.length} peças
        </Pill>
      </div>

      {/* Table */}
      <Panel variant="elevated" className="overflow-hidden">
        {loading ? (
          <div className="p-12 shimmer h-96" />
        ) : filtered.length === 0 ? (
          <EmptyState icon={<Tag className="w-10 h-10" />} title="Nenhuma peça encontrada" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {["Peça", "Categoria", "Preço", "Custo", "Estoque", "Status", ""].map((h, i) => (
                    <th
                      key={i}
                      className="px-5 py-4 text-left font-mono text-2xs uppercase tracking-luxe text-stone/70"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const margin = ((p.sale_price - p.cost_price) / p.sale_price) * 100;
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-white/[0.02] hover:bg-white/[0.015] transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 rounded shrink-0 bg-gradient-to-br from-noir-800 to-noir-900
                                          border border-white/[0.04] flex items-center justify-center">
                            {p.cover_image ? (
                              <img src={p.cover_image} alt="" className="w-full h-full object-cover rounded" />
                            ) : (
                              <Tag className="w-3.5 h-3.5 text-stone/40" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-display text-sm text-ivory truncate">{p.name}</p>
                              {p.is_featured && <Star className="w-3 h-3 text-champagne fill-champagne" />}
                            </div>
                            <p className="font-mono text-2xs text-stone mt-0.5">{p.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-stone">{p.category?.name || "—"}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-display text-sm text-champagne">{formatBRL(p.sale_price)}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-mono text-xs text-stone">{formatBRL(p.cost_price)}</p>
                          <p className="font-mono text-2xs text-success/80 mt-0.5">{margin.toFixed(0)}% margem</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className={cn(
                          "font-mono text-sm",
                          p.total_stock <= 5 ? "text-danger" : "text-ivory"
                        )}>
                          {p.total_stock}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        {p.is_active ? (
                          <Pill color="text-success" bg="bg-success/10" border="border-success/30">
                            Ativo
                          </Pill>
                        ) : (
                          <Pill color="text-stone" bg="bg-stone/10" border="border-stone/20">
                            Inativo
                          </Pill>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="btn-icon opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </button>
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
