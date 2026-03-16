import React, { useState } from 'react';
import { ToggleSwitch } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';

export function ToggleSwitchDemo() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  return (
    <div>
      <PageHeader
        title="ToggleSwitch"
        description="iOS-style toggle switch with label, description, and size variants."
        importStr="import { ToggleSwitch } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="Basic Toggle"
        code={`<ToggleSwitch checked={checked} onChange={setChecked} />`}
      >
        <ToggleSwitch checked={checked1} onChange={setChecked1} />
        <p className="text-sm text-text-muted mt-2">{checked1 ? 'On' : 'Off'}</p>
      </DemoSection>

      <DemoSection
        title="With Label & Description"
        description="Labels and descriptions provide context."
      >
        <div className="space-y-4">
          <ToggleSwitch
            checked={checked2}
            onChange={setChecked2}
            label="Email Notifications"
            description="Receive email notifications for important updates"
          />
          <ToggleSwitch
            checked={checked3}
            onChange={setChecked3}
            label="Dark Mode"
            description="Use dark theme across the application"
          />
        </div>
      </DemoSection>

      <DemoSection title="Sizes" description="Three sizes: sm, md, lg.">
        <div className="flex items-center gap-6">
          <ToggleSwitch size="sm" checked={true} onChange={() => {}} />
          <ToggleSwitch size="md" checked={true} onChange={() => {}} />
          <ToggleSwitch size="lg" checked={true} onChange={() => {}} />
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="flex items-center gap-6">
          <ToggleSwitch checked={false} onChange={() => {}} disabled />
          <ToggleSwitch checked={true} onChange={() => {}} disabled />
        </div>
      </DemoSection>

      <PropsTable
        props={[
          { name: 'checked', type: 'boolean', description: 'Toggle state', required: true },
          { name: 'onChange', type: '(checked: boolean) => void', description: 'Change handler', required: true },
          { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", description: 'Toggle size' },
          { name: 'label', type: 'string', description: 'Label text' },
          { name: 'description', type: 'string', description: 'Description text below label' },
          { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disable interaction' },
          { name: 'id', type: 'string', description: 'HTML id attribute' },
        ]}
      />
    </div>
  );
}
