# Contributing

Thanks for helping make agents better for everyone.

## Add or improve a skill
1. One skill per folder: `skills/<name>/SKILL.md`. The folder name equals `name:`.
2. `name`: lowercase letters, numbers and single hyphens, up to 64 characters, starting with `utak-` in this family.
3. `description` (up to 1,024 characters): what it does **and when to use it**, ending with `Triggers:` and the words people actually type.
4. Keep `SKILL.md` under 500 lines. Put long references in `references/` and link them.
5. Write rules an agent can follow: short, specific, with an example. No marketing.
6. In the pull request, show one real prompt **before and after** the skill.

## Rules
- No private data, secrets, customer information or copied paragraphs from other projects. Link sources instead.
- Claims about savings or accuracy need a reproducible measurement.
- Be kind in issues and reviews.

## Check locally
```bash
pip install skills-ref
python -c "import skills_ref,glob,pathlib; [print(d, skills_ref.validate(pathlib.Path(d))) for d in glob.glob('skills/*')]"
```
