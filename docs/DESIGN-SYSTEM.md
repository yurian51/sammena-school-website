# Sammena Design System

## Product character

Sammena should feel **premium, warm, confident, modern and trustworthy**. It must feel like an institution with a future, not a template wearing a school logo.

## Visual pillars

1. Editorial — strong typography, intentional whitespace, clear hierarchy.
2. Cinematic — depth, light, atmosphere and carefully timed transitions.
3. Human — photography, family-oriented language and approachable interactions.
4. Precise — consistent spacing, states, components and responsive behavior.
5. African-modern — contemporary and locally grounded without cliché visual shortcuts.

## Motion pillars

- Entrance: reveal hierarchy, never delay comprehension.
- Scroll: create continuity between narrative sections.
- Interaction: provide immediate tactile feedback.
- Transformation: visually connect before/after states.
- Ambient: maintain subtle life without distracting from content.
- Accessibility: honor `prefers-reduced-motion` and provide equivalent information without animation.

## Component behavior

### Buttons
- Hover: slight lift/depth.
- Press: compress toward the surface.
- Focus: highly visible keyboard state.
- Loading: preserve button width and communicate progress.

### Cards
- Rest: quiet elevation.
- Hover: controlled translation and depth increase.
- Enter: stagger only within grouped content.

### Navigation
- Preserve spatial context between pages.
- Mobile navigation should prioritize speed over spectacle.

### Forms
- Validate progressively.
- Avoid aggressive movement on every keystroke.
- Use motion for meaningful state changes only.

## Performance rules

- Prefer transform/opacity animation.
- Avoid layout-triggering animation where possible.
- Respect reduced-motion preferences.
- Lazy-load non-critical visual assets.
- Never make cinematic effects a prerequisite for understanding content.

## Quality bar

A section is not finished because it looks animated. It is finished when typography, spacing, interaction, accessibility, responsiveness and motion all support the same intent.
