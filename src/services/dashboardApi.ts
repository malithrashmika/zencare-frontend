import apiClient from '../api/apiclient'
import type { DashboardStats } from '../types'

export const dashboardApi = {
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/dashboard/stats')
    return response.data
  }
}
