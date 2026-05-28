'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ShoppingCart, Check, Heart, Package, Zap, Bell } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'

interface ProductCardProps {
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
  isFlashSale?: boolean
}

export function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  fruitType,
  processingMethod,
  weight,
  label,
  rating = 4.5,
  reviews = 128,
  stock = 100,
  isFlashSale = false,
}: ProductCardProps) {
  const { addItem } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [isAdded, setIsAdded] = useState(false)
  const [notifyRequested, setNotifyRequested] = useState(false)

  const skuSummary = `${fruitType} - ${processingMethod} - ${weight} - ${label}`
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const inStock = stock > 0
  const isFavorite = isInWishlist(id)

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
    })
    
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleToggleWishlist = () => {
    if (isFavorite) {
      removeFromWishlist(id)
    } else {
      addToWishlist(id)
    }
  }

  const handleNotify = () => {
    setNotifyRequested(true)
    // In a real app, this would send a notification request to the server
    setTimeout(() => {
      setNotifyRequested(false)
    }, 3000)
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
      {/* Image Container */}
      <CardContent className="p-0 relative overflow-hidden bg-secondary aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isFlashSale && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
              <Zap size={12} className="mr-1" />
              Flash Sale
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-accent text-accent-foreground shadow-lg">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all hover:scale-110"
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>

        {/* Stock Indicator */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white">
              <Package size={32} className="mx-auto mb-2" />
              <p className="font-semibold">Hết hàng</p>
            </div>
          </div>
        )}

        {isAdded && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300">
            <div className="bg-primary text-primary-foreground rounded-full p-3 animate-scale-in">
              <Check size={24} />
            </div>
          </div>
        )}
      </CardContent>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-3 flex-grow">
        <div>
          <h3 className="font-bold text-base text-foreground leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          {/* SKU Summary */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            {skuSummary}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-xs font-medium">
            {fruitType}
          </Badge>
          <Badge variant="outline" className="text-xs font-medium">
            {weight}
          </Badge>
          <Badge 
            variant="secondary" 
            className={`text-xs font-medium ${label === 'Xuất khẩu' ? 'bg-accent/20 text-accent' : ''}`}
          >
            {label}
          </Badge>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-sm font-semibold text-foreground">{rating}</span>
            <span className="text-xs text-muted-foreground ml-1">★ ({reviews})</span>
          </div>
        </div>

        {/* Stock Indicator */}
        {inStock && stock <= 5 && (
          <div className="flex items-center gap-1 text-xs text-destructive font-medium">
            <Package size={12} />
            Chỉ còn {stock} sản phẩm
          </div>
        )}

        {/* Price */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-primary">
              {(price / 1000).toFixed(0)}k
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {(originalPrice / 1000).toFixed(0)}k
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        {!inStock ? (
          <Button
            onClick={handleNotify}
            disabled={notifyRequested}
            className={`w-full h-10 font-semibold text-sm transition-all duration-300 ${
              notifyRequested
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            {notifyRequested ? (
              <>
                <Check size={16} className="mr-2" />
                Đã đăng ký
              </>
            ) : (
              <>
                <Bell size={16} className="mr-2" />
                Thông báo khi có hàng
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleAddToCart}
            className={`w-full h-10 font-semibold text-sm transition-all duration-300 ${
              isAdded
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={16} className="mr-2" />
                Đã thêm
              </>
            ) : (
              <>
                <ShoppingCart size={16} className="mr-2" />
                Thêm vào giỏ
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  )
}
