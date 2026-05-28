'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ShippingInfo } from '@/context/payment-context'

interface ShippingFormProps {
  onSubmit: (shippingInfo: ShippingInfo) => void
  initialData?: ShippingInfo
}

export function ShippingForm({ onSubmit, initialData }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingInfo>(
    initialData || {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      ward: '',
      district: '',
      province: '',
    }
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên'
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại'
    if (!/^0\d{9}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại không hợp lệ'
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email không hợp lệ'
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ'
    if (!formData.ward.trim()) newErrors.ward = 'Vui lòng nhập phường/xã'
    if (!formData.district.trim()) newErrors.district = 'Vui lòng nhập quận/huyện'
    if (!formData.province.trim()) newErrors.province = 'Vui lòng nhập tỉnh/thành phố'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof ShippingInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Thông tin giao hàng</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Vui lòng nhập thông tin chính xác để chúng tôi có thể giao hàng đến bạn
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Họ và tên *
          </label>
          <Input
            placeholder="Nguyễn Văn A"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={errors.fullName ? 'border-destructive' : ''}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Phone and Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Số điện thoại *
            </label>
            <Input
              placeholder="0901234567"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-xs text-destructive mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Email *
            </label>
            <Input
              type="email"
              placeholder="abc@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Địa chỉ *
          </label>
          <Input
            placeholder="123 Đường Nguyễn Huệ"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className={errors.address ? 'border-destructive' : ''}
          />
          {errors.address && (
            <p className="text-xs text-destructive mt-1">{errors.address}</p>
          )}
        </div>

        {/* Ward, District, Province */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Phường/Xã *
            </label>
            <Input
              placeholder="Phường 1"
              value={formData.ward}
              onChange={(e) => handleChange('ward', e.target.value)}
              className={errors.ward ? 'border-destructive' : ''}
            />
            {errors.ward && (
              <p className="text-xs text-destructive mt-1">{errors.ward}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Quận/Huyện *
            </label>
            <Input
              placeholder="Quận 1"
              value={formData.district}
              onChange={(e) => handleChange('district', e.target.value)}
              className={errors.district ? 'border-destructive' : ''}
            />
            {errors.district && (
              <p className="text-xs text-destructive mt-1">{errors.district}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Tỉnh/Thành phố *
            </label>
            <Input
              placeholder="TP. Hồ Chí Minh"
              value={formData.province}
              onChange={(e) => handleChange('province', e.target.value)}
              className={errors.province ? 'border-destructive' : ''}
            />
            {errors.province && (
              <p className="text-xs text-destructive mt-1">{errors.province}</p>
            )}
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Ghi chú (tùy chọn)
          </label>
          <Input
            placeholder="Ghi chú thêm về địa chỉ..."
            value={formData.note || ''}
            onChange={(e) => handleChange('note', e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full h-10 font-semibold">
        Tiếp tục thanh toán
      </Button>
    </form>
  )
}
