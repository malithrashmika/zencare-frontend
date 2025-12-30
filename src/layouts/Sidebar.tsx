import { Link, useLocation } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Button } from '../components/ui/button'
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  X,
} from 'lucide-react'
interface SidebarProps {
  className?: string
  onClose?: () => void
}
const navItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Patients',
    href: '/patients',
    icon: Users,
  },
  {
    title: 'Appointments',
    href: '/appointments',
    icon: Calendar,
  },
  {
    title: 'Doctors',
    href: '/doctors',
    icon: Stethoscope,
  },
  {
    title: 'Treatments',
    href: '/treatments',
    icon: FileText,
  },
  {
    title: 'Billing',
    href: '/billing',
    icon: CreditCard,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]
export function Sidebar({ className, onClose }: SidebarProps) {
  const location = useLocation()
  return (
    <div
      className={cn(
        'flex h-full flex-col bg-slate-900 text-slate-50',
        className,
      )}
    >
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <span>ZenCare</span>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 p-4">
        <div className="rounded-lg bg-slate-800 p-4">
          <h4 className="text-sm font-medium text-white">Need Help?</h4>
          <p className="mt-1 text-xs text-slate-400">
            Check our docs or contact support.
          </p>
          <Button variant="secondary" size="sm" className="mt-3 w-full">
            Documentation
          </Button>
        </div>
      </div>
    </div>
  )
}
