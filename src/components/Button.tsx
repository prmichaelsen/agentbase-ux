/**
 * Button — Themeable button with variant and size support.
 *
 * Uses useTheme() for all color classes. Layout utilities (padding,
 * font-weight, rounded, flex) are applied directly.
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react'
import { useTheme } from '../lib/theming'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  children: ReactNode
  fullWidth?: boolean
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const t = useTheme()

  const variantStyles: Record<ButtonVariant, string> = {
    primary: t.buttonPrimary,
    secondary: t.buttonSecondary,
    danger: t.buttonDanger,
    success: t.buttonSuccess,
    ghost: t.buttonGhost,
  }

  const combinedClassName = [
    'font-medium rounded-lg transition-all flex items-center justify-center gap-2',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
