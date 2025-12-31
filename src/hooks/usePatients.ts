import { useState, useEffect, useCallback } from 'react'
import type { Patient, PatientsFilters, PatientFormData } from '../types'
import { patientsApi } from '../services/patientsApi'
import { toast } from 'sonner'

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<PatientsFilters>({})

  const fetchPatients = useCallback(async () => {
    setLoading(true)
    try {
      const data = await patientsApi.getAll(filters)
      setPatients(data)
    } catch (error) {
      toast.error('Failed to fetch patients')
      throw error
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchPatients()
    }, 500)

    return () => clearTimeout(timer)
  }, [fetchPatients])

  const createPatient = async (data: PatientFormData) => {
    try {
      const newPatient = await patientsApi.create(data)
      setPatients((prev) => [newPatient, ...prev])
      toast.success('Patient created successfully')
      return newPatient
    } catch (error) {
      toast.error('Failed to create patient')
      throw error
    }
  }

  const updatePatient = async (id: string, data: PatientFormData) => {
    try {
      const updatedPatient = await patientsApi.update(id, data)
      setPatients((prev) => prev.map((p) => (p.id === id ? updatedPatient : p)))
      toast.success('Patient updated successfully')
      return updatedPatient
    } catch (error) {
      toast.error('Failed to update patient')
      throw error
    }
  }

  const deletePatient = async (id: string) => {
    try {
      await patientsApi.delete(id)
      setPatients((prev) => prev.filter((p) => p.id !== id))
      toast.success('Patient deleted successfully')
    } catch (error) {
      toast.error('Failed to delete patient')
      throw error
    }
  }

  return {
    patients,
    loading,
    filters,
    setFilters,
    createPatient,
    updatePatient,
    deletePatient,
    refresh: fetchPatients,
  }
}
