import { useState, useEffect } from 'react'
import type { DashboardStats, Appointment } from '../types'
import { stats as mockStats, recentAppointments } from '../services/mockData'

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStats(mockStats)
      setAppointments(recentAppointments)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return { stats, appointments, loading }
}
