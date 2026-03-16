import React from 'react';

const components = [
  { name: 'Button', desc: 'Themeable button with variant and size support', id: 'button' },
  { name: 'Modal', desc: 'Portal-based modal with escape/backdrop dismiss', id: 'modal' },
  { name: 'ConfirmationModal', desc: 'Confirmation dialog with danger/warning/info variants', id: 'confirmation-modal' },
  { name: 'MenuItem', desc: 'Menu item with icon, label, and loading state', id: 'menu-item' },
  { name: 'Paginator', desc: 'Page navigation with editable current page', id: 'paginator' },
  { name: 'Popover', desc: 'Positioned popover with auto viewport adjustment', id: 'popover' },
  { name: 'Slider', desc: 'Range slider supporting continuous and discrete modes', id: 'slider' },
  { name: 'SlideOverPanel', desc: 'Right-side slide-over overlay with backdrop', id: 'slide-over-panel' },
  { name: 'ToggleSwitch', desc: 'iOS-style toggle switch with label support', id: 'toggle-switch' },
];

const hooks = [
  { name: 'useDebounce', desc: 'Generic debounce hook for values', id: 'use-debounce' },
];

const utils = [
  { name: 'Clipboard', desc: 'Share and copy-to-clipboard utilities', id: 'clipboard' },
  { name: 'Format Time', desc: 'Relative and exact time formatting', id: 'format-time' },
];

export function Overview() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary mb-2">agentbase-ux</h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Reusable, themeable UI primitives for React + Tailwind applications. Built with CSS custom properties
          and React context for seamless dark/light theming.
        </p>
      </div>

      <div className="mb-3">
        <h2 className="text-lg font-semibold text-text-primary mb-1">Install</h2>
        <div className="bg-bg-elevated rounded-lg px-4 py-2.5 inline-block">
          <code className="code-block text-sm text-text-secondary">npm i @prmichaelsen/agentbase-ux</code>
        </div>
      </div>

      <div className="mb-10">
        <div className="bg-bg-elevated rounded-lg px-4 py-2.5 inline-block">
          <code className="code-block text-sm text-text-secondary">@import "@prmichaelsen/agentbase-ux/tokens.css";</code>
        </div>
      </div>

      <Section title="Components" items={components} />
      <Section title="Hooks" items={hooks} />
      <Section title="Utilities" items={utils} />
    </div>
  );
}

function Section({ title, items }: { title: string; items: { name: string; desc: string; id: string }[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-text-primary mb-3">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block p-4 rounded-xl border border-border-default bg-bg-card hover:border-brand-primary/40 hover:bg-bg-hover transition-colors"
          >
            <div className="font-medium text-sm text-text-primary">{item.name}</div>
            <div className="text-xs text-text-muted mt-1">{item.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
