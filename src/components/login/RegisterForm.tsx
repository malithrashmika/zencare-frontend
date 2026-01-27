import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { toast } from 'sonner'
import { cn } from '../../lib/utils'
import { authApi } from '../../services/authApi'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { LayoutGrid } from 'lucide-react'


export function RegisterForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
      isValid = false
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)

    try {
      // Create user with default 'customer' role
      await authApi.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      })
      toast.success('Account created successfully! Please sign in.')
      navigate('/login')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
            Join ZenCare
          </h1>
          <p className="text-sm text-slate-500">
            Create your account to start managing your health
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-2.5 text-slate-400">
                <User className="h-5 w-5" />
              </div>
              <Input
                id="name"
                placeholder="John Doe"
                className={cn(
                  'pl-10',
                  errors.name && 'border-red-500 focus:ring-red-500/20'
                )}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isLoading}
              />
            </div>
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-2.5 text-slate-400">
                <Mail className="h-5 w-5" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className={cn(
                  'pl-10',
                  errors.email && 'border-red-500 focus:ring-red-500/20'
                )}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-2.5 text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={cn(
                  'pl-10',
                  errors.password && 'border-red-500 focus:ring-red-500/20'
                )}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
              />
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-2.5 text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={cn(
                  'pl-10',
                  errors.confirmPassword && 'border-red-500 focus:ring-red-500/20'
                )}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                disabled={isLoading}
              />
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="role">Account Type</Label>
            <div className="relative">
               <div className="pointer-events-none absolute left-3 top-2.5 z-10 text-slate-400">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <Select
                value={formData.role}
                onValueChange={(val) => setFormData({ ...formData, role: val })}
                disabled={isLoading}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                  <SelectItem value="customer">Patient / Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="group w-full bg-blue-600 hover:bg-blue-700 mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Sign back in
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        © 2026 ZenCare Clinic. All rights reserved.
      </p>
    </div>
  )
}
