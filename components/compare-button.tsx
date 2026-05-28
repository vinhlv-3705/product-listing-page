'use client'

import { Scale } from 'lucide-react'
import { useCompare } from '@/context/compare-context'
import { Button } from '@/components/ui/button'

interface CompareButtonProps {
  productId: string
}

export function CompareButton({ productId }: CompareButtonProps) {
  const { isInCompare, addToCompare, removeFromCompare, canAddToCompare } = useCompare()
  const inCompare = isInCompare(productId)

  const handleToggle = () => {
    if (inCompare) {
      removeFromCompare(productId)
    } else if (canAddToCompare()) {
      addToCompare(productId)
    }
  }

  return (
    <Button
      onClick={handleToggle}
      variant={inCompare ? 'default' : 'outline'}
      size="sm"
      className={`gap-2 ${inCompare ? 'bg-primary text-primary-foreground' : ''}`}
      disabled={!inCompare && !canAddToCompare()}
    >
      <Scale size={16} />
      <span className="hidden sm:inline">{inCompare ? 'So sánh' : 'So sánh'}</span>
    </Button>
  )
}
