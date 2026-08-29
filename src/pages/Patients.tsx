import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { usePatients } from '../hooks/usePatients'
import type { Patient, PatientFormData } from '../types'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '../components/ui/select'

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
import { PatientsTable } from '../components/patients/PatientsTable'
import { PatientForm } from '../components/patients/PatientForm'
import { PatientView } from '../components/patients/PatientView'
import { Toaster } from 'sonner'
export function Patients() {
    return (
        <>
            <PatientsContent />
            <Toaster />
        </>
    )
}
function PatientsContent() {
    const {
        patients,
        loading,
        filters,
        setFilters,
        createPatient,
        updatePatient,
        deletePatient,
    } = usePatients()
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const [viewMode, setViewMode] = useState<'view' | 'edit' | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const handleCreate = async (data: PatientFormData) => {
        await createPatient(data)
        setIsAddOpen(false)
    }
    const handleUpdate = async (data: PatientFormData) => {
        if (selectedPatient) {
            await updatePatient(selectedPatient.id, data)
            setViewMode(null)
            setSelectedPatient(null)
        }
    }
    const handleDelete = async () => {
        if (deleteId) {
            await deletePatient(deleteId)
            setDeleteId(null)
        }
    }
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Patients
                    </h2>
                    <p className="text-slate-500">
                        Manage patient records, registrations, and history.
                    </p>
                </div>
                <Button onClick={() => setIsAddOpen(true)} className="sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add Patient
                </Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search by name, phone, or email..."
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
                            <SelectTrigger className="w-35">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                    <div className="w-35">
                        <Select
                            value={filters.gender || 'all'}
                            onValueChange={(val) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    gender: val === 'all' ? undefined : val,
                                }))
                            }
                        >
                            <SelectTrigger className="w-35">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Genders</SelectItem>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                </div>
            ) : (
                <PatientsTable
                    patients={patients}
                    onView={(p) => {
                        setSelectedPatient(p)
                        setViewMode('view')
                    }}
                    onEdit={(p) => {
                        setSelectedPatient(p)
                        setViewMode('edit')
                    }}
                    onDelete={(p) => setDeleteId(p.id)}
                />
            )}

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-150">
                    <DialogHeader>
                        <DialogTitle>Add New Patient</DialogTitle>
                        <DialogDescription>
                            Enter the patient's personal and contact information.
                        </DialogDescription>
                        <DialogClose onClick={() => setIsAddOpen(false)} />
                    </DialogHeader>
                    <PatientForm
                        onSubmit={handleCreate}
                        onCancel={() => setIsAddOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <Dialog
                open={!!selectedPatient}
                onOpenChange={(open) => !open && setSelectedPatient(null)}
            >
                <DialogContent className="sm:max-w-150">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'edit' ? 'Edit Patient' : 'Patient Details'}
                        </DialogTitle>
                        <DialogClose onClick={() => setSelectedPatient(null)} />
                    </DialogHeader>
                    {selectedPatient &&
                        (viewMode === 'edit' ? (
                            <PatientForm
                                initialData={selectedPatient}
                                onSubmit={handleUpdate}
                                onCancel={() => setSelectedPatient(null)}
                            />
                        ) : (
                            <PatientView
                                patient={selectedPatient}
                                onClose={() => setSelectedPatient(null)}
                                onEdit={() => setViewMode('edit')}
                            />
                        ))}
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            patient record and remove their data from our servers.
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
                            Delete Patient
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
