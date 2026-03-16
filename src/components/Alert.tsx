import type { ReactNode } from 'react'
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react'

export type AlertVariant = 'success' | 'warning' | 'error' | 'info'

interface AlertProps {
  children: ReactNode
  variant?: AlertVariant
  className?: string
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string; icon: typeof CheckCircle }> = {
  success: {
    bg: 'bg-brand-success/10',
    border: 'border-brand-success/30',
    text: 'text-brand-success',
    icon: CheckCircle,
  },
  warning: {
    bg: 'bg-brand-warning/10',
    border: 'border-brand-warning/30',
    text: 'text-brand-warning',
    icon: AlertTriangle,
  },
  error: {
    bg: 'bg-brand-danger/10',
    border: 'border-brand-danger/30',
    text: 'text-brand-danger',
    icon: XCircle,
  },
  info: {
    bg: 'bg-brand-info/10',
    border: 'border-brand-info/30',
    text: 'text-brand-info',
    icon: Info,
  },
}

export function Alert({ children, variant = 'success', className }: AlertProps) {
  const styles = variantStyles[variant]
  const Icon = styles.icon

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-3 ${className || ''}`}>
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${styles.text} shrink-0`} />
        <div className={`flex items-center flex-wrap gap-x-1 text-sm ${styles.text}`}>
          {children}
        </div>
      </div>
    </div>
  )
}
