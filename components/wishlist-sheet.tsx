'use client'

import { Heart, ShoppingCart, Trash2, Star, Package } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { useWishlist } from '@/context/wishlist-context'
import { useCart } from '@/context/cart-context'
import { getProductById, isFlashSale } from '@/lib/products-data'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function WishlistSheet() {
  const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  // Get full product data from wishlist IDs
  const wishlistItems = wishlistIds
    .map(id => getProductById(id))
    .filter((product): product is NonNullable<typeof product> => product !== undefined)

  const handleAddToCart = (productId: string) => {
    const product = getProductById(productId)
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  const handleMoveAllToCart = () => {
    wishlistItems.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      })
    })
    clearWishlist()
    setIsOpen(false)
  }

  // Calculate total value of wishlist
  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)
  const totalSavings = wishlistItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price)
    }
    return sum
  }, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Heart size={20} />
          {wishlistIds.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="text-red-500 fill-red-500" size={24} />
            Danh sach yeu thich
          </SheetTitle>
          <SheetDescription>
            {wishlistIds.length} san pham trong danh sach
          </SheetDescription>
        </SheetHeader>

        {wishlistIds.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="bg-secondary/50 rounded-full p-6">
              <Heart size={48} className="text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground mb-1">Chua co san pham yeu thich</p>
              <p className="text-sm text-muted-foreground">
                Nhan bieu tuong trai tim de them san pham vao danh sach
              </p>
            </div>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Tiep tuc mua sam
            </Button>
          </div>
        ) : (
          <>
            {/* Wishlist Summary */}
            <div className="bg-secondary/30 rounded-lg p-3 mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tong gia tri:</span>
                <span className="font-semibold text-primary">{totalValue.toLocaleString()}d</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Tiet kiem:</span>
                  <span className="font-semibold text-green-600">{totalSavings.toLocaleString()}d</span>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {wishlistItems.map((item) => {
                const discount = item.originalPrice 
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) 
                  : 0
                const inStock = item.stock > 0
                const onFlashSale = isFlashSale(item.id)

                return (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-4 border-b border-border last:border-0"
                  >
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {onFlashSale && (
                        <Badge className="absolute top-1 left-1 text-[10px] bg-gradient-to-r from-orange-500 to-red-500 border-0">
                          Flash
                        </Badge>
                      )}
                      {!inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">Het hang</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          <span>{item.rating}</span>
                          <span>-</span>
                          <span>{item.weight}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold text-primary">
                            {(item.price / 1000).toFixed(0)}k
                          </span>
                          {item.originalPrice && (
                            <>
                              <span className="text-xs text-muted-foreground line-through">
                                {(item.originalPrice / 1000).toFixed(0)}k
                              </span>
                              <Badge variant="secondary" className="text-[10px] bg-accent/20 text-accent">
                                -{discount}%
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(item.id)}
                          disabled={!inStock}
                          className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90"
                        >
                          <ShoppingCart size={14} className="mr-1" />
                          {inStock ? 'Mua ngay' : 'Het hang'}
                        </Button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-2 hover:bg-destructive/10 rounded transition-colors"
                          title="Xoa khoi danh sach"
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Separator />

            <div className="space-y-2 pt-4">
              <Button
                className="w-full h-10 font-semibold bg-primary hover:bg-primary/90"
                onClick={handleMoveAllToCart}
              >
                <ShoppingCart size={18} className="mr-2" />
                Them tat ca vao gio ({wishlistItems.filter(i => i.stock > 0).length})
              </Button>
              <Button
                variant="outline"
                className="w-full h-10"
                onClick={() => setIsOpen(false)}
              >
                Tiep tuc mua sam
              </Button>
              <Button
                variant="ghost"
                className="w-full h-10 text-destructive hover:bg-destructive/10"
                onClick={clearWishlist}
              >
                <Trash2 size={16} className="mr-2" />
                Xoa tat ca
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
