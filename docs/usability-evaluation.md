# Usability Evaluation Protocol & SUS Benchmark Template

**Candidate:** Mahi Desai  
**Platform:** Personal Profile & Engineering Portfolio  
**Methodology:** Heuristic Evaluation (Nielsen) + Empirical 5-Participant Task Testing + System Usability Scale (SUS, Brooke 1996)

---

## Part 1: Nielsen Heuristic Evaluation Checklist

Evaluators rate usability findings using Nielsen's Standard Severity Scale:
- **0 = Not a usability problem at all**
- **1 = Cosmetic problem only:** Need not be fixed unless extra time is available on project
- **2 = Minor usability problem:** Fixing this should be given low priority
- **3 = Major usability problem:** Important to fix, so should be given high priority
- **4 = Usability catastrophe:** Imperative to fix before product can be released

### Heuristic Audit Table

| ID | Heuristic | Evaluation Criteria & Findings | Severity (0-4) | Remediation Applied |
|---|---|---|:---:|---|
| **H1** | Visibility of System Status | ScrollSpy accurately tracks viewport position; reading progress bar gives instant visual feedback. | **0** | Verified active nav highlights and reading progress bar. |
| **H2** | Match Between System & Real World | Realistic engineering nomenclature (eDNA, VAE, Groq LLM, Supabase RLS). | **0** | Content verified against original resume and repository facts. |
| **H3** | User Control & Freedom | Modals must be dismissible via Esc key, backdrop click, or close button. | **0** | Focus trap and keyboard listeners tested across all dialogs. |
| **H4** | Consistency & Standards | Color variables, typography tokens, and spacing abide by 8pt grid. | **0** | Unified design tokens across all components. |
| **H5** | Error Prevention | Contact form prevents submission with missing/malformed fields. | **0** | Real-time regex and length checks prevent invalid requests. |
| **H6** | Recognition Over Recall | Project tags and category filters allow immediate recognition. | **0** | Prominent filter chips provided for AI/ML, Deep Learning, and Full-Stack. |
| **H7** | Flexibility & Efficiency | Search bar in blog allows instant substring matching; theme toggle remembers user preference. | **0** | Implemented instant debounced search and localStorage persistence. |
| **H8** | Aesthetic & Minimalist Design | Clutter-free dark/light interface, no unnecessary graphical ornaments. | **0** | Focused layout with high information density and clear visual hierarchy. |
| **H9** | Help Users Recognize & Recover from Errors | If Formspree fails, error banner explicitly displays error code and direct mailto link. | **0** | Clear fallback email instructions provided in the error banner. |
| **H10**| Help & Documentation | Clear labels, documentation links, and resume download with exact file size. | **0** | Downloadable resume explicitly tagged with `154 KB` size badge. |

---

## Part 2: Task-Based Usability Scenarios (5 Participants)

### Participant Demographic Target
5 independent participants (engineering peers, recruiters, or UX students).

| Task # | Scenario Description | Expected Navigation Path | Success Criteria | Target Time | Observed Time | Errors / Friction | Success (Y/N) |
|:---:|---|---|---|:---:|:---:|---|:---:|
| **T1** | *"Find the project that analyzed eDNA sequences and identify the dimensionality reduction percentage achieved."* | Click "Projects" in nav -> Locate "Assessing Biodiversity from eDNA Datasets" -> Read metrics / Open Modal. | Discovers 87.5% reduction (from 256-dim to 32-dim VAE embeddings). | < 25s | ___ s | | [ ] |
| **T2** | *"Download Mahi Desai's official resume and verify its file size before opening."* | Click "Download Resume" in Hero, Experience section, or footer. | Successfully initiates download of `Mahi_Desai_Resume.pdf` (154 KB). | < 15s | ___ s | | [ ] |
| **T3** | *"Switch to Light Mode and verify that all text remains easily legible."* | Click sun/moon toggle in top navigation. | Observes immediate color palette transition with contrast-compliant text. | < 10s | ___ s | | [ ] |
| **T4** | *"Filter blog posts to find articles about 'Generative AI' or 'GANs' and check estimated reading time."* | Navigate to Blog -> Click "Generative AI" tag or type "GAN" into search box. | Locates "Decoupling Style and Content in Conditional GANs" (6 min read). | < 20s | ___ s | | [ ] |
| **T5** | *"Complete the 10-question SUS questionnaire on the site, submit your evaluation, and check the aggregate score."* | Click "Rate this site" link in hero or footer -> Fill 1-5 scale -> Submit form. | Views instant SUS score calculation and updated aggregate benchmarks. | < 90s | ___ s | | [ ] |

---

## Part 3: System Usability Scale (SUS) Protocol

### Questionnaire Items (Brooke, 1996)
1. I think that I would like to use this website frequently.
2. I found the website unnecessarily complex.
3. I thought the website was easy to use.
4. I think that I would need the support of a technical person to be able to use this website.
5. I found the various functions in this website were well integrated.
6. I thought there was too much inconsistency in this website.
7. I would imagine that most people would learn to use this website very quickly.
8. I found the website very cumbersome to use.
9. I felt very confident using the website.
10. I needed to learn a lot of things before I could get going with this website.

### Scoring Formula
- **Odd items (1, 3, 5, 7, 9)**: Score contribution = $(\text{Scale Response} - 1)$
- **Even items (2, 4, 6, 8, 10)**: Score contribution = $(5 - \text{Scale Response})$
- **Overall SUS Score**: $\text{Sum of Contributions} \times 2.5$ (Range: 0 to 100)

### Empirical Benchmarks (Sauro & Lewis, 2016; Bangor et al., 2008)
- **> 80.3**: Grade A (Exceptional / Top 10% of tested products)
- **68.0**: Industry Mean (Grade C / Above Average threshold)
- **< 51.0**: Grade F (Usability concerns requiring remediation)

---

## Part 4: Participant Observations & Remediation Tracker

| Participant ID | Role / Background | Observed Usability Friction | Participant Comments | Remediation / Improvement Implemented |
|---|---|---|---|---|
| **P1** | CS Peer (VJTI) | | | |
| **P2** | Front-end Developer | | | |
| **P3** | UX Student / Evaluator | | | |
| **P4** | Recruiter / Hiring Mgr | | | |
| **P5** | General Web User | | | |
