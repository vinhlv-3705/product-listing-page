'use client'

import { Heart } from 'lucide-react'
import { useWishlist } from '@/context/wishlist-context'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'

interface WishlistButtonProps {
  product: Product
  size?: number
}

export function WishlistButton({ product, size = 20 }: WishlistButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const isFavorite = isInWishlist(product.id)

  const handleToggle = () => {
    if (isFavorite) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      size="icon"
      className={`transition-colors ${
        isFavorite
          ? 'text-accent bg-accent/10 hover:bg-accent/20'
          : 'text-muted-foreground hover:text-accent hover:bg-accent/10'
      }`}
    >
      <Heart
        size={size}
        className={isFavorite ? 'fill-current' : ''}
      />
    </Button>
  )
}
