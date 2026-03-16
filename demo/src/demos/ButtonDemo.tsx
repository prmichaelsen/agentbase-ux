import React from 'react';
import { Button } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';
import { Plus, Trash2, Check, Download } from 'lucide-react';

export function ButtonDemo() {
  return (
    <div>
      <PageHeader
        title="Button"
        description="Themeable button component with variant, size, and icon support."
        importStr="import { Button } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="Variants"
        description="Five variants for different semantic contexts."
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="ghost">Ghost</Button>`}
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Three sizes: sm, md, and lg."
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </DemoSection>

      <DemoSection
        title="With Icons"
        description="Pass any ReactNode as the icon prop."
        code={`<Button icon={<Plus size={16} />}>Create</Button>
<Button variant="danger" icon={<Trash2 size={16} />}>Delete</Button>
<Button variant="success" icon={<Check size={16} />}>Approve</Button>`}
      >
        <div className="flex flex-wrap gap-3">
          <Button icon={<Plus size={16} />}>Create</Button>
          <Button variant="danger" icon={<Trash2 size={16} />}>Delete</Button>
          <Button variant="success" icon={<Check size={16} />}>Approve</Button>
          <Button variant="secondary" icon={<Download size={16} />}>Download</Button>
        </div>
      </DemoSection>

      <DemoSection title="Disabled" description="Disabled buttons have reduced opacity.">
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
        </div>
      </DemoSection>

      <DemoSection title="Full Width">
        <Button fullWidth>Full Width Button</Button>
      </DemoSection>

      <PropsTable
        props={[
          { name: 'variant', type: "'primary' | 'secondary' | 'danger' | 'success' | 'ghost'", defaultVal: "'primary'", description: 'Visual style variant' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", defaultVal: "'md'", description: 'Button size' },
          { name: 'icon', type: 'ReactNode', description: 'Optional icon rendered before label' },
          { name: 'fullWidth', type: 'boolean', defaultVal: 'false', description: 'Stretch to container width' },
          { name: 'disabled', type: 'boolean', defaultVal: 'false', description: 'Disable interaction' },
        ]}
      />
    </div>
  );
}
