import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useAppointments } from '../hooks/useAppointments'
import { useAuth } from '../hooks/useAuth'
import type { Appointment, AppointmentFormData} from '../types'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '../components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../components/ui/dialog'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '../components/ui/alert-dialog'
import { AppointmentsTable } from '../components/appointments/AppointmentsTable'
import { AppointmentForm } from '../components/appointments/AppointmentForm'
import { AppointmentView } from '../components/appointments/AppointmentView'
import { StatusUpdateDialog } from '../components/appointments/StatusUpdateDialog'
import { Toaster } from 'sonner'
import { useDoctors } from '@/hooks/useDoctor'

export function Appointments() {
  return <>
    <AppointmentsContent />
    <Toaster />
  </>
}
function AppointmentsContent() {
  const { user } = useAuth()
  const {
    appointments,
    loading,
    filters,
    setFilters,
    createAppointment,
    updateAppointment,
    updateStatus,
    deleteAppointment,
  } = useAppointments()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null)
  const [viewMode, setViewMode] = useState<'view' | 'edit' | 'status' | null>(
    null,
  )
  const [deleteId, setDeleteId] = useState<string | null>(null)
  // Role-based permissions
  const isAdmin = user?.role === 'admin'
  const isReceptionist = user?.role === 'receptionist'
  const isDoctor = user?.role === 'doctor'
  const canCreate = isAdmin || isReceptionist
  const canEdit = isAdmin || isReceptionist
  const canDelete = isAdmin
  const canUpdateStatus = isAdmin || isDoctor
  // Filter appointments for doctors (only show their own)
  const filteredAppointments = isDoctor
    ? appointments.filter((a) => a.doctorId === user?.id)
    : appointments
  const handleCreate = async (data: AppointmentFormData) => {
    await createAppointment(data)
    setIsAddOpen(false)
  }
  const handleUpdate = async (data: AppointmentFormData) => {
    if (selectedAppointment) {
      await updateAppointment(selectedAppointment.id, data)
      setViewMode(null)
      setSelectedAppointment(null)
    }
  }
  const handleStatusUpdate = async (status: Appointment['status']) => {
    if (selectedAppointment) {
      await updateStatus(selectedAppointment.id, status)
      setViewMode(null)
      setSelectedAppointment(null)
    }
  }
  const handleDelete = async () => {
    if (deleteId) {
      await deleteAppointment(deleteId)
      setDeleteId(null)
    }
  }
  // Get allowed status transitions based on role
  const getAllowedStatuses = (
    currentStatus: string,
  ): Appointment['status'][] => {
    if (currentStatus !== 'Scheduled')
      return [currentStatus as Appointment['status']]
    if (isAdmin) {
      return ['Scheduled', 'Completed', 'Cancelled', 'No-Show']
    } else if (isDoctor) {
      return ['Scheduled', 'Completed', 'No-Show']
    } else if (isReceptionist) {
      return ['Scheduled', 'Cancelled']
    }
    return ['Scheduled']
  }
  const { doctors } = useDoctors()   
  // Get active doctors for filter
  const activeDoctors = doctors.filter((d) => d.status === 'Active')
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Appointments
          </h2>
          <p className="text-slate-500">
            Manage patient appointments and schedules.
          </p>
        </div>
        {canCreate && (
          <Button onClick={() => setIsAddOpen(true)} className="sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> New Appointment
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search by patient name or phone..."
              className="pl-9"
              value={filters.search || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="w-35">
              <Select
                value={filters.status || 'all'}
                onValueChange={(val) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: val === 'all' ? undefined : val,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="No-Show">No-Show</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!isDoctor && (
              <div className="w-45">
                <Select
                  value={filters.doctorId || 'all'}
                  onValueChange={(val) =>
                    setFilters((prev) => ({
                      ...prev,
                      doctorId: val === 'all' ? undefined : val,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Doctors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Doctors</SelectItem>
                    {activeDoctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            type="date"
            placeholder="From date"
            className="w-40"
            value={filters.dateFrom || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                dateFrom: e.target.value,
              }))
            }
          />
          <Input
            type="date"
            placeholder="To date"
            className="w-40"
            value={filters.dateTo || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                dateTo: e.target.value,
              }))
            }
          />
          {(filters.dateFrom || filters.dateTo) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  dateFrom: undefined,
                  dateTo: undefined,
                }))
              }
            >
              Clear Dates
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : (
        <AppointmentsTable
          appointments={filteredAppointments}
          onView={(a) => {
            setSelectedAppointment(a)
            setViewMode('view')
          }}
          onEdit={(a) => {
            setSelectedAppointment(a)
            setViewMode('edit')
          }}
          onDelete={(a) => setDeleteId(a.id)}
          onUpdateStatus={(a) => {
            setSelectedAppointment(a)
            setViewMode('status')
          }}
          canEdit={canEdit}
          canDelete={canDelete}
          canUpdateStatus={canUpdateStatus}
        />
      )}

      {/* Add Appointment Dialog */}
      {canCreate && (
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="sm:max-w-150">
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
              <DialogDescription>
                Schedule a new appointment for a patient with a doctor.
              </DialogDescription>
              <DialogClose onClick={() => setIsAddOpen(false)} />
            </DialogHeader>
            <AppointmentForm
              onSubmit={handleCreate}
              onCancel={() => setIsAddOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* View/Edit Appointment Dialog */}
      <Dialog
        open={!!selectedAppointment && viewMode !== 'status'}
        onOpenChange={(open) => !open && setSelectedAppointment(null)}
      >
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle>
              {viewMode === 'edit' ? 'Edit Appointment' : 'Appointment Details'}
            </DialogTitle>
            <DialogClose onClick={() => setSelectedAppointment(null)} />
          </DialogHeader>
          {selectedAppointment &&
            (viewMode === 'edit' ? (
              <AppointmentForm
                initialData={selectedAppointment}
                onSubmit={handleUpdate}
                onCancel={() => setSelectedAppointment(null)}
              />
            ) : (
              <AppointmentView
                appointment={selectedAppointment}
                onClose={() => setSelectedAppointment(null)}
                onEdit={() => setViewMode('edit')}
                onUpdateStatus={() => setViewMode('status')}
                canEdit={canEdit && selectedAppointment.status !== 'Completed'}
                canUpdateStatus={
                  canUpdateStatus && selectedAppointment.status === 'Scheduled'
                }
              />
            ))}
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog
        open={viewMode === 'status'}
        onOpenChange={(open) => !open && setViewMode(null)}
      >
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Update Appointment Status</DialogTitle>
            <DialogDescription>
              Change the status of this appointment.
            </DialogDescription>
            <DialogClose onClick={() => setViewMode(null)} />
          </DialogHeader>
          {selectedAppointment && (
            <StatusUpdateDialog
              appointment={selectedAppointment}
              onConfirm={handleStatusUpdate}
              onCancel={() => setViewMode(null)}
              allowedStatuses={getAllowedStatuses(selectedAppointment.status)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      {canDelete && (
        <AlertDialog
          open={!!deleteId}
          onOpenChange={(open) => !open && setDeleteId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                appointment record.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteId(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Appointment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
