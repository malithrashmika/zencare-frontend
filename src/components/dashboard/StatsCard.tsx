import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '../../lib/utils'
import { BoxIcon } from 'lucide-react'
interface StatsCardProps {
  title: string
  value: string | number
  icon: typeof BoxIcon
  description?: string
  trend?: number
  className?: string
}
export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-slate-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {(description || trend) && (
          <p className="text-xs text-slate-500 mt-1">
            {trend && (
              <span
                className={cn(
                  'font-medium mr-1',
                  trend > 0 ? 'text-green-600' : 'text-red-600',
                )}
              >
                {trend > 0 ? '+' : ''}
                {trend}%
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
