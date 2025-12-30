import type { Appointment, DashboardStats, Doctor, User } from '../types'

export const currentUser: User = {
  id: 'u1',
  name: 'Dr. Sarah Wilson',
  email: 'sarah.wilson@clinic.com',
  role: 'admin',
  avatar:
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop',
}

export const stats: DashboardStats = {
  totalPatients: 1247,
  todayAppointments: 23,
  pendingBills: 12450,
  completedVisits: 18,
  activeDoctors: 8,
  trends: {
    patients: 12,
    appointments: 5,
    revenue: 8,
  },
}

export const recentAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'Emma Thompson',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Wilson',
    time: '09:00 AM',
    date: '2023-10-24',
    status: 'completed',
    type: 'General Checkup',
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'James Rodriguez',
    doctorId: 'd2',
    doctorName: 'Dr. Michael Chen',
    time: '09:30 AM',
    date: '2023-10-24',
    status: 'scheduled',
    type: 'Dental Cleaning',
  },
  {
    id: 'a3',
    patientId: 'p3',
    patientName: 'Sophia Martinez',
    doctorId: 'd3',
    doctorName: 'Dr. Emily Parker',
    time: '10:15 AM',
    date: '2023-10-24',
    status: 'pending',
    type: 'Consultation',
  },
  {
    id: 'a4',
    patientId: 'p4',
    patientName: 'William Turner',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Wilson',
    time: '11:00 AM',
    date: '2023-10-24',
    status: 'cancelled',
    type: 'Follow-up',
  },
  {
    id: 'a5',
    patientId: 'p5',
    patientName: 'Olivia Brown',
    doctorId: 'd2',
    doctorName: 'Dr. Michael Chen',
    time: '11:30 AM',
    date: '2023-10-24',
    status: 'scheduled',
    type: 'Root Canal',
  },
]

export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Wilson',
    specialty: 'General Medicine',
    status: 'Active',
    avatar:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'd2',
    name: 'Dr. Michael Chen',
    specialty: 'Dentistry',
    status: 'Active',
    avatar:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'd3',
    name: 'Dr. Emily Parker',
    specialty: 'Pediatrics',
    status: 'Active',
    avatar:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&auto=format&fit=crop',
  },
]
