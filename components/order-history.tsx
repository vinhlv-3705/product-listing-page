'use client'

import { Package, Clock, Truck, CheckCircle2, XCircle, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { OrderTracking } from './order-tracking'

interface Order {
  id: string
  orderNumber: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: Array<{
    name: string
    price: number
    quantity: number
    image: string
  }>
  createdAt: string
  estimatedDelivery?: string
  trackingNumber?: string
}

const STATUS_CONFIG = {
  pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800', icon: CheckCircle2 },
  processing: { label: 'Đang chuẩn bị', color: 'bg-purple-100 text-purple-800', icon: Package },
  shipped: { label: 'Đã gửi', color: 'bg-orange-100 text-orange-800', icon: Truck },
  delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800', icon: XCircle },
}

// Mock orders
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    status: 'delivered',
    total: 289000,
    items: [
      { name: 'Xoài sấy dẻo premium', price: 89000, quantity: 2, image: 'https://images.unsplash.com/photo-1585864299869-592aa2513b0f?w=100&h=100&fit=crop' },
      { name: 'Dứa sấy thăng hoa tinh khiết', price: 111000, quantity: 1, image: 'https://images.unsplash.com/photo-1599599810694-b3b868a56b14?w=100&h=100&fit=crop' },
    ],
    createdAt: '2024-01-15T10:30:00Z',
    estimatedDelivery: '2024-01-18T10:30:00Z',
    trackingNumber: 'VN123456789',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    status: 'shipped',
    total: 149000,
    items: [
      { name: 'Mít sấy dẻo vàng ươm', price: 149000, quantity: 1, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop' },
    ],
    createdAt: '2024-01-20T14:00:00Z',
    estimatedDelivery: '2024-01-23T14:00:00Z',
    trackingNumber: 'VN987654321',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    status: 'processing',
    total: 358000,
    items: [
      { name: 'Thanh long sấy thăng hoa hồng', price: 159000, quantity: 1, image: 'https://images.unsplash.com/photo-1600271886742-f049cd1f7673?w=100&h=100&fit=crop' },
      { name: 'Xoài sấy thăng hoa siêu dinh dưỡng', price: 199000, quantity: 1, image: 'https://images.unsplash.com/photo-1585864299869-592aa2513b0f?w=100&h=100&fit=crop' },
    ],
    createdAt: '2024-01-25T09:15:00Z',
    estimatedDelivery: '2024-01-28T09:15:00Z',
  },
]

export function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredOrders = filterStatus === 'all' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(order => order.status === filterStatus)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Lịch sử mua hàng</h2>
        <p className="text-muted-foreground">Xem và theo dõi các đơn hàng của bạn</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('all')}
        >
          Tất cả
        </Button>
        <Button
          variant={filterStatus === 'processing' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('processing')}
        >
          Đang xử lý
        </Button>
        <Button
          variant={filterStatus === 'shipped' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('shipped')}
        >
          Đang giao
        </Button>
        <Button
          variant={filterStatus === 'delivered' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('delivered')}
        >
          Đã giao
        </Button>
      </div>

      {/* Orders List */}
      {selectedOrder ? (
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedOrder(null)}
            className="mb-4"
          >
            ← Quay lại danh sách
          </Button>
          <OrderTracking
            status={selectedOrder.status}
            orderNumber={selectedOrder.orderNumber}
            createdAt={selectedOrder.createdAt}
            estimatedDelivery={selectedOrder.estimatedDelivery}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="p-8 text-center">
              <Package size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Không có đơn hàng nào</p>
            </Card>
          ) : (
            filteredOrders.map((order) => {
              const config = STATUS_CONFIG[order.status]
              const Icon = config.icon

              return (
                <Card key={order.id} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                        <Badge className={config.color}>
                          <Icon size={12} className="mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        Đặt ngày: {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>

                      <div className="space-y-2 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-md object-cover bg-secondary"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                SL: {item.quantity} × {item.price.toLocaleString()}₫
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Tổng cộng:</span>
                        <span className="text-xl font-bold text-primary">
                          {order.total.toLocaleString()}₫
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {order.status !== 'cancelled' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye size={16} className="mr-2" />
                          Theo dõi
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
