import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { apiContent } from '../lib/api'

export default function Post() {
  const { id } = useParams()
  const { data } = useQuery({ queryKey: ['post', id], queryFn: async () => (await apiContent.post(Number(id))).data, enabled: !!id })
  if (!data) return null
  return (
    <article className="max-w-3xl mx-auto px-4 py-20 prose dark:prose-invert">
      <h1>{data.title}</h1>
      <p className="text-sm text-primary">{data.tags}</p>
      <div className="mt-6 whitespace-pre-wrap">{data.content}</div>
    </article>
  )
}

