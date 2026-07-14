# NHS App — Unified Test Results IA

Prototype of a redesigned NHS App Test Results area: one unified, reverse-chronological
results list where care-setting (GP vs hospital vs screening programme vs home test)
is metadata, not navigation.

See `design-brief.md` for the *why* and `CLAUDE.md` for build rules and project layout.

## Build & run

```
npm install
npm run dev      # dev server
npm run build    # type-check + production build
npm run lint     # oxlint
```

## Screens

- Test results (list) — `src/pages/ResultsListPage.tsx`
- Filter panel — `src/pages/FilterPanelPage.tsx`
- Result detail (standard) — `src/pages/ResultDetailStandard.tsx`
- Result detail (sensitive / screening) — `src/pages/ResultDetailSensitive.tsx`

Styled with real NHS design tokens via `nhsuk-frontend` and `nhsapp-frontend`.
