import type { Appointment, AppointmentFormData, AppointmentsFilters } from '../types'
import apiClient from '../api/apiclient'

const mapAppointment = (data: any): Appointment => ({
  ...data,
  id: data._id || data.id,
  patientId: data.patient?._id || data.patient?.id || data.patientId,
  patientName: data.patient?.name || 'Unknown Patient',
  patientPhone: data.patient?.phone || 'N/A',
  doctorId: data.doctor?._id || data.doctor?.id || data.doctorId,
  doctorName: data.doctor?.name || 'Unknown Doctor',
  doctorSpecialization: data.doctor?.specialization || 'N/A',
  dateTime: data.date || data.dateTime || new Date().toISOString(),
})

export const appointmentsApi = {
  async getAll(filters?: AppointmentsFilters): Promise<Appointment[]> {
    try {
      const params = new URLSearchParams()
      if (filters?.search) params.append('search', filters.search)
      if (filters?.status && filters.status !== 'all') params.append('status', filters.status)
      if (filters?.doctorId && filters.doctorId !== 'all') params.append('doctorId', filters.doctorId)
      if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
      if (filters?.dateTo) params.append('dateTo', filters.dateTo)

      const response = await apiClient.get<any[]>('/appointments', { params })
      return response.data.map(mapAppointment)
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
      throw error
    }
  },

  async getById(id: string): Promise<Appointment | undefined> {
    try {
      const response = await apiClient.get<any>(`/appointments/${id}`)
      return mapAppointment(response.data)
    } catch (error) {
      console.error('Failed to fetch appointment:', error)
      throw error
    }
  },

  async create(data: AppointmentFormData): Promise<Appointment> {
    try {
      const response = await apiClient.post<any>('/appointments/save', data)

      const appointmentData = response.data.appointment || response.data
      return mapAppointment(appointmentData)
    } catch (error) {
      console.error('Failed to create appointment:', error)
      throw error
    }
  },

  async update(id: string, data: AppointmentFormData): Promise<Appointment> {
    try {
      const response = await apiClient.put<any>(`/appointments/${id}`, data)
      const appointmentData = response.data.appointment || response.data
      return mapAppointment(appointmentData)
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
      const response = await apiClient.patch<any>(`/appointments/${id}/status`, { status })
      const appointmentData = response.data.appointment || response.data
      return mapAppointment(appointmentData)
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
