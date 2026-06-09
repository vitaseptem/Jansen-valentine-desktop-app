import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

import { Splash } from "@/pages/Splash";
import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";
import { Catalog } from "@/pages/Catalog";
import { Products } from "@/pages/Products";
import { Inventory } from "@/pages/Inventory";
import { Orders } from "@/pages/Orders";
import { Customers } from "@/pages/Customers";
import { Labels } from "@/pages/Labels";
import { Reports } from "@/pages/Reports";
import { Settings } from "@/pages/Settings";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

export default function App() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await hydrate();
      setReady(true);
    })();
  }, [hydrate]);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center bg-maison">
        <div className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" style={{ animationDelay: "200ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />

      <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/catalog"    element={<Catalog />} />
        <Route path="/products"   element={<Products />} />
        <Route path="/inventory"  element={<Inventory />} />
        <Route path="/orders"     element={<Orders />} />
        <Route path="/customers"  element={<Customers />} />
        <Route path="/labels"     element={<Labels />} />
        <Route path="/reports"    element={<Reports />} />
        <Route path="/settings"   element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
