import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../state/auth'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/signin" state={{ from: location }} replace />
  return <>{children}</>
}

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/signin" state={{ from: location }} replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />
  return <>{children}</>
}

