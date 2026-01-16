import { useState, useEffect, useCallback } from 'react'
import type { Appointment, AppointmentsFilters, AppointmentFormData } from '../types'
import { appointmentsApi } from '../services/appointmentsApi'
import { toast } from 'sonner'

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<AppointmentsFilters>({})
  const { addToast } = useToast()

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    try {
      const data = await appointmentsApi.getAll(filters)
      setAppointments(data)
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'Failed to fetch appointments',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [filters, addToast])

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
      const hasOverlap = appointmentsApi.checkOverlap(
        data.doctorId,
        data.dateTime,
      )
      if (hasOverlap) {
        addToast({
          title: 'Warning',
          description:
            'Doctor has another appointment within 30 minutes of this time',
          type: 'info',
        })
      }

      const newAppointment = await appointmentsApi.create(data)
      setAppointments((prev) => [newAppointment, ...prev])
      addToast({
        title: 'Success',
        description: 'Appointment created successfully',
        type: 'success',
      })
      return newAppointment
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'Failed to create appointment',
        type: 'error',
      })
      throw error
    }
  }

  const updateAppointment = async (id: string, data: AppointmentFormData) => {
    try {
      // Check for overlapping appointments
      const hasOverlap = appointmentsApi.checkOverlap(
        data.doctorId,
        data.dateTime,
        id,
      )
      if (hasOverlap) {
        addToast({
          title: 'Warning',
          description:
            'Doctor has another appointment within 30 minutes of this time',
          type: 'info',
        })
      }

      const updatedAppointment = await appointmentsApi.update(id, data)
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? updatedAppointment : a)),
      )
      addToast({
        title: 'Success',
        description: 'Appointment updated successfully',
        type: 'success',
      })
      return updatedAppointment
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'Failed to update appointment',
        type: 'error',
      })
      throw error
    }
  }

  const updateStatus = async (id: string, status: Appointment['status']) => {
    try {
      const updatedAppointment = await appointmentsApi.updateStatus(id, status)
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? updatedAppointment : a)),
      )
      addToast({
        title: 'Success',
        description: `Appointment marked as ${status}`,
        type: 'success',
      })
      return updatedAppointment
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'Failed to update appointment status',
        type: 'error',
      })
      throw error
    }
  }

  const deleteAppointment = async (id: string) => {
    try {
      await appointmentsApi.delete(id)
      setAppointments((prev) => prev.filter((a) => a.id !== id))
      addToast({
        title: 'Success',
        description: 'Appointment deleted successfully',
        type: 'success',
      })
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'Failed to delete appointment',
        type: 'error',
      })
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
