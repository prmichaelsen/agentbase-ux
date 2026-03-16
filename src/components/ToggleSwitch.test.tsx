import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme, userEvent } from '../__tests__/test-utils'
import { ToggleSwitch } from './ToggleSwitch'

describe('ToggleSwitch', () => {
  it('renders as a switch role', () => {
    renderWithTheme(<ToggleSwitch checked={false} onChange={() => {}} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('reflects checked state via aria-checked', () => {
    renderWithTheme(<ToggleSwitch checked={true} onChange={() => {}} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('calls onChange with toggled value on click', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(<ToggleSwitch checked={false} onChange={onChange} />)
    await user.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(<ToggleSwitch checked={false} onChange={onChange} disabled />)
    await user.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders label when provided', () => {
    renderWithTheme(<ToggleSwitch checked={false} onChange={() => {}} label="Dark mode" />)
    expect(screen.getByText('Dark mode')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    renderWithTheme(
      <ToggleSwitch checked={false} onChange={() => {}} label="Theme" description="Toggle dark mode" />
    )
    expect(screen.getByText('Toggle dark mode')).toBeInTheDocument()
  })

  it('toggles via keyboard space', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(<ToggleSwitch checked={false} onChange={onChange} />)
    screen.getByRole('switch').focus()
    await user.keyboard(' ')
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
