# Design brief — NHS App unified Test Results

| | |
|---|---|
| Status | Draft |
| Owner | Dan Collins |
| Last updated | 13 July 2026 |
| Related | `nhs-pm-docs` (strategy), `prototype/` (Lovable build), NHS App design system |

## Summary

The NHS App Test Results area currently organises results by **who ordered them** — GP-ordered or hospital-ordered. A growing queue of home-testing integrations (HIV, PSA, bowel screening, HPV, cervical screening) each want to add results to the app, and each is currently scoped as a separate data feed. This brief sets out a different approach: **one unified results feed and a care-setting-agnostic information architecture**, where a single reverse-chronological list is the entry point and provenance becomes metadata rather than a navigation choice. The prototype in this repo exists to demonstrate that this scales and can be made safe.

## The problem

The care-setting taxonomy breaks precisely at the point of the new integrations. A self-sampled HPV kit, a posted bowel screening pack, or a home HIV test does not map cleanly onto "GP-ordered" or "hospital-ordered" — and national screening programmes aren't "GP" or "hospital" in any way a patient would recognise. Forcing each new result type into one of two provenance buckets is a lie of convenience that gets worse with every integration.

The same shape shows up on the back end and the front end:
- **Back end:** five integrations scoped as five feeds is an N-integrations problem. Each new home-testing programme adds another feed to build, run and maintain.
- **Front end:** under a provenance-based IA, each new result type creates pressure either to add a new top-level entry point or to shoehorn results into a category that doesn't describe them.

## Hypothesis

A single unified data feed and a care-setting-agnostic information architecture is the only approach that scales to an open-ended queue of result sources.

## Who this is for

Patients opening Test Results arrive with a simple mental model: *"Do I have any new results, and is there anything I need to do?"* They do not, in general, think in terms of who ordered a test. The current IA makes them answer a question they didn't ask (GP or hospital) before they can see anything. The redesign is built around the question they actually have.

## The design decision

**Demote provenance from navigation to metadata.**

The two-card care-setting split is replaced by a single, reverse-chronological list of all results. Provenance doesn't disappear — it moves in two directions:
- **Down** to the result-detail screen ("Requested by Dr Okafor, Grove Surgery" / "NHS Bowel Cancer Screening Programme"), where knowing who ordered a test is genuinely useful.
- **Sideways** into an optional filter, so the minority who want to filter by source still can.

The payoff is that **a new integration becomes new data, not new IA**. Each result carries `category`, `source`, `status` and `sensitivity` fields; the list reads those as status tags and filters, and the detail screen selects a template from them. Adding a sixth or tenth result source means a new row in one feed — not a new screen and not a new top-level entry point. This is the single-feed thesis seen from the front end: the back end collapses N feeds into one, and the IA collapses N categories into zero.

## Scope

The prototype covers **four screen types** and **two shared chrome elements**. It is deliberately small — the claim is that these four screens absorb every current and queued result source without growing.

Screens:
1. **Test results (list)** — the unified reverse-chronological stream. Replaces the current two-card hub. Each result is a card showing name, date and a status tag; no clinical values or interpretation at list level.
2. **Filter panel** — filter by status, category and source. This is the release valve that lets provenance leave the navigation without being lost.
3. **Result detail — standard** — the workhorse template: what the test was, the result and its plain-English meaning, what to do next, who requested it, how to get help.
4. **Result detail — sensitive / screening** — a distinct, calmer template for results that need careful handling (see below).

**Home screen (entry point).** Not part of the Test Results IA. Included in the prototype
so the results list can be seen in context — where a patient enters from and what they tap.
Reference: `design/home-screen.png`.

Shared chrome: the NHS App top bar (logo + App help) and the fixed bottom tab bar (Home / Messages / Profile).

## Key design decisions

**1. Provenance is metadata, not navigation.** As above — this is the load-bearing decision.

**2. The status taxonomy stays small and patient-safe.** The list uses a minimal set of statuses ("Results ready", "Being processed") rendered as NHS tags. No clinical interpretation appears in a tag, and no result value appears on the list card. Interpretation lives inside the detail screen, wrapped in appropriate context.

**3. Sensitive results get a template, not just a card — this is the safety-critical decision.** HIV especially, but also HPV/cervical and some cancer-related PSA outcomes, cannot be treated as generic result cards. An abnormal result surfacing as a bare status tag with no clinical wrapping is a genuine harm. The design therefore introduces a **three-level sensitivity model**:
   - `standard` — normal detail template.
   - `sensitive` — reduced detail at list level, supportive framing and prominent contact routes in the detail view.
   - `clinicianFirst` — the detail view leads with contacting a clinician *before* revealing any result value; the value is gated behind an explicit "I understand, show my result" action.

   The `sensitivity` field is the data-model correlate of this and must be resolved with clinical safety colleagues early, because it shapes both the feed contract and the screen set. The gated-reveal behaviour in the prototype is a deliberate design *position* to react to, not settled clinical policy.

## Data model implication

The IA presupposes a feed where every result carries at least: `id`, `testName`, `category`, `source`, `date`, `status`, `sensitivity`, `resultSummary`, `requestedBy`. The front end reads `status` → tag, `sensitivity` → template, and `category`/`source` → filters. A fuller feed contract is a separate deliverable; this brief only asserts the fields the IA depends on.

## Out of scope (for this prototype)

Real authentication, live data feeds, notification plumbing, and a full accessibility audit are out of scope. The prototype uses mock data and demonstrates behaviour, not integration. The actual clinical policy for each sensitive test type is explicitly **not** decided here — it's flagged for clinical safety review.

## Open questions

- Is "new / unread" a real per-result state we track, or just a visual treatment on recent items?
- What are the exact sensitivity levels per test type, and is the `clinicianFirst` gated reveal acceptable to clinical safety?
- Confirm the NHS tag tint hexes and v10 corner radii against the live component library.
- Where do results that are genuinely provenance-ambiguous (e.g. a GP-invited screening test) sit for the `source` filter?

## Success criteria

- A patient can find any result without needing to know who ordered it.
- Adding a new result source (the sixth integration) requires new data only — no new screen and no new top-level entry point.
- The sensitive/screening template is reviewed and signed off by clinical safety before any real result type ships through it.

## Design foundations & references

The prototype uses genuine NHS App design tokens (NHS blue `#005eb8`, page background `#f0f4f5`, Arial as the sanctioned Frutiger fallback, sentence case throughout, NHS tag and card-link components in their v10 "rounded" form). The precise, build-ready specification lives alongside this brief in the prototype prompt (`prototype/lovable-prompt.md`) — that file is the source of truth for exact tokens and component anatomy; this brief is the source of truth for *why*.

- NHS App design system: https://design-system.nhsapp.service.nhs.uk/
- NHS digital service manual: https://service-manual.nhs.uk/design-system
- Current-state reference: the existing two-card Test Results hub (care-setting split).
