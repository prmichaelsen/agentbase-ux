export interface StatusBadgeStyle {
  bg: string
  text: string
}

export type StatusBadgeStyleMap = Record<string, StatusBadgeStyle>

interface StatusBadgeProps {
  status: string
  styles: StatusBadgeStyleMap
  className?: string
}

const fallbackStyle: StatusBadgeStyle = {
  bg: 'bg-bg-elevated',
  text: 'text-text-muted',
}

export function StatusBadge({ status, styles, className }: StatusBadgeProps) {
  const style = styles[status] ?? fallbackStyle

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${style.bg} ${style.text} ${className || ''}`}>
      {status}
    </span>
  )
}
