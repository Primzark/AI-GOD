import { Outlet, Link, NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LocaleSwitcher } from '../ui/LocaleSwitcher'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../state/auth'
import { ErrorBoundary } from '../ui/ErrorBoundary'

export default function AppShell() {
  const location = useLocation()
  const { user, signOut } = useAuth()
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:block focus:p-2">Skip to content</a>
      <header className="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-slate-900/60 border-b border-white/20 dark:border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">Joyful <span className="text-primary">Vibe</span></Link>
          <nav className="hidden md:flex gap-6 text-sm">
            {['/','/about','/services','/blog','/contact'].map((p, i) => (
              <NavLink key={p} to={p} className={({isActive}) => `hover:text-primary transition ${isActive?'text-primary font-medium':''}`}>
                {['Home','About','Services','Blog','Contact'][i]}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <NavLink to="/dashboard" className="text-sm hover:text-primary">Dashboard</NavLink>
                {(user.role === 'admin') && <NavLink to="/admin" className="text-sm hover:text-primary">Admin</NavLink>}
                <button onClick={signOut} className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-slate-50">Sign out</button>
              </div>
            ) : (
              <NavLink to="/signin" className="px-3 py-1.5 rounded-full bg-primary text-white text-sm shadow-soft hover:opacity-90">Sign in</NavLink>
            )}
          </div>
        </div>
      </header>
      <main id="main" className="flex-1">
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </ErrorBoundary>
      </main>
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 text-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6 justify-between">
          <p className="text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} Joyful Vibe</p>
          <nav className="flex gap-6">
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
