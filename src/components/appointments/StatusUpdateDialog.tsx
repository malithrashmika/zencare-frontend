import { useState } from 'react'
import type { Appointment } from '../../types'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

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
  const [selectedStatus, setSelectedStatus] = useState<Appointment['status']>(
    appointment.status,
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm(selectedStatus)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">New Status</label>
        <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as Appointment['status'])}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {allowedStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Status'}
        </Button>
      </div>
    </div>
  )
}
