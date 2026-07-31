# Testing Guides

This plugin has no runtime to unit-test — each `SKILL.md` is a set of instructions Claude follows inside a live Claude Desktop / Cowork session. "Testing" a skill means running it end to end in a real session against a synthetic matter folder and checking the output against a checklist. These guides are the test scripts for that process (see `docs/PAC-A-3.md`: "Test inside Cowork, not just in isolation").

One guide per skill, fully self-contained — each file includes the synthetic test data it needs (fake client names, fake matters, fake dates). **Never use real client data to test these skills, even informally.**

## Guides

- [`engagement-letter.md`](engagement-letter.md)
- [`intake-summary.md`](intake-summary.md)
- [`court-deadline.md`](court-deadline.md)
- [`meeting-prep.md`](meeting-prep.md)
- [`billing-narrative.md`](billing-narrative.md)
- [`new-matter-organizer.md`](new-matter-organizer.md)
- [`flat-fee-calculator.md`](flat-fee-calculator.md)

## Before you start

1. Install the plugin bundle in Claude Desktop (see `plugin/README.md`).
2. Connect the connectors the skill under test needs — each guide lists them. Point the Filesystem connector at a **scratch folder**, not your real `~/Matters` folder (e.g. `~/Matters-TEST/`), so synthetic data never mixes with real client files.
3. Create any files a scenario calls for in that scratch folder before sending the prompt — each scenario spells out the exact file path and contents to create.
4. Open a new Claude Desktop chat per scenario (or per skill) so prior conversation context doesn't leak into the test.

## How to read a scenario

Each scenario gives:
- **Setup** — files to create (if any beyond the guide's base setup) before invoking the skill.
- **Prompt** — the exact text to send.
- **Expected result** — a checklist of what the output must and must not contain. Check every box; if any box fails, that's a bug to fix before the skill ships.

## Checklist that applies to every skill, every scenario

- [ ] Output opens with the `⚠️ AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED` header and closes with the `Prepared with Protomated Solo Attorney Claude Starter Kit` footer.
- [ ] No file is written, no email is sent, and no calendar event is created without the skill first showing exactly what it intends to do and asking for explicit confirmation — and it stops if you don't give it.
- [ ] Nothing is invented. Any fact the skill couldn't find in the provided data is flagged (e.g. `[Not provided]`, `[CONFIRM WITH ATTORNEY]`) — not guessed or filled in with a plausible-sounding placeholder presented as fact.
- [ ] The skill only acts on data you gave it in that session (pasted text, the scratch matter folder, or — where the skill uses it — Gmail/Calendar) — it doesn't reference anything outside that.

Record results (pass/fail per scenario, screenshots or transcript excerpts for failures) alongside the issue's Loom walkthrough per the PAC-A-3 definition of done.
