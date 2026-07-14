# NHS App — Unified Test Results IA

Prototype and PRD for a redesigned NHS App Test Results area. Thesis: replace the current
care-setting split (GP-ordered vs hospital-ordered) with one unified, reverse-chronological
list where provenance is metadata, not navigation. A new result source becomes new data,
not new IA.

## Project layout
- App (Vite + React + TypeScript) lives at the repo root: `src/`, `index.html`, `package.json`.
- `design-brief.md` — the *why*: problem, hypothesis, IA decision, scope, open questions.
- `prototype/lovable-prompt.md` — exact NHS design tokens, component anatomy, and mock data. Source of truth for pixels (named for its origin; used here as the design spec).
- `prototype/claude-code-prompt.md` — the build instruction used to generate this prototype.

## Build & run
- Install: `npm install`
- Dev server: `npm run dev`
- Build (must pass before work is done): `npm run build`
- Type check / lint if configured: `npm run typecheck`, `npm run lint`

## Design rules (always apply)
- Care-setting is metadata, never top-level navigation. Provenance appears only on the result-detail screen and as an optional filter.
- No clinical values or interpretation on list cards — name, date, and status tag only.
- The `sensitivity` field drives the detail template: `standard` -> standard; `sensitive` -> supportive template with reduced list detail; `clinicianFirst` (e.g. HIV) -> contact-a-clinician framing first, result gated behind an explicit "show my result" action. Treat the gated reveal as a design position, not settled clinical policy.
- Sentence case everywhere. WCAG 2.2 AA. Copy stays plain, calm, and non-alarming.
- Real NHS styling via `nhsuk-frontend` + `nhsapp-frontend` (class-based CSS, not React components). Frutiger falls back to Arial by design. Page background is `#f0f4f5`, never white.

## Quality bar
- Small, single-purpose components (AppHeader, TabBar, ResultCard, StatusTag, CareCard, FilterPanel, ResultDetailStandard, ResultDetailSensitive).
- Every interactive element has a visible NHS focus state and a 44px minimum target.
- List, empty, and `processing` states all render correctly.
- After each change: run the build, then self-review against these rules before continuing.

## Workflow
- Prototype build happens on branch `prototype`. Commit in small, logical increments. Don't push without checking first.
