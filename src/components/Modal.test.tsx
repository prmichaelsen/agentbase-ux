import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme, userEvent } from '../__tests__/test-utils'
import { Modal } from './Modal'

describe('Modal', () => {
  it('renders nothing when not open', () => {
    renderWithTheme(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    )
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('renders children when open', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={() => {}} title="My Modal">
        <p>Content</p>
      </Modal>
    )
    expect(screen.getByText('My Modal')).toBeInTheDocument()
  })

  it('calls onClose when escape is pressed', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    )
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose on escape when persistent', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose} persistent>
        <p>Content</p>
      </Modal>
    )
    await user.keyboard('{Escape}')
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders close button when not persistent', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    )
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
  })

  it('does not render close button when persistent', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={() => {}} persistent>
        <p>Content</p>
      </Modal>
    )
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument()
  })
})
