# Admin Panel - User Management

A modern user management admin panel built with Next.js 14, TypeScript, and Material UI v5.

## Features

- 📊 User table with sorting and pagination
- 🔍 Search functionality (by name or email)
- 🏷️ Filter tabs (All Users, Paid Users, Unpaid Users)
- ✅ Color-coded subscription status (Green for Paid, Red for Unpaid)
- 🗑️ Delete user with confirmation modal
- 👁️ View and Edit user actions
- 📱 Fully responsive design
- 🎨 Material UI v5 components with custom theme

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
admin-sos/
├── app/
│   ├── api/
│   │   └── users/
│   │       └── route.ts      # API route for fetching users
│   ├── layout.tsx            # Root layout with theme provider
│   ├── page.tsx              # Main page
│   └── globals.css           # Global styles
├── components/
│   ├── AdminPanel.tsx        # Main admin panel component
│   └── ThemeProvider.tsx     # MUI theme provider
├── package.json
├── tsconfig.json
└── next.config.js
```

## API Routes

### GET `/api/users`

Fetches all users. Supports optional query parameter:
- `paid=true` - Returns only paid users
- `paid=false` - Returns only unpaid users

Example:
```
GET /api/users?paid=true
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Material UI v5** - UI component library
- **Emotion** - CSS-in-JS styling (required by MUI)

## Customization

You can customize the theme by editing `components/ThemeProvider.tsx`. The mock user data can be found in `app/api/users/route.ts`.

## License

MIT
