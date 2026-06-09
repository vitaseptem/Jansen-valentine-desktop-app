import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { Panel, EmptyState, Pill } from "@/components/ui/Panel";
import { ProductCard } from "@/components/catalog/ProductCard";
import { productsService, categoriesService } from "@/services";
import type { Product, Category } from "@/types";

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [cats, list] = await Promise.all([
          categoriesService.list(),
          productsService.list({ page_size: 100 }),
        ]);
        setCategories(cats);
        setProducts(list.items);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (showFeaturedOnly && !p.is_featured) return false;
      if (categoryId && p.category?.id !== categoryId) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [products, search, categoryId, showFeaturedOnly]);

  return (
    <div className="space-y-8">
      {/* ── Editorial header ──────────────────────────── */}
      <div className="relative overflow-hidden rounded-lg border border-champagne/10 bg-gradient-to-br from-wine-deep/40 via-noir-900 to-noir-950 p-10">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top right, rgba(200,173,127,0.25), transparent 50%)",
          }}
        />
        <div className="relative">
          <p className="editorial-eyebrow mb-3">◇ Coleção · MMXXVI</p>
          <h1 className="font-display text-5xl text-ivory tracking-tight max-w-3xl leading-[1.05]">
            Uma <span className="italic text-gradient-champagne">coleção</span> que
            respira <span className="italic">detalhe</span>.
          </h1>
          <p className="text-stone mt-4 max-w-xl">
            Explore o acervo curado da Maison. Filtre por categoria, descubra os
            destaques e prepare suas próximas vendas.
          </p>
          <div className="mt-6 flex gap-3">
            <Pill color="text-champagne" bg="bg-champagne/10" border="border-champagne/30">
              {products.length} peças no acervo
            </Pill>
            <Pill color="text-rosedust" bg="bg-rosedust/10" border="border-rosedust/30">
              {products.filter((p) => p.is_featured).length} em destaque
            </Pill>
          </div>
        </div>
      </div>

      {/* ── Filters ─────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
            <input
              type="text"
              placeholder="Buscar uma peça…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-couture pl-10"
            />
          </div>
          <button
            onClick={() => setShowFeaturedOnly((v) => !v)}
            className={`btn-couture ${showFeaturedOnly ? "bg-champagne text-noir-900" : ""}`}
          >
            <Star className="w-3.5 h-3.5" />
            Destaques
          </button>
          <button className="btn-icon w-10 h-10">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Category filter pills ──────────────────── */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoryId(null)}
          className={`pill border transition-all ${
            categoryId === null
              ? "text-noir-900 bg-champagne border-champagne"
              : "text-stone bg-noir-900/40 border-white/[0.06] hover:border-champagne/30 hover:text-ivory"
          }`}
        >
          Todas
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryId(cat.id)}
            className={`pill border transition-all ${
              categoryId === cat.id
                ? "text-noir-900 bg-champagne border-champagne"
                : "text-stone bg-noir-900/40 border-white/[0.06] hover:border-champagne/30 hover:text-ivory"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ── Grid ───────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-md shimmer bg-noir-900/40" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Panel className="p-12">
          <EmptyState
            title="Nenhuma peça encontrada"
            hint="Ajuste os filtros ou adicione novas peças ao acervo."
          />
        </Panel>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 0.04} />
          ))}
        </div>
      )}
    </div>
  );
}
