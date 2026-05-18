#!/usr/bin/env node
// Validate that a directory conforms to the Claude Cowork plugin structure.
// Mirrors the manual checks described in the create-cowork-plugin skill:
//   - .claude-plugin/plugin.json exists and is valid JSON
//   - manifest.name is present and kebab-case
//   - Each present component directory (skills/, agents/, commands/, hooks/)
//     contains files in the expected format
//   - Each skills/* subdirectory contains a SKILL.md
//
// Usage: node scripts/validate-plugin.mjs [plugin-dir]

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const pluginDir = process.argv[2] || "plugin";
const passes = [];
const errors = [];

const pass = (msg) => passes.push(msg);
const fail = (msg) => errors.push(msg);

// 1. Manifest
const manifestPath = join(pluginDir, ".claude-plugin", "plugin.json");
let manifest = null;
if (!existsSync(manifestPath)) {
  fail(`Missing manifest: ${manifestPath}`);
} else {
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    pass(`Manifest is valid JSON: ${manifestPath}`);
  } catch (e) {
    fail(`Manifest is not valid JSON: ${e.message}`);
  }
}

if (manifest) {
  if (!manifest.name) {
    fail("Manifest is missing the required `name` field");
  } else if (!/^[a-z0-9-]+$/.test(manifest.name)) {
    fail(`Manifest \`name\` must be kebab-case (lowercase, digits, hyphens). Got: "${manifest.name}"`);
  } else {
    pass(`Manifest name is kebab-case: "${manifest.name}"`);
  }
  if (manifest.version && !/^\d+\.\d+\.\d+(?:[-+].+)?$/.test(manifest.version)) {
    fail(`Manifest \`version\` is not valid semver: "${manifest.version}"`);
  }
}

// 2. Component directories
const components = {
  skills:   { mode: "subdir-file", file: "SKILL.md" },
  agents:   { mode: "files-ext",   ext: ".md" },
  commands: { mode: "files-ext",   ext: ".md" },
  hooks:    { mode: "files-ext",   ext: ".json" },
};

for (const [name, spec] of Object.entries(components)) {
  const dir = join(pluginDir, name);
  if (!existsSync(dir)) continue;
  if (!statSync(dir).isDirectory()) {
    fail(`${name}/ exists but is not a directory`);
    continue;
  }
  const entries = readdirSync(dir);
  if (entries.length === 0) {
    fail(`${name}/ is empty`);
    continue;
  }

  if (spec.mode === "subdir-file") {
    let found = 0;
    for (const entry of entries) {
      const entryPath = join(dir, entry);
      if (!statSync(entryPath).isDirectory()) continue;
      const expected = join(entryPath, spec.file);
      if (!existsSync(expected)) {
        fail(`${name}/${entry}/ is missing ${spec.file}`);
      } else {
        pass(`${name}/${entry}/${spec.file} exists`);
        found++;
      }
    }
    if (found === 0) {
      fail(`${name}/ contains no subdirectories with ${spec.file}`);
    }
  } else if (spec.mode === "files-ext") {
    const matches = entries.filter((e) => e.endsWith(spec.ext));
    if (matches.length === 0) {
      fail(`${name}/ has no ${spec.ext} files`);
    } else {
      pass(`${name}/ contains ${matches.length} ${spec.ext} file(s)`);
    }
  }
}

// Report
for (const p of passes) console.log(`PASS  ${p}`);
for (const e of errors) console.error(`FAIL  ${e}`);

console.log(`\n${passes.length} passed, ${errors.length} failed`);
process.exit(errors.length > 0 ? 1 : 0);
