## Testing Guide — `/flat-fee-calculator`

### What this tests

Building a revenue model from attorney-supplied hourly rate, task time before/after AI, and matter volume; computing the annualized "leak" from staying hourly post-AI; and correctly ranking three flat-fee scenarios (A: break-even, B: split-savings 50/50, C: value-conscious). The scenario ranking is **not** a fixed order — it depends on how much time AI actually saved — so these scenarios specifically exercise both the common case and the counter-intuitive edge case where the naive assumption ("A is always highest, C is always lowest") is wrong. Also tests confirmation gating before any file is written.

### Connectors needed

- **Filesystem** (optional — only exercised by the real-data cross-check in Scenario 1 and the save step in Scenario 4)

### Base setup

None required for Scenarios 1–3 (inputs given directly in the prompt). Scenario 4 reuses Scenario 1's output.

---

### Scenario 1 — Happy path, large AI time savings (75%)

**Prompt:**

```
/flat-fee-calculator "standard NDA review"
```

When asked, provide:
- Hourly rate: $300/hr
- Time before AI: 2 hours
- Time after AI: 0.5 hours
- Matter volume: 20 per year

**Expected result:**
- [ ] Skill asks for all five inputs (task type, rate, hours before, hours after, volume) before computing anything — it does not proceed with only some of them.
- [ ] Leak per matter = **$450** ($600 baseline − $150 AI-accelerated hourly), annualized leak = **$9,000/year**.
- [ ] Scenario A (break-even) = **$600**/matter ($12,000/year annualized).
- [ ] Scenario B (split-savings) = **$375**/matter ($7,500/year).
- [ ] Scenario C (value-conscious) = **$187.50**/matter ($3,750/year).
- [ ] Comparison table orders the three flat fees **A > B > C** (this task has ≥33% time savings — the ratio `hours_after ÷ hours_before` = 0.25 is well under the 2/3 threshold).
- [ ] "Stay hourly, pre-AI" and "Stay hourly, AI-accelerated" rows both show the **same** effective $/hr worked ($300, the nominal rate) — the skill must not claim the AI-accelerated row has a lower effective rate. Only the *revenue* differs between those two rows, not the rate.
- [ ] Narrative states the annualized leak and the trade-off between scenarios without asserting a scenario is "always" the best or worst choice in general (only for these specific numbers).

---

### Scenario 2 — Edge case: small AI time savings inverts the expected ranking

This is the regression test for a bug caught in review: an earlier draft of this skill wrongly assumed scenario A is always the highest-revenue flat fee and C is always the lowest. That's false when AI only saves a small amount of time.

**Prompt:**

```
/flat-fee-calculator "routine contract redline"
```

When asked, provide:
- Hourly rate: $250/hr
- Time before AI: 1.2 hours
- Time after AI: 1.0 hours
- Matter volume: 40 per year

**Expected result:**
- [ ] Leak per matter = **$50** ($300 baseline − $250 AI-accelerated hourly), annualized leak = **$2,000/year**.
- [ ] Scenario A (break-even) = **$300**/matter.
- [ ] Scenario B (split-savings) = **$275**/matter.
- [ ] Scenario C (value-conscious) = **$312.50**/matter.
- [ ] **Critical check:** the comparison table orders the three flat fees **C > A > B** — C is highest, not lowest, because the time savings here is only ~17% (`hours_after ÷ hours_before` = 0.833, above the 0.8 threshold where C overtakes A). If the skill instead shows A as highest or C as lowest, that's a fail — it means the skill is asserting a memorized ranking instead of computing this specific case.
- [ ] The skill does not describe scenario C as "the value-conscious, lower-revenue option" or similar language that assumes it's the cheapest — for this input, it is the most expensive of the three.

---

### Scenario 3 — Missing required input

**Prompt:**

```
/flat-fee-calculator "estate plan intake to signature package"
```

Provide hourly rate, hours before, and hours after when asked, but **do not provide matter volume** — see how the skill responds.

**Expected result:**
- [ ] Skill explicitly asks for matter volume rather than assuming a number or silently omitting the annualized figures.
- [ ] No comparison table, leak figure, or CSV is presented as final until all five inputs are confirmed.
- [ ] Once you supply the volume, the skill completes the model correctly using it.

---

### Scenario 4 — Save to workspace (confirmation gating)

**Setup:** Reuse the confirmed model from Scenario 1. Point Filesystem at a scratch workspace, e.g. `~/Matters-TEST/`.

**Prompt (after confirming the Scenario 1 model):**

```
yes, save it
```

**Expected result:**
- [ ] Skill proposes the exact path before writing anything, following the pattern `pricing/standard-nda-review-repricing-model-[date].csv` at the **top level** of the workspace — not inside any single matter folder.
- [ ] File is only written after your explicit confirmation.
- [ ] Opening the CSV (in a text editor or spreadsheet program) shows five data rows with fully resolved numbers — no lingering formula placeholders or bracket text like `[Scenario A]`.
- [ ] Re-run and respond "no" instead — verify no file is created.

---

### Compliance checklist (every scenario)

- [ ] `⚠️ AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED` header and footer present, including the "not legal advice, not a fee-reasonableness opinion" language specific to this skill.
- [ ] No file is written without an explicit "yes" from the attorney in that conversation.
- [ ] No rate, time estimate, or volume is invented — every number in the output traces back to what the attorney typed in the prompt (or, for the optional cross-check, to a file the skill actually found and cited).
- [ ] The skill never asserts a scenario ranking (highest/lowest revenue, most/least client-pushback risk) without having computed it for the specific numbers given — not from a general rule of thumb.
