import {
  Users,
  Calendar,
  CreditCard,
  CheckCircle,
  Activity,
} from 'lucide-react'
import { useDashboardStats } from '../hooks/useDashboardStats'
import { StatsCard } from '../components/dashboard/StatsCard'
import { RecentAppointmentsTable } from '../components/dashboard/RecentAppointmentsTable'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
export function Dashboard() {
  const { stats, appointments, loading } = useDashboardStats()
  if (loading || !stats) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h2>
          <p className="text-slate-500">
            Welcome back, here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>New Appointment</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Total Patients"
          value={stats.totalPatients.toLocaleString()}
          icon={Users}
          trend={stats.trends.patients}
          description="from last month"
        />
        <StatsCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon={Calendar}
          trend={stats.trends.appointments}
          description="from yesterday"
        />
        <StatsCard
          title="Pending Bills"
          value={`$${stats.pendingBills.toLocaleString()}`}
          icon={CreditCard}
          trend={-2.5}
          description="from last month"
        />
        <StatsCard
          title="Completed Visits"
          value={stats.completedVisits}
          icon={CheckCircle}
          trend={12}
          description="from last week"
        />
        <StatsCard
          title="Active Doctors"
          value={stats.activeDoctors}
          icon={Activity}
          description="Currently on duty"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 lg:col-span-5">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentAppointmentsTable appointments={appointments} />
          </CardContent>
        </Card>

        <Card className="col-span-3 lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-4" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Team Meeting
                    </p>
                    <p className="text-xs text-slate-500">
                      09:00 AM - 10:00 AM
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

