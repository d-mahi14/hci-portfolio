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
| **H10**| Help & Documentation | In-interface contextual help: project filter helper, blog search hint, contact form privacy hints (aria-describedby), collapsible SUS scoring guide & 1-5 legend, and accessible tooltips (WCAG 1.4.13). | **1** | Minor cosmetic observation: persistent tooltips on mobile require tap-to-dismiss. External docs in footer are project documentation, not user help. |

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

### Empirical Benchmarks (Sauro & Lewis, 2016 Curved Grading Scale)
Derived from empirical distribution across > 5,000 SUS surveys (Brooke 1996; Sauro & Lewis 2016):
- **84.1 – 100.0**: Grade A+ (Superior usability / Top 4%)
- **80.8 – 84.0**: Grade A (Excellent usability / Top 10%)
- **78.9 – 80.7**: Grade A- (Very good usability / Top 15%)
- **77.2 – 78.8**: Grade B+ (Good usability / Top 20%)
- **74.1 – 77.1**: Grade B (Solid usability / Top 30%)
- **72.6 – 74.0**: Grade B- (Above average usability / Top 35%)
- **71.1 – 72.5**: Grade C+ (Slightly above average usability / Top 40%)
- **65.0 – 71.0**: Grade C (50th percentile / Mean = 68.0). **Plainly: A score of 68 is the industry average (grade C), not 'above average'.**
- **62.7 – 64.9**: Grade C- (Below average usability / Bottom 40%)
- **51.7 – 62.6**: Grade D (Poor usability / Bottom 30%)
- **0.0 – 51.6**: Grade F (Failing usability / Bottom 15%)

*Note: Wording such as 'Above average' is used only for scores above 71.0.*

---

## Part 4: Participant Observations & Remediation Tracker

*Empirical testing observations and iterative design remediations from 5 participant trials.*

| Participant ID | Role / Background | Observed Usability Friction | Participant Comments | Remediation Implemented |
|---|---|---|---|---|
| **P1** | 3rd-year CS student, views portfolios occasionally | T1: opened the eDNA modal quickly but scrolled past the “87.5% reduction” line, found it after about 30s (target was under 25s). | “The numbers are there, but I had to hunt for them.” | Moved the key metric into a highlighted line at the top of the project modal. |
| **P2** | Final-year student, has built her own portfolio | T2: clicked the GitHub icon first, then found “Download Resume” after about 10s. No errors. | “Resume button is easy to spot once you scroll up.” | None. Severity 1 (cosmetic), no change needed. |
| **P3** | Non-technical friend, rarely uses developer sites | T5: paused at SUS Q2 and Q4, unsure why some questions sounded negative. Submitted one answer on the wrong end of the scale, then corrected it. | “Why are some questions phrased the opposite way?” | Added a note above the form: “Questions alternate between positive and negative wording. Read each carefully.” |
| **P4** | Senior who has helped with campus recruitment | T4: searched “GAN” and found the article quickly. Noticed the certificates but wanted to know which one was most recent. | “Certificate dates are small. A newest-first order would help.” | Sorted certificates newest first and increased date text size. |
| **P5** | Junior who mostly uses a phone | T3: the theme toggle worked, but it was hard to tap on the first try. | “The sun icon felt small on my phone.” | Increased the toggle to a 48px tap target and added spacing. |
