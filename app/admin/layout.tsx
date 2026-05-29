'use client'

import { AdminGuard } from '@/components/admin-guard'
import { AdminStoreProvider } from '@/context/admin-store-context'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminStoreProvider>
      <AdminGuard>
        <div className="min-h-screen bg-muted/30">
          <AdminSidebar />
          <div className="lg:pl-64">
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </AdminGuard>
    </AdminStoreProvider>
  )
}
