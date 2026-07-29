# Testing Guide — `/engagement-letter`

## What this tests

Drafting a retainer/engagement letter from intake data, including the template-matching behavior added for PAC-66: use the attorney's own saved template when one exists (matter folder or a shared `templates/` folder), fall back to the built-in template when it doesn't, and never fabricate content beyond what's in the source.

## Connectors needed

- **Filesystem**, pointed at a scratch folder (e.g. `~/Matters-TEST/`)
- **Gmail** (optional — only exercised if you want to test the fee-terms-from-email lookup in Step 1; every scenario below works without it)

## Base setup

Create the scratch matter folder:

```
~/Matters-TEST/Ortiz-Slip-Fall/intake-summary.md
```

`intake-summary.md` contents (synthetic client, do not reuse real data):

```markdown
# Intake Summary — Ortiz Matter
**Status:** DRAFT — Attorney review required

## Parties
**Client:** Priya Ortiz | 118 Larkspur Ave, Millbrook, ST 00021 | priya.ortiz@example.test

## Matter Overview
**Practice Area:** Personal Injury
**Claim Summary:** Client slipped on an unmarked wet floor at Cedar Market on 2026-04-02 and fractured her wrist.
**Incident Date:** 2026-04-02

## Fee Agreement
**Fee type discussed:** Contingency
**Rate or amount:** 33% pre-suit, 40% post-suit
**Retainer discussed:** No retainer deposit required
```

---

## Scenario 1 — No template anywhere (built-in fallback)

**Setup:** Base setup only. Confirm no file in `Ortiz-Slip-Fall/` or in a `templates/` folder has a name containing "engagement," "retainer," "fee agreement," or similar.

**Prompt:**
```
/engagement-letter Ortiz-Slip-Fall
```

**Expected result:**
- [ ] Skill reports it found no attorney template and is using the built-in default.
- [ ] Draft uses the CONTINGENCY fee section (33% pre-suit / 40% post-suit) filled from intake data; the HOURLY and FLAT FEE sections are not present.
- [ ] Client name/address filled correctly from `intake-summary.md`; matter description reflects the slip-and-fall facts.
- [ ] Any field not present in intake data (attorney name, bar number, firm name, phone, email) is marked `[CONFIRM WITH ATTORNEY]`, not guessed.
- [ ] Draft includes a line telling you that saving your own template at `templates/engagement-letter-template.md` (or `.txt`/`.docx`) will make future drafts use your own wording.
- [ ] `Sources used` lists `Template: built-in default — no firm template found`.
- [ ] Skill asks before saving anything — does not write a file until you confirm.

---

## Scenario 2 — Attorney template in the matter folder (single candidate)

**Setup:** Add this file to the matter folder:

`~/Matters-TEST/Ortiz-Slip-Fall/retainer-template.md`
```markdown
PROFESSIONAL SERVICES AGREEMENT

This agreement is between [Firm name] ("Firm") and [Client full name] ("Client") regarding [matter description].

1. SERVICES
The Firm will provide legal services limited to the matter described above.

2. COMPENSATION
[Fee terms]

3. CLIENT COOPERATION
Client agrees to cooperate fully and respond to Firm's requests in a timely manner.

4. GOVERNING LAW
This agreement is governed by the laws of [State].

Signed: _________________________  Date: ___________
```

**Prompt:**
```
/engagement-letter Ortiz-Slip-Fall
```

**Expected result:**
- [ ] Skill finds `retainer-template.md` as a single candidate and reads it (no disambiguation needed).
- [ ] Skill runs the completeness check — echoes back the four section headings (SERVICES, COMPENSATION, CLIENT COOPERATION, GOVERNING LAW) and asks you to confirm before drafting. **Do not confirm yet** — verify it stops and waits.
- [ ] After you confirm, the draft follows the template's own section structure and headings (`PROFESSIONAL SERVICES AGREEMENT`, `1. SERVICES`, etc.) — it does **not** substitute the built-in letter's headings (`SCOPE OF REPRESENTATION`, `FEES AND PAYMENT`, etc.).
- [ ] `[Client full name]`, `[matter description]`, and `[Fee terms]` are filled from intake data (contingency terms).
- [ ] The draft does **not** add a TERMINATION or NO GUARANTEE OF OUTCOME section — those exist in the built-in template but not in this attorney template, and the rule is "flag, don't invent." Verify the skill instead flags to you that the template has no termination clause, as an item to confirm.
- [ ] `Sources used` lists `Template: ~/Matters-TEST/Ortiz-Slip-Fall/retainer-template.md` (or equivalent confirmed path).

---

## Scenario 3 — Multiple candidates in the shared `templates/` folder (disambiguation)

**Setup:** Remove the file from Scenario 2 (or use a fresh matter folder without it). Create:

```
~/Matters-TEST/templates/engagement-letter-hourly-template.md
~/Matters-TEST/templates/engagement-letter-contingency-template.md
```

Give each distinct placeholder content (e.g. the hourly one titled `HOURLY FEE AGREEMENT`, the contingency one titled `CONTINGENCY FEE AGREEMENT`) so you can tell which one got used.

**Prompt:**
```
/engagement-letter Ortiz-Slip-Fall
```

**Expected result:**
- [ ] Skill finds both files as candidates in the shared `templates/` folder.
- [ ] Since the matter's confirmed fee type (from `intake-summary.md`) is contingency, the skill either auto-selects `engagement-letter-contingency-template.md` or explicitly asks you which one to use — it does not silently pick the wrong one or merge both.
- [ ] Draft is based on whichever template was selected/confirmed, titled accordingly.

---

## Scenario 4 — Unreadable template (extraction failure)

**Setup:** Create a file that cannot be read as usable text — e.g. a `.docx` file that is actually a renamed image, or any binary garbage saved as `~/Matters-TEST/Ortiz-Slip-Fall/engagement-template.docx`.

**Prompt:**
```
/engagement-letter Ortiz-Slip-Fall
```

**Expected result:**
- [ ] Skill attempts to read the file, finds no usable text, and does **not** silently fall back to the built-in template or guess at content.
- [ ] Skill asks you to either paste the template text directly or save a `.md`/`.txt` copy.
- [ ] No draft is produced until you respond — try pasting a short template as plain text in the chat and confirm the skill then proceeds using that pasted text.

---

## Scenario 5 — Ambiguous/incomplete intake data

**Setup:** Use a matter folder with no `intake-summary.md` at all (e.g. `~/Matters-TEST/NewClient-NoIntake/`).

**Prompt:**
```
/engagement-letter NewClient-NoIntake
```

**Expected result:**
- [ ] Skill reports no intake file was found and asks for the five items listed in Step 1 (client name/address, matter description, fee type, fee amount/terms, scope exclusions) instead of drafting with placeholders for everything.
- [ ] Provide partial answers (e.g. client name and matter description only, skip fee details) and confirm the resulting draft marks the fee section and any other missing item as `[CONFIRM WITH ATTORNEY]` rather than inventing a plausible number.

---

## Compliance checklist (every scenario)

- [ ] `⚠️ AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED` header and footer present.
- [ ] No file written without an explicit confirmation step you can decline.
- [ ] No contingency percentage, fee amount, or clause appears that wasn't in intake data or the source template.
- [ ] Draft never claims to have sent anything or contacted the client — this skill is draft-only.
