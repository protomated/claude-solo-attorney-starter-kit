# Solo Attorney Assistant — Claude Desktop Plugin

A Claude Desktop plugin that turns your local matter files and Gmail into a solo attorney operations assistant. Drafts client status updates, demand letters, engagement letters, intake summaries, and pre-meeting briefs — in your voice, from your files, in under five minutes of setup.

**Distributed by [Protomated](https://protomated.com) as a free download.**

---

## ⚠️ Required: Read This Before You Install

**This section is not boilerplate. Read it before connecting client data.**

### 1. You must be on a qualifying Claude plan

Do NOT use this plugin for client work on a consumer Claude plan (claude.ai Personal or Claude Pro). Consumer plans do not provide a Data Processing Agreement (DPA) covering client-privileged content.

You must be on one of the following before using this plugin with real client materials:

- **Claude for Work** (formerly Claude.ai Teams)
- **Claude Team or Enterprise**
- **Claude API** (with a signed DPA from Anthropic)

Using a consumer plan with client-privileged content risks waiving attorney-client privilege and may violate your ethical obligations to your clients. See *Heppner v. Doe* (S.D.N.Y. Feb. 2026) and your state bar's AI ethics guidance before proceeding.

> **If you're not sure which plan you're on:** Open Claude Desktop → Help → About. If it says "Claude Pro," you are on a consumer plan. Upgrade to Claude for Work or obtain API access before connecting client email or matter files.

### 2. Informed consent — update your engagement letter

**ABA Formal Op. 512 (July 2024)** requires attorneys using AI tools in client work to obtain client informed consent where the AI tool may access confidential information.

Before using this plugin on any active matter, add AI-tool disclosure language to your engagement letters. Suggested language for new clients:

> "Our firm uses AI-assisted drafting and research tools, including Claude Desktop, to improve the efficiency of certain practice tasks. These tools process information under agreements that protect confidentiality consistent with our professional obligations. We will not use AI tools in your matter in any way that compromises the attorney-client privilege or your confidential information."

Consult your state bar's guidance on AI disclosure obligations — requirements vary by jurisdiction.

### 3. Every AI output requires your review

This plugin is a drafting tool. It does not provide legal advice. Every document it generates — status updates, demand letters, engagement letters, intake summaries, and meeting briefs — must be reviewed and approved by you, a licensed attorney, before use.

The plugin enforces this with a required header and footer on every output:

> ⚠️ AI-ASSISTED DRAFT — ATTORNEY REVIEW REQUIRED

Do not remove or bypass these markers.

### 4. No action without your confirmation

The plugin is instructed to request your explicit in-conversation confirmation before sending any email or writing any file. If you are ever prompted by the assistant to confirm a send or write action, read the confirmation carefully before responding.

---

## Installation (5 minutes)

### Step 1 — Download and install

1. Download `solo-attorney-assistant.zip` from the [Releases page](https://github.com/protomated/solo-attorney-assistant/releases).
2. Double-click the `.zip` file, or drag it into Claude Desktop's **Extensions** panel.
3. Claude Desktop will install the plugin and prompt you to connect the required services.

### Step 2 — Connect Gmail

1. Go to **Claude Desktop → Settings → Connectors**.
2. Find **Gmail** and click **Connect**.
3. Sign in with the Google account that holds your client correspondence.
4. Grant the requested permissions. Anthropic manages the OAuth credentials — your Google password is never shared with Protomated.

### Step 3 — Connect Filesystem (your matters folder)

1. In **Settings → Connectors**, find **Filesystem** and click **Connect**.
2. Select the folder on your computer where your matter files live. Example: `~/Matters` or `~/Documents/Cases`.
3. Only files inside this folder will be accessible to the plugin.

> **Recommended folder structure:**
> ```
> ~/Matters/
> ├── Smith-John-PI/
> │   ├── intake-summary.md
> │   ├── medical-records-summary.md
> │   └── notes/
> ├── Acme-Contract-Dispute/
> │   ├── intake-summary.md
> │   └── demand-letter-draft-2026-05-01.md
> └── ...
> ```
> Each matter gets its own folder. Run `/intake-summary` on a new matter to create the `intake-summary.md` anchor file that all other skills read from.

### Step 4 — Verify

Open a new Claude Desktop chat. Type `/skills`. You should see all five skills listed. Run `/intake-summary` on a test matter to verify Filesystem access is working.

See [CONNECTORS.md](CONNECTORS.md) for troubleshooting.

---

## Skills

### `/client-status-update` — Client Status Update Drafter

Reads your matter folder and recent Gmail, drafts a personalized client update email in your voice. Requires your confirmation before sending or saving to Gmail Drafts.

**Use when:** A hearing happened, a filing went out, a settlement offer came in, or a client is overdue for an update.

```
/client-status-update Smith-John-PI
/client-status-update ~/Matters/Smith-John-PI
```

---

### `/demand-letter` — Demand Letter Generator

Drafts a practice-area-specific demand letter from your matter folder. Supports personal injury, contract breach, employment claims, property damage, and collections. Reads your intake summary and damage documentation to populate the facts and figures.

**Use when:** It's time to put the other side on notice and set a deadline.

```
/demand-letter Smith-John-PI
/demand-letter ~/Matters/Acme-Contract-Dispute
```

---

### `/engagement-letter` — Engagement Letter Drafter

Drafts a retainer and engagement letter from intake data. Covers scope of representation, fee structure (hourly, flat fee, or contingency), client obligations, and required disclosures. Requires your confirmation before saving.

**Use when:** A new client is ready to retain you.

```
/engagement-letter New-Client-Johnson
/engagement-letter ~/Matters/Johnson-Family-Law
```

---

### `/intake-summary` — Intake Summary Processor

Converts raw intake notes or pasted consultation notes into a structured case brief: parties, facts, claims, deadlines, evidence checklist, and next steps. Flags statute-of-limitations issues and surfaces names for a conflicts check. The output becomes the `intake-summary.md` that all other skills read from.

**Use when:** You've just finished an initial consultation and need to open the file.

```
/intake-summary
[paste your raw notes]

/intake-summary ~/Matters/New-Client-Folder
```

---

### `/meeting-prep` — Meeting Prep Brief Generator

Pulls context from your matter folder and recent email to produce a one-page brief tailored to the meeting type: client check-in, deposition, mediation, settlement conference, or court appearance. Read-only — no files are written.

**Use when:** You have five minutes before a meeting and need to get up to speed fast.

```
/meeting-prep Smith-John-PI deposition
/meeting-prep ~/Matters/Acme-Contract-Dispute mediation
```

---

## How It Works

This plugin connects Claude Desktop to two things you already have: your local matter files and your Gmail. There is no cloud database, no subscription, and no Protomated server involved in processing your client data.

```
Your matter files (Filesystem) ──┐
                                  ├──▶ Claude Desktop ──▶ Your review ──▶ Action
Your Gmail (Gmail connector) ─────┘
```

All processing happens inside your Claude Desktop session. See §4 of [Connectors.md](CONNECTORS.md) for data handling details.

---

## Want a Custom Skill Library Built for Your Practice?

This kit covers five core workflows. The typical solo attorney practice has 15–20 more: jurisdiction-specific court filings, client intake questionnaires tuned to your practice areas, automated calendar syncing with case deadlines, Clio or Filevine integration, and more.

**Protomated builds custom Claude Desktop skill libraries for solo and small-firm attorneys: $3,000–$6,000 depending on scope.**

[Book a 30-minute call →](https://protomated.com/call)

---

## License

Apache 2.0. See [LICENSE](LICENSE).

## Feedback and Issues

[GitHub Issues](https://github.com/protomated/solo-attorney-assistant/issues) | [hello@protomated.com](mailto:hello@protomated.com)
