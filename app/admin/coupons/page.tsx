'use client'

import { useState } from 'react'
import { useAdminStore } from '@/context/admin-store-context'
import { Coupon } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Ticket,
  Percent,
  DollarSign,
  Calendar,
  Users,
} from 'lucide-react'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateString))
}

export default function CouponsPage() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percent' as 'percent' | 'fixed',
    discountValue: '',
    minPurchase: '',
    maxDiscount: '',
    expiresAt: '',
    usageLimit: '',
    description: '',
    isActive: true,
  })

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const activeCoupons = coupons.filter((c) => c.isActive && new Date(c.expiresAt) > new Date())
  const expiredCoupons = coupons.filter((c) => new Date(c.expiresAt) <= new Date())

  const handleOpenDialog = (coupon?: Coupon) => {
    if (coupon) {
      setEditingCoupon(coupon)
      setFormData({
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue.toString(),
        minPurchase: coupon.minPurchase.toString(),
        maxDiscount: coupon.maxDiscount?.toString() || '',
        expiresAt: coupon.expiresAt.split('T')[0],
        usageLimit: coupon.usageLimit.toString(),
        description: coupon.description,
        isActive: coupon.isActive,
      })
    } else {
      setEditingCoupon(null)
      const futureDate = new Date()
      futureDate.setMonth(futureDate.getMonth() + 1)
      setFormData({
        code: '',
        discountType: 'percent',
        discountValue: '',
        minPurchase: '',
        maxDiscount: '',
        expiresAt: futureDate.toISOString().split('T')[0],
        usageLimit: '',
        description: '',
        isActive: true,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    const couponData = {
      code: formData.code.toUpperCase(),
      discountType: formData.discountType,
      discountValue: parseInt(formData.discountValue),
      minPurchase: parseInt(formData.minPurchase),
      maxDiscount: formData.maxDiscount ? parseInt(formData.maxDiscount) : undefined,
      expiresAt: new Date(formData.expiresAt).toISOString(),
      usageLimit: parseInt(formData.usageLimit),
      usageCount: editingCoupon?.usageCount || 0,
      description: formData.description,
      isActive: formData.isActive,
    }

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, couponData)
    } else {
      addCoupon(couponData)
    }

    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    deleteCoupon(id)
    setDeleteConfirm(null)
  }

  const handleToggleActive = (coupon: Coupon) => {
    updateCoupon(coupon.id, { isActive: !coupon.isActive })
  }

  const isExpired = (dateString: string) => new Date(dateString) <= new Date()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quan ly ma giam gia</h1>
          <p className="text-muted-foreground">Tao va quan ly cac ma giam gia cho khach hang</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus size={20} />
          Tao ma moi
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Ticket className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{coupons.length}</p>
                <p className="text-sm text-muted-foreground">Tong ma giam gia</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Ticket className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCoupons.length}</p>
                <p className="text-sm text-muted-foreground">Dang hoat dong</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <Ticket className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expiredCoupons.length}</p>
                <p className="text-sm text-muted-foreground">Da het han</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Tim kiem theo ma hoac mo ta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket size={20} />
            Danh sach ma giam gia ({filteredCoupons.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Ma</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">Giam gia</th>
                  <th className="text-left p-3 font-medium hidden lg:table-cell">Dieu kien</th>
                  <th className="text-center p-3 font-medium">Su dung</th>
                  <th className="text-center p-3 font-medium">Trang thai</th>
                  <th className="text-right p-3 font-medium">Thao tac</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <p className="font-mono font-bold text-primary">{coupon.code}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {coupon.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        {coupon.discountType === 'percent' ? (
                          <>
                            <Percent size={16} className="text-green-600" />
                            <span className="font-medium">{coupon.discountValue}%</span>
                          </>
                        ) : (
                          <>
                            <DollarSign size={16} className="text-green-600" />
                            <span className="font-medium">{formatCurrency(coupon.discountValue)}</span>
                          </>
                        )}
                      </div>
                      {coupon.maxDiscount && (
                        <p className="text-xs text-muted-foreground">
                          Toi da: {formatCurrency(coupon.maxDiscount)}
                        </p>
                      )}
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      <p className="text-sm">Don toi thieu: {formatCurrency(coupon.minPurchase)}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar size={12} />
                        Het han: {formatDate(coupon.expiresAt)}
                      </p>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users size={14} className="text-muted-foreground" />
                        <span className="font-medium">{coupon.usageCount}</span>
                        <span className="text-muted-foreground">/ {coupon.usageLimit}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-2">
                        {isExpired(coupon.expiresAt) ? (
                          <Badge variant="destructive">Het han</Badge>
                        ) : coupon.usageCount >= coupon.usageLimit ? (
                          <Badge variant="secondary">Het luot</Badge>
                        ) : (
                          <Switch
                            checked={coupon.isActive}
                            onCheckedChange={() => handleToggleActive(coupon)}
                          />
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(coupon)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteConfirm(coupon.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Coupon Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingCoupon ? 'Chinh sua ma giam gia' : 'Tao ma giam gia moi'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Ma giam gia</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="VD: SALE10"
                className="font-mono uppercase"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Mo ta</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="VD: Giam 10% cho don hang tu 200k"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Loai giam gia</Label>
                <Select
                  value={formData.discountType}
                  onValueChange={(value) => setFormData({ ...formData, discountType: value as 'percent' | 'fixed' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Phan tram (%)</SelectItem>
                    <SelectItem value="fixed">So tien co dinh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discountValue">
                  Gia tri {formData.discountType === 'percent' ? '(%)' : '(VND)'}
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  placeholder={formData.discountType === 'percent' ? '10' : '50000'}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minPurchase">Don toi thieu (VND)</Label>
                <Input
                  id="minPurchase"
                  type="number"
                  value={formData.minPurchase}
                  onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                  placeholder="200000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxDiscount">Giam toi da (VND)</Label>
                <Input
                  id="maxDiscount"
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                  placeholder="100000"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiresAt">Ngay het han</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="usageLimit">Gioi han su dung</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                  placeholder="100"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Kich hoat ma giam gia</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Huy
            </Button>
            <Button onClick={handleSubmit}>
              {editingCoupon ? 'Cap nhat' : 'Tao moi'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xac nhan xoa ma giam gia</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Ban co chac chan muon xoa ma giam gia nay? Hanh dong nay khong the hoan tac.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Huy
            </Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
              Xoa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
