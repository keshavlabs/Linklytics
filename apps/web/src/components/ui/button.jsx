import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-brand-600 hover:bg-brand-500 text-white',
  secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-100',
  danger: 'bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30',
  ghost: 'hover:bg-gray-800 text-gray-400 hover:text-gray-100',
  outline: 'border border-gray-700 hover:bg-gray-800 text-gray-300',
}

const sizes = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
