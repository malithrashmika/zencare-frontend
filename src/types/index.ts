import type { ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'doctor' | 'receptionist'
  avatar?: string
}

export interface Patient {
  id: string
  name: string
  phone: string
  email: string
  dateOfBirth: string // ISO date string YYYY-MM-DD
  age: number // calculated from DOB
  gender: 'Male' | 'Female' | 'Other'
  address: string
  notes?: string
  status: 'Active' | 'Inactive'
  registrationDate: string // ISO date string
  lastVisit?: string // ISO date string
}

export interface PatientFormData {
  name: string
  phone: string
  email: string
  dateOfBirth: string
  gender: 'Male' | 'Female' | 'Other'
  address: string
  notes?: string
  status?: 'Active' | 'Inactive'
}

export interface PatientsFilters {
  search?: string
  gender?: string
  status?: string
}

export interface Doctor {
  id: string
  name: string
  specialization: string
  phone: string
  email: string
  channelFee: number
  status: 'Active' | 'On Leave'
  avatar?: string
  createdAt: string // ISO date string
}

export interface DoctorFormData {
  name: string
  specialization: string
  phone: string
  email: string
  channelFee: number
  status?: 'Active' | 'On Leave'
}

export interface DoctorsFilters {
  search?: string
  specialization?: string
  status?: string
}

export interface Appointment {
  date: ReactNode
  time: ReactNode
  type: ReactNode
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  doctorId: string
  doctorName: string
  doctorSpecialization: string
  dateTime: string // ISO datetime string
  reason: string
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show'
  createdAt: string // ISO datetime string
  notes?: string
}

export interface AppointmentFormData {
  patientId: string
  doctorId: string
  dateTime: string
  reason: string
  notes?: string
}

export interface AppointmentsFilters {
  search?: string
  status?: string
  doctorId?: string
  dateFrom?: string
  dateTo?: string
}

export interface DashboardStats {
  totalPatients: number
  todayAppointments: number
  pendingBills: number
  completedVisits: number
  activeDoctors: number
  trends: {
    patients: number // percentage
    appointments: number
    revenue: number
  }
}

export type NavItem = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  variant: 'default' | 'ghost'
}
