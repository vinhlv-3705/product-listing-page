'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Product } from '@/types'
import { ProductDetail } from './product-detail'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="truncate">{product.name}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X size={20} />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Column */}
            <div>
              <ProductDetail product={product} onClose={onClose} />
            </div>

            {/* Info Column */}
            <div className="space-y-6">
              <ProductDetail product={product} onClose={onClose} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
