import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { formatBRL } from "@/utils/format";

interface Point {
  date: string;
  label: string;
  revenue: number;
  orders: number;
}

export function SalesChart({ data }: { data: Point[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8AD7F" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#C8AD7F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#7E7872", fontSize: 10, fontFamily: "JetBrains Mono" }}
            interval={4}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#7E7872", fontSize: 10, fontFamily: "JetBrains Mono" }}
            tickFormatter={(v) => {
              if (v >= 1000) return `${(v / 1000).toFixed(0)}k`;
              return String(v);
            }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0].payload as Point;
              return (
                <div className="bg-noir-900/95 backdrop-blur border border-champagne/20 rounded-md p-3 shadow-couture">
                  <p className="editorial-eyebrow mb-1.5">{label}</p>
                  <p className="font-display text-lg text-champagne">{formatBRL(p.revenue)}</p>
                  <p className="text-2xs font-mono uppercase tracking-luxe text-stone mt-1">
                    {p.orders} pedido{p.orders !== 1 ? "s" : ""}
                  </p>
                </div>
              );
            }}
            cursor={{ stroke: "rgba(200,173,127,0.3)", strokeWidth: 1, strokeDasharray: "3 3" }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#C8AD7F"
            strokeWidth={1.5}
            fill="url(#revenueGrad)"
            activeDot={{ r: 4, fill: "#C8AD7F", stroke: "#0a0807", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
