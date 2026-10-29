---
name: utak-vault-health
description: "Use when asked to clean, audit, repair or tidy a Markdown/Obsidian knowledge vault: broken links, orphan notes, duplicates, oversized notes, stale facts, missing aliases, or leaked secrets. Runs the utak checker and fixes problems safely. Triggers: check my vault, vault health, broken links, orphans, clean up notes, rebuild the graph."
license: MIT
metadata:
  author: "SchneizelCodes (Joshua Manuel Camacho)"
  family: "utak"
  repo: "keepsake"
  version: "0.1.0"
---
# Vault health check

## Run
```bash
node utak.mjs check --vault <vault>      # errors: secrets, broken links. warnings: everything else
node utak.mjs stats --vault <vault>      # counts, orphans, most-linked hubs
node utak.mjs graph --vault <vault>      # graph-out/graph.html to see clusters and islands
```

## Fix in this order
1. **Secrets** (errors). Remove the value from the note immediately and tell the user to rotate it: it is already in git history if the vault is a repo.
2. **Broken links.** Point them at the right note, or create the missing note only if the concept is real.
3. **Duplicates.** Merge into the better note, keep both titles as aliases, leave the other file as a one-line redirect or delete it with the user's permission.
4. **Oversized notes** (over ~9,000 characters). Split by concept (see `utak-small-notes`).
5. **Orphans and notes with fewer than 2 links.** Run `utak links "<Title>"` and link both ways.
6. **Stale notes** (updated more than 180 days ago, not `stable`). Re-verify the changeable facts; update the date only after checking.
7. **Missing `Also asked as:`.** Add the phrasings users actually type.

## Don't
- Don't mass-rewrite notes the user wrote by hand. Show a list and fix in batches they approve.
- Don't delete anything without asking. Moving to `_inbox/_to-review/` is the safe default.
- Don't edit generated folders (graph output, mirrors).

Report: what was fixed, what needs the user's decision, and the before/after counts from `utak check`.
