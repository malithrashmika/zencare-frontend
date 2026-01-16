import React, { useState } from 'react'
import type { Appointment } from '../../types'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Select, SelectItem } from '../ui/select'
import { DialogFooter } from '../ui/dialog'
interface StatusUpdateDialogProps {
  appointment: Appointment
  onConfirm: (status: Appointment['status']) => Promise<void>
  onCancel: () => void
  allowedStatuses: Appointment['status'][]
}
export function StatusUpdateDialog({
  appointment,
  onConfirm,
  onCancel,
  allowedStatuses,
}: StatusUpdateDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<Appointment['status']>(
    appointment.status,
  )
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedStatus === appointment.status) {
      onCancel()
      return
    }
    setIsSubmitting(true)
    try {
      await onConfirm(selectedStatus)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-4">
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Patient:</span>
              <span className="font-medium">{appointment.patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Doctor:</span>
              <span className="font-medium">{appointment.doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date & Time:</span>
              <span className="font-medium">
                {new Date(appointment.dateTime).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Current Status:</span>
              <span className="font-medium">{appointment.status}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">New Status *</Label>
          <Select
            value={selectedStatus}
            onValueChange={(val) =>
              setSelectedStatus(val as Appointment['status'])
            }
          >
            {allowedStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
          <strong>Note:</strong> This action will update the appointment status.
          Make sure the status change is accurate.
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
        <Button
          type="submit"
          disabled={isSubmitting || selectedStatus === appointment.status}
        >
          {isSubmitting ? 'Updating...' : 'Update Status'}
        </Button>
      </DialogFooter>
    </form>
  )
}
