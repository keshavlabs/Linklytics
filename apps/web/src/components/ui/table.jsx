import { cn } from '@/lib/utils'

export function Table({ children, className }) {
  return (
    <div className="overflow-x-auto">
      <table className={cn('w-full text-sm', className)}>{children}</table>
    </div>
  )
}

export function TableHead({ children }) {
  return (
    <thead className="text-gray-500 text-xs uppercase tracking-wide border-b border-gray-800">
      {children}
    </thead>
  )
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-gray-800/60">{children}</tbody>
}

export function TableRow({ children, className, onClick }) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        'hover:bg-gray-800/30 transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </tr>
  )
}

export function Th({ children, className, align = 'left' }) {
  return (
    <th
      className={cn(
        'px-5 py-3 font-medium',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {children}
    </th>
  )
}

export function Td({ children, className, align = 'left' }) {
  return (
    <td
      className={cn(
        'px-5 py-3',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className
      )}
    >
      {children}
    </td>
  )
}
