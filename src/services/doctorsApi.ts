import type { Doctor, DoctorFormData, DoctorsFilters } from '../types'
import { doctors as mockDoctors } from './mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// In-memory store for the session
let doctorsStore = [...mockDoctors]

export const doctorsApi = {
  async getAll(filters?: DoctorsFilters): Promise<Doctor[]> {
    await delay(600)

    let result = [...doctorsStore]

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        result = result.filter(
          (d) =>
            d.name.toLowerCase().includes(searchLower) ||
            d.phone.includes(filters.search!) ||
            d.email.toLowerCase().includes(searchLower) ||
            d.specialization.toLowerCase().includes(searchLower),
        )
      }

      if (filters.specialization && filters.specialization !== 'all') {
        result = result.filter(
          (d) => d.specialization === filters.specialization,
        )
      }

      if (filters.status && filters.status !== 'all') {
        result = result.filter((d) => d.status === filters.status)
      }
    }

    // Sort by creation date desc
    return result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  },

  async getById(id: string): Promise<Doctor | undefined> {
    await delay(400)
    return doctorsStore.find((d) => d.id === id)
  },

  async create(data: DoctorFormData): Promise<Doctor> {
    await delay(800)

    const newDoctor: Doctor = {
      id: `D${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(3, '0')}`,
      ...data,
      status: data.status || 'Active',
      createdAt: new Date().toISOString().split('T')[0],
    }

    doctorsStore = [newDoctor, ...doctorsStore]
    return newDoctor
  },

  async update(id: string, data: DoctorFormData): Promise<Doctor> {
    await delay(800)

    const index = doctorsStore.findIndex((d) => d.id === id)
    if (index === -1) throw new Error('Doctor not found')

    const updatedDoctor: Doctor = {
      ...doctorsStore[index],
      ...data,
    }

    doctorsStore[index] = updatedDoctor
    return updatedDoctor
  },

  async delete(id: string): Promise<void> {
    await delay(600)
    doctorsStore = doctorsStore.filter((d) => d.id !== id)
  },
}
