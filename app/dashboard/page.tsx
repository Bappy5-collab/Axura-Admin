'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import AdminPanel from '@/components/AdminPanel'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminPanel initialView="dashboard" />
    </ProtectedRoute>
  )
}
