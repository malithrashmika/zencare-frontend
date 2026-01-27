import type { Appointment, AppointmentFormData, AppointmentsFilters } from '../types'
import apiClient from '../api/apiclient'

export const appointmentsApi = {
  async getAll(filters?: AppointmentsFilters): Promise<Appointment[]> {
    try {
      const params = new URLSearchParams()
      if (filters?.search) params.append('search', filters.search)
      if (filters?.status && filters.status !== 'all') params.append('status', filters.status)
      if (filters?.doctorId && filters.doctorId !== 'all') params.append('doctorId', filters.doctorId)
      if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
      if (filters?.dateTo) params.append('dateTo', filters.dateTo)

      const response = await apiClient.get<Appointment[]>('/appointments', { params })
      return response.data
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
      throw error
    }
  },

  async getById(id: string): Promise<Appointment | undefined> {
    try {
      const response = await apiClient.get<Appointment>(`/appointments/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch appointment:', error)
      throw error
    }
  },

  async create(data: AppointmentFormData): Promise<Appointment> {
    try {
      const response = await apiClient.post<Appointment>('/appointments', data)
      return response.data
    } catch (error) {
      console.error('Failed to create appointment:', error)
      throw error
    }
  },

  async update(id: string, data: AppointmentFormData): Promise<Appointment> {
    try {
      const response = await apiClient.put<Appointment>(`/appointments/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Failed to update appointment:', error)
      throw error
    }
  },

  async updateStatus(
    id: string,
    status: Appointment['status'],
  ): Promise<Appointment> {
    try {
      const response = await apiClient.patch<Appointment>(`/appointments/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Failed to update appointment status:', error)
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/appointments/${id}`)
    } catch (error) {
      console.error('Failed to delete appointment:', error)
      throw error
    }
  },

  // Helper to check for overlapping appointments
  async checkOverlap(
    doctorId: string,
    dateTime: string,
    excludeId?: string,
  ): Promise<boolean> {
    try {
      const params = new URLSearchParams()
      params.append('doctorId', doctorId)
      params.append('dateTime', dateTime)
      if (excludeId) params.append('excludeId', excludeId)

      const response = await apiClient.get<{ hasOverlap: boolean }>('/appointments/check-overlap', { params })
      return response.data.hasOverlap
    } catch (error) {
      console.error('Failed to check appointment overlap:', error)
      return false
    }
  },
}
