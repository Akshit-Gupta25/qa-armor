# Design Brief

**QA Armor v2** — Professional dark-theme SaaS dashboard with AI-powered QA testing and code analysis. Premium modern tech aesthetic with refined hierarchy, semantic input validation, and multi-page navigation. Enhanced UX clarity for code/repo analysis workflows.

## Color Palette (OKLCH)

| Semantic | Dark Value | Purpose |
|----------|-----------|---------|
| background | 0.065 0 0 | Deepest dark page background |
| card | 0.11 0 0 | Card/panel surfaces |
| elevated | 0.14 0 0 | Hover/elevated surfaces |
| border | 0.18 0 0 | Subtle 1px borders |
| primary/accent | 0.64 0.24 264 | Blue: CTAs, active states, links, tabs |
| success | (chart-3) 0.62 0.25 160 | Green: pass/success states |
| destructive | 0.62 0.24 25 | Red: fail/critical severity |
| warning | (chart-1) 0.56 0.27 135 | Amber: flaky/warning severity |
| text-primary | 0.95 0 0 | Primary foreground text |
| text-secondary | 0.55 0 0 | Secondary/muted text |

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | Space Grotesk | 500 | 28–32px |
| Headers | Space Grotesk | 500 | 18–20px |
| Body | Inter | 400 | 14px |
| Mono/Code | JetBrains Mono | 400 | 11–14px |
| Labels | Inter | 600 | 12px, +0.05em tracking |
| Input Hints | Inter | 400 | 12px, text-secondary |

## Shape Language

- Border radius: 12px (cards), 8px (buttons/pills), 4px (inputs/code blocks), 0 (tables)
- Borders: 1px, color: var(--border)
- Spacing: 8px base unit, density varies by zone
- Icons: Lucide React, 16px default, 20px primary actions

## Structural Zones

| Zone | Background | Border | Purpose |
|------|-----------|--------|---------|
| Sidebar | card | border | Navigation + projects (240px fixed) |
| Top nav | card | border-b | Breadcrumb, search, user actions |
| Main content | background | none | Scrollable content area |
| Card | elevated | border | Data containers, hover subtle shadow |
| Tab nav | card | border-b | Horizontal tab selection |
| Code editor | background | border | Mono syntax context |
| Input group | background | border | Form fields with inline hints |
| Modal/Popover | popover | border | Overlay surfaces |

## Input/Form Patterns

- Labels: 12px, font-semibold, above field (no placeholder)
- Hints: 11px, text-secondary, below field
- Focus: ring-2 ring-accent
- Error: border-destructive, red hint text
- Tab navigation: blue underline on active, grey on inactive
- Upload zones: dashed border, hover → blue accent edge + subtle bg lift

## Interactive States

- Hover: 200ms transition, subtle ring/shadow lift, no decoration
- Active: Blue accent (tabs, nav, links), left border for nav items
- Running: status-pulse animation (2s), used for in-progress analysis
- Disabled: muted-foreground, 0.5 opacity
- Focus: ring-2 ring-accent

## Motion

- Hover transitions: 200ms ease (--transition-hover)
- Panel slides: 300ms (--transition-smooth)
- Status pulse: 2s ease-in-out infinite (analysis loading state)
- Fade-in: 300ms ease-out

## Feature: Code Analysis

**Page**: New "Code Analysis" section (sidebar nav + pages route)
**Input Tabs**: GitHub repo URL | Web URL | Paste Code
**Output Report**: Severity cards (critical/warning/info) + file findings table + category breakdown + recommendations
**Analysis Flow**: Input → 2–3s mock analysis → report visualization

## Accent Usage

Blue for primary CTAs, active tabs, focused inputs, and nav states. Green/red/amber reserved for semantic status/severity. **Sparingly** — accent is attention.

## Layout Approach

- **Grid-based**: 24px padding, 16px gaps, 4-col responsive down to 1-col mobile
- **Card-based**: Self-contained units, 12px radius, 1px border
- **Tabs**: Horizontal tab navigation with blue active underline
- **Tables**: Dense rows, 0 border-radius, row hover: bg-elevated
- **Code display**: Monospace editor, full-width, dark background
- **Input form**: Vertical stack, labels above, hints below, 100% width on mobile

## Signature Detail

Subtle blue glow on card/tab hover, deliberate surface layering (background → card → elevated), and semantic severity indicators create depth through restraint. Form inputs use clear labels and contextual hints to guide user actions.

## Responsive Breakpoints

- Desktop (≥1280px): Full sidebar (240px) + normal columns
- Tablet (768–1279px): Sidebar icon-only (64px)
- Mobile (≤767px): Sidebar hidden, hamburger menu, stacked 1-col

## Constraints

- No full-page gradients, no decorative blur orbs
- No rainbow palettes; max 5 semantic colors
- All text uses Inter (body) / Space Grotesk (display) / JetBrains Mono (code)
- Card inner spacing: 16px
- Form labels always visible (no floating placeholders)
- Input hints provide clear context (URL format, code paste size limits, etc.)
