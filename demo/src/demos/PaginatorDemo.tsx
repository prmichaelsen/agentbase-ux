import React, { useState } from 'react';
import { Paginator } from '@prmichaelsen/agentbase-ux';
import { PageHeader, DemoSection, PropsTable } from '../DemoSection';

export function PaginatorDemo() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);

  return (
    <div>
      <PageHeader
        title="Paginator"
        description="Page navigation with editable current page input and configurable sibling count."
        importStr="import { Paginator } from '@prmichaelsen/agentbase-ux'"
      />

      <DemoSection
        title="Basic"
        description="Navigate through pages. Click the page number to type a specific page."
        code={`<Paginator
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>`}
      >
        <Paginator currentPage={page1} totalPages={10} onPageChange={setPage1} />
        <p className="text-sm text-text-muted mt-3">Current page: {page1}</p>
      </DemoSection>

      <DemoSection
        title="Many Pages"
        description="Works smoothly with large page counts."
      >
        <Paginator currentPage={page2} totalPages={100} onPageChange={setPage2} />
        <p className="text-sm text-text-muted mt-3">Page {page2} of 100</p>
      </DemoSection>

      <DemoSection
        title="Custom Siblings"
        description="Control how many sibling pages are shown on each side."
      >
        <Paginator currentPage={page3} totalPages={20} onPageChange={setPage3} siblings={1} />
        <p className="text-sm text-text-muted mt-3">siblings=1, page {page3} of 20</p>
      </DemoSection>

      <PropsTable
        props={[
          { name: 'currentPage', type: 'number', description: 'Active page number', required: true },
          { name: 'totalPages', type: 'number', description: 'Total number of pages', required: true },
          { name: 'onPageChange', type: '(page: number) => void', description: 'Called when page changes', required: true },
          { name: 'siblings', type: 'number', defaultVal: '2', description: 'Sibling pages shown on each side' },
        ]}
      />
    </div>
  );
}
