## Testing Guide — `/estate-planning`

### What this tests

Assembling a basic will, healthcare POA, financial POA, and HIPAA authorization from one intake pass; resolving each document type's template independently (attorney's own vs. built-in placeholder); flagging missing required fields per document type, including the hard-stop case of minor children with no named guardian; and never writing a file without confirmation.

### Connectors needed

- **Filesystem**, pointed at a scratch folder (e.g. `~/Matters-TEST/`)

### Base setup

Create the scratch matter folder with baseline intake:

```
~/Matters-TEST/Castellano-Estate-Plan/intake-summary.md
```

`intake-summary.md` contents (synthetic client, do not reuse real data):

```markdown
# Intake Summary — Castellano Matter
**Status:** DRAFT — Attorney review required

## Parties
**Client:** Diane Castellano | 482 Birchwood Lane, Fairview, ST 00045 | DOB 1985-03-14

## Matter Overview
**Practice Area:** Estate Planning
```

Full estate-planning intake (paste this in chat when the skill asks, or save as `estate-planning-intake.md` in the matter folder — either path should work):

```
Family: Married to Robert Castellano. Two children: Emma Castellano (DOB 2016-06-02, minor) and Liam Castellano (DOB 2010-11-19, minor).

Assets: Family home at 482 Birchwood Lane. Joint checking/savings at Fairview Credit Union. Diane's 401(k) at Fidelity (current beneficiary listed as "estate" — flag to update). Employer life insurance policy, $250,000, beneficiary Robert Castellano.

Beneficiaries: Residuary estate to Robert Castellano. If he doesn't survive, split equally between Emma and Liam Castellano.

Executor: Patricia Nolan (primary), 220 Ashford Ct, Fairview, ST 00045. Robert Castellano (alternate).

Guardian for minor children: Mark Castellano, Diane's brother, 55 Pinehill Dr, Fairview, ST 00045 (primary). Patricia Nolan (alternate).

Financial POA agent: Robert Castellano (primary). Patricia Nolan (alternate).

Healthcare POA agent: Robert Castellano (primary). Mark Castellano (alternate).

Healthcare wishes: Does not wish to receive life-sustaining treatment if in a terminal condition or permanent unconsciousness with no reasonable hope of recovery. Wants to be an organ donor.

HIPAA authorized recipients: Robert Castellano (spouse), Mark Castellano (brother).
```

---

### Scenario 1 — Happy path: attorney has a will template, no templates for the other three

**Setup:** In addition to the base setup, create the attorney's own will template with headings deliberately different from the skill's built-in placeholder (so you can visually confirm which one got used):

`~/Matters-TEST/templates/last-will-and-testament-template.md`
```markdown
LAST WILL AND TESTAMENT

PART ONE — IDENTIFICATION OF TESTATOR
I, [Client Full Legal Name], of [Client Address], declare this to be my Last Will and Testament, revoking all prior wills.

PART TWO — FAMILY STATUS
[Marital status and children]

PART THREE — EXECUTOR
I appoint [Executor Name] as Executor of this Will, and [Alternate Executor Name] as successor Executor.

PART FOUR — GUARDIAN FOR MINOR CHILDREN
I appoint [Guardian Name] as guardian of my minor children, and [Alternate Guardian Name] as successor guardian.

PART FIVE — DISPOSITION OF PROPERTY
I give my residuary estate to [Residuary Beneficiary].

PART SIX — SIGNATURE
Signed: _________________________  Date: ___________
```

Confirm no file matching "healthcare," "medical," "financial poa," "durable power of attorney," or "hipaa" exists anywhere in the scratch workspace.

**Prompt:**
```
/estate-planning Castellano-Estate-Plan
```
Provide the full estate-planning intake above when asked (all fields present, including the guardian).

**Expected result:**
- [ ] Skill finds `last-will-and-testament-template.md` as the will's single candidate, runs the completeness check (echoes back `PART ONE` through `PART SIX`), and waits for your confirmation before drafting.
- [ ] Will draft follows the attorney's own headings (`PART ONE — IDENTIFICATION OF TESTATOR`, etc.) — it does **not** substitute the built-in placeholder's `ARTICLE I/II/...` structure.
- [ ] Will draft does **not** add any section the attorney's template doesn't have (e.g. no separate specific-bequests article) — anything the placeholder would normally cover but this template omits is flagged as an item to confirm, not silently inserted.
- [ ] Healthcare POA, Financial POA, and HIPAA authorization each report "no firm template found — built-in placeholder used," and each placeholder carries its own `⚠️ GENERIC PLACEHOLDER — NOT STATE-SPECIFIC` (or equivalent) warning.
- [ ] All four drafts are filled correctly from intake: executor Patricia Nolan / alternate Robert Castellano; guardian Mark Castellano / alternate Patricia Nolan; healthcare agent Robert Castellano / alternate Mark Castellano; financial agent Robert Castellano / alternate Patricia Nolan; HIPAA recipients Robert and Mark Castellano.
- [ ] Missing-fields report is empty or near-empty — every required field for all four documents was supplied in this scenario's intake.
- [ ] `Sources used` lists the will template's path and "built-in placeholder" for the other three, independently.

---

### Scenario 2 — Hard blocker: minor children with no guardian named

This is the regression test for the guardian requirement — the skill must surface this immediately, not bury it in a routine missing-fields list.

**Setup:** Same as Scenario 1, but **omit the entire "Guardian for minor children" line** from the intake you provide.

**Prompt:**
```
/estate-planning Castellano-Estate-Plan
```

**Expected result:**
- [ ] Before moving on to templates, the skill flags — prominently, on its own, not mixed into a longer list — that Emma and Liam Castellano are minors and no guardian was named, and asks who should be named primary and alternate guardian.
- [ ] If you don't answer and tell it to proceed anyway, the will's guardian section is drafted with `[CONFIRM WITH ATTORNEY — GUARDIAN REQUIRED]` rather than being silently omitted or left as a generic `[Guardian Name]` bracket indistinguishable from an ordinary gap.
- [ ] In the final missing-fields report (Step 7 of `SKILL.md`), the guardian flag appears **first**, ahead of lower-stakes gaps.
- [ ] Now answer with a guardian name when the skill asks — verify the will updates to use it and the blocker clears.

---

### Scenario 3 — Unreadable will template (extraction failure)

**Setup:** Replace the Scenario 1 template with a file that can't be read as usable text — e.g. a `.docx` file that's actually renamed binary/image data — saved as `~/Matters-TEST/templates/last-will-template.docx`.

**Prompt:**
```
/estate-planning Castellano-Estate-Plan
```

**Expected result:**
- [ ] Skill attempts to read the file, gets no usable text, and does **not** silently fall back to the built-in placeholder without telling you.
- [ ] Skill asks you to paste the template text directly or save a `.md`/`.txt` copy — for the will specifically, not for all four documents.
- [ ] Healthcare POA, Financial POA, and HIPAA authorization proceed normally with their placeholders in the meantime (a stuck will template shouldn't block the other three).
- [ ] After you paste plain-text template content in the chat, the skill uses it for the will draft.

---

### Scenario 4 — Save to matter folder (confirmation gating)

**Setup:** Reuse the confirmed drafts from Scenario 1.

**Prompt (after confirming all four drafts):**
```
yes, save all four
```

**Expected result:**
- [ ] Skill proposes the exact destination for each document before writing anything:
  - Will → `drafts/will/will-draft-[date].md`
  - Healthcare POA → `drafts/poa/healthcare-poa-draft-[date].md`
  - Financial POA → `drafts/poa/financial-poa-draft-[date].md`
  - HIPAA authorization → `drafts/poa/hipaa-authorization-draft-[date].md`
- [ ] Files are written only inside `Castellano-Estate-Plan/drafts/will/` and `Castellano-Estate-Plan/drafts/poa/` — nowhere else.
- [ ] Re-run and this time confirm only the will (decline the other three) — verify only the will file is written.
- [ ] Re-run once more and respond "no" to all — verify no files are created.

---

### Compliance checklist (every scenario)

- [ ] `⚠️ AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED` header and footer present, including the state-execution-formalities warning specific to this skill.
- [ ] No file is written without an explicit "yes" from the attorney in that conversation.
- [ ] No name, date, asset, or fiduciary designation appears in any draft that wasn't in the intake data or the source template — gaps are marked `[Not provided]` or `[CONFIRM WITH ATTORNEY]`, never guessed.
- [ ] Every placeholder document (any document type without an attorney template) visibly carries the "GENERIC PLACEHOLDER — NOT STATE-SPECIFIC" warning and the witness/notarization block is left as a marker, not drafted.
- [ ] No document claims to be complete or ready to sign — every draft either uses a confirmed attorney template or is clearly marked as a non-state-specific starting point.
