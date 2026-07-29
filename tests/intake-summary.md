# Testing Guide — `/intake-summary`

## What this tests

Converting raw, unstructured intake notes (pasted text or a file in the matter folder) into the structured `intake-summary.md` case brief that every other skill reads from — including correctly flagging missing/critical items instead of inventing them.

## Connectors needed

- **Filesystem**, pointed at a scratch folder (e.g. `~/Matters-TEST/`)

## Base setup

None required for Scenario 1 (pasted notes). Scenarios 2–3 create their own files.

---

## Scenario 1 — Happy path, pasted consultation notes

**Prompt:**
```
/intake-summary
```
then paste these raw notes when asked (synthetic client — do not reuse real data):

```
Consult 2026-07-14 w/ Marcus Dunning. Rear-ended on Route 9 near the Elmwood exit on 6/2/26,
other driver ran the light. Marcus has whiplash + lower back pain, saw Dr. Feld at Elmwood
Urgent Care same day, still in PT 2x/week. Other driver is Tanya Brisk, her insurer is
Palisade Mutual, claim # PM-88213. Marcus has photos of both cars and the intersection on
his phone, will send. No prior attorney, no lawsuit filed. Wants to know if he should accept
Palisade's $4,000 offer - I said no, too early, medical treatment ongoing. Fee: contingency,
33% standard. Told him I need his medical records and the police report. He'll email both by
end of week. Statute of limitations - need to check, this is a car accident so probably the
state's personal injury SOL from date of accident, didn't confirm with him.
```

**Expected result:**
- [ ] Parties section: client (Marcus Dunning), adverse party (Tanya Brisk), third party (Palisade Mutual, claim # PM-88213) all captured.
- [ ] Matter Overview: practice area = personal injury / auto accident, incident date = 2026-06-02, claim summary reflects rear-end collision and liability (other driver ran the light).
- [ ] Damages/Relief: whiplash and lower back pain, ongoing PT, noted as itemized from notes (not embellished with specifics not given, like a dollar damages total).
- [ ] Key Deadlines table: statute of limitations shown as **unconfirmed / flagged for verification** — the skill must not compute or assert a specific SOL date on its own, since the attorney didn't confirm one and this skill doesn't calculate deadlines (that's `/court-deadline`'s job).
- [ ] Evidence/Documents: photos (promised), medical records (promised), police report (promised) — all listed under "Promised / Needed," not "Received."
- [ ] Fee Agreement: contingency, 33%, correctly captured.
- [ ] Next Steps: client to send medical records + police report; attorney to advise on the $4,000 offer once treatment data is in.
- [ ] Critical Flags section explicitly calls out: SOL not confirmed (flagged as urgent), conflicts check required (adverse party name given), no other concerns invented.
- [ ] Skill asks whether to save as `intake-summary.md` and does not write the file until you confirm.

---

## Scenario 2 — Sparse notes (most fields missing)

**Prompt:**
```
/intake-summary
```
then paste:

```
New client, Dana Iwu. Wants help with a contract dispute with a vendor. Will follow up with details.
```

**Expected result:**
- [ ] Every field with no information in the notes is marked `[Not provided]` — not inferred or filled with a plausible guess (e.g. no invented vendor name, no invented dollar amount, no invented incident date).
- [ ] Critical Flags section flags statute of limitations as unconfirmed and notes there isn't enough information yet to identify a conflicts-check target beyond the client's own name.
- [ ] The summary is still produced in the full structured format (not refused) — sparse input degrades gracefully into a mostly-`[Not provided]` document, it doesn't cause the skill to give up.

---

## Scenario 3 — From a matter folder file

**Setup:** Create `~/Matters-TEST/Iwu-Contract/raw-notes.txt` containing the same sparse text from Scenario 2, plus one extra sentence: `Contract is with Brightline Supply Co., dispute is about a missed delivery deadline in March 2026.`

**Prompt:**
```
/intake-summary ~/Matters-TEST/Iwu-Contract
```

**Expected result:**
- [ ] Skill locates and reads `raw-notes.txt` from the folder via the Filesystem connector without being told the exact filename.
- [ ] Adverse party (Brightline Supply Co.) and a rough incident window (March 2026) are captured; everything still not mentioned stays `[Not provided]`.
- [ ] Skill offers to save the result as `intake-summary.md` in `~/Matters-TEST/Iwu-Contract/` specifically (the folder you gave it), and confirms this is the anchor file other skills (`/engagement-letter`, `/meeting-prep`, etc.) will read.

---

## Compliance checklist (every scenario)

- [ ] `⚠️ AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED` header and footer present.
- [ ] No file written without explicit confirmation.
- [ ] No claim-merits evaluation, no invented statute-of-limitations date, no conflicts check actually performed (only flagged for the attorney to run).
- [ ] Output matches the structured template sections from `SKILL.md` (Parties, Matter Overview, Damages, Key Deadlines, Evidence, Fee Agreement, Next Steps, Critical Flags).
