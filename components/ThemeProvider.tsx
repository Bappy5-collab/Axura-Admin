'use client'

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode } from 'react'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C3AED',
      light: '#A855F7',
      dark: '#6D28D9',
    },
    secondary: {
      main: '#A855F7',
    },
    background: {
      default: '#0B0F1A',
      paper: '#111827',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#9CA3AF',
    },
    divider: '#1F2937',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
        contained: {
          background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
          boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #6D28D9 0%, #9333EA 100%)',
            boxShadow: '0 6px 20px 0 rgba(124, 58, 237, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#111827',
          border: '1px solid #1F2937',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#0B0F1A',
            border: '1px solid #1F2937',
            borderRadius: 8,
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
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          minHeight: 48,
          '&.Mui-selected': {
            color: '#A855F7',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: 'linear-gradient(90deg, #7C3AED 0%, #A855F7 100%)',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            color: '#9CA3AF',
            fontWeight: 600,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '1px solid #1F2937',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #1F2937',
          color: '#FFFFFF',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(124, 58, 237, 0.05)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#111827',
          border: '1px solid #1F2937',
          borderRadius: 16,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#111827',
          borderRight: '1px solid #1F2937',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&.Mui-selected': {
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
            borderLeft: '3px solid #7C3AED',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
            },
            '& .MuiListItemIcon-root': {
              color: '#A855F7',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(124, 58, 237, 0.08)',
          },
        },
      },
    },
  },
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
