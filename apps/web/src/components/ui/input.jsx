import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const Input = forwardRef(function Input({ className, error, label, hint, id, ...props }, ref) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={cn(
          'input',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      {hint && !error && <p className="text-gray-500 text-xs mt-1">{hint}</p>}
    </div>
  )
})

export default Input
