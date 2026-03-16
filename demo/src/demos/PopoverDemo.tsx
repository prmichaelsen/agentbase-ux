import React, { useState, useRef } from 'react';
import { Button, Popover } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';

export function PopoverDemo() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <PageHeader
        title="Popover"
        description="Positioned popover with automatic viewport adjustment. Renders via portal."
        importStr="import { Popover } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="Basic Popover"
        description="Opens below the anchor by default. Click outside or press Escape to close."
        code={`const ref = useRef(null);
const [open, setOpen] = useState(false);

<Button ref={ref} onClick={() => setOpen(true)}>Open</Button>
<Popover open={open} anchorRef={ref} onClose={() => setOpen(false)}>
  <p>Popover content</p>
</Popover>`}
      >
        <Button ref={ref1} onClick={() => setOpen1(o => !o)}>Toggle Popover</Button>
        <Popover open={open1} anchorRef={ref1} onClose={() => setOpen1(false)}>
          <div className="p-4 w-56">
            <p className="text-sm font-medium text-text-primary mb-1">Popover Title</p>
            <p className="text-xs text-text-secondary">This is positioned below the button and auto-adjusts to stay within the viewport.</p>
          </div>
        </Popover>
      </DemoSection>

      <DemoSection
        title="Anchor Above"
        description="Set anchor='above' to open above the trigger."
      >
        <Button ref={ref2} variant="secondary" onClick={() => setOpen2(o => !o)}>Open Above</Button>
        <Popover open={open2} anchorRef={ref2} onClose={() => setOpen2(false)} anchor="above">
          <div className="p-4 w-56">
            <p className="text-sm text-text-secondary">This popover appears above the anchor element.</p>
          </div>
        </Popover>
      </DemoSection>

      <PropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'Controls visibility', required: true },
          { name: 'anchorRef', type: 'RefObject<HTMLElement>', description: 'Ref to the anchor element', required: true },
          { name: 'onClose', type: '() => void', description: 'Called when popover should close', required: true },
          { name: 'children', type: 'ReactNode', description: 'Popover content', required: true },
          { name: 'anchor', type: "'above' | 'below'", defaultVal: "'below'", description: 'Preferred position' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' },
        ]}
      />
    </div>
  );
}
