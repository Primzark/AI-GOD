import { useForm } from 'react-hook-form'
import { useAuth } from '../../state/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type Form = { email: string; password: string }

export default function SignIn() {
  const { register, handleSubmit } = useForm<Form>()
  const { signIn } = useAuth()
  const nav = useNavigate()
  const loc = useLocation() as any
  const onSubmit = async (data: Form) => {
    await signIn(data.email, data.password)
    nav((loc.state?.from?.pathname) || '/dashboard')
  }
  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <h1 className="text-3xl font-semibold">Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input className="mt-1 w-full px-3 py-2 rounded-xl border bg-transparent" {...register('email')} />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" className="mt-1 w-full px-3 py-2 rounded-xl border bg-transparent" {...register('password')} />
        </div>
        <button className="w-full px-6 py-3 rounded-full bg-primary text-white">Sign in</button>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          <Link to="/forgot" className="hover:text-primary">Forgot password?</Link>
        </div>
      </form>
      <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">No account? <Link to="/signup" className="text-primary">Sign up</Link></p>
    </div>
  )
}

