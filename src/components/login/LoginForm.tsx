import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Activity,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { toast } from 'sonner'
import { cn } from '../../lib/utils'
import { authApi } from '../../services/authApi'

export function LoginForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const validateForm = () => {
    let isValid = true
    const newErrors = {
      email: '',
      password: '',
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
    setErrors(newErrors)
    return isValid
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    console.log('Submitting login for:', formData.email)

    try {
      const response = await authApi.login(formData)
      console.log('Login response:', response)
      toast.success('Welcome back! Successfully signed in to ZenCare Clinic.')
      navigate('/')
    } catch (error: any) {
      console.error('Login error details:', error)
      const message = error.response?.data?.message || 'Authentication Failed. Invalid email or password.'
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
            <Activity className="h-6 w-6" />
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
            ZenCare Clinic
          </h1>
          <p className="text-sm text-slate-500">
            Secure Access to Your Clinical Workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-2.5 text-slate-400">
                <Mail className="h-5 w-5" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="doctor@zencare.com"
                className={cn(
                  'pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20',
                  errors.email && 'border-red-500 focus:ring-red-500/20',
                )}
                value={formData.email}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                  if (errors.email)
                    setErrors({
                      ...errors,
                      email: '',
                    })
                }}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-xs font-medium text-red-500 animate-in slide-in-from-top-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-2.5 text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={cn(
                  'pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20',
                  errors.password && 'border-red-500 focus:ring-red-500/20',
                )}
                value={formData.password}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                  if (errors.password)
                    setErrors({
                      ...errors,
                      password: '',
                    })
                }}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-medium text-red-500 animate-in slide-in-from-top-1">
                {errors.password}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="group w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
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
                New to ZenCare?
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/register"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 hover:underline transition-colors"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        © 2026 ZenCare Clinic. Secure Healthcare Platform.
      </p>
    </div>
  )
}
