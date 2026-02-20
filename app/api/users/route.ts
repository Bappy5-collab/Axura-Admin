import { NextResponse } from 'next/server'

interface User {
  id: string
  name: string
  email: string
  subscriptionStatus: 'Paid' | 'Unpaid'
}

// Mock user data
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const paid = searchParams.get('paid')

  let filteredUsers = mockUsers

  // Filter by paid status if provided
  if (paid !== null) {
    const isPaid = paid === 'true'
    filteredUsers = mockUsers.filter(
      (user) => user.subscriptionStatus === (isPaid ? 'Paid' : 'Unpaid')
    )
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(filteredUsers)
}
