import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'creator-link-hub-products'

const defaultProducts = [
  {
    id: 'iron-box-pro',
    name: 'Iron Box Pro',
    slug: 'iron-box-pro',
    category: 'Home Essentials',
    description:
      'Quick links for the iron box featured in your video so viewers can compare prices before buying.',
    highlight: 'Best for everyday pressing',
    label: 'IB',
    youtubeReview: 'https://www.youtube.com/@yourchannel',
    links: [
      { store: 'Amazon', url: 'https://www.amazon.in/' },
      { store: 'Flipkart', url: 'https://www.flipkart.com/' },
      { store: 'Myntra', url: 'https://www.myntra.com/' },
    ],
  },
  {
    id: 'smart-mixer-max',
    name: 'Smart Mixer Max',
    slug: 'smart-mixer-max',
    category: 'Kitchen Picks',
    description:
      'A dedicated page for the mixer you reviewed with buying links for shoppers who trust your recommendation.',
    highlight: 'Good for quick chutneys and batters',
    label: 'SM',
    youtubeReview: 'https://www.youtube.com/@yourchannel',
    links: [
      { store: 'Amazon', url: 'https://www.amazon.in/' },
      { store: 'Flipkart', url: 'https://www.flipkart.com/' },
      { store: 'Croma', url: 'https://www.croma.com/' },
    ],
  },
  {
    id: 'daily-style-kit',
    name: 'Daily Style Kit',
    slug: 'daily-style-kit',
    category: 'Fashion Finds',
    description:
      'Bundle the fashion products from your shorts and let visitors jump to the shop they prefer.',
    highlight: 'Curated for budget-friendly styling',
    label: 'DS',
    youtubeReview: 'https://www.youtube.com/@yourchannel',
    links: [
      { store: 'Amazon', url: 'https://www.amazon.in/' },
      { store: 'Myntra', url: 'https://www.myntra.com/' },
      { store: 'Ajio', url: 'https://www.ajio.com/' },
    ],
  },
]

const emptyForm = {
  name: '',
  category: '',
  description: '',
  youtubeReview: '',
  amazonLink: '',
  flipkartLink: '',
  myntraLink: '',
}

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function makeLabel(name) {
  const words = name
    .split(' ')
    .map((word) => word.trim())
    .filter(Boolean)

  const initials = words.slice(0, 2).map((word) => word[0]?.toUpperCase() ?? '')

  return initials.join('') || 'PR'
}

function normalizeUrl(url) {
  if (!url) {
    return ''
  }

  if (/^https?:\/\//i.test(url)) {
    return url
  }

  return `https://${url}`
}

function readStoredProducts() {
  if (typeof window === 'undefined') {
    return defaultProducts
  }

  const saved = window.localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return defaultProducts
  }

  try {
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProducts
  } catch {
    return defaultProducts
  }
}

function getRouteFromHash() {
  if (typeof window === 'undefined') {
    return { page: 'home', slug: '' }
  }

  const hash = window.location.hash.replace(/^#/, '')

  if (!hash || hash === '/') {
    return { page: 'home', slug: '' }
  }

  const match = hash.match(/^\/product\/([a-z0-9-]+)/i)

  if (match) {
    return { page: 'product', slug: match[1] }
  }

  return { page: 'home', slug: '' }
}

function ProductCard({ product, onOpen }) {
  return (
    <article className="product-card">
      <div className="product-card__label" aria-hidden="true">
        {product.label}
      </div>
      <div className="product-card__copy">
        <span className="eyebrow">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-card__footer">
        <span>{product.highlight}</span>
        <button type="button" className="ghost-button" onClick={() => onOpen(product.slug)}>
          View links
        </button>
      </div>
    </article>
  )
}

function AddProductPanel({ form, onChange, onClose, onSubmit }) {
  return (
    <div className="panel-backdrop" role="presentation" onClick={onClose}>
      <aside
        className="panel"
        aria-labelledby="add-product-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="panel__header">
          <div>
            <span className="eyebrow">Add product</span>
            <h2 id="add-product-title">Create a new buying page</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close add product form"
          >
            x
          </button>
        </div>
        <p className="panel__intro">
          Fill in your product details and shopping links. New products are stored in this browser so you can keep building your page quickly.
        </p>
        <form className="product-form" onSubmit={onSubmit}>
          <label>
            Product name
            <input
              name="name"
              placeholder="Iron Box"
              value={form.name}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Category
            <input
              name="category"
              placeholder="Home Essentials"
              value={form.category}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Short description
            <textarea
              name="description"
              placeholder="Tell visitors why this product is useful."
              value={form.description}
              onChange={onChange}
              rows="4"
              required
            />
          </label>
          <label>
            YouTube review link
            <input
              name="youtubeReview"
              placeholder="https://www.youtube.com/watch?v=..."
              value={form.youtubeReview}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Amazon link
            <input
              name="amazonLink"
              placeholder="https://www.amazon.in/..."
              value={form.amazonLink}
              onChange={onChange}
            />
          </label>
          <label>
            Flipkart link
            <input
              name="flipkartLink"
              placeholder="https://www.flipkart.com/..."
              value={form.flipkartLink}
              onChange={onChange}
            />
          </label>
          <label>
            Myntra link
            <input
              name="myntraLink"
              placeholder="https://www.myntra.com/..."
              value={form.myntraLink}
              onChange={onChange}
            />
          </label>
          <div className="panel__actions">
            <button type="button" className="ghost-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Save product
            </button>
          </div>
        </form>
      </aside>
    </div>
  )
}

function App() {
  const [products, setProducts] = useState(defaultProducts)
  const [route, setRoute] = useState(getRouteFromHash)
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    setProducts(readStoredProducts())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const syncRoute = () => {
      setRoute(getRouteFromHash())
    }

    window.addEventListener('hashchange', syncRoute)

    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const openProduct = (slug) => {
    window.location.hash = `/product/${slug}`
  }

  const goHome = () => {
    window.location.hash = '/'
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const shoppingLinks = [
      { store: 'Amazon', url: normalizeUrl(form.amazonLink) },
      { store: 'Flipkart', url: normalizeUrl(form.flipkartLink) },
      { store: 'Myntra', url: normalizeUrl(form.myntraLink) },
    ].filter((entry) => entry.url)

    if (shoppingLinks.length === 0) {
      window.alert('Add at least one shopping link before saving the product.')
      return
    }

    const slugBase = createSlug(form.name)
    const slug = products.some((product) => product.slug === slugBase)
      ? `${slugBase}-${products.length + 1}`
      : slugBase

    const nextProduct = {
      id: slug,
      name: form.name.trim(),
      slug,
      category: form.category.trim(),
      description: form.description.trim(),
      highlight: 'Newly added product',
      label: makeLabel(form.name),
      youtubeReview: normalizeUrl(form.youtubeReview),
      links: shoppingLinks,
    }

    setProducts((current) => [nextProduct, ...current])
    setForm(emptyForm)
    setShowAddPanel(false)
    openProduct(slug)
  }

  const selectedProduct = products.find((product) => product.slug === route.slug)

  if (route.page === 'product') {
    if (!selectedProduct) {
      return (
        <main className="shell detail-shell">
          <button type="button" className="ghost-button back-button" onClick={goHome}>
            Back to products
          </button>
          <section className="detail-empty">
            <span className="eyebrow">Product not found</span>
            <h1>This product page does not exist yet.</h1>
            <p>Add the product from the homepage and it will appear here with your affiliate links.</p>
          </section>
        </main>
      )
    }

    return (
      <main className="shell detail-shell">
        <button type="button" className="ghost-button back-button" onClick={goHome}>
          Back to products
        </button>

        <section className="detail-hero reveal">
          <div className="detail-hero__label" aria-hidden="true">
            {selectedProduct.label}
          </div>
          <div className="detail-hero__copy">
            <span className="eyebrow">{selectedProduct.category}</span>
            <h1>{selectedProduct.name}</h1>
            <p>{selectedProduct.description}</p>
          </div>
          <div className="detail-hero__meta">
            <span>{selectedProduct.highlight}</span>
            <span>{selectedProduct.links.length} store links ready</span>
          </div>
        </section>

        <section className="link-grid">
          {selectedProduct.links.map((link, index) => (
            <a
              key={link.store}
              className="link-card reveal"
              style={{ animationDelay: `${index * 0.08}s` }}
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="link-card__store">{link.store}</span>
              <strong>Open affiliate link</strong>
              <span>Send visitors to {link.store} for this product.</span>
            </a>
          ))}
        </section>

        <section className="youtube-card reveal" style={{ animationDelay: '0.18s' }}>
          <div>
            <span className="eyebrow">Review content</span>
            <h2>YouTube review click here</h2>
            <p>
              Let visitors watch your full review before they decide which store link to use.
            </p>
          </div>
          <a
            className="primary-button"
            href={selectedProduct.youtubeReview}
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube
          </a>
        </section>
      </main>
    )
  }

  return (
    <>
      <main className="shell home-shell">
        <section className="hero-banner reveal">
          <div className="hero-banner__copy">
            <span className="eyebrow">Linku.ai</span>
            <h1>One homepage for your viewers, with a separate buying page for every product.</h1>
            <p>
              Share your YouTube reviews, keep multiple affiliate links for each product, and let visitors choose Amazon, Flipkart, Myntra, or any other store from one clean page.
            </p>
            <div className="hero-banner__actions">
              <button type="button" className="primary-button" onClick={() => setShowAddPanel(true)}>
                Add your next product
              </button>
              <a
                className="ghost-button"
                href="https://www.youtube.com/@yourchannel"
                target="_blank"
                rel="noreferrer"
              >
                Open your YouTube channel
              </a>
            </div>
          </div>
          <div className="hero-banner__stats">
            <div>
              <strong>{products.length}</strong>
              <span>Products on homepage</span>
            </div>
            <div>
              <strong>3+</strong>
              <span>Affiliate links per product</span>
            </div>
            <div>
              <strong>1 click</strong>
              <span>To open your review video</span>
            </div>
          </div>
        </section>

        <section className="section-head reveal" style={{ animationDelay: '0.08s' }}>
          <div>
            <span className="eyebrow">Homepage products</span>
            <h2>Featured products from your videos</h2>
          </div>
          <button
            type="button"
            className="icon-trigger"
            onClick={() => setShowAddPanel(true)}
            aria-label="Add more products"
          >
            +
          </button>
        </section>

        <section className="product-grid">
          {products.map((product, index) => (
            <div key={product.id} className="reveal" style={{ animationDelay: `${0.12 + index * 0.08}s` }}>
              <ProductCard product={product} onOpen={openProduct} />
            </div>
          ))}
        </section>

        <section className="workflow reveal" style={{ animationDelay: '0.24s' }}>
          <div>
            <span className="eyebrow">Flow</span>
            <h2>How visitors use your site</h2>
          </div>
          <div className="workflow__steps">
            <article>
              <strong>01</strong>
              <p>They open your homepage and see all products you featured in videos.</p>
            </article>
            <article>
              <strong>02</strong>
              <p>They click a product card and land on a dedicated page with store options.</p>
            </article>
            <article>
              <strong>03</strong>
              <p>They compare stores or watch your YouTube review before purchasing.</p>
            </article>
          </div>
        </section>
      </main>

      <button type="button" className="floating-add" onClick={() => setShowAddPanel(true)} aria-label="Add product">
        +
      </button>

      {showAddPanel ? (
        <AddProductPanel
          form={form}
          onChange={handleChange}
          onClose={() => setShowAddPanel(false)}
          onSubmit={handleSubmit}
        />
      ) : null}
    </>
  )
}

export default App
