'use client'

import { Package, Clock, Truck, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface OrderTrackingProps {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered'
  orderNumber: string
  createdAt: string
  estimatedDelivery?: string
}

const STATUS_CONFIG = {
  pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800', icon: CheckCircle2 },
  processing: { label: 'Đang chuẩn bị', color: 'bg-purple-100 text-purple-800', icon: Package },
  shipped: { label: 'Đã gửi', color: 'bg-orange-100 text-orange-800', icon: Truck },
  delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
}

const TIMELINE = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

export function OrderTracking({ status, orderNumber, createdAt, estimatedDelivery }: OrderTrackingProps) {
  const currentStep = TIMELINE.indexOf(status)

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="bg-secondary/30 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">Đơn hàng #</p>
        <p className="text-xl font-bold">{orderNumber}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Đặt hàng: {new Date(createdAt).toLocaleDateString('vi-VN')}
        </p>
      </div>

      {/* Status Badge */}
      <div>
        <Badge className={STATUS_CONFIG[status].color}>
          {STATUS_CONFIG[status].label}
        </Badge>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {TIMELINE.map((step, idx) => {
          const isCompleted = idx <= currentStep
          const Icon = STATUS_CONFIG[step as typeof status].icon

          return (
            <div key={step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  <Icon size={20} />
                </div>
                {idx < TIMELINE.length - 1 && (
                  <div
                    className={`w-0.5 h-12 mt-2 transition-colors ${
                      idx < currentStep ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
              <div className="pt-2 pb-6">
                <p className={`font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {STATUS_CONFIG[step as typeof status].label}
                </p>
                {step === status && estimatedDelivery && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Dự kiến: {new Date(estimatedDelivery).toLocaleDateString('vi-VN')}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
