import type { Doctor, DoctorFormData, DoctorsFilters } from '../types'
import apiClient from '../api/apiclient'

const mapDoctor = (data: any): Doctor => ({
  ...data,
  id: data._id || data.id,
})

export const doctorsApi = {
  async getAll(filters?: DoctorsFilters): Promise<Doctor[]> {
    try {
      const params = new URLSearchParams()
      if (filters?.search) params.append('search', filters.search)
      if (filters?.specialization && filters.specialization !== 'all') params.append('specialization', filters.specialization)
      if (filters?.status && filters.status !== 'all') params.append('status', filters.status)

      const response = await apiClient.get<any[]>('/doctors', { params })
      return response.data.map(mapDoctor)
    } catch (error) {
      console.error('Failed to fetch doctors:', error)
      throw error
    }
  },

  async getById(id: string): Promise<Doctor | undefined> {
    try {
      const response = await apiClient.get<any>(`/doctors/${id}`)
      return mapDoctor(response.data)
    } catch (error) {
      console.error('Failed to fetch doctor:', error)
      throw error
    }
  },

  async create(data: DoctorFormData): Promise<Doctor> {
    try {
      const response = await apiClient.post<any>('/doctors', data)
      const doctorData = response.data.doctor || response.data
      return mapDoctor(doctorData)
    } catch (error) {
      console.error('Failed to create doctor:', error)
      throw error
    }
  },

  async update(id: string, data: DoctorFormData): Promise<Doctor> {
    try {
      const response = await apiClient.put<any>(`/doctors/${id}`, data)
      const doctorData = response.data.doctor || response.data
      return mapDoctor(doctorData)
    } catch (error) {
      console.error('Failed to update doctor:', error)
      throw error
    }
  },


  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/doctors/${id}`)
    } catch (error) {
      console.error('Failed to delete doctor:', error)
      throw error
    }
  },
}
