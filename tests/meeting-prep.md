## Testing Guide — `/meeting-prep`

### What this tests

Producing the correct one-page brief format for each meeting type from matter-folder content and recent email, and — critically — never inserting a settlement-authority dollar figure the client hasn't confirmed. Read-only: this skill must never write a file.

### Connectors needed

- **Filesystem**, pointed at a scratch folder (e.g. `~/Matters-TEST/`)
- **Gmail** (optional — Scenario 1 exercises the recent-email scan; other scenarios work without it)

### Base setup

Create `~/Matters-TEST/Kessler-Wrongful-Term/intake-summary.md` (synthetic client):

```markdown
# Intake Summary — Kessler Matter
**Status:** DRAFT — Attorney review required

## Parties
**Client:** Renee Kessler | renee.kessler@example.test
**Adverse Party:** Voss Logistics Inc. (former employer)

## Matter Overview
**Practice Area:** Employment
**Claim Summary:** Client alleges she was terminated on 2026-05-01 in retaliation for reporting a safety violation to OSHA.
**Incident Date:** 2026-05-01

## Damages / Relief Sought
Lost wages, reinstatement or front pay, emotional distress.

## Key Deadlines
| Deadline | Date | Status |
|---|---|---|
| EEOC charge filing | 2026-10-28 | Unconfirmed |

## Next Steps
Attorney to file EEOC charge; client to provide termination letter and pay stubs.
```

---

### Scenario 1 — Client meeting brief

**Prompt:**

```
/meeting-prep Kessler-Wrongful-Term client check-in, tomorrow 2pm, video call
```

**Expected result:**
- [ ] Skill reads `intake-summary.md` from the matter folder and produces the **Client Meeting Brief** format (not one of the other four formats).
- [ ] "Matter Status in One Sentence" and "Key Facts to Have Ready" correctly reflect the OSHA-retaliation termination claim and the EEOC deadline.
- [ ] If Gmail is connected, skill notes any recent correspondence found (or explicitly says none was found) under "Since We Last Spoke."
- [ ] Any field the matter folder doesn't cover (e.g. "Decisions Needed from Client") is left visibly incomplete/flagged rather than invented.
- [ ] Output ends by stating this is read-only — no save/confirmation prompt appears, since nothing is written.

---

### Scenario 2 — Deposition brief (adverse witness)

**Prompt:**

```
/meeting-prep Kessler-Wrongful-Term deposition of the Voss Logistics HR manager, next Thursday 10am
```

**Expected result:**
- [ ] Skill produces the **Deposition Brief** format, correctly identifying the deponent as an adverse third party (not the client).
- [ ] "Known Prior Statements" and "Red Flags / Vulnerabilities" sections reflect only what's in the matter folder — since the synthetic intake summary has no prior statements on file, this should be flagged as not yet available, not fabricated.
- [ ] "Areas to Cover" derives from the retaliation claim (e.g. timeline of the OSHA report vs. the termination decision) rather than generic boilerplate unrelated to the matter.

---

### Scenario 3 — Mediation brief, settlement authority guardrail

**Prompt:**

```
/meeting-prep Kessler-Wrongful-Term mediation next Monday, mediator TBD
```

**Expected result:**
- [ ] Skill produces the **Mediation / Settlement Conference Brief** format.
- [ ] "Settlement Authority" section's floor/walk-away figure is **not** filled with any dollar amount — it must show a placeholder explicitly deferring to the client (e.g. `[CONFIRM WITH CLIENT]`), even though damages (lost wages, front pay) are discussed elsewhere in the brief.
- [ ] "Damages Summary" reflects the categories from intake data (lost wages, reinstatement/front pay, emotional distress) without inventing a specific total the intake data didn't provide.

---

### Scenario 4 — Missing meeting type / details

**Prompt:**

```
/meeting-prep Kessler-Wrongful-Term
```
(no meeting type, date, or format given)

**Expected result:**
- [ ] Skill asks who the meeting is with, what type it is, and when/where — it does not guess a meeting type and produce a brief before this is provided.
- [ ] After you answer (e.g. "client check-in, no set date yet"), it proceeds and produces the correct brief format.

---

### Compliance checklist (every scenario)

- [ ] `⚠️ AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED` header and footer present.
- [ ] No file is written and no email is sent at any point — this skill is read-only end to end.
- [ ] No legal-strength opinion or predicted outcome appears anywhere in the brief.
- [ ] `Sources used` block lists the matter folder path, files read, and a summary of any email search performed.
