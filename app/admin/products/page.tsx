'use client'

import { useState } from 'react'
import { useAdminStore } from '@/context/admin-store-context'
import { Product } from '@/lib/types'
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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
  Filter,
} from 'lucide-react'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

const FRUIT_TYPES = ['Xoai', 'Dua', 'Mit', 'Thanh Long']
const PROCESSING_METHODS = ['Say deo', 'Say gion', 'Say thang hoa']
const WEIGHTS = ['50g', '100g', '200g', '500g']
const LABELS = ['Noi dia', 'Xuat khau']

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterFruit, setFilterFruit] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longDescription: '',
    price: '',
    originalPrice: '',
    fruitType: 'Xoai',
    processingMethod: 'Say deo',
    weight: '100g',
    label: 'Noi dia',
    stock: '',
    image: '/products/xoai-say-deo.png',
  })

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFruit = filterFruit === 'all' || product.fruitType === filterFruit
    return matchesSearch && matchesFruit
  })

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        description: product.description,
        longDescription: product.longDescription,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || '',
        fruitType: product.fruitType,
        processingMethod: product.processingMethod,
        weight: product.weight,
        label: product.label,
        stock: product.stock.toString(),
        image: product.image,
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        description: '',
        longDescription: '',
        price: '',
        originalPrice: '',
        fruitType: 'Xoai',
        processingMethod: 'Say deo',
        weight: '100g',
        label: 'Noi dia',
        stock: '',
        image: '/products/xoai-say-deo.png',
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    const productData = {
      name: formData.name,
      description: formData.description,
      longDescription: formData.longDescription || formData.description,
      price: parseInt(formData.price),
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
      fruitType: formData.fruitType,
      processingMethod: formData.processingMethod,
      weight: formData.weight,
      label: formData.label,
      stock: parseInt(formData.stock),
      image: formData.image,
      images: [formData.image],
      rating: 5,
      reviews: [],
      specifications: {
        origin: 'Viet Nam',
        shelf_life: '12 thang tu ngay san xuat',
        storage: 'Bao quan noi kho rao, thoang mat',
        ingredients: `100% ${formData.fruitType}`,
      },
      relatedProducts: [],
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
    } else {
      addProduct(productData)
    }

    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    deleteProduct(id)
    setDeleteConfirm(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quan ly san pham</h1>
          <p className="text-muted-foreground">Them, sua, xoa san pham trong cua hang</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus size={20} />
          Them san pham
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Tim kiem san pham..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterFruit} onValueChange={setFilterFruit}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter size={18} className="mr-2" />
                <SelectValue placeholder="Loai trai cay" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tat ca loai</SelectItem>
                {FRUIT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package size={20} />
            Danh sach san pham ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">San pham</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">Loai</th>
                  <th className="text-right p-3 font-medium">Gia</th>
                  <th className="text-center p-3 font-medium hidden sm:table-cell">Ton kho</th>
                  <th className="text-right p-3 font-medium">Thao tac</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <p className="font-medium truncate max-w-[200px]">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.weight}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <Badge variant="secondary">{product.fruitType}</Badge>
                    </td>
                    <td className="p-3 text-right">
                      <p className="font-medium">{formatCurrency(product.price)}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatCurrency(product.originalPrice)}
                        </p>
                      )}
                    </td>
                    <td className="p-3 text-center hidden sm:table-cell">
                      <Badge variant={product.stock < 10 ? 'destructive' : product.stock < 20 ? 'secondary' : 'default'}>
                        {product.stock}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(product)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteConfirm(product.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Chinh sua san pham' : 'Them san pham moi'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Ten san pham</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="VD: Xoai say deo cao cap"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Mo ta ngan</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mo ta ngan gon ve san pham"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="longDescription">Mo ta chi tiet</Label>
              <Textarea
                id="longDescription"
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                placeholder="Mo ta chi tiet ve san pham"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Gia ban (VND)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="89000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="originalPrice">Gia goc (VND)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="119000"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Loai trai cay</Label>
                <Select
                  value={formData.fruitType}
                  onValueChange={(value) => setFormData({ ...formData, fruitType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FRUIT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Phuong phap say</Label>
                <Select
                  value={formData.processingMethod}
                  onValueChange={(value) => setFormData({ ...formData, processingMethod: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROCESSING_METHODS.map((method) => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Trong luong</Label>
                <Select
                  value={formData.weight}
                  onValueChange={(value) => setFormData({ ...formData, weight: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WEIGHTS.map((w) => (
                      <SelectItem key={w} value={w}>{w}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Phan loai</Label>
                <Select
                  value={formData.label}
                  onValueChange={(value) => setFormData({ ...formData, label: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LABELS.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Ton kho</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="50"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Huy
            </Button>
            <Button onClick={handleSubmit}>
              {editingProduct ? 'Cap nhat' : 'Them moi'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xac nhan xoa san pham</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Ban co chac chan muon xoa san pham nay? Hanh dong nay khong the hoan tac.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Huy
            </Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
              Xoa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
