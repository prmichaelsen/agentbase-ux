import React, { useState } from 'react';
import { MenuItem } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';
import { Settings, User, LogOut, Trash2, Bell, ChevronRight } from 'lucide-react';

export function MenuItemDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <PageHeader
        title="MenuItem"
        description="Menu item button with icon, label, loading state, and optional suffix."
        importStr="import { MenuItem } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="Basic Usage"
        description="Menu items in a list context."
        code={`<MenuItem icon={Settings} label="Settings" onClick={handleClick} />
<MenuItem icon={User} label="Profile" onClick={handleClick} />
<MenuItem icon={LogOut} label="Sign Out" onClick={handleClick} />`}
      >
        <div className="w-64 rounded-xl border border-border-default bg-bg-card overflow-hidden divide-y divide-border-subtle">
          <MenuItem icon={Settings} label="Settings" onClick={() => {}} />
          <MenuItem icon={User} label="Profile" onClick={() => {}} />
          <MenuItem icon={Bell} label="Notifications" onClick={() => {}} suffix={<span className="text-xs bg-brand-primary/20 text-brand-primary px-1.5 py-0.5 rounded-full">3</span>} />
          <MenuItem icon={LogOut} label="Sign Out" onClick={() => {}} />
        </div>
      </DemoSection>

      <DemoSection title="Danger & Disabled" description="Danger variant and disabled state.">
        <div className="w-64 rounded-xl border border-border-default bg-bg-card overflow-hidden divide-y divide-border-subtle">
          <MenuItem icon={Settings} label="Enabled" onClick={() => {}} suffix={<ChevronRight size={14} className="text-text-muted" />} />
          <MenuItem icon={Settings} label="Disabled" onClick={() => {}} disabled />
          <MenuItem icon={Trash2} label="Delete Account" onClick={() => {}} danger />
        </div>
      </DemoSection>

      <DemoSection title="Loading State" description="Shows a spinner while an action is processing.">
        <div className="w-64 rounded-xl border border-border-default bg-bg-card overflow-hidden">
          <MenuItem
            icon={Settings}
            label="Sync Data"
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
          />
        </div>
      </DemoSection>

      <PropsTable
        props={[
          { name: 'icon', type: 'LucideIcon', description: 'Icon component from lucide-react', required: true },
          { name: 'label', type: 'string', description: 'Menu item text', required: true },
          { name: 'onClick', type: '() => void', description: 'Click handler', required: true },
          { name: 'disabled', type: 'boolean', description: 'Disable interaction' },
          { name: 'danger', type: 'boolean', description: 'Red danger styling' },
          { name: 'loading', type: 'boolean', description: 'Show loading spinner' },
          { name: 'suffix', type: 'ReactNode', description: 'Content rendered at the right end' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' },
        ]}
      />
    </div>
  );
}
