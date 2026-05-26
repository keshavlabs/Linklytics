import { cn } from '@/lib/utils'

export default function EmptyState({ icon = '◌', title, description, action, className }) {
  return (
    <div className={cn('text-center py-16 px-6', className)}>
      <div className="text-5xl mb-4 opacity-40">{icon}</div>
      <h3 className="text-base font-semibold text-gray-300 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-xs mx-auto">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
