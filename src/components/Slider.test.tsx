import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../__tests__/test-utils'
import { Slider } from './Slider'

describe('Slider (continuous)', () => {
  it('renders a range input', () => {
    renderWithTheme(
      <Slider min={0} max={100} step={1} value={50} onChange={() => {}} />
    )
    const input = screen.getByRole('slider')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('min', '0')
    expect(input).toHaveAttribute('max', '100')
  })

  it('reflects current value', () => {
    renderWithTheme(
      <Slider min={0} max={100} step={1} value={75} onChange={() => {}} />
    )
    expect(screen.getByRole('slider')).toHaveValue('75')
  })

  it('can be disabled', () => {
    renderWithTheme(
      <Slider min={0} max={100} step={1} value={50} onChange={() => {}} disabled />
    )
    expect(screen.getByRole('slider')).toBeDisabled()
  })
})

describe('Slider (discrete)', () => {
  it('renders with options', () => {
    renderWithTheme(
      <Slider options={[10, 20, 30]} value={20} onChange={() => {}} />
    )
    const input = screen.getByRole('slider')
    expect(input).toHaveAttribute('min', '0')
    expect(input).toHaveAttribute('max', '2')
  })

  it('renders labels when enabled', () => {
    renderWithTheme(
      <Slider options={['Low', 'Med', 'High']} value="Med" onChange={() => {}} labels />
    )
    expect(screen.getByText('Low')).toBeInTheDocument()
    expect(screen.getByText('Med')).toBeInTheDocument()
    expect(screen.getByText('High')).toBeInTheDocument()
  })

  it('renders custom label function', () => {
    renderWithTheme(
      <Slider
        options={[1, 2, 3]}
        value={2}
        onChange={() => {}}
        labels={(v) => `Level ${v}`}
      />
    )
    expect(screen.getByText('Level 1')).toBeInTheDocument()
    expect(screen.getByText('Level 2')).toBeInTheDocument()
    expect(screen.getByText('Level 3')).toBeInTheDocument()
  })
})
