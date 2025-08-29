import React from 'react'

type State = { hasError: boolean }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: any, info: any) { console.error(error, info) }
  render() {
    if (this.state.hasError) return (
      <div className="min-h-[40vh] grid place-items-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Something went wrong</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Please refresh or try again later.</p>
        </div>
      </div>
    )
    return this.props.children
  }
}

