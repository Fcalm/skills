---
name: build-resume
description: Turn resume material (markdown/txt drafts, experience dictated in chat, reference layout screenshots) into a single-page HTML resume that supports in-browser editing and one-click PDF export. Use whenever the user mentions 简历/resume/CV/job-application documents, asks to convert or format a resume as HTML/PDF, sends a resume draft for polishing or layout, or wants to export one to PDF — even if they never say "HTML" or "one page".
---

# HTML Resume Template + Online Editing + PDF Export

The resume uses a **two-file architecture** that separates template from content:

- `assets/resume-template.html` — layout, print styles, and edit controls only. **Never store content here and never change its CSS or `<script>`** — only adjust the `@media print` font sizes (step 3 below).
- `assets/resume-data.js` — the single content store: `window.RESUME_DATA = { version, content }`, where `content` is the HTML string rendered inside `.page`. **All content edits — by you (the AI) or by the user — end up in this file.**

Data flow: AI edits `简历数据.js` directly on disk (bump `version` each time); the user's browser edits are written back to the same file through the File System Access API (Edge/Chrome), so file and browser never diverge.

## Workflow

1. **Collect material**: extract all experience from the user's markdown/txt draft or their message. If material is incomplete, generate anyway and mark gaps with a red `<span class="placeholder">TODO</span>`, then mention the gaps when delivering.
2. **Generate the pair**: copy BOTH files to the output location (e.g. next to the user's draft): template → `简历.html`, data → `简历数据.js` (the template loads exactly `<script src="简历数据.js">`, so keep this filename). Then put the resume content into the data file's `content` field. Structure mapping for the content HTML:
   - Two centered header lines: `.header .contact` (**bold name** first, then phone, email, GitHub link) and `.header .edu` (school | major | 2023~present (class of 20XX))
   - `.section-title`: section headings (blue + underline), e.g. "Experience", "Projects", "Core Skills"
   - `.entry-title`: experience entry title (gray bar), format "Project/Company ｜ Role"; dates go in `<span class="date">`
   - `.link-row`: GitHub or other link row, directly below the entry title
   - List hierarchy: `ul.l1` (• module level, e.g. "Overview:" "Key work:", lead words in `<span class="lead">`) → `ul.l2` (◦ work items, each starting with a **bold mechanism name** + colon) → `ul.l3` (▪ sub-items / version comparisons)
   - Emphasis: `<b>` for mechanisms/conclusions; `<span class="hl">` (blue bold) for quantified metrics and goals; `<code>` for commands and file names
   - Fix typos and stray punctuation in the source material along the way; normalize casing of tech terms (python → Python)
   - The `content` string is a JS template literal: escape backticks, `\` and `${` if the material contains them
3. **Fit one page**: default print styles (12.5px/1.48) fit roughly two dense projects + a skills section. Two ways to tune: (a) the template's toolbar has **字号 / 行距 dropdowns** that override the print styles at runtime and persist per browser in localStorage — tell users to use these and preview before exporting; (b) for a generated default, edit `@media print` in the template (`font-size` floor 11px, `line-height` floor 1.35; sparse content can go up to 13.5px/1.55). Re-export and verify the page count after every adjustment. Backgrounds (gray entry-title bars, code backgrounds) are force-printed via `print-color-adjust: exact`, so they survive the browser's default "no background graphics" mode — do not remove that rule.
4. **Export PDF**: run `scripts/export-pdf.sh <html path> [pdf output path]`. The script exports via headless Edge/Chrome (the template renders the data file synchronously, so headless export includes the content) and reports the page count. The PDF defaults to the same directory and basename as the HTML.
5. **Verify**: confirm the page count is 1. If content is dense or font sizes were just compressed, render the PDF to PNG and check nothing is clipped at the bottom (pymupdf works). Deliver both the html and pdf paths, and remind the user the two files must stay together.

## When to edit which file

- **AI changes content** (user asks to rewrite a bullet, add a project, fix wording): edit `简历数据.js` directly, bump `version`. If the user has the page open, tell them to click "↺ 恢复原文" (reloads from disk) or refresh.
- **User edits in browser**: click "✏️ 编辑简历", type; changes auto-save. First time, they must click "🔗 连接数据文件" and pick `简历数据.js` once (grant read-write permission); after that every edit is written straight to the file (a per-browser-session re-grant may be asked). Without a connection, edits fall back to localStorage (restored on next load) and the PDF button still works.
- **Adding / reordering / removing blocks without touching HTML**: in edit mode a second toolbar row appears with `＋ 板块 / ＋ 项目条 / ＋ 一级要点 / ＋ 二级要点 / ＋ 三级要点` and `⬆ 上移 / ⬇ 下移 / 🗑 删除`. New blocks are inserted after the block the caret is in, come pre-styled with placeholder text selected (typing replaces it), and nested levels fall back to the last matching parent item when the caret is not inside one. `🗑 删除` confirms with a text preview before removing. Point the user at these buttons instead of editing HTML by hand; the underlying markup they generate is exactly the structure described in step 2.
- "↺ 恢复原文" discards in-browser edits and reloads from the data file — the way to pick up AI edits made while the page was open.
- "📄 导出 PDF" prints the current DOM, so it always includes the latest edits whether they came from disk or the browser.

## Layout spec (from the reference template — keep consistent when editing content)

- Section titles: large bold blue text with a blue bottom border; entry titles: gray bar (#f0f0f0), bold black text, full row width
- Three bullet levels: • → ◦ → ▪, hanging indents, bold lead words
- Black bold for mechanisms/conclusions, blue bold (.hl) for quantified metrics, gray-background monospace (code) for commands and file names
- Serif font stack (Times New Roman/SimSun), 13.5px body, 1.5 line-height on screen; A4 white card, `@page` margins 8mm/11mm
