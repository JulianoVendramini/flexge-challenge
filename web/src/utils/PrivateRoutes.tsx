import { Outlet, Navigate } from 'react-router-dom'

import { useAuth } from '../context/useAuth'

const PrivateRoutes = () => {
  const { user, loading } = useAuth()
  console.log('user', user)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default PrivateRoutes
