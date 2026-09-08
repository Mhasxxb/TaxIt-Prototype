# TaxIt — Design System

**Pakistan Tax Guidance & Compliance Intelligence Platform**

This document defines the UI toolkit and the rules for how components are built. It does not specify individual components — it specifies the material they are made from and the discipline used to assemble them.

---

## 1. Design Philosophy

TaxIt sits at the intersection of govtech authority and modern fintech clarity. Every visual decision should reinforce three qualities:

- **Trust** — taxpayers are handling statutory obligations. The interface must feel precise, official, and unambiguous. Nothing decorative should ever compete with a figure, a deadline, or a legal reference.
- **Calm density** — tax content is inherently heavy (slabs, sections, withholding rates). The dark canvas absorbs that density; generous spacing and restrained accents keep it readable rather than overwhelming.
- **Guided confidence** — the emerald accent is reserved for the path forward: primary actions, active states, verified statuses, and the AI guide. If it glows green, it moves the taxpayer closer to compliance.

---

## 2. Color Tokens

The palette is a deep-black canvas with elevated charcoal surfaces, a Pakistani emerald primary, and a warm amber secondary for statutory alerts and highlights.

### 2.1 Base / Surface

| Token | Value | Role |
|---|---|---|
| `--bg-canvas` | `#0a0d0e` | App background, deepest layer |
| `--bg-surface` | `#11161b` | Cards, panels, drawers, table rows |
| `--bg-surface-raised` | `#161d24` | Hover states, nested surfaces, popovers |
| `--bg-inset` | `#0d1114` | Input wells, code/figure blocks, recessed areas |
| `--border-default` | `#1e2630` | Card borders, dividers, table rules |
| `--border-strong` | `#2a3542` | Focused containers, active card outlines |

### 2.2 Brand / Accent

| Token | Value | Role |
|---|---|---|
| `--accent-primary` | `#10b981` | Primary actions, active nav, AI guide, verified/filer status |
| `--accent-primary-hover` | `#0ea472` | Hover on primary |
| `--accent-primary-muted` | `rgba(16,185,129,0.12)` | Emerald tint fills (chips, selected rows, callout backgrounds) |
| `--accent-gold` | `#fbbf24` | Deadlines, statutory alerts, premium/highlight moments |
| `--accent-gold-muted` | `rgba(251,191,36,0.12)` | Amber tint fills for warning callouts |

### 2.3 Semantic

| Token | Value | Role |
|---|---|---|
| `--status-success` | `#10b981` | Verified, Paid, ATL Active |
| `--status-warning` | `#fbbf24` | Approaching deadline, pending verification |
| `--status-danger` | `#f87171` | Non-filer surcharge, validation errors, overdue |
| `--status-info` | `#38bdf8` | Informational notices, sync tickers |

### 2.4 Text

| Token | Value | Role |
|---|---|---|
| `--text-primary` | `#e8edf2` | Headings, figures, primary content |
| `--text-secondary` | `#9aa7b4` | Body copy, descriptions, labels |
| `--text-tertiary` | `#5c6b7a` | Metadata, timestamps, placeholder text |
| `--text-on-accent` | `#06251b` | Text on emerald-filled elements |
| `--text-on-gold` | `#2b2005` | Text on amber-filled elements |

**Rules:**
- Emerald and amber never appear together in the same element; they may coexist on a screen but carry different meanings (action vs. alert).
- Pure white (`#ffffff`) is never used for text; `--text-primary` is the ceiling.
- Semantic colors are used at full strength only on badges, icons, and short labels — never for body text blocks.

---

## 3. Typography

### 3.1 Typefaces

| Role | Family | Rationale |
|---|---|---|
| Interface & body | **Inter** | Neutral, highly legible at small sizes, excellent tabular numerals |
| Figures & legal references | **Inter (tabular-nums)** | All PKR amounts, tax rates, NTN/CNIC numbers use tabular figures |
| Urdu content | **Noto Nastaliq Urdu** | Brand tagline, Urdu labels, bilingual support content |

One Latin family across the whole product. Hierarchy is created through size, weight, and color — not through mixing typefaces.

### 3.2 Type Scale

| Token | Size / Line height | Weight | Use |
|---|---|---|---|
| `--type-display` | 32 / 40 | 700 | Page hero headings |
| `--type-h1` | 24 / 32 | 700 | Screen titles |
| `--type-h2` | 20 / 28 | 600 | Section headings, card titles |
| `--type-h3` | 16 / 24 | 600 | Sub-sections, drawer headers |
| `--type-body` | 15 / 24 | 400 | Default reading text |
| `--type-body-sm` | 13 / 20 | 400 | Secondary descriptions, table cells |
| `--type-caption` | 12 / 16 | 500 | Metadata, badges, helper text |
| `--type-figure` | 20 / 28 | 600 | Inline monetary/statutory figures |

**Rules:**
- Body line length stays under 80 characters; long-form legal analysis columns max out at ~68ch.
- Labels use sentence case, never all caps.
- PKR figures always render with thousands separators and tabular numerals so columns align.
- Urdu text gets increased line-height (1.9–2.1) to accommodate Nastaliq ascenders/descenders.

---

## 4. Spacing, Layout & Elevation

### 4.1 Spacing Scale

4px base unit: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64`.

- Card internal padding: `24`
- Gap between sibling cards: `16–20`
- Section vertical rhythm: `48–64`
- Form field vertical gap: `20`

### 4.2 Layout Grid

- Max content width: `1280px`, centered, `24px` gutters.
- 12-column grid on desktop; collapses to single column below `768px`.
- Persistent shell: top navigation bar (64px) is fixed; content scrolls beneath it.
- Detail pages use a two-column split: content (8 cols) + sticky sidebar (4 cols).
- Drawers (AI guide, support) slide from the right at `420–480px` width, overlaying content with a `rgba(10,13,14,0.6)` scrim.

### 4.3 Radii

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `6px` | Badges, chips, small inputs |
| `--radius-md` | `10px` | Buttons, inputs, table containers |
| `--radius-lg` | `14px` | Cards, panels, callouts |
| `--radius-xl` | `20px` | Drawers, modals, hero containers |
| `--radius-full` | `9999px` | Pills, avatars, FAB |

Radius encodes hierarchy: the larger the container, the larger the radius. Never one radius everywhere.

### 4.4 Elevation

Elevation on a dark theme is expressed through **surface lightening + border**, not heavy shadows.

| Level | Treatment |
|---|---|
| 0 — Canvas | `--bg-canvas`, no border |
| 1 — Resting | `--bg-surface` + `--border-default` |
| 2 — Raised / hover | `--bg-surface-raised` + `--border-strong` |
| 3 — Overlay | Level 2 + `box-shadow: 0 16px 40px rgba(0,0,0,0.5)` |
| Glow (reserved) | `0 0 24px rgba(16,185,129,0.35)` — **only** the AI Assistant FAB and primary verification CTA |

The emerald glow is the single "loud" effect in the system. It appears in at most one place per screen.

---

## 5. Iconography & Imagery

- **Icon set:** Lucide, `1.5px` stroke weight, sized `16 / 20 / 24`.
- Icons inherit text color by default; they take semantic color only inside status contexts (badges, alerts).
- No decorative illustration on functional screens. Empty states may use a single restrained line-art motif in `--text-tertiary` with an emerald focal detail.
- Official artifacts (FBR form previews, CPR challans) render inside an inset frame (`--bg-inset`) with a visible border, signalling "document, not interface." Draft previews always carry the diagonal watermark treatment.

---

## 6. Motion

- **Durations:** micro (hover, toggle) `120ms`; standard (expand, fade) `200ms`; structural (drawer, modal) `280ms`.
- **Easing:** `cubic-bezier(0.2, 0, 0, 1)` for entrances; `ease-in` for exits.
- Motion only answers user action — opening a drawer, expanding an accordion, confirming a step. No scroll-triggered entrance animations, no ambient looping effects.
- One permitted ambient exception: a slow, subtle pulse on the AI Assistant FAB glow (~3s cycle, opacity 0.25 → 0.4).
- `prefers-reduced-motion` collapses all transitions to instant state changes and disables the FAB pulse.

---

## 7. Component Building Principles

These rules govern how any component in TaxIt is constructed, regardless of what it is.

### 7.1 Composition over configuration
Components are assembled from primitives (surface, border, text tokens, spacing scale) rather than styled ad hoc. A new component should be expressible entirely in existing tokens; if it can't be, the token system is amended first, then the component built.

### 7.2 Every component has a resting, hover/focus, active, disabled, and loading state
No state is improvised at implementation time. Interactive surfaces move exactly one elevation level on hover. Disabled states reduce opacity to `0.45` and remove interactivity — they never change color semantics.

### 7.3 Focus is always visible
Keyboard focus renders a `2px` emerald outline offset by `2px` on every interactive element. Focus is never removed, only styled.

### 7.4 Status is triple-encoded
Any status (Verified, Pending, Overdue, Filer/Non-Filer) communicates through color **and** icon **and** label. Color alone never carries meaning — this is non-negotiable for a compliance product.

### 7.5 Figures are sacred
Monetary values, tax rates, and statutory references (e.g., Section 154A, PKR 600,000) always use `--type-figure` or tabular body styling, are never truncated, and never wrap mid-number. Computation ledgers right-align all amounts.

### 7.6 Destructive and legal gates are explicit
Actions with legal weight (Submit to FBR IRIS, delete a return) are gated behind explicit confirmation. Primary CTAs for gated actions remain disabled until declaration checkboxes are checked — the disabled → enabled transition is the feedback.

### 7.7 Validation is inline and immediate
Errors render below the field in `--status-danger` with an icon and a plain-language fix ("Enter your 13-digit CNIC without dashes"), never as a generic toast. Error copy states what happened and how to resolve it; it never apologizes and is never vague.

### 7.8 Content-first copy
Interface language is written from the taxpayer's perspective in plain terms — "Check my ATL status," not "Query taxpayer registry." Buttons name their exact outcome and keep that name through the flow (a "Download PDF" button produces a "PDF downloaded" confirmation). English is the primary interface language; Urdu appears where it reduces friction, not as decoration.

### 7.9 Density adapts, hierarchy doesn't
Tables and ledgers may tighten spacing on data-heavy screens (rows at `44px` instead of `52px`), but the type scale and color hierarchy never change per screen. A caption is a caption everywhere.

### 7.10 Accessibility floor
WCAG AA contrast minimum on all text against its surface (verify emerald-on-dark and amber-on-dark pairings at small sizes — use tint fills with light text rather than colored text below 13px). All drawers and modals trap focus, close on `Esc`, and return focus to their trigger. Touch targets are ≥ `44px`.

---

## 8. Voice & Tone

- **Authoritative, not bureaucratic.** Cite the law ("Under Section 149…") but explain it in one plain sentence immediately after.
- **Calm under deadline.** Alerts state the date, the consequence, and the action — no exclamation marks, no urgency theatrics.
- **The AI guide is a colleague, not a character.** It answers directly, cites sections, and links to the full guide. No personality flourishes in compliance contexts.