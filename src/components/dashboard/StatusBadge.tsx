import { Badge } from '../ui/badge'
interface StatusBadgeProps {
  status: string
}
export function StatusBadge({ status }: StatusBadgeProps) {
  const getVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'active':
        return 'default'
      case 'scheduled':
      case 'pending':
        return 'outline'
      case 'cancelled':
      case 'inactive':
        return 'destructive'
      case 'on leave':
        return 'secondary'
      default:
        return 'secondary'
    }
  }
  return (
    <Badge variant={getVariant(status)} className="capitalize">
      {status}
    </Badge>
  )
}
