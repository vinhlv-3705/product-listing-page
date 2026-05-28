'use client'

import { ProductCard } from './product-card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useMemo } from 'react'

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  fruitType: string
  processingMethod: string
  weight: string
  label: string
  rating?: number
  reviews?: number
  stock?: number
  description?: string
  images?: string[]
}

interface ProductGridProps {
  products: Product[]
  activeFilters: Record<string, string[]>
  searchQuery?: string
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'bestseller'
  onSortChange?: (sort: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'bestseller') => void
}

const ITEMS_PER_PAGE = 12

export function ProductGrid({
  products,
  activeFilters,
  searchQuery = '',
  sortBy = 'newest',
  onSortChange,
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Filter products based on active filters and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by category/type
      const { fruitType: fruitTypeFilters, processingMethod: processingFilters, weight: weightFilters, label: labelFilters } = activeFilters

      if (fruitTypeFilters.length > 0 && !fruitTypeFilters.includes(product.fruitType)) {
        return false
      }

      if (processingFilters.length > 0 && !processingFilters.includes(product.processingMethod)) {
        return false
      }

      if (weightFilters.length > 0 && !weightFilters.includes(product.weight)) {
        return false
      }

      if (labelFilters.length > 0 && !labelFilters.includes(product.label)) {
        return false
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = product.name.toLowerCase().includes(query)
        const matchesDescription = product.description?.toLowerCase().includes(query) || false
        const matchesFruitType = product.fruitType.toLowerCase().includes(query)

        if (!matchesName && !matchesDescription && !matchesFruitType) {
          return false
        }
      }

      return true
    })
  }, [products, activeFilters, searchQuery])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'bestseller':
        sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
        break
      case 'newest':
      default:
        // Keep original order or by date if available
        break
    }

    return sorted
  }, [filteredProducts, sortBy])

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Reset to first page when filters or search changes
  const handleFilterOrSearchChange = () => {
    setCurrentPage(1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div>
      {sortedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Thử thay đổi các bộ lọc để tìm sản phẩm bạn muốn'}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Results Header */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Hiển thị <span className="font-semibold text-foreground">{paginatedProducts.length}</span> trên{' '}
              <span className="font-semibold text-foreground">{sortedProducts.length}</span> sản phẩm
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-8">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="gap-2"
              >
                <ChevronLeft size={16} />
                Trước
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setCurrentPage(page)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="min-w-10"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="gap-2"
              >
                Tiếp
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
