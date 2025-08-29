import { Link } from 'react-router-dom'

export default function Forgot() {
  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <h1 className="text-3xl font-semibold">Forgot password</h1>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Password reset is not implemented in demo. Please contact support.</p>
      <Link to="/signin" className="inline-block mt-4 text-primary">Back to sign in</Link>
    </div>
  )
}

