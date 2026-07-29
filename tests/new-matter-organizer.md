## Testing Guide — `/new-matter-organizer`

### What this tests

Proposing a practice-area-appropriate folder tree and task checklist, correctly classifying existing documents to sort, and never creating, moving, or writing anything without explicit confirmation. Also covers the workspace-scan fix from PAC-66: sibling non-matter folders like `templates/` must not be mistaken for a matter folder when the skill infers naming conventions.

### Connectors needed

- **Filesystem**, pointed at a scratch folder (e.g. `~/Matters-TEST/`)

### Base setup

Create one pre-existing matter folder so the skill has a naming convention to infer from, plus a `templates/` folder that is **not** a matter:

```
~/Matters-TEST/Ortiz-Slip-Fall/          (can be empty or reuse the one from tests/engagement-letter.md)
~/Matters-TEST/templates/engagement-letter-template.md   (any placeholder content)
```

---

### Scenario 1 — Happy path, personal injury matter

**Prompt:**

```
/new-matter-organizer "Delgado-Auto-2026" "personal injury"
```

**Expected result:**
- [ ] Skill scans the workspace one level deep, infers the naming pattern from `Ortiz-Slip-Fall` (e.g. `LastName-Description`), and proposes `Delgado-Auto-2026` or asks to confirm the name/pattern.
- [ ] Skill does **not** treat `templates/` as an existing matter when inferring the naming convention — verify it isn't referenced as a "prior matter" example and its structure doesn't influence the proposed tree.
- [ ] Proposed folder tree matches the Personal Injury template from `SKILL.md` (`intake-summary.md`, `correspondence/client/`, `correspondence/opposing-counsel/`, `medical/records/`, `medical/bills/`, `evidence/photos/`, `evidence/police-reports/`, `damages/`, `pleadings/`, `discovery/requests/`, `discovery/responses/`, `expert-witnesses/`, `settlement/`).
- [ ] Skill asks "Does this structure look right...?" and waits before proposing the task checklist.
- [ ] Proposed `tasks.md` matches the Personal Injury checklist (conflicts check, SOL confirmation, engagement letter, insurance coverage identification, etc.).
- [ ] Skill asks for confirmation again before creating anything — respond "yes, create it" and verify it then creates the folder tree, writes `tasks.md`, and writes the matter-root `README.md` described in Step 6.
- [ ] The matter-root `README.md` it writes correctly names the practice area and prompts to run `/intake-summary` next.

---

### Scenario 2 — Existing documents to sort

**Setup:** Create a source folder with files to classify:

```
~/Matters-TEST/_inbox/police-report-delgado.pdf
~/Matters-TEST/_inbox/elmwood-urgent-care-records.pdf
~/Matters-TEST/_inbox/IMG_4021.jpg
~/Matters-TEST/_inbox/retainer-agreement-signed.pdf
~/Matters-TEST/_inbox/mystery-file-042.xlsx
```

**Prompt:**

```
/new-matter-organizer "Delgado-Auto-2026" "personal injury" — I have documents to sort in ~/Matters-TEST/_inbox
```

**Expected result:**
- [ ] Proposed mapping: `police-report-delgado.pdf` → `evidence/police-reports/` or `discovery/police-reports/`; `elmwood-urgent-care-records.pdf` → `medical/records/`; `IMG_4021.jpg` → `evidence/photos/`; `retainer-agreement-signed.pdf` → `contracts/` (per the "retainer" keyword rule).
- [ ] `mystery-file-042.xlsx` matches no rule and is flagged `⚠️ Unable to classify — attorney must assign`, listed separately — it is not force-fit into an arbitrary folder.
- [ ] Full mapping is presented for confirmation before any file is moved.
- [ ] Respond "skip" — verify the folder structure and `tasks.md` are still created, but no files are moved from `_inbox`.
- [ ] Re-run and respond "yes, move them" instead — verify only the four classifiable files move to their proposed destinations, and `mystery-file-042.xlsx` stays in `_inbox` pending your manual call.

---

### Scenario 3 — Different practice area (family law)

**Prompt:**

```
/new-matter-organizer "Voss-Divorce-2026" "family law"
```

**Expected result:**
- [ ] Folder tree matches the Family Law template (`financial-disclosures/`, `child-custody/`, `property-division/`, `orders/`, etc.) — not the personal injury template reused by mistake.
- [ ] Task checklist matches the Family Law checklist (temporary orders assessment, asset preservation advisory, date-of-separation confirmation, etc.).

---

### Scenario 4 — No confirmation, no changes

**Prompt:**

```
/new-matter-organizer "Test-Abort-Matter" "general"
```

When the skill presents the proposed tree and checklist, respond:

```
actually, let's not do this right now
```

**Expected result:**
- [ ] No folder, file, or document move occurs — `~/Matters-TEST/Test-Abort-Matter/` does not exist afterward.
- [ ] Skill acknowledges the cancellation without pressuring for confirmation again.

---

### Compliance checklist (every scenario)

- [ ] `⚠️ AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED` header and footer present.
- [ ] No folder is created, no file is written, and no document is moved until you give explicit confirmation for that specific action.
- [ ] No document content is analyzed for privilege or relevance — classification is filename-based only, per `SKILL.md`.
- [ ] No conflicts check is actually performed — it only appears as a checklist item for the attorney to do.
