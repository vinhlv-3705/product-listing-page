'use client'

import { useState } from 'react'
import { LogIn, LogOut, User } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AuthDialog } from './auth-dialog'

export function AuthButton() {
  const { user, logout } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const handleOpenLogin = () => {
    setAuthMode('login')
    setShowAuthDialog(true)
  }

  const handleOpenRegister = () => {
    setAuthMode('register')
    setShowAuthDialog(true)
  }

  if (user) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User size={16} className="mr-2" />
              Hồ sơ
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Đơn hàng của tôi</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
              <LogOut size={16} className="mr-2" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenLogin}
          className="gap-2 hidden sm:flex border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
        >
          <LogIn size={18} />
          Đăng nhập
        </Button>
        <Button
          onClick={handleOpenRegister}
          size="sm"
          className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          Đăng ký
        </Button>
      </div>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}
