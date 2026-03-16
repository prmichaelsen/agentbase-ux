import React, { useState } from 'react';
import { useDebounce } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';

export function UseDebounceDemo() {
  const [input, setInput] = useState('');
  const debounced = useDebounce(input, 500);

  return (
    <div>
      <PageHeader
        title="useDebounce"
        description="Generic debounce hook that delays updating a value until after a specified delay."
        importStr="import { useDebounce } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="Live Demo"
        description="Type in the input. The debounced value updates 500ms after you stop typing."
        code={`const [input, setInput] = useState('');
const debounced = useDebounce(input, 500);`}
      >
        <div className="max-w-sm space-y-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type something..."
            className="w-full px-3 py-2 rounded-lg bg-bg-input border border-border-default text-text-primary text-sm focus:outline-none focus:border-brand-primary"
          />
          <div className="text-sm space-y-1">
            <p className="text-text-secondary">Raw: <span className="text-text-primary font-mono">{input || '(empty)'}</span></p>
            <p className="text-text-secondary">Debounced: <span className="text-text-primary font-mono">{debounced || '(empty)'}</span></p>
          </div>
        </div>
      </DemoSection>

      <PropsTable
        props={[
          { name: 'value', type: 'T', description: 'Value to debounce', required: true },
          { name: 'delay', type: 'number', description: 'Delay in milliseconds', required: true },
        ]}
      />
    </div>
  );
}
