import apiClient from '../api/apiclient'

export interface Invoice {
  id: string
  appointment: any
  patient: any
  doctor: any
  doctorChannelFee: number
  totalAmount: number
  status: 'Pending' | 'Paid'
  createdAt: string
}

export const billingApi = {
  async getAll(): Promise<Invoice[]> {
    const response = await apiClient.get<Invoice[]>('/invoices')
    return response.data
  },

  async getById(id: string): Promise<Invoice> {
    const response = await apiClient.get<Invoice>(`/invoices/${id}`)
    return response.data
  },

  async updateStatus(id: string, status: 'Pending' | 'Paid'): Promise<Invoice> {
    const response = await apiClient.patch<Invoice>(`/invoices/${id}/status`, { status })
    return response.data
  }
}
