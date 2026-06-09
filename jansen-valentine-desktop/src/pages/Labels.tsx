import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Printer, QrCode, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import { Panel, Pill, EmptyState } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { productsService, labelsService } from "@/services";
import { formatBRL } from "@/utils/format";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

export function Labels() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await productsService.list({ page_size: 80 });
        setProducts(r.items);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function toggleVariant(variantId: number) {
    setSelected((s) => {
      const n = new Set(s);
      n.has(variantId) ? n.delete(variantId) : n.add(variantId);
      return n;
    });
  }

  async function generate() {
    if (!selected.size) {
      toast.error("Selecione ao menos uma variante");
      return;
    }
    setGenerating(true);
    try {
      const blob = await labelsService.generate(Array.from(selected));
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `jansen-valentine-etiquetas.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Etiquetas geradas");
    } catch {
      toast.error("Erro ao gerar etiquetas");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="editorial-eyebrow mb-2">◆ Identificação · QR</p>
          <h1 className="font-display text-4xl text-ivory tracking-tight">
            Etiquetas
          </h1>
          <p className="text-sm text-stone mt-2">
            Imprima etiquetas elegantes com QR code para cada variante do acervo.
          </p>
        </div>
        <div className="flex gap-2 items-center">
          {selected.size > 0 && (
            <Pill color="text-champagne" bg="bg-champagne/10" border="border-champagne/30">
              {selected.size} selecionada{selected.size > 1 ? "s" : ""}
            </Pill>
          )}
          <Button
            variant="ink"
            icon={<Printer className="w-4 h-4" />}
            loading={generating}
            onClick={generate}
            disabled={selected.size === 0}
          >
            Imprimir PDF
          </Button>
        </div>
      </div>

      {/* Format info */}
      <Panel variant="default" className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-champagne/[0.08] flex items-center justify-center">
            <QrCode className="w-4 h-4 text-champagne" />
          </div>
          <div className="flex-1">
            <p className="font-display text-sm text-ivory">Formato A4 · 50×30mm por etiqueta</p>
            <p className="font-mono text-2xs uppercase tracking-luxe text-stone mt-0.5">
              Cada etiqueta inclui QR code, nome da peça, preço, tamanho, cor e SKU
            </p>
          </div>
        </div>
      </Panel>

      {/* Products with variants */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 shimmer rounded-lg bg-noir-900/40" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <Panel className="p-12">
          <EmptyState title="Sem peças cadastradas" />
        </Panel>
      ) : (
        <div className="space-y-4">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <Panel variant="elevated" className="overflow-hidden">
                {/* Product header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
                  <div>
                    <p className="font-display text-base text-ivory">{p.name}</p>
                    <p className="font-mono text-2xs text-stone mt-0.5">
                      {p.sku} · {formatBRL(p.sale_price)}
                    </p>
                  </div>
                  <Pill color="text-stone" bg="bg-noir-900/40" border="border-white/[0.06]">
                    {p.variants.length} variantes
                  </Pill>
                </div>

                {/* Variant grid */}
                <div className="grid grid-cols-6 gap-2 p-4">
                  {p.variants.map((v) => {
                    const isSelected = selected.has(v.id);
                    return (
                      <button
                        key={v.id}
                        onClick={() => toggleVariant(v.id)}
                        className={cn(
                          "relative px-3 py-2.5 rounded text-left transition-all duration-200",
                          "border",
                          isSelected
                            ? "border-champagne bg-champagne/10 text-ivory"
                            : "border-white/[0.04] bg-noir-900/40 text-stone hover:border-champagne/30 hover:text-ivory"
                        )}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-champagne absolute top-1.5 right-1.5" />
                        )}
                        <p className="font-mono text-2xs text-stone uppercase tracking-luxe">
                          {v.size || "—"}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          {v.color_hex && (
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-white/10"
                              style={{ background: v.color_hex }}
                            />
                          )}
                          <p className="text-xs truncate">{v.color || "—"}</p>
                        </div>
                        <p className="font-mono text-2xs text-stone/60 mt-1">
                          est. {v.stock_quantity}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </Panel>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
