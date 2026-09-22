---
name: resume-built
description: Umbrella/router skill for the two-stage resume pipeline — decide which sub-skill applies, then load it. Use whenever a user wants to make, revise, tailor, re-layout, or export a resume (简历/resume/CV) end to end, or mentions resume content writing, JD matching, STAR, the HTML resume template, in-browser editing, or one-page PDF export — then dispatch to resume-context or build-resume per the index below.
---

# resume-built — Resume pipeline router

Two-stage pipeline: **write the content first, then render and export**. This skill only routes; the actual instructions live in the two sub-skills.

## Sub-skill index

| # | Skill | Path | Use it for |
|---|-------|------|------------|
| 1 | `resume-context` | [`./resume-context/SKILL.md`](./resume-context/SKILL.md) | Write content: section structure, JD extraction, STAR experience bullets, qualities/skills |
| 2 | `build-resume` | [`./resume-html-pdf/SKILL.md`](./resume-html-pdf/SKILL.md) | Render & deliver: fill HTML template, fit to one page, in-browser editing, PDF export |

## Dispatch rules

- Writing/rewriting resume **text**, JD tailoring, STAR structuring, 个人素养/技能 wording → **resume-context**.
- Filling the HTML template, layout/font/one-page fitting, PDF export, browser editing → **build-resume**.
- Full request ("make me a resume for X role") → run in order: **resume-context** (content) → **build-resume** (render + one-page PDF), then deliver the html + pdf paths together.
