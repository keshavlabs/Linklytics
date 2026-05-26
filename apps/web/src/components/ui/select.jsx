import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const Select = forwardRef(function Select(
  { children, className, label, error, id, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={cn(
          'input appearance-none cursor-pointer',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
})

export default Select
