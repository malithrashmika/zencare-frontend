
import type { Doctor } from '../../types'
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
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react'
interface DoctorsTableProps {
    doctors: Doctor[]
    onView: (doctor: Doctor) => void
    onEdit: (doctor: Doctor) => void
    onDelete: (doctor: Doctor) => void
    canManage: boolean
}
export function DoctorsTable({
    doctors,
    onView,
    onEdit,
    onDelete,
    canManage,
}: DoctorsTableProps) {
    if (doctors.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
                <div className="text-center">
                    <p className="text-lg font-medium text-slate-900">No doctors found</p>
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
                        <TableHead>Doctor</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead className="hidden md:table-cell">Channel Fee</TableHead>
                        <TableHead className="hidden lg:table-cell">Phone</TableHead>
                        <TableHead className="hidden xl:table-cell">Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doctors.map((doctor) => (
                        <TableRow key={doctor.id} className="group">
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>
                                            {doctor.name ? doctor.name.slice(0, 2).toUpperCase() : 'DR'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{doctor.name}</div>
                                        <div className="text-xs text-slate-500">
                                            ID: {doctor.id}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{doctor.specialization}</TableCell>
                            <TableCell className="hidden md:table-cell">
                                ${doctor.channelFee.toFixed(2)}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                                {doctor.phone}
                            </TableCell>
                            <TableCell className="hidden xl:table-cell">
                                {doctor.email}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={doctor.status === 'Active' ? 'default' : 'secondary'
                                    }
                                >
                                    {doctor.status}
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
                                        <DropdownMenuItem onClick={() => onView(doctor)}>
                                            <Eye className="mr-2 h-4 w-4" /> View Details
                                        </DropdownMenuItem>
                                        {canManage && (
                                            <>
                                                <DropdownMenuItem onClick={() => onEdit(doctor)}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit Doctor
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => onDelete(doctor)}
                                                    className="text-red-600 focus:text-red-600"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
