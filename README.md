# agentbase-ux

Reusable, themeable UI primitives for TanStack Start + Tailwind applications

> Built with [Agent Context Protocol](https://github.com/prmichaelsen/agent-context-protocol)

## Quick Start

```bash
npm install @prmichaelsen/agentbase-ux
```

## Features

- Themeable component library with dark/light mode support
- CSS custom properties via Tailwind v4 `@theme` directive
- React context-based theming with `useTheme()` hook
- Extracted from production agentbase.me application

## Development

This project uses the Agent Context Protocol for development:

- `@acp.init` - Initialize agent context
- `@acp.plan` - Plan milestones and tasks
- `@acp.proceed` - Continue with next task
- `@acp.status` - Check project status

See [AGENT.md](./AGENT.md) for complete ACP documentation.

## Project Structure

```
agentbase-ux/
├── AGENT.md              # ACP methodology
├── agent/                # ACP directory
│   ├── design/          # Design documents
│   ├── milestones/      # Project milestones
│   ├── tasks/           # Task breakdown
│   ├── patterns/        # Architectural patterns
│   └── progress.yaml    # Progress tracking
├── src/                  # Library source
│   ├── lib/             # Theming system
│   ├── components/      # UI components
│   ├── hooks/           # React hooks
│   └── utils/           # Utilities
└── package.json
```

## Getting Started

1. Initialize context: `@acp.init`
2. Plan your project: `@acp.plan`
3. Start building: `@acp.proceed`

## License

MIT

## Author

prmichaelsen
