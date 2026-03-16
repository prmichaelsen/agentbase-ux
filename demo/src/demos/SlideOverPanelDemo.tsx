import React, { useState } from 'react';
import { Button, SlideOverPanel } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';

export function SlideOverPanelDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="SlideOverPanel"
        description="Right-side slide-over overlay with backdrop and smooth animations."
        importStr="import { SlideOverPanel } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="Basic Usage"
        description="Slides in from the right with a backdrop overlay."
        code={`<Button onClick={() => setOpen(true)}>Open Panel</Button>
<SlideOverPanel open={open} onClose={() => setOpen(false)}>
  <div className="p-4">Panel content</div>
</SlideOverPanel>`}
      >
        <Button onClick={() => setOpen(true)}>Open Panel</Button>
        <SlideOverPanel open={open} onClose={() => setOpen(false)}>
          <div className="p-5">
            <h3 className="font-semibold text-text-primary mb-3">Panel Title</h3>
            <p className="text-sm text-text-secondary mb-4">
              This panel slides in from the right side of the screen with a backdrop overlay.
              Click the backdrop or use the close mechanism to dismiss.
            </p>
            <div className="space-y-2">
              {['Item A', 'Item B', 'Item C'].map(item => (
                <div key={item} className="p-3 rounded-lg bg-bg-elevated text-sm text-text-primary">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="ghost" onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </SlideOverPanel>
      </DemoSection>

      <PropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'Controls panel visibility', required: true },
          { name: 'onClose', type: '() => void', description: 'Called when panel should close', required: true },
          { name: 'children', type: 'ReactNode', description: 'Panel content', required: true },
        ]}
      />
    </div>
  );
}
