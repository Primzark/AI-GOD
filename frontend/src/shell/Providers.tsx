import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../state/auth'
import { MetaProvider } from '../ui/Meta'

const qc = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={qc}>
      <MetaProvider>
        <AuthProvider>{children}</AuthProvider>
      </MetaProvider>
    </QueryClientProvider>
  )
}
