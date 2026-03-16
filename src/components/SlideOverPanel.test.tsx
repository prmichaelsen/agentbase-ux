import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme, userEvent } from '../__tests__/test-utils'
import { SlideOverPanel } from './SlideOverPanel'

describe('SlideOverPanel', () => {
  it('renders nothing when closed', () => {
    renderWithTheme(
      <SlideOverPanel open={false} onClose={() => {}}>
        <p>Panel content</p>
      </SlideOverPanel>
    )
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument()
  })

  it('renders children when open', async () => {
    renderWithTheme(
      <SlideOverPanel open={true} onClose={() => {}}>
        <p>Panel content</p>
      </SlideOverPanel>
    )
    // Uses requestAnimationFrame for mount, so wait
    await vi.waitFor(() => {
      expect(screen.getByText('Panel content')).toBeInTheDocument()
    })
  })
})
