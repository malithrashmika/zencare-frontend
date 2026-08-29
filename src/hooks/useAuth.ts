import { useState, useEffect } from 'react'
import type { User } from '../types'
import { authApi } from '../services/authApi'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authApi.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const logout = async () => {
    try {
      await authApi.logout()
      setUser(null)

      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return { user, loading, logout, isAuthenticated: !!user }
}
