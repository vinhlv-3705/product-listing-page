'use client'

import { useState } from 'react'
import { Ticket, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCoupon } from '@/context/coupon-context'

export function CouponInput({ onApply }: { onApply?: (discount: number) => void }) {
  const { appliedCoupon, couponError, applyCoupon, removeCoupon } = useCoupon()
  const [code, setCode] = useState('')

  const handleApply = () => {
    applyCoupon(code.toUpperCase())
    setCode('')
  }

  return (
    <div className="space-y-3 bg-secondary/30 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Ticket size={18} className="text-primary" />
        <span className="font-semibold">Mã giảm giá</span>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between bg-primary/10 p-3 rounded-lg border border-primary/20">
          <div>
            <p className="font-bold text-primary">{appliedCoupon.code}</p>
            <p className="text-xs text-muted-foreground">{appliedCoupon.description}</p>
          </div>
          <button
            onClick={removeCoupon}
            className="p-1 hover:bg-destructive/10 rounded transition-colors"
          >
            <X size={18} className="text-destructive" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Nhập mã giảm giá"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleApply()}
          />
          <Button
            onClick={handleApply}
            disabled={!code.trim()}
            className="h-10"
          >
            Áp dụng
          </Button>
        </div>
      )}

      {couponError && (
        <p className="text-xs text-destructive">{couponError}</p>
      )}

      <div className="text-xs text-muted-foreground pt-2 border-t">
        <p className="mb-1 font-medium">Mã khuyến mại:</p>
        <div className="space-y-1">
          <p>WELCOME20 - Giảm 20% đơn đầu tiên</p>
          <p>SUMMER50 - Giảm 50K từ 200K</p>
          <p>SAVE30 - Giảm 30% tối đa 100K</p>
        </div>
      </div>
    </div>
  )
}
