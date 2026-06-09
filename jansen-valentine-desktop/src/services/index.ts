import api from "@/lib/api";
import type {
  Product, Customer, Order, Category,
  PageResponse, DashboardMetrics, LowStockItem,
} from "@/types";

// ── Products ───────────────────────────────────────────────
export const productsService = {
  list: async (params?: { page?: number; page_size?: number; search?: string; category_id?: number }) => {
    const { data } = await api.get<PageResponse<Product>>("/api/v1/products", { params });
    return data;
  },
  get: async (id: number) => (await api.get<Product>(`/api/v1/products/${id}`)).data,
  create: async (payload: any) => (await api.post<Product>("/api/v1/products", payload)).data,
  update: async (id: number, payload: any) =>
    (await api.patch<Product>(`/api/v1/products/${id}`, payload)).data,
  remove: async (id: number) => api.delete(`/api/v1/products/${id}`),
  featured: async (limit = 12) =>
    (await api.get<Product[]>(`/api/v1/catalog/featured?limit=${limit}`)).data,
};

// ── Categories ─────────────────────────────────────────────
export const categoriesService = {
  list: async () => (await api.get<Category[]>("/api/v1/categories")).data,
  create: async (payload: any) => (await api.post<Category>("/api/v1/categories", payload)).data,
  update: async (id: number, payload: any) =>
    (await api.patch<Category>(`/api/v1/categories/${id}`, payload)).data,
  remove: async (id: number) => api.delete(`/api/v1/categories/${id}`),
};

// ── Customers ──────────────────────────────────────────────
export const customersService = {
  list: async (params?: { page?: number; page_size?: number; search?: string; tier?: string }) => {
    const { data } = await api.get<PageResponse<Customer>>("/api/v1/customers", { params });
    return data;
  },
  get: async (id: number) => (await api.get<Customer>(`/api/v1/customers/${id}`)).data,
  create: async (payload: any) => (await api.post<Customer>("/api/v1/customers", payload)).data,
  update: async (id: number, payload: any) =>
    (await api.patch<Customer>(`/api/v1/customers/${id}`, payload)).data,
  remove: async (id: number) => api.delete(`/api/v1/customers/${id}`),
};

// ── Orders ─────────────────────────────────────────────────
export const ordersService = {
  list: async (params?: any) => {
    const { data } = await api.get<PageResponse<Order>>("/api/v1/orders", { params });
    return data;
  },
  get: async (id: number) => (await api.get<Order>(`/api/v1/orders/${id}`)).data,
  create: async (payload: any) => (await api.post<Order>("/api/v1/orders", payload)).data,
  update: async (id: number, payload: any) =>
    (await api.patch<Order>(`/api/v1/orders/${id}`, payload)).data,
  remove: async (id: number) => api.delete(`/api/v1/orders/${id}`),
};

// ── Dashboard ──────────────────────────────────────────────
export const dashboardService = {
  metrics: async () =>
    (await api.get<DashboardMetrics>("/api/v1/dashboard/metrics")).data,
};

// ── Inventory ──────────────────────────────────────────────
export const inventoryService = {
  lowStock: async () =>
    (await api.get<LowStockItem[]>("/api/v1/inventory/low-stock")).data,
  adjust: async (variant_id: number, delta: number, reason?: string) =>
    (await api.post("/api/v1/inventory/adjust", { variant_id, delta, type: "adjustment", reason })).data,
  value: async () =>
    (await api.get<{ total_value: number }>("/api/v1/inventory/value")).data,
  movements: async (limit = 30) =>
    (await api.get(`/api/v1/inventory/movements?limit=${limit}`)).data,
};

// ── Labels ─────────────────────────────────────────────────
export const labelsService = {
  generate: async (variant_ids: number[]): Promise<Blob> => {
    const { data } = await api.post("/api/v1/labels/generate",
      { variant_ids }, { responseType: "blob" });
    return data;
  },
};

// ── WhatsApp ───────────────────────────────────────────────
export const whatsappService = {
  shareProduct: async (product_id: number, phone?: string) =>
    (await api.post("/api/v1/whatsapp/share-product", { product_id, phone })).data,
  orderConfirmation: async (order_id: number) =>
    (await api.post("/api/v1/whatsapp/order-confirmation", { order_id })).data,
};
