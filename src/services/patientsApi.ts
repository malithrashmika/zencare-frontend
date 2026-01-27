import type { Patient, PatientFormData, PatientsFilters } from '../types/index'
import apiClient from '../api/apiclient'

const mapPatient = (data: any): Patient => ({
  ...data,
  id: data._id || data.id,
  registrationDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'
})

export const patientsApi = {
  async getAll(filters?: PatientsFilters): Promise<Patient[]> {
    try {
      const params = new URLSearchParams()
      if (filters?.search) params.append('search', filters.search)
      if (filters?.gender && filters.gender !== 'all') params.append('gender', filters.gender)
      if (filters?.status && filters.status !== 'all') params.append('status', filters.status)

      const response = await apiClient.get<any[]>('/patients', { params })
      return response.data.map(mapPatient)
    } catch (error) {
      console.error('Failed to fetch patients:', error)
      throw error
    }
  },

  async getById(id: string): Promise<Patient | undefined> {
    try {
      const response = await apiClient.get<any>(`/patients/${id}`)
      return mapPatient(response.data)
    } catch (error) {
      console.error('Failed to fetch patient:', error)
      throw error
    }
  },

  async create(data: PatientFormData): Promise<Patient> {
    try {
      const response = await apiClient.post<any>('/patients/save', data)
      const patientData = response.data.patient || response.data
      return mapPatient(patientData)
    } catch (error) {
      console.error('Failed to create patient:', error)
      throw error
    }
  },

  async update(id: string, data: PatientFormData): Promise<Patient> {
    try {
      const response = await apiClient.put<any>(`/patients/${id}`, data)
      const patientData = response.data.patient || response.data
      return mapPatient(patientData)
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
