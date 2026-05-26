import { cn } from '@/lib/utils'

export function Card({ children, className, ...props }) {
  return (
    <div className={cn('bg-gray-900 border border-gray-800 rounded-xl', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('px-5 py-4 border-b border-gray-800', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn('font-semibold text-white text-base', className)}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className }) {
  return (
    <p className={cn('text-sm text-gray-400 mt-0.5', className)}>
      {children}
    </p>
  )
}

export function CardContent({ children, className }) {
  return (
    <div className={cn('px-5 py-4', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn('px-5 py-4 border-t border-gray-800 flex items-center gap-3', className)}>
      {children}
    </div>
  )
}
