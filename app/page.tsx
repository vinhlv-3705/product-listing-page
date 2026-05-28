'use client'

import { useState } from 'react'
import { HorizontalFilters } from '@/components/horizontal-filters'
import { ProductGrid } from '@/components/product-grid'
import { CartHeader } from '@/components/cart-header'
import { CheckoutModal } from '@/components/checkout-modal'
import { SearchBar } from '@/components/search-bar'
import { WishlistSheet } from '@/components/wishlist-sheet'
import { SortMenu } from '@/components/sort-menu'
import { AccountMenu } from '@/components/account-menu'
import { LiveChat } from '@/components/live-chat'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { CompareModal } from '@/components/compare-modal'
import { SpecialOffers } from '@/components/special-offers'
import { NavigationMenuComponent } from '@/components/navigation-menu'
import { MessageCircle, Apple } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCompare } from '@/context/compare-context'
import { PRODUCTS_DATA } from '@/lib/products-data'

export default function ProductListingPage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({
    fruitType: [],
    processingMethod: [],
    weight: [],
    label: [],
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating' | 'bestseller'>('newest')
  const [showChat, setShowChat] = useState(false)
  const [showCompare, setShowCompare] = useState(false)
  const { compareList } = useCompare()

  const handleFilterChange = (newFilters: Record<string, string[]>) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      fruitType: [],
      processingMethod: [],
      weight: [],
      label: [],
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Special Offers Banner */}
      <SpecialOffers />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-6 sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 gap-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-white/20 p-2 rounded-lg">
                <Apple size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Hoa Qua Say Dac San</h1>
                <p className="text-primary-foreground/90 text-base">
                  Chat luong cao, dinh duong day du, cong thuc say rieng
                </p>
              </div>
            </div>

            {/* Navigation */}
            <NavigationMenuComponent />

            {/* Header Actions - Grouped */}
            <div className="flex gap-2 flex-wrap items-center">
              {/* User Actions */}
              <div className="flex gap-2">
                <AccountMenu />
                <WishlistSheet />
              </div>

              {/* Shopping Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowCompare(!showCompare)}
                  variant="outline"
                  size="lg"
                  className="gap-2 relative border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  So sanh
                  {compareList.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                      {compareList.length}
                    </span>
                  )}
                </Button>
                <CartHeader />
              </div>
            </div>
          </div>

          {/* Search Bar in Header */}
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Horizontal Filters */}
      <div className="bg-secondary/30 sticky top-24 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <HorizontalFilters
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
            <SortMenu currentSort={sortBy} onSortChange={setSortBy} />
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="container mx-auto px-4 py-8">
        <ProductGrid
          products={PRODUCTS_DATA}
          activeFilters={filters}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Newsletter Section */}
      <section className="bg-secondary/30 py-12 border-t border-border mt-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <NewsletterSignup />
        </div>
      </section>

      {/* Live Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-all hover:shadow-xl"
      >
        <MessageCircle size={24} />
      </button>

      {/* Modals */}
      <CheckoutModal />
      <LiveChat isOpen={showChat} onClose={() => setShowChat(false)} />
      <CompareModal isOpen={showCompare} onClose={() => setShowCompare(false)} />
    </main>
  )
}
