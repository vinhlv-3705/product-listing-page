'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChevronDown, X } from 'lucide-react'
import { useState } from 'react'

interface FilterGroup {
  id: string
  label: string
  options: Array<{ id: string; label: string }>
}

interface ProductFiltersProps {
  onFilterChange: (filters: Record<string, string[]>) => void
  onClearFilters: () => void
}

export function ProductFilters({
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    fruitType: true,
    processingMethod: true,
    weight: true,
    label: true,
  })

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    fruitType: [],
    processingMethod: [],
    weight: [],
    label: [],
  })

  const [priceRange, setPriceRange] = useState({ min: 0, max: 300000 })

  const filterGroups: FilterGroup[] = [
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
      label: 'Khối lượng gói',
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

  const toggleGroup = (groupId: string) => {
    setExpandedGroups({
      ...expandedGroups,
      [groupId]: !expandedGroups[groupId],
    })
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

  const handleClearGroup = (groupId: string) => {
    const newFilters = { ...selectedFilters }
    newFilters[groupId] = []
    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const hasActiveFilters =
    Object.values(selectedFilters).some((filters) => filters.length > 0) ||
    priceRange.min > 0 ||
    priceRange.max < 300000

  const activeFiltersCount = Object.values(selectedFilters).reduce(
    (total, filters) => total + filters.length,
    0
  )

  return (
    <div className="space-y-6">
      {/* Header with Active Filters Count */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">Bộ lọc</h2>
          {activeFiltersCount > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {activeFiltersCount} bộ lọc đang hoạt động
            </p>
          )}
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          onClick={handleClearFilters}
          variant="outline"
          className="w-full h-9 text-sm font-medium border-border text-foreground hover:bg-secondary"
        >
          <X size={16} className="mr-2" />
          Xóa tất cả bộ lọc
        </Button>
      )}

      {/* Price Range Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Khoảng giá</h3>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Tối thiểu"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({
                  ...priceRange,
                  min: Math.max(0, Number(e.target.value)),
                })
              }
              className="flex-1 h-9 px-3 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Tối đa"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({
                  ...priceRange,
                  max: Number(e.target.value),
                })
              }
              className="flex-1 h-9 px-3 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            {priceRange.min.toLocaleString()} - {priceRange.max.toLocaleString()} ₫
          </div>
        </div>
      </div>

      <Separator />

      {/* Filter Groups */}
      <div className="space-y-2">
        {filterGroups.map((group) => {
          const hasActiveFiltersInGroup = (selectedFilters[group.id] || []).length > 0

          return (
            <div key={group.id} className="space-y-3">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between group p-2 -m-2 hover:bg-secondary/50 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {group.label}
                    </h3>
                    {hasActiveFiltersInGroup && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {selectedFilters[group.id].length} được chọn
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hasActiveFiltersInGroup && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClearGroup(group.id)
                      }}
                      className="p-1 hover:bg-secondary rounded transition-colors"
                    >
                      <X size={14} className="text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground group-hover:text-foreground transition-transform duration-300 ${
                      expandedGroups[group.id] ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Filter Options */}
              {expandedGroups[group.id] && (
                <div className="pl-2 space-y-2.5">
                  {group.options.map((option) => {
                    const isChecked =
                      selectedFilters[group.id]?.includes(option.id) || false

                    return (
                      <div
                        key={option.id}
                        className="flex items-center space-x-3 group/item"
                      >
                        <Checkbox
                          id={`${group.id}-${option.id}`}
                          checked={isChecked}
                          onCheckedChange={() =>
                            toggleFilter(group.id, option.id)
                          }
                          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label
                          htmlFor={`${group.id}-${option.id}`}
                          className="text-sm text-foreground cursor-pointer group-hover/item:text-primary transition-colors duration-200 flex-1"
                        >
                          {option.label}
                        </label>
                        {isChecked && (
                          <Badge
                            variant="secondary"
                            className="h-5 px-1.5 text-xs font-medium"
                          >
                            ✓
                          </Badge>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Separator between groups */}
              {filterGroups.indexOf(group) < filterGroups.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
