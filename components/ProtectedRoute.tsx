'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, CircularProgress } from '@mui/material'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated')
    
    if (authStatus !== 'true') {
      // Not authenticated, redirect to login
      router.push('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B0F1A',
        }}
      >
        <CircularProgress sx={{ color: '#7C3AED' }} />
      </Box>
    )
  }

  // If not authenticated, don't render children (redirect will happen)
  if (!isAuthenticated) {
    return null
  }

  // Render protected content
  return <>{children}</>
}
