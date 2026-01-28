import { useState, useEffect, useCallback } from 'react'
import type { Appointment, AppointmentsFilters, AppointmentFormData } from '../types'
import { appointmentsApi } from '../services/appointmentsApi'
import { toast } from 'sonner'

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<AppointmentsFilters>({})

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    try {
      const data = await appointmentsApi.getAll(filters)
      setAppointments(data)
    } catch (error) {
      toast.error('Failed to fetch appointments')
        throw error
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchAppointments()
    }, 500)

    return () => clearTimeout(timer)
  }, [fetchAppointments])

  const createAppointment = async (data: AppointmentFormData) => {
    try {
      // Check for overlapping appointments
      const hasOverlap = await appointmentsApi.checkOverlap(
        data.doctorId,
        data.dateTime,
      )
      if (hasOverlap) {
        toast.info('Doctor has another appointment within 30 minutes of this time')
      }

      const newAppointment = await appointmentsApi.create(data)
      setAppointments((prev) => [newAppointment, ...prev])
      toast.success('Appointment created successfully')
      return newAppointment
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create appointment'
      toast.error(message)
      throw error
    }
  }

  const updateAppointment = async (id: string, data: AppointmentFormData) => {
    try {
      // Check for overlapping appointments
      const hasOverlap = await appointmentsApi.checkOverlap(
        data.doctorId,
        data.dateTime,
        id,
      )
      if (hasOverlap) {
        toast.info('Doctor has another appointment within 30 minutes of this time')
      }

      const updatedAppointment = await appointmentsApi.update(id, data)
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? updatedAppointment : a)),
      )
      toast.success('Appointment updated successfully')
      return updatedAppointment
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update appointment'
      toast.error(message)
      throw error
    }
  }

  const updateStatus = async (id: string, status: Appointment['status']) => {
    try {
      const updatedAppointment = await appointmentsApi.updateStatus(id, status)
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? updatedAppointment : a)),
      )
      toast.success(`Appointment marked as ${status}`)
      return updatedAppointment
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update appointment status'
      toast.error(message)
      throw error
    }
  }

  const deleteAppointment = async (id: string) => {
    try {
      await appointmentsApi.delete(id)
      setAppointments((prev) => prev.filter((a) => a.id !== id))
      toast.success('Appointment deleted successfully')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete appointment'
      toast.error(message)
      throw error
    }
  }

  return {
    appointments,
    loading,
    filters,
    setFilters,
    createAppointment,
    updateAppointment,
    updateStatus,
    deleteAppointment,
    refresh: fetchAppointments,
  }
}

