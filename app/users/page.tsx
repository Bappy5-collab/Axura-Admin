'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import AdminPanel from '@/components/AdminPanel'

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <AdminPanel initialView="users" />
    </ProtectedRoute>
  )
}
