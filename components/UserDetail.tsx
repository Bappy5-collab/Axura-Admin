'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material'

interface User {
  id: string
  name: string
  email: string
  subscriptionStatus: 'Paid' | 'Unpaid'
}

interface UserDetailProps {
  mode: 'view' | 'edit'
}

export default function UserDetail({ mode }: UserDetailProps) {
  const router = useRouter()
  const params = useParams()
  const userId = params?.id as string

  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const isEditMode = mode === 'edit'

  useEffect(() => {
    if (userId) {
      fetchUser()
    }
  }, [userId])

  const fetchUser = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(`/api/users/${userId}`)
      
      if (!response.ok) {
        throw new Error('User not found')
      }
      
      const data = await response.json()
      setUser(data)
      setFormData(data)
    } catch (error) {
      console.error('Error fetching user:', error)
      setError('Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData) return

    try {
      setSaving(true)
      setError('')
      setSuccess(false)

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      const updatedUser = await response.json()
      setUser(updatedUser)
      setFormData(updatedUser)
      setSuccess(true)
      
      // Redirect to users list after a short delay
      setTimeout(() => {
        router.push('/users')
      }, 1500)
    } catch (error) {
      console.error('Error updating user:', error)
      setError('Failed to update user')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: keyof User, value: string) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value,
      })
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress sx={{ color: '#7C3AED' }} />
      </Box>
    )
  }

  if (error && !user) {
    return (
      <Box>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/users')}
          sx={{
            mb: 3,
            color: '#9CA3AF',
            cursor: 'pointer',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
              color: '#A855F7',
            },
          }}
        >
          Back to Users
        </Button>
        <Alert severity="error" sx={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#EF4444' }}>
          {error}
        </Alert>
      </Box>
    )
  }

  const displayData = isEditMode ? formData : user

  return (
    <Box>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/users')}
        sx={{
          mb: 3,
          color: '#9CA3AF',
          cursor: 'pointer',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            color: '#A855F7',
          },
        }}
      >
        Back to Users
      </Button>

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #9CA3AF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
        }}
      >
        {isEditMode ? 'Edit User' : 'User Details'}
      </Typography>

      {success && (
        <Alert
          severity="success"
          sx={{
            mb: 3,
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#22C55E',
          }}
        >
          User updated successfully! Redirecting...
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#EF4444',
          }}
        >
          {error}
        </Alert>
      )}

      <Paper
        sx={{
          background: '#111827',
          border: '1px solid #1F2937',
          borderRadius: 3,
          p: 4,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PersonIcon sx={{ color: '#A855F7', fontSize: 20 }} />
                <InputLabel
                  sx={{
                    color: '#9CA3AF',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  Full Name
                </InputLabel>
              </Box>
              {isEditMode ? (
                <TextField
                  fullWidth
                  value={formData?.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  sx={{
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
                  }}
                />
              ) : (
                <Typography sx={{ color: '#FFFFFF', fontSize: '1rem' }}>
                  {user?.name}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <EmailIcon sx={{ color: '#A855F7', fontSize: 20 }} />
                <InputLabel
                  sx={{
                    color: '#9CA3AF',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  Email Address
                </InputLabel>
              </Box>
              {isEditMode ? (
                <TextField
                  fullWidth
                  type="email"
                  value={formData?.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  sx={{
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
                  }}
                />
              ) : (
                <Typography sx={{ color: '#FFFFFF', fontSize: '1rem' }}>
                  {user?.email}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CreditCardIcon sx={{ color: '#A855F7', fontSize: 20 }} />
                <InputLabel
                  sx={{
                    color: '#9CA3AF',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  Subscription Status
                </InputLabel>
              </Box>
              {isEditMode ? (
                <FormControl fullWidth>
                  <Select
                    value={formData?.subscriptionStatus || 'Unpaid'}
                    onChange={(e) => handleChange('subscriptionStatus', e.target.value as 'Paid' | 'Unpaid')}
                    sx={{
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
                      },
                      '& .MuiSelect-icon': {
                        color: '#9CA3AF',
                      },
                    }}
                  >
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <Chip
                  label={user?.subscriptionStatus}
                  size="medium"
                  sx={{
                    backgroundColor:
                      user?.subscriptionStatus === 'Paid'
                        ? 'rgba(34, 197, 94, 0.15)'
                        : 'rgba(239, 68, 68, 0.15)',
                    color:
                      user?.subscriptionStatus === 'Paid'
                        ? '#22C55E'
                        : '#EF4444',
                    fontWeight: 600,
                    border:
                      user?.subscriptionStatus === 'Paid'
                        ? '1px solid rgba(34, 197, 94, 0.3)'
                        : '1px solid rgba(239, 68, 68, 0.3)',
                    boxShadow:
                      user?.subscriptionStatus === 'Paid'
                        ? '0 0 12px rgba(34, 197, 94, 0.2)'
                        : '0 0 12px rgba(239, 68, 68, 0.2)',
                  }}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              {isEditMode && (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => router.push('/users')}
                    sx={{
                      borderColor: '#1F2937',
                      color: '#9CA3AF',
                      '&:hover': {
                        borderColor: '#374151',
                        backgroundColor: 'rgba(124, 58, 237, 0.1)',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                      background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
                      boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.3)',
                      color: '#FFFFFF',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #6D28D9 0%, #9333EA 100%)',
                        boxShadow: '0 6px 20px 0 rgba(124, 58, 237, 0.4)',
                      },
                      '&:disabled': {
                        background: 'rgba(124, 58, 237, 0.3)',
                      },
                    }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </>
              )}
              {!isEditMode && (
                <Button
                  variant="contained"
                  onClick={() => router.push(`/users/${userId}/edit`)}
                  sx={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
                    boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.3)',
                    color: '#FFFFFF',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #6D28D9 0%, #9333EA 100%)',
                      boxShadow: '0 6px 20px 0 rgba(124, 58, 237, 0.4)',
                    },
                  }}
                >
                  Edit User
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
