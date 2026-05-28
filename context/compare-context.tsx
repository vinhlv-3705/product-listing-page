'use client'

import { createContext, useContext, useState } from 'react'

interface CompareContextType {
  compareList: string[]
  addToCompare: (productId: string) => void
  removeFromCompare: (productId: string) => void
  isInCompare: (productId: string) => boolean
  clearCompare: () => void
  canAddToCompare: () => boolean
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<string[]>([])

  const addToCompare = (productId: string) => {
    if (compareList.length < 4 && !compareList.includes(productId)) {
      setCompareList([...compareList, productId])
    }
  }

  const removeFromCompare = (productId: string) => {
    setCompareList(compareList.filter((id) => id !== productId))
  }

  const isInCompare = (productId: string) => {
    return compareList.includes(productId)
  }

  const clearCompare = () => {
    setCompareList([])
  }

  const canAddToCompare = () => {
    return compareList.length < 4
  }

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        canAddToCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider')
  }
  return context
}
