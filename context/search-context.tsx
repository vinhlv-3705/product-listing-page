'use client'

import { createContext, useContext, useState } from 'react'

interface SearchContextType {
  searchQuery: string
  sortBy: 'relevant' | 'price-low' | 'price-high' | 'rating' | 'newest'
  setSearchQuery: (query: string) => void
  setSortBy: (sort: 'relevant' | 'price-low' | 'price-high' | 'rating' | 'newest') => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'relevant' | 'price-low' | 'price-high' | 'rating' | 'newest'>('relevant')

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        sortBy,
        setSearchQuery,
        setSortBy,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }
  return context
}
