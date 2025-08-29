import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { apiContact } from '../lib/api'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  message: z.string().min(10),
})
type FormData = z.infer<typeof schema>

export default function Contact() {
  const [ok, setOk] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const onSubmit = async (data: FormData) => {
    await apiContact.send(data)
    setOk(true)
  }
  return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-semibold">Contact</h1>
      {ok ? (
        <div className="mt-6 rounded-xl border p-6 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900">Thanks! We will be in touch.</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input className="mt-1 w-full px-3 py-2 rounded-xl border bg-transparent" {...register('email')} />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm">Name</label>
            <input className="mt-1 w-full px-3 py-2 rounded-xl border bg-transparent" {...register('name')} />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm">Message</label>
            <textarea rows={5} className="mt-1 w-full px-3 py-2 rounded-xl border bg-transparent" {...register('message')} />
            {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
          </div>
          <button disabled={isSubmitting} className="px-6 py-3 rounded-full bg-primary text-white disabled:opacity-60">Send</button>
        </form>
      )}
    </div>
  )
}

