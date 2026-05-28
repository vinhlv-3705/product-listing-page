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
import { Product } from '@/types'

// Mock product data with extended Product interface
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Xoài sấy dẻo premium',
    image: 'https://images.unsplash.com/photo-1585864299869-592aa2513b0f?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1585864299869-592aa2513b0f?w=400&h=400&fit=crop'],
    price: 89000,
    originalPrice: 119000,
    fruitType: 'Xoài',
    processingMethod: 'Sấy dẻo',
    weight: '100g',
    label: 'Xuất khẩu',
    rating: 4.8,
    reviews: 156,
    stock: 45,
    sku: 'XOA-SD-100-XK',
    category: 'Xoài sấy',
    description: 'Xoài sấy dẻo premium được sản xuất từ những trái xoài chín tự nhiên, sấy theo công nghệ hiện đại.',
    ingredients: ['100% Xoài tự nhiên'],
    benefits: ['Giàu vitamin C', 'Chứa chất xơ', 'Tốt cho tiêu hóa'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '12 tháng từ ngày sản xuất',
  },
  {
    id: '2',
    name: 'Dứa sấy thăng hoa tinh khiết',
    image: 'https://images.unsplash.com/photo-1599599810694-b3b868a56b14?w=400&h=400&fit=crop',
    price: 129000,
    originalPrice: 159000,
    fruitType: 'Dứa',
    processingMethod: 'Sấy thăng hoa',
    weight: '50g',
    label: 'Xuất khẩu',
    rating: 4.9,
    reviews: 203,
    stock: 32,
    sku: 'DUA-STH-50-XK',
    category: 'Dứa sấy',
    description: 'Dứa sấy thăng hoa giữ lại toàn bộ chất dinh dưỡng và hương vị tự nhiên.',
    ingredients: ['100% Dứa tự nhiên'],
    benefits: ['Enzym bromelin', 'Chứa chất chống oxy hóa', 'Hỗ trợ tiêu hóa'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '18 tháng từ ngày sản xuất',
  },
  {
    id: '3',
    name: 'Mít sấy dẻo vàng ươm',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
    price: 149000,
    originalPrice: 199000,
    fruitType: 'Mít',
    processingMethod: 'Sấy dẻo',
    weight: '200g',
    label: 'Nội địa',
    rating: 4.7,
    reviews: 98,
    stock: 28,
    sku: 'MIT-SD-200-ND',
    category: 'Mít sấy',
    description: 'Mít sấy dẻo với vị ngọt tự nhiên, mềm mại, dễ nhai.',
    ingredients: ['100% Mít Việt Nam'],
    benefits: ['Giàu vitamin A', 'Hỗ trợ miễn dịch', 'Năng lượng cao'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '10 tháng từ ngày sản xuất',
  },
  {
    id: '4',
    name: 'Thanh long sấy thăng hoa hồng',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd1f7673?w=400&h=400&fit=crop',
    price: 159000,
    fruitType: 'Thanh Long',
    processingMethod: 'Sấy thăng hoa',
    weight: '100g',
    label: 'Xuất khẩu',
    rating: 4.6,
    reviews: 142,
    stock: 52,
    sku: 'TDL-STH-100-XK',
    category: 'Thanh long sấy',
    description: 'Thanh long sấy thăng hoa màu hồng xinh đẹp, giữ nguyên giá trị dinh dưỡng.',
    ingredients: ['100% Thanh long Việt Nam'],
    benefits: ['Vitamin C cao', 'Chất chống oxy hóa', 'Tốt cho hệ tiêu hóa'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '15 tháng từ ngày sản xuất',
  },
  {
    id: '5',
    name: 'Xoài cát Hòa Lộc sấy dẻo',
    image: 'https://images.unsplash.com/photo-1585864299869-592aa2513b0f?w=400&h=400&fit=crop',
    price: 109000,
    originalPrice: 149000,
    fruitType: 'Xoài',
    processingMethod: 'Sấy dẻo',
    weight: '200g',
    label: 'Nội địa',
    rating: 4.7,
    reviews: 167,
    stock: 38,
    sku: 'XOA-HL-200-ND',
    category: 'Xoài sấy',
    description: 'Xoài cát Hòa Lộc sấy dẻo, vị ngọt đậm đà, thơm lừng.',
    ingredients: ['100% Xoài cát Hòa Lộc'],
    benefits: ['Vitamin A, C, E', 'Chất xơ cao', 'Tốt cho da'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '12 tháng từ ngày sản xuất',
  },
  {
    id: '6',
    name: 'Dứa vàng sấy dẻo tự nhiên',
    image: 'https://images.unsplash.com/photo-1599599810694-b3b868a56b14?w=400&h=400&fit=crop',
    price: 99000,
    originalPrice: 129000,
    fruitType: 'Dứa',
    processingMethod: 'Sấy dẻo',
    weight: '100g',
    label: 'Nội địa',
    rating: 4.5,
    reviews: 121,
    stock: 55,
    sku: 'DUA-SD-100-ND',
    category: 'Dứa sấy',
    description: 'Dứa vàng sấy dẻo, giữ lại vị ngọt tự nhiên và hương thơm đặc trưng.',
    ingredients: ['100% Dứa Việt Nam'],
    benefits: ['Chứa enzym bromelin', 'Hỗ trợ tiêu hóa', 'Giàu vitamin C'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '12 tháng từ ngày sản xuất',
  },
  {
    id: '7',
    name: 'Mít tím sấy thăng hoa nguyên chất',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
    price: 189000,
    originalPrice: 249000,
    fruitType: 'Mít',
    processingMethod: 'Sấy thăng hoa',
    weight: '50g',
    label: 'Xuất khẩu',
    rating: 4.9,
    reviews: 189,
    stock: 18,
    sku: 'MIT-STH-50-XK',
    category: 'Mít sấy',
    description: 'Mít tím sấy thăng hoa, hạn chế giảm chất dinh dưỡng, vị ngon đặc biệt.',
    ingredients: ['100% Mít tím cao cấp'],
    benefits: ['Năng lượng cao', 'Vitamin B6', 'Chất xơ'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '18 tháng từ ngày sản xuất',
  },
  {
    id: '8',
    name: 'Xoài sấy thăng hoa siêu dinh dưỡng',
    image: 'https://images.unsplash.com/photo-1585864299869-592aa2513b0f?w=400&h=400&fit=crop',
    price: 199000,
    originalPrice: 269000,
    fruitType: 'Xoài',
    processingMethod: 'Sấy thăng hoa',
    weight: '100g',
    label: 'Xuất khẩu',
    rating: 4.8,
    reviews: 201,
    stock: 25,
    sku: 'XOA-STH-100-XK',
    category: 'Xoài sấy',
    description: 'Xoài sấy thăng hoa, giữ tối đa chất dinh dưỡng, hương vị đặc biệt.',
    ingredients: ['100% Xoài cao cấp'],
    benefits: ['Vitamin A, C, E cao', 'Chất chống oxy hóa', 'Tốt cho mắt'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '18 tháng từ ngày sản xuất',
  },
  {
    id: '9',
    name: 'Thanh long sấy dẻo mix hương vị',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd1f7673?w=400&h=400&fit=crop',
    price: 119000,
    fruitType: 'Thanh Long',
    processingMethod: 'Sấy dẻo',
    weight: '200g',
    label: 'Nội địa',
    rating: 4.6,
    reviews: 134,
    stock: 41,
    sku: 'TDL-SD-200-ND',
    category: 'Thanh long sấy',
    description: 'Thanh long sấy dẻo mix hương vị đỏ trắng, vừa có vị ngọt vừa mát lạnh.',
    ingredients: ['100% Thanh long Việt Nam'],
    benefits: ['Vitamin C cao', 'Prebiotic', 'Tốt cho sức khỏe'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '12 tháng từ ngày sản xuất',
  },
  {
    id: '10',
    name: 'Dứa sấy dẻo túi tiết kiệm',
    image: 'https://images.unsplash.com/photo-1599599810694-b3b868a56b14?w=400&h=400&fit=crop',
    price: 249000,
    originalPrice: 349000,
    fruitType: 'Dứa',
    processingMethod: 'Sấy dẻo',
    weight: '500g',
    label: 'Nội địa',
    rating: 4.7,
    reviews: 234,
    stock: 65,
    sku: 'DUA-SD-500-ND',
    category: 'Dứa sấy',
    description: 'Dứa sấy dẻo gói tiết kiệm 500g, phù hợp cho gia đình hoặc bán sỉ.',
    ingredients: ['100% Dứa Việt Nam'],
    benefits: ['Giá rẻ nhất', 'Lợi dụng cao', 'Dinh dưỡng đầy đủ'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '12 tháng từ ngày sản xuất',
  },
  {
    id: '11',
    name: 'Mít vàng sấy dẻo đặc sản',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
    price: 169000,
    fruitType: 'Mít',
    processingMethod: 'Sấy dẻo',
    weight: '100g',
    label: 'Xuất khẩu',
    rating: 4.8,
    reviews: 176,
    stock: 33,
    sku: 'MIT-SD-100-XK',
    category: 'Mít sấy',
    description: 'Mít vàng sấy dẻo đặc sản, chuẩn xuất khẩu, hương vị cao cấp.',
    ingredients: ['100% Mít vàng cao cấp'],
    benefits: ['Vitamin B6', 'Fiber cao', 'Năng lượng tốt'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '12 tháng từ ngày sản xuất',
  },
  {
    id: '12',
    name: 'Thanh long hỗn hợp sấy thăng hoa',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd1f7673?w=400&h=400&fit=crop',
    price: 179000,
    originalPrice: 229000,
    fruitType: 'Thanh Long',
    processingMethod: 'Sấy thăng hoa',
    weight: '200g',
    label: 'Xuất khẩu',
    rating: 4.9,
    reviews: 198,
    stock: 29,
    sku: 'TDL-STH-200-XK',
    category: 'Thanh long sấy',
    description: 'Thanh long hỗn hợp sấy thăng hoa, chuẩn xuất khẩu, vị chuẩn mực.',
    ingredients: ['100% Thanh long Việt Nam'],
    benefits: ['Vitamin C, B1, B2', 'Chất chống oxy hóa', 'Hỗ trợ tiêu hóa'],
    storage: 'Bảo quản ở nơi mát, khô ráo',
    expiryDate: '18 tháng từ ngày sản xuất',
  },
]

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
                <h1 className="text-3xl font-bold mb-1">Hoa Quả Sấy Đặc Sản</h1>
                <p className="text-primary-foreground/90 text-base">
                  Chất lượng cao, dinh dưỡng đầy đủ, công thức sấy riêng
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
                  So sánh
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
          products={mockProducts}
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
