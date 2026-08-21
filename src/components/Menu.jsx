import { useState, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMenuData } from '../hooks/useMenuData'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { useCart } from '../context/CartContext'
import Reveal from './Reveal'

const EASE = [0.22, 1, 0.36, 1]
const TAB_SPRING = { type: 'spring', stiffness: 420, damping: 34 }

function Highlight({ text, query }) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="menu-search__mark">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function Menu() {
  const { menu, loading } = useMenuData()
  const [activeId, setActiveId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const tabsId = useId()
  const tabRefs = useRef({})
  const searchRef = useRef(null)
  const cart = useCart()

  if (!menu) {
    return (
      <section id="menu" className="menu-section section">
        <div className="container">
          <p className="menu-panel__intro">{loading ? 'Loading menu…' : 'The menu is unavailable right now — please check back shortly.'}</p>
        </div>
      </section>
    )
  }

  const active = menu.find((cat) => cat.id === activeId) ?? menu[0]

  const allItems = menu.flatMap((cat) =>
    cat.subsections.flatMap((sub) =>
      sub.items.map((item) => ({ ...item, catName: cat.name, catId: cat.id, subName: sub.name }))
    )
  )

  const trimmed = searchQuery.trim()
  const isSearching = trimmed.length > 0
  const searchResults = isSearching
    ? allItems.filter((item) => item.name.toLowerCase().includes(trimmed.toLowerCase()))
    : []

  const signatureItems = active.subsections
    .flatMap((sub) => sub.items.map((item) => ({ ...item, subName: sub.name })))

  const handleTabClick = (id) => {
    setActiveId(id)
    setSearchQuery('')
    tabRefs.current[id]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  const clearSearch = () => {
    setSearchQuery('')
    searchRef.current?.focus()
  }

  return (
    <section id="menu" className="menu-section section">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">The Menu</p>
          <h2 className="section-title">
            Every dish, <em>as it&rsquo;s served</em>
          </h2>
          <p className="section-lede">
            The full menu, priced exactly as it&rsquo;s posted in the dining room. Every dish, shown as it&rsquo;s served.
            {isSupabaseConfigured && ' Add anything to your order and send it straight to the kitchen.'}
          </p>
        </div>

        {/* Sticky search + filter bar */}
        <div className="menu-filterbar">
          {/* Row 1 — search */}
          <div className="menu-filterbar__search-row">
            <div className="menu-filterbar__search-wrap">
              <svg className="menu-filterbar__search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                ref={searchRef}
                className="menu-filterbar__input"
                type="search"
                placeholder="Search for a dish…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search menu items"
              />
              <AnimatePresence>
                {isSearching && (
                  <motion.button
                    type="button"
                    className="menu-filterbar__clear"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.15 }}
                  >
                    &times;
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Row 2 — category chips */}
          <div className="menu-filterbar__cats-wrap">
            <div
              className={`menu-filterbar__cats${isSearching ? ' menu-filterbar__cats--dim' : ''}`}
              role="tablist"
              aria-label="Menu categories"
            >
              {menu.map((cat) => {
                const isActive = cat.id === active.id
                return (
                  <button
                    key={cat.id}
                    ref={(el) => { tabRefs.current[cat.id] = el }}
                    type="button"
                    role="tab"
                    id={`${tabsId}-tab-${cat.id}`}
                    aria-selected={isActive && !isSearching}
                    aria-controls={`${tabsId}-panel-${cat.id}`}
                    className={`menu-cat-chip${isActive && !isSearching ? ' is-active' : ''}`}
                    onClick={() => handleTabClick(cat.id)}
                  >
                    {isActive && !isSearching && (
                      <motion.span
                        layoutId="menu-cat-pill"
                        className="menu-cat-chip__fill"
                        transition={TAB_SPRING}
                      />
                    )}
                    <span className="menu-cat-chip__label">{cat.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Panel: search results OR category browse */}
        <AnimatePresence mode="wait" initial={false}>
          {isSearching ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <p className="menu-search__meta">
                {searchResults.length === 0
                  ? `No dishes found for "${trimmed}"`
                  : `${searchResults.length} dish${searchResults.length === 1 ? '' : 'es'} found`}
              </p>

              {searchResults.length === 0 ? (
                <div className="menu-search__empty">
                  <p>Try a different spelling, or browse a category.</p>
                  <button type="button" className="btn btn-outline" onClick={clearSearch}>
                    Browse all categories
                  </button>
                </div>
              ) : (
                <ul className="menu-search-results">
                  {searchResults.map((item) => {
                    const unavailable = item.isAvailable === false
                    return (
                      <li key={item.id} className={`menu-search-result${unavailable ? ' menu-search-result--unavailable' : ''}`}>
                        {item.photo && (
                          <div className="menu-search-result__thumb">
                            <img src={item.photo.src} alt={item.photo.alt} loading="lazy" />
                            {unavailable && <span className="menu-search-result__dim" />}
                          </div>
                        )}
                        <div className="menu-search-result__info">
                          <span className="menu-search-result__name">
                            <Highlight text={item.name} query={trimmed} />
                            {unavailable && <span className="menu-row__unavailable-badge">Not available today</span>}
                          </span>
                          <span className="menu-search-result__cat">{item.catName} · {item.subName}</span>
                          {item.note && <span className="menu-search-result__note">{item.note}</span>}
                        </div>
                        <div className="menu-search-result__right">
                          <span className="menu-row__price">{item.price}</span>
                          {isSupabaseConfigured && !unavailable && (
                            <button
                              type="button"
                              className="menu-row__add"
                              onClick={() => cart.addItem(item)}
                              aria-label={`Add ${item.name} to cart`}
                            >
                              +
                            </button>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="browse"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active.id}
                  id={`${tabsId}-panel-${active.id}`}
                  role="tabpanel"
                  aria-labelledby={`${tabsId}-tab-${active.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {active.intro && <p className="menu-panel__intro">{active.intro}</p>}

                  <div className="menu-signature-grid">
                    {signatureItems.map((item, i) => {
                      const unavailable = item.isAvailable === false
                      return (
                        <Reveal
                          as="article"
                          key={item.id}
                          delay={i * 0.05}
                          className={`dish-card${unavailable ? ' dish-card--unavailable' : ''}`}
                        >
                          {item.photo && (
                            <div className="dish-card__media">
                              <img src={item.photo.src} alt={item.photo.alt} loading="lazy" width={800} height={600} />
                              {unavailable && <span className="dish-card__unavailable-badge">Not Available Today</span>}
                            </div>
                          )}
                          <div className="dish-card__body">
                            <div className="dish-card__row">
                              <h3>{item.name}</h3>
                              <span className="dish-card__price">{item.price}</span>
                            </div>
                            {item.note && <p className="dish-card__note">{item.note}</p>}
                            {item.description && <p className="dish-card__desc">{item.description}</p>}
                            {isSupabaseConfigured && !unavailable && (
                              <button type="button" className="dish-card__add" onClick={() => cart.addItem(item)}>
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </Reveal>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
