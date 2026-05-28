'use client'

import { ShoppingCart, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/cart-context'
import { usePayment } from '@/context/payment-context'
import { useCoupon } from '@/context/coupon-context'
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
import Image from 'next/image'
import { CouponInput } from './coupon-input'
import { AuthButton } from './auth-button'

export function CartHeader() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  const { setIsCheckoutOpen, setCurrentStep } = usePayment()
  const { appliedCoupon, getDiscount } = useCoupon()
  const [isOpen, setIsOpen] = useState(false)

  const discountAmount = getDiscount(total)
  const shippingCost = total > 500000 ? 0 : 30000
  const taxCost = Math.round((total - discountAmount) * 0.08)
  const finalTotal = total - discountAmount + shippingCost + taxCost

  const handleCheckout = () => {
    setCurrentStep('shipping')
    setIsCheckoutOpen(true)
    setIsOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <AuthButton />
      
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="relative gap-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ShoppingCart size={20} />
            <span className="font-semibold hidden sm:inline">Giỏ hàng</span>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Giỏ hàng của bạn</SheetTitle>
            <SheetDescription>
              {items.length} {items.length === 1 ? 'sản phẩm' : 'sản phẩm'}
            </SheetDescription>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <ShoppingCart size={48} className="text-muted-foreground" />
              <p className="text-center text-muted-foreground">
                Giỏ hàng của bạn đang trống
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-4 border-b border-border last:border-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(item.price / 1000).toFixed(0)}k₫
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-6 w-6 flex items-center justify-center border border-border rounded hover:bg-secondary transition-colors text-xs font-medium"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-6 w-6 flex items-center justify-center border border-border rounded hover:bg-secondary transition-colors text-xs font-medium"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-1 hover:bg-destructive/10 rounded transition-colors"
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Coupon Input */}
              <div className="py-4">
                <CouponInput />
              </div>

              {/* Totals */}
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính:</span>
                    <span className="font-medium">
                      {(total / 1000).toFixed(0)}k₫
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-accent">
                      <span>Giảm giá ({appliedCoupon?.code}):</span>
                      <span className="font-medium">
                        -{(discountAmount / 1000).toFixed(0)}k₫
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vận chuyển:</span>
                    <span className="font-medium">
                      {shippingCost > 0 ? `${(shippingCost / 1000).toFixed(0)}k₫` : 'Miễn phí'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Thuế (8%):</span>
                    <span className="font-medium">
                      {(taxCost / 1000).toFixed(0)}k₫
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="font-bold text-foreground">Tổng cộng:</span>
                  <span className="text-xl font-bold text-primary">
                    {(finalTotal / 1000).toFixed(0)}k₫
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full h-10 font-semibold bg-primary hover:bg-primary/90"
                  >
                    Thanh toán
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-10"
                    onClick={() => setIsOpen(false)}
                  >
                    Tiếp tục mua sắm
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full h-10 text-destructive hover:bg-destructive/10"
                    onClick={clearCart}
                  >
                    Xóa giỏ hàng
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
