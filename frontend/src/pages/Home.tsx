import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { apiContent } from '../lib/api'
import { Meta } from '../ui/Meta'

export default function Home() {
  const { t } = useTranslation()
  const { data: posts } = useQuery({ queryKey: ['posts_home'], queryFn: async () => (await apiContent.posts()).data })
  const { data: items } = useQuery({ queryKey: ['items_home'], queryFn: async () => (await apiContent.items()).data })
  return (
    <div>
      <Meta title="Home" description="Clean, modern, and highly appealing web experiences." />
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <motion.h1 initial={{opacity:0, y: 8}} animate={{opacity:1, y: 0}} transition={{duration:0.25}} className="text-4xl md:text-6xl font-semibold tracking-tight">
            {t('hero_title')}
          </motion.h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">{t('hero_sub')}</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/signup" className="px-6 py-3 rounded-full bg-primary text-white shadow-soft">{t('cta_get_started')}</Link>
            <Link to="/about" className="px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700">{t('cta_learn_more')}</Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-24">
        <h2 className="text-2xl font-semibold mb-8">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-soft transition">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-24">
        <h2 className="text-2xl font-semibold mb-6">Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.slice(0,6).map(it => (
            <div key={it.id} className="rounded-2xl border p-6 hover:shadow-soft">
              <div className="font-semibold">{it.name}</div>
              <div className="text-sm text-slate-500">{it.description}</div>
              <div className="mt-3 font-semibold">${'{'}it.price{'}'}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-24">
        <h2 className="text-2xl font-semibold mb-6">From the blog</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.slice(0,3).map(p => (
            <Link key={p.id} to={`/blog/${p.id}`} className="block rounded-2xl border p-6 hover:shadow-soft">
              <div className="text-sm text-primary">{p.tags}</div>
              <div className="mt-2 font-semibold">{p.title}</div>
              <p className="text-sm text-slate-600 line-clamp-3 mt-2">{p.content}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

const features = [
  { icon: '✨', title: 'Beautiful UI', desc: 'Clean, modern, and accessible components built with Tailwind.' },
  { icon: '⚡', title: 'Blazing Fast', desc: 'Vite + React + FastAPI for snappy experiences.' },
  { icon: '🔒', title: 'Secure Auth', desc: 'JWT access + refresh with role-based access.' },
  { icon: '🌗', title: 'Light/Dark', desc: 'System-aware theme with persistence and motion.' },
  { icon: '🌍', title: 'i18n-ready', desc: 'English + Korean with RTL-safe styles.' },
  { icon: '🧪', title: 'Tested', desc: 'Jest + Pytest with CI to keep things healthy.' },
]
