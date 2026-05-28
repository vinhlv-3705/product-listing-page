'use client'

import { useState, useEffect } from 'react'
import { 
  Menu, 
  X, 
  Search, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronDown,
  Truck,
  Shield,
  Gift,
  Headphones
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/search-bar'
import { CartHeader } from '@/components/cart-header'
import { WishlistSheet } from '@/components/wishlist-sheet'
import { AccountMenu } from '@/components/account-menu'
import { useCompare } from '@/context/compare-context'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Trang chu', href: '#' },
  { name: 'San pham', href: '#products' },
  { name: 'Khuyen mai', href: '#sale' },
  { name: 'Gioi thieu', href: '#about' },
  { name: 'Lien he', href: '#contact' },
]

const categories = [
  { name: 'Xoai say', href: '#' },
  { name: 'Mit say', href: '#' },
  { name: 'Dua say', href: '#' },
  { name: 'Thanh long say', href: '#' },
  { name: 'Combo tiet kiem', href: '#' },
]

interface HeaderProps {
  onSearch: (query: string) => void
  showCompare: boolean
  setShowCompare: (show: boolean) => void
}

export function Header({ onSearch, showCompare, setShowCompare }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { compareList } = useCompare()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar - Contact Info */}
      <div className={cn(
        "bg-primary text-primary-foreground transition-all duration-300",
        isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:0123456789" className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                <Phone size={14} />
                <span>Hotline: 0123 456 789</span>
              </a>
              <span className="hidden md:flex items-center gap-2">
                <Clock size={14} />
                <span>8:00 - 22:00 (T2 - CN)</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:flex items-center gap-2">
                <MapPin size={14} />
                <span>123 Nguyen Van Linh, Da Nang</span>
              </span>
              <span className="hidden md:flex items-center gap-2 text-accent font-medium">
                <Gift size={14} />
                <span>Mien phi ship don tu 500k</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={cn(
        "bg-background border-b border-border transition-all duration-300",
        isScrolled ? "shadow-lg" : "shadow-sm"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-primary-foreground">HQ</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground leading-tight">Hoa Qua Say</h1>
                <p className="text-xs text-muted-foreground">Dac san Viet Nam</p>
              </div>
            </a>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <SearchBar onSearch={onSearch} placeholder="Tim kiem san pham..." />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => {}}
              >
                <Search size={20} />
              </Button>

              {/* Compare Button */}
              <Button
                onClick={() => setShowCompare(!showCompare)}
                variant="ghost"
                size="icon"
                className="relative hidden sm:flex"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M7 16l4-8 4 4 6-10" />
                </svg>
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {compareList.length}
                  </span>
                )}
              </Button>

              {/* Account */}
              <AccountMenu />

              {/* Wishlist */}
              <WishlistSheet />

              {/* Cart */}
              <CartHeader />

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="lg:hidden pb-4">
            <SearchBar onSearch={onSearch} placeholder="Tim kiem san pham..." />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className={cn(
        "bg-secondary/50 border-b border-border hidden md:block transition-all duration-300",
        isScrolled ? "py-2" : "py-3"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                <Menu size={18} />
                <span>Danh muc san pham</span>
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-background border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {categories.map((cat) => (
                    <a
                      key={cat.name}
                      href={cat.href}
                      className="block px-4 py-2.5 text-sm hover:bg-secondary hover:text-primary transition-colors"
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Quick Info */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Truck size={14} className="text-primary" />
                Giao nhanh 2h
              </span>
              <span className="flex items-center gap-1">
                <Shield size={14} className="text-primary" />
                Bao hanh chat luong
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-background z-50 md:hidden transition-transform duration-300",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-lg font-bold">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </Button>
          </div>

          {/* Mobile Nav Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1 mb-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <p className="px-4 py-2 text-sm font-medium text-muted-foreground">Danh muc</p>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <a
                    key={cat.name}
                    href={cat.href}
                    className="block px-4 py-2.5 text-sm rounded-lg hover:bg-secondary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="p-4 border-t border-border bg-secondary/30">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />
                <span>0123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-primary" />
                <span>8:00 - 22:00</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <MapPin size={14} className="text-primary" />
                <span>123 Nguyen Van Linh, Da Nang</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges - Compact */}
      <div className={cn(
        "bg-background border-b border-border transition-all duration-300 overflow-hidden",
        isScrolled ? "h-0 py-0" : "h-auto py-2"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Mien phi van chuyen</p>
                <p>Don hang tu 500k</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Dam bao chat luong</p>
                <p>Doi tra trong 7 ngay</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Gift size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Uu dai hap dan</p>
                <p>Giam gia len den 50%</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Headphones size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Ho tro 24/7</p>
                <p>San sang phuc vu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
