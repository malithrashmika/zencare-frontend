import React, { useEffect, useState } from 'react'
import type { Appointment, AppointmentFormData, Patient, Doctor } from '../../types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { DialogFooter } from '../ui/dialog'

interface AppointmentFormProps {
  initialData?: Appointment
  onSubmit: (data: AppointmentFormData) => Promise<void>
  onCancel: () => void
  patients: Patient[]
  doctors: Doctor[]
}

export function AppointmentForm({
  initialData,
  onSubmit,
  onCancel,
  patients,
  doctors,
}: AppointmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientId: '',
    doctorId: '',
    dateTime: '',
    reason: '',
    notes: '',
  })
  // Filter active patients and doctors
  const activePatients = patients.filter((p: Patient) => p.status === 'Active')
  const activeDoctors = doctors.filter((d: Doctor) => d.status === 'Active')
  useEffect(() => {
    if (initialData) {
      // Convert ISO datetime to datetime-local format
      const localDateTime = initialData.dateTime.slice(0, 16)
      setFormData({
        patientId: initialData.patientId,
        doctorId: initialData.doctorId,
        dateTime: localDateTime,
        reason: initialData.reason,
        notes: initialData.notes || '',
      })
    }
  }, [initialData])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Convert datetime-local to ISO format
      const isoDateTime = new Date(formData.dateTime).toISOString()
      await onSubmit({
        ...formData,
        dateTime: isoDateTime,
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  // Disable form if appointment is completed
  const isCompleted = initialData?.status === 'Completed'
  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      {isCompleted && (
        <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
          This appointment is completed and cannot be edited.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="patient">Patient *</Label>
          <Select
            value={formData.patientId}
            onValueChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                patientId: val,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              {activePatients.map((patient: Patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name} - {patient.phone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="doctor">Doctor *</Label>
          <Select
            value={formData.doctorId}
            onValueChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                doctorId: val,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select doctor" />
            </SelectTrigger>
            <SelectContent>
              {activeDoctors.map((doctor: Doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </SelectItem>
              ))}
            </SelectContent>

          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="dateTime">Date & Time *</Label>
          <Input
            id="dateTime"
            type="datetime-local"
            required
            disabled={isCompleted}
            value={formData.dateTime}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dateTime: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="reason">Reason for Visit *</Label>
          <Textarea
            id="reason"
            required
            disabled={isCompleted}
            value={formData.reason}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                reason: e.target.value,
              }))
            }
            placeholder="Describe the reason for this appointment"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            disabled={isCompleted}
            value={formData.notes}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
            placeholder="Any additional information"
          />
        </div>
      </div>

      <DialogFooter className="pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || isCompleted}>
          {isSubmitting
            ? 'Saving...'
            : initialData
              ? 'Update Appointment'
              : 'Create Appointment'}
        </Button>
      </DialogFooter>
    </form>
  )
}
