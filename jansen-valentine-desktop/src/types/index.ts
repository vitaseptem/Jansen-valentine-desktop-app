// ──────────────────────────────────────────────────────────
// JANSEN VALENTINE — Shared Types
// ──────────────────────────────────────────────────────────

export interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "manager" | "staff" | "viewer";
  avatar_url?: string | null;
  is_active: boolean;
  created_at: string;
  last_login_at?: string | null;
}

export interface TokenBundle {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface LoginResponse {
  user: User;
  tokens: TokenBundle;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  parent_id?: number | null;
  sort_order: number;
  created_at: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  sku_variant: string;
  size?: string | null;
  color?: string | null;
  color_hex?: string | null;
  stock_quantity: number;
  low_stock_threshold: number;
  barcode?: string | null;
}

export interface ProductImage {
  id: number;
  url: string;
  sort_order: number;
  is_cover: boolean;
}

export interface Product {
  id: number;
  sku: string;
  slug: string;
  name: string;
  description?: string | null;
  category?: Pick<Category, "id" | "name" | "slug"> | null;
  category_id?: number | null;
  brand?: string | null;
  collection?: string | null;
  cost_price: number;
  sale_price: number;
  promo_price?: number | null;
  cover_image?: string | null;
  tags?: string | null;
  is_active: boolean;
  is_featured: boolean;
  variants: ProductVariant[];
  images: ProductImage[];
  total_stock: number;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  cpf_cnpj?: string | null;
  birthday?: string | null;
  city?: string | null;
  state?: string | null;
  total_orders: number;
  total_spent: number;
  avg_ticket: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  preferred_sizes?: string | null;
  preferred_colors?: string | null;
  notes?: string | null;
  created_at: string;
}

export type OrderStatus =
  | "draft" | "pending" | "confirmed" | "paid"
  | "shipped" | "delivered" | "cancelled" | "returned";

export interface OrderItem {
  id: number;
  product_id?: number | null;
  variant_id?: number | null;
  product_name: string;
  sku: string;
  size?: string | null;
  color?: string | null;
  quantity: number;
  unit_price: number;
  discount: number;
  total: number;
}

export interface Order {
  id: number;
  order_number: string;
  customer_id?: number | null;
  status: OrderStatus;
  payment_method?: string | null;
  payment_status: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  notes?: string | null;
  internal_notes?: string | null;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
  paid_at?: string | null;
  delivered_at?: string | null;
}

export interface PageResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface DashboardMetrics {
  revenue_today: number;
  revenue_month: number;
  revenue_year: number;
  orders_today: number;
  orders_pending: number;
  products_total: number;
  products_low_stock: number;
  customers_total: number;
  customers_new_month: number;
  avg_ticket: number;
  top_products: Array<{ name: string; sku: string; quantity: number; revenue: number }>;
  recent_orders: Array<{ id: number; order_number: string; total: number; status: string; created_at: string }>;
  sales_chart: Array<{ date: string; label: string; revenue: number; orders: number }>;
}

export interface LowStockItem {
  variant_id: number;
  product_id: number;
  product_name: string;
  sku: string;
  size?: string | null;
  color?: string | null;
  stock: number;
  threshold: number;
}

export interface WSEvent {
  type: string;
  [key: string]: unknown;
}
