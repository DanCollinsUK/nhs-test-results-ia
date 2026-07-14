# PRD — Unified Test Results Architecture (NHS App)

**Product area:** NHS App › Test results
**Author:** Senior Product Manager, NHS App & Patient Records
**Status:** Draft for review (Discovery → Alpha gate)
**Version:** 0.1
**Last updated:** 14 July 2026

> **Governance note for reviewers.** Framework references below (DCB0129/DCB0160 clinical risk management, UK GDPR Article 9, Caldicott principles, the sexual-health confidentiality regime, FHIR UK Core, WCAG 2.2 AA) are stable and load-bearing for this design. Specific *current* system names, national screening service endpoints, and live NHS App roadmap items should be validated with the relevant service teams before Alpha — treat those as assertions to confirm, not facts to build on.

---

## 1. Executive summary

Test results reach patients today through fragmented, source-system-shaped channels. The current NHS App screen (see current-state screenshot) offers only a flat split — *GP-ordered* vs *Hospital-ordered* — with no awareness of result type, clinical sensitivity, or the fail-safe communication protocols that govern screening and high-sensitivity diagnostics.

This PRD proposes a **Unified Results Service (URS)**: an orchestration and normalisation layer that aggregates results from multiple governed source feeds and presents a single, consistent, safe patient experience across five initial result types — **PSA, Bowel (FIT) screening, Cervical/HPV screening, and HIV**.

The strategic prize is a coherent, safe, equitable results experience. The central design constraint is that *not all results should be shown to a patient the moment they exist*: some carry embargo, fail-safe, and safeguarding obligations that the current architecture cannot express.

---

## 2. Strategic rationale

**Why now**
- The NHS App is the strategic front door for patient-facing records. Results are one of the highest-demand, highest-anxiety journeys, and fragmentation drives avoidable contacts to GP practices and helplines.
- Source-system-shaped UX (GP vs Hospital) exposes NHS plumbing to patients and cannot scale to screening programmes, which sit outside both categories.
- Rising ask volume for HIV, PSA, and cancer-screening visibility means ad-hoc per-programme integrations will accrue clinical-safety and IG debt if not architected centrally.

**Why not a literal "single data feed"**
The requested "single feed" is the right *goal for the patient* but the wrong *target architecture*. The five types originate in governance-incompatible systems:

| Type | Typical source | Governance characteristic |
|---|---|---|
| PSA | Pathology (GP- or hospital-ordered) | Standard record; cancer-indicative, so result-communication timing matters |
| Bowel (FIT) | National bowel screening service | Programme fail-safe; most results "normal", abnormal → colonoscopy pathway |
| Cervical / HPV | National cervical screening service | HPV-primary; reflex cytology; programme fail-safe comms |
| HIV | Sexual health / GUM services | **Specially protected**; frequently absent from GP record; extreme sensitivity |

A single physical pipe would force the highest-risk data (HIV) through the same rails as reassuring screening results and would breach the sexual-health confidentiality regime. The correct pattern is **one patient experience, many governed feeds, one orchestration layer** deciding *what, when, and how* each result surfaces.

**Bets**
1. A normalisation + orchestration layer reduces per-programme integration cost and clinical-safety review overhead over time.
2. Consistent, safely-worded results reduce inbound contacts and patient anxiety.
3. A reusable embargo/release rules engine becomes the platform capability that unblocks future result types (e.g. genomics, other cancers).

---

## 3. Problem statement & current state

- **Fragmented surface.** GP-ordered and Hospital-ordered results are separate entries; screening results have no home here at all.
- **No result-type intelligence.** The app cannot distinguish a routine cholesterol panel from a PSA or an HIV result, so it cannot apply differentiated handling.
- **No embargo/fail-safe expression.** There is no mechanism to withhold a result pending clinician contact or to align with a screening programme's letter-based fail-safe.
- **No safeguarding model.** Shared devices and coercion risks (e.g. a partner demanding to see HIV status) are not designed for.
- **Inconsistent language.** Result wording, next steps, and interpretation vary by source system.

---

## 4. Goals & success metrics

**Product goals**
1. One coherent, result-type-aware Test results experience.
2. Every result governed by an explicit, auditable release rule (show now / embargo / never-in-app + reason).
3. No result surfaced in a way that breaches clinical-safety or IG obligations.

**Success metrics (targets to be baselined in Discovery)**
- **Safety (guardrail):** Zero Sev-1 clinical-safety incidents attributable to premature/incorrect result disclosure. (Non-negotiable; not traded against other metrics.)
- **Adoption:** % of eligible results viewed in-app within 7 days of release.
- **Contact deflection:** Reduction in results-related GP practice / helpline contacts.
- **Comprehension:** % of users who correctly identify their next step (task-based usability testing).
- **Equity:** Adoption and comprehension gaps across age, deprivation, disability, and digital-exclusion segments held within an agreed tolerance band.
- **Timeliness:** Median lag between source availability and (permitted) in-app visibility.

---

## 5. Scope

**In scope (initial release set)**
- PSA, Bowel (FIT), Cervical/HPV, HIV results surfaced through the Unified Results Service.
- Result-type-aware presentation, embargo/release rules engine, safeguarding controls, and consistent supporting content.

**Out of scope (this phase)**
- Two-way messaging / clinician reply within the results journey.
- Ordering tests or booking follow-up from the results screen.
- Full historical backfill beyond an agreed lookback window.
- Result types beyond the initial five (architecture must not preclude them).

---

## 6. Personas

- **Priya, 34 — anxious first-time screening recipient.** Wants to know if she needs to act, in plain language, without a clinical dictionary.
- **Marcus, 61 — PSA monitoring.** Tracks trend over time; wants context, not a lone number.
- **Devon, 27 — HIV test via a sexual health clinic.** Confidentiality is paramount; may share a device; must not be outed by a notification.
- **Dr Osei — GP.** Needs assurance the app won't surface results before she can contact a patient with bad news, and won't generate avoidable appointment demand.
- **Screening Hub Lead — programme operations.** Owns the statutory fail-safe; needs the app to *supplement*, never *replace*, the programme's assured comms.
- **Clinical Safety Officer (CSO).** Owns the DCB0160 safety case for deployment; gates each release.

---

## 7. Epics, user stories & acceptance criteria

### Epic A — Unified, result-type-aware results view

**A1.** *As a patient, I want all my results in one place with clear categories, so I don't have to guess whether a test was GP or hospital ordered.*
- **AC1** Results are grouped by clinically meaningful category (e.g. "Screening", "Blood & pathology"), not by ordering organisation.
- **AC2** Each result shows: plain-English title, date, status, and a clear single next step.
- **AC3** Results normalise to a common internal model (SNOMED CT / LOINC coded) regardless of source system.
- **AC4** Where a result is withheld by rule, the patient sees an appropriate, non-alarming placeholder (see Epic C), never a silent omission that implies "no result exists".

**A2.** *As Marcus, I want to see my PSA trend over time, so a single value isn't read out of context.*
- **AC1** Repeated numeric results of the same type render as a trend with reference context where available.
- **AC2** Trend view states clearly that interpretation requires a clinician; no automated diagnosis or risk score is shown.

### Epic B — Embargo & release rules engine

**B1.** *As a CSO, I want every result governed by an explicit release rule, so nothing surfaces outside its clinical-safety envelope.*
- **AC1** Each result type maps to a release policy: `SHOW_NOW`, `EMBARGO_UNTIL(condition)`, or `NEVER_IN_APP(reason)`.
- **AC2** Embargo conditions can include: time delay, clinician-contact flag, programme-comms-sent flag, or manual clinical release.
- **AC3** Every release decision is logged immutably with rule ID, inputs, and timestamp for audit.
- **AC4** Rule changes are versioned and require CSO sign-off before taking effect.

**B2.** *As Dr Osei, I want abnormal/actionable results held until patient contact where policy requires it, so patients don't receive bad news alone in an app.*
- **AC1** For configured types, actionable/abnormal results are embargoed pending the defined contact or comms event.
- **AC2** If the embargo condition is not met within its SLA, the system raises an operational alert rather than defaulting to disclosure.
- **AC3** No exception path allows an embargoed high-sensitivity result to surface without an auditable authorised event.

### Epic C — Screening fail-safe alignment (Bowel, Cervical/HPV)

**C1.** *As a Screening Hub Lead, I want the app to supplement, never replace, statutory programme comms, so the national fail-safe remains intact.*
- **AC1** In-app display is derived from the programme's assured result data, and does not pre-empt or contradict the programme letter/fail-safe.
- **AC2** Abnormal/"further tests needed" screening results route the patient to the programme's next-step pathway, with wording agreed with the programme.
- **AC3** If the app and programme data disagree, the programme record is authoritative and the discrepancy is flagged operationally, not shown to the patient.

### Epic D — Sexual-health confidentiality & safeguarding (HIV)

**D1.** *As Devon, I want HIV results handled under sexual-health confidentiality rules, so nothing leaks into records or notifications it shouldn't.*
- **AC1** HIV results are handled under the specially-protected sexual-health regime and are not written to the standard shared GP record via this service.
- **AC2** Notifications for sensitive types are generic by default (e.g. "You have a new message in the NHS App"), never revealing result type or content on lock screen or banner.
- **AC3** Access to sensitive results requires a step-up identity/authentication check appropriate to the risk.
- **AC4** A patient can opt a sensitive result type out of in-app display entirely without affecting their care.

**D2.** *As a safeguarding lead, I want coercion and shared-device risks mitigated, so app access can't be weaponised.*
- **AC1** No result content is exposed pre-authentication (lock screen, widgets, previews).
- **AC2** Support content signposts to help for coercion/abuse in relevant journeys.
- **AC3** Sensitive-result access events are auditable to support any subsequent safeguarding review.

### Epic E — Accessibility, comprehension & equity

**E1.** *As Priya, I want results in plain language with a clear next step, so I know what to do without clinical jargon.*
- **AC1** Content meets WCAG 2.2 AA and an agreed reading-age target; validated in usability testing with low-health-literacy participants.
- **AC2** Every result answers "what does this mean?" and "what do I do next?" in plain English, without giving a diagnosis the app is not permitted to give.
- **AC3** Non-digital fail-safe pathways remain fully intact for digitally excluded patients; the app is never the sole channel for an actionable result.

---

## 8. Architecture overview (target)

**Pattern:** Unified experience over multiple governed feeds.

1. **Source connectors** — per-source adapters (pathology, national bowel screening, national cervical screening, sexual health/GUM), each honouring its own IG regime and data-sharing agreement.
2. **Normalisation layer** — maps incoming results to a common FHIR UK Core model with SNOMED CT / LOINC coding; reconciles patient identity via NHS number with verified identity assurance.
3. **Embargo/Release rules engine** — evaluates each normalised result against its release policy (Epic B); emits `release` or `hold` with full audit.
4. **Presentation service** — renders result-type-aware, plain-language views and drives notifications (generic for sensitive types).
5. **Audit & safety telemetry** — immutable logging of every release decision and access event; feeds the clinical-safety case and IG oversight.

**Cross-cutting:** API-first, event-driven; identity via NHS login with step-up for sensitive types; encryption in transit/at rest; data minimisation by default.

---

## 9. Clinical safety & information governance requirements

- **DCB0129 / DCB0160:** A clinical risk management file and hazard log are maintained; each phase passes a CSO-gated DCB0160 deployment safety case before go-live.
- **UK GDPR Art 9 / DPA 2018:** All five types are special-category data; lawful basis and DPIA completed and signed before Alpha.
- **Sexual-health confidentiality:** HIV handled under the statutory sexual-health regime; segregated from the standard shared record path.
- **Caldicott principles & data minimisation:** Only the minimum result data needed for safe display is surfaced.
- **Fail-safe primacy:** For screening types, the national programme's assured comms and fail-safe remain the source of truth and legal record.

---

## 10. Non-functional requirements

- **Availability:** Results service target ≥ 99.9%; graceful degradation (never fail *open* on an embargo).
- **Security:** Step-up auth for sensitive types; no sensitive content in notifications, previews, or logs in plaintext.
- **Performance:** Result list and detail load within agreed latency budgets on low-end devices and constrained networks.
- **Auditability:** 100% of release and access decisions logged and queryable.
- **Accessibility:** WCAG 2.2 AA across all result journeys.
- **Interoperability:** FHIR UK Core; no proprietary lock-in at the presentation layer.

---

## 11. Risks (RAID)

| # | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| R1 | Patient receives bad news (e.g. positive HIV, cancer-indicative PSA) alone via app | Severe (harm) | Med | Embargo engine + type-specific release policy; fail-open prohibited; CSO gate |
| R2 | Sexual-health data leaks into shared GP record or notifications | Severe (legal/harm) | Med | Segregated HIV path; generic notifications; step-up auth; DPIA |
| R3 | App contradicts / pre-empts statutory screening fail-safe | High | Med | Programme data authoritative; app supplements only; discrepancy alerting |
| R4 | Coercion / shared-device exposure | High | Med | No pre-auth content exposure; opt-out; safeguarding signposting |
| R5 | Source-system heterogeneity delays delivery | Med (schedule) | High | Phased connectors; normalisation layer absorbs variance; start with best-structured feed |
| R6 | Widens health inequalities (digital exclusion) | High | Med | Non-digital fail-safe preserved; equity metric as guardrail; inclusive research |
| R7 | Misinterpretation of raw values without clinical context | Med | High | Plain-language content; trend context; no automated diagnosis; usability testing |
| R8 | Scope creep to two-way messaging / ordering | Med (schedule) | Med | Explicit out-of-scope; architecture leaves hooks without committing |

---

## 12. Phased delivery

Sequencing is driven by **ascending clinical sensitivity and descending fail-safe complexity**, so the riskiest disclosure (HIV) ships last on proven rails.

**Phase 0 — Discovery / Alpha (foundations)**
- Architecture, DPIA, hazard log, and rules-engine design.
- Build normalisation layer + embargo/release engine as thin vertical slice.
- Agree success baselines and equity tolerance band.
- *Gate: DCB0160 alpha safety case + IG sign-off.*

**Phase 1 — PSA (pathology foundation)**
- Onboard pathology connector; ship result-type-aware view and trend for PSA.
- Prove `EMBARGO_UNTIL(clinician-contact)` for actionable results.
- *Why first:* standard record, well-structured pathology data, exercises the engine on a real high-anxiety type without screening/GUM complexity.

**Phase 2 — Bowel (FIT) & Cervical/HPV (screening)**
- Integrate national screening feeds as *supplement* to programme fail-safe.
- Ship "further tests needed" routing agreed with programmes; discrepancy alerting.
- *Why here:* mature national comms and mostly-reassuring outcomes, high patient value, but requires the fail-safe-alignment work built in Phase 2.

**Phase 3 — HIV (high-sensitivity)**
- Segregated sexual-health path; generic notifications; step-up auth; opt-out; safeguarding controls.
- Runs on the now-hardened embargo engine and audit rails.
- *Why last:* highest disclosure and confidentiality risk; benefits from everything proven in Phases 1–2.

**Phase 4 — Platformisation**
- Generalise connectors and rules for future result types (genomics, further cancers); publish reuse pattern.

---

## 13. Dependencies & open questions

**Dependencies**
- Data-sharing agreements per source system (pathology, both screening programmes, sexual-health services).
- NHS login identity assurance levels + step-up capability.
- Programme sign-off on wording and fail-safe alignment (Phase 2).
- CSO capacity for per-phase DCB0160 gates.

**Open questions (to resolve in Discovery)**
1. What is the authoritative contact/comms-sent signal that satisfies each embargo condition, and who owns it?
2. What is the agreed historical lookback window per type?
3. What is the exact segregation model keeping HIV out of the shared record while still visible to the patient?
4. What equity tolerance band is acceptable to the programme boards and IG?
5. Notification default wording for sensitive vs non-sensitive types — one generic standard, or per-type?

---

## Appendix — Test-type governance matrix (working)

| Type | Source class | Default release policy | Fail-safe owner | Notification style | Notes |
|---|---|---|---|---|---|
| PSA | Pathology | `EMBARGO_UNTIL(clinician-contact)` for actionable | GP | Standard | Trend context; no auto-diagnosis |
| Bowel (FIT) | Screening | `SHOW_NOW` (normal) / route to pathway (abnormal) | Screening programme | Standard | App supplements programme comms |
| Cervical/HPV | Screening | `SHOW_NOW` (normal) / route to pathway (abnormal) | Screening programme | Standard | HPV-primary + reflex cytology wording |
| HIV | Sexual health | `EMBARGO_UNTIL(clinician-contact)`; opt-out available | Sexual health service | **Generic only** | Segregated path; step-up auth; safeguarding |

*Policies are illustrative and must be confirmed with each programme/service CSO before build.*
