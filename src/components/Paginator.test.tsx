import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme, userEvent } from '../__tests__/test-utils'
import { Paginator } from './Paginator'

describe('Paginator', () => {
  it('renders nothing when totalPages is 1', () => {
    renderWithTheme(
      <Paginator currentPage={1} totalPages={1} onPageChange={() => {}} />
    )
    expect(screen.queryByLabelText('First page')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    renderWithTheme(
      <Paginator currentPage={3} totalPages={10} onPageChange={() => {}} />
    )
    expect(screen.getByLabelText('First page')).toBeInTheDocument()
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
    expect(screen.getByLabelText('Last page')).toBeInTheDocument()
  })

  it('disables first/previous on page 1', () => {
    renderWithTheme(
      <Paginator currentPage={1} totalPages={5} onPageChange={() => {}} />
    )
    expect(screen.getByLabelText('First page')).toBeDisabled()
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
  })

  it('disables next/last on last page', () => {
    renderWithTheme(
      <Paginator currentPage={5} totalPages={5} onPageChange={() => {}} />
    )
    expect(screen.getByLabelText('Next page')).toBeDisabled()
    expect(screen.getByLabelText('Last page')).toBeDisabled()
  })

  it('calls onPageChange when next is clicked', async () => {
    const onPageChange = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(
      <Paginator currentPage={3} totalPages={10} onPageChange={onPageChange} />
    )
    await user.click(screen.getByLabelText('Next page'))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('calls onPageChange when first page is clicked', async () => {
    const onPageChange = vi.fn()
    const user = userEvent.setup()
    renderWithTheme(
      <Paginator currentPage={5} totalPages={10} onPageChange={onPageChange} />
    )
    await user.click(screen.getByLabelText('First page'))
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it('shows current page in input', () => {
    renderWithTheme(
      <Paginator currentPage={5} totalPages={10} onPageChange={() => {}} />
    )
    expect(screen.getByLabelText('Current page')).toHaveValue('5')
  })

  it('renders sibling page numbers', () => {
    renderWithTheme(
      <Paginator currentPage={5} totalPages={10} onPageChange={() => {}} siblings={2} />
    )
    // Should show pages 3, 4, [5], 6, 7
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
  })
})
