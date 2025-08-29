import { useForm } from 'react-hook-form'
import { useAuth } from '../../state/auth'
import { Link, useNavigate } from 'react-router-dom'

type Form = { email: string; password: string; full_name?: string }

export default function SignUp() {
  const { register, handleSubmit } = useForm<Form>()
  const { signUp } = useAuth()
  const nav = useNavigate()
  const onSubmit = async (data: Form) => {
    await signUp(data.email, data.password, data.full_name)
    nav('/dashboard')
  }
  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <h1 className="text-3xl font-semibold">Create account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm">Full name</label>
          <input className="mt-1 w-full px-3 py-2 rounded-xl border bg-transparent" {...register('full_name')} />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input className="mt-1 w-full px-3 py-2 rounded-xl border bg-transparent" {...register('email')} />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" className="mt-1 w-full px-3 py-2 rounded-xl border bg-transparent" {...register('password')} />
        </div>
        <button className="w-full px-6 py-3 rounded-full bg-primary text-white">Sign up</button>
      </form>
      <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">Have an account? <Link to="/signin" className="text-primary">Sign in</Link></p>
    </div>
  )
}

