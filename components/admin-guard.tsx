'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn, isAdmin } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Small delay to allow auth state to load from localStorage
    const timer = setTimeout(() => {
      setIsChecking(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Dang kiem tra quyen truy cap...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md p-8">
          <ShieldAlert className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Yeu cau dang nhap</h1>
          <p className="text-muted-foreground mb-6">
            Ban can dang nhap de truy cap trang quan tri.
          </p>
          <Button onClick={() => router.push('/')}>
            Ve trang chu
          </Button>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md p-8">
          <ShieldAlert className="h-16 w-16 mx-auto text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Khong co quyen truy cap</h1>
          <p className="text-muted-foreground mb-6">
            Ban khong co quyen truy cap trang quan tri. Vui long dang nhap bang tai khoan admin.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground bg-muted p-4 rounded-lg mb-6">
            <p><strong>Tai khoan demo admin:</strong></p>
            <p>Email: admin@example.com</p>
            <p>Mat khau: admin123</p>
          </div>
          <Button onClick={() => router.push('/')}>
            Ve trang chu
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
