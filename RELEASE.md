# Solo Attorney Claude Starter Kit v2.0.0

**Breaking change:** two skills removed, three added, one new connector required.

## What's new

### Three new skills
- **`/court-deadline`** — computes a court or filing deadline from a trigger date and rule you provide. Shows step-by-step reasoning. Drafts a Google Calendar event — you confirm before it's created.
- **`/billing-narrative`** — drafts a billing-code-appropriate time narrative from your rough notes or an email thread. Suggests the time increment; you confirm accuracy before billing.
- **`/new-matter-organizer`** — creates the standard folder tree and task checklist for a new matter based on practice area (PI, Family Law, Criminal Defense, Estate/Probate, Immigration, Contract). Sorts existing documents into the correct sub-folders — all changes require your confirmation.

### New connector: Google Calendar
`/court-deadline` creates deadline events in your Google Calendar after explicit attorney confirmation. Connect once in Claude Desktop → Settings → Connectors → Google Calendar.

### Plugin renamed
Plugin ID is now `solo-attorney-starter-kit`.

## Removed

- `/client-status-update` — not part of this bundle
- `/demand-letter` — not part of this bundle

## Skills included (v2.0.0)

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
