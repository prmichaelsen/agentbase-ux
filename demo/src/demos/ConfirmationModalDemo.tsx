import React, { useState } from 'react';
import { Button, ConfirmationModal } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';

export function ConfirmationModalDemo() {
  const [dangerOpen, setDangerOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadingConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoadingOpen(false);
    }, 2000);
  };

  return (
    <div>
      <PageHeader
        title="ConfirmationModal"
        description="Pre-built confirmation dialog with danger, warning, and info variants."
        importStr="import { ConfirmationModal } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="Variants"
        description="Three semantic variants for different confirmation contexts."
        code={`<ConfirmationModal
  isOpen={open}
  onClose={() => setOpen(false)}
  onConfirm={handleConfirm}
  title="Delete item?"
  message="This action cannot be undone."
  variant="danger"
/>`}
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="danger" onClick={() => setDangerOpen(true)}>Danger</Button>
          <Button variant="secondary" onClick={() => setWarningOpen(true)}>Warning</Button>
          <Button onClick={() => setInfoOpen(true)}>Info</Button>
        </div>

        <ConfirmationModal
          isOpen={dangerOpen}
          onClose={() => setDangerOpen(false)}
          onConfirm={() => setDangerOpen(false)}
          title="Delete this item?"
          message="This action cannot be undone. All associated data will be permanently removed."
          variant="danger"
          confirmText="Delete"
        />
        <ConfirmationModal
          isOpen={warningOpen}
          onClose={() => setWarningOpen(false)}
          onConfirm={() => setWarningOpen(false)}
          title="Unsaved changes"
          message="You have unsaved changes. Are you sure you want to leave?"
          variant="warning"
          confirmText="Leave"
        />
        <ConfirmationModal
          isOpen={infoOpen}
          onClose={() => setInfoOpen(false)}
          onConfirm={() => setInfoOpen(false)}
          title="Enable notifications?"
          message="You'll receive email notifications for important updates."
          variant="info"
          confirmText="Enable"
        />
      </DemoSection>

      <DemoSection
        title="Loading State"
        description="Show a processing state while the confirm action completes."
      >
        <Button onClick={() => setLoadingOpen(true)}>Open with Loading</Button>
        <ConfirmationModal
          isOpen={loadingOpen}
          onClose={() => setLoadingOpen(false)}
          onConfirm={handleLoadingConfirm}
          title="Confirm action"
          message="This will take a moment to process."
          variant="info"
          isLoading={loading}
        />
      </DemoSection>

      <PropsTable
        props={[
          { name: 'isOpen', type: 'boolean', description: 'Controls visibility', required: true },
          { name: 'onClose', type: '() => void', description: 'Called when cancelled', required: true },
          { name: 'onConfirm', type: '() => void', description: 'Called when confirmed', required: true },
          { name: 'title', type: 'string', description: 'Dialog title', required: true },
          { name: 'message', type: 'string | ReactNode', description: 'Dialog message', required: true },
          { name: 'variant', type: "'danger' | 'warning' | 'info'", defaultVal: "'danger'", description: 'Visual variant' },
          { name: 'confirmText', type: 'string', defaultVal: "'Confirm'", description: 'Confirm button label' },
          { name: 'cancelText', type: 'string', defaultVal: "'Cancel'", description: 'Cancel button label' },
          { name: 'isLoading', type: 'boolean', defaultVal: 'false', description: 'Show loading state' },
        ]}
      />
    </div>
  );
}
