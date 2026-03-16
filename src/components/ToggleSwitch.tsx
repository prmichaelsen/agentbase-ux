/**
 * ToggleSwitch — Themeable iOS-style toggle.
 *
 * Uses useTheme() for on/off track colors and text.
 */

import { type ButtonHTMLAttributes } from 'react'
import { useTheme } from '../lib/theming'

export type ToggleSwitchSize = 'sm' | 'md' | 'lg'

interface ToggleSwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'type' | 'onChange'> {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: ToggleSwitchSize
  label?: string
  description?: string
}

const sizeConfig: Record<ToggleSwitchSize, {
  track: string
  knob: string
  knobTranslate: string
}> = {
  sm: { track: 'w-9 h-5', knob: 'w-4 h-4', knobTranslate: 'translate-x-4' },
  md: { track: 'w-11 h-6', knob: 'w-5 h-5', knobTranslate: 'translate-x-5' },
  lg: { track: 'w-14 h-7', knob: 'w-6 h-6', knobTranslate: 'translate-x-7' },
}

export function ToggleSwitch({
  checked,
  onChange,
  size = 'md',
  label,
  description,
  disabled = false,
  id,
  ...props
}: ToggleSwitchProps) {
  const t = useTheme()
  const config = sizeConfig[size]

  const handleClick = () => {
    if (!disabled) onChange(!checked)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      if (!disabled) onChange(!checked)
    }
  }

  const toggle = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      id={id}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={[
        'relative inline-flex items-center rounded-full transition-all duration-200 flex-shrink-0',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
        config.track,
        checked ? t.toggleOn : t.toggleOff,
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
      {...props}
    >
      <span
        className={[
          'inline-flex items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200',
          config.knob,
          checked ? config.knobTranslate : 'translate-x-0.5',
        ].join(' ')}
      />
    </button>
  )

  if (!label) return toggle

  return (
    <div className={['flex items-center justify-between gap-3', disabled ? 'opacity-50' : ''].join(' ')}>
      <div className="flex flex-col min-w-0">
        <label
          htmlFor={id}
          className={[
            'text-sm font-medium',
            t.textPrimary,
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          ].join(' ')}
          onClick={handleClick}
        >
          {label}
        </label>
        {description && (
          <span className={`text-xs mt-0.5 ${t.textMuted}`}>{description}</span>
        )}
      </div>
      {toggle}
    </div>
  )
}
