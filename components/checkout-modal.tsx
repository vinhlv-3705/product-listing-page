'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ShippingForm } from './shipping-form'
import { PaymentMethodSelector } from './payment-method-selector'
import { CouponInput } from './coupon-input'
import { useCart } from '@/context/cart-context'
import { usePayment, ShippingInfo, PaymentMethod } from '@/context/payment-context'
import { useCoupon } from '@/context/coupon-context'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'

export function CheckoutModal() {
  const { items, total } = useCart()
  const { isCheckoutOpen, currentStep, setIsCheckoutOpen, setCurrentStep, createOrder, processPayment, resetCheckout } =
    usePayment()
  const { appliedCoupon, getDiscount } = useCoupon()

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = total
  const shippingCost = subtotal > 500000 ? 0 : 30000
  const tax = Math.round(subtotal * 0.08)
  const discount = getDiscount(subtotal)
  const finalTotal = subtotal + shippingCost + tax - discount

  const handleShippingSubmit = async (info: ShippingInfo) => {
    setShippingInfo(info)
    setCurrentStep('payment')
  }

  const handlePaymentSelect = () => {
    if (paymentMethod) {
      setCurrentStep('review')
    }
  }

  const handlePlaceOrder = async () => {
    if (!shippingInfo || !paymentMethod) return

    setIsProcessing(true)
    try {
      const order = await createOrder({
        items: items.map((item) => ({
          ...item,
          quantity: 1,
        })),
        shippingInfo,
        paymentMethod,
        subtotal,
        shippingCost,
        tax,
        total: finalTotal,
      })

      // Process payment
      const success = await processPayment(paymentMethod)

      if (success) {
        // Show success message and close after delay
        setTimeout(() => {
          resetCheckout()
          setIsCheckoutOpen(false)
        }, 2000)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping')
    } else if (currentStep === 'review') {
      setCurrentStep('payment')
    }
  }

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="flex items-center gap-2">
            {currentStep !== 'shipping' && (
              <button
                onClick={handleBack}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <span>
              {currentStep === 'shipping' && 'Thông tin giao hàng'}
              {currentStep === 'payment' && 'Chọn hình thức thanh toán'}
              {currentStep === 'review' && 'Xác nhận đơn hàng'}
            </span>
          </DialogTitle>
          <div className="flex gap-1">
            <Badge variant={currentStep === 'shipping' ? 'default' : 'secondary'}>1</Badge>
            <Badge variant={currentStep === 'payment' ? 'default' : 'secondary'}>2</Badge>
            <Badge variant={currentStep === 'review' ? 'default' : 'secondary'}>3</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Content */}
          <div>
            {currentStep === 'shipping' && (
              <ShippingForm onSubmit={handleShippingSubmit} initialData={shippingInfo || undefined} />
            )}

            {currentStep === 'payment' && (
              <div className="space-y-4">
                <PaymentMethodSelector
                  selectedMethod={paymentMethod}
                  onSelect={setPaymentMethod}
                />
                <Button
                  onClick={handlePaymentSelect}
                  disabled={!paymentMethod}
                  className="w-full h-10 font-semibold"
                >
                  Tiếp tục
                </Button>
              </div>
            )}

            {currentStep === 'review' && shippingInfo && (
              <div className="space-y-6">
                {/* Shipping Summary */}
                <Card className="p-4">
                  <h4 className="font-semibold text-foreground mb-3">Địa chỉ giao hàng</h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p className="font-medium text-foreground">{shippingInfo.fullName}</p>
                    <p>{shippingInfo.phone}</p>
                    <p>{shippingInfo.email}</p>
                    <p>{shippingInfo.address}</p>
                    <p>
                      {shippingInfo.ward}, {shippingInfo.district}, {shippingInfo.province}
                    </p>
                    {shippingInfo.note && <p className="italic text-xs mt-2">{shippingInfo.note}</p>}
                  </div>
                </Card>

                {/* Payment Method */}
                <Card className="p-4">
                  <h4 className="font-semibold text-foreground mb-2">Hình thức thanh toán</h4>
                  <p className="text-sm text-muted-foreground">
                    {paymentMethod === 'cod' && 'Thanh toán khi nhận hàng'}
                    {paymentMethod === 'bank_transfer' && 'Chuyển khoản ngân hàng'}
                    {paymentMethod === 'visa' && 'Thẻ Visa'}
                    {paymentMethod === 'mastercard' && 'Thẻ Mastercard'}
                    {paymentMethod === 'paypal' && 'PayPal'}
                    {paymentMethod === 'apple_pay' && 'Apple Pay'}
                    {paymentMethod === 'google_pay' && 'Google Pay'}
                  </p>
                </Card>

                {/* Order Items */}
                <Card className="p-4">
                  <h4 className="font-semibold text-foreground mb-3">Sản phẩm đặt hàng</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-foreground flex-1 truncate">{item.name}</span>
                        <span className="text-muted-foreground ml-2">{item.price.toLocaleString()}₫</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Coupon Input */}
                <CouponInput />

                {/* Order Summary */}
                <Card className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính:</span>
                    <span className="text-foreground">{subtotal.toLocaleString()}₫</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vận chuyển:</span>
                    <span className="text-foreground">
                      {shippingCost === 0 ? (
                        <span className="text-accent">Miễn phí</span>
                      ) : (
                        `${shippingCost.toLocaleString()}₫`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Thuế (8%):</span>
                    <span className="text-foreground">{tax.toLocaleString()}₫</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Giảm giá:</span>
                      <span className="text-accent">-{discount.toLocaleString()}₫</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Tổng cộng:</span>
                    <span className="text-primary text-lg">{finalTotal.toLocaleString()}₫</span>
                  </div>
                </Card>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full h-10 font-semibold"
                >
                  {isProcessing && <Loader2 size={16} className="mr-2 animate-spin" />}
                  {isProcessing ? 'Đang xử lý...' : 'Đặt hàng'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
