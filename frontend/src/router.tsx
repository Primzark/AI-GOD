import { createBrowserRouter } from 'react-router-dom'
import AppShell from './shell/AppShell'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Contact from './pages/Contact'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Forgot from './pages/auth/Forgot'
import Dashboard from './pages/account/Dashboard'
import Admin from './pages/admin/Admin'
import NotFound from './pages/NotFound'
import { RequireAuth, RequireAdmin } from './shell/guards'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:id', element: <Post /> },
      { path: 'contact', element: <Contact /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'forgot', element: <Forgot /> },
      { path: 'dashboard', element: <RequireAuth><Dashboard /></RequireAuth> },
      { path: 'admin', element: <RequireAdmin><Admin /></RequireAdmin> },
      { path: '*', element: <NotFound /> },
    ]
  }
])

