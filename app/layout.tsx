import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/cart-context'
import { PaymentProvider } from '@/context/payment-context'
import { WishlistProvider } from '@/context/wishlist-context'
import { SearchProvider } from '@/context/search-context'
import { AuthProvider } from '@/context/auth-context'
import { CouponProvider } from '@/context/coupon-context'
import { CompareProvider } from '@/context/compare-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Hoa Quả Sấy Đặc Sản - Cửa Hàng Bán Hàng Trực Tuyến',
  description: 'Mua hoa quả sấy chất lượng cao - Xoài, Mít, Dứa, Thanh Long. Sấy dẻo và sấy thăng hoa. Giao hàng toàn quốc.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="bg-background">
      <body className="font-sans antialiased">
        <CartProvider>
          <PaymentProvider>
            <WishlistProvider>
              <SearchProvider>
                <AuthProvider>
                  <CouponProvider>
                    <CompareProvider>
                      {children}
                    </CompareProvider>
                  </CouponProvider>
                </AuthProvider>
              </SearchProvider>
            </WishlistProvider>
          </PaymentProvider>
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

