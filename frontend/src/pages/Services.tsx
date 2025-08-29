import { useQuery } from '@tanstack/react-query'
import { apiContent } from '../lib/api'

export default function Services() {
  const { data } = useQuery({ queryKey: ['items'], queryFn: async () => (await apiContent.items()).data })
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Services</h1>
        <input placeholder="Search" className="px-3 py-2 rounded-xl border bg-transparent" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map(it => (
          <div key={it.id} className="rounded-2xl border p-6 hover:shadow-soft">
            <div className="font-semibold">{it.name}</div>
            <div className="text-sm text-slate-500">{it.description}</div>
            <div className="mt-3 font-semibold">${'{'}it.price{'}'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

