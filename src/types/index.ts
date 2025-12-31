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
  dateOfBirth: string 
  age: number 
  gender: 'Male' | 'Female' | 'Other'
  address: string
  notes?: string
  status: 'Active' | 'Inactive'
  registrationDate: string 
  lastVisit?: string 
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
    patients: number 
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
