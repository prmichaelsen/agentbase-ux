import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemingProvider, useTheme, themes } from './theming'

function ThemeConsumer() {
  const t = useTheme()
  return <div data-testid="consumer">{t.buttonPrimary}</div>
}

describe('ThemingProvider', () => {
  it('provides dark theme by default', () => {
    render(
      <ThemingProvider>
        <ThemeConsumer />
      </ThemingProvider>
    )
    expect(screen.getByTestId('consumer').textContent).toBe(themes.dark.buttonPrimary)
  })

  it('provides light theme when specified', () => {
    render(
      <ThemingProvider theme="light">
        <ThemeConsumer />
      </ThemingProvider>
    )
    expect(screen.getByTestId('consumer').textContent).toBe(themes.light.buttonPrimary)
  })

  it('sets data-theme attribute on wrapper div', () => {
    render(
      <ThemingProvider theme="light">
        <span data-testid="child">hello</span>
      </ThemingProvider>
    )
    const wrapper = screen.getByTestId('child').parentElement
    expect(wrapper).toHaveAttribute('data-theme', 'light')
  })
})

describe('themes', () => {
  it('has dark and light themes', () => {
    expect(themes.dark).toBeDefined()
    expect(themes.light).toBeDefined()
  })

  it('both themes have all required keys', () => {
    const darkKeys = Object.keys(themes.dark)
    const lightKeys = Object.keys(themes.light)
    expect(darkKeys).toEqual(lightKeys)
  })
})
