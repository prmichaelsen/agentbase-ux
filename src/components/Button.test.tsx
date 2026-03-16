import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme, userEvent } from '../__tests__/test-utils'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    renderWithTheme(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire click when disabled', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(<Button onClick={onClick} disabled>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies disabled styling', () => {
    renderWithTheme(<Button disabled>Click</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn.className).toContain('opacity-50')
  })

  it('renders icon when provided', () => {
    renderWithTheme(<Button icon={<span data-testid="icon">*</span>}>With Icon</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('applies size classes', () => {
    renderWithTheme(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button').className).toContain('px-6')
  })

  it('applies full width', () => {
    renderWithTheme(<Button fullWidth>Full</Button>)
    expect(screen.getByRole('button').className).toContain('w-full')
  })
})
