'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
} from '@mui/material'
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Login as LoginIcon,
} from '@mui/icons-material'
import Image from 'next/image'

interface LoginProps {
  onLogin: (email: string, password: string) => boolean
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const success = onLogin(email, password)
    
    if (!success) {
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0B0F1A',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            background: '#111827',
            border: '1px solid #1F2937',
            borderRadius: 3,
            p: 4,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 150,
                height: 50,
                mb: 2,
              }}
            >
              <Image
                src="/axura_logo.avif"
                alt="Axura Logo"
                width={150}
                height={50}
                style={{
                  objectFit: 'contain',
                  maxWidth: '100%',
                  height: 'auto',
                }}
                priority
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 2,
                  border: '1px solid #1F2937',
                }}
              >
                admin
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                mt: 2,
                letterSpacing: '-0.02em',
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#9CA3AF',
                mt: 1,
              }}
            >
              Sign in to access the admin panel
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#EF4444',
                '& .MuiAlert-icon': {
                  color: '#EF4444',
                },
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#0B0F1A',
                  border: '1px solid #1F2937',
                  borderRadius: 2,
                  color: '#FFFFFF',
                  '& fieldset': {
                    borderColor: '#1F2937',
                  },
                  '&:hover fieldset': {
                    borderColor: '#374151',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7C3AED',
                    boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.1)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#9CA3AF',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#A855F7',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#9CA3AF' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#0B0F1A',
                  border: '1px solid #1F2937',
                  borderRadius: 2,
                  color: '#FFFFFF',
                  '& fieldset': {
                    borderColor: '#1F2937',
                  },
                  '&:hover fieldset': {
                    borderColor: '#374151',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7C3AED',
                    boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.1)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#9CA3AF',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#A855F7',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#9CA3AF' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={<LoginIcon />}
              sx={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
                boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.3)',
                color: '#FFFFFF',
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6D28D9 0%, #9333EA 100%)',
                  boxShadow: '0 6px 20px 0 rgba(124, 58, 237, 0.4)',
                },
                '&:disabled': {
                  background: 'rgba(124, 58, 237, 0.3)',
                },
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(124, 58, 237, 0.05)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: '#9CA3AF',
                  fontSize: '0.75rem',
                }}
              >
                Default Credentials:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#A855F7',
                  mt: 0.5,
                  fontFamily: 'monospace',
                }}
              >
                Email: admin@axura.com
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#A855F7',
                  fontFamily: 'monospace',
                }}
              >
                Password: admin123
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
