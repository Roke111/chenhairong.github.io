# Glacier Blue — Component Specification

## Page Layout

```
┌──────────────────────────────────────────┐
│  NAV (minimal, top-right)                │
├──────────────────────────────────────────┤
│  HERO                                    │
│  ├─ Tagline capsule badge                │
│  ├─ HaiRong Chen (giant, squiggle line)  │
│  ├─ One-line subtitle                   │
│  └─ Bottom SVG wave curve               │
├──────────────────────────────────────────┤
│  ACCORDION BLOCKS (4 sections)           │
│  ┌ 01 About       ──────────── [+] ──┐  │
│  │  bio + info grid                   │  │
│  └────────────────────────────────────┘  │
│  ┌ 02 Projects    ──────────── [+] ──┐  │
│  │  2-col card grid                   │  │
│  └────────────────────────────────────┘  │
│  ┌ 03 Skills      ──────────── [+] ──┐  │
│  │  tag cloud                         │  │
│  └────────────────────────────────────┘  │
│  ┌ 04 Connect     ──────────── [+] ──┐  │
│  │  link cards                        │  │
│  └────────────────────────────────────┘  │
├──────────────────────────────────────────┤
│  CTA SECTION (centered card)             │
├──────────────────────────────────────────┤
│  FOOTER                                  │
└──────────────────────────────────────────┘
```

## 1. Ambient Layers

Always present, added at `<body>` opening, before any content.

```html
<div class="bg-grain"></div>
<div class="deco-orbs">
  <div class="deco-orb orb-1"></div>
  <div class="deco-orb orb-2"></div>
  <div class="deco-orb orb-3"></div>
</div>
```

**CSS for ambient layers** — see `assets/css-vars.css` for full styles.

- `.bg-grain`: fixed position noise texture, `opacity: 0.025`, SVG data URI
- `.deco-orb`: fixed position, `filter: blur(80px)`, `pointer-events: none`
- Each orb has unique size, color, position, and `animation-delay`

## 2. Navigation Bar

Minimal, right-aligned, uppercase link with underline-on-hover animation.

```html
<nav class="nav">
  <a href="#about">About</a>
</nav>
```

Key CSS:
- `font-family: var(--font-heading)`, `font-size: 0.8rem`, `font-weight: 600`
- `letter-spacing: 0.06em`, `text-transform: uppercase`
- `color: var(--slate-light)`, hover → `var(--sky-deep)`
- `::after` pseudo-element: 2px sky underline, `width: 0 → 100%` transition

## 3. Hero Section

```html
<header class="hero">
  <span class="tagline">Quantitative Developer & AI Explorer</span>
  <h1>HaiRong <span class="accent">Chen</span></h1>
  <p class="subtitle">量化交易开发者 · AI 应用探索者。...</p>
  <div class="hero-curve">
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
      <path d="M0 40 Q150 0 300 35 Q450 70 600 30 Q750 -10 900 35 Q1050 70 1200 40 L1200 80 L0 80 Z" fill="var(--ice)" opacity="0.5"/>
    </svg>
  </div>
</header>
```

Key specs:
- Tagline: `font-size: 0.75rem`, `letter-spacing: 0.14em`, sky blue bg pill
- H1: `clamp(3rem, 8vw, 5.5rem)`, weight 800, `letter-spacing: -0.025em`
- `.accent` span: gets SVG squiggle underline via `::after` with data URI
- Hero curve: absolute bottom, SVG path with `fill="var(--ice)"` and `opacity="0.5"`
- Padding: `72px 0 100px` (mobile) → `96px 0 128px` (desktop)
- Entrance animation: `heroIn` keyframes (opacity 0→1, translateY 24→0, 1s)

## 4. Accordion Block (Card)

Each accordion section is a white card with rounded corners and ice-blue border.

```html
<div class="accordion" id="accordion">
  <div class="accordion-section" id="about">
    <button class="accordion-header" aria-expanded="false">
      <span class="header-left">
        <span class="header-num">01</span>
        <span class="header-text">关于</span>
      </span>
      <span class="fold-indicator">
        <svg viewBox="0 0 16 16" fill="none">
          <line x1="8" y1="3" x2="8" y2="13" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="3" y1="8" x2="13" y2="8" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </span>
    </button>
    <div class="accordion-content">
      <div class="accordion-content-inner">
        <!-- content here -->
      </div>
    </div>
  </div>
  <!-- repeat for more sections -->
</div>
```

Key specs:

| Property | Value |
|----------|-------|
| Card border-radius | `20px` |
| Card bg | `var(--cloud)` |
| Card border | `1px solid var(--ice)` |
| Gap between cards | `16px` |
| Header min-height | `72px` (mobile) → `80px` (desktop) |
| Header padding | `20px 28px` → `24px 32px` |
| Content inner padding | `0 28px 36px` → `0 32px 44px` |
| Number font | Outfit, `0.7rem`, weight 700, `opacity: 0.5 → 1` when active |
| Title font | Outfit, `1.25rem` → `1.4rem`, weight 600 |
| Title color | `var(--slate)` → hover: `var(--sky-deep)` |
| Fold indicator size | `34px × 34px`, circular, `border-radius: 50%` |
| Fold indicator bg | `var(--ice)` → hover: `var(--frost)` → active: `var(--sky-ghost)` |
| Fold indicator rotation | `0° → 180°` when active |
| Top accent bar | `3px` gradient, only visible when `.active`, positioned `top:0; left:20px; right:20px` |

### Accordion JavaScript

Self-contained JS (no dependencies). See `assets/demo-template.html` for the full script. Key behaviors:
- Single-open mode: closing old section before opening new
- Uses `content.style.maxHeight = inner.scrollHeight + 'px'` for smooth expand
- Resize listener recalculates open section height
- Active section scrolls into view after opening

## 5. Bio / About Content

```html
<p class="bio-text">
  专注于 <strong>量化交易</strong> 与 <strong>AI 应用</strong> 的独立开发者...
</p>
<div class="info-grid">
  <div class="info-item">
    <div class="info-icon">📍</div>
    <div>
      <div class="info-label">位置</div>
      <div class="info-value">中国</div>
    </div>
  </div>
</div>
```

- `.bio-text`: `font-size: 0.9375rem → 1rem`, `color: var(--slate)`, `max-width: 600px`
- `.info-grid`: 2-column grid, `gap: 6px 32px`, top border `1px solid var(--ice)`
- `.info-icon`: `36px × 36px`, `background: var(--sky-ghost)`, `border-radius: 8px`
- Mobile: grid collapses to 1 column at `<480px`

## 6. Project Card Grid

```html
<div class="project-grid">
  <div class="project-card">
    <div class="card-accent"></div>
    <div class="pj-icon">📈</div>
    <h3>Project Name</h3>
    <p>Short description...</p>
    <div class="project-tags">
      <span class="tag accent">MQL4</span>
      <span class="tag">MT4</span>
    </div>
  </div>
</div>
```

- Grid: `grid-template-columns: 1fr 1fr`, `gap: 14px`
- Card: `background: var(--glacier)`, `border-radius: 14px`, `padding: 24px → 28px`
- Card border: `1px solid var(--ice)`
- Hover effect: `transform: translateY(-2px)`, `box-shadow`, `background → var(--cloud)`
- `.card-accent`: `8px` dot, top-right, `background: var(--sky)`, `opacity: 0 → 0.6` on hover
- `.pj-icon`: `46px × 46px`, `background: var(--sky-ghost)`, `border-radius: 8px`
- `h3`: Outfit, `1.05rem`, weight 700, `color: var(--navy)`
- `p`: `0.8125rem`, `color: var(--slate)`, line-height `1.65`
- Mobile collapse to 1 column at `<480px`

## 7. Tags

```html
<!-- Regular tag -->
<span class="tag">MT4</span>
<!-- Accent tag -->
<span class="tag accent">MQL4</span>
```

- `font-size: 0.6875rem`, `font-weight: 600`, `border-radius: 99px`
- Regular: `color: var(--slate-light)`, `background: var(--ice)`
- Accent: `color: var(--sky-deep)`, `background: var(--sky-ghost)`

## 8. Skill Tags (Cloud)

```html
<div class="skills-cloud">
  <span class="skill-tag primary">MQL4 / MQL5</span>
  <span class="skill-tag">量化交易</span>
</div>
```

- `font-size: 0.85rem`, `padding: 9px 20px`, `border-radius: 99px`
- Default: `color: var(--slate)`, `background: var(--glacier)`, `border: 1px solid var(--ice)`
- Hover: `color: var(--sky-deep)`, `border-color: var(--sky-light)`, `box-shadow`
- `.primary`: `color: var(--sky-deep)`, `background: var(--sky-ghost)`, `border: transparent`, `font-weight: 600`

## 9. Contact Links

```html
<div class="connect-list">
  <a class="connect-link" href="mailto:email@example.com">
    <span class="cl-icon">📧</span>
    <span>email@example.com</span>
  </a>
</div>
```

- `padding: 14px 22px`, `border-radius: 8px`
- `background: var(--glacier)`, `border: 1px solid var(--ice)`
- Hover: `background: var(--cloud)`, `border-color: var(--sky-light)`, `box-shadow`
- Icon: `font-size: 1.2rem`

## 10. CTA Section

```html
<div class="cta-section">
  <h2>开始一段对话</h2>
  <p>对量化交易或 AI 应用有想法？随时联系我。</p>
  <a class="btn-cta" href="mailto:...">
    取得联系
    <svg><!-- arrow icon --></svg>
  </a>
</div>
```

- Card: `margin-top: 40px`, `padding: 48px 36px`, centered text
- Background pseudo-element: radial blue glow at top
- `h2`: Outfit, `1.5rem → 1.75rem`, weight 700
- `.btn-cta`: pill button, `background: var(--sky)`, white text
- Button hover: `background: var(--sky-deep)`, `box-shadow` intensifies, `translateY(-1px)`

## 11. Footer

```html
<footer class="footer">
  Designed with clarity · 2026
</footer>
```

- `margin-top: 60px`, `border-top: 1px solid var(--ice)`
- `font-size: 0.75rem`, `color: var(--slate-muted)`, `letter-spacing: 0.06em`

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `< 480px`  | Project grid → 1 col; info grid → 1 col; reduced padding |
| `≥ 768px`  | Full desktop: larger fonts, increased padding, hover effects enabled |
| `prefers-reduced-motion` | All animations/transitions disabled (`0.01ms`) |

## Animation Summary

| Element | Trigger | Property | Duration | Easing |
|---------|---------|----------|----------|--------|
| Hero | page load | opacity + translateY | 1s | ease-out |
| Orbs | continuous | translate + scale | 12-18s | ease-in-out |
| Accordion content | click | max-height | 0.5s | ease-out |
| Content inner | after expand | opacity + translateY(6px) | 0.45s | ease-out |
| Fold indicator | click | rotate(180°) | 0.35s | cubic-bezier |
| Project card | hover | translateY(-2px) + shadow | 0.35s | ease |
| Tag | hover | color + border + shadow | 0.3s | ease |
| CTA button | hover | bg color + shadow + lift | 0.3s | ease |
