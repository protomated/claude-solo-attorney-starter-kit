# Solo Attorney Claude Starter Kit

Fixed the ChatGPT Desktop upload failure: removed `plugin/.mcp.json` — ChatGPT's plugin importer rejects any zip containing one, blank connector URLs included. Gmail, Calendar, and Filesystem were already documented as fully optional; every skill already falls back cleanly to paste/attach without them, so removing the declaration costs no real functionality. Confirmed working in ChatGPT Desktop.

Removed the hardcoded "(Claude Desktop)" wording from all six skills' output footers, and documented ChatGPT Desktop installation and the paste/attach fallback in README.md and CONNECTORS.md.

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

Install time: ~5 minutes. Works with or without connectors — Gmail, your matters folder, and Google Calendar are all optional in Claude Desktop (Settings → Connectors). On ChatGPT Desktop, paste notes and attach files directly to the conversation instead. See `plugin/CONNECTORS.md` for step-by-step instructions on both platforms.

## Compliance

Requires Claude for Work, Claude Team, or Claude Enterprise. Do not use a consumer Claude plan (Claude Pro) with client-privileged content. Every skill output carries an *AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED* header. The plugin never sends email, writes files, or creates calendar events without your explicit in-conversation confirmation.
