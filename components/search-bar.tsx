'use client'

import { Search, X, Clock, TrendingUp } from 'lucide-react'
import { useState, useCallback, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

const RECENT_SEARCHES = ['Xoài sấy dẻo', 'Dứa sấy thăng hoa', 'Mít sấy', 'Thanh long']
const TRENDING_SEARCHES = ['Sấy thăng hoa', 'Combo tiết kiệm', 'Xuất khẩu', 'Giảm giá']

export function SearchBar({ onSearch, placeholder = 'Tìm kiếm sản phẩm, danh mục...' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>(RECENT_SEARCHES)

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      const newRecent = [query.trim(), ...recentSearches.filter(s => s !== query.trim())].slice(0, 5)
      setRecentSearches(newRecent)
    }
    onSearch(query.trim())
    setShowSuggestions(false)
  }, [query, onSearch, recentSearches])

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    onSearch(suggestion)
    setShowSuggestions(false)
  }

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="relative flex-1 max-w-2xl">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(e.target.value.length > 0)
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            className="pl-12 pr-12 h-12 text-base border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors bg-background rounded-full p-1"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <Button
          onClick={handleSearch}
          className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-lg shadow-md"
        >
          <Search size={20} className="mr-2" />
          Tìm kiếm
        </Button>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl z-50 overflow-hidden">
          {query ? (
            <div className="p-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Gợi ý tìm kiếm</p>
              <div className="space-y-1">
                {RECENT_SEARCHES
                  .filter(s => s.toLowerCase().includes(query.toLowerCase()))
                  .slice(0, 5)
                  .map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors flex items-center gap-2"
                    >
                      <Search size={16} className="text-muted-foreground" />
                      {suggestion}
                    </button>
                  ))}
                {RECENT_SEARCHES.filter(s => s.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                  <p className="text-sm text-muted-foreground px-4 py-2">Không có gợi ý</p>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4">
              {/* Recent Searches */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock size={16} />
                    Tìm kiếm gần đây
                  </p>
                  <button
                    onClick={() => setRecentSearches([])}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Xóa
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Trending Searches */}
              <div>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                  <TrendingUp size={16} />
                  Đang tìm kiếm nhiều
                </p>
                <div className="space-y-1">
                  {TRENDING_SEARCHES.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors flex items-center gap-2"
                    >
                      <TrendingUp size={16} className="text-primary" />
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
