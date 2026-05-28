'use client'

import { useState } from 'react'
import { User, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/auth-context'
import { OrderHistory } from '@/components/order-history'
import { AddressManagement } from '@/components/address-management'

export function AccountMenu() {
  const { user, isLoggedIn, login, register, logout } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const [showAddressManagement, setShowAddressManagement] = useState(false)

  const handleAuth = () => {
    if (isLogin) {
      login(email, password)
    } else {
      register(name, email, password)
    }
    setShowAuth(false)
    setEmail('')
    setPassword('')
    setName('')
  }

  if (!isLoggedIn) {
    return (
      <>
        <Button
          onClick={() => setShowAuth(true)}
          variant="outline"
          size="lg"
          className="gap-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
        >
          <User size={20} />
          <span className="hidden sm:inline">Tài khoản</span>
        </Button>

        <Dialog open={showAuth} onOpenChange={setShowAuth}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</DialogTitle>
              <DialogDescription>
                {isLogin ? 'Đăng nhập để xem lịch sử mua hàng' : 'Tạo tài khoản mới'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {!isLogin && (
                <Input
                  placeholder="Họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                onClick={handleAuth}
                disabled={isLogin ? !email || !password : !email || !password || !name}
                className="w-full"
              >
                {isLogin ? 'Đăng nhập' : 'Đăng ký'}
              </Button>

              <button
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-sm text-primary hover:underline"
              >
                {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
        >
          <User size={20} />
          <span className="hidden sm:inline">{user?.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem disabled className="py-2">
          <span className="font-medium">{user?.email}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setShowAddressManagement(true)}
        >
          <Settings size={16} className="mr-2" />
          <span>Sổ địa chỉ</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setShowOrderHistory(true)}
        >
          <span>Lịch sử mua hàng</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut size={16} className="mr-2" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>

      <Dialog open={showOrderHistory} onOpenChange={setShowOrderHistory}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <OrderHistory />
        </DialogContent>
      </Dialog>

      <Dialog open={showAddressManagement} onOpenChange={setShowAddressManagement}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <AddressManagement />
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}
