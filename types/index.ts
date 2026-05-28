export interface ProductReview {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: Date
  helpful: number
}

export interface Product {
  id: string
  name: string
  image: string
  images?: string[]
  price: number
  originalPrice?: number
  fruitType: string
  processingMethod: string
  weight: string
  label: string
  rating?: number
  reviews?: number
  reviewsDetail?: ProductReview[]
  description?: string
  ingredients?: string[]
  benefits?: string[]
  storage?: string
  expiryDate?: string
  stock: number
  sku?: string
  category?: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  addresses: Address[]
  createdAt: Date
}

export interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  street: string
  ward: string
  district: string
  province: string
  isDefault: boolean
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  shippingCost: number
  discount: number
  tax: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  paymentMethod: string
  trackingNumber?: string
  createdAt: Date
  estimatedDelivery?: Date
}

export interface Coupon {
  id: string
  code: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minOrderAmount?: number
  maxUses?: number
  currentUses: number
  expiryDate: Date
  active: boolean
}

export interface CompareItem {
  product: Product
  selected: boolean
}
