import * as React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' }

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className = '', variant = 'default', ...props }, ref) => (
    <button
      ref={ref}
      className={[
        'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2',
        variant === 'default' ? 'bg-primary text-white hover:opacity-90' : 'border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800',
        className,
      ].join(' ')}
      {...props}
    />
  )
)
Button.displayName = 'Button'

