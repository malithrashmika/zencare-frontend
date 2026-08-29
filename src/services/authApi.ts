import apiClient from '../api/apiclient'
import type { LoginData, LoginResponse, User } from '../types'

export const authApi = {
  async login(data: LoginData): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', data)
    if (response.data.accessToken) {
      localStorage.setItem('authToken', response.data.accessToken)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  async register(data: any): Promise<any> {
    const response = await apiClient.post('/auth/register', data)
    return response.data
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  async getCurrentUser(): Promise<User | null> {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      return JSON.parse(userStr) as User
    }
    return null
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken')
  }
}
