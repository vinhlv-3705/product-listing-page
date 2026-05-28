'use client'

import { createContext, useContext, useState } from 'react'
import { Coupon } from '@/lib/types'

interface CouponContextType {
  appliedCoupon: Coupon | null
  couponError: string | null
  applyCoupon: (code: string) => void
  removeCoupon: () => void
  getDiscount: (amount: number) => number
}

const CouponContext = createContext<CouponContextType | undefined>(undefined)

// Mock available coupons
const AVAILABLE_COUPONS: Record<string, Coupon> = {
  'WELCOME20': {
    id: '1',
    code: 'WELCOME20',
    discountType: 'percent',
    discountValue: 20,
    minPurchase: 0,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    usageLimit: 100,
    usageCount: 0,
    description: 'Giảm 20% cho đơn hàng đầu tiên',
    isActive: true,
  },
  'SUMMER50': {
    id: '2',
    code: 'SUMMER50',
    discountType: 'fixed',
    discountValue: 50000,
    minPurchase: 200000,
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    usageLimit: 50,
    usageCount: 0,
    description: 'Giảm 50K cho đơn hàng từ 200K',
    isActive: true,
  },
  'SAVE30': {
    id: '3',
    code: 'SAVE30',
    discountType: 'percent',
    discountValue: 30,
    minPurchase: 500000,
    maxDiscount: 100000,
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    usageLimit: 20,
    usageCount: 0,
    description: 'Giảm 30% tối đa 100K cho đơn từ 500K',
    isActive: true,
  },
}

export function CouponProvider({ children }: { children: React.ReactNode }) {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [couponError, setCouponError] = useState<string | null>(null)

  const applyCoupon = (code: string) => {
    const coupon = AVAILABLE_COUPONS[code.toUpperCase()]

    if (!coupon) {
      setCouponError('Mã giảm giá không tồn tại')
      setAppliedCoupon(null)
      return
    }

    if (!coupon.isActive) {
      setCouponError('Mã giảm giá không còn hoạt động')
      setAppliedCoupon(null)
      return
    }

    if (new Date(coupon.expiresAt) < new Date()) {
      setCouponError('Mã giảm giá đã hết hạn')
      setAppliedCoupon(null)
      return
    }

    if (coupon.usageCount >= coupon.usageLimit) {
      setCouponError('Mã giảm giá đã hết lượt sử dụng')
      setAppliedCoupon(null)
      return
    }

    setCouponError(null)
    setAppliedCoupon(coupon)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponError(null)
  }

  const getDiscount = (amount: number) => {
    if (!appliedCoupon || amount < appliedCoupon.minPurchase) {
      return 0
    }

    let discount = 0
    if (appliedCoupon.discountType === 'percent') {
      discount = Math.round((amount * appliedCoupon.discountValue) / 100)
      if (appliedCoupon.maxDiscount) {
        discount = Math.min(discount, appliedCoupon.maxDiscount)
      }
    } else {
      discount = appliedCoupon.discountValue
    }
    return discount
  }

  return (
    <CouponContext.Provider
      value={{
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        getDiscount,
      }}
    >
      {children}
    </CouponContext.Provider>
  )
}

export function useCoupon() {
  const context = useContext(CouponContext)
  if (!context) {
    throw new Error('useCoupon must be used within CouponProvider')
  }
  return context
}
