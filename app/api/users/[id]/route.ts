import { NextResponse } from 'next/server'

interface User {
  id: string
  name: string
  email: string
  subscriptionStatus: 'Paid' | 'Unpaid'
}

// Mock user data (same as in users/route.ts)
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    subscriptionStatus: 'Paid',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    subscriptionStatus: 'Unpaid',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    subscriptionStatus: 'Paid',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    subscriptionStatus: 'Unpaid',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    subscriptionStatus: 'Paid',
  },
  {
    id: '6',
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    subscriptionStatus: 'Unpaid',
  },
  {
    id: '7',
    name: 'Edward Norton',
    email: 'edward.norton@example.com',
    subscriptionStatus: 'Paid',
  },
  {
    id: '8',
    name: 'Fiona Apple',
    email: 'fiona.apple@example.com',
    subscriptionStatus: 'Unpaid',
  },
  {
    id: '9',
    name: 'George Clooney',
    email: 'george.clooney@example.com',
    subscriptionStatus: 'Paid',
  },
  {
    id: '10',
    name: 'Helen Mirren',
    email: 'helen.mirren@example.com',
    subscriptionStatus: 'Unpaid',
  },
  {
    id: '11',
    name: 'Ian McKellen',
    email: 'ian.mckellen@example.com',
    subscriptionStatus: 'Paid',
  },
  {
    id: '12',
    name: 'Julia Roberts',
    email: 'julia.roberts@example.com',
    subscriptionStatus: 'Unpaid',
  },
]

// GET single user by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const user = mockUsers.find((u) => u.id === id)

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(user)
}

// PUT update user
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const body = await request.json()

  const userIndex = mockUsers.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Update user (in a real app, this would update the database)
  const updatedUser: User = {
    ...mockUsers[userIndex],
    ...body,
    id, // Ensure ID doesn't change
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(updatedUser)
}
