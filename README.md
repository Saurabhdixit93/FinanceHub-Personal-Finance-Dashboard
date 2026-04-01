# 💰 FinanceHub — Personal Finance Dashboard

A modern, production-ready personal finance dashboard built with **React 19**, **Redux Toolkit**, **TypeScript**, **Tailwind CSS v4**, and **Recharts**. Features real-time financial tracking, interactive charts, transaction management, and actionable insights.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [Performance Optimizations](#performance-optimizations)
- [Design Decisions](#design-decisions)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Overview

FinanceHub is a single-page application that provides a comprehensive view of personal finances. Users can track transactions, visualize spending patterns, and gain insights into their financial habits — all with a clean, responsive, dark-mode-enabled interface.

### Key Highlights

- **Zero-config persistence** — Data survives page reloads via localStorage middleware
- **Role-based access** — Admin mode enables full CRUD; Viewer mode is read-only
- **Responsive design** — Works on desktop, tablet, and mobile
- **Seamless dark/light mode** — Smooth 300ms transitions across all components
- **Code-split pages** — React.lazy + Suspense for optimal loading performance

---

## Features

### 📊 Dashboard

| Feature       | Description                                     |
| ------------- | ----------------------------------------------- |
| Summary Cards | Balance, Income, Expenses with gradient accents |
| Area Chart    | Monthly income vs expense trend visualization   |
| Donut Chart   | Category-wise expense breakdown                 |

### 💳 Transactions

| Feature           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| Data Table        | Sortable by date, amount, category                       |
| Search            | Real-time text search across descriptions and categories |
| Filters           | Category dropdown + Income/Expense/All type toggle       |
| CRUD              | Add, edit, delete transactions (Admin role only)         |
| Visual Indicators | Color-coded income (green) / expense (red) badges        |

### 💡 Insights

| Feature          | Description                                          |
| ---------------- | ---------------------------------------------------- |
| Savings Rate     | Percentage of income saved, with contextual feedback |
| Top Category     | Highest spending category identification             |
| Bar Chart        | Side-by-side monthly income vs expense comparison    |
| Category Ranking | Horizontal progress bars ranked by spend amount      |

### 🎨 UI/UX

- Dark / Light mode toggle with seamless transitions
- Lucide React SVG icons throughout (no emoji)
- Glassmorphic sidebar with gradient accents
- Staggered fade-in animations
- Mobile-responsive with hamburger-triggered sidebar
- Empty state handling for zero-data scenarios

---

## Tech Stack

| Layer                | Technology         | Purpose                                          |
| -------------------- | ------------------ | ------------------------------------------------ |
| **UI Framework**     | React 19.2         | Component-based UI with hooks                    |
| **Language**         | TypeScript 5.9     | Static type safety, strict mode                  |
| **State Management** | Redux Toolkit 2.11 | Predictable state container with Immer           |
| **Selectors**        | Reselect (via RTK) | Memoized derived data for performance            |
| **Styling**          | Tailwind CSS 4.2   | Utility-first CSS with custom dark variant       |
| **Charts**           | Recharts 3.8       | Composable React chart library                   |
| **Icons**            | Lucide React 1.7   | Tree-shakeable SVG icon library                  |
| **Build Tool**       | Vite 8.0           | Lightning-fast HMR + optimized production builds |
| **Linting**          | ESLint 9           | Code quality and consistency                     |
| **IDs**              | uuid 13.0          | RFC4122 v4 UUID generation for transactions      |

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│                    React App                      │
│  ┌────────────┐  ┌─────────────┐  ┌───────────┐ │
│  │  Dashboard  │  │Transactions │  │  Insights  │ │
│  │    Page     │  │    Page     │  │    Page    │ │
│  └─────┬──────┘  └──────┬──────┘  └─────┬─────┘ │
│        │                │               │        │
│  ┌─────▼────────────────▼───────────────▼──────┐ │
│  │          Memoized Selectors (Reselect)       │ │
│  └─────────────────────┬───────────────────────┘ │
│                        │                         │
│  ┌─────────────────────▼───────────────────────┐ │
│  │            Redux Toolkit Store               │ │
│  │  ┌──────────┐ ┌─────────┐ ┌──────────────┐ │ │
│  │  │ trans-   │ │ filters │ │      ui      │ │ │
│  │  │ actions  │ │  slice  │ │    slice     │ │ │
│  │  └──────────┘ └─────────┘ └──────────────┘ │ │
│  └─────────────────────┬───────────────────────┘ │
│                        │                         │
│  ┌─────────────────────▼───────────────────────┐ │
│  │        localStorage Middleware               │ │
│  │   (auto-persist on every dispatch)           │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.0
- **npm** ≥ 9.0

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd FINANCE_DASHBOARD

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Production Build

```bash
# Type-check + build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
src/
├── app/
│   └── store.ts                 # Redux store + localStorage middleware
├── features/
│   ├── transactions/
│   │   ├── transactionsSlice.ts # CRUD reducers, localStorage hydration
│   │   └── selectors.ts         # Memoized Reselect selectors
│   ├── filters/
│   │   └── filtersSlice.ts      # Search, category, type filters
│   └── ui/
│       └── uiSlice.ts           # Dark mode, role management
├── components/
│   ├── Layout/
│   │   ├── Layout.tsx           # App shell with responsive sidebar
│   │   ├── Sidebar.tsx          # Navigation with mobile support
│   │   └── Header.tsx           # Title, dark mode toggle, role selector
│   ├── Dashboard/
│   │   ├── SummaryCards.tsx      # Balance, Income, Expenses cards
│   │   ├── TrendChart.tsx       # Area chart (monthly trend)
│   │   └── CategoryChart.tsx    # Donut chart (expense categories)
│   ├── Transactions/
│   │   ├── TransactionTable.tsx # Sortable data table
│   │   ├── FilterBar.tsx        # Search + category + type filters
│   │   └── TransactionModal.tsx # Add/Edit modal (admin only)
│   ├── Insights/
│   │   └── InsightsPanel.tsx    # Analytics cards + charts + ranking
│   └── common/
│       └── EmptyState.tsx       # Reusable empty state component
├── pages/
│   ├── DashboardPage.tsx        # Lazy-loaded dashboard route
│   ├── TransactionsPage.tsx     # Lazy-loaded transactions route
│   └── InsightsPage.tsx         # Lazy-loaded insights route
├── hooks/
│   └── useRedux.ts              # Typed useAppDispatch / useAppSelector
├── types/
│   └── index.ts                 # Transaction, State interfaces
├── utils/
│   └── calculations.ts          # Finance math & formatting utilities
├── data/
│   └── seedData.ts              # 22 realistic seed transactions
├── App.tsx                      # Root with Provider, lazy routing
├── main.tsx                     # Entry point
└── index.css                    # Tailwind imports, animations, scrollbar
```

---

## State Management

### Store Design (Redux Toolkit)

```typescript
{
  transactions: {
    items: Transaction[],      // All transactions (persisted)
    status: 'idle' | 'loading' | 'error'
  },
  filters: {
    search: string,            // Text search query
    category: string | null,   // Selected category filter
    type: 'income' | 'expense' | null  // Type filter
  },
  ui: {
    role: 'admin' | 'viewer',  // Controls CRUD visibility
    darkMode: boolean          // Theme toggle (persisted)
  }
}
```

### Persistence Strategy

- **Custom middleware** saves `transactions.items` and `ui.darkMode` to localStorage on every dispatch
- **Hydration** happens at slice initialization — `loadFromStorage()` reads persisted data before Redux initializes

### Memoized Selectors

All derived data is computed via `createSelector` (Reselect) to prevent unnecessary re-renders:

- `selectFilteredTransactions` — applies search + category + type filters
- `selectBalance` / `selectIncome` / `selectExpenses` — financial aggregates
- `selectCategoryBreakdown` — chart data for pie chart
- `selectMonthlyTrend` — chart data for area/bar charts
- `selectCategories` — unique categories for filter dropdown

---

## Performance Optimizations

| Optimization           | Implementation                                                    |
| ---------------------- | ----------------------------------------------------------------- |
| **Code Splitting**     | `React.lazy()` + `Suspense` for all page components               |
| **Memoized Selectors** | Reselect via `createSelector` prevents recomputation              |
| **Minimal Re-renders** | Typed `useAppSelector` extracts only needed state slices          |
| **Tree Shaking**       | Lucide icons are tree-shakeable — only imported icons are bundled |
| **CSS Optimization**   | Tailwind CSS v4 JIT compiles only used utilities                  |
| **Production Build**   | Vite produces optimized, minified, gzipped bundles                |
| **Lazy Hydration**     | localStorage data loaded once at slice init, not per-render       |

### Bundle Analysis

| Chunk              | Gzipped Size        |
| ------------------ | ------------------- |
| Core React + Redux | ~61 KB              |
| Recharts (charts)  | ~89 KB              |
| Dashboard Page     | ~11 KB              |
| Transactions Page  | ~4 KB               |
| Insights Page      | ~8 KB               |
| CSS (all styles)   | ~7 KB               |
| **Total**          | **~180 KB gzipped** |

---

## Design Decisions

1. **Tailwind CSS v4** over component libraries — Full control over design without CSS-in-JS overhead. Custom `@custom-variant dark` for dark mode.

2. **Redux Toolkit** over Context API — Predictable state updates with Immer, built-in Reselect, and excellent DevTools support. Scales better for complex state.

3. **localStorage middleware** over redux-persist — Simpler, zero-dependency persistence. The custom middleware is 10 lines vs adding a library.

4. **Lucide React** over Heroicons/FontAwesome — Tree-shakeable, consistent design, actively maintained, smaller bundle impact.

5. **Hash-based routing** over React Router — Keeps the app simple for assignment scope. No server configuration needed for SPA deployment.

6. **Interface over Type** for objects — Required by TypeScript's `verbatimModuleSyntax` and `erasableSyntaxOnly` compiler options for zero-runtime-cost type erasure.

---

## Scripts

| Script         | Command             | Description                        |
| -------------- | ------------------- | ---------------------------------- |
| **Dev**        | `npm run dev`       | Start Vite dev server with HMR     |
| **Build**      | `npm run build`     | Type-check + production build      |
| **Preview**    | `npm run preview`   | Serve production build locally     |
| **Lint**       | `npm run lint`      | Run ESLint checks                  |
| **Type Check** | `npm run typecheck` | TypeScript validation without emit |

---

## Deployment

### Static Hosting (Vercel / Netlify / GitHub Pages)

The app builds to a static `dist/` folder and can be deployed anywhere:

```bash
# Build for production
npm run build

# Output is in dist/ — deploy this folder
```

### Vercel

```bash
npx vercel --prod
```

### Netlify

```bash
npx netlify deploy --prod --dir=dist
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Data Model

```typescript
interface Transaction {
  id: string; // UUID v4
  date: string; // ISO date (YYYY-MM-DD)
  amount: number; // Positive number
  category: string; // User-defined category
  type: "income" | "expense";
  description?: string; // Optional note
}
```

---

## Edge Cases Handled

- ✅ Empty transaction list — Empty state component shown
- ✅ No matching search results — "No transactions found" message
- ✅ Zero income — Savings rate shows 0% instead of NaN/Infinity
- ✅ Invalid form input — Validation prevents empty/negative amounts
- ✅ Large datasets — Memoized selectors prevent performance degradation
- ✅ localStorage unavailable — Graceful fallback to seed data (try/catch)
- ✅ Role switching — CRUD buttons hide immediately in Viewer mode

---

## License

MIT

---

> Built with ❤️ using React, Redux Toolkit, TypeScript, and Tailwind CSS
