import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-semibold">404</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Page not found</p>
        <Link to="/" className="inline-block mt-6 px-6 py-3 rounded-full bg-primary text-white">Back home</Link>
      </div>
    </div>
  )
}

