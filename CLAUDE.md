# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **Claude Desktop plugin** for solo attorneys — five skills (slash commands) that read local matter files and Gmail to draft legal documents. There is no runtime code, no MCP server, and no backend. The product is entirely content: markdown skill files, JSON manifests, and a Next.js landing page.

## Repo layout

```
plugin/           The installable plugin (packaged into .zip bundle)
  .claude-plugin/plugin.json   Manifest validated by scripts/validate-plugin.mjs
  .mcp.json                    Declares gmail + filesystem connector requirements
  manifest.json                Plugin metadata (manifest_version, server entry)
  prompts/system-prompt.md     Master system prompt — ethical guardrails live here
  skills/*/SKILL.md            One directory per skill; YAML frontmatter + markdown body
site/             Next.js landing page (Cloudflare Pages)
  app/api/subscribe/route.ts   Edge route: email capture → Kit API
scripts/
  validate-plugin.mjs          Validates plugin/ structure before packing
docs/                          Technical spec (App - Solo Attorney Claude Plugin - Technical.md)
```

## Commands

All commands run from the repo root.

```bash
# Validate plugin structure (manifest, skill dirs, SKILL.md presence)
npm run validate

# Full build: validate → pack → SHA-256 → copy to site/public/downloads/
npm run build

# Pack only (skips validate)
npm run pack

# Cut a GitHub release (runs build first; requires RELEASE.md at repo root)
npm run release

# Remove build artifacts
npm run clean

# List plugin files (excludes node_modules)
npm run tree

# Landing page
npm run site:install   # npm install --prefix site
npm run site:dev       # next dev
npm run site:build     # next build
npm run site:preview   # next start (preview the production build locally)
```

## Plugin format

The bundle format is `.zip` (a ZIP renamed; previously `.mcpb`). It uses the **plugin variant** (not standalone) — no bundled MCP server.

Two manifests serve different purposes:
- `plugin/.claude-plugin/plugin.json` — the identity manifest the validator and Claude Desktop read (`name` must be kebab-case)
- `plugin/manifest.json` — display metadata and server entry point declaration

The validator (`scripts/validate-plugin.mjs`) checks:
- `.claude-plugin/plugin.json` is valid JSON with a kebab-case `name`
- Each `skills/*/` subdirectory contains a `SKILL.md`
- `agents/`, `commands/`, `hooks/` (if present) contain files with the expected extension

## Skill files

Each `SKILL.md` has YAML frontmatter:
```yaml
---
name: skill-name
description: shown to attorney in /skills list
argument-hint: "[hint shown in Claude Desktop]"
---
```

The body instructs Claude what tools to call (via the built-in Gmail and Filesystem connectors), what output format to produce, and what confirmation to request before any state-changing action.

**`/intake-summary` must run first on any new matter** — it creates `intake-summary.md`, the anchor file all other skills read.

## Compliance constraints — non-negotiable

These rules are enforced in `prompts/system-prompt.md` and repeated in every `SKILL.md`. Do not weaken them:

1. **Confirmation gating**: Claude must show the attorney exactly what it will do and get explicit in-conversation confirmation before sending email or writing any file.
2. **Required output wrapper**: Every skill output must begin and end with the prescribed attorney-review header/footer (see `prompts/system-prompt.md` for exact text).
3. **Plan-tier warning**: The system prompt must warn that consumer-tier Claude (claude.ai Personal / Pro) must not be used with client-privileged content.

## Site environment variables

Required for local site development and Cloudflare Pages deployment (see `site/.env.example`):

| Variable | Purpose |
|---|---|
| `KIT_API_KEY` | Kit (ConvertKit) API key — email capture |
| `KIT_FORM_ID` | Kit form ID |
| `PUBLIC_DOWNLOAD_URL` | URL returned to the user after email capture; defaults to `/downloads/solo-attorney-starter-kit.zip` |

The plugin itself has no environment variables.

The site deploys to Cloudflare Pages via `@cloudflare/next-on-pages`. The `/api/subscribe` route runs as a Cloudflare edge function.

## Notes

- `plugin/manifest.json` declares `server/entry_point: "server/index.js"` but `plugin/server/index.js` does not exist — the plugin variant does not require a bundled server, so this field is inert.
- `plugin/README.md` and `plugin/CONNECTORS.md` are end-user documentation included in the ZIP bundle; they are not internal developer docs.
- The root `.mcp.json` mirrors `plugin/.mcp.json`; both declare the gmail and filesystem connector requirements.
- `npm run release` passes `--notes-file RELEASE.md` to `gh release create` — create `RELEASE.md` at repo root before running it.
