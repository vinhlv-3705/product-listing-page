'use client'

import { Zap, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

const OFFERS = [
  {
    id: '1',
    title: 'Flash Sale',
    description: 'Giảm đến 50% cho các sản phẩm sấy thăng hoa',
    color: 'from-orange-500 to-red-500',
    icon: Zap,
  },
  {
    id: '2',
    title: 'Freeship',
    description: 'Miễn phí vận chuyển cho đơn hàng từ 500K',
    color: 'from-green-500 to-emerald-500',
    icon: Zap,
  },
  {
    id: '3',
    title: 'Combo',
    description: 'Mua 3 tặng 1 cho tất cả sản phẩm',
    color: 'from-blue-500 to-cyan-500',
    icon: Zap,
  },
]

export function SpecialOffers() {
  const [currentOffer, setCurrentOffer] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const offer = OFFERS[currentOffer]
  const Icon = offer.icon

  return (
    <div className={`bg-gradient-to-r ${offer.color} text-white py-3 px-4`}>
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <Icon size={16} />
            <span className="font-bold text-sm">{offer.title}</span>
          </div>
          <p className="text-sm hidden sm:block">{offer.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {OFFERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentOffer(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentOffer ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={() => setIsVisible(false)}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
