'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import AdminPanel from '@/components/AdminPanel'

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AdminPanel initialView="analytics" />
    </ProtectedRoute>
  )
}
