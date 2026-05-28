'use client'

import { useState } from 'react'
import { HorizontalFilters } from '@/components/horizontal-filters'
import { ProductGrid } from '@/components/product-grid'
import { CheckoutModal } from '@/components/checkout-modal'
import { SortMenu } from '@/components/sort-menu'
import { LiveChat } from '@/components/live-chat'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { CompareModal } from '@/components/compare-modal'
import { SpecialOffers } from '@/components/special-offers'
import { Header } from '@/components/header'
import { MessageCircle } from 'lucide-react'
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

      {/* Professional Header */}
      <Header 
        onSearch={handleSearch} 
        showCompare={showCompare} 
        setShowCompare={setShowCompare} 
      />

      {/* Horizontal Filters */}
      <div className="bg-background border-b border-border">
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
