'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import AdminPanel from '@/components/AdminPanel'

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <AdminPanel initialView="settings" />
    </ProtectedRoute>
  )
}
