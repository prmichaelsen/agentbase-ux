import React, { useState } from 'react';
import { Code, Eye } from 'lucide-react';

interface DemoSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
}

export function DemoSection({ title, description, children, code }: DemoSectionProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-text-secondary mb-3">{description}</p>
      )}
      <div className="border border-border-default rounded-xl overflow-hidden">
        <div className="p-6 bg-bg-card">{children}</div>
        {code && (
          <>
            <div className="flex items-center border-t border-border-default bg-bg-elevated/50 px-4 py-1.5">
              <button
                onClick={() => setShowCode(s => !s)}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors"
              >
                {showCode ? <Eye size={13} /> : <Code size={13} />}
                {showCode ? 'Preview' : 'Code'}
              </button>
            </div>
            {showCode && (
              <div className="border-t border-border-default bg-bg-page p-4 overflow-x-auto">
                <pre className="code-block text-text-secondary">{code}</pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface PropRowProps {
  name: string;
  type: string;
  defaultVal?: string;
  description: string;
  required?: boolean;
}

export function PropsTable({ props }: { props: PropRowProps[] }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-text-primary mb-3">API</h3>
      <div className="border border-border-default rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-elevated/50 text-left text-text-muted text-xs uppercase tracking-wider">
              <th className="px-4 py-2.5 font-semibold">Prop</th>
              <th className="px-4 py-2.5 font-semibold">Type</th>
              <th className="px-4 py-2.5 font-semibold">Default</th>
              <th className="px-4 py-2.5 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {props.map(p => (
              <tr key={p.name} className="bg-bg-card">
                <td className="px-4 py-2.5 font-mono text-xs text-brand-primary">
                  {p.name}{p.required && <span className="text-brand-danger ml-0.5">*</span>}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-text-secondary">{p.type}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-text-muted">{p.defaultVal ?? '—'}</td>
                <td className="px-4 py-2.5 text-text-secondary">{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PageHeader({ title, description, importStr }: { title: string; description: string; importStr: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-text-primary mb-2">{title}</h1>
      <p className="text-text-secondary mb-4">{description}</p>
      <div className="inline-block bg-bg-elevated rounded-lg px-4 py-2">
        <code className="code-block text-xs text-text-secondary">{importStr}</code>
      </div>
    </div>
  );
}
