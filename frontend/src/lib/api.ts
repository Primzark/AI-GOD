import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        try {
          const { data } = await api.post('/api/auth/refresh', refresh, { headers: { 'Content-Type': 'text/plain' } })
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('refresh_token', data.refresh_token)
          original.headers = { ...original.headers, Authorization: `Bearer ${data.access_token}` }
          return api(original)
        } catch {}
      }
    }
    return Promise.reject(err)
  }
)

export default api

export type User = { id: number; email: string; full_name?: string | null; role: string; is_active: boolean; is_superuser: boolean }
export type Token = { access_token: string; refresh_token: string; token_type: 'bearer' }
export type Post = { id: number; title: string; slug: string; content: string; tags: string }
export type Item = { id: number; name: string; description: string; price: number; active: boolean; tags: string }

export const apiAuth = {
  register: (email: string, password: string, full_name?: string) => api.post<User>('/api/auth/register', { email, password, full_name }),
  login: (email: string, password: string) => api.post<Token>('/api/auth/login', { email, password }),
  me: () => api.get<User>('/api/users/me'),
}

export const apiContent = {
  posts: () => api.get<Post[]>('/api/posts/'),
  post: (id: number) => api.get<Post>(`/api/posts/${id}`),
  items: (q?: string) => api.get<Item[]>('/api/items/', { params: { q } }),
}

export const apiContact = {
  send: (payload: { email: string; name: string; message: string }) => api.post('/api/contact/', payload)
}
