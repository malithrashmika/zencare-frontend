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
  age: number
  phone: string
  email: string
  lastVisit: string
  gender: 'Male' | 'Female' | 'Other'
  status: 'Active' | 'Inactive'
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  avatar?: string
  status: 'Active' | 'On Leave'
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  time: string
  date: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending'
  type: string
  notes?: string
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
