'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (!email.includes('@')) return
    
    localStorage.setItem('newsletter_email', email)
    setIsSubscribed(true)
    setEmail('')
    
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Mail size={20} className="text-primary" />
        <h3 className="font-bold text-foreground">Đăng ký nhận bản tin</h3>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Nhận ngay giảm giá 10% cho đơn hàng đầu tiên + thông tin sản phẩm mới
      </p>

      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
          className="h-10"
          disabled={isSubscribed}
        />
        <Button
          onClick={handleSubscribe}
          disabled={!email.includes('@') || isSubscribed}
          className="h-10"
        >
          {isSubscribed ? 'Đã đăng ký' : 'Đăng ký'}
        </Button>
      </div>

      {isSubscribed && (
        <Badge className="w-full text-center py-2 bg-green-600">
          Cảm ơn! Kiểm tra email của bạn để nhận mã giảm giá
        </Badge>
      )}
    </div>
  )
}
