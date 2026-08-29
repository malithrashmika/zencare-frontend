import type { Appointment } from '../../types'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  FileText,
  Phone,
} from 'lucide-react'
interface AppointmentViewProps {
  appointment: Appointment
  onClose: () => void
  onEdit: () => void
  onUpdateStatus: () => void
  canEdit: boolean
  canUpdateStatus: boolean
}
export function AppointmentView({
  appointment,
  onClose,
  onEdit,
  onUpdateStatus,
  canEdit,
  canUpdateStatus,
}: AppointmentViewProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'outline'
      case 'Completed':
        return 'secondary'
      case 'Cancelled':
        return 'destructive'
      case 'No-Show':
        return 'default'
      default:
        return 'secondary'
    }
  }
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
  }
  const { date, time } = formatDateTime(appointment.dateTime)
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Appointment Details
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
            <span>ID: {appointment.id}</span>
          </div>
        </div>
        <Badge variant={getStatusVariant(appointment.status)}>
          {appointment.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-slate-200 p-4">
          <h4 className="font-medium text-slate-900 flex items-center gap-2">
            <User className="h-4 w-4" /> Patient Information
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Name</span>
              <span className="font-medium">{appointment.patientName}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-slate-400" />
              <span>{appointment.patientPhone}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-slate-200 p-4">
          <h4 className="font-medium text-slate-900 flex items-center gap-2">
            <Stethoscope className="h-4 w-4" /> Doctor Information
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Name</span>
              <span className="font-medium">{appointment.doctorName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Specialization</span>
              <span className="font-medium">
                {appointment.doctorSpecialization}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 p-4 space-y-4">
        <h4 className="font-medium text-slate-900 flex items-center gap-2">
          <Calendar className="h-4 w-4" /> Appointment Schedule
        </h4>
        <div className="grid gap-3 text-sm md:grid-cols-2">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-slate-400" />
            <div>
              <div className="text-slate-500 text-xs">Date</div>
              <div className="font-medium">{date}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-slate-400" />
            <div>
              <div className="text-slate-500 text-xs">Time</div>
              <div className="font-medium">{time}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-slate-50 p-4">
        <h4 className="mb-2 font-medium text-slate-900 flex items-center gap-2">
          <FileText className="h-4 w-4" /> Reason for Visit
        </h4>
        <p className="text-sm text-slate-600">{appointment.reason}</p>
      </div>

      {appointment.notes && (
        <div className="rounded-lg bg-slate-50 p-4">
          <h4 className="mb-2 font-medium text-slate-900">Additional Notes</h4>
          <p className="text-sm text-slate-600">{appointment.notes}</p>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {canUpdateStatus && appointment.status === 'Scheduled' && (
          <Button variant="secondary" onClick={onUpdateStatus}>
            Update Status
          </Button>
        )}
        {canEdit && appointment.status !== 'Completed' && (
          <Button onClick={onEdit}>Edit Appointment</Button>
        )}
      </div>
    </div>
  )
}
