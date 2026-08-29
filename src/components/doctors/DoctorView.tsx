import type { Doctor } from '../../types'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
    Mail,
    Phone,
    Stethoscope,
    DollarSign,
    User,
} from 'lucide-react'
interface DoctorViewProps {
    doctor: Doctor
    onClose: () => void
    onEdit: () => void
    canEdit: boolean
}
export function DoctorView({
    doctor,
    onClose,
    onEdit,
    canEdit,
}: DoctorViewProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>
                            {doctor.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>ID: {doctor.id}</span>
                            <span>•</span>
                            <span>{doctor.specialization}</span>
                        </div>
                    </div>
                </div>
                <Badge
                    variant={doctor.status === 'Active' ? 'default' : 'secondary'
                    }
                >
                    {doctor.status}
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
                            <span>{doctor.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-slate-400" />
                            <span>{doctor.email}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 rounded-lg border border-slate-200 p-4">
                    <h4 className="font-medium text-slate-900 flex items-center gap-2">
                        <Stethoscope className="h-4 w-4" /> Professional Details
                    </h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-500">Specialization</span>
                            <span className="font-medium">{doctor.specialization}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-500">Channel Fee</span>
                            <span className="font-medium flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {doctor.channelFee.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-500">Joined</span>
                            <span className="font-medium">{doctor.createdAt}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button variant="outline" onClick={onClose}>
                    Close
                </Button>
                {canEdit && <Button onClick={onEdit}>Edit Doctor</Button>}
            </div>
        </div>
    )
}
