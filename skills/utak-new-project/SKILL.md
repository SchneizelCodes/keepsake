---
name: utak-new-project
description: "Use when starting or onboarding a new project, repo or app so every coding agent (Claude Code, Codex, Gemini CLI, Cursor, Copilot) shares the same vault memory and rules. Creates the project's start and handoff notes and the AGENTS.md / CLAUDE.md / GEMINI.md entry files. Triggers: new project, new repo, set up agents, onboard this codebase, AGENTS.md, make all my AI tools follow the same rules."
license: MIT
metadata:
  author: "SchneizelCodes (Joshua Manuel Camacho)"
  family: "utak"
  repo: "keepsake"
  version: "0.1.0"
---
# Give a new project a brain

## Steps
1. **Project folder in the vault**: `projects/<name>/` with two notes.
   - `<Name> start here.md`: what it is, who uses it, stack, repo path, how to run, where things live.
   - `<Name> handoff.md`: current state, newest first. Each entry: date, what changed, why, what's next, open risks.
2. **Entry files in the repo** (one set of rules for every tool):
   ```bash
   node utak.mjs activate --vault <vault> --project   # writes AGENTS.md, CLAUDE.md (@AGENTS.md), GEMINI.md
   ```
   Then add project specifics to `AGENTS.md`: run/test commands, folders not to touch, conventions.
3. **Global profiles once per machine** so even projects without these files use the vault:
   ```bash
   node utak.mjs activate --vault <vault> --global     # ~/.claude/CLAUDE.md, ~/.codex/AGENTS.md, ~/.gemini/GEMINI.md
   ```
4. **Reuse before you build.** Search the shared folders for patterns this project needs (`utak search "sign in"`, `"payments webhook"`) and link them from the start-here note.

## Rules
- A project's private facts (prices, people, customer data) stay in its own folder. Shared folders hold only reusable, non-private knowledge.
- If a project belongs to someone else (a client or employer), use a separate vault and copy in only shared notes.
- Restart each agent after changing its instruction files.
