import type { Patient, PatientFormData, PatientsFilters } from '../types/index'
import apiClient from '../api/apiclient'

export const patientsApi = {
  async getAll(filters?: PatientsFilters): Promise<Patient[]> {
    try {
      const params = new URLSearchParams()
      if (filters?.search) params.append('search', filters.search)
      if (filters?.gender && filters.gender !== 'all') params.append('gender', filters.gender)
      if (filters?.status && filters.status !== 'all') params.append('status', filters.status)

      const response = await apiClient.get<Patient[]>('/patients', { params })
      return response.data
    } catch (error) {
      console.error('Failed to fetch patients:', error)
      throw error
    }
  },

  async getById(id: string): Promise<Patient | undefined> {
    try {
      const response = await apiClient.get<Patient>(`/patients/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch patient:', error)
      throw error
    }
  },

  async create(data: PatientFormData): Promise<Patient> {
    try {
      const response = await apiClient.post<Patient>('/patients', data)
      return response.data
    } catch (error) {
      console.error('Failed to create patient:', error)
      throw error
    }
  },

  async update(id: string, data: PatientFormData): Promise<Patient> {
    try {
      const response = await apiClient.put<Patient>(`/patients/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Failed to update patient:', error)
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/patients/${id}`)
    } catch (error) {
      console.error('Failed to delete patient:', error)
      throw error
    }
  },
}
