import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { StatusBadge } from './StatusBadge'
import type { Appointment } from '../../types'
import { MoreHorizontal } from 'lucide-react'
interface RecentAppointmentsTableProps {
  appointments: Appointment[]
}
export function RecentAppointmentsTable({
  appointments,
}: RecentAppointmentsTableProps) {
  return (
    <div className="rounded-md border border-slate-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{appointment.patientName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{appointment.patientName}</div>
                    <div className="text-xs text-slate-500">
                      ID: {appointment.patientId}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{appointment.doctorName}</TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{appointment.date}</span>
                  <span className="text-xs text-slate-500">
                    {appointment.time}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={appointment.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
