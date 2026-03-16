import { describe, it, expect, vi, afterEach } from 'vitest'
import { formatExactTime, getRelativeTime } from './format-time'

describe('formatExactTime', () => {
  it('formats a date string into readable time with weekday and date', () => {
    const result = formatExactTime('2026-03-16T14:30:00Z')
    // Should contain time components and date
    expect(result).toMatch(/\d{1,2}:\d{2}\s*(AM|PM)/i)
    expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{2}/)
  })

  it('includes the weekday abbreviation', () => {
    // 2026-03-16 is a Monday
    const result = formatExactTime('2026-03-16T12:00:00Z')
    expect(result).toMatch(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/)
  })
})

describe('getRelativeTime', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns "Just now" for times less than a minute ago', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-16T12:00:30Z'))
    expect(getRelativeTime('2026-03-16T12:00:00Z')).toBe('Just now')
  })

  it('returns minutes ago for times less than an hour ago', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-16T12:05:00Z'))
    expect(getRelativeTime('2026-03-16T12:00:00Z')).toBe('5m ago')
  })

  it('returns hours ago for times less than a day ago', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-16T15:00:00Z'))
    expect(getRelativeTime('2026-03-16T12:00:00Z')).toBe('3h ago')
  })

  it('returns days ago for times less than a week ago', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-19T12:00:00Z'))
    expect(getRelativeTime('2026-03-16T12:00:00Z')).toBe('3d ago')
  })

  it('returns weeks ago for times less than a month ago', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-30T12:00:00Z'))
    expect(getRelativeTime('2026-03-16T12:00:00Z')).toBe('2w ago')
  })

  it('returns formatted date for times more than a month ago', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-16T12:00:00Z'))
    const result = getRelativeTime('2026-03-16T12:00:00Z')
    expect(result).toMatch(/Mar/)
    expect(result).toMatch(/16/)
    expect(result).toMatch(/2026/)
  })
})
