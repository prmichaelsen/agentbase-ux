import React, { useState, useEffect } from 'react';
import { ThemingProvider } from '@prmichaelsen/agentbase-ux';
import { Sidebar } from './Sidebar';
import { ButtonDemo } from './demos/ButtonDemo';
import { ModalDemo } from './demos/ModalDemo';
import { ConfirmationModalDemo } from './demos/ConfirmationModalDemo';
import { MenuItemDemo } from './demos/MenuItemDemo';
import { PaginatorDemo } from './demos/PaginatorDemo';
import { PopoverDemo } from './demos/PopoverDemo';
import { SliderDemo } from './demos/SliderDemo';
import { SlideOverPanelDemo } from './demos/SlideOverPanelDemo';
import { ToggleSwitchDemo } from './demos/ToggleSwitchDemo';
import { UseDebounceDemo } from './demos/UseDebounceDemo';
import { ClipboardDemo } from './demos/ClipboardDemo';
import { FormatTimeDemo } from './demos/FormatTimeDemo';
import { ThemingDemo } from './demos/ThemingDemo';
import { Overview } from './demos/Overview';
import { Menu, X } from 'lucide-react';

export type ThemeMode = 'dark' | 'light';

const pages: Record<string, React.FC> = {
  overview: Overview,
  button: ButtonDemo,
  modal: ModalDemo,
  'confirmation-modal': ConfirmationModalDemo,
  'menu-item': MenuItemDemo,
  paginator: PaginatorDemo,
  popover: PopoverDemo,
  slider: SliderDemo,
  'slide-over-panel': SlideOverPanelDemo,
  'toggle-switch': ToggleSwitchDemo,
  'use-debounce': UseDebounceDemo,
  clipboard: ClipboardDemo,
  'format-time': FormatTimeDemo,
  theming: ThemingDemo,
};

function getHash() {
  return window.location.hash.replace('#', '') || 'overview';
}

export function App() {
  const [activePage, setActivePage] = useState(getHash);
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setActivePage(getHash());
      setSidebarOpen(false);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const Page = pages[activePage] ?? Overview;

  return (
    <ThemingProvider theme={theme}>
      <div className="flex h-screen bg-bg-page text-text-primary overflow-hidden">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 lg:relative lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar
            activePage={activePage}
            theme={theme}
            onThemeToggle={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border-default bg-bg-sidebar">
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="p-1.5 rounded-lg bg-bg-elevated text-text-primary"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="font-semibold text-sm">agentbase-ux</span>
          </div>

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <Page />
            </div>
          </main>
        </div>
      </div>
    </ThemingProvider>
  );
}
