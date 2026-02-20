'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  LinearProgress,
  CircularProgress,
} from '@mui/material'
import {
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
} from '@mui/icons-material'

interface Stats {
  totalUsers: number
  paidUsers: number
  unpaidUsers: number
  revenue: number
  growthRate: number
}

interface DashboardProps {
  onNavigate?: (view: 'users' | 'analytics') => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    paidUsers: 0,
    unpaidUsers: 0,
    revenue: 0,
    growthRate: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users')
      const users = await response.json()
      
      const paidUsers = users.filter((u: any) => u.subscriptionStatus === 'Paid').length
      const unpaidUsers = users.filter((u: any) => u.subscriptionStatus === 'Unpaid').length
      
      setStats({
        totalUsers: users.length,
        paidUsers,
        unpaidUsers,
        revenue: paidUsers * 29.99,
        growthRate: 12.5,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({
    title,
    value,
    icon,
    gradient,
    subtitle,
  }: {
    title: string
    value: string | number
    icon: React.ReactNode
    gradient: string
    subtitle?: string
  }) => (
    <Card
      sx={{
        background: '#111827',
        border: '1px solid #1F2937',
        borderRadius: 3,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          borderColor: '#374151',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          background: gradient,
          opacity: 0.1,
          borderRadius: '50%',
          transform: 'translate(30px, -30px)',
        }}
      />
      <CardContent sx={{ p: 3, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: '#9CA3AF',
            fontSize: '0.875rem',
            fontWeight: 500,
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: '#FFFFFF',
            fontWeight: 700,
            mb: subtitle ? 0.5 : 0,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: '#6B7280',
              fontSize: '0.75rem',
              mt: 1,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress sx={{ color: '#7C3AED' }} />
      </Box>
    )
  }

  const conversionRate = stats.totalUsers > 0 
    ? ((stats.paidUsers / stats.totalUsers) * 100).toFixed(1) 
    : '0'

  return (
    <Box>
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
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<PeopleIcon sx={{ color: '#FFFFFF', fontSize: 24 }} />}
            gradient="linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)"
            subtitle="All registered users"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Paid Users"
            value={stats.paidUsers}
            icon={<MoneyIcon sx={{ color: '#FFFFFF', fontSize: 24 }} />}
            gradient="linear-gradient(135deg, #22C55E 0%, #16A34A 100%)"
            subtitle={`${conversionRate}% conversion rate`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Unpaid Users"
            value={stats.unpaidUsers}
            icon={<WarningIcon sx={{ color: '#FFFFFF', fontSize: 24 }} />}
            gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
            subtitle="Pending subscriptions"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            icon={<TrendingUpIcon sx={{ color: '#FFFFFF', fontSize: 24 }} />}
            gradient="linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)"
            subtitle={`+${stats.growthRate}% from last month`}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              background: '#111827',
              border: '1px solid #1F2937',
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#FFFFFF',
                fontWeight: 600,
                mb: 3,
              }}
            >
              Subscription Status
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                  Paid Subscriptions
                </Typography>
                <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                  {stats.paidUsers} ({conversionRate}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={parseFloat(conversionRate)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #22C55E 0%, #16A34A 100%)',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                  Unpaid Subscriptions
                </Typography>
                <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                  {stats.unpaidUsers} ({((stats.unpaidUsers / stats.totalUsers) * 100).toFixed(1)}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(stats.unpaidUsers / stats.totalUsers) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #EF4444 0%, #DC2626 100%)',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              background: '#111827',
              border: '1px solid #1F2937',
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#FFFFFF',
                fontWeight: 600,
                mb: 3,
              }}
            >
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box
                onClick={() => onNavigate?.('users')}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid #1F2937',
                  background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#7C3AED',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
                  },
                }}
              >
                <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 500 }}>
                  View All Users
                </Typography>
                <Typography variant="body2" sx={{ color: '#9CA3AF', mt: 0.5 }}>
                  Manage user accounts and subscriptions
                </Typography>
              </Box>
              <Box
                onClick={() => onNavigate?.('analytics')}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid #1F2937',
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(22, 163, 74, 0.05) 100%)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#22C55E',
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)',
                  },
                }}
              >
                <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 500 }}>
                  Revenue Analytics
                </Typography>
                <Typography variant="body2" sx={{ color: '#9CA3AF', mt: 0.5 }}>
                  View detailed revenue reports and trends
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
