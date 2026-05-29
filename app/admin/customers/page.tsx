'use client'

import { useState } from 'react'
import { useAdminStore } from '@/context/admin-store-context'
import { User } from '@/lib/types'
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
  Search,
  Users,
  Eye,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ShoppingCart,
} from 'lucide-react'

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateString))
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

export default function CustomersPage() {
  const { customers, orders } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    return matchesSearch
  })

  // Get customer stats
  const getCustomerStats = (customerId: string) => {
    const customerOrders = orders.filter((order) => order.userId === customerId)
    const totalSpent = customerOrders
      .filter((o) => o.status === 'delivered')
      .reduce((sum, o) => sum + o.total, 0)
    return {
      orderCount: customerOrders.length,
      totalSpent,
      lastOrder: customerOrders[0]?.createdAt,
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Quan ly khach hang</h1>
        <p className="text-muted-foreground">Xem thong tin va lich su mua hang cua khach hang</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{customers.length}</p>
                <p className="text-sm text-muted-foreground">Tong khach hang</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{orders.length}</p>
                <p className="text-sm text-muted-foreground">Tong don hang</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {customers.filter((c) => {
                    const thirtyDaysAgo = new Date()
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                    return new Date(c.createdAt) > thirtyDaysAgo
                  }).length}
                </p>
                <p className="text-sm text-muted-foreground">Khach moi (30 ngay)</p>
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
              placeholder="Tim kiem theo ten, email, so dien thoai..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Danh sach khach hang ({filteredCustomers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Khach hang</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">Lien he</th>
                  <th className="text-center p-3 font-medium">Don hang</th>
                  <th className="text-right p-3 font-medium hidden sm:table-cell">Tong chi</th>
                  <th className="text-left p-3 font-medium hidden lg:table-cell">Ngay tham gia</th>
                  <th className="text-right p-3 font-medium">Thao tac</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => {
                  const stats = getCustomerStats(customer.id)
                  return (
                    <tr key={customer.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {customer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-muted-foreground md:hidden">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <p className="text-sm">{customer.email}</p>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant="secondary">{stats.orderCount}</Badge>
                      </td>
                      <td className="p-3 text-right hidden sm:table-cell">
                        <p className="font-medium">{formatCurrency(stats.totalSpent)}</p>
                      </td>
                      <td className="p-3 hidden lg:table-cell text-muted-foreground">
                        {formatDate(customer.createdAt)}
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye size={16} />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Detail Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Chi tiet khach hang</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Avatar & Name */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-2xl">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                  <p className="text-muted-foreground">ID: {selectedCustomer.id}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="font-semibold">Thong tin lien he</h4>
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-muted-foreground" />
                    {selectedCustomer.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={16} className="text-muted-foreground" />
                    {selectedCustomer.phone || 'Chua cap nhat'}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    Tham gia: {formatDate(selectedCustomer.createdAt)}
                  </p>
                </div>
              </div>

              {/* Addresses */}
              {selectedCustomer.addresses.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Dia chi</h4>
                  <div className="space-y-2">
                    {selectedCustomer.addresses.map((address, index) => (
                      <div key={address.id || index} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">{address.fullName}</p>
                            <p className="text-sm text-muted-foreground">{address.phone}</p>
                            <p className="text-sm text-muted-foreground">
                              {address.addressLine}, {address.ward}, {address.district}, {address.province}
                            </p>
                            {address.isDefault && (
                              <Badge variant="secondary" className="mt-2">Dia chi mac dinh</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Purchase Stats */}
              <div className="space-y-3">
                <h4 className="font-semibold">Thong ke mua hang</h4>
                {(() => {
                  const stats = getCustomerStats(selectedCustomer.id)
                  return (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">{stats.orderCount}</p>
                        <p className="text-sm text-muted-foreground">Don hang</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(stats.totalSpent)}
                        </p>
                        <p className="text-sm text-muted-foreground">Tong chi tieu</p>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
              Dong
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
