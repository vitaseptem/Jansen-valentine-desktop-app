import { motion } from "framer-motion";
import { Eye, Share2, Tag } from "lucide-react";
import { formatBRL } from "@/utils/format";
import type { Product } from "@/types";
import { cn } from "@/lib/cn";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  delay?: number;
}

export function ProductCard({ product, onClick, delay = 0 }: ProductCardProps) {
  const hasPromo = product.promo_price && product.promo_price < product.sale_price;
  const lowStock = product.total_stock <= 5;

  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group relative text-left overflow-hidden rounded-md
                 bg-noir-900/40 border border-white/[0.03]
                 hover:border-champagne/25 transition-all duration-500"
    >
      {/* Image area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-noir-800 to-noir-900">
        {product.cover_image ? (
          <img
            src={product.cover_image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out
                       group-hover:scale-105"
          />
        ) : (
          // Placeholder editorial pattern
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-rosedust/10 via-transparent to-wine/10" />
            <Tag className="w-10 h-10 text-stone/30" strokeWidth={1} />
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_featured && (
            <span className="px-2 py-0.5 rounded-full font-mono text-2xs uppercase tracking-luxe
                             bg-champagne text-noir-900">
              ★ Destaque
            </span>
          )}
          {hasPromo && (
            <span className="px-2 py-0.5 rounded-full font-mono text-2xs uppercase tracking-luxe
                             bg-wine text-ivory">
              Em oferta
            </span>
          )}
          {lowStock && (
            <span className="px-2 py-0.5 rounded-full font-mono text-2xs uppercase tracking-luxe
                             bg-danger/80 text-ivory">
              Últimas peças
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950/95 via-noir-950/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end
                        translate-y-2 group-hover:translate-y-0
                        opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex gap-2">
            <span className="w-8 h-8 rounded flex items-center justify-center
                             bg-ivory/95 text-noir-900 backdrop-blur">
              <Eye className="w-3.5 h-3.5" />
            </span>
            <span className="w-8 h-8 rounded flex items-center justify-center
                             bg-noir-900/80 text-champagne border border-champagne/40 backdrop-blur">
              <Share2 className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {product.category && (
          <p className="editorial-eyebrow mb-1.5">{product.category.name}</p>
        )}
        <p className="font-display text-base text-ivory truncate group-hover:text-champagne transition-colors">
          {product.name}
        </p>
        <p className="font-mono text-2xs text-stone mt-1">{product.sku}</p>

        <div className="flex items-end justify-between mt-3 pt-3 border-t border-white/[0.04]">
          <div>
            {hasPromo ? (
              <>
                <p className="font-mono text-2xs line-through text-stone/50">
                  {formatBRL(product.sale_price)}
                </p>
                <p className="font-display text-lg text-champagne">
                  {formatBRL(product.promo_price!)}
                </p>
              </>
            ) : (
              <p className="font-display text-lg text-champagne">
                {formatBRL(product.sale_price)}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-2xs font-mono uppercase tracking-luxe text-stone">Estoque</p>
            <p className={cn(
              "font-mono text-xs",
              lowStock ? "text-danger" : "text-ivory",
            )}>
              {product.total_stock}
            </p>
          </div>
        </div>

        {/* Color dots */}
        {product.variants.length > 0 && (
          <div className="flex items-center gap-1 mt-3">
            {Array.from(new Set(product.variants.map((v) => v.color_hex).filter(Boolean)))
              .slice(0, 5)
              .map((hex, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-white/10"
                  style={{ background: hex || "#999" }}
                />
              ))}
            {product.variants.length > 5 && (
              <span className="ml-1 font-mono text-2xs text-stone">+{product.variants.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </motion.button>
  );
}
