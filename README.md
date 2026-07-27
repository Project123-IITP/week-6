# 🛍️ ShopZone — Premium E-Commerce SPA

A production-quality, fully responsive e-commerce single-page application built with **React + Vite**, styled with a premium Apple/Nike/Amazon-inspired design language (soft white canvas, light-blue accents, glassmorphism, gradient hero).

Live product data is powered by [DummyJSON](https://dummyjson.com/products).

---

## ✨ Features

- Floating glassmorphic navbar with scroll-aware blur and live cart badge
- Animated gradient hero section with floating orbs
- Full product catalog with search, category filter, and sorting
- Dynamic product details page with image gallery + related products
- Cart with quantity controls, persistent via `localStorage`
- Guest authentication (`AuthContext`) persisted via `localStorage`
- Protected `/checkout` route — redirects to `/login` and back
- Mock checkout flow with shipping form, order summary, and success state
- Contact form, 404 page, loading/error/empty states throughout
- 100% custom CSS — no UI framework, no Tailwind

---

## 🧱 Tech Stack

| Layer          | Technology              |
|----------------|--------------------------|
| Framework      | React 18 + Vite 5        |
| Routing        | React Router DOM v6      |
| State          | Context API + `useReducer` |
| Styling        | Plain CSS (custom design system, CSS variables) |
| Data fetching  | Native `fetch` API + `dummyjson.com` |
| Persistence    | `localStorage`           |

---

## 📁 Folder Structure

```
shopzone/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar/            # Floating glass navbar + cart badge
│   │   ├── Footer/            # Site footer
│   │   ├── ProductCard/       # Reusable product card (grid + related)
│   │   ├── Button/            # Reusable button w/ ripple effect
│   │   ├── Loader/            # Spinner for async states
│   │   ├── EmptyState/        # Empty cart / 404 / no results UI
│   │   ├── StarRating/        # 5-star rating display
│   │   └── ProtectedRoute.jsx # Route guard for /checkout
│   ├── context/
│   │   ├── CartContext.jsx    # Cart state (add/remove/qty/total)
│   │   └── AuthContext.jsx    # Guest auth state
│   ├── pages/
│   │   ├── Home/
│   │   ├── Shop/
│   │   ├── ProductDetails/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Contact/
│   │   ├── Login/
│   │   └── NotFound/
│   ├── hooks/
│   │   └── useFetch.js        # Generic async data-fetching hook
│   ├── services/
│   │   └── productService.js  # All DummyJSON API calls
│   ├── utils/
│   │   └── cartUtils.js       # Cart math + localStorage helpers
│   ├── styles/
│   │   └── global.css         # Design tokens + base styles
│   ├── App.jsx                 # Routes
│   └── main.jsx                 # App entry point + providers
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .eslintrc.cjs
├── .gitignore
└── README.md
```

---

## 🚀 Installation

**Prerequisites:** Node.js 18+ and npm 9+ installed.

```bash
# 1. Navigate into the project folder
cd shopzone

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Other scripts

```bash
npm run build     # Production build → outputs to /dist
npm run preview   # Preview the production build locally
npm run lint       # Run ESLint
```

---

## ☁️ Deploying to Vercel

**Option A — Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option B — Git + Vercel Dashboard**
1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects the Vite framework preset (also pre-configured in `vercel.json`).
4. Build command: `npm run build`, Output directory: `dist`.
5. Click **Deploy**.

The included `vercel.json` also adds an SPA rewrite rule so that deep links like `/product/12` or `/cart` work correctly on refresh instead of 404-ing.

---

## 🧪 Testing Checklist

- [ ] `/` loads with hero, categories, featured products, reviews, newsletter
- [ ] `/shop` fetches and displays all products; search, category filter, and sort all work
- [ ] Loading spinner appears while products fetch; error state appears if the network is offline
- [ ] `/product/:id` loads a specific product; invalid/non-existent IDs show "No product found"
- [ ] Gallery thumbnails switch the main image
- [ ] "Add to Cart" updates the navbar badge instantly from any page
- [ ] Adding the same product twice increases quantity instead of duplicating the row
- [ ] `/cart` shows correct subtotal/grand total; quantity +/− and remove work; empty cart shows EmptyState
- [ ] Refreshing the browser preserves cart contents (localStorage)
- [ ] Visiting `/checkout` while logged out redirects to `/login`
- [ ] Logging in as guest from `/login` redirects back to `/checkout` automatically
- [ ] Refreshing the browser preserves login state (localStorage)
- [ ] Submitting the checkout form clears the cart and shows a success message
- [ ] `/contact` form submits and shows a success confirmation
- [ ] Visiting an unknown route (e.g. `/foobar`) shows the 404 page
- [ ] Layout is responsive at 1440px, 1024px, 768px, and 375px widths
- [ ] Keyboard navigation shows visible focus outlines throughout

---

## 🛠️ Common Errors & Fixes

| Issue | Fix |
|---|---|
| `npm error 403 / ERESOLVE` on install | Delete `node_modules` and `package-lock.json`, then re-run `npm install`. Ensure you're on Node 18+. |
| Blank white page after `npm run dev` | Check the browser console — usually a typo'd import path. All imports are case-sensitive on Linux/Vercel even if fine locally on Windows/Mac. |
| Products don't load / "Unable to load products" | DummyJSON may be rate-limited or your network may be offline. Refresh, or check `https://dummyjson.com/products` directly in the browser. |
| Refreshing `/cart` or `/product/5` on Vercel shows 404 | Make sure `vercel.json`'s rewrite rule is present — it routes all paths to `index.html` so React Router can take over. |
| Cart badge doesn't update | Make sure the component reading the cart is inside `<CartProvider>` (already wired in `main.jsx`). Don't wrap a second, separate provider elsewhere. |
| Checkout redirects to Login even after logging in | This is expected the *first* time — click "Login as Guest" once, and you'll be redirected back to `/checkout` automatically. |
| Styles look unstyled / no fonts | Requires an internet connection on first load to fetch Google Fonts (Sora, Inter) from the CDN link in `index.html`. |

---

## 📝 Notes

- This project uses **mock authentication** (guest login only) and a **mock checkout** (no real payment gateway) — intended as a portfolio/demo-grade SPA, not a production payment system.
- All product data comes from the public [DummyJSON](https://dummyjson.com) API and is for demo purposes only.

---

Built with ❤️ using React, Vite, and a lot of attention to detail.
