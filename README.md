# Solo Attorney Claude Starter Kit

A Claude Desktop plugin for solo attorneys. Seven skills that read your local matter files, Gmail, and Google Calendar to organize new matters, draft engagement letters and intake summaries, compute court deadlines, prepare meeting briefs, draft billing narratives, and model flat-fee repricing — in under five minutes of setup.

Distributed free by [Protomated](https://protomated.com) at [protomated.com/resources](https://protomated.com/resources).

---

## Installing the plugin

Download the latest `.zip` from [Releases](https://github.com/protomated/claude-solo-attorney-starter-kit/releases) and drag it into Claude Desktop's Extensions panel. See [`plugin/README.md`](plugin/README.md) for full installation and compliance guidance.

---

## Repo layout

```
plugin/           Installable plugin (packaged into .zip)
  .claude-plugin/plugin.json   Identity manifest
  .mcp.json                    Declares Gmail + Filesystem connector requirements
  manifest.json                Display metadata and server entry declaration
  prompts/system-prompt.md     Master system prompt — ethical guardrails live here
  skills/*/SKILL.md            One directory per skill

site/             Next.js landing page (Cloudflare Pages)
  app/api/subscribe/route.ts   Edge route: email capture → Kit API

scripts/
  validate-plugin.mjs          Validates plugin/ structure before packing

docs/
  App - Solo Attorney Claude Plugin - Technical.md   Technical specification

.github/workflows/
  validate.yml     Runs on every push/PR — validates plugin structure
  release.yml      Runs on vX.Y.Z tags — builds, checksums, and publishes a GitHub Release
```

---

## Skills

| Skill | What it does |
|---|---|
| `/intake-summary` | Converts raw consultation notes into a structured case brief; creates `intake-summary.md` — run first on any new matter |
| `/engagement-letter` | Drafts a retainer and engagement letter from intake data |
| `/court-deadline` | Computes a court or filing deadline from a trigger date and rule you provide; drafts a Google Calendar event for confirmation |
| `/meeting-prep` | Produces a one-page brief for client meetings, depositions, mediations, and court appearances |
| `/billing-narrative` | Drafts a billing-code-appropriate time narrative from your notes or an email thread |
| `/new-matter-organizer` | Creates the standard folder tree and task checklist for a new matter; sorts existing documents by type |
| `/flat-fee-calculator` | Builds a revenue-impact model comparing hourly billing to flat-fee pricing for AI-accelerated tasks; outputs a CSV |

---

## Development

```bash
# Validate plugin structure (manifest, skill dirs, SKILL.md presence)
npm run validate

# Full build: validate → pack → SHA-256 → copy to site/public/downloads/
npm run build

# Pack only (skips validate)
npm run pack

# Remove build artifacts
npm run clean

# List plugin files
npm run tree

# Landing page
npm run site:install
npm run site:dev
npm run site:build
```

### Environment variables (site only)

| Variable | Purpose |
|---|---|
| `KIT_API_KEY` | Kit (ConvertKit) API key — email capture |
| `KIT_FORM_ID` | Kit form ID |
| `PUBLIC_DOWNLOAD_URL` | URL returned after email capture; defaults to `/downloads/solo-attorney-starter-kit.zip` |

Copy `site/.env.example` to `site/.env.local` for local development. The plugin itself has no environment variables.

---

## Cutting a release

Push a semver tag — CI does the rest:

```bash
git tag v1.1.0
git push origin v1.1.0
```

The release workflow validates, builds, checksums, and publishes a GitHub Release with the `.zip` and `.sha256` attached. Release notes are generated automatically from commits since the previous tag.

---

## Compliance

The plugin enforces three non-negotiable rules, defined in `plugin/prompts/system-prompt.md` and repeated in every `SKILL.md`:

1. **Plan-tier warning** — warns attorneys that consumer Claude (Personal/Pro) must not be used with client-privileged content.
2. **Confirmation gating** — Claude must show the attorney exactly what it will do and get explicit in-conversation confirmation before sending email or writing any file.
3. **Review wrapper** — every skill output begins and ends with an attorney-review header/footer.

Do not weaken these constraints.

---

## Contributing

Open an issue or pull request. All changes to `plugin/prompts/system-prompt.md` and `SKILL.md` files require a brief explanation of why the change does not weaken the compliance constraints above.

---

## License

Apache 2.0. See [LICENSE](plugin/LICENSE).
