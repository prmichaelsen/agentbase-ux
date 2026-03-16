import React from 'react';
import { Sun, Moon, Box, Layers, ToggleLeft, SlidersHorizontal, PanelRight, MousePointerClick, BookOpen, MessageSquare, Timer, Clipboard, Clock, Palette, LayoutDashboard } from 'lucide-react';
import type { ThemeMode } from './App';

interface SidebarProps {
  activePage: string;
  theme: ThemeMode;
  onThemeToggle: () => void;
}

const sections = [
  {
    title: 'Getting Started',
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'theming', label: 'Theming', icon: Palette },
    ],
  },
  {
    title: 'Components',
    items: [
      { id: 'button', label: 'Button', icon: Box },
      { id: 'modal', label: 'Modal', icon: Layers },
      { id: 'confirmation-modal', label: 'ConfirmationModal', icon: MessageSquare },
      { id: 'menu-item', label: 'MenuItem', icon: MousePointerClick },
      { id: 'paginator', label: 'Paginator', icon: BookOpen },
      { id: 'popover', label: 'Popover', icon: PanelRight },
      { id: 'slider', label: 'Slider', icon: SlidersHorizontal },
      { id: 'slide-over-panel', label: 'SlideOverPanel', icon: PanelRight },
      { id: 'toggle-switch', label: 'ToggleSwitch', icon: ToggleLeft },
    ],
  },
  {
    title: 'Hooks',
    items: [
      { id: 'use-debounce', label: 'useDebounce', icon: Timer },
    ],
  },
  {
    title: 'Utilities',
    items: [
      { id: 'clipboard', label: 'Clipboard', icon: Clipboard },
      { id: 'format-time', label: 'Format Time', icon: Clock },
    ],
  },
];

export function Sidebar({ activePage, theme, onThemeToggle }: SidebarProps) {
  return (
    <div className="h-full flex flex-col bg-bg-sidebar border-r border-border-default">
      {/* Header */}
      <div className="px-5 py-5 border-b border-border-default">
        <div className="flex items-center justify-between">
          <a href="#overview" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
              <span className="text-white text-xs font-bold">ux</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-text-primary leading-none">agentbase-ux</div>
              <div className="text-[11px] text-text-muted mt-0.5">v0.0.2</div>
            </div>
          </a>
          <button
            onClick={onThemeToggle}
            className="p-1.5 rounded-lg hover:bg-bg-hover text-text-secondary transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {sections.map(section => (
          <div key={section.title}>
            <div className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const Icon = item.icon;
                const active = activePage === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`
                      flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors
                      ${active
                        ? 'bg-brand-primary/15 text-brand-primary font-medium'
                        : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                      }
                    `}
                  >
                    <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border-default">
        <a
          href="https://github.com/prmichaelsen/agentbase-ux"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-text-muted hover:text-text-secondary transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
