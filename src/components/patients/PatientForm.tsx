import React, { useEffect, useState } from 'react'
import type { Patient, PatientFormData } from '../../types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'

import { Textarea } from '../ui/textarea'
import { DialogFooter } from '../ui/dialog'
interface PatientFormProps {
    initialData?: Patient
    onSubmit: (data: PatientFormData) => Promise<void>
    onCancel: () => void
}
export function PatientForm({
    initialData,
    onSubmit,
    onCancel,
}: PatientFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<PatientFormData>({
        name: '',
        phone: '',
        email: '',
        dateOfBirth: '',
        gender: 'Male',
        address: '',
        notes: '',
        status: 'Active',
    })
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                phone: initialData.phone,
                email: initialData.email,
                dateOfBirth: initialData.dateOfBirth,
                gender: initialData.gender,
                address: initialData.address,
                notes: initialData.notes || '',
                status: initialData.status,
            })
        }
    }, [initialData])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await onSubmit(formData)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                        id="dob"
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                dateOfBirth: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                            }))
                        }
                        placeholder="(555) 123-4567"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                        value={formData.gender}
                        onValueChange={(val) =>
                            setFormData((prev) => ({
                                ...prev,
                                gender: val as 'Male' | 'Female' | 'Other',
                            }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                        value={formData.status}
                        onValueChange={(val) =>
                            setFormData((prev) => ({
                                ...prev,
                                status: val as 'Active' | 'Inactive',
                            }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>

            <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            address: e.target.value,
                        }))
                    }
                    placeholder="123 Main St, City, State, Zip"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            notes: e.target.value,
                        }))
                    }
                    placeholder="Medical history, allergies, etc."
                />
            </div>

            <DialogFooter className="pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Saving...'
                        : initialData
                            ? 'Update Patient'
                            : 'Add Patient'}
                </Button>
            </DialogFooter>
        </form>
    )
}
