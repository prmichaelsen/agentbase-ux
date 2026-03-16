import React, { useState } from 'react';
import { Button } from '@prmichaelsen/agentbase-ux';
import { shareOrCopyUrl, copyToClipboard } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';

export function ClipboardDemo() {
  const [shareResult, setShareResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <PageHeader
        title="Clipboard Utilities"
        description="Share and copy-to-clipboard utilities with native API fallbacks."
        importStr="import { shareOrCopyUrl, copyToClipboard } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="shareOrCopyUrl"
        description="Uses native Share API if available, falls back to clipboard."
        code={`const result = await shareOrCopyUrl('https://example.com');
// result: 'shared' | 'copied' | 'cancelled' | 'failed'`}
      >
        <div className="space-y-2">
          <Button
            variant="secondary"
            onClick={async () => {
              const result = await shareOrCopyUrl(window.location.href);
              setShareResult(result);
              setTimeout(() => setShareResult(null), 2000);
            }}
          >
            Share or Copy URL
          </Button>
          {shareResult && (
            <p className="text-sm text-brand-success">Result: {shareResult}</p>
          )}
        </div>
      </DemoSection>

      <DemoSection
        title="copyToClipboard"
        description="Copies text to clipboard with execCommand fallback for insecure contexts."
        code={`const success = await copyToClipboard('Hello, world!');`}
      >
        <div className="space-y-2">
          <Button
            variant="secondary"
            onClick={async () => {
              const ok = await copyToClipboard('Hello from agentbase-ux!');
              setCopied(ok);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            Copy Text
          </Button>
          {copied && (
            <p className="text-sm text-brand-success">Copied to clipboard!</p>
          )}
        </div>
      </DemoSection>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-3">API</h3>
        <div className="space-y-4">
          <div className="border border-border-default rounded-xl p-4 bg-bg-card">
            <code className="code-block text-xs text-brand-primary">shareOrCopyUrl(url: string): Promise&lt;'shared' | 'copied' | 'cancelled' | 'failed'&gt;</code>
            <p className="text-sm text-text-secondary mt-2">Attempts navigator.share, falls back to clipboard copy.</p>
          </div>
          <div className="border border-border-default rounded-xl p-4 bg-bg-card">
            <code className="code-block text-xs text-brand-primary">copyToClipboard(text: string): Promise&lt;boolean&gt;</code>
            <p className="text-sm text-text-secondary mt-2">Copies text via clipboard API with execCommand fallback.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
