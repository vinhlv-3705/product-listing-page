'use client'

import React, { createContext, useContext, useState } from 'react'

export type PaymentMethod =
  | 'cod'
  | 'bank_transfer'
  | 'visa'
  | 'mastercard'
  | 'paypal'
  | 'apple_pay'
  | 'google_pay'

export interface ShippingInfo {
  fullName: string
  phone: string
  email: string
  address: string
  ward: string
  district: string
  province: string
  note?: string
}

export interface Order {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  shippingInfo: ShippingInfo
  paymentMethod: PaymentMethod
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: Date
}

interface PaymentContextType {
  order: Order | null
  isCheckoutOpen: boolean
  currentStep: 'shipping' | 'payment' | 'review'
  
  setOrder: (order: Order | null) => void
  setIsCheckoutOpen: (open: boolean) => void
  setCurrentStep: (step: 'shipping' | 'payment' | 'review') => void
  
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<Order>
  processPayment: (paymentMethod: PaymentMethod) => Promise<boolean>
  resetCheckout: () => void
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping')

  const createOrder = async (
    orderData: Omit<Order, 'id' | 'createdAt' | 'status'>
  ): Promise<Order> => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: new Date(),
      status: 'pending',
    }
    setOrder(newOrder)
    return newOrder
  }

  const processPayment = async (paymentMethod: PaymentMethod): Promise<boolean> => {
    if (!order) return false

    try {
      // Simulate payment processing
      return new Promise((resolve) => {
        setTimeout(() => {
          setOrder({
            ...order,
            paymentMethod,
            status: 'completed',
          })
          resolve(true)
        }, 1500)
      })
    } catch (error) {
      console.error('Payment failed:', error)
      return false
    }
  }

  const resetCheckout = () => {
    setOrder(null)
    setIsCheckoutOpen(false)
    setCurrentStep('shipping')
  }

  return (
    <PaymentContext.Provider
      value={{
        order,
        isCheckoutOpen,
        currentStep,
        setOrder,
        setIsCheckoutOpen,
        setCurrentStep,
        createOrder,
        processPayment,
        resetCheckout,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error('usePayment must be used within PaymentProvider')
  }
  return context
}
