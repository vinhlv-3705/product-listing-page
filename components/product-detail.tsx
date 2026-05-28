'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Share2, Truck, Shield, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import { useCompare } from '@/context/compare-context'
import { ProductCard } from './product-card'

interface ProductDetailProps {
  product: {
    id: string
    name: string
    description: string
    longDescription: string
    image: string
    images: string[]
    price: number
    originalPrice?: number
    fruitType: string
    processingMethod: string
    weight: string
    label: string
    rating: number
    reviews: any[]
    stock: number
    specifications: {
      origin: string
      shelf_life: string
      storage: string
      ingredients: string
    }
    relatedProducts?: any[]
  }
  allProducts?: any[]
}

export function ProductDetail({ product, allProducts = [] }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { isInCompare, addToCompare, removeFromCompare } = useCompare()

  const images = product.images || [product.image]
  const inWishlist = isInWishlist(product.id)
  const inCompare = isInCompare(product.id)
  const inStock = product.stock > 0
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Get related products (same fruit type, excluding current product)
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.fruitType === product.fruitType)
    .slice(0, 4)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  const handleCompare = () => {
    if (inCompare) {
      removeFromCompare(product.id)
    } else {
      addToCompare(product.id)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Images */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary group">
          <Image
            src={images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover"
          />

          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-md text-sm font-bold">
              -{discount}%
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                  idx === currentImageIndex ? 'border-primary' : 'border-border'
                }`}
              >
                <Image src={img} alt={`${product.name}-${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <Badge className="mb-2">{product.fruitType}</Badge>
          <h1 className="text-3xl font-bold text-foreground mb-3">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews?.length || 0} đánh giá)</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <span className={`text-sm font-medium ${inStock ? 'text-green-600' : 'text-destructive'}`}>
              {inStock ? 'Còn hàng' : 'Hết hàng'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{product.processingMethod}</Badge>
            <Badge variant="outline">{product.weight}</Badge>
            <Badge variant={product.label === 'Xuất khẩu' ? 'default' : 'secondary'}>
              {product.label}
            </Badge>
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-primary">
              {(product.price / 1000).toFixed(0)}k₫
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {(product.originalPrice / 1000).toFixed(0)}k₫
              </span>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3 bg-secondary/30 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Truck size={16} className="text-primary" />
            <span>Miễn phí vận chuyển cho đơn &gt; 500k</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield size={16} className="text-primary" />
            <span>Bảo hành chất lượng 100%</span>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Số lượng:</span>
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 hover:bg-secondary transition-colors"
            >
              −
            </button>
            <span className="px-6 py-2 font-semibold min-w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="px-3 py-2 hover:bg-secondary transition-colors"
            >
              +
            </button>
          </div>
          {product.stock <= 5 && inStock && (
            <span className="text-xs text-destructive font-medium">Chỉ còn {product.stock} sản phẩm</span>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="w-full h-12 font-semibold bg-primary hover:bg-primary/90"
          >
            <ShoppingCart size={18} className="mr-2" />
            Thêm vào giỏ
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleWishlist}
              variant={inWishlist ? 'default' : 'outline'}
              className="h-11"
            >
              <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
            </Button>
            <Button
              onClick={handleCompare}
              variant={inCompare ? 'default' : 'outline'}
              className="h-11"
            >
              So sánh
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Mô tả</TabsTrigger>
            <TabsTrigger value="specs">Thông số</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-4 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">{product.longDescription}</p>
          </TabsContent>

          <TabsContent value="specs" className="mt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm pb-3 border-b">
                <span className="text-muted-foreground">Xuất xứ:</span>
                <span className="font-medium">{product.specifications.origin}</span>
              </div>
              <div className="flex justify-between text-sm pb-3 border-b">
                <span className="text-muted-foreground">Hạn sử dụng:</span>
                <span className="font-medium">{product.specifications.shelf_life}</span>
              </div>
              <div className="flex justify-between text-sm pb-3 border-b">
                <span className="text-muted-foreground">Bảo quản:</span>
                <span className="font-medium">{product.specifications.storage}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Thành phần:</span>
                <span className="font-medium">{product.specifications.ingredients}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4 space-y-4">
            {product.reviews?.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review: any, idx: number) => (
                  <div key={idx} className="pb-4 border-b">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.userName}</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{review.comment}</p>
                    {review.verified && (
                      <Badge variant="secondary" className="mt-2 text-xs">Đã mua</Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Chưa có đánh giá</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                name={relatedProduct.name}
                image={relatedProduct.image}
                price={relatedProduct.price}
                originalPrice={relatedProduct.originalPrice}
                fruitType={relatedProduct.fruitType}
                processingMethod={relatedProduct.processingMethod}
                weight={relatedProduct.weight}
                label={relatedProduct.label}
                rating={relatedProduct.rating}
                reviews={relatedProduct.reviews}
                stock={relatedProduct.stock}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

