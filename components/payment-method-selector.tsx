'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PaymentMethod } from '@/context/payment-context'
import { Check } from 'lucide-react'

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null
  onSelect: (method: PaymentMethod) => void
}

export function PaymentMethodSelector({
  selectedMethod,
  onSelect,
}: PaymentMethodSelectorProps) {
  const paymentMethods: Array<{
    id: PaymentMethod
    label: string
    description: string
    icon: string
    badge?: string
  }> = [
    {
      id: 'cod',
      label: 'Thanh toán khi nhận hàng',
      description: 'Thanh toán tiền mặt khi nhận đơn hàng',
      icon: '🚚',
      badge: 'Phổ biến',
    },
    {
      id: 'bank_transfer',
      label: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản trước để xác nhận đơn hàng',
      icon: '🏦',
    },
    {
      id: 'visa',
      label: 'Thẻ Visa',
      description: 'Thanh toán trực tiếp bằng thẻ Visa',
      icon: '💳',
    },
    {
      id: 'mastercard',
      label: 'Thẻ Mastercard',
      description: 'Thanh toán trực tiếp bằng thẻ Mastercard',
      icon: '💳',
    },
    {
      id: 'paypal',
      label: 'PayPal',
      description: 'Thanh toán qua ví điện tử PayPal',
      icon: '💰',
    },
    {
      id: 'apple_pay',
      label: 'Apple Pay',
      description: 'Thanh toán nhanh qua Apple Pay',
      icon: '🍎',
    },
    {
      id: 'google_pay',
      label: 'Google Pay',
      description: 'Thanh toán nhanh qua Google Pay',
      icon: '🔵',
    },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Chọn hình thức thanh toán</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Chúng tôi hỗ trợ nhiều hình thức thanh toán an toàn và tiện lợi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
              selectedMethod === method.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-secondary/50'
            }`}
            onClick={() => onSelect(method.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-2xl">{method.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-foreground">{method.label}</h4>
                    {method.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {method.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                </div>
              </div>
              {selectedMethod === method.id && (
                <div className="ml-2 rounded-full bg-primary text-primary-foreground p-1">
                  <Check size={16} />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
