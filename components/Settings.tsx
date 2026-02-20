'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  Save as SaveIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material'

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: false,
    darkMode: true,
    language: 'en',
    timezone: 'UTC',
  })

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    company: 'Admin Panel',
  })

  const handleSave = () => {
    // In a real app, you would save settings to an API
    alert('Settings saved successfully!')
  }

  const SectionCard = ({
    title,
    icon,
    children,
  }: {
    title: string
    icon: React.ReactNode
    children: React.ReactNode
  }) => (
    <Paper
      sx={{
        background: '#111827',
        border: '1px solid #1F2937',
        borderRadius: 3,
        p: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
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
        <Typography
          variant="h6"
          sx={{
            color: '#FFFFFF',
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  )

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
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SectionCard
            title="Profile Information"
            icon={<SecurityIcon sx={{ color: '#A855F7', fontSize: 24 }} />}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                fullWidth
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
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9CA3AF',
                  },
                }}
              />
              <TextField
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                fullWidth
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
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9CA3AF',
                  },
                }}
              />
              <TextField
                label="Company"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                fullWidth
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
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9CA3AF',
                  },
                }}
              />
            </Box>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionCard
            title="Notifications"
            icon={<NotificationsIcon sx={{ color: '#A855F7', fontSize: 24 }} />}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      setSettings({ ...settings, emailNotifications: e.target.checked })
                    }
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#7C3AED',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#A855F7',
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#FFFFFF' }}>Email Notifications</Typography>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.pushNotifications}
                    onChange={(e) =>
                      setSettings({ ...settings, pushNotifications: e.target.checked })
                    }
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#7C3AED',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#A855F7',
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#FFFFFF' }}>Push Notifications</Typography>
                }
              />
              <Divider sx={{ borderColor: '#1F2937', my: 1 }} />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={(e) =>
                      setSettings({ ...settings, twoFactorAuth: e.target.checked })
                    }
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#7C3AED',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#A855F7',
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#FFFFFF' }}>Two-Factor Authentication</Typography>
                }
              />
            </Box>
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionCard
            title="Preferences"
            icon={<PaletteIcon sx={{ color: '#A855F7', fontSize: 24 }} />}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl
                fullWidth
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
                <InputLabel>Language</InputLabel>
                <Select
                  value={settings.language}
                  label="Language"
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
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
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={settings.timezone}
                  label="Timezone"
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">Eastern Time</MenuItem>
                  <MenuItem value="PST">Pacific Time</MenuItem>
                  <MenuItem value="GMT">GMT</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </SectionCard>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
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
              sx={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
                boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6D28D9 0%, #9333EA 100%)',
                  boxShadow: '0 6px 20px 0 rgba(124, 58, 237, 0.4)',
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
