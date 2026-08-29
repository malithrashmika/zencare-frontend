import { useState, useEffect } from 'react'
import type { DashboardStats, Appointment } from '../types'
import { dashboardApi } from '../services/dashboardApi'
import { appointmentsApi } from '../services/appointmentsApi'

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, appointmentsData] = await Promise.all([
          dashboardApi.getStats(),
          appointmentsApi.getAll()
        ])
        setStats(statsData)
        setAppointments(appointmentsData.slice(0, 5))
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { stats, appointments, loading }
}
