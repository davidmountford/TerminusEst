# AGENTS.md

## UI Guidance
- When making UI, styling, branding, motion, or layout changes, consult [docs/style-guidelines.md](docs/style-guidelines.md) and follow it unless the user explicitly overrides it.
- Treat the style guide as the source of truth for color usage, typography, component feel, and effect intensity.
- When building UI, you must consider the DARK/LIGHT theme switching.

## Code Style
- In HTML and JSX, add a blank line between sibling elements when they are at the same indentation level.
- Apply this only to sibling elements that share the same parent. Do not insert extra blank lines between nested parent/child elements solely because they are adjacent.

## Secrets
- Do not read from `.env.local`, `.env.*.local`, or other secret-bearing local env files unless the user explicitly asks for it.
- If reading a secret-bearing env file becomes necessary to complete a task, warn the user first and explain why.
