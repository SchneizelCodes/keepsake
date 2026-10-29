# Why the vault-first loop helps

| What happens | Without a vault | With vault first |
|---|---|---|
| Starting a task | The agent re-learns the project from scratch, or you paste context again | It retrieves relevant notes before starting the task |
| Repeated mistakes | The same bug or wrong assumption comes back next week | The fix is a note; the next agent reads it first |
| Your taste | You repeatedly explain the same writing or design preferences | `lessons/` carries it to every agent |
| Switching tools | Claude, Codex and Gemini each know different things | One vault, one loop, the same memory for all |
| Stale facts | Old notes quietly mislead | Verify step: notes are checked against code and current sources |
| Token cost | Long prompts, whole files pasted | Small notes, only the matching ones |

Sources:
- Anthropic, *Effective context engineering for AI agents*: smallest high-signal context; just-in-time retrieval; structured note-taking outside the window.
- Liu et al., *Lost in the Middle: How Language Models Use Long Contexts* (2023): models use information at the start and end of long contexts better than in the middle.
- Agent Skills specification (agentskills.io): progressive disclosure, so discovery metadata is visible before full instructions are needed.

Measure it yourself: run the same 5 real tasks with and without the vault and count (a) times you had to repeat context, (b) mistakes that a note already covered, (c) total tokens.
