import { useMemo, useState } from 'react'
import Loader from '../../components/Loader/Loader.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { getAllProducts } from '../../services/productService.js'
import './Shop.css'

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

function Shop() {
  const { data: products, loading, error } = useFetch(() => getAllProducts({ limit: 100 }), [])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')

  const categories = useMemo(() => {
    if (!products) return []
    return ['all', ...new Set(products.map((p) => p.category))]
  }, [products])

  const filteredProducts = useMemo(() => {
    if (!products) return []
    let result = [...products]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(q))
    }

    if (category !== 'all') {
      result = result.filter((p) => p.category === category)
    }

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating)

    return result
  }, [products, search, category, sort])

  return (
    <div className="page-fade-in shop-page">
      <div className="shop-header">
        <div className="container">
          <span className="eyebrow">Full Catalog</span>
          <h1 className="section-title">Shop All Products</h1>
          <p className="section-subtitle">
            {loading ? 'Loading catalog…' : `${filteredProducts.length} products found`}
          </p>
        </div>
      </div>

      <div className="container shop-body">
        <div className="shop-toolbar">
          <input
            type="search"
            className="shop-search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />

          <select
            className="shop-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>

          <select
            className="shop-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {loading && <Loader label="Loading products..." fullPage />}

        {error && (
          <EmptyState
            icon="⚠️"
            title="Something went wrong"
            message={error}
            actionLabel="Reload page"
            onAction={() => window.location.reload()}
          />
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <EmptyState
            icon="🔍"
            title="No products found"
            message="Try a different search term or clear your filters."
            actionLabel="Clear Filters"
            onAction={() => {
              setSearch('')
              setCategory('all')
            }}
          />
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="products-grid shop-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop
