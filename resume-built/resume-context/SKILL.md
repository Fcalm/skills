---
name: resume-context
description: JD-targeted resume CONTENT workflow — gather the user's profile, fetch and distill 8 job descriptions into capability requirements, then write experience sections with the STAR method (背景与目标 / 行动和结果) plus 个人素养 and 技能 sections. Use whenever the user wants to write or rewrite resume content, tailor a resume to a specific job/JD, analyze what a JD requires, or draft 项目经历/实习经历/个人素养/技能 — even if they never say "STAR" or "JD".
---

# Resume Content Workflow (JD-targeted, STAR-based)

This skill governs **what to write** in the resume. For rendering/exporting the HTML + PDF, combine it with the `build-resume` skill (template + data file + one-page PDF).

## 1. Resume structure

Build the resume in this order:

1. **Personal info**: name, phone, email, GitHub homepage. Political status only if the user is a CPC member — otherwise omit.
2. **Education**: school (omit the school line if it is not a 985/211), major, relevant coursework (3–5 job-related courses; omit this item if none), GPA (omit unless top 20% of the class).
3. **Internship experience**
4. **Project experience**
5. **Personal qualities** (个人素养 — soft skills)
6. **Skills** (技能 — hard skills)

## 2. Workflow

### Step 1 — Information gathering

Use tools to collect resume material: fetch the user's profile/archive, ask the user directly for what is missing, and **read their project READMEs and related docs** (code repos, design files, past write-ups). Never invent experience that the material does not support; if a metric is unknown, ask the user or leave a `TODO` placeholder.

### Step 2 — JD analysis

1. Use tools to fetch **8 job descriptions** for the target role.
2. Pick the **3** that are highest quality (detailed JD with clear responsibilities and requirements) and best match the user's experience.
3. Distill the capability requirements from those 3 JDs into three buckets:
   - **Universal requirements**: what all 3 JDs repeat — these are the baseline and MUST appear in the resume.
   - **Hard skills**: role-specific tools/techniques (e.g. a product manager needs Figma and SQL; a backend engineer needs 1–2 backend languages).
   - **Soft skills** (core competencies): e.g. requirement analysis, learning ability, cross-team communication.

### Step 3 — Write experience sections with STAR

For project and internship entries, write each one against the JD's capability requirements using the STAR method, in this structure:

**Entry title:** name of the project / internship

**(1) Background & Goal — maps to S/T.**
Background = a user pain point, a competitor's weakness, or a current product's weakness. The Goal follows directly from that background.

> **Example**
>
> **Background**: Job seekers re-tailor their resume for every role and apply manually across boards — averaging 40+ minutes per application with zero feedback on match quality; existing tools (template sites, job boards) only provide static templates and cannot personalize to a specific JD. **Goal**: design an assistant Agent that parses a JD, generates a matched resume version, and stages the application, cutting per-application time to under 5 minutes.

**(2) Action & Result — maps to A/R.**
Demonstrate the JD's capabilities in **3–5 concrete bullets**, and quantify each result with data.

> **Example** (targeting an AI product-manager JD requiring Figma, SQL, and requirement analysis)
>
> - **Requirement analysis**: synthesized 12 user interviews into 3 core pain points ranked by frequency → defined the MVP scope that shipped first, avoiding two low-value feature tracks.
> - **SQL**: wrote funnel SQL over 8,000 application events to locate drop-off → found the preview-confirmation step caused 62% of abandonments; the redesign lifted application completion from 72% to 94%.
> - **Evaluation & iteration**: built an 80-scenario LLM-as-Judge eval set with Rubrics across safety / task completion / resume quality → resume accept rate improved 68% → 89% after prompt iterations.
> - **Figma**: delivered clickable prototypes for 5 key flows and moderated tests with 8 users → requirement churn during development dropped by about half.

Every Action bullet should answer *"which JD capability does this prove?"* and end with a measurable Result.

### Step 4 — Personal qualities & Skills

**(1) 个人素养 (personal qualities)** — one bullet per soft skill from Step 2's bucket; back each with a concrete number or outcome.

> Example: *Strong learning ability — GPA 3.8, top 5% of the major.*

**(2) 技能 (skills)** — one bullet per hard skill; back each with a concrete data point or artifact.

> Example: *Video editing — produce high-quality product promo videos with CapCut; top video gained 2,000 likes. Link: xxx.*

## 3. Output

Deliver the content in the resume's section order (Section 1 above) as the `content` of `简历数据.js` when the `build-resume` template is in play, so it renders through the HTML template and exports to a one-page PDF.
