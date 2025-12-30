import { useState, useEffect } from 'react'
import type { User } from '../types'
import { currentUser } from '../services/mockData'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUser(currentUser)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return { user, loading }
}
