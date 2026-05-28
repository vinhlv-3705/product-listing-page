'use client'

import { useState } from 'react'
import { Menu, X, Phone, MapPin, Leaf, Search, GitCompare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCompare } from '@/context/compare-context'
import { WishlistSheet } from './wishlist-sheet'
import { AccountMenu } from './account-menu'
import { CartHeader } from './cart-header'
import Link from 'next/link'

interface HeaderProps {
  onSearch: (query: string) => void
  onCompareClick: () => void
}

const navItems = [
  { name: 'Trang chu', href: '#' },
  { name: 'San pham', href: '#products' },
  { name: 'Khuyen mai', href: '#sale' },
  { name: 'Gioi thieu', href: '#about' },
  { name: 'Lien he', href: '#contact' },
]

export function Header({ onSearch, onCompareClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { compareList } = useCompare()

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="hidden md:flex items-center gap-6">
              <a href="tel:0987654321" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone size={14} />
                <span>Hotline: 0987 654 321</span>
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Ha Noi, Viet Nam</span>
              </span>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <span className="hidden sm:inline">Mien phi van chuyen don tu 500k</span>
              <Badge variant="secondary" className="bg-accent text-accent-foreground font-medium">
                Giam 20%
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Leaf size={28} className="text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground leading-tight">Hoa Qua Say</h1>
                <p className="text-xs text-muted-foreground">Dac san Viet Nam</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Tim kiem san pham..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-11 pl-4 pr-12 rounded-full border-2 border-border focus:border-primary bg-secondary/50"
                />
                <Button
                  onClick={handleSearch}
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full p-0"
                >
                  <Search size={18} />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Compare Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onCompareClick}
                className="relative h-10 w-10 hidden sm:flex"
              >
                <GitCompare size={20} className="text-muted-foreground" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {compareList.length}
                  </span>
                )}
              </Button>

              {/* Wishlist */}
              <WishlistSheet />

              {/* Account */}
              <AccountMenu />

              {/* Cart */}
              <CartHeader />

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Tim kiem san pham..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-10 pl-4 pr-12 rounded-full border border-border bg-secondary/50"
              />
              <Button
                onClick={handleSearch}
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full p-0"
              >
                <Search size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-card border-b border-border hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 h-12">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => {
                  onCompareClick()
                  setIsMobileMenuOpen(false)
                }}
              >
                <GitCompare size={18} />
                So sanh san pham
                {compareList.length > 0 && (
                  <Badge className="ml-auto">{compareList.length}</Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
