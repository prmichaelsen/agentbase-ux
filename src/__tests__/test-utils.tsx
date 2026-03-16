import { render, type RenderOptions } from '@testing-library/react'
import { ThemingProvider } from '../lib/theming'
import type { ReactElement } from 'react'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <ThemingProvider theme="dark">{children}</ThemingProvider>
}

export function renderWithTheme(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Wrapper, ...options })
}

export { render } from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
