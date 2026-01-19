import  { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useDoctors } from '../hooks/useDoctor'
import { useAuth } from '../hooks/useAuth'
import type { Doctor, DoctorFormData } from '../types'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectItem } from '../components/ui/select'
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
import { DoctorsTable } from '../components/doctors/DoctorsTable'
import { DoctorForm } from '../components/doctors/DoctorForm'
import { DoctorView } from '../components/doctors/DoctorView'

export function Doctors() {
  return <DoctorsContent />
}
function DoctorsContent() {
  const { user } = useAuth()
  const {
    doctors,
    loading,
    filters,
    setFilters,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  } = useDoctors()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [viewMode, setViewMode] = useState<'view' | 'edit' | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  // Role-based permissions: only admin can manage doctors
  const canManage = user?.role === 'admin'
  const handleCreate = async (data: DoctorFormData) => {
    await createDoctor(data)
    setIsAddOpen(false)
  }
  const handleUpdate = async (data: DoctorFormData) => {
    if (selectedDoctor) {
      await updateDoctor(selectedDoctor.id, data)
      setViewMode(null)
      setSelectedDoctor(null)
    }
  }
  const handleDelete = async () => {
    if (deleteId) {
      await deleteDoctor(deleteId)
      setDeleteId(null)
    }
  }
  // Get unique specializations for filter
  const specializations = Array.from(
    new Set(doctors.map((d) => d.specialization)),
  )
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Doctors
          </h2>
          <p className="text-slate-500">
            Manage doctor profiles, specializations, and availability.
          </p>
        </div>
        {canManage && (
          <Button onClick={() => setIsAddOpen(true)} className="sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Doctor
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by name, phone, email, or specialization..."
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
        <div className="flex gap-2">
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
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
            </Select>
          </div>
          <div className="w-40">
            <Select
              value={filters.specialization || 'all'}
              onValueChange={(val) =>
                setFilters((prev) => ({
                  ...prev,
                  specialization: val === 'all' ? undefined : val,
                }))
              }
            >
              <SelectItem value="all">All Specializations</SelectItem>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : (
        <DoctorsTable
          doctors={doctors}
          onView={(d) => {
            setSelectedDoctor(d)
            setViewMode('view')
          }}
          onEdit={(d) => {
            setSelectedDoctor(d)
            setViewMode('edit')
          }}
          onDelete={(d) => setDeleteId(d.id)}
          canManage={canManage}
        />
      )}

      {/* Add Doctor Dialog - Only for Admin */}
      {canManage && (
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="sm:max-w-150">
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
              <DialogDescription>
                Enter the doctor's professional and contact information.
              </DialogDescription>
              <DialogClose onClick={() => setIsAddOpen(false)} />
            </DialogHeader>
            <DoctorForm
              onSubmit={handleCreate}
              onCancel={() => setIsAddOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* View/Edit Doctor Dialog */}
      <Dialog
        open={!!selectedDoctor}
        onOpenChange={(open) => !open && setSelectedDoctor(null)}
      >
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle>
              {viewMode === 'edit' ? 'Edit Doctor' : 'Doctor Details'}
            </DialogTitle>
            <DialogClose onClick={() => setSelectedDoctor(null)} />
          </DialogHeader>
          {selectedDoctor &&
            (viewMode === 'edit' ? (
              <DoctorForm
                initialData={selectedDoctor}
                onSubmit={handleUpdate}
                onCancel={() => setSelectedDoctor(null)}
              />
            ) : (
              <DoctorView
                doctor={selectedDoctor}
                onClose={() => setSelectedDoctor(null)}
                onEdit={() => setViewMode('edit')}
                canEdit={canManage}
              />
            ))}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation - Only for Admin */}
      {canManage && (
        <AlertDialog
          open={!!deleteId}
          onOpenChange={(open) => !open && setDeleteId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                doctor's profile and remove their data from our servers.
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
                Delete Doctor
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
