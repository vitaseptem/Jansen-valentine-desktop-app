import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "couture" | "ghost" | "outline" | "ink" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const variants: Record<Variant, string> = {
  couture: "border border-champagne/30 bg-champagne/[0.04] text-champagne hover:bg-champagne hover:text-noir-900 hover:border-champagne hover:shadow-glow",
  ghost:   "text-stone hover:text-ivory hover:bg-white/[0.03]",
  outline: "border border-white/10 bg-transparent text-ivory hover:border-champagne/40 hover:bg-white/[0.02]",
  ink:     "bg-ivory text-noir-900 hover:bg-champagne",
  danger:  "border border-danger/40 bg-danger/[0.08] text-danger hover:bg-danger hover:text-ivory",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[11px]",
  md: "h-10 px-5 text-xs",
  lg: "h-12 px-7 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "couture", size = "md", loading, icon, iconRight, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-luxe",
          "transition-all duration-300 ease-out rounded",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : icon}
        {children}
        {!loading && iconRight}
      </button>
    );
  },
);
Button.displayName = "Button";
