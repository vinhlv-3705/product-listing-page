'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product, Order, User, Coupon } from '@/lib/types'
import { PRODUCTS_DATA } from '@/lib/products-data'

// Generate mock orders
const generateMockOrders = (): Order[] => {
  const statuses: Order['status'][] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
  const orders: Order[] = []
  
  for (let i = 1; i <= 25; i++) {
    const itemCount = Math.floor(Math.random() * 3) + 1
    const items = []
    let subtotal = 0
    
    for (let j = 0; j < itemCount; j++) {
      const product = PRODUCTS_DATA[Math.floor(Math.random() * PRODUCTS_DATA.length)]
      const quantity = Math.floor(Math.random() * 3) + 1
      items.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        image: product.image,
      })
      subtotal += product.price * quantity
    }
    
    const shippingCost = subtotal >= 500000 ? 0 : 30000
    const discount = Math.random() > 0.7 ? Math.floor(subtotal * 0.1) : 0
    
    orders.push({
      id: `ORD-${String(i).padStart(5, '0')}`,
      userId: `user-${Math.floor(Math.random() * 10) + 1}`,
      items,
      shippingAddress: {
        id: '1',
        fullName: `Khach hang ${i}`,
        phone: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
        addressLine: `${Math.floor(Math.random() * 100) + 1} Duong ${i}`,
        ward: `Phuong ${Math.floor(Math.random() * 20) + 1}`,
        district: `Quan ${Math.floor(Math.random() * 12) + 1}`,
        province: 'TP. Ho Chi Minh',
        isDefault: true,
      },
      paymentMethod: Math.random() > 0.5 ? 'cod' : 'banking',
      status: statuses[Math.floor(Math.random() * statuses.length)],
      total: subtotal - discount + shippingCost,
      shippingCost,
      taxCost: 0,
      discount,
      couponCode: discount > 0 ? 'SALE10' : undefined,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    })
  }
  
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Generate mock customers
const generateMockCustomers = (): User[] => {
  const customers: User[] = []
  const names = [
    'Nguyen Van A', 'Tran Thi B', 'Le Van C', 'Pham Thi D', 'Hoang Van E',
    'Vo Thi F', 'Dang Van G', 'Bui Thi H', 'Do Van I', 'Ngo Thi K'
  ]
  
  for (let i = 0; i < 10; i++) {
    customers.push({
      id: `user-${i + 1}`,
      name: names[i],
      email: `user${i + 1}@example.com`,
      phone: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      role: 'user',
      addresses: [{
        id: '1',
        fullName: names[i],
        phone: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
        addressLine: `${Math.floor(Math.random() * 100) + 1} Duong ABC`,
        ward: `Phuong ${Math.floor(Math.random() * 20) + 1}`,
        district: `Quan ${Math.floor(Math.random() * 12) + 1}`,
        province: 'TP. Ho Chi Minh',
        isDefault: true,
      }],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
    })
  }
  
  return customers
}

// Generate mock coupons
const generateMockCoupons = (): Coupon[] => {
  return [
    {
      id: '1',
      code: 'SALE10',
      discountType: 'percent',
      discountValue: 10,
      minPurchase: 200000,
      maxDiscount: 100000,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      usageLimit: 100,
      usageCount: 45,
      description: 'Giam 10% cho don hang tu 200k',
      isActive: true,
    },
    {
      id: '2',
      code: 'FREESHIP',
      discountType: 'fixed',
      discountValue: 30000,
      minPurchase: 300000,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      usageLimit: 50,
      usageCount: 20,
      description: 'Mien phi van chuyen cho don tu 300k',
      isActive: true,
    },
    {
      id: '3',
      code: 'NEWUSER',
      discountType: 'percent',
      discountValue: 15,
      minPurchase: 150000,
      maxDiscount: 50000,
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      usageLimit: 200,
      usageCount: 78,
      description: 'Giam 15% cho khach hang moi',
      isActive: true,
    },
    {
      id: '4',
      code: 'SUMMER50',
      discountType: 'fixed',
      discountValue: 50000,
      minPurchase: 500000,
      expiresAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      usageLimit: 30,
      usageCount: 30,
      description: 'Giam 50k cho don tu 500k - He 2024',
      isActive: false,
    },
  ]
}

interface AdminStoreContextType {
  // Products
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  
  // Orders
  orders: Order[]
  updateOrderStatus: (id: string, status: Order['status']) => void
  
  // Customers
  customers: User[]
  
  // Coupons
  coupons: Coupon[]
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void
  deleteCoupon: (id: string) => void
  
  // Stats
  stats: {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    totalProducts: number
    pendingOrders: number
    revenueToday: number
    ordersToday: number
  }
}

const AdminStoreContext = createContext<AdminStoreContextType | undefined>(undefined)

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA)
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<User[]>([])
  const [coupons, setCoupons] = useState<Coupon[]>([])
  
  // Initialize mock data on mount
  useEffect(() => {
    setOrders(generateMockOrders())
    setCustomers(generateMockCustomers())
    setCoupons(generateMockCoupons())
  }, [])
  
  // Calculate stats
  const stats = {
    totalRevenue: orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0),
    totalOrders: orders.length,
    totalCustomers: customers.length,
    totalProducts: products.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    revenueToday: orders
      .filter(o => {
        const today = new Date().toDateString()
        return new Date(o.createdAt).toDateString() === today && o.status === 'delivered'
      })
      .reduce((sum, o) => sum + o.total, 0),
    ordersToday: orders.filter(o => {
      const today = new Date().toDateString()
      return new Date(o.createdAt).toDateString() === today
    }).length,
  }
  
  // Product functions
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    }
    setProducts(prev => [newProduct, ...prev])
  }
  
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }
  
  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }
  
  // Order functions
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o))
  }
  
  // Coupon functions
  const addCoupon = (coupon: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...coupon,
      id: Date.now().toString(),
    }
    setCoupons(prev => [newCoupon, ...prev])
  }
  
  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }
  
  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id))
  }
  
  return (
    <AdminStoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        updateOrderStatus,
        customers,
        coupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        stats,
      }}
    >
      {children}
    </AdminStoreContext.Provider>
  )
}

export function useAdminStore() {
  const context = useContext(AdminStoreContext)
  if (!context) {
    throw new Error('useAdminStore must be used within AdminStoreProvider')
  }
  return context
}
