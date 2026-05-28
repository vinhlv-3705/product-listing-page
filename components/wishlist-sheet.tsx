'use client'

import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useWishlist } from '@/context/wishlist-context'
import { useCart } from '@/context/cart-context'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// Mock product data for wishlist display
const MOCK_PRODUCTS: Record<string, any> = {
  '1': { id: '1', name: 'Xoài sấy dẻo premium', price: 89000, image: 'https://images.unsplash.com/photo-1585864299869-592aa2513b0f?w=400&h=400&fit=crop' },
  '2': { id: '2', name: 'Dứa sấy thăng hoa tinh khiết', price: 129000, image: 'https://images.unsplash.com/photo-1599599810694-b3b868a56b14?w=400&h=400&fit=crop' },
  '3': { id: '3', name: 'Mít sấy dẻo vàng ươm', price: 149000, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop' },
}

export function WishlistSheet() {
  const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const wishlistItems = wishlistIds
    .map(id => MOCK_PRODUCTS[id])
    .filter(Boolean)

  const handleAddToCart = (productId: string) => {
    const product = MOCK_PRODUCTS[productId]
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="relative gap-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Heart size={20} />
          <span className="font-semibold hidden sm:inline">Yêu thích</span>
          {wishlistIds.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Danh sách yêu thích</SheetTitle>
          <SheetDescription>
            {wishlistIds.length} {wishlistIds.length === 1 ? 'sản phẩm' : 'sản phẩm'}
          </SheetDescription>
        </SheetHeader>

        {wishlistIds.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <Heart size={48} className="text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              Chưa có sản phẩm yêu thích
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 pb-4 border-b border-border last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-md object-cover bg-secondary"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(item.price / 1000).toFixed(0)}k₫
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(item.id)}
                        className="flex-1 h-7 text-xs bg-primary hover:bg-primary/90"
                      >
                        <ShoppingCart size={14} className="mr-1" />
                        Mua
                      </Button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-1 hover:bg-destructive/10 rounded transition-colors"
                      >
                        <Trash2 size={16} className="text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2 pt-4">
              <Button
                className="w-full h-10 font-semibold bg-primary hover:bg-primary/90"
                onClick={() => setIsOpen(false)}
              >
                Tiếp tục mua sắm
              </Button>
              <Button
                variant="ghost"
                className="w-full h-10 text-destructive hover:bg-destructive/10"
                onClick={clearWishlist}
              >
                Xóa tất cả
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
