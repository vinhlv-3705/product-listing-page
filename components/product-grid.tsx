'use client'

import { ProductCard } from './product-card'
import { ProductDetailModal } from './product-detail-modal'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Package } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import { Product } from '@/lib/types'
import { isFlashSale } from '@/lib/products-data'

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter products based on active filters and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
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
        sorted.sort((a, b) => {
          const aReviews = Array.isArray(a.reviews) ? a.reviews.length : (a.reviews || 0)
          const bReviews = Array.isArray(b.reviews) ? b.reviews.length : (b.reviews || 0)
          return bReviews - aReviews
        })
        break
      case 'newest':
      default:
        break
    }

    return sorted
  }, [filteredProducts, sortBy])

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex)

  // Reset to first page when filters or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilters, searchQuery, sortBy])

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

  const handleViewDetail = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      setSelectedProduct(product)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div>
      {sortedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center">
            <Package size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Khong tim thay san pham
            </h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Thu tim kiem voi tu khoa khac' : 'Thu thay doi cac bo loc de tim san pham ban muon'}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Results Header */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Hien thi <span className="font-semibold text-foreground">{startIndex + 1}-{Math.min(endIndex, sortedProducts.length)}</span> tren{' '}
              <span className="font-semibold text-foreground">{sortedProducts.length}</span> san pham
              {searchQuery && (
                <span className="ml-2">
                  cho &quot;<span className="font-medium text-primary">{searchQuery}</span>&quot;
                </span>
              )}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                originalPrice={product.originalPrice}
                fruitType={product.fruitType}
                processingMethod={product.processingMethod}
                weight={product.weight}
                label={product.label}
                rating={product.rating}
                reviews={Array.isArray(product.reviews) ? product.reviews.length : product.reviews}
                stock={product.stock}
                isFlashSale={isFlashSale(product.id)}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 py-8 border-t border-border">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="gap-2"
                >
                  <ChevronLeft size={16} />
                  Truoc
                </Button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, idx) => (
                    page === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">...</span>
                    ) : (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setCurrentPage(page as number)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="min-w-10"
                      >
                        {page}
                      </Button>
                    )
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="gap-2"
                >
                  Tiep
                  <ChevronRight size={16} />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Trang {currentPage} / {totalPages}
              </p>
            </div>
          )}
        </>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        allProducts={products}
      />
    </div>
  )
}
