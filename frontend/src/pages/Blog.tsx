import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { apiContent } from '../lib/api'

export default function Blog() {
  const { data } = useQuery({ queryKey: ['posts'], queryFn: async () => (await apiContent.posts()).data })
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-semibold mb-6">Blog</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map(p => (
          <Link key={p.id} to={`/blog/${p.id}`} className="rounded-2xl border p-6 hover:shadow-soft">
            <div className="text-sm text-primary">{p.tags}</div>
            <div className="mt-2 font-semibold">{p.title}</div>
            <p className="text-sm text-slate-600 line-clamp-3 mt-2">{p.content}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

