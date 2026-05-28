'use client'

import { X, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCompare } from '@/context/compare-context'
import { useState } from 'react'

interface MockProduct {
  id: string
  name: string
  price: number
  weight: string
  processingMethod: string
  specifications: {
    origin: string
    shelf_life: string
    storage: string
  }
}

const MOCK_PRODUCTS: Record<string, MockProduct> = {
  '1': {
    id: '1',
    name: 'Xoài sấy dẻo premium',
    price: 89000,
    weight: '100g',
    processingMethod: 'Sấy dẻo',
    specifications: { origin: 'Việt Nam', shelf_life: '12 tháng', storage: 'Nơi khô ráo' }
  },
  '2': {
    id: '2',
    name: 'Dứa sấy thăng hoa tinh khiết',
    price: 129000,
    weight: '50g',
    processingMethod: 'Sấy thăng hoa',
    specifications: { origin: 'Việt Nam', shelf_life: '24 tháng', storage: 'Tủ lạnh' }
  },
}

export function CompareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { compareList, removeFromCompare, clearCompare } = useCompare()
  const [highlightDifferences, setHighlightDifferences] = useState(false)
  
  const products = compareList
    .map(id => MOCK_PRODUCTS[id])
    .filter(Boolean) as MockProduct[]

  // Helper function to check if values differ
  const hasDifference = (values: string[]) => {
    if (values.length < 2) return false
    const first = values[0]
    return values.some(v => v !== first)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>So sánh sản phẩm</DialogTitle>
          <DialogDescription>
            {products.length} sản phẩm đang so sánh
          </DialogDescription>
        </DialogHeader>

        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Chưa có sản phẩm để so sánh</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant={highlightDifferences ? 'default' : 'outline'}
                size="sm"
                onClick={() => setHighlightDifferences(!highlightDifferences)}
              >
                <Eye size={16} className="mr-2" />
                {highlightDifferences ? 'Tắt nổi bật khác biệt' : 'Nổi bật khác biệt'}
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2 font-semibold">Tiêu chí</th>
                    {products.map((p) => (
                      <th key={p.id} className="text-left py-2 px-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold line-clamp-2 text-xs">{p.name}</span>
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="p-1 hover:bg-destructive/10 rounded"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-2 font-medium">Giá</td>
                    {products.map((p) => (
                      <td 
                        key={p.id} 
                        className={`py-2 px-2 ${
                          highlightDifferences && hasDifference(products.map(prod => prod.price.toString()))
                            ? 'bg-accent/30 font-semibold' 
                            : ''
                        }`}
                      >
                        <span className="font-bold text-primary">{(p.price / 1000).toFixed(0)}k₫</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-2 font-medium">Khối lượng</td>
                    {products.map((p) => (
                      <td 
                        key={p.id} 
                        className={`py-2 px-2 ${
                          highlightDifferences && hasDifference(products.map(prod => prod.weight))
                            ? 'bg-accent/30 font-semibold' 
                            : ''
                        }`}
                      >
                        {p.weight}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-2 font-medium">Cách chế biến</td>
                    {products.map((p) => (
                      <td 
                        key={p.id} 
                        className={`py-2 px-2 ${
                          highlightDifferences && hasDifference(products.map(prod => prod.processingMethod))
                            ? 'bg-accent/30 font-semibold' 
                            : ''
                        }`}
                      >
                        {p.processingMethod}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-2 font-medium">Xuất xứ</td>
                    {products.map((p) => (
                      <td 
                        key={p.id} 
                        className={`py-2 px-2 ${
                          highlightDifferences && hasDifference(products.map(prod => prod.specifications.origin))
                            ? 'bg-accent/30 font-semibold' 
                            : ''
                        }`}
                      >
                        {p.specifications.origin}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-2 font-medium">Hạn sử dụng</td>
                    {products.map((p) => (
                      <td 
                        key={p.id} 
                        className={`py-2 px-2 ${
                          highlightDifferences && hasDifference(products.map(prod => prod.specifications.shelf_life))
                            ? 'bg-accent/30 font-semibold' 
                            : ''
                        }`}
                      >
                        {p.specifications.shelf_life}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2 px-2 font-medium">Bảo quản</td>
                    {products.map((p) => (
                      <td 
                        key={p.id} 
                        className={`py-2 px-2 ${
                          highlightDifferences && hasDifference(products.map(prod => prod.specifications.storage))
                            ? 'bg-accent/30 font-semibold' 
                            : ''
                        }`}
                      >
                        {p.specifications.storage}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={clearCompare}
                variant="outline"
                className="flex-1"
              >
                Xóa tất cả
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
