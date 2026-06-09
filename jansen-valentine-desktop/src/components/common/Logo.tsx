import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "mark" | "stacked";
}

export function Logo({ className, size = "md", variant = "full" }: LogoProps) {
  const sizes = {
    sm: { wordmark: "text-sm",   subtitle: "text-[8px]"  },
    md: { wordmark: "text-lg",   subtitle: "text-[9px]"  },
    lg: { wordmark: "text-2xl",  subtitle: "text-[10px]" },
    xl: { wordmark: "text-4xl",  subtitle: "text-xs"     },
  } as const;

  if (variant === "mark") {
    return (
      <div className={cn("relative inline-flex items-center justify-center", className)}>
        <svg viewBox="0 0 60 60" className="w-full h-full">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"  stopColor="#E5D5B5" />
              <stop offset="50%" stopColor="#C8AD7F" />
              <stop offset="100%" stopColor="#9B8358" />
            </linearGradient>
          </defs>
          {/* Outer rim */}
          <circle cx="30" cy="30" r="28" fill="none" stroke="url(#logoGrad)" strokeWidth="0.5" />
          {/* Inner ornamental V */}
          <path
            d="M 18 18 L 30 42 L 42 18"
            fill="none"
            stroke="url(#logoGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center dot */}
          <circle cx="30" cy="30" r="1.2" fill="url(#logoGrad)" />
          {/* Inner subtle frame */}
          <circle cx="30" cy="30" r="22" fill="none" stroke="url(#logoGrad)" strokeWidth="0.2" opacity="0.4" />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn(
      "inline-flex items-baseline gap-2",
      variant === "stacked" && "flex-col items-center gap-1",
      className
    )}>
      <span className={cn(
        "font-display font-medium text-gradient-champagne tracking-tight",
        sizes[size].wordmark
      )}>
        Jansen<span className="font-display italic font-normal">Valentine</span>
      </span>
      {variant === "stacked" && (
        <span className={cn(
          "font-mono uppercase tracking-editorial text-stone/60",
          sizes[size].subtitle
        )}>
          — Boutique Management —
        </span>
      )}
    </div>
  );
}
