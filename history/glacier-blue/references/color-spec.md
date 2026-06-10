# Glacier Blue — Color Specification

## Core Palette

### Atmosphere / Background

| Token         | Hex       | RGB            | HSL              | Usage                          |
|---------------|-----------|----------------|------------------|--------------------------------|
| `--glacier`   | `#f4f7fb` | 244, 247, 251  | 214°, 8%, 97%   | Page background                |
| `--cloud`     | `#ffffff` | 255, 255, 255  | 0°, 0%, 100%    | Card surface, CTA background   |
| `--ice`       | `#eaf1f8` | 234, 241, 248  | 210°, 6%, 95%   | Card borders, subtle bg        |
| `--ice-hover` | `#dde8f4` | 221, 232, 244  | 211°, 9%, 91%   | Card hover background          |
| `--frost`     | `#d2e2f3` | 210, 226, 243  | 213°, 14%, 89%  | Hover / active states          |

### Blue Accent Spectrum

| Token          | Hex       | RGB            | HSL              | Usage                          |
|----------------|-----------|----------------|------------------|--------------------------------|
| `--sky`        | `#5b9bd5` | 91, 155, 213   | 209°, 57%, 60%  | Primary accent (buttons, links)|
| `--sky-deep`   | `#3b7fc4` | 59, 127, 196   | 210°, 54%, 50%  | Hover, active accent           |
| `--sky-dark`   | `#2b5f9e` | 43, 95, 158    | 212°, 57%, 39%  | Deep accent (rare)             |
| `--sky-light`  | `#a8d4f0` | 168, 212, 240  | 203°, 30%, 80%  | Light decorative accents       |
| `--sky-ghost`  | `#dceaf7` | 220, 234, 247  | 209°, 11%, 92%  | Subtle blue backgrounds        |
| `--sky-glow`   | `rgba(91,155,213,0.10)` | —      | —              | Glow effects                   |

### Text Colors

| Token           | Hex       | RGB            | Usage                          |
|-----------------|-----------|----------------|--------------------------------|
| `--midnight`    | `#0f1b2d` | 15, 27, 45     | Main headings (Hero h1)        |
| `--navy`        | `#1a365d` | 26, 54, 93     | Important text, card titles    |
| `--slate`       | `#4a5568` | 74, 85, 104    | Body text, descriptions        |
| `--slate-light` | `#718096` | 113, 128, 150  | Secondary / auxiliary text     |
| `--slate-muted` | `#a0aec0` | 160, 174, 192  | Disabled / very subtle text    |

### Organic Accents (decorative only)

| Token         | Hex       | RGB            | Usage                          |
|---------------|-----------|----------------|--------------------------------|
| `--leaf-green`  | `#88b8a0` | 136, 184, 160  | Plant/leaf decorative color    |
| `--leaf-light`  | `#c5dfd0` | 197, 223, 208  | Orb 3 color, soft green        |

## WCAG Contrast Ratios

Key pairs and their AA/AAA compliance:

| Background    | Foreground     | Ratio | AA (≥4.5:1) | AAA (≥7:1) |
|---------------|----------------|-------|:-----------:|:----------:|
| `#ffffff`     | `#0f1b2d`      | 16.9  | ✅          | ✅         |
| `#ffffff`     | `#1a365d`      | 11.1  | ✅          | ✅         |
| `#ffffff`     | `#4a5568`      | 7.0   | ✅          | ✅         |
| `#ffffff`     | `#718096`      | 4.5   | ✅          | ❌         |
| `#f4f7fb`     | `#4a5568`      | 6.5   | ✅          | ❌         |
| `#f4f7fb`     | `#718096`      | 4.2   | ❌          | ❌         |
| `#ffffff`     | `#5b9bd5`      | 3.2   | ❌          | ❌         |
| `#ffffff`     | `#3b7fc4`      | 4.7   | ✅          | ❌         |

> ⚠️ Note: `--sky` (`#5b9bd5`) on white fails AA for normal text. It is ONLY used for decorative elements, buttons (white text on blue background), and large headings (which need ≥3:1). For body text links, use `--sky-deep` (`#3b7fc4`) which passes AA.

## Color Usage Rules

1. **Background is NEVER pure white (#ffffff)** — always use `--glacier` as the page base
2. **Cards are pure white (`--cloud`)** — to create subtle contrast against the glacial background
3. **Blue is the ONLY accent color** — no secondary accent (red, green, orange, etc.)
4. **Text hierarchy through luminance** — not through hue changes:
   - H1: `--midnight` (darkest)
   - H2/H3: `--navy`
   - Body: `--slate`
   - Caption: `--slate-light`
5. **`--sky` used only for**: buttons (white text on sky bg), link hover states, tag accents, decorative indicators
6. **Organic greens** (`--leaf-*`) are NEVER used for functional UI — only in the blurred orbs and decorative SVGs

## 60-15-10-15 Distribution

| Role           | Color(s)              | ~% |
|----------------|----------------------|-----|
| Background     | `--glacier`          | 60% |
| Card surfaces  | `--cloud`, `--ice`   | 15% |
| Accent         | `--sky`, `--sky-deep`| 10% |
| Text + borders | `--midnight` → `--slate-muted`, `--ice` borders | 15% |

## Gradient Presets

```css
/* CTA button background */
--gradient-cta: linear-gradient(135deg, #5b9bd5 0%, #3b7fc4 100%);

/* Accordion top accent bar */
--gradient-accent-bar: linear-gradient(90deg, #a8d4f0 0%, #5b9bd5 50%, #a8d4f0 100%);

/* Hero heading gradient (optional large text accent) */
--gradient-hero-name: linear-gradient(135deg, #3b7fc4 0%, #5b9bd5 50%, #a8d4f0 100%);
```
