// Product Types
export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  image: string
  images: string[]
  price: number
  originalPrice?: number
  fruitType: string
  processingMethod: string
  weight: string
  label: string
  rating: number
  reviews: Review[]
  stock: number
  specifications: {
    origin: string
    shelf_life: string
    storage: string
    ingredients: string
  }
  relatedProducts: string[]
}

// User Types
export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  addresses: Address[]
  createdAt: string
}

export interface Address {
  id: string
  fullName: string
  phone: string
  addressLine: string
  ward: string
  district: string
  province: string
  isDefault: boolean
}

// Order Types
export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  shippingAddress: Address
  paymentMethod: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  shippingCost: number
  taxCost: number
  couponCode?: string
  discount: number
  trackingNumber?: string
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
}

export interface OrderItem {
  productId: string
  productName: string
  price: number
  quantity: number
  image: string
}

// Coupon Types
export interface Coupon {
  id: string
  code: string
  discountType: 'percent' | 'fixed'
  discountValue: number
  minPurchase: number
  maxDiscount?: number
  expiresAt: string
  usageLimit: number
  usageCount: number
  description: string
  isActive: boolean
}

// Wishlist Types
export interface WishlistItem {
  productId: string
  addedAt: string
}

// Chat Types
export interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  message: string
  timestamp: string
}

// Newsletter Types
export interface NewsletterSubscriber {
  id: string
  email: string
  subscribedAt: string
  isActive: boolean
}
