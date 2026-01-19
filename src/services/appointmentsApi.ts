import type { Appointment, AppointmentFormData, AppointmentsFilters } from '../types'
import { recentAppointments as mockAppointments } from './mockData'
import { patients } from './mockData'
import { doctors } from './mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// In-memory store for the session
let appointmentsStore = [...mockAppointments]

export const appointmentsApi = {
  async getAll(filters?: AppointmentsFilters): Promise<Appointment[]> {
    await delay(600)

    let result = [...appointmentsStore]

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        result = result.filter(
          (a) =>
            a.patientName.toLowerCase().includes(searchLower) ||
            a.patientPhone.includes(filters.search!),
        )
      }

      if (filters.status && filters.status !== 'all') {
        result = result.filter((a) => a.status === filters.status)
      }

      if (filters.doctorId && filters.doctorId !== 'all') {
        result = result.filter((a) => a.doctorId === filters.doctorId)
      }

      if (filters.dateFrom) {
        result = result.filter(
          (a) => new Date(a.dateTime) >= new Date(filters.dateFrom!),
        )
      }

      if (filters.dateTo) {
        result = result.filter(
          (a) => new Date(a.dateTime) <= new Date(filters.dateTo!),
        )
      }
    }

    // Sort by dateTime desc
    return result.sort(
      (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
    )
  },

  async getById(id: string): Promise<Appointment | undefined> {
    await delay(400)
    return appointmentsStore.find((a) => a.id === id)
  },

  async create(data: AppointmentFormData): Promise<Appointment> {
    await delay(800)

    // Get patient and doctor details
    const patient = patients.find((p) => p.id === data.patientId)
    const doctor = doctors.find((d) => d.id === data.doctorId)

    if (!patient || !doctor) {
      throw new Error('Patient or Doctor not found')
    }

    const newAppointment: Appointment = {
      id: `A${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(3, '0')}`,
      patientId: data.patientId,
      patientName: patient.name,
      patientPhone: patient.phone,
      doctorId: data.doctorId,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      dateTime: data.dateTime,
      reason: data.reason,
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
      notes: data.notes,
      date: undefined,
      time: undefined,
      type: undefined
    }

    appointmentsStore = [newAppointment, ...appointmentsStore]
    return newAppointment
  },

  async update(id: string, data: AppointmentFormData): Promise<Appointment> {
    await delay(800)

    const index = appointmentsStore.findIndex((a) => a.id === id)
    if (index === -1) throw new Error('Appointment not found')

    // Get patient and doctor details
    const patient = patients.find((p) => p.id === data.patientId)
    const doctor = doctors.find((d) => d.id === data.doctorId)

    if (!patient || !doctor) {
      throw new Error('Patient or Doctor not found')
    }

    const updatedAppointment: Appointment = {
      ...appointmentsStore[index],
      patientId: data.patientId,
      patientName: patient.name,
      patientPhone: patient.phone,
      doctorId: data.doctorId,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      dateTime: data.dateTime,
      reason: data.reason,
      notes: data.notes,
    }

    appointmentsStore[index] = updatedAppointment
    return updatedAppointment
  },

  async updateStatus(
    id: string,
    status: Appointment['status'],
  ): Promise<Appointment> {
    await delay(600)

    const index = appointmentsStore.findIndex((a) => a.id === id)
    if (index === -1) throw new Error('Appointment not found')

    const updatedAppointment: Appointment = {
      ...appointmentsStore[index],
      status,
    }

    appointmentsStore[index] = updatedAppointment
    return updatedAppointment
  },

  async delete(id: string): Promise<void> {
    await delay(600)
    appointmentsStore = appointmentsStore.filter((a) => a.id !== id)
  },

  // Helper to check for overlapping appointments
  checkOverlap(
    doctorId: string,
    dateTime: string,
    excludeId?: string,
  ): boolean {
    const appointmentTime = new Date(dateTime)
    const overlapping = appointmentsStore.find((a) => {
      if (a.id === excludeId) return false
      if (a.doctorId !== doctorId) return false
      if (a.status === 'Cancelled' || a.status === 'No-Show') return false

      const existingTime = new Date(a.dateTime)
      const timeDiff = Math.abs(
        appointmentTime.getTime() - existingTime.getTime(),
      )
      return timeDiff < 30 * 60 * 1000 // 30 minutes
    })

    return !!overlapping
  },
}
