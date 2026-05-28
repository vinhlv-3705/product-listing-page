'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { ChevronDown, X } from 'lucide-react'

interface HorizontalFiltersProps {
  onFilterChange: (filters: Record<string, string[]>) => void
  onClearFilters: () => void
}

export function HorizontalFilters({
  onFilterChange,
  onClearFilters,
}: HorizontalFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    fruitType: [],
    processingMethod: [],
    weight: [],
    label: [],
  })

  const [priceRange, setPriceRange] = useState({ min: 0, max: 300000 })

  const filterConfig = [
    {
      id: 'fruitType',
      label: 'Loại quả',
      options: [
        { id: 'mango', label: 'Xoài' },
        { id: 'jackfruit', label: 'Mít' },
        { id: 'pineapple', label: 'Dứa' },
        { id: 'dragonFruit', label: 'Thanh Long' },
      ],
    },
    {
      id: 'processingMethod',
      label: 'Cách chế biến',
      options: [
        { id: 'dryFlexy', label: 'Sấy dẻo' },
        { id: 'freezeDry', label: 'Sấy thăng hoa' },
      ],
    },
    {
      id: 'weight',
      label: 'Khối lượng',
      options: [
        { id: '50g', label: '50g' },
        { id: '100g', label: '100g' },
        { id: '200g', label: '200g' },
        { id: '500g', label: '500g' },
      ],
    },
    {
      id: 'label',
      label: 'Nhãn mác',
      options: [
        { id: 'domestic', label: 'Nội địa' },
        { id: 'export', label: 'Xuất khẩu' },
      ],
    },
  ]

  const toggleFilter = (groupId: string, optionId: string) => {
    const newFilters = { ...selectedFilters }
    const currentGroup = newFilters[groupId] || []

    if (currentGroup.includes(optionId)) {
      newFilters[groupId] = currentGroup.filter((id) => id !== optionId)
    } else {
      newFilters[groupId] = [...currentGroup, optionId]
    }

    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    setSelectedFilters({
      fruitType: [],
      processingMethod: [],
      weight: [],
      label: [],
    })
    setPriceRange({ min: 0, max: 300000 })
    onClearFilters()
  }

  const hasActiveFilters =
    Object.values(selectedFilters).some((filters) => filters.length > 0) ||
    priceRange.min > 0 ||
    priceRange.max < 300000

  const activeFiltersCount = Object.values(selectedFilters).reduce(
    (total, filters) => total + filters.length,
    0
  )

  // Map of filter value to display label for pills
  const filterLabelMap: Record<string, string> = {
    mango: 'Xoài',
    jackfruit: 'Mít',
    pineapple: 'Dứa',
    dragonFruit: 'Thanh Long',
    dryFlexy: 'Sấy dẻo',
    freezeDry: 'Sấy thăng hoa',
    domestic: 'Nội địa',
    export: 'Xuất khẩu',
  }

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Fruit Type Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={selectedFilters.fruitType.length > 0 ? 'default' : 'outline'}
              className="h-9 text-sm"
            >
              Loại quả
              {selectedFilters.fruitType.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {selectedFilters.fruitType.length}
                </Badge>
              )}
              <ChevronDown size={16} className="ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <div className="space-y-3">
              {filterConfig[0].options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`fruit-${option.id}`}
                    checked={selectedFilters.fruitType.includes(option.id)}
                    onCheckedChange={() => toggleFilter('fruitType', option.id)}
                  />
                  <label
                    htmlFor={`fruit-${option.id}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Processing Method Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={selectedFilters.processingMethod.length > 0 ? 'default' : 'outline'}
              className="h-9 text-sm"
            >
              Cách chế biến
              {selectedFilters.processingMethod.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {selectedFilters.processingMethod.length}
                </Badge>
              )}
              <ChevronDown size={16} className="ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <div className="space-y-3">
              {filterConfig[1].options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`method-${option.id}`}
                    checked={selectedFilters.processingMethod.includes(option.id)}
                    onCheckedChange={() => toggleFilter('processingMethod', option.id)}
                  />
                  <label
                    htmlFor={`method-${option.id}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Weight Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={selectedFilters.weight.length > 0 ? 'default' : 'outline'}
              className="h-9 text-sm"
            >
              Khối lượng
              {selectedFilters.weight.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {selectedFilters.weight.length}
                </Badge>
              )}
              <ChevronDown size={16} className="ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <div className="space-y-3">
              {filterConfig[2].options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`weight-${option.id}`}
                    checked={selectedFilters.weight.includes(option.id)}
                    onCheckedChange={() => toggleFilter('weight', option.id)}
                  />
                  <label
                    htmlFor={`weight-${option.id}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Label Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={selectedFilters.label.length > 0 ? 'default' : 'outline'}
              className="h-9 text-sm"
            >
              Nhãn mác
              {selectedFilters.label.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {selectedFilters.label.length}
                </Badge>
              )}
              <ChevronDown size={16} className="ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <div className="space-y-3">
              {filterConfig[3].options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`label-${option.id}`}
                    checked={selectedFilters.label.includes(option.id)}
                    onCheckedChange={() => toggleFilter('label', option.id)}
                  />
                  <label
                    htmlFor={`label-${option.id}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            onClick={handleClearFilters}
            variant="ghost"
            size="sm"
            className="h-9"
          >
            <X size={16} className="mr-1" />
            Xóa lọc
          </Button>
        )}
      </div>

      {/* Active Filter Pills */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(selectedFilters).map(([groupId, values]) =>
            values.map((value) => (
              <Badge
                key={`${groupId}-${value}`}
                variant="secondary"
                className="pl-2 pr-1 gap-1"
              >
                {filterLabelMap[value] || value}
                <button
                  onClick={() => toggleFilter(groupId, value)}
                  className="ml-1 hover:bg-background rounded px-1"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))
          )}
        </div>
      )}
    </div>
  )
}
