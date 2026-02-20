'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Menu as MenuIcon,
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material'
import Dashboard from './Dashboard'
import UserManagement from './UserManagement'
import Analytics from './Analytics'
import Settings from './Settings'

type ActiveView = 'dashboard' | 'users' | 'analytics' | 'settings'

const drawerWidth = 260

export default function AdminPanel() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeView, setActiveView] = useState<ActiveView>('dashboard')

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavigation = (view: ActiveView) => {
    setActiveView(view)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />
      case 'users':
        return <UserManagement />
      case 'analytics':
        return <Analytics />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard onNavigate={handleNavigation} />
    }
  }

  const drawer = (
    <Box
      sx={{
        height: '100%',
        background: 'linear-gradient(180deg, #111827 0%, #0B0F1A 100%)',
        borderRight: '1px solid #1F2937',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          px: 3,
          py: 2,
          minHeight: '80px !important',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Image
            src="/axura_logo.avif"
            alt="Axura Admin Panel Logo"
            width={100}
            height={32}
            style={{
              objectFit: 'contain',
              maxWidth: '100%',
              height: 'auto',
            }}
            priority
          />
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
      </Toolbar>
      <Divider sx={{ borderColor: '#1F2937' }} />
      <List sx={{ px: 2, py: 2 }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            selected={activeView === 'dashboard'}
            onClick={() => handleNavigation('dashboard')}
            sx={{
              borderRadius: 2,
              py: 1.5,
              ...(activeView === 'dashboard' && {
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                borderLeft: '3px solid #7C3AED',
                boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)',
              }),
              '&:hover': {
                backgroundColor: activeView === 'dashboard' 
                  ? 'rgba(124, 58, 237, 0.2)' 
                  : 'rgba(124, 58, 237, 0.08)',
              },
              '&.Mui-selected': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DashboardIcon 
                sx={{ 
                  color: activeView === 'dashboard' ? '#A855F7' : '#9CA3AF', 
                  fontSize: 20 
                }} 
              />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: activeView === 'dashboard' ? 600 : 500,
                color: activeView === 'dashboard' ? '#FFFFFF' : '#9CA3AF',
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            selected={activeView === 'users'}
            onClick={() => handleNavigation('users')}
            sx={{
              borderRadius: 2,
              py: 1.5,
              ...(activeView === 'users' && {
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                borderLeft: '3px solid #7C3AED',
                boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)',
              }),
              '&:hover': {
                backgroundColor: activeView === 'users' 
                  ? 'rgba(124, 58, 237, 0.2)' 
                  : 'rgba(124, 58, 237, 0.08)',
              },
              '&.Mui-selected': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <PeopleIcon 
                sx={{ 
                  color: activeView === 'users' ? '#A855F7' : '#9CA3AF', 
                  fontSize: 20 
                }} 
              />
            </ListItemIcon>
            <ListItemText
              primary="User Management"
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: activeView === 'users' ? 600 : 500,
                color: activeView === 'users' ? '#FFFFFF' : '#9CA3AF',
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            selected={activeView === 'analytics'}
            onClick={() => handleNavigation('analytics')}
            sx={{
              borderRadius: 2,
              py: 1.5,
              ...(activeView === 'analytics' && {
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                borderLeft: '3px solid #7C3AED',
                boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)',
              }),
              '&:hover': {
                backgroundColor: activeView === 'analytics' 
                  ? 'rgba(124, 58, 237, 0.2)' 
                  : 'rgba(124, 58, 237, 0.08)',
              },
              '&.Mui-selected': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <AnalyticsIcon 
                sx={{ 
                  color: activeView === 'analytics' ? '#A855F7' : '#9CA3AF', 
                  fontSize: 20 
                }} 
              />
            </ListItemIcon>
            <ListItemText
              primary="Analytics"
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: activeView === 'analytics' ? 600 : 500,
                color: activeView === 'analytics' ? '#FFFFFF' : '#9CA3AF',
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            selected={activeView === 'settings'}
            onClick={() => handleNavigation('settings')}
            sx={{
              borderRadius: 2,
              py: 1.5,
              ...(activeView === 'settings' && {
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                borderLeft: '3px solid #7C3AED',
                boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)',
              }),
              '&:hover': {
                backgroundColor: activeView === 'settings' 
                  ? 'rgba(124, 58, 237, 0.2)' 
                  : 'rgba(124, 58, 237, 0.08)',
              },
              '&.Mui-selected': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SettingsIcon 
                sx={{ 
                  color: activeView === 'settings' ? '#A855F7' : '#9CA3AF', 
                  fontSize: 20 
                }} 
              />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: activeView === 'settings' ? 600 : 500,
                color: activeView === 'settings' ? '#FFFFFF' : '#9CA3AF',
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0B0F1A',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderBottom: 'none',
          '&::before': {
            display: 'none',
          },
        }}
      >
        <Toolbar
          sx={{
            borderBottom: 'none',
            minHeight: '64px !important',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: 'none' },
              color: '#FFFFFF',
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid #1F2937',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, md: 0 },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 0, md: 3 } }}>
          {renderContent()}
        </Container>
      </Box>
    </Box>
  )
}
