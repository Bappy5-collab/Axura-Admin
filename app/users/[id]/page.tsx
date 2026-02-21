'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import AdminPanel from '@/components/AdminPanel'
import UserDetail from '@/components/UserDetail'

export default function UserViewPage() {
  return (
    <ProtectedRoute>
      <AdminPanel initialView="users">
        <UserDetail mode="view" />
      </AdminPanel>
    </ProtectedRoute>
  )
}
