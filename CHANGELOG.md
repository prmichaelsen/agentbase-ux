# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2026-03-16

### Added
- Build tooling with esbuild and TypeScript declarations
- ESM-only package configuration (`@prmichaelsen/agentbase-ux`)
- Barrel export (`src/index.ts`) for all components, hooks, utils, and theming
- `esbuild.build.js` build script following core-sdk patterns
- `tsconfig.json` with declaration-only emit
- `.npmignore` for clean package publishing
- CSS design tokens copied to `dist/tokens.css`
