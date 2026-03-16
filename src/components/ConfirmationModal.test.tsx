import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme, userEvent } from '../__tests__/test-utils'
import { ConfirmationModal } from './ConfirmationModal'

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onConfirm: vi.fn(),
  title: 'Delete item?',
  message: 'This action cannot be undone.',
}

describe('ConfirmationModal', () => {
  it('renders title and message', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} />)
    expect(screen.getByText('Delete item?')).toBeInTheDocument()
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument()
  })

  it('uses default button text', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} />)
    expect(screen.getByText('Confirm')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('uses custom button text', () => {
    renderWithTheme(
      <ConfirmationModal {...defaultProps} confirmText="Delete" cancelText="Keep" />
    )
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.getByText('Keep')).toBeInTheDocument()
  })

  it('calls onConfirm when confirm button clicked', async () => {
    const onConfirm = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(<ConfirmationModal {...defaultProps} onConfirm={onConfirm} />)
    await user.click(screen.getByText('Confirm'))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it('calls onClose when cancel button clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(<ConfirmationModal {...defaultProps} onClose={onClose} />)
    await user.click(screen.getByText('Cancel'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('shows loading state', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} isLoading />)
    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })

  it('disables buttons during loading', () => {
    renderWithTheme(<ConfirmationModal {...defaultProps} isLoading />)
    const buttons = screen.getAllByRole('button').filter(b =>
      b.textContent === 'Cancel' || b.textContent === 'Processing...'
    )
    buttons.forEach(btn => expect(btn).toBeDisabled())
  })
})
