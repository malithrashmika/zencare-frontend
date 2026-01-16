import React, { useEffect, useState } from 'react'
import type { Doctor, DoctorFormData } from '../../types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectItem } from '../ui/select'
import { DialogFooter } from '../ui/dialog'
interface DoctorFormProps {
  initialData?: Doctor
  onSubmit: (data: DoctorFormData) => Promise<void>
  onCancel: () => void
}
export function DoctorForm({
  initialData,
  onSubmit,
  onCancel,
}: DoctorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<DoctorFormData>({
    name: '',
    specialization: '',
    phone: '',
    email: '',
    channelFee: 0,
    status: 'Active',
  })
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        specialization: initialData.specialization,
        phone: initialData.phone,
        email: initialData.email,
        channelFee: initialData.channelFee,
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
            placeholder="Dr. John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization *</Label>
          <Input
            id="specialization"
            required
            value={formData.specialization}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                specialization: e.target.value,
              }))
            }
            placeholder="Cardiology"
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
            placeholder="doctor@clinic.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="channelFee">Channel Fee ($) *</Label>
          <Input
            id="channelFee"
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.channelFee}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                channelFee: parseFloat(e.target.value) || 0,
              }))
            }
            placeholder="150.00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                status: val as 'Active' | 'On Leave',
              }))
            }
          >
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
          </Select>
        </div>
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
              ? 'Update Doctor'
              : 'Add Doctor'}
        </Button>
      </DialogFooter>
    </form>
  )
}
