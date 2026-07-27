# Prompts.md

This file documents the original build brief used to generate the ShopZone project, for reference and reproducibility.

---

## Original Brief (Summarized)

> Build a production-quality React + Vite E-Commerce SPA called **ShopZone**.
>
> - Clean enterprise folder structure (components, context, pages, hooks, services, utils, assets)
> - React Router DOM v6+, Context API (no Redux), JavaScript only (no TypeScript)
> - Premium modern theme inspired by Apple Store / Nike / Amazon / Flipkart: soft white background, light-blue accents, gradient hero, rounded cards, floating navbar, glassmorphism, hover animations
> - Home page: hero, featured products, categories, "Why ShopZone," reviews, newsletter, footer
> - Persistent navbar with live-updating cart badge
> - Routes: `/`, `/shop`, `/product/:id`, `/contact`, `/cart`, `/login`, `/checkout` (protected), `*` (404)
> - Product data from `https://dummyjson.com/products` and `https://dummyjson.com/products/:id`
> - Shop page: fetch, loading/error states, responsive grid, product cards with image/title/price/rating/discount/category
> - Product details: gallery, description, rating, brand, category, price, discount, stock, add-to-cart, related products
> - CartContext: add/remove/increase/decrease/clear, total, item count, duplicate prevention
> - Cart persisted to `localStorage`
> - AuthContext: guest login, persisted to `localStorage`
> - Protected checkout route with redirect-back-after-login behavior
> - Checkout: shipping address, payment summary, order summary, mock success
> - Contact page with modern form
> - Footer: about, quick links, support, socials, copyright
> - CSS transitions: hover, ripple, card hover, fade-in, sticky navbar
> - Error handling: 404, API loading/failure, empty cart, no product found
> - Deployment-ready: README.md, Prompts.md, vercel.json, .gitignore, npm scripts

---

## Design Decisions Made During Build

- **Palette:** Soft white background (`#fbfcfe`), primary blue gradient (`#2f6fed` → `#6fa8ff`), deep navy ink text (`#0b1c2c`), mint-green accent (`#12b76a`) for success states.
- **Typography:** `Sora` for display/headings (geometric, premium, tech-forward), `Inter` for body copy (highly legible at small sizes).
- **Signature element:** the floating glass navbar (blurred, scroll-aware) paired with the animated gradient-orb hero — both reinforce a "premium tech storefront" feel without leaning on stock templates.
- **Cart logic:** implemented with `useReducer` inside `CartContext` rather than multiple `useState` calls, to keep add/remove/increase/decrease/clear predictable and centralized.
- **Auth:** intentionally simple (guest-only) per brief — no real backend, but structured so a real auth provider could be swapped in later without touching consuming components.

---

## Suggested Follow-Up Prompts

If extending this project further, consider prompting with:

- "Add a wishlist feature with its own context, following the same pattern as CartContext."
- "Add unit tests for CartContext using Vitest and React Testing Library."
- "Add pagination or infinite scroll to the Shop page."
- "Replace mock checkout with a real Stripe test-mode integration."
- "Add dark mode support using CSS custom properties and a ThemeContext."
