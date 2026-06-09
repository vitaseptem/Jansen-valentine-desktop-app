# JANSEN VALENTINE — Desktop App

> Boutique Management System · Tauri + React + TypeScript + Tailwind

Premium native desktop application for fashion boutiques. Lightweight (~10MB native binary vs. ~150MB Electron), with editorial-grade UI inspired by Apple HIG, Linear, and high-fashion boutiques like SSENSE and Aritzia.

---

## ✨ Design Philosophy

**Editorial · Cinematic · Couture**

- **Palette** — Noir (`#050403`) base · Champagne gold (`#C8AD7F`) · Rose dust (`#C9A6A0`) · Wine (`#7B1C2E`)
- **Typography** — Playfair Display (editorial), Inter Tight (UI), JetBrains Mono (data)
- **Motion** — Framer Motion choreographed page transitions, staggered reveals, layered ornamental rotations
- **Hierarchy** — Generous whitespace, hairline borders, gold rim accents, corner-frame decorations

## 🏛️ Architecture

```
┌──────────────────────────────────────┐
│  Tauri Native Shell  (Rust · 10MB)   │
└──────────────────┬───────────────────┘
                   │
    ┌──────────────▼──────────────┐
    │   React 18 + TypeScript     │
    │   ├─ Zustand · state        │
    │   ├─ React Router · routing │
    │   ├─ Framer Motion · motion │
    │   ├─ Axios · API client     │
    │   ├─ Recharts · viz         │
    │   └─ Tailwind · styles      │
    └─────────────┬───────────────┘
                  │ HTTPS / WS
                  ▼
       Backend (FastAPI + Postgres)
```

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/            # Button, Input, Panel, Pill primitives
│   │   ├── layout/        # Sidebar, Topbar, DashboardLayout
│   │   ├── common/        # Logo, StatusIndicator
│   │   ├── dashboard/     # KPICard, SalesChart
│   │   └── catalog/       # ProductCard
│   ├── pages/             # Splash, Login, Dashboard, Catalog,
│   │                      # Products, Inventory, Orders, Customers,
│   │                      # Labels, Reports, Settings
│   ├── store/             # Zustand: authStore, uiStore
│   ├── services/          # Axios services
│   ├── websocket/         # WS client with auto-reconnect
│   ├── hooks/             # Custom hooks
│   ├── lib/               # api (axios) · cn
│   ├── utils/             # format, constants
│   ├── types/             # Shared TypeScript types
│   ├── styles/            # Reserved for additional styles
│   ├── App.tsx            # Router + auth guard
│   ├── main.tsx           # Entry point
│   └── index.css          # Design system base
├── src-tauri/
│   ├── src/main.rs        # Tauri Rust entry
│   ├── capabilities/      # Permission policies
│   ├── icons/             # App icons (generate before build)
│   ├── Cargo.toml
│   └── tauri.conf.json
├── package.json
├── tailwind.config.js     # Custom design tokens
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## ⚡ Quick Start

### Prerequisites

- **Node.js** ≥ 20
- **Rust** ≥ 1.77 → install via [rustup.rs](https://rustup.rs)
- Platform deps:
  - **macOS** — Xcode Command Line Tools
  - **Windows** — Microsoft C++ Build Tools + WebView2
  - **Linux** — `webkit2gtk-4.1`, `libssl-dev`, `libayatana-appindicator3-dev`

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your backend URL (default: `http://localhost:8000`).

### 3. Generate app icons (one-time)

```bash
npm run tauri icon path/to/icon.png
```

### 4. Development mode

```bash
npm run tauri:dev
```

This will:
1. Start Vite dev server on `http://localhost:1420`
2. Launch the native Tauri window
3. Enable hot module reload

### 5. Production build

```bash
npm run tauri:build
```

The installer/binary will be in `src-tauri/target/release/bundle/`:

| Platform | Output                                              |
|----------|-----------------------------------------------------|
| macOS    | `.dmg`, `.app`                                      |
| Windows  | `.msi`, `.exe`                                      |
| Linux    | `.deb`, `.AppImage`                                 |

## 🎨 Design System

The maison aesthetic is encoded in `tailwind.config.js` and `src/index.css`.

### Color tokens

```ts
noir-{50..950}      // Backgrounds
ivory               // Primary text on dark
champagne           // Primary accent / brand
rosedust            // Secondary accent
wine                // Deep accent (premium tags)
stone               // Neutral text
```

### Typography classes

- `font-display` — Playfair Display (editorial headlines)
- `font-sans` — Inter Tight (body & UI)
- `font-mono` — JetBrains Mono (data, KPIs, codes)
- `tracking-luxe` — 0.18em letter spacing for couture labels
- `tracking-editorial` — 0.32em for ornamental eyebrows

### Component classes

- `.btn-couture` · `.btn-ghost` · `.btn-icon` — buttons
- `.input-couture` — form inputs
- `.maison-surface` · `.maison-panel` — surfaces
- `.editorial-eyebrow` — small ornamental label
- `.editorial-title` — display title
- `.corner-frame` — decorative corner accents
- `.shimmer` — loading state
- `.glass` — frosted glass layer
- `.text-gradient-champagne` — brand gradient text

## 🔐 Authentication Flow

1. **Splash** → 2.2s cinematic intro → routes to Login.
2. **Login** → POST `/api/v1/auth/login` → tokens persisted in `localStorage` via `tokenStore`.
3. **Hydrate** → on app boot, `useAuthStore.hydrate()` calls `/me` to validate the token.
4. **Interceptor** — Axios auto-refreshes on 401 using the refresh token, retrying the original request.
5. **WebSocket** — connects with the access token on mount, auto-reconnects with exponential backoff.

## 🔌 Real-time Events

Subscribed in `DashboardLayout` via `wsClient.connect()`.

Server pushes:
- `system.welcome`
- `order.created` · `order.updated`
- `stock.updated`

Use `wsClient.subscribe(listener)` to react to events in any component.

## 🚀 Default Credentials (Demo)

| Email                        | Password   |
|------------------------------|------------|
| admin@jansenvalentine.com    | admin123   |
| gerente@jansenvalentine.com  | gerente123 |

After connecting to the backend, run the seed script to populate demo data:

```bash
docker compose exec api python -m scripts.seed
```

## 🗺️ Pages

| Route        | Purpose                                          |
|--------------|--------------------------------------------------|
| `/`          | Cinematic splash                                 |
| `/login`     | Editorial maison login                           |
| `/dashboard` | KPIs + sales chart + recent orders + top items   |
| `/catalog`   | Boutique-style product showcase                  |
| `/products`  | Tabular product management                       |
| `/inventory` | Low-stock alerts + movement audit                |
| `/orders`    | Filterable order list + WhatsApp share          |
| `/customers` | CRM with bronze→platinum tier system             |
| `/labels`    | QR-coded printable PDF labels (50×30mm)          |
| `/reports`   | Analytics dashboard with charts                  |
| `/settings`  | Profile, system status, integrations            |

## 🛠️ Useful Scripts

```bash
npm run dev          # Vite dev server only (browser)
npm run build        # Type-check + Vite production build
npm run preview      # Preview production build
npm run tauri:dev    # Tauri dev mode (native window + HMR)
npm run tauri:build  # Generate production native installers
```

## 📦 Roadmap

- Offline-first mode with IndexedDB sync
- Multi-language (PT-BR, EN, FR)
- Theme variants (Maison Noir, Maison Ivoire)
- Touch-optimized POS mode for in-store sales
- Native printer integration for thermal receipts
- AI-powered photo background removal for catalog

---

**JANSEN VALENTINE** · *La couture du système* · by **ASTRAZ STUDIO** · Maison 2026
