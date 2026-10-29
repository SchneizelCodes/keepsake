---
name: utak-small-notes
description: "Use when writing, splitting, merging or improving notes in a Markdown/Obsidian vault for AI agents. Enforces one concept per note, a short answer first, search-friendly titles and aliases, evidence with dates, and links in both directions. Triggers: save this to my notes, write a note, add to vault, atomic notes, zettelkasten, this note is too long, where should this note go."
license: MIT
metadata:
  author: "SchneizelCodes (Joshua Manuel Camacho)"
  family: "utak"
  repo: "keepsake"
  version: "0.1.0"
---
# Small linked notes

Agents retrieve notes, not books. A note should answer one question well enough to be used alone, and point to its neighbours.

## Before writing
- Search for the concept (`utak search`). If a note owns it, edit that note. A correction always goes into the note that owns the fact.
- Pick the folder: shared knowledge (`engineering/`, `design/`, `patterns/`), one project only (`projects/<name>/`), taste (`lessons/`), unverified (`_inbox/`).

## Shape of a note
```markdown
---
updated: YYYY-MM-DD
status: draft | verified | stable
sources:
---
# Title in the words people search for

Also asked as: other phrasings, slang, the user's language (e.g. Taglish)

## The short answer
Two to four sentences someone can act on.

## Details            (one to three sections, ## headings)

## Evidence
- Checked against: src/x.ts:42, test name, command output, or official link (date)

## Related
- [[At least two notes]]
```

## Rules
- **One concept per note.** If a note needs a fourth section, split it.
- **File name = title.** Titles are questions or plain nouns, not "Notes 3".
- **Numbers live in one note.** Others link to it instead of repeating it.
- **Link both ways.** Add the new note to the Related list of each note it links to.
- **Evidence beats confidence.** Each claim that can change gets a source and a date.
- **Label status honestly**: draft (unverified), verified (checked today), stable (rarely changes).
- **Never store** secrets, personal data, private messages or raw transcripts.

## Splitting a long note
1. List the concepts it covers.
2. Keep the main one; move each other concept into its own note with its own short answer.
3. Replace the moved text with a one-line summary and a link.
4. Run `utak check` for broken links.
