/**
 * Slider — Themeable range slider with gradient fill.
 *
 * Two modes:
 *  - Continuous: provide min, max, step, value
 *  - Discrete: provide options array, value snaps to option values
 *
 * Requires the `slider-styled` CSS class from tokens.css.
 * Fill gradient uses CSS custom properties from the theme.
 */

import type React from 'react'
import { useTheme } from '../lib/theming'

interface SliderBaseProps {
  disabled?: boolean
  className?: string
}

interface ContinuousSliderProps extends SliderBaseProps {
  options?: never
  labels?: never
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}

interface DiscreteSliderProps<T extends number | string> extends SliderBaseProps {
  options: T[]
  labels?: boolean | ((option: T) => string)
  min?: never
  max?: never
  step?: never
  value: T
  onChange: (value: T) => void
}

export type SliderProps<T extends number | string = number> =
  | ContinuousSliderProps
  | DiscreteSliderProps<T>

function fillStyle(value: number, min: number, max: number): React.CSSProperties {
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100
  return {
    background: `linear-gradient(90deg, var(--color-brand-primary) 0%, var(--color-brand-secondary) ${pct}%, var(--color-bg-elevated) ${pct}%)`,
  }
}

export function Slider<T extends number | string = number>(props: SliderProps<T>) {
  const t = useTheme()
  const { disabled, className } = props

  if (props.options) {
    const { options, labels, value, onChange } = props
    const index = options.indexOf(value)
    const currentIndex = index === -1 ? 0 : index

    const getLabel = (option: T): string => {
      if (typeof labels === 'function') return labels(option)
      return String(option)
    }

    return (
      <div className={className}>
        <input
          type="range"
          min={0}
          max={options.length - 1}
          step={1}
          value={currentIndex}
          onChange={(e) => onChange(options[parseInt(e.target.value)])}
          className="w-full slider-styled"
          style={fillStyle(currentIndex, 0, options.length - 1)}
          disabled={disabled}
        />
        {labels && (
          <div className={`flex justify-between text-xs mt-1 ${t.textMuted}`}>
            {options.map((option) => (
              <span key={String(option)}>{getLabel(option)}</span>
            ))}
          </div>
        )}
      </div>
    )
  }

  const { min, max, step, value, onChange } = props

  return (
    <div className={className}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full slider-styled"
        style={fillStyle(value, min, max)}
        disabled={disabled}
      />
    </div>
  )
}
