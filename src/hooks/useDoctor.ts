import { useState, useEffect, useCallback } from 'react'
import type { Doctor, DoctorsFilters, DoctorFormData } from '../types'
import { doctorsApi } from '../services/doctorsApi'
import { toast } from 'sonner'

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<DoctorsFilters>({})

  const fetchDoctors = useCallback(async () => {
    setLoading(true)
    try {
      const data = await doctorsApi.getAll(filters)
      setDoctors(data)
    } catch (error) {
      toast.error('Failed to fetch doctors')
        throw error
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchDoctors()
    }, 500)

    return () => clearTimeout(timer)
  }, [fetchDoctors])

  const createDoctor = async (data: DoctorFormData) => {
    try {
      const newDoctor = await doctorsApi.create(data)
      setDoctors((prev) => [newDoctor, ...prev])
      toast.success('Doctor added successfully')
      return newDoctor
    } catch (error) {
      toast.error('Failed to add doctor')
      throw error
    }
  }

  const updateDoctor = async (id: string, data: DoctorFormData) => {
    try {
      const updatedDoctor = await doctorsApi.update(id, data)
      setDoctors((prev) => prev.map((d) => (d.id === id ? updatedDoctor : d)))
      toast.success('Doctor updated successfully')
      return updatedDoctor
    } catch (error) {
      toast.error('Failed to update doctor')
      throw error
    }
  }

  const deleteDoctor = async (id: string) => {
    try {
      await doctorsApi.delete(id)
      setDoctors((prev) => prev.filter((d) => d.id !== id))
      toast.success('Doctor deleted successfully')
    } catch (error) {
      toast.error('Failed to delete doctor')
      throw error
    }
  }

  return {
    doctors,
    loading,
    filters,
    setFilters,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    refresh: fetchDoctors,
  }
}
