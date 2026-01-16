
import type { Appointment } from '../../types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { MoreHorizontal, Eye, Pencil, Trash2, CheckCircle } from 'lucide-react'
interface AppointmentsTableProps {
  appointments: Appointment[]
  onView: (appointment: Appointment) => void
  onEdit: (appointment: Appointment) => void
  onDelete: (appointment: Appointment) => void
  onUpdateStatus: (appointment: Appointment) => void
  canEdit: boolean
  canDelete: boolean
  canUpdateStatus: boolean
}
export function AppointmentsTable({
  appointments,
  onView,
  onEdit,
  onDelete,
  onUpdateStatus,
  canEdit,
  canDelete,
  canUpdateStatus,
}: AppointmentsTableProps) {
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
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
  }
  if (appointments.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
        <div className="text-center">
          <p className="text-lg font-medium text-slate-900">
            No appointments found
          </p>
          <p className="text-sm text-slate-500">
            Try adjusting your search or filters.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-md border border-slate-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead className="hidden md:table-cell">Doctor</TableHead>
            <TableHead className="hidden lg:table-cell">Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => {
            const { date, time } = formatDateTime(appointment.dateTime)
            return (
              <TableRow key={appointment.id} className="group">
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span className="text-sm">{date}</span>
                    <span className="text-xs text-slate-500">{time}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {appointment.patientName}
                    </span>
                    <span className="text-xs text-slate-500">
                      {appointment.patientPhone}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {appointment.doctorName}
                    </span>
                    <span className="text-xs text-slate-500">
                      {appointment.doctorSpecialization}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="text-sm">{appointment.reason}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(appointment)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      {canUpdateStatus &&
                        appointment.status === 'Scheduled' && (
                          <DropdownMenuItem
                            onClick={() => onUpdateStatus(appointment)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" /> Update
                            Status
                          </DropdownMenuItem>
                        )}
                      {canEdit && appointment.status !== 'Completed' && (
                        <DropdownMenuItem onClick={() => onEdit(appointment)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit Appointment
                        </DropdownMenuItem>
                      )}
                      {canDelete && (
                        <DropdownMenuItem
                          onClick={() => onDelete(appointment)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
