import { describe, it, expect, vi, beforeEach } from 'vitest'
import { copyToClipboard, shareOrCopyUrl } from './clipboard'

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('uses navigator.clipboard.writeText when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    const result = await copyToClipboard('hello')
    expect(writeText).toHaveBeenCalledWith('hello')
    expect(result).toBe(true)
  })

  it('falls back to execCommand when clipboard API throws', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('fail')) } })
    // Mock execCommand to succeed
    document.execCommand = vi.fn().mockReturnValue(true)

    const result = await copyToClipboard('hello')
    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(result).toBe(true)
  })

  it('returns false when both methods fail', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('fail')) } })
    document.execCommand = vi.fn().mockImplementation(() => { throw new Error('fail') })

    const result = await copyToClipboard('hello')
    expect(result).toBe(false)
  })
})

describe('shareOrCopyUrl', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns "shared" when navigator.share succeeds', async () => {
    Object.assign(navigator, { share: vi.fn().mockResolvedValue(undefined) })
    const result = await shareOrCopyUrl('https://example.com')
    expect(result).toBe('shared')
  })

  it('returns "cancelled" when navigator.share throws AbortError', async () => {
    const err = new DOMException('User cancelled', 'AbortError')
    Object.assign(navigator, { share: vi.fn().mockRejectedValue(err) })

    const result = await shareOrCopyUrl('https://example.com')
    expect(result).toBe('cancelled')
  })

  it('falls back to copy when navigator.share is not available', async () => {
    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true })
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })

    const result = await shareOrCopyUrl('https://example.com')
    expect(result).toBe('copied')
  })
})
