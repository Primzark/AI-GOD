import { createContext, useContext, useEffect, useState } from 'react'
import { apiAuth, type User } from '../lib/api'

type AuthCtx = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, full_name?: string) => Promise<void>
  signOut: () => void
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) { setLoading(false); return }
    apiAuth.me().then(({ data }) => setUser(data)).finally(() => setLoading(false))
  }, [])

  const signIn = async (email: string, password: string) => {
    const { data } = await apiAuth.login(email, password)
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    const me = await apiAuth.me()
    setUser(me.data)
  }

  const signUp = async (email: string, password: string, full_name?: string) => {
    await apiAuth.register(email, password, full_name)
    await signIn(email, password)
  }

  const signOut = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  return <Ctx.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</Ctx.Provider>
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

