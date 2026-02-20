'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material'

interface AnalyticsData {
  revenue: {
    current: number
    previous: number
    change: number
  }
  users: {
    current: number
    previous: number
    change: number
  }
  subscriptions: {
    current: number
    previous: number
    change: number
  }
  retention: {
    current: number
    previous: number
    change: number
  }
}

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('month')
  const [data, setData] = useState<AnalyticsData>({
    revenue: { current: 0, previous: 0, change: 0 },
    users: { current: 0, previous: 0, change: 0 },
    subscriptions: { current: 0, previous: 0, change: 0 },
    retention: { current: 0, previous: 0, change: 0 },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [timeframe])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users')
      const users = await response.json()
      
      const paidUsers = users.filter((u: any) => u.subscriptionStatus === 'Paid').length
      
      // Mock analytics data
      setData({
        revenue: {
          current: paidUsers * 29.99,
          previous: (paidUsers - 2) * 29.99,
          change: 12.5,
        },
        users: {
          current: users.length,
          previous: users.length - 3,
          change: 8.3,
        },
        subscriptions: {
          current: paidUsers,
          previous: paidUsers - 2,
          change: 15.0,
        },
        retention: {
          current: 87.5,
          previous: 85.2,
          change: 2.3,
        },
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const MetricCard = ({
    title,
    current,
    previous,
    change,
    icon,
    format,
  }: {
    title: string
    current: number
    previous: number
    change: number
    icon: React.ReactNode
    format?: (val: number) => string
  }) => {
    const isPositive = change >= 0
    const formatValue = format || ((val) => val.toLocaleString())
    
    return (
      <Card
        sx={{
          background: '#111827',
          border: '1px solid #1F2937',
          borderRadius: 3,
          height: '100%',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: '#374151',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                background: isPositive
                  ? 'rgba(34, 197, 94, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
                border: `1px solid ${isPositive ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              }}
            >
              {isPositive ? (
                <TrendingUpIcon sx={{ color: '#22C55E', fontSize: 16 }} />
              ) : (
                <TrendingDownIcon sx={{ color: '#EF4444', fontSize: 16 }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: isPositive ? '#22C55E' : '#EF4444',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              >
                {Math.abs(change).toFixed(1)}%
              </Typography>
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
              mb: 0.5,
              letterSpacing: '-0.02em',
            }}
          >
            {formatValue(current)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#6B7280',
              fontSize: '0.75rem',
            }}
          >
            Previous: {formatValue(previous)}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography sx={{ color: '#9CA3AF' }}>Loading analytics...</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #9CA3AF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          Analytics
        </Typography>
        <FormControl
          size="small"
          sx={{
            minWidth: 150,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#111827',
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
            },
            '& .MuiInputLabel-root': {
              color: '#9CA3AF',
            },
            '& .MuiSelect-icon': {
              color: '#9CA3AF',
            },
          }}
        >
          <InputLabel>Timeframe</InputLabel>
          <Select
            value={timeframe}
            label="Timeframe"
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <MenuItem value="week">Last Week</MenuItem>
            <MenuItem value="month">Last Month</MenuItem>
            <MenuItem value="quarter">Last Quarter</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Revenue"
            current={data.revenue.current}
            previous={data.revenue.previous}
            change={data.revenue.change}
            icon={<MoneyIcon sx={{ color: '#A855F7', fontSize: 24 }} />}
            format={(val) => `$${val.toLocaleString()}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Users"
            current={data.users.current}
            previous={data.users.previous}
            change={data.users.change}
            icon={<PeopleIcon sx={{ color: '#A855F7', fontSize: 24 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Subscriptions"
            current={data.subscriptions.current}
            previous={data.subscriptions.previous}
            change={data.subscriptions.change}
            icon={<TrendingUpIcon sx={{ color: '#A855F7', fontSize: 24 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Retention Rate"
            current={data.retention.current}
            previous={data.retention.previous}
            change={data.retention.change}
            icon={<TrendingUpIcon sx={{ color: '#A855F7', fontSize: 24 }} />}
            format={(val) => `${val.toFixed(1)}%`}
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
              Revenue Trends
            </Typography>
            <Box
              sx={{
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6B7280',
              }}
            >
              <Typography variant="body2">Chart visualization would go here</Typography>
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
              User Growth
            </Typography>
            <Box
              sx={{
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6B7280',
              }}
            >
              <Typography variant="body2">Chart visualization would go here</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
