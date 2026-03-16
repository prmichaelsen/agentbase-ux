/**
 * Paginator — Themeable page navigation with editable current page input.
 *
 * Pattern: |< < 3 4 [X] 5 6 > >|
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useTheme } from '../lib/theming'

interface PaginatorProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblings?: number
}

export function Paginator({
  currentPage,
  totalPages,
  onPageChange,
  siblings = 2,
}: PaginatorProps) {
  const t = useTheme()
  const [editValue, setEditValue] = useState(String(currentPage))
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!editing) setEditValue(String(currentPage))
  }, [currentPage, editing])

  const clamp = useCallback((page: number) => Math.max(1, Math.min(totalPages, page)), [totalPages])

  const commitEdit = useCallback(() => {
    setEditing(false)
    const parsed = parseInt(editValue, 10)
    if (!isNaN(parsed)) {
      const clamped = clamp(parsed)
      onPageChange(clamped)
      setEditValue(String(clamped))
    } else {
      setEditValue(String(currentPage))
    }
  }, [editValue, clamp, onPageChange, currentPage])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      commitEdit()
      inputRef.current?.blur()
    } else if (e.key === 'Escape') {
      setEditing(false)
      setEditValue(String(currentPage))
      inputRef.current?.blur()
    }
  }, [commitEdit, currentPage])

  const pages: number[] = []
  const start = Math.max(1, currentPage - siblings)
  const end = Math.min(totalPages, currentPage + siblings)
  for (let i = start; i <= end; i++) {
    if (i !== currentPage) pages.push(i)
  }
  const before = pages.filter((p) => p < currentPage)
  const after = pages.filter((p) => p > currentPage)

  const navBtn = `p-1 ${t.textMuted} ${t.hover} disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded`
  const pageBtn = `px-1.5 py-0.5 text-xs rounded transition-colors ${t.textMuted} ${t.hover}`

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-0.5">
      <button onClick={() => onPageChange(1)} disabled={currentPage <= 1} className={navBtn} aria-label="First page">
        <ChevronsLeft className="w-4 h-4" />
      </button>
      <button onClick={() => onPageChange(clamp(currentPage - 1))} disabled={currentPage <= 1} className={navBtn} aria-label="Previous page">
        <ChevronLeft className="w-4 h-4" />
      </button>
      {before.map((p) => (
        <button key={p} onClick={() => onPageChange(p)} className={pageBtn}>{p}</button>
      ))}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={editing ? editValue : String(currentPage)}
        onChange={(e) => setEditValue(e.target.value)}
        onFocus={() => { setEditing(true); setTimeout(() => inputRef.current?.select(), 0) }}
        onBlur={commitEdit}
        onKeyDown={handleKeyDown}
        className={`w-8 text-center text-xs font-medium rounded-md py-0.5 outline-none ${t.tabActive} ${t.inputFocus}`}
        aria-label="Current page"
      />
      {after.map((p) => (
        <button key={p} onClick={() => onPageChange(p)} className={pageBtn}>{p}</button>
      ))}
      <button onClick={() => onPageChange(clamp(currentPage + 1))} disabled={currentPage >= totalPages} className={navBtn} aria-label="Next page">
        <ChevronRight className="w-4 h-4" />
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage >= totalPages} className={navBtn} aria-label="Last page">
        <ChevronsRight className="w-4 h-4" />
      </button>
    </div>
  )
}
