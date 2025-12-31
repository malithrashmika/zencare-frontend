import type { Patient, PatientFormData, PatientsFilters } from '../types/index'
import { patients as mockPatients } from './mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// In-memory store for the session
let patientsStore = [...mockPatients]

export const patientsApi = {
  async getAll(filters?: PatientsFilters): Promise<Patient[]> {
    await delay(600)

    let result = [...patientsStore]

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(searchLower) ||
            p.phone.includes(filters.search!) ||
            p.email.toLowerCase().includes(searchLower),
        )
      }

      if (filters.gender && filters.gender !== 'all') {
        result = result.filter((p) => p.gender === filters.gender)
      }

      if (filters.status && filters.status !== 'all') {
        result = result.filter((p) => p.status === filters.status)
      }
    }

    // Sort by registration date desc
    return result.sort(
      (a, b) =>
        new Date(b.registrationDate).getTime() -
        new Date(a.registrationDate).getTime(),
    )
  },

  async getById(id: string): Promise<Patient | undefined> {
    await delay(400)
    return patientsStore.find((p) => p.id === id)
  },

  async create(data: PatientFormData): Promise<Patient> {
    await delay(800)

    const newPatient: Patient = {
      id: `P${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(3, '0')}`,
      ...data,
      age: calculateAge(data.dateOfBirth),
      status: data.status || 'Active',
      registrationDate: new Date().toISOString().split('T')[0],
    }

    patientsStore = [newPatient, ...patientsStore]
    return newPatient
  },

  async update(id: string, data: PatientFormData): Promise<Patient> {
    await delay(800)

    const index = patientsStore.findIndex((p) => p.id === id)
    if (index === -1) throw new Error('Patient not found')

    const updatedPatient: Patient = {
      ...patientsStore[index],
      ...data,
      age: calculateAge(data.dateOfBirth),
    }

    patientsStore[index] = updatedPatient
    return updatedPatient
  },

  async delete(id: string): Promise<void> {
    await delay(600)
    patientsStore = patientsStore.filter((p) => p.id !== id)
  },
}

function calculateAge(dob: string): number {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
