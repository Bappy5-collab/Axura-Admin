'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import AdminPanel from '@/components/AdminPanel'
import UserDetail from '@/components/UserDetail'

export default function UserEditPage() {
  return (
    <ProtectedRoute>
      <AdminPanel initialView="users">
        <UserDetail mode="edit" />
      </AdminPanel>
    </ProtectedRoute>
  )
}
