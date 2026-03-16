import React from 'react';
import { formatExactTime, getRelativeTime } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection } from '../DemoSection';

const samples = [
  new Date().toISOString(),
  new Date(Date.now() - 5 * 60_000).toISOString(),
  new Date(Date.now() - 3 * 3600_000).toISOString(),
  new Date(Date.now() - 2 * 86400_000).toISOString(),
  new Date(Date.now() - 14 * 86400_000).toISOString(),
  new Date(Date.now() - 60 * 86400_000).toISOString(),
];

export function FormatTimeDemo() {
  return (
    <div>
      <PageHeader
        title="Format Time Utilities"
        description="Human-readable time formatting for both exact and relative timestamps."
        importStr="import { formatExactTime, getRelativeTime } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="Live Examples"
        description="Each row shows an ISO timestamp with its formatted outputs."
        code={`formatExactTime('2026-03-16T14:30:00Z')
// "2:30 PM Sun 3/16/26"

getRelativeTime('2026-03-16T14:30:00Z')
// "Just now" | "5m ago" | "3h ago" | etc.`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-muted text-xs uppercase tracking-wider">
                <th className="pb-2 pr-4 font-semibold">Input</th>
                <th className="pb-2 pr-4 font-semibold">formatExactTime</th>
                <th className="pb-2 font-semibold">getRelativeTime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {samples.map(iso => (
                <tr key={iso}>
                  <td className="py-2 pr-4 font-mono text-xs text-text-muted">{iso.slice(0, 19)}</td>
                  <td className="py-2 pr-4 text-text-primary">{formatExactTime(iso)}</td>
                  <td className="py-2 text-text-primary">{getRelativeTime(iso)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DemoSection>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-3">API</h3>
        <div className="space-y-4">
          <div className="border border-border-default rounded-xl p-4 bg-bg-card">
            <code className="code-block text-xs text-brand-primary">formatExactTime(dateString: string): string</code>
            <p className="text-sm text-text-secondary mt-2">Returns "HH:MM AM/PM weekday M/D/YY" format.</p>
          </div>
          <div className="border border-border-default rounded-xl p-4 bg-bg-card">
            <code className="code-block text-xs text-brand-primary">getRelativeTime(dateString: string): string</code>
            <p className="text-sm text-text-secondary mt-2">Returns human-readable relative time: "Just now", "5m ago", "3h ago", "2d ago", "2w ago", or formatted date.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
