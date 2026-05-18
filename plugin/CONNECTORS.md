# Connectors

This plugin uses two connectors that ship with Claude Desktop. Both are managed by Anthropic — you do not need to set up OAuth credentials or install anything beyond Claude Desktop.

## Connectors for this plugin

| Connector | What it does | Setup |
|---|---|---|
| **Gmail** | Reads and drafts client emails; searches your inbox for matter context | Connect once via Claude Desktop → Connectors → Gmail → "Connect" |
| **Filesystem** | Reads your local matters folder; saves drafts when you confirm | Connect once via Claude Desktop → Connectors → Filesystem → "Connect" then select your matters folder |

## How to connect

1. Open Claude Desktop.
2. Go to **Settings → Connectors**.
3. Find **Gmail** — click **Connect**. You'll be prompted to sign in with Google and grant access. Anthropic handles the OAuth; your credentials are stored by Claude Desktop, not by this plugin.
4. Find **Filesystem** — click **Connect**. You'll be prompted to choose the folder where your matter files live (e.g., `~/Matters` or `~/Documents/Cases`). Only files in this folder are accessible.
5. Restart Claude Desktop if prompted.

## What these connectors can access

| Connector | Can access | Cannot access |
|---|---|---|
| Gmail | Emails in your connected Google account (read + draft/send, with your confirmation) | Other Google Workspace services, Drive, Calendar |
| Filesystem | Files in the folder you selected during setup | Any folder outside your configured allow-list |

## Privacy note

All data read from Gmail or your filesystem is processed within your Claude Desktop session, under your Claude plan's data handling terms. Nothing is transmitted to Protomated or any other third party. See [README.md](README.md) for the full compliance notice.

## Troubleshooting

**Gmail shows "Not connected":**
Go to Settings → Connectors and click Connect on Gmail again. If you have multiple Google accounts, make sure you're signing in with the account that holds your client emails.

**Filesystem shows "Permission denied" or can't find a file:**
The file is likely outside your allowed folder. Go to Settings → Connectors → Filesystem and verify the path you selected. Add the correct folder if needed.

**Skills aren't seeing my matter files:**
Make sure your matter folders follow a consistent structure (e.g., one folder per client/matter) and that the parent folder is the one you connected to Filesystem. Each skill looks for an `intake-summary.md` at the top of a matter folder — run `/intake-summary` first to create one if it doesn't exist.
