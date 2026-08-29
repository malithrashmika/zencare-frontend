import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

let accessToken: string | null = localStorage.getItem('authToken')
export const setAccessToken = (token: string | null) => {
  accessToken = token
  if (token) localStorage.setItem('authToken', token)
  else localStorage.removeItem('authToken')
}
apiClient.interceptors.request.use(
  (config) => {
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error) => Promise.reject(error),
)
let isRefreshing = false
let failedQueue: Array<{ resolve: (v: unknown) => void; reject: (e: unknown) => void }> = []
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve(token)))
  failedQueue = []
}
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) return new Promise((resolve, reject) => failedQueue.push({ resolve, reject })).then((token) => { original.headers.Authorization = `Bearer ${token}`; return apiClient(original) })
      original._retry = true
      isRefreshing = true
      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true })
        const newToken = data.accessToken
        setAccessToken(newToken)
        processQueue(null, newToken)
        original.headers.Authorization = `Bearer ${newToken}`
        return apiClient(original)
      } catch (e) {
        processQueue(e, null)
        setAccessToken(null)
        window.location.href = '/login'
        return Promise.reject(e)
      } finally { isRefreshing = false }
    }
    return Promise.reject(error)
  },
)

export default apiClient
