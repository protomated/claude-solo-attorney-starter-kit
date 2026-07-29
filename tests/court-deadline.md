## Testing Guide — `/court-deadline`

### What this tests

Computing a deadline from an attorney-supplied trigger date and rule, showing visible step-by-step reasoning, flagging ambiguity instead of guessing, and never creating a calendar event without confirmation. This skill has no rule database — the attorney supplies the rule every time, so tests focus on reasoning correctness and confirmation gating, not legal accuracy of any built-in rule.

### Connectors needed

- **Google Calendar** (to test event creation in Scenario 1; Scenarios 2–4 can be run without confirming the event)

### Base setup

None — this skill takes its inputs directly in the prompt, no matter folder required.

---

### Scenario 1 — Happy path, unambiguous rule

**Prompt:**

```
/court-deadline "Complaint served May 12, 2026" "responsive pleading due 21 days after service, excluding weekends and federal holidays"
```

**Expected result:**
- [ ] Step-by-step reasoning shown: raw deadline = May 12 + 21 calendar days, then a weekend/holiday check on the resulting date.
- [ ] If the raw deadline lands on a weekend or a US federal holiday, the skill shows the adjustment to the next business day; if not, it says so explicitly rather than skipping the check.
- [ ] Assumptions section explicitly states it used the US federal holiday calendar (since none was specified) and flags that as an assumption to confirm.
- [ ] The malpractice-risk verification warning ("Confirm before docketing...") appears after the computed date.
- [ ] Proposed calendar event shown (event name, date, description, reminders) **before** anything is created.
- [ ] Skill asks "Shall I create this calendar event...?" and waits — confirm this explicitly by not responding yet, then respond "no, don't create it" and verify no event is created.
- [ ] Re-run and this time respond "yes, create it" — verify the skill only then uses the Calendar connector, and confirms completion afterward.

---

### Scenario 2 — Ambiguous rule ("days" vs. "business days")

**Prompt:**

```
/court-deadline "Notice mailed June 1, 2026" "response due within 30 days"
```

**Expected result:**
- [ ] Skill does not silently assume calendar days or business days — it surfaces the ambiguity ("Rule says 'days' — interpreted as calendar days, not business days. Confirm this is correct.") and/or asks the attorney to clarify before finalizing.
- [ ] If it proceeds with an assumed interpretation, that assumption is visibly flagged, not buried.
- [ ] No calendar event is proposed as final until the ambiguity is resolved or explicitly flagged for the attorney's confirmation.

---

### Scenario 3 — Missing rule or trigger date

**Prompt:**

```
/court-deadline "opposing counsel served us last week"
```
(no explicit rule given — just a vague trigger date reference)

**Expected result:**
- [ ] Skill does not guess a deadline from "last week" — it asks for the exact trigger date and the specific rule before computing anything.
- [ ] No computation or calendar event is shown until both required inputs are provided.

---

### Scenario 4 — Multi-step / compound rule

**Prompt:**

```
/court-deadline "Injury occurred March 3, 2024" "state personal injury statute of limitations is 2 years from date of injury, but if the 2-year date falls on a weekend or holiday, the deadline moves to the next business day"
```

**Expected result:**
- [ ] Reasoning shows each step separately: base date + 2 years, then the weekend/holiday check, in that order.
- [ ] Since this is a statute-of-limitations computation (the highest-stakes deadline type), the malpractice-risk warning in Step 3 is present and unambiguous.
- [ ] Skill does not state or imply that this computed date is authoritative — language should defer to attorney/docketing-software verification.

---

### Compliance checklist (every scenario)

- [ ] `⚠️ AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED` header and footer present, including the "not a substitute for your own verification" language specific to this skill.
- [ ] No calendar event created without an explicit "yes" from the attorney in that conversation.
- [ ] No jurisdiction-specific rule is asserted by the skill itself — every rule applied in the computation traces back to what the attorney typed in the prompt.
