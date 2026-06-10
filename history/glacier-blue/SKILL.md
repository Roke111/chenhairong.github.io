---
name: glacier-blue
description: "Glacier Blue — a minimalist design language with organic curves, blue-toned color system, and single-page accordion layout. This skill should be used when building or styling personal websites, portfolio pages, landing pages, or any web UI that requires a clean, airy, professional aesthetic with collapsible accordion sections. Trigger keywords: 冰川蓝, glacier blue, blue organic design, 蓝色系设计, 极简网页, 折叠区布局, accordion page, organic curve UI, 有机曲线, 个人网站设计."
agent_created: true
---

# Glacier Blue Design Language

A minimalist, organic-curve design system centered on a blue-toned palette. Built
for single-page websites with accordion-collapsible content blocks.

## When to Use

Use this skill whenever the user asks for:

- A personal website, portfolio page, or landing page with a clean modern look
- Blue-themed UI design with organic decorative elements (waves, blurred orbs, curves)
- Single-page layout with foldable/accordion content sections
- A design that feels "清新", "干净", "极简", "冰川", "晴空" (refreshing, clean, minimalist)
- Converting from dark-theme designs to light, airy blue-themed designs

## Design Philosophy

**Four keywords:** Organic curves · Minimal typography · Clear blocks · Blue breathing

- The background is a glacial white with subtle blue undertone — never stark white.
- Large blurred orbs float in the background, creating depth without clutter.
- Content blocks are white rounded cards with ice-blue borders, visually separated.
- Typography is large, bold, and geometric (Outfit + Noto Sans SC).
- Blue is the only accent color — no second accent competes for attention.

## Quick Start: Generating a Page

When asked to build a page with this design language, follow this workflow:

1. **Copy the CSS variables** from `assets/css-vars.css` into the project stylesheet (or inline in a `<style>` block)
2. **Copy the ambient layers** (`.bg-grain`, `.deco-orbs`, orb elements) from `assets/demo-template.html` into the HTML body's opening
3. **Build the page structure** using the component patterns in `references/component-spec.md`
4. **Wire the accordion logic** (JS snippet included in the template)
5. **Replace content** with the user's actual information while preserving the design tokens

## Core Design Token Summary

Load `references/color-spec.md` when detailed color values, contrast ratios, or
extended color ranges are needed. Below is the quick reference:

| Token          | Hex       | Role                        |
|----------------|-----------|-----------------------------|
| `--glacier`    | `#f4f7fb` | Page background             |
| `--cloud`      | `#ffffff` | Card surfaces               |
| `--ice`        | `#eaf1f8` | Borders, subtle backgrounds |
| `--frost`      | `#d2e2f3` | Hover/active states         |
| `--sky`        | `#5b9bd5` | Primary accent              |
| `--sky-deep`   | `#3b7fc4` | Accent hover                |
| `--midnight`   | `#0f1b2d` | Headings                    |
| `--navy`       | `#1a365d` | Important text              |
| `--slate`      | `#4a5568` | Body text                   |
| `--slate-light`| `#718096` | Secondary text              |

## Component Patterns

For detailed component specifications (dimensions, spacing, interaction states),
load `references/component-spec.md`. Quick reference:

| Component | Key traits |
|-----------|-----------|
| Hero | Giant `Outfit` heading, tagline capsule, bottom SVG wave curve |
| Accordion block | White card `border-radius: 20px`, ice border, top blue gradient bar when open |
| Project card grid | 2-column grid, hover lift `translateY(-2px)`, accent dot appears |
| Skill tags | Pill badges, primary tags have blue background |
| CTA section | Centered card, blue pill button with arrow icon |
| Fold indicator | Circular `+` icon, rotates 180° on open |

## Typography

- **Headings**: `Outfit` (Google Fonts), weight 600-800, geometric sans-serif
- **Chinese headings**: `Noto Sans SC` (Google Fonts), weight 500-700
- **Body**: `Noto Sans SC` + system sans-serif stack
- **Mono**: `SF Mono` / `Cascadia Code` for code-like tags

Font loading code:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## Layout Constraints

- Max content width: `880px`
- Accordion card border-radius: `20px`
- Gap between accordion cards: `16px`
- Section padding (header): `20px 28px` → `24px 32px` (desktop)
- Section padding (content inner): `0 28px 36px` → `0 32px 44px` (desktop)
- Responsive breakpoints: `<480px` (single column), `≥768px` (full desktop)

## Accordion Behavior

- **Single-open mode** (hand accordion): only one section expands at a time
- Clicking an open section closes it; clicking another opens it and scrolls to view
- Animation: `max-height` transition, `500ms` with `cubic-bezier(0, 0, 0.1, 1)`
- Content fade-in: `opacity + translateY(6px)` after `100ms` delay
- The JavaScript logic is self-contained and included in `assets/demo-template.html`

## Organic Decorative Elements

Three blurred orbs float in the background (`position: fixed`, `filter: blur(80px)`, `pointer-events: none`):

1. **Orb 1** — `380px`, sky blue `#5b9bd5`, top-right, 12s float cycle
2. **Orb 2** — `260px`, light sky `#a8d4f0`, bottom-left, 15s float cycle
3. **Orb 3** — `200px`, leaf green `#c5dfd0`, mid-right, 18s float cycle

Additionally:
- A **noise grain overlay** (`opacity: 0.025`) adds subtle paper-like texture
- A **Hero SVG wave curve** at the bottom creates an organic transition
- A **squiggle underline** under the name accent uses a repeating SVG path

## When Content Changes

When the user provides new content (text, images, links) to add to a page built
with this design language:

1. Preserve all design tokens, CSS variables, and component structures
2. Replace only the textual content and links
3. Keep the accordion sections and their order
4. If adding new sections, follow the existing card pattern from `references/component-spec.md`
5. Do NOT change colors, fonts, spacing, or animation timings unless explicitly asked
