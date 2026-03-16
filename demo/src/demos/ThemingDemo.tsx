import React from 'react';
import { useTheme } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';

const tokenGroups = [
  {
    title: 'Backgrounds',
    tokens: [
      { name: '--color-bg-page', class: 'bg-bg-page' },
      { name: '--color-bg-sidebar', class: 'bg-bg-sidebar' },
      { name: '--color-bg-card', class: 'bg-bg-card' },
      { name: '--color-bg-elevated', class: 'bg-bg-elevated' },
      { name: '--color-bg-hover', class: 'bg-bg-hover' },
      { name: '--color-bg-active', class: 'bg-bg-active' },
      { name: '--color-bg-input', class: 'bg-bg-input' },
    ],
  },
  {
    title: 'Brand',
    tokens: [
      { name: '--color-brand-primary', class: 'bg-brand-primary' },
      { name: '--color-brand-secondary', class: 'bg-brand-secondary' },
      { name: '--color-brand-accent', class: 'bg-brand-accent' },
      { name: '--color-brand-success', class: 'bg-brand-success' },
      { name: '--color-brand-warning', class: 'bg-brand-warning' },
      { name: '--color-brand-danger', class: 'bg-brand-danger' },
      { name: '--color-brand-info', class: 'bg-brand-info' },
    ],
  },
  {
    title: 'Borders',
    tokens: [
      { name: '--color-border-default', class: 'bg-border-default' },
      { name: '--color-border-subtle', class: 'bg-border-subtle' },
      { name: '--color-border-strong', class: 'bg-border-strong' },
    ],
  },
];

export function ThemingDemo() {
  const theme = useTheme();

  return (
    <div>
      <PageHeader
        title="Theming"
        description="CSS custom properties + React context for seamless dark/light theming. Toggle the theme using the sun/moon icon in the sidebar."
        importStr={`import { ThemingProvider, useTheme } from '@prmichaelsen/agentbase-ux'`}
      />

      <DemoSection
        title="Setup"
        description="Wrap your app with ThemingProvider and import the design tokens CSS."
        code={`import { ThemingProvider } from '@prmichaelsen/agentbase-ux';
import '@prmichaelsen/agentbase-ux/tokens.css';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  return (
    <ThemingProvider theme={theme}>
      <YourApp />
    </ThemingProvider>
  );
}`}
      >
        <p className="text-sm text-text-secondary">
          The ThemingProvider sets <code className="text-brand-primary">data-theme</code> on the document
          and provides theme context to all components via <code className="text-brand-primary">useTheme()</code>.
        </p>
      </DemoSection>

      <DemoSection title="Design Tokens" description="All available CSS custom properties, grouped by category.">
        <div className="space-y-6">
          {tokenGroups.map(group => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-text-primary mb-2">{group.title}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {group.tokens.map(token => (
                  <div key={token.name} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded border border-border-default ${token.class} shrink-0`} />
                    <span className="text-xs text-text-muted font-mono truncate">{token.name.replace('--color-', '')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Text Colors">
        <div className="space-y-1">
          <p className="text-text-primary">text-primary — Main body text</p>
          <p className="text-text-secondary">text-secondary — Supporting text</p>
          <p className="text-text-muted">text-muted — De-emphasized text</p>
        </div>
      </DemoSection>

      <PropsTable
        props={[
          { name: 'theme', type: "'dark' | 'light'", description: 'Active theme name', required: true },
          { name: 'children', type: 'ReactNode', description: 'App content', required: true },
        ]}
      />
    </div>
  );
}
