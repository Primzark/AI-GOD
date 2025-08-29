import { Helmet, HelmetProvider } from 'react-helmet-async'

export function MetaProvider({ children }: { children: React.ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>
}

export function Meta({ title, description }: { title?: string; description?: string }) {
  const name = import.meta.env.VITE_APP_NAME || 'Joyful Vibe'
  const full = title ? `${title} • ${name}` : name
  return (
    <Helmet>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}

