export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'

export const API_ENDPOINTS = {
  // Appointments
  APPOINTMENTS: '/appointments',
  APPOINTMENT_BY_ID: (id: string) => `/appointments/${id}`,
  
  // Doctors
  DOCTORS: '/doctors',
  DOCTOR_BY_ID: (id: string) => `/doctors/${id}`,
  
  // Patients
  PATIENTS: '/patients',
  PATIENT_BY_ID: (id: string) => `/patients/${id}`,
  
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
}