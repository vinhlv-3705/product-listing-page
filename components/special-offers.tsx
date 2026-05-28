'use client'

import { Zap, X, Clock, Gift, Truck, Percent } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'

interface Offer {
  id: string
  title: string
  description: string
  color: string
  icon: React.ElementType
  couponCode?: string
  endsAt?: Date
}

const OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Flash Sale',
    description: 'Giam den 50% cho cac san pham say thang hoa - Ket thuc sau:',
    color: 'from-orange-500 to-red-500',
    icon: Zap,
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  },
  {
    id: '2',
    title: 'Freeship',
    description: 'Mien phi van chuyen cho don hang tu 500K - Ma: FREESHIP',
    color: 'from-green-500 to-emerald-500',
    icon: Truck,
    couponCode: 'FREESHIP',
  },
  {
    id: '3',
    title: 'Ma WELCOME20',
    description: 'Giam 20% cho khach hang moi - Nhap ma: WELCOME20',
    color: 'from-blue-500 to-cyan-500',
    icon: Percent,
    couponCode: 'WELCOME20',
  },
  {
    id: '4',
    title: 'Combo',
    description: 'Mua 3 tang 1 cho tat ca san pham - Tu dong ap dung',
    color: 'from-purple-500 to-pink-500',
    icon: Gift,
  },
]

function CountdownTimer({ endsAt }: { endsAt: Date }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = endsAt.getTime() - Date.now()
      if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 }
      }
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endsAt])

  return (
    <div className="flex items-center gap-1 ml-2">
      <div className="bg-white/20 px-2 py-0.5 rounded text-sm font-bold">
        {String(timeLeft.hours).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className="bg-white/20 px-2 py-0.5 rounded text-sm font-bold">
        {String(timeLeft.minutes).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className="bg-white/20 px-2 py-0.5 rounded text-sm font-bold">
        {String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </div>
  )
}

export function SpecialOffers() {
  const [currentOffer, setCurrentOffer] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [copied, setCopied] = useState(false)

  // Auto-rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % OFFERS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const offer = OFFERS[currentOffer]
  const Icon = offer.icon

  const handleCopyCode = async () => {
    if (offer.couponCode) {
      await navigator.clipboard.writeText(offer.couponCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={`bg-gradient-to-r ${offer.color} text-white py-3 px-4 relative overflow-hidden`}>
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-4 -top-4 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse" />
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="container mx-auto flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <Icon size={16} />
            <span className="font-bold text-sm">{offer.title}</span>
          </div>
          <div className="flex items-center">
            <p className="text-sm hidden sm:block">{offer.description}</p>
            {offer.endsAt && <CountdownTimer endsAt={offer.endsAt} />}
          </div>
          {offer.couponCode && (
            <button
              onClick={handleCopyCode}
              className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-colors"
            >
              <span className="font-mono font-bold">{offer.couponCode}</span>
              <Badge variant="secondary" className="bg-white text-foreground text-xs">
                {copied ? 'Da sao chep!' : 'Sao chep'}
              </Badge>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Offer indicators */}
          <div className="flex gap-1">
            {OFFERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentOffer(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentOffer ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'
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
