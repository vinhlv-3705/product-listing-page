'use client'

import { X, Eye, ShoppingCart, Star, Check, Minus } from 'lucide-react'
import Image from 'next/image'
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
import { useCart } from '@/context/cart-context'
import { getProductById, isFlashSale } from '@/lib/products-data'
import { useState } from 'react'

export function CompareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { compareList, removeFromCompare, clearCompare } = useCompare()
  const { addItem } = useCart()
  const [highlightDifferences, setHighlightDifferences] = useState(false)
  
  // Get full product data from compare list
  const products = compareList
    .map(id => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  // Helper function to check if values differ
  const hasDifference = (values: (string | number | undefined)[]) => {
    if (values.length < 2) return false
    const first = values[0]
    return values.some(v => v !== first)
  }

  // Helper to find best value
  const getBestValue = (values: number[], higherIsBetter: boolean = true) => {
    if (values.length === 0) return null
    return higherIsBetter ? Math.max(...values) : Math.min(...values)
  }

  const handleAddToCart = (productId: string) => {
    const product = getProductById(productId)
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  const comparisonRows = [
    { 
      label: 'Gia', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.price,
      format: (v: number) => `${v.toLocaleString()}d`,
      higherIsBetter: false,
    },
    { 
      label: 'Gia goc', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.originalPrice,
      format: (v: number | undefined) => v ? `${v.toLocaleString()}d` : '-',
      higherIsBetter: false,
    },
    { 
      label: 'Danh gia', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.rating,
      format: (v: number) => (
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span>{v}</span>
        </div>
      ),
      higherIsBetter: true,
    },
    { 
      label: 'So danh gia', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.reviews?.length || 0,
      format: (v: number) => `${v} danh gia`,
      higherIsBetter: true,
    },
    { 
      label: 'Khoi luong', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.weight,
      format: (v: string) => v,
    },
    { 
      label: 'Cach che bien', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.processingMethod,
      format: (v: string) => v,
    },
    { 
      label: 'Loai trai cay', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.fruitType,
      format: (v: string) => v,
    },
    { 
      label: 'Phan loai', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.label,
      format: (v: string) => (
        <Badge variant={v === 'Xuat khau' ? 'default' : 'secondary'}>
          {v}
        </Badge>
      ),
    },
    { 
      label: 'Xuat xu', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.specifications?.origin,
      format: (v: string | undefined) => v || '-',
    },
    { 
      label: 'Han su dung', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.specifications?.shelf_life,
      format: (v: string | undefined) => v || '-',
    },
    { 
      label: 'Bao quan', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.specifications?.storage,
      format: (v: string | undefined) => v || '-',
    },
    { 
      label: 'Thanh phan', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.specifications?.ingredients,
      format: (v: string | undefined) => v || '-',
    },
    { 
      label: 'Ton kho', 
      getValue: (p: NonNullable<ReturnType<typeof getProductById>>) => p.stock,
      format: (v: number) => (
        <span className={v > 0 ? 'text-green-600' : 'text-destructive'}>
          {v > 0 ? `Con ${v} san pham` : 'Het hang'}
        </span>
      ),
      higherIsBetter: true,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            So sanh san pham
            <Badge variant="secondary">{products.length} san pham</Badge>
          </DialogTitle>
          <DialogDescription>
            So sanh cac dac diem giua cac san pham ban chon
          </DialogDescription>
        </DialogHeader>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-secondary/50 rounded-full p-6 inline-block mb-4">
              <Eye size={48} className="text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">Chua co san pham de so sanh</p>
            <p className="text-muted-foreground mb-4">
              Nhan nut &quot;SS&quot; tren the san pham de them vao danh sach so sanh
            </p>
            <Button variant="outline" onClick={onClose}>
              Tiep tuc mua sam
            </Button>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b">
              <Button
                variant={highlightDifferences ? 'default' : 'outline'}
                size="sm"
                onClick={() => setHighlightDifferences(!highlightDifferences)}
              >
                <Eye size={16} className="mr-2" />
                {highlightDifferences ? 'An noi bat khac biet' : 'Noi bat khac biet'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCompare}
                className="text-destructive hover:text-destructive"
              >
                <X size={16} className="mr-2" />
                Xoa tat ca
              </Button>
            </div>

            {/* Product Headers */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-3 font-semibold bg-secondary/30 min-w-[140px] sticky left-0">
                      Tieu chi
                    </th>
                    {products.map((product) => (
                      <th key={product.id} className="text-center py-4 px-3 min-w-[180px]">
                        <div className="flex flex-col items-center gap-3">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-secondary">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                            {isFlashSale(product.id) && (
                              <Badge className="absolute top-1 left-1 text-[10px] bg-gradient-to-r from-orange-500 to-red-500 border-0">
                                Flash
                              </Badge>
                            )}
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-sm line-clamp-2">{product.name}</p>
                            <p className="text-lg font-bold text-primary mt-1">
                              {(product.price / 1000).toFixed(0)}k
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(product.id)}
                              disabled={product.stock === 0}
                            >
                              <ShoppingCart size={14} className="mr-1" />
                              Mua
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFromCompare(product.id)}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, rowIdx) => {
                    const values = products.map(p => row.getValue(p))
                    const isDifferent = hasDifference(values)
                    const numericValues = values.filter((v): v is number => typeof v === 'number')
                    const bestValue = row.higherIsBetter !== undefined && numericValues.length > 0
                      ? getBestValue(numericValues, row.higherIsBetter)
                      : null

                    return (
                      <tr 
                        key={rowIdx} 
                        className={`border-b ${highlightDifferences && isDifferent ? 'bg-accent/10' : ''}`}
                      >
                        <td className="py-3 px-3 font-medium bg-secondary/30 sticky left-0">
                          {row.label}
                        </td>
                        {products.map((product, colIdx) => {
                          const value = values[colIdx]
                          const isBest = bestValue !== null && value === bestValue
                          
                          return (
                            <td 
                              key={product.id} 
                              className={`py-3 px-3 text-center ${
                                highlightDifferences && isDifferent 
                                  ? isBest 
                                    ? 'bg-green-50 font-semibold' 
                                    : ''
                                  : ''
                              }`}
                            >
                              <div className="flex items-center justify-center gap-1">
                                {typeof row.format === 'function' 
                                  ? row.format(value as never)
                                  : value ?? '-'
                                }
                                {isBest && highlightDifferences && (
                                  <Check size={14} className="text-green-600" />
                                )}
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Quick Summary */}
            {products.length >= 2 && (
              <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                <h4 className="font-semibold mb-2">Tom tat so sanh</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">San pham re nhat:</p>
                    <p className="font-medium">
                      {products.reduce((min, p) => p.price < min.price ? p : min).name}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Danh gia cao nhat:</p>
                    <p className="font-medium">
                      {products.reduce((max, p) => p.rating > max.rating ? p : max).name}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ban chay nhat:</p>
                    <p className="font-medium">
                      {products.reduce((max, p) => 
                        (p.reviews?.length || 0) > (max.reviews?.length || 0) ? p : max
                      ).name}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
