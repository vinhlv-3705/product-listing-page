'use client'

import { ArrowDownUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'bestseller'

interface SortMenuProps {
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
}

export function SortMenu({ currentSort, onSortChange }: SortMenuProps) {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'price-asc', label: 'Giá: Thấp → Cao' },
    { value: 'price-desc', label: 'Giá: Cao → Thấp' },
    { value: 'rating', label: 'Đánh giá cao nhất' },
    { value: 'bestseller', label: 'Bán chạy nhất' },
  ]

  const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Sắp xếp'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 h-10">
          <ArrowDownUp size={18} />
          <span className="hidden sm:inline">{currentLabel}</span>
          <span className="sm:hidden">Sắp xếp</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`cursor-pointer ${currentSort === option.value ? 'bg-primary/10 text-primary font-semibold' : ''}`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
