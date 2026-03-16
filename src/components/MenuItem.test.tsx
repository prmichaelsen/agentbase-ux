import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme, userEvent } from '../__tests__/test-utils'
import { MenuItem } from './MenuItem'
import { Home } from 'lucide-react'

describe('MenuItem', () => {
  it('renders label', () => {
    renderWithTheme(<MenuItem icon={Home} label="Home" onClick={() => {}} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('handles click', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(<MenuItem icon={Home} label="Home" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is set', () => {
    renderWithTheme(<MenuItem icon={Home} label="Home" onClick={() => {}} disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when loading', () => {
    renderWithTheme(<MenuItem icon={Home} label="Home" onClick={() => {}} loading />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders suffix content', () => {
    renderWithTheme(
      <MenuItem icon={Home} label="Home" onClick={() => {}} suffix={<span data-testid="badge">3</span>} />
    )
    expect(screen.getByTestId('badge')).toBeInTheDocument()
  })
})
