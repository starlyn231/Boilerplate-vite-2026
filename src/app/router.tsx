import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layout/app-layout'
import { HomePage } from '@/features/home'
import { DashboardPage } from '@/features/dashboard'
import { ProfilePage } from '@/features/profile'
import { ProtectedRoute } from '@/features/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
])
