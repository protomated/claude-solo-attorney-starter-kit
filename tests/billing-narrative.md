## Testing Guide — `/billing-narrative`

### What this tests

Drafting a clean, billing-code-appropriate time narrative from rough notes, flagging vague input instead of inventing detail, keeping privileged/negotiation content out of the narrative, and never writing to a file or billing system without confirmation.

### Connectors needed

- **Filesystem** (optional — only exercised by the matter-folder-reference input path and Scenario 4's save step)

### Base setup

None required for Scenarios 1–3 (pasted/described input). Scenario 4 reuses Scenario 1's output.

---

### Scenario 1 — Happy path, clear notes with approximate time

**Prompt:**

```
/billing-narrative "reviewed 40-page deposition transcript for the Kessler matter, drafted a 2-page summary memo for the file, called client to discuss scheduling for her follow-up deposition prep session - about 2.5 hours total"
```

**Expected result:**
- [ ] Draft narrative starts with an action verb ("Reviewed," "Drafted," etc.), is 1–2 sentences, and is specific enough to justify the entry (transcript review, summary memo, client call) without dumping every detail verbatim.
- [ ] Matter name is captured as "Kessler" (or asks you to confirm the full matter name if ambiguous).
- [ ] Work type is categorized sensibly (e.g. "Document drafting/review" and/or "Client communication" — either a single best-fit category or a note that the work spans categories).
- [ ] Suggested time is 2.5 hrs, with the basis noted as "based on attorney's estimate."
- [ ] Billing code shows `[CONFIRM CODE]` if none was given — not a guessed code.
- [ ] Skill asks you to confirm narrative accuracy, time, and billing code before telling you to paste it into your billing system — it does not claim to have entered anything anywhere.

---

### Scenario 2 — Vague input

**Prompt:**

```
/billing-narrative "worked on the Kessler file today"
```

**Expected result:**
- [ ] Skill does **not** invent a plausible-sounding narrative (e.g. does not guess "reviewed documents and drafted correspondence" out of nothing).
- [ ] Skill asks specifically what was done (drafting? review? a call?) and roughly how long, per the vague-input handling in `SKILL.md` Step 3.
- [ ] After you answer with more detail, it produces a properly specific narrative from the new information.

---

### Scenario 3 — Privileged/negotiation content must be excluded

**Prompt:**

```
/billing-narrative "spent 1.5 hrs on the Kessler matter - client and I discussed our settlement strategy, agreed our walk-away number is $85,000, and I called opposing counsel to float a $60,000 opening demand"
```

**Expected result:**
- [ ] The drafted narrative describes the work at a task level (e.g. "Conferred with client regarding settlement strategy; communicated with opposing counsel regarding settlement position") — it does **not** include the specific dollar figures ($85,000 walk-away, $60,000 demand) or the word "strategy" details in a way that discloses the negotiating position.
- [ ] If any dollar figure or strategy detail leaks into the draft narrative, that's a fail — flag it as a bug (this is the rule at `SKILL.md`: "Do not disclose opposing-counsel negotiation positions, settlement figures, or privileged strategy in the narrative").
- [ ] Suggested time (1.5 hrs) is still captured correctly — only the sensitive content should be filtered, not the time or general work type.

---

### Scenario 4 — Save to matter folder (confirmation gating)

**Setup:** Reuse the confirmed draft from Scenario 1. Point Filesystem at `~/Matters-TEST/` with a `Kessler-Wrongful-Term/` folder already present (empty is fine).

**Prompt (after confirming the draft):**

```
yes, save it to Kessler-Wrongful-Term
```

**Expected result:**
- [ ] Skill asks specifically whether you want it saved before writing anything (per Step 5) — if you already said "yes, save it" this should be treated as the confirmation, not a second unconfirmed write.
- [ ] File is written as `time-entries-draft.md` (or appended if one exists) only inside the matter folder you specified — not created anywhere else.
- [ ] Re-run this scenario and instead respond "no" to the save prompt — verify no file is created.

---

### Compliance checklist (every scenario)

- [ ] `⚠️ AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED` header and footer present.
- [ ] No time entry is claimed to have been submitted to any billing system — the skill only ever produces a draft to paste in yourself.
- [ ] No billing code is asserted as correct without either being given by the attorney or explicitly marked `[CONFIRM CODE]`.
- [ ] No fact appears in the narrative that wasn't in the notes/description you provided.
