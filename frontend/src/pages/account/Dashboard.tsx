import { useAuth } from '../../state/auth'

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-semibold">Welcome, {user?.full_name || user?.email}</h1>
      <div className="mt-6 grid sm:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6">
          <h2 className="font-semibold">Profile</h2>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Email: {user?.email}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Role: {user?.role}</div>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="font-semibold">API Key</h2>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Coming soon</div>
        </div>
      </div>
    </div>
  )
}

