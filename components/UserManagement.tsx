'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TablePagination,
  TableSortLabel,
  CircularProgress,
} from '@mui/material'
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material'

interface User {
  id: string
  name: string
  email: string
  subscriptionStatus: 'Paid' | 'Unpaid'
}

type FilterTab = 'all' | 'paid' | 'unpaid'
type SortOrder = 'asc' | 'desc'
type SortField = 'name' | 'email' | 'subscriptionStatus'

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [filterTab, setFilterTab] = useState<FilterTab>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id))
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  const handleView = (user: User) => {
    alert(`Viewing user: ${user.name}`)
  }

  const handleEdit = (user: User) => {
    alert(`Editing user: ${user.name}`)
  }

  const filteredUsers = useMemo(() => {
    let filtered = users

    if (filterTab === 'paid') {
      filtered = filtered.filter((u) => u.subscriptionStatus === 'Paid')
    } else if (filterTab === 'unpaid') {
      filtered = filtered.filter((u) => u.subscriptionStatus === 'Unpaid')
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      )
    }

    filtered = [...filtered].sort((a, b) => {
      let aValue: string | number = a[sortField]
      let bValue: string | number = b[sortField]

      if (sortField === 'name' || sortField === 'email') {
        aValue = (aValue as string).toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [users, filterTab, searchQuery, sortField, sortOrder])

  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage
    return filteredUsers.slice(start, start + rowsPerPage)
  }, [filteredUsers, page, rowsPerPage])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

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
        User Management
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Paper
          sx={{
            flex: 1,
            minWidth: 300,
            background: '#111827',
            border: '1px solid #1F2937',
            borderRadius: 2,
            p: 0,
            overflow: 'hidden',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Tabs
            value={filterTab}
            onChange={(_, newValue) => {
              setFilterTab(newValue)
              setPage(0)
            }}
            sx={{
              minHeight: '40px',
              '& .MuiTabs-indicator': {
                background: 'linear-gradient(90deg, #7C3AED 0%, #A855F7 100%)',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTab-root': {
                minHeight: '40px',
                height: '40px',
              },
            }}
          >
            <Tab
              label="All Users"
              value="all"
              sx={{
                color: '#9CA3AF',
                fontWeight: 500,
                '&.Mui-selected': {
                  color: '#A855F7',
                },
              }}
            />
            <Tab
              label="Paid Users"
              value="paid"
              sx={{
                color: '#9CA3AF',
                fontWeight: 500,
                '&.Mui-selected': {
                  color: '#A855F7',
                },
              }}
            />
            <Tab
              label="Unpaid Users"
              value="unpaid"
              sx={{
                color: '#9CA3AF',
                fontWeight: 500,
                '&.Mui-selected': {
                  color: '#A855F7',
                },
              }}
            />
          </Tabs>
        </Paper>

        <TextField
          placeholder="Search by name or email..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setPage(0)
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#9CA3AF' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: 280,
            height: '40px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#111827',
              border: '1px solid #1F2937',
              borderRadius: 2,
              color: '#FFFFFF',
              height: '40px',
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
            '& input': {
              height: '40px',
              padding: '0 14px',
            },
            '& input::placeholder': {
              color: '#6B7280',
              opacity: 1,
            },
          }}
        />
      </Box>

      <Paper
        sx={{
          background: '#111827',
          border: '1px solid #1F2937',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <TableContainer>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
              <CircularProgress
                sx={{
                  color: '#7C3AED',
                }}
              />
            </Box>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#9CA3AF', fontWeight: 600 }}>
                      <TableSortLabel
                        active={sortField === 'name'}
                        direction={sortField === 'name' ? sortOrder : 'asc'}
                        onClick={() => handleSort('name')}
                        sx={{
                          color: '#9CA3AF',
                          '&.Mui-active': {
                            color: '#A855F7',
                          },
                          '& .MuiTableSortLabel-icon': {
                            color: '#A855F7 !important',
                          },
                        }}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ color: '#9CA3AF', fontWeight: 600 }}>
                      <TableSortLabel
                        active={sortField === 'email'}
                        direction={sortField === 'email' ? sortOrder : 'asc'}
                        onClick={() => handleSort('email')}
                        sx={{
                          color: '#9CA3AF',
                          '&.Mui-active': {
                            color: '#A855F7',
                          },
                          '& .MuiTableSortLabel-icon': {
                            color: '#A855F7 !important',
                          },
                        }}
                      >
                        Email
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ color: '#9CA3AF', fontWeight: 600 }}>
                      <TableSortLabel
                        active={sortField === 'subscriptionStatus'}
                        direction={sortField === 'subscriptionStatus' ? sortOrder : 'asc'}
                        onClick={() => handleSort('subscriptionStatus')}
                        sx={{
                          color: '#9CA3AF',
                          '&.Mui-active': {
                            color: '#A855F7',
                          },
                          '& .MuiTableSortLabel-icon': {
                            color: '#A855F7 !important',
                          },
                        }}
                      >
                        Subscription Status
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center" sx={{ color: '#9CA3AF', fontWeight: 600 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                        <Typography variant="body2" sx={{ color: '#6B7280' }}>
                          No users found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        hover
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(124, 58, 237, 0.05)',
                          },
                        }}
                      >
                        <TableCell sx={{ color: '#FFFFFF' }}>{user.name}</TableCell>
                        <TableCell sx={{ color: '#9CA3AF' }}>{user.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.subscriptionStatus}
                            size="small"
                            sx={{
                              backgroundColor:
                                user.subscriptionStatus === 'Paid'
                                  ? 'rgba(34, 197, 94, 0.15)'
                                  : 'rgba(239, 68, 68, 0.15)',
                              color:
                                user.subscriptionStatus === 'Paid'
                                  ? '#22C55E'
                                  : '#EF4444',
                              fontWeight: 600,
                              border:
                                user.subscriptionStatus === 'Paid'
                                  ? '1px solid rgba(34, 197, 94, 0.3)'
                                  : '1px solid rgba(239, 68, 68, 0.3)',
                              boxShadow:
                                user.subscriptionStatus === 'Paid'
                                  ? '0 0 12px rgba(34, 197, 94, 0.2)'
                                  : '0 0 12px rgba(239, 68, 68, 0.2)',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() => handleView(user)}
                            aria-label="view"
                            sx={{
                              color: '#9CA3AF',
                              '&:hover': {
                                color: '#7C3AED',
                                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                              },
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(user)}
                            aria-label="edit"
                            sx={{
                              color: '#9CA3AF',
                              '&:hover': {
                                color: '#7C3AED',
                                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(user)}
                            aria-label="delete"
                            sx={{
                              color: '#9CA3AF',
                              '&:hover': {
                                color: '#EF4444',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={filteredUsers.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                sx={{
                  color: '#9CA3AF',
                  borderTop: '1px solid #1F2937',
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    color: '#9CA3AF',
                  },
                  '& .MuiIconButton-root': {
                    color: '#9CA3AF',
                    '&:hover': {
                      color: '#A855F7',
                      backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    },
                    '&.Mui-disabled': {
                      color: '#374151',
                    },
                  },
                  '& .MuiSelect-select': {
                    color: '#FFFFFF',
                  },
                }}
              />
            </>
          )}
        </TableContainer>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          sx: {
            background: '#111827',
            border: '1px solid #1F2937',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <DialogTitle
          id="delete-dialog-title"
          sx={{
            color: '#FFFFFF',
            fontWeight: 600,
            borderBottom: '1px solid #1F2937',
            pb: 2,
          }}
        >
          Delete User
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <DialogContentText
            id="delete-dialog-description"
            sx={{
              color: '#9CA3AF',
              '& strong': {
                color: '#FFFFFF',
                fontWeight: 600,
              },
            }}
          >
            Are you sure you want to delete <strong>{userToDelete?.name}</strong>? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #1F2937' }}>
          <Button
            onClick={handleDeleteCancel}
            sx={{
              color: '#9CA3AF',
              '&:hover': {
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                color: '#A855F7',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                boxShadow: '0 6px 20px 0 rgba(239, 68, 68, 0.4)',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
