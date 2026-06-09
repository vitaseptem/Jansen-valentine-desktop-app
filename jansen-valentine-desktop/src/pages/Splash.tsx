import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/common/Logo";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/login", { replace: true }), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div data-tauri-drag-region className="relative flex h-screen items-center justify-center bg-maison overflow-hidden">
      {/* Spotlight wash */}
      <div className="absolute inset-0 bg-spotlight" />

      {/* Ornamental ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ opacity: 0.6, scale: 1, rotate: 360 }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        className="absolute w-[520px] h-[520px] rounded-full border border-champagne/10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.1, rotate: 360 }}
        animate={{ opacity: 0.4, scale: 1, rotate: 0 }}
        transition={{ duration: 36, ease: "linear", repeat: Infinity }}
        className="absolute w-[360px] h-[360px] rounded-full border border-rosedust/10"
      />

      {/* Center mark */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center gap-8"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Logo variant="mark" className="w-24 h-24" />
        </motion.div>

        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-display text-5xl text-gradient-champagne tracking-tight"
          >
            Jansen<span className="italic font-normal"> Valentine</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="my-3 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-champagne to-transparent origin-center"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-editorial text-champagne/60"
          >
            — Boutique Management System —
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-4 flex items-center gap-2"
        >
          <div className="flex gap-1.5">
            <span className="w-1 h-1 rounded-full bg-champagne animate-pulse" style={{ animationDelay: "0ms" }} />
            <span className="w-1 h-1 rounded-full bg-champagne animate-pulse" style={{ animationDelay: "200ms" }} />
            <span className="w-1 h-1 rounded-full bg-champagne animate-pulse" style={{ animationDelay: "400ms" }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom signature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 font-mono text-[10px] uppercase tracking-editorial text-stone/40"
      >
        by ASTRAZ STUDIO
      </motion.div>
    </div>
  );
}
