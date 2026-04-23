# Design Brief

**QA Armor** — Professional dark-theme SaaS dashboard for AI-powered QA testing. Premium modern tech aesthetic with refined color hierarchy, clean typography, and data-dense card layouts.

## Color Palette (OKLCH)

| Semantic | Dark Value | Purpose |
|----------|-----------|---------|
| background | 0.065 0 0 | Deepest dark page background |
| card | 0.11 0 0 | Card/panel surfaces |
| elevated | 0.14 0 0 | Hover/elevated surfaces |
| border | 0.18 0 0 | Subtle 1px borders |
| primary/accent | 0.64 0.24 264 | Blue: CTAs, active states, links |
| success | (chart-3) 0.62 0.25 160 | Green: pass/success states |
| destructive | 0.62 0.24 25 | Red: fail/critical states |
| warning | (chart-1) 0.56 0.27 135 | Amber: flaky/warning states |
| text-primary | 0.95 0 0 | Primary foreground text |
| text-secondary | 0.55 0 0 | Secondary/muted text |

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | Space Grotesk | 500 | 28–32px |
| Headers | Space Grotesk | 500 | 18–20px |
| Body | Inter | 400 | 14px |
| Mono/Labels | JetBrains Mono | 400 | 11–14px |
| Badges | Inter | 600 | 11px, uppercase, +0.05em tracking |

## Shape Language

- Border radius: 12px (cards), 8px (buttons/pills), 0 (tables)
- Borders: 1px, color: var(--border)
- Spacing: 8px base unit, density varies by zone
- Icons: Lucide React, 16px default, 20px primary actions

## Structural Zones

| Zone | Background | Border | Purpose |
|------|-----------|--------|---------|
| Sidebar | card | border | Navigation (240px fixed) |
| Top nav | card | border-b | Breadcrumb, search, actions |
| Main content | background | none | Scrollable content area |
| Card | elevated | border | Data containers, hover glow |
| Modal/Popover | popover | border | Overlay surfaces |

## Interactive States

- Hover: 200ms transition, ring-1 ring-accent/30, shadow-lg
- Active: Blue left border (sidebar nav), text-accent
- Running: status-pulse animation (2s)
- Disabled: muted-foreground, 0.5 opacity
- Focus: ring-2 ring-accent

## Motion

- Hover transitions: 200ms ease (--transition-hover)
- Panel slides: 300ms (--transition-smooth)
- Status pulse: 2s ease-in-out infinite
- Fade-in: 300ms ease-out

## Accent Usage

Blue (#3B82F6) for primary CTAs, active navigation, focused inputs. Green, red, amber reserved for semantic status (pass, fail, warning). Purple (#8B5CF6) for AI-generated/beta badges (future). **Sparingly** — accent is accent, not ambient.

## Layout Approach

- **Grid-based**: 24px padding, 16px gaps, 4-col responsive down to 1-col
- **Card-based**: Self-contained data units with consistent 12px radius, 1px border
- **Data tables**: Dense rows, 0 border-radius, row hover: bg-elevated
- **Sidebar nav**: Icon + label, active state via left border + background

## Signature Detail

Subtle blue glow on card hover creates tactile feedback without chrome. Combined with deliberate surface layering (background → card → elevated), this creates depth-through-restraint aesthetic — premium, not busy.

## Responsive Breakpoints

- Desktop (≥1280px): Full sidebar (240px) + normal columns
- Tablet (768–1279px): Sidebar icon-only (64px)
- Mobile (≤767px): Sidebar hidden, hamburger menu, stacked 1-col

## Constraints

- No full-page gradients, no decorative blur orbs
- No rainbow palettes; max 5 semantic colors
- All text uses system/bundled fonts only
- Card inner spacing: 16px (compact density)
- No arbitrary color values (#fff, rgb(...)); CSS variables only
