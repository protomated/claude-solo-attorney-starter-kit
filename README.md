# Solo Attorney Assistant

A Claude Desktop plugin for solo attorneys. Five skills that read your local matter files and Gmail to draft demand letters, client status updates, engagement letters, intake summaries, and pre-meeting briefs — in under five minutes of setup.

Distributed free by [Protomated](https://protomated.com) at [protomated.com/resources](https://protomated.com/resources).

---

## Installing the plugin

Download the latest `.zip` from [Releases](https://github.com/protomated/solo-attorney-assistant/releases) and drag it into Claude Desktop's Extensions panel. See [`plugin/README.md`](plugin/README.md) for full installation and compliance guidance.

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
| `/intake-summary` | Converts raw consultation notes into a structured case brief; creates the `intake-summary.md` all other skills read from |
| `/client-status-update` | Drafts a client update email from your matter folder and recent Gmail |
| `/demand-letter` | Drafts a practice-area-specific demand letter |
| `/engagement-letter` | Drafts a retainer and engagement letter from intake data |
| `/meeting-prep` | Produces a one-page brief for depositions, mediations, hearings, and client check-ins |

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
| `PUBLIC_DOWNLOAD_URL` | URL returned after email capture; defaults to `/downloads/solo-attorney-assistant.zip` |

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
