import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, icon, iconRight, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block font-mono text-2xs uppercase tracking-luxe text-stone/80">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-noir-900/60 border border-white/[0.06] rounded",
              "px-4 py-2.5 text-sm text-ivory placeholder:text-stone/40",
              "focus:outline-none focus:border-champagne/50 focus:bg-noir-900/90",
              "transition-all duration-200",
              icon && "pl-10",
              iconRight && "pr-10",
              error && "border-danger/50 focus:border-danger/70",
              className,
            )}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone">
              {iconRight}
            </div>
          )}
        </div>
        {(hint || error) && (
          <p className={cn(
            "text-2xs font-mono tracking-wide",
            error ? "text-danger" : "text-stone/60",
          )}>
            {error || hint}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
