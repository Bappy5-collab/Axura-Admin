'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
  Divider,
  IconButton,
} from '@mui/material'
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'

interface UserAvatarProps {
  variant?: 'sidebar' | 'navbar'
}

export default function UserAvatar({ variant = 'sidebar' }: UserAvatarProps) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const userEmail = typeof window !== 'undefined' 
    ? localStorage.getItem('userEmail') || 'admin@axura.com'
    : 'admin@axura.com'

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    router.push('/login')
    handleClose()
  }

  const handleProfile = () => {
    router.push('/settings')
    handleClose()
  }

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase()
  }

  if (variant === 'navbar') {
    return (
      <Box>
        <IconButton
          onClick={handleClick}
          sx={{
            p: 0,
            '&:hover': {
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
            },
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            {getInitials(userEmail)}
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              background: '#111827',
              border: '1px solid #1F2937',
              borderRadius: 2,
              mt: 1,
              minWidth: 200,
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#FFFFFF',
                fontWeight: 600,
              }}
            >
              {userEmail}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#9CA3AF',
                fontSize: '0.75rem',
              }}
            >
              Administrator
            </Typography>
          </Box>
          <Divider sx={{ borderColor: '#1F2937', my: 1 }} />
          <MenuItem
            onClick={handleProfile}
            sx={{
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
              },
            }}
          >
            <AccountCircleIcon sx={{ mr: 1.5, fontSize: 20, color: '#9CA3AF' }} />
            Profile
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              color: '#EF4444',
              '&:hover': {
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
              },
            }}
          >
            <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    )
  }

  // Sidebar variant
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        p: 1,
        borderTop: '1px solid #1F2937',
        backgroundColor: '#111827',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 0.75,
          borderRadius: 2,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          {getInitials(userEmail)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.75rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: 1.2,
            }}
          >
            {userEmail.split('@')[0]}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#9CA3AF',
              fontSize: '0.7rem',
              lineHeight: 1.2,
            }}
          >
            Admin
          </Typography>
        </Box>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            color: '#9CA3AF',
            p: 0.5,
            '&:hover': {
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
              color: '#A855F7',
            },
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            background: '#111827',
            border: '1px solid #1F2937',
            borderRadius: 2,
            mb: 1,
            minWidth: 200,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#FFFFFF',
              fontWeight: 600,
            }}
          >
            {userEmail}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#9CA3AF',
              fontSize: '0.75rem',
            }}
          >
            Administrator
          </Typography>
        </Box>
        <Divider sx={{ borderColor: '#1F2937', my: 1 }} />
        <MenuItem
          onClick={handleProfile}
          sx={{
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
            },
          }}
        >
          <AccountCircleIcon sx={{ mr: 1.5, fontSize: 20, color: '#9CA3AF' }} />
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            color: '#EF4444',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
            },
          }}
        >
          <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}
