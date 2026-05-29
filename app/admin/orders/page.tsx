'use client'

import { useState } from 'react'
import { useAdminStore } from '@/context/admin-store-context'
import { Order } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
import {
  Search,
  ShoppingCart,
  Filter,
  Eye,
  MapPin,
  Phone,
  User,
  CreditCard,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
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
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const statusLabels: Record<string, string> = {
  pending: 'Cho xu ly',
  confirmed: 'Da xac nhan',
  processing: 'Dang xu ly',
  shipped: 'Dang giao',
  delivered: 'Da giao',
  cancelled: 'Da huy',
}

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock size={16} />,
  confirmed: <CheckCircle size={16} />,
  processing: <Package size={16} />,
  shipped: <Truck size={16} />,
  delivered: <CheckCircle size={16} />,
  cancelled: <XCircle size={16} />,
}

const STATUS_OPTIONS: Order['status'][] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.phone.includes(searchQuery)
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus)
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  // Stats
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Quan ly don hang</h1>
        <p className="text-muted-foreground">Theo doi va cap nhat trang thai don hang</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status === filterStatus ? 'all' : status)}
            className={`p-3 rounded-lg border transition-colors ${
              filterStatus === status
                ? 'border-primary bg-primary/5'
                : 'border-border hover:bg-muted'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={statusColors[status] + ' p-1.5 rounded'}>{statusIcons[status]}</span>
              <div className="text-left">
                <p className="text-lg font-bold">{statusCounts[status] || 0}</p>
                <p className="text-xs text-muted-foreground">{statusLabels[status]}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Tim kiem theo ma don, ten, so dien thoai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter size={18} className="mr-2" />
                <SelectValue placeholder="Trang thai" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tat ca trang thai</SelectItem>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>{statusLabels[status]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            Danh sach don hang ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Ma don</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">Khach hang</th>
                  <th className="text-right p-3 font-medium">Tong tien</th>
                  <th className="text-center p-3 font-medium">Trang thai</th>
                  <th className="text-left p-3 font-medium hidden lg:table-cell">Ngay tao</th>
                  <th className="text-right p-3 font-medium">Thao tac</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3">
                      <p className="font-medium font-mono">{order.id}</p>
                      <p className="text-sm text-muted-foreground md:hidden">
                        {order.shippingAddress.fullName}
                      </p>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <p className="font-medium">{order.shippingAddress.fullName}</p>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress.phone}</p>
                    </td>
                    <td className="p-3 text-right">
                      <p className="font-medium">{formatCurrency(order.total)}</p>
                      <p className="text-sm text-muted-foreground">{order.items.length} san pham</p>
                    </td>
                    <td className="p-3">
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                      >
                        <SelectTrigger className="w-32 mx-auto">
                          <Badge className={statusColors[order.status]} variant="secondary">
                            {statusLabels[order.status]}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center gap-2">
                                {statusIcons[status]}
                                {statusLabels[status]}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3 hidden lg:table-cell text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="p-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Chi tiet don hang
              <span className="font-mono text-muted-foreground">{selectedOrder?.id}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className={statusColors[selectedOrder.status] + ' p-2 rounded-lg'}>
                    {statusIcons[selectedOrder.status]}
                  </span>
                  <div>
                    <p className="font-medium">{statusLabels[selectedOrder.status]}</p>
                    <p className="text-sm text-muted-foreground">
                      Cap nhat: {formatDate(selectedOrder.updatedAt)}
                    </p>
                  </div>
                </div>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => handleStatusChange(selectedOrder.id, value as Order['status'])}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>{statusLabels[status]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Info */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <User size={18} />
                  Thong tin khach hang
                </h3>
                <div className="grid gap-2 p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium">{selectedOrder.shippingAddress.fullName}</p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={14} />
                    {selectedOrder.shippingAddress.phone}
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={14} />
                    {selectedOrder.shippingAddress.addressLine}, {selectedOrder.shippingAddress.ward},{' '}
                    {selectedOrder.shippingAddress.district}, {selectedOrder.shippingAddress.province}
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard size={14} />
                    {selectedOrder.paymentMethod === 'cod' ? 'Thanh toan khi nhan hang' : 'Chuyen khoan'}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Package size={18} />
                  San pham ({selectedOrder.items.length})
                </h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.price)} x {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between text-muted-foreground">
                  <span>Tam tinh</span>
                  <span>{formatCurrency(selectedOrder.total - selectedOrder.shippingCost + selectedOrder.discount)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giam gia {selectedOrder.couponCode && `(${selectedOrder.couponCode})`}</span>
                    <span>-{formatCurrency(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Phi van chuyen</span>
                  <span>{selectedOrder.shippingCost === 0 ? 'Mien phi' : formatCurrency(selectedOrder.shippingCost)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                  <span>Tong cong</span>
                  <span className="text-primary">{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Timeline Info */}
              <div className="text-sm text-muted-foreground">
                <p>Ngay dat: {formatDate(selectedOrder.createdAt)}</p>
                {selectedOrder.estimatedDelivery && (
                  <p>Du kien giao: {formatDate(selectedOrder.estimatedDelivery)}</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>
              Dong
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
