import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Clock, Calendar, Check } from 'lucide-react'

// ─── Constants ───

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// ─── Helpers ───

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function isPastDay(year: number, month: number, day: number) {
  const today = new Date()
  const date = new Date(year, month, day)
  today.setHours(0, 0, 0, 0)
  return date < today
}

function isTodayDate(year: number, month: number, day: number) {
  const today = new Date()
  return (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  )
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatHour(h: number) {
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h
  const suffix = h >= 12 ? 'pm' : 'am'
  return `${h12} ${suffix}`
}

// ─── Types ───

export interface DateTimePickerProps {
  defaultDate?: Date
  onConfirm?: (date: Date) => void
  onChange?: (date: Date) => void
  confirmLabel?: string
  emptyLabel?: string
  className?: string
  width?: number
}

type CalendarView = 'days' | 'months' | 'years'

// ─── Component ───

export function DateTimePicker({
  defaultDate,
  onConfirm,
  onChange,
  confirmLabel = 'Confirm',
  emptyLabel = 'Pick a date first',
  className = '',
  width = 340,
}: DateTimePickerProps) {
  const now = new Date()
  const initial = defaultDate ?? now

  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(initial.getDate())
  const [selectedHour, setSelectedHour] = useState(initial.getHours())
  const [selectedMinute, setSelectedMinute] = useState(initial.getMinutes())

  const [calendarView, setCalendarView] = useState<CalendarView>('days')
  const [yearRangeStart, setYearRangeStart] = useState(
    Math.floor(initial.getFullYear() / 12) * 12
  )

  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const canGoPrev =
    calendarView === 'days'
      ? !(viewYear === now.getFullYear() && viewMonth === now.getMonth())
      : calendarView === 'months'
        ? viewYear > now.getFullYear()
        : yearRangeStart > now.getFullYear()

  const handlePrev = useCallback(() => {
    if (calendarView === 'years') {
      setYearRangeStart((y) => y - 12)
    } else if (calendarView === 'months') {
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => {
        if (m === 0) { setViewYear((y) => y - 1); return 11 }
        return m - 1
      })
    }
  }, [calendarView])

  const handleNext = useCallback(() => {
    if (calendarView === 'years') {
      setYearRangeStart((y) => y + 12)
    } else if (calendarView === 'months') {
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => {
        if (m === 11) { setViewYear((y) => y + 1); return 0 }
        return m + 1
      })
    }
  }, [calendarView])

  useEffect(() => {
    const hourEl = hourRef.current?.querySelector('[data-selected="true"]')
    if (hourEl) hourEl.scrollIntoView({ block: 'center', behavior: 'instant' })
    const minEl = minuteRef.current?.querySelector('[data-selected="true"]')
    if (minEl) minEl.scrollIntoView({ block: 'center', behavior: 'instant' })
  }, [])

  useEffect(() => {
    if (selectedDay !== null && onChange) {
      onChange(new Date(viewYear, viewMonth, selectedDay, selectedHour, selectedMinute))
    }
  }, [viewYear, viewMonth, selectedDay, selectedHour, selectedMinute, onChange])

  const handleConfirm = useCallback(() => {
    if (selectedDay === null || !onConfirm) return
    onConfirm(new Date(viewYear, viewMonth, selectedDay, selectedHour, selectedMinute))
  }, [viewYear, viewMonth, selectedDay, selectedHour, selectedMinute, onConfirm])

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  return (
    <div className={className} style={{ width }}>
      <div className="rounded-2xl border border-border-default bg-bg-card shadow-2xl overflow-hidden">
        {/* Calendar */}
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-primary" />
              {calendarView === 'years' ? (
                <span className="text-sm font-semibold text-text-primary">
                  {yearRangeStart} – {yearRangeStart + 11}
                </span>
              ) : calendarView === 'months' ? (
                <button
                  onClick={() => {
                    setYearRangeStart(Math.floor(viewYear / 12) * 12)
                    setCalendarView('years')
                  }}
                  className="text-sm font-semibold text-text-primary hover:text-brand-accent transition-colors"
                >
                  {viewYear}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setCalendarView('months')}
                    className="text-sm font-semibold text-text-primary hover:text-brand-accent transition-colors"
                  >
                    {MONTHS[viewMonth]}
                  </button>
                  <button
                    onClick={() => {
                      setYearRangeStart(Math.floor(viewYear / 12) * 12)
                      setCalendarView('years')
                    }}
                    className="text-sm font-semibold text-text-primary hover:text-brand-accent transition-colors"
                  >
                    {viewYear}
                  </button>
                </>
              )}
            </div>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Year grid */}
          {calendarView === 'years' && (
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: 12 }, (_, i) => {
                const year = yearRangeStart + i
                const isPastYear = year < now.getFullYear()
                const isCurrent = year === now.getFullYear()
                const isSelected = year === viewYear
                return (
                  <button
                    key={year}
                    disabled={isPastYear}
                    onClick={() => { setViewYear(year); setCalendarView('months') }}
                    className={`
                      py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                      ${isPastYear
                        ? 'text-text-muted cursor-not-allowed'
                        : isSelected
                          ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-md'
                          : isCurrent
                            ? 'text-brand-accent hover:bg-bg-hover'
                            : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                      }
                    `}
                  >
                    {year}
                  </button>
                )
              })}
            </div>
          )}

          {/* Month grid */}
          {calendarView === 'months' && (
            <div className="grid grid-cols-3 gap-1.5">
              {MONTHS.map((month, i) => {
                const isPastMonth = viewYear === now.getFullYear() && i < now.getMonth()
                const isCurrent = viewYear === now.getFullYear() && i === now.getMonth()
                const isSelected = i === viewMonth
                return (
                  <button
                    key={month}
                    disabled={isPastMonth}
                    onClick={() => {
                      setViewMonth(i)
                      const maxDay = getDaysInMonth(viewYear, i)
                      if (selectedDay !== null && selectedDay > maxDay) setSelectedDay(maxDay)
                      setCalendarView('days')
                    }}
                    className={`
                      py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                      ${isPastMonth
                        ? 'text-text-muted cursor-not-allowed'
                        : isSelected
                          ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-md'
                          : isCurrent
                            ? 'text-brand-accent hover:bg-bg-hover'
                            : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                      }
                    `}
                  >
                    {month.slice(0, 3)}
                  </button>
                )
              })}
            </div>
          )}

          {/* Day grid */}
          {calendarView === 'days' && (
            <>
              <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-[11px] font-medium text-text-muted py-1">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-0.5">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`e-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const past = isPastDay(viewYear, viewMonth, day)
                  const today = isTodayDate(viewYear, viewMonth, day)
                  const selected = selectedDay === day
                  return (
                    <button
                      key={day}
                      disabled={past}
                      onClick={() => setSelectedDay(day)}
                      className={`
                        relative h-9 rounded-lg text-sm font-medium transition-all duration-150
                        ${past
                          ? 'text-text-muted cursor-not-allowed'
                          : selected
                            ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg'
                            : today
                              ? 'text-brand-accent hover:bg-bg-hover'
                              : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                        }
                      `}
                    >
                      {day}
                      {today && !selected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-accent" />
                      )}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border-default to-transparent mx-4" />

        {/* Time scroll columns */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-3.5 h-3.5 text-brand-primary" />
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Time
            </span>
            <span className="ml-auto text-sm font-mono text-text-primary">
              {formatHour(selectedHour)} : {pad(selectedMinute)}
            </span>
          </div>

          <div className="flex gap-3">
            {/* Hour column */}
            <div className="flex-1 relative">
              <div
                ref={hourRef}
                className="h-[140px] overflow-y-auto rounded-xl bg-bg-elevated/50 border border-border-subtle scroll-smooth"
                style={{ scrollbarWidth: 'thin' }}
              >
                <div className="p-1">
                  {hours.map((h) => (
                    <button
                      key={h}
                      data-selected={selectedHour === h}
                      onClick={() => setSelectedHour(h)}
                      className={`
                        w-full px-3 py-1.5 rounded-lg text-sm transition-all duration-100
                        ${selectedHour === h
                          ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold shadow-md'
                          : 'text-text-muted hover:text-text-primary hover:bg-bg-hover'
                        }
                      `}
                    >
                      {formatHour(h)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-bg-card to-transparent rounded-t-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-bg-card to-transparent rounded-b-xl pointer-events-none" />
            </div>

            {/* Minute column */}
            <div className="flex-1 relative">
              <div
                ref={minuteRef}
                className="h-[140px] overflow-y-auto rounded-xl bg-bg-elevated/50 border border-border-subtle scroll-smooth"
                style={{ scrollbarWidth: 'thin' }}
              >
                <div className="p-1">
                  {minutes.map((m) => (
                    <button
                      key={m}
                      data-selected={selectedMinute === m}
                      onClick={() => setSelectedMinute(m)}
                      className={`
                        w-full px-3 py-1.5 rounded-lg text-sm transition-all duration-100
                        ${selectedMinute === m
                          ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold shadow-md'
                          : 'text-text-muted hover:text-text-primary hover:bg-bg-hover'
                        }
                      `}
                    >
                      :{pad(m)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-bg-card to-transparent rounded-t-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-bg-card to-transparent rounded-b-xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Confirm button */}
        {onConfirm && (
          <div className="px-5 pb-5">
            <button
              onClick={handleConfirm}
              disabled={selectedDay === null}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
            >
              {selectedDay !== null ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  {confirmLabel}
                </span>
              ) : (
                emptyLabel
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
