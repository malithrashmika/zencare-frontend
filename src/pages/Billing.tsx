import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { billingApi } from '@/services/billingApi'
import type { Invoice } from '@/services/billingApi'
import { Loader2, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'


export function Billing() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  const fetchInvoices = async () => {
    setLoading(true)
    try {
      const data = await billingApi.getAll()
      setInvoices(data)
    } catch (error) {
      toast.error('Failed to fetch invoices')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Pending' ? 'Paid' : 'Pending'
    try {
      await billingApi.updateStatus(id, newStatus)
      toast.success(`Invoice marked as ${newStatus}`)
      fetchInvoices()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Billing & Invoices</h2>
          <p className="text-slate-500">Manage patient billing and payment history.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchInvoices} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && !invoices.length ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Appointment Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                      No invoices found. Invoices are created when appointments are completed.
                    </TableCell>
                  </TableRow>
                ) : (
                  invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono text-xs uppercase">{invoice.id.slice(-8)}</TableCell>
                      <TableCell>
                        {invoice.appointment?.date ? new Date(invoice.appointment.date as string).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell className="font-semibold">${invoice.totalAmount}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'Paid' ? 'outline' : 'default'} 
                               className={invoice.status === 'Paid' ? 'border-green-500 text-green-700 bg-green-50' : ''}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant={invoice.status === 'Paid' ? 'outline' : 'default'}
                          onClick={() => handleUpdateStatus(invoice.id, invoice.status)}
                        >
                          Mark as {invoice.status === 'Pending' ? 'Paid' : 'Pending'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Billing
