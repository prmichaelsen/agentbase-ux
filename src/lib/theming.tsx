import { createContext, useContext, type ReactNode } from 'react'

/** Pre-composed Tailwind class strings for component roles.
 *  Components consume these via `useTheme()` — they never reference
 *  raw color classes directly. */
export interface Theme {
  // Layout
  page: string
  sidebar: string
  card: string
  elevated: string
  hover: string
  active: string
  border: string
  borderSubtle: string
  input: string
  inputFocus: string

  // Text
  textPrimary: string
  textSecondary: string
  textMuted: string

  // Buttons
  buttonPrimary: string
  buttonSecondary: string
  buttonGhost: string
  buttonDanger: string
  buttonSuccess: string
  buttonWarning: string

  // Overlay
  overlay: string

  // Toggle
  toggleOn: string
  toggleOff: string

  // Slider
  sliderTrack: string
  sliderFill: string

  // Tabs
  tabActive: string
  tabInactive: string

  // Menu
  menuItem: string
  menuItemHover: string
  menuItemDanger: string

  // Messages / Chat
  messageSelf: string
  messageOther: string
  messageAgent: string
  messageSystem: string

  // Status
  statusOnline: string
  statusOffline: string
  statusAway: string

  // Badges
  badgeDefault: string
  badgeSuccess: string
  badgeWarning: string
  badgeDanger: string
  badgeInfo: string

  // Notifications
  notificationBadge: string
  notificationUnread: string
  notificationRead: string
}

const darkTheme: Theme = {
  // Layout
  page: 'bg-bg-page text-text-primary',
  sidebar: 'bg-bg-sidebar border-r border-border-default',
  card: 'bg-bg-card border border-border-default rounded-lg',
  elevated: 'bg-bg-elevated',
  hover: 'hover:bg-bg-hover',
  active: 'bg-bg-active',
  border: 'border border-border-default',
  borderSubtle: 'border border-border-subtle',
  input:
    'bg-bg-input border border-border-default text-text-primary placeholder:text-text-muted',
  inputFocus: 'focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30',

  // Text
  textPrimary: 'text-text-primary',
  textSecondary: 'text-text-secondary',
  textMuted: 'text-text-muted',

  // Buttons
  buttonPrimary: 'bg-brand-primary text-white hover:bg-brand-primary/90',
  buttonSecondary: 'bg-brand-secondary text-white hover:bg-brand-secondary/90',
  buttonGhost:
    'bg-transparent text-text-secondary hover:bg-bg-hover hover:text-text-primary',
  buttonDanger: 'bg-brand-danger text-white hover:bg-brand-danger/90',
  buttonSuccess: 'bg-brand-success text-white hover:bg-brand-success/90',
  buttonWarning: 'bg-brand-warning text-white hover:bg-brand-warning/90',

  // Overlay
  overlay: 'bg-black/50 backdrop-blur-sm',

  // Toggle
  toggleOn: 'bg-brand-primary',
  toggleOff: 'bg-bg-elevated',

  // Slider
  sliderTrack: 'bg-bg-elevated',
  sliderFill: 'bg-brand-primary',

  // Tabs
  tabActive: 'bg-brand-primary text-white',
  tabInactive: 'text-text-secondary hover:bg-bg-hover hover:text-text-primary',

  // Menu
  menuItem: 'text-text-secondary hover:text-text-primary hover:bg-bg-hover',
  menuItemHover: 'bg-bg-hover text-text-primary',
  menuItemDanger: 'text-brand-danger hover:bg-brand-danger/10',

  // Messages
  messageSelf: 'bg-brand-primary/20 border-l-2 border-brand-primary/50',
  messageOther: 'bg-bg-card',
  messageAgent: 'bg-brand-accent/10 border-l-2 border-brand-accent/50',
  messageSystem: 'bg-bg-elevated text-text-muted text-sm italic',

  // Status
  statusOnline: 'bg-brand-success',
  statusOffline: 'bg-text-muted',
  statusAway: 'bg-brand-warning',

  // Badges
  badgeDefault: 'bg-bg-elevated text-text-secondary',
  badgeSuccess: 'bg-brand-success/15 text-brand-success',
  badgeWarning: 'bg-brand-warning/15 text-brand-warning',
  badgeDanger: 'bg-brand-danger/15 text-brand-danger',
  badgeInfo: 'bg-brand-info/15 text-brand-info',

  // Notifications
  notificationBadge: 'bg-brand-danger text-white',
  notificationUnread: 'bg-brand-primary/5',
  notificationRead: 'bg-bg-card',
}

const lightTheme: Theme = {
  // Layout
  page: 'bg-bg-page text-text-primary',
  sidebar: 'bg-bg-sidebar border-r border-border-default',
  card: 'bg-bg-card border border-border-default rounded-lg shadow-sm',
  elevated: 'bg-bg-elevated',
  hover: 'hover:bg-bg-hover',
  active: 'bg-bg-active',
  border: 'border border-border-default',
  borderSubtle: 'border border-border-subtle',
  input:
    'bg-bg-input border border-border-default text-text-primary placeholder:text-text-muted',
  inputFocus: 'focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30',

  // Text
  textPrimary: 'text-text-primary',
  textSecondary: 'text-text-secondary',
  textMuted: 'text-text-muted',

  // Buttons
  buttonPrimary: 'bg-brand-primary text-white hover:bg-brand-primary/90',
  buttonSecondary: 'bg-brand-secondary text-white hover:bg-brand-secondary/90',
  buttonGhost:
    'bg-transparent text-text-secondary hover:bg-bg-hover hover:text-text-primary',
  buttonDanger: 'bg-brand-danger text-white hover:bg-brand-danger/90',
  buttonSuccess: 'bg-brand-success text-white hover:bg-brand-success/90',
  buttonWarning: 'bg-brand-warning text-white hover:bg-brand-warning/90',

  // Overlay
  overlay: 'bg-black/40 backdrop-blur-sm',

  // Toggle
  toggleOn: 'bg-brand-primary',
  toggleOff: 'bg-border-default',

  // Slider
  sliderTrack: 'bg-bg-elevated',
  sliderFill: 'bg-brand-primary',

  // Tabs
  tabActive: 'bg-brand-primary text-white',
  tabInactive: 'text-text-secondary hover:bg-bg-hover hover:text-text-primary',

  // Menu
  menuItem: 'text-text-secondary hover:text-text-primary hover:bg-bg-hover',
  menuItemHover: 'bg-bg-hover text-text-primary',
  menuItemDanger: 'text-brand-danger hover:bg-brand-danger/10',

  // Messages
  messageSelf: 'bg-brand-primary/10 border-l-2 border-brand-primary/40',
  messageOther: 'bg-bg-card',
  messageAgent: 'bg-brand-accent/5 border-l-2 border-brand-accent/40',
  messageSystem: 'bg-bg-elevated text-text-muted text-sm italic',

  // Status
  statusOnline: 'bg-brand-success',
  statusOffline: 'bg-text-muted',
  statusAway: 'bg-brand-warning',

  // Badges
  badgeDefault: 'bg-bg-elevated text-text-secondary',
  badgeSuccess: 'bg-brand-success/15 text-brand-success',
  badgeWarning: 'bg-brand-warning/15 text-brand-warning',
  badgeDanger: 'bg-brand-danger/15 text-brand-danger',
  badgeInfo: 'bg-brand-info/15 text-brand-info',

  // Notifications
  notificationBadge: 'bg-brand-danger text-white',
  notificationUnread: 'bg-brand-primary/5',
  notificationRead: 'bg-bg-card',
}

export const themes = { dark: darkTheme, light: lightTheme } as const
export type ThemeName = keyof typeof themes

const ThemingContext = createContext<Theme>(darkTheme)

export function ThemingProvider({
  theme = 'dark',
  children,
}: {
  theme?: ThemeName
  children: ReactNode
}) {
  return (
    <ThemingContext.Provider value={themes[theme]}>
      <div data-theme={theme} className={themes[theme].page}>
        {children}
      </div>
    </ThemingContext.Provider>
  )
}

export function useTheme(): Theme {
  return useContext(ThemingContext)
}
