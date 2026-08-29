import type{ Patient } from '../../types'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Avatar } from '../ui/avatar'
import {  Mail, Phone, MapPin, Clock, User } from 'lucide-react'
interface PatientViewProps {
  patient: Patient
  onClose: () => void
  onEdit: () => void
}
export function PatientView({ patient, onClose, onEdit }: PatientViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 text-xl">
            {patient.name.slice(0, 2).toUpperCase()}
          </Avatar>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{patient.name}</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>ID: {patient.id}</span>
              <span>•</span>
              <span>{patient.age} years old</span>
              <span>•</span>
              <span>{patient.gender}</span>
            </div>
          </div>
        </div>
        <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'}>
           {patient.status}
         </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-slate-200 p-4">
          <h4 className="font-medium text-slate-900 flex items-center gap-2">
            <User className="h-4 w-4" /> Contact Information
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-slate-400" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-slate-400" />
              <span>{patient.email}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
              <span>{patient.address}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-slate-200 p-4">
          <h4 className="font-medium text-slate-900 flex items-center gap-2">
            <Clock className="h-4 w-4" /> Medical History
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Last Visit</span>
              <span className="font-medium">
                {patient.lastVisit || 'Never'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Registered</span>
              <span className="font-medium">{patient.registrationDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Date of Birth</span>
              <span className="font-medium">{patient.dateOfBirth}</span>
            </div>
          </div>
        </div>
      </div>

      {patient.notes && (
        <div className="rounded-lg bg-slate-50 p-4">
          <h4 className="mb-2 font-medium text-slate-900">Notes</h4>
          <p className="text-sm text-slate-600">{patient.notes}</p>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={onEdit}>Edit Patient</Button>
      </div>
    </div>
  )
}
