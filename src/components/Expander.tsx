import { useState, useRef, useEffect, type ReactNode } from 'react'
import {
  ChevronDown,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Eye,
  EyeOff,
  CornerDownRight,
} from 'lucide-react'

/* ─── Collapse animation hook ─── */

export function useCollapse(open: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(open ? undefined : 0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open) {
      setHeight(el.scrollHeight)
      const id = setTimeout(() => setHeight(undefined), 300)
      return () => clearTimeout(id)
    } else {
      setHeight(el.scrollHeight)
      requestAnimationFrame(() => requestAnimationFrame(() => setHeight(0)))
    }
  }, [open])

  return {
    ref,
    style: {
      height: height != null ? `${height}px` : 'auto',
      overflow: 'hidden' as const,
      transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  }
}

/* ─── Types ─── */

export type ExpanderVariant =
  | 'gradient-glow'
  | 'neon-accent'
  | 'glass-float'
  | 'slide-arrow'
  | 'border-sweep'
  | 'stacked-lift'
  | 'visibility'
  | 'thread'
  | 'highlight'
  | 'segmented'

export interface ExpanderProps {
  title: string
  count?: number
  open: boolean
  onToggle: () => void
  children: ReactNode
}

/* ─── Variant implementations ─── */

function GradientGlow({ title, open, onToggle, children }: ExpanderProps) {
  const collapse = useCollapse(open)
  return (
    <div>
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between py-1.5 text-left transition-colors duration-500">
        <span className="text-sm font-semibold text-text-secondary">{title}</span>
        <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div ref={collapse.ref} style={collapse.style}>
        {children}
      </div>
    </div>
  )
}

function NeonAccent({ title, open, onToggle, children }: ExpanderProps) {
  const collapse = useCollapse(open)
  return (
    <div className="relative flex rounded-lg overflow-hidden">
      <div className={`w-1 shrink-0 transition-all duration-500 ${open ? 'bg-brand-success shadow-[0_0_12px_rgba(74,222,128,0.4)]' : 'bg-border-default'}`} />
      <div className="flex-1">
        <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-4 py-2.5 text-left">
          <span className="text-sm text-text-secondary">{title}</span>
          <div className={`w-5 h-5 rounded-full border transition-all duration-300 flex items-center justify-center ${open ? 'border-brand-success bg-brand-success/10' : 'border-border-default'}`}>
            {open ? <Minus className="w-2.5 h-2.5 text-brand-success" /> : <Plus className="w-2.5 h-2.5 text-text-muted" />}
          </div>
        </button>
        <div ref={collapse.ref} style={collapse.style}>
          <div className="px-4 pb-3">{children}</div>
        </div>
      </div>
    </div>
  )
}

function GlassFloat({ title, open, onToggle, children }: ExpanderProps) {
  const collapse = useCollapse(open)
  return (
    <div
      className={`rounded-xl border transition-all duration-500 ${open ? 'bg-bg-elevated/40 border-border-default shadow-lg' : 'bg-transparent border-transparent'}`}
      style={{ backdropFilter: open ? 'blur(12px)' : undefined }}
    >
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-4 py-2.5 text-left">
        <span className="text-sm text-text-secondary">{title}</span>
        <Sparkles className={`w-4 h-4 transition-all duration-300 ${open ? 'text-brand-accent rotate-12 scale-110' : 'text-text-muted'}`} />
      </button>
      <div ref={collapse.ref} style={collapse.style}>
        <div className="px-4 pb-3">{children}</div>
      </div>
    </div>
  )
}

function SlideArrow({ title, open, onToggle, children }: ExpanderProps) {
  const collapse = useCollapse(open)
  return (
    <div className="rounded-lg overflow-hidden">
      <button type="button" onClick={onToggle} className="w-full flex items-center gap-3 px-4 py-2.5 text-left group">
        <div className={`w-6 h-6 rounded flex items-center justify-center transition-all duration-300 ${open ? 'bg-brand-primary/20 rotate-90' : 'bg-bg-elevated group-hover:bg-bg-active'}`}>
          <ArrowRight className={`w-3.5 h-3.5 transition-colors duration-300 ${open ? 'text-brand-primary' : 'text-text-muted'}`} />
        </div>
        <span className="text-sm text-text-secondary">{title}</span>
      </button>
      <div ref={collapse.ref} style={collapse.style}>
        <div className="px-4 pb-3 pl-[3.25rem]">{children}</div>
      </div>
    </div>
  )
}

function BorderSweep({ title, count, open, onToggle, children }: ExpanderProps) {
  const collapse = useCollapse(open)
  return (
    <div className="relative rounded-lg overflow-hidden">
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-4 py-2.5 text-left">
        <span className="text-sm text-text-secondary">{title}</span>
        <span className={`text-xs font-mono px-1.5 py-0.5 rounded transition-all duration-300 ${open ? 'bg-brand-warning/10 text-brand-warning' : 'bg-bg-elevated text-text-muted'}`}>
          {count ?? 0}
        </span>
      </button>
      <div ref={collapse.ref} style={collapse.style}>
        <div className="px-4 pb-3">{children}</div>
      </div>
      <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-warning to-brand-danger transition-all duration-500 ease-out ${open ? 'w-full' : 'w-0'}`} />
    </div>
  )
}

function StackedLift({ title, open, onToggle, children }: ExpanderProps) {
  const collapse = useCollapse(open)
  return (
    <div className="relative pt-1.5">
      <div className={`absolute inset-x-2 top-0 h-3 rounded-t-lg border border-b-0 border-border-subtle bg-bg-elevated/15 transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 translate-y-1'}`} />
      <div className={`absolute inset-x-1 top-[3px] h-3 rounded-t-lg border border-b-0 border-border-default bg-bg-elevated/20 transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 translate-y-0.5'}`} />
      <div className="relative">
        <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-4 py-2.5 text-left">
          <span className="text-sm text-text-secondary">{title}</span>
          <Layers className={`w-4 h-4 transition-all duration-300 ${open ? 'text-brand-danger -translate-y-0.5' : 'text-text-muted'}`} />
        </button>
        <div ref={collapse.ref} style={collapse.style}>
          <div className="px-4 pb-3">{children}</div>
        </div>
      </div>
    </div>
  )
}

function Visibility({ title, open, onToggle, children }: ExpanderProps) {
  const collapse = useCollapse(open)
  return (
    <div>
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-4 py-2.5 text-left">
        <div className="flex items-center gap-2.5">
          <div className={`relative w-8 h-4 rounded-full transition-colors duration-300 ${open ? 'bg-brand-accent' : 'bg-bg-elevated'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all duration-300 ${open ? 'left-[1.125rem]' : 'left-0.5'}`} />
          </div>
          <span className="text-sm text-text-secondary">{title}</span>
        </div>
        {open ? <Eye className="w-4 h-4 text-brand-accent" /> : <EyeOff className="w-4 h-4 text-text-muted" />}
      </button>
      <div ref={collapse.ref} style={collapse.style}>
        <div className="px-4 pb-3">{children}</div>
      </div>
    </div>
  )
}

function Thread({ title, open, onToggle, children }: ExpanderProps) {
  const collapse = useCollapse(open)
  return (
    <div>
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-4 py-2.5 text-left">
        <span className="text-sm text-text-secondary">{title}</span>
        <CornerDownRight className={`w-4 h-4 transition-all duration-300 ${open ? 'text-brand-info' : 'text-text-muted'}`} />
      </button>
      <div ref={collapse.ref} style={collapse.style}>
        <div className="flex gap-3 px-4 pb-3">
          <div className="w-[2px] shrink-0 rounded-full bg-gradient-to-b from-brand-info to-transparent" />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}

function Highlight({ title, open, onToggle, children }: ExpanderProps) {
  const collapse = useCollapse(open)
  return (
    <div className={`rounded-lg transition-all duration-500 ${open ? 'bg-brand-primary/[0.06] ring-1 ring-brand-primary/20' : ''}`}>
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-4 py-2.5 text-left">
        <span className="text-sm text-text-secondary">{title}</span>
        <Zap className={`w-4 h-4 transition-all duration-300 ${open ? 'text-brand-primary scale-110' : 'text-text-muted'}`} />
      </button>
      <div ref={collapse.ref} style={collapse.style}>
        <div className="px-4 pb-3">{children}</div>
      </div>
    </div>
  )
}

function Segmented({ title, open, onToggle, children }: ExpanderProps) {
  const collapse = useCollapse(open)
  return (
    <div className="overflow-hidden">
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-4 py-2.5 text-left">
        <span className="text-sm text-text-secondary">{title}</span>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${open ? 'bg-brand-primary' : 'bg-border-default'}`}
              style={{ transitionDelay: open ? `${i * 75}ms` : `${(2 - i) * 75}ms` }}
            />
          ))}
        </div>
      </button>
      <div ref={collapse.ref} style={collapse.style}>
        <div className="px-4 pb-3">{children}</div>
      </div>
    </div>
  )
}

/* ─── Variant registry ─── */

const VARIANT_MAP: Record<ExpanderVariant, React.ComponentType<ExpanderProps>> = {
  'gradient-glow': GradientGlow,
  'neon-accent': NeonAccent,
  'glass-float': GlassFloat,
  'slide-arrow': SlideArrow,
  'border-sweep': BorderSweep,
  'stacked-lift': StackedLift,
  'visibility': Visibility,
  'thread': Thread,
  'highlight': Highlight,
  'segmented': Segmented,
}

export const EXPANDER_VARIANTS: { id: ExpanderVariant; label: string }[] = [
  { id: 'gradient-glow', label: 'Gradient Glow' },
  { id: 'neon-accent', label: 'Neon Accent' },
  { id: 'glass-float', label: 'Glass Float' },
  { id: 'slide-arrow', label: 'Slide Arrow' },
  { id: 'border-sweep', label: 'Border Sweep' },
  { id: 'stacked-lift', label: 'Stacked Lift' },
  { id: 'visibility', label: 'Visibility' },
  { id: 'thread', label: 'Thread' },
  { id: 'highlight', label: 'Highlight' },
  { id: 'segmented', label: 'Segmented' },
]

/* ─── Public component ─── */

export function Expander({
  variant = 'gradient-glow',
  ...props
}: ExpanderProps & { variant?: ExpanderVariant }) {
  const Component = VARIANT_MAP[variant]
  return <Component {...props} />
}
