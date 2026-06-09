import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { Logo } from "@/components/common/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);

  const [email, setEmail] = useState("admin@jansenvalentine.com");
  const [password, setPassword] = useState("admin123");
  const [showPwd, setShowPwd] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Bienvenue à la maison");
      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Credenciais inválidas");
    }
  }

  return (
    <div data-tauri-drag-region className="relative flex h-screen overflow-hidden bg-noir-950">
      {/* ── Left: Editorial Visual ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex relative w-1/2 overflow-hidden"
      >
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-wine-deep via-noir-950 to-noir-900" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(200,173,127,0.4), transparent 60%), radial-gradient(ellipse at bottom right, rgba(201,166,160,0.2), transparent 60%)",
          }}
        />

        {/* Rotating ornament */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="absolute -right-32 -top-32 w-[640px] h-[640px] rounded-full border border-champagne/15"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          className="absolute -right-16 -top-16 w-[480px] h-[480px] rounded-full border border-rosedust/15"
        />

        {/* Editorial content */}
        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          <div className="flex items-center justify-between">
            <Logo variant="mark" className="w-12 h-12" />
            <span className="font-mono text-[10px] uppercase tracking-editorial text-champagne/60">
              — Maison · MMXXVI —
            </span>
          </div>

          <div className="max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="editorial-eyebrow mb-6"
            >
              ◆ Boutique Management
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-display text-6xl text-ivory tracking-tight leading-[1.05]"
            >
              A elegância <br />
              <span className="italic text-gradient-champagne">torna-se</span><br />
              um sistema.
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="my-8 h-px w-24 bg-gradient-to-r from-champagne to-transparent origin-left"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-stone-light text-sm leading-relaxed max-w-sm"
            >
              Inventário, atelier de pedidos, clientela e catálogo —
              orquestrados em uma única plataforma desenhada para
              boutiques que se recusam ao comum.
            </motion.p>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-editorial text-champagne/50">
                Edição Maison
              </p>
              <p className="font-display text-xs text-ivory/70 italic mt-1">
                "Le détail fait la maison"
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-editorial text-stone/40">
              by ASTRAZ STUDIO
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Right: Form ────────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center px-6 bg-maison">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative corner-frame p-10"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <Logo variant="stacked" size="lg" />
          </div>

          <div className="mb-10">
            <p className="editorial-eyebrow mb-3">◇ Acesso · Atelier</p>
            <h2 className="font-display text-4xl text-ivory tracking-tight">
              Bem-vinda à <span className="italic text-gradient-champagne">maison</span>
            </h2>
            <p className="text-sm text-stone mt-3">
              Inicie a sessão para acessar o painel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              label="E-mail"
              placeholder="contato@maison.com"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <Input
              type={showPwd ? "text" : "password"}
              label="Senha"
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="text-stone hover:text-champagne transition-colors"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between text-2xs font-mono uppercase tracking-luxe">
              <label className="flex items-center gap-2 text-stone cursor-pointer">
                <input type="checkbox" className="w-3 h-3 accent-champagne bg-transparent border-stone rounded-sm" />
                Lembrar
              </label>
              <button type="button" className="text-champagne/70 hover:text-champagne transition-colors">
                Esqueceu?
              </button>
            </div>

            <Button
              type="submit"
              variant="ink"
              size="lg"
              loading={loading}
              iconRight={<ArrowRight className="w-4 h-4" />}
              className="w-full"
            >
              Entrar na Maison
            </Button>
          </form>

          <div className="maison-divider my-8">
            <span className="font-mono text-2xs uppercase tracking-editorial text-stone/50">
              · MMXXVI ·
            </span>
          </div>

          <p className="text-center text-2xs font-mono uppercase tracking-luxe text-stone/40">
            Powered by <span className="text-champagne/60">Astraz Studio</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
