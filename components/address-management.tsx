'use client'

import { useState } from 'react'
import { MapPin, Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Address {
  id: string
  fullName: string
  phone: string
  email: string
  address: string
  ward: string
  district: string
  province: string
  isDefault: boolean
}

const MOCK_ADDRESSES: Address[] = [
  {
    id: '1',
    fullName: 'Nguyễn Văn A',
    phone: '0901234567',
    email: 'nguyenvana@example.com',
    address: '123 Đường ABC',
    ward: 'Phường 1',
    district: 'Quận 1',
    province: 'TP. Hồ Chí Minh',
    isDefault: true,
  },
  {
    id: '2',
    fullName: 'Nguyễn Văn A',
    phone: '0901234567',
    email: 'nguyenvana@example.com',
    address: '456 Đường XYZ',
    ward: 'Phường 2',
    district: 'Quận 3',
    province: 'TP. Hồ Chí Minh',
    isDefault: false,
  },
]

export function AddressManagement() {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES)
  const [showDialog, setShowDialog] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState<Partial<Address>>({})

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address)
      setFormData(address)
    } else {
      setEditingAddress(null)
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        ward: '',
        district: '',
        province: '',
        isDefault: false,
      })
    }
    setShowDialog(true)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
    setEditingAddress(null)
    setFormData({})
  }

  const handleSave = () => {
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...formData, id: editingAddress.id } as Address
          : addr
      ))
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
        isDefault: addresses.length === 0,
      } as Address
      setAddresses([...addresses, newAddress])
    }
    handleCloseDialog()
  }

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Sổ địa chỉ</h2>
          <p className="text-muted-foreground">Quản lý các địa chỉ giao hàng của bạn</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus size={16} className="mr-2" />
          Thêm địa chỉ mới
        </Button>
      </div>

      <div className="grid gap-4">
        {addresses.length === 0 ? (
          <Card className="p-8 text-center">
            <MapPin size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Chưa có địa chỉ nào</p>
            <Button
              onClick={() => handleOpenDialog()}
              variant="outline"
              className="mt-4"
            >
              Thêm địa chỉ mới
            </Button>
          </Card>
        ) : (
          addresses.map((address) => (
            <Card key={address.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{address.fullName}</h3>
                    {address.isDefault && (
                      <Badge className="bg-primary text-primary-foreground">Mặc định</Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-1">
                    {address.phone} • {address.email}
                  </p>
                  
                  <p className="text-sm">
                    {address.address}, {address.ward}, {address.district}, {address.province}
                  </p>
                </div>

                <div className="flex gap-2">
                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      <Check size={16} className="mr-1" />
                      Mặc định
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(address)}
                  >
                    <Pencil size={16} className="mr-1" />
                    Sửa
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(address.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Xóa
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Address Dialog */}
      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Họ và tên *</Label>
              <Input
                placeholder="Nhập họ và tên"
                value={formData.fullName || ''}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Số điện thoại *</Label>
              <Input
                placeholder="Nhập số điện thoại"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                placeholder="Nhập email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Địa chỉ *</Label>
              <Input
                placeholder="Số nhà, tên đường"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Phường/Xã *</Label>
              <Input
                placeholder="Nhập phường/xã"
                value={formData.ward || ''}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Quận/Huyện *</Label>
              <Input
                placeholder="Nhập quận/huyện"
                value={formData.district || ''}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Tỉnh/Thành phố *</Label>
              <Input
                placeholder="Nhập tỉnh/thành phố"
                value={formData.province || ''}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              />
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="default"
                checked={formData.isDefault || false}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="default" className="cursor-pointer">
                Đặt làm địa chỉ mặc định
              </Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={handleCloseDialog}
                className="flex-1"
              >
                <X size={16} className="mr-2" />
                Hủy
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1"
                disabled={!formData.fullName || !formData.phone || !formData.email || !formData.address || !formData.ward || !formData.district || !formData.province}
              >
                <Check size={16} className="mr-2" />
                Lưu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
