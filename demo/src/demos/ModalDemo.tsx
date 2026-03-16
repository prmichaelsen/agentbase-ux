import React, { useState } from 'react';
import { Button, Modal } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  const [openPersistent, setOpenPersistent] = useState(false);

  return (
    <div>
      <PageHeader
        title="Modal"
        description="Portal-based modal with escape/backdrop dismiss, persistent mode, and configurable max-width."
        importStr="import { Modal } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="Basic Modal"
        description="Click to open. Dismiss with Escape, backdrop click, or the close button."
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal isOpen={open} onClose={() => setOpen(false)} title="Example Modal">
  <p>Modal content goes here.</p>
</Modal>`}
      >
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Example Modal">
          <p className="text-text-secondary">This is a basic modal with default settings. Press Escape or click the backdrop to close.</p>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Large Modal"
        description="Use maxWidth to control the modal size."
      >
        <Button variant="secondary" onClick={() => setOpenLg(true)}>Open Large Modal</Button>
        <Modal isOpen={openLg} onClose={() => setOpenLg(false)} title="Large Modal" maxWidth="xl">
          <p className="text-text-secondary mb-4">This modal uses maxWidth="xl" for wider content.</p>
          <div className="h-48 rounded-lg bg-bg-elevated flex items-center justify-center text-text-muted">
            Wide content area
          </div>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Persistent Modal"
        description="Cannot be dismissed by escape or backdrop click. Must be closed programmatically."
      >
        <Button variant="danger" onClick={() => setOpenPersistent(true)}>Open Persistent</Button>
        <Modal isOpen={openPersistent} onClose={() => setOpenPersistent(false)} title="Persistent Modal" persistent>
          <p className="text-text-secondary mb-4">This modal cannot be dismissed by clicking outside or pressing Escape.</p>
          <Button onClick={() => setOpenPersistent(false)}>Close Explicitly</Button>
        </Modal>
      </DemoSection>

      <PropsTable
        props={[
          { name: 'isOpen', type: 'boolean', description: 'Controls modal visibility', required: true },
          { name: 'onClose', type: '() => void', description: 'Called when modal should close', required: true },
          { name: 'children', type: 'ReactNode', description: 'Modal body content', required: true },
          { name: 'title', type: 'string', description: 'Optional header title' },
          { name: 'maxWidth', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl'", defaultVal: "'md'", description: 'Maximum width of modal' },
          { name: 'persistent', type: 'boolean', defaultVal: 'false', description: 'Prevent escape/backdrop dismissal' },
          { name: 'style', type: 'CSSProperties', description: 'Custom inline styles' },
        ]}
      />
    </div>
  );
}
