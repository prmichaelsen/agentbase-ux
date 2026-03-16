/**
 * MenuItem — Themeable menu item button with icon, label, and loading state.
 */

import type { LucideIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { useTheme } from '../lib/theming'

interface MenuItemProps {
  icon: LucideIcon
  label: string
  onClick: () => void
  disabled?: boolean
  danger?: boolean
  loading?: boolean
  className?: string
  suffix?: React.ReactNode
}

export function MenuItem({ icon: Icon, label, onClick, disabled, danger, loading, className, suffix }: MenuItemProps) {
  const t = useTheme()
  const colorClasses = danger ? t.menuItemDanger : t.menuItem

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${colorClasses} disabled:opacity-50${className ? ` ${className}` : ''}`}
    >
      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Icon className="w-3.5 h-3.5" />}
      {label}
      {suffix && <span className="ml-auto">{suffix}</span>}
    </button>
  )
}
