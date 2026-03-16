import React, { useState } from 'react';
import { Slider } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';

export function SliderDemo() {
  const [continuous, setContinuous] = useState(50);
  const [discrete, setDiscrete] = useState('Medium');

  return (
    <div>
      <PageHeader
        title="Slider"
        description="Range slider with gradient fill, supporting both continuous and discrete modes."
        importStr="import { Slider } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="Continuous"
        description="Standard range input with min/max/step."
        code={`<Slider min={0} max={100} step={1} value={value} onChange={setValue} />`}
      >
        <div className="max-w-sm">
          <Slider min={0} max={100} step={1} value={continuous} onChange={setContinuous} />
          <p className="text-sm text-text-muted mt-2">Value: {continuous}</p>
        </div>
      </DemoSection>

      <DemoSection
        title="Discrete"
        description="Select from a fixed set of options with optional labels."
        code={`<Slider
  options={['Low', 'Medium', 'High', 'Ultra']}
  value={value}
  onChange={setValue}
  labels
/>`}
      >
        <div className="max-w-sm">
          <Slider
            options={['Low', 'Medium', 'High', 'Ultra']}
            value={discrete}
            onChange={setDiscrete}
            labels
          />
          <p className="text-sm text-text-muted mt-2">Selected: {discrete}</p>
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="max-w-sm">
          <Slider min={0} max={100} step={1} value={30} onChange={() => {}} disabled />
        </div>
      </DemoSection>

      <PropsTable
        props={[
          { name: 'min', type: 'number', description: 'Minimum value (continuous mode)' },
          { name: 'max', type: 'number', description: 'Maximum value (continuous mode)' },
          { name: 'step', type: 'number', description: 'Step increment (continuous mode)' },
          { name: 'options', type: 'T[]', description: 'Discrete options array' },
          { name: 'value', type: 'number | T', description: 'Current value', required: true },
          { name: 'onChange', type: '(value) => void', description: 'Change handler', required: true },
          { name: 'labels', type: 'boolean | (option: T) => string', description: 'Show labels (discrete mode)' },
          { name: 'disabled', type: 'boolean', description: 'Disable interaction' },
        ]}
      />
    </div>
  );
}
