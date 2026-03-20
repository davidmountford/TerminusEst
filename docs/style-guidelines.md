# Style Guidelines

## Brand Intent
- The visual language should feel cyberpunk, polished, and technical.
- Interfaces should feel premium and intentional, not noisy or novelty-first.
- Contrast should be high, but readability wins over spectacle.
- Effects should create atmosphere, not compete with content.

## Design Principles
- Prefer strong composition and restrained visual chaos over constant decoration.
- Use glow, gradients, and motion to support hierarchy, not replace it.
- Build interfaces that still look coherent when the effects are removed.
- Keep the experience crisp on both desktop and mobile.

## Color System

### Core Tokens
- `cyber-black`: `#05040a`
- `primary`: `#7b2fff`
- `primary-glow`: `#a855f7`
- `primary-soft`: `#d8b4fe`
- `secondary`: `#00e5cc`
- `accent`: `#ff2d7e`
- `text-primary`: `#e8e0f5`

### Usage Rules
- Use `primary` for structure, framing, and depth.
- Use `primary-glow` for emphasis, bloom, and luminous edges.
- Use `secondary` for active states, CTAs, highlights, and status indicators.
- Use `accent` sparingly for warning heat, punch, and select contrast moments.
- Use `cyber-black` and other dark neutrals as the default canvas.
- Keep `text-primary` or close variants as the default readable foreground.

### Tailwind Usage
- Prefer project theme tokens such as `bg-primary`, `text-secondary`, `border-primary/35`, and `text-accent`.
- Use stock Tailwind colors only when they are not user-facing theme colors.
- Do not substitute approximate Tailwind violets/teals when the exact brand colors matter.

## Typography

### Font Roles
- Display: `Orbitron`
- Body: `Rajdhani`
- Meta/technical labels: `Share Tech Mono`

### Rules
- Use display type for hero headlines, section marks, and high-impact labels only.
- Use body type for paragraphs, supporting copy, and most UI text.
- Use mono type for tags, status lines, metadata, and terminal-like accents.
- Favor bold tracking and sharp uppercase treatment for small labels.
- Avoid default system font stacks in hero or brand-defining surfaces.

## Layout
- Favor generous vertical rhythm and centered compositions for hero sections.
- Prefer large, focused cards or panels over busy multi-column hero layouts.
- Use asymmetry carefully; a single offset glow or nebula is usually enough.
- Keep core reading widths controlled even inside cinematic sections.

## Components

### Cards
- Cards can use clipped corners, subtle borders, and layered glow.
- Glassmorphism is acceptable only when paired with strong contrast and clean text.
- Decorative corners should be sparse and purposeful.

### Buttons
- Primary actions should usually lean on `secondary` with dark text.
- Hover states may sweep toward `primary-glow` or white text.
- Buttons should feel angular and engineered, not pillowy.

### Status
- Status indicators should use mono labels and restrained pulsing.
- Use `secondary` for positive/available states by default.

## Effects

### Glitch
- Reserve glitch for display text and short interaction states.
- Glitch should trigger briefly on hover, focus, or reveal.
- Never apply glitch continuously to body copy or critical UI.

### Parallax
- Use parallax in hero sections, scene layers, or showcase cards.
- Keep motion subtle enough that text remains easy to read.
- Respect reduced-motion preferences when deeper motion is introduced later.

### Glow
- Glows should reinforce depth and focus, not wash out edges.
- Use layered glow with low alpha instead of one oversized blur.

### Grain And Scanlines
- Grain and scanlines should stay very subtle.
- If they reduce text legibility, dial them back immediately.

## Motion
- Prefer short, deliberate motion over constant ambient animation.
- Reveal animations should generally feel upward, smooth, and quick.
- Use easing that feels responsive, not floaty.
- Staggered reveals are good for hero content; avoid animating every component on the page.

## Content Tone
- Copy should feel confident, technically literate, and concise.
- Avoid generic startup filler and vague marketing fog.
- The voice can be stylish, but should still sound credible and grounded.

## Anti-Patterns
- Do not use flat white or generic SaaS blue as the dominant look.
- Do not overuse neon on every surface.
- Do not mix too many accent colors into one section.
- Do not stack glow, glitch, parallax, grain, and animated particles all at full strength.
- Do not let effects become the product.

## Implementation Notes
- Prefer Tailwind utility classes for layout, spacing, typography, and color application.
- Keep more bespoke effects in reusable CSS classes or components.
- When an effect needs custom CSS, give it a clear reusable name.
- Extract repeatable hero patterns into components instead of repeating long utility chains.

## Current Reusable Theme Hooks
- Theme tokens live in [styles/globals.css](../styles/globals.css).
- Reusable effects currently include `.glitch-text`, `.parallax-card`, `.cyber-grid-floor`, `.retro-sun`, `.cyber-horizon`, and nebula helpers.
- Prefer extending these patterns before inventing parallel versions.

## Do / Avoid
- Do: dark cinematic backgrounds with focused luminous accents.
- Do: use `secondary` for interactive emphasis.
- Do: keep large headlines sharp, geometric, and high-contrast.
- Avoid: soft corporate gradients with no edge.
- Avoid: generic dashboard chrome in marketing surfaces.
- Avoid: decorative effects on dense text blocks.
