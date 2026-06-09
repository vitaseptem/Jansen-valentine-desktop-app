import { Settings as SettingsIcon, User as UserIcon, Bell, Shield, Database, Cable } from "lucide-react";
import { Panel, Divider, Pill } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { initials } from "@/utils/format";

const SECTIONS = [
  { id: "profile",    icon: UserIcon, label: "Perfil",        hint: "Identidade da maison" },
  { id: "system",     icon: SettingsIcon, label: "Sistema",   hint: "Comportamento geral" },
  { id: "notifications", icon: Bell, label: "Notificações", hint: "Alertas e eventos" },
  { id: "security",   icon: Shield,   label: "Segurança",     hint: "Senha · sessões" },
  { id: "integrations", icon: Cable, label: "Integrações", hint: "WhatsApp · APIs" },
  { id: "data",       icon: Database, label: "Dados",         hint: "Backup · exportação" },
];

export function Settings() {
  const user = useAuthStore((s) => s.user);
  const wsStatus = useUIStore((s) => s.wsStatus);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <p className="editorial-eyebrow mb-2">◆ Conta · Sistema</p>
        <h1 className="font-display text-4xl text-ivory tracking-tight">
          Configurações
        </h1>
        <p className="text-sm text-stone mt-2">
          Personalize a experiência da maison e suas integrações.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <Panel variant="elevated" className="p-3 h-fit sticky top-4">
          <p className="px-3 py-2 editorial-eyebrow">Seções</p>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-left
                         text-stone hover:text-ivory hover:bg-white/[0.02] transition-colors"
            >
              <s.icon className="w-3.5 h-3.5" />
              <span className="font-sans text-sm">{s.label}</span>
            </button>
          ))}
        </Panel>

        {/* Profile section */}
        <div className="col-span-3 space-y-6">
          <Panel variant="elevated" className="p-7">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-champagne to-rosedust-dark
                              flex items-center justify-center text-noir-900 font-display text-2xl">
                {user ? initials(user.name) : "—"}
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl text-ivory">{user?.name}</h2>
                <p className="text-sm text-stone mt-1">{user?.email}</p>
                <div className="flex gap-2 mt-2">
                  <Pill color="text-champagne" bg="bg-champagne/10" border="border-champagne/30">
                    {user?.role}
                  </Pill>
                  <Pill color="text-success" bg="bg-success/10" border="border-success/30">
                    Ativo
                  </Pill>
                </div>
              </div>
              <Button variant="outline">Alterar foto</Button>
            </div>

            <Divider label="dados pessoais" />

            <div className="grid grid-cols-2 gap-5 mt-6">
              <Input label="Nome completo" defaultValue={user?.name || ""} />
              <Input label="E-mail" type="email" defaultValue={user?.email || ""} />
              <Input label="Telefone" placeholder="+55 98 9..." />
              <Input label="Cargo" defaultValue={user?.role || ""} disabled />
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="ink">Salvar alterações</Button>
            </div>
          </Panel>

          {/* System status */}
          <Panel variant="elevated" className="p-7">
            <p className="editorial-eyebrow mb-1">◇ Sistema</p>
            <h3 className="font-display text-xl text-ivory mb-5">Status & Versão</h3>

            <div className="space-y-3">
              {[
                { label: "Conexão API",        value: "online", color: "text-success" },
                { label: "WebSocket realtime", value: wsStatus, color: wsStatus === "online" ? "text-success" : "text-warning" },
                { label: "Versão do app",      value: "v1.0.0", color: "text-ivory" },
                { label: "Build",              value: "Maison 2026", color: "text-champagne" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                  <span className="text-sm text-stone-light">{row.label}</span>
                  <span className={`font-mono text-2xs uppercase tracking-luxe ${row.color}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel variant="elevated" className="p-7">
            <p className="editorial-eyebrow mb-1">◇ Integração</p>
            <h3 className="font-display text-xl text-ivory mb-5">WhatsApp Business</h3>
            <p className="text-sm text-stone mb-5">
              Configure o token do WhatsApp Cloud API para envios automáticos.
              Sem o token, o sistema usará links wa.me como fallback.
            </p>
            <div className="space-y-4">
              <Input label="API URL" placeholder="https://graph.facebook.com/v18.0" />
              <Input label="Phone Number ID" placeholder="••••••••••••••••" />
              <Input label="Access Token" type="password" placeholder="••••••••••••••••" />
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="couture">Conectar</Button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
