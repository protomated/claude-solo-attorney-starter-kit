# Solo Attorney Claude Starter Kit v3.4.1

Adds Legal Builder Hub freshness frontmatter to all six skills (`court-deadline` is `regulatory` with a 6-month window; the rest are `procedural` with a 12-month window). Also carries this cycle's Dele skills-qa fixes: corrected compliance guardrails, fixed a fabricated case citation, rewrote Meeting Prep and New-Matter Organizer per review findings, and added `title`/`description` metadata to the built-in connector declarations. No breaking changes.

## Skills included

| Skill | What it does |
|---|---|
| `/intake-summary` | Converts raw consultation notes into a structured case brief; saves as `intake-summary.md` |
| `/engagement-letter` | Drafts a retainer and engagement letter from intake data |
| `/court-deadline` | Computes a court or filing deadline; drafts a Google Calendar event for confirmation |
| `/meeting-prep` | Produces a one-page brief for client meetings, depositions, mediations, and court appearances |
| `/billing-narrative` | Drafts a billing-code-appropriate time narrative from your notes or email thread |
| `/new-matter-organizer` | Creates the standard folder tree and task checklist for a new matter |

## Setup

Install time: ~5 minutes. Connect Gmail, your matters folder, and Google Calendar once in Claude Desktop → Settings → Connectors. See `plugin/CONNECTORS.md` for step-by-step instructions.

## Compliance

Requires Claude for Work, Claude Team, or Claude Enterprise. Do not use a consumer Claude plan (Claude Pro) with client-privileged content. Every skill output carries an *AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED* header. The plugin never sends email, writes files, or creates calendar events without your explicit in-conversation confirmation.
