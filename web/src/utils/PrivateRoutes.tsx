import { Outlet, Navigate } from 'react-router-dom'

import { useAuth } from '../context/useAuth'

const PrivateRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default PrivateRoutes
