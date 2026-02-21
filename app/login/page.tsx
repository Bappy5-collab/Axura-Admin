'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Login from '@/components/Login'

// Default credentials
const DEFAULT_EMAIL = 'admin@axura.com'
const DEFAULT_PASSWORD = 'admin123'

export default function LoginPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      router.push('/dashboard')
    }
  }, [router])

  const handleLogin = (email: string, password: string): boolean => {
    // Validate credentials
    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      // Store authentication status
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      setIsAuthenticated(true)
      router.push('/dashboard')
      return true
    }
    return false
  }

  // If already authenticated, redirect (handled by useEffect)
  if (isAuthenticated) {
    return null
  }

  return <Login onLogin={handleLogin} />
}
