import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api, { apiContent, type Post } from '../../lib/api'

export default function Admin() {
  const qc = useQueryClient()
  const { data } = useQuery({ queryKey: ['posts-admin'], queryFn: async () => (await apiContent.posts()).data })
  const create = useMutation({
    mutationFn: async () => (await api.post<Post>('/api/posts/', { title: 'New Post', slug: `new-${Date.now()}`, content: 'Hello', tags: 'news' })).data,
    onSuccess: (post) => {
      qc.setQueryData<Post[]>(['posts-admin'], (old) => old ? [post, ...old] : [post])
    }
  })
  const del = useMutation({
    mutationFn: async (id: number) => (await api.delete(`/api/posts/${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts-admin'] })
  })
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Admin</h1>
        <button onClick={() => create.mutate()} className="px-4 py-2 rounded-full bg-primary text-white">New Post</button>
      </div>
      <div className="mt-6 grid gap-4">
        {data?.map(p => (
          <div key={p.id} className="rounded-2xl border p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-slate-500">{p.slug}</div>
            </div>
            <button onClick={() => del.mutate(p.id)} className="text-sm text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

