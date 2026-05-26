import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-gray-800 text-gray-300',
  success: 'bg-green-500/10 text-green-400 border border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
  brand: 'bg-brand-600/10 text-brand-300 border border-brand-600/20',
}

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
