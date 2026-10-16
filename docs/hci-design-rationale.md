# HCI & UX Design Rationale

**Author:** Mahi Desai  
**Project:** Personal Portfolio & Academic Engineering Showcase  
**Platform:** Plain HTML5, CSS3, Vanilla JavaScript (GitHub Pages Hostable)  
**Target Compliance:** Targets WCAG 2.1 Level AA (individual pairs exceeding 7:1 noted per pair); Nielsen's 10 Heuristics, Shneiderman's 8 Golden Rules, Fitts's Law, Hick's Law, Gestalt Principles.

---

## 1. Color Contrast & Visual Accessibility Rationale

The site targets **WCAG 2.1 Level AA** (Success Criterion 1.4.3, 4.5:1 for normal text). Individual colour pairs that also exceed the enhanced 7:1 threshold (Criterion 1.4.6) are noted per pair. All colour pairs were mathematically validated using the standardized relative luminance formula:

$$\text{Relative Luminance } L = 0.2126 \times R + 0.7152 \times G + 0.0722 \times B$$
$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05} \quad (L_1 > L_2)$$

### Exact Contrast Verification Table (Recomputed via sRGB Linearisation)

| UI Element & Mode | Foreground Color | Background Color | Calculated Ratio | WCAG Compliance Level | Rationale & Design Decision |
|---|---|---|---|---|---|
| **Light Mode: Primary Text & Links** | `#0F766E` (Dark Teal) | `#FFFFFF` (Pure White) | **5.47 : 1** | **WCAG AA (Pass)** | Primary links and text exceed the 4.5:1 AA standard without eye fatigue. |
| **Light Mode: Canvas Text** | `#0F766E` (Dark Teal) | `#F8FAFC` (Canvas Slate) | **5.23 : 1** | **WCAG AA (Pass)** | High legibility over off-white background canvas and card sections. |
| **Teal CTA Buttons (Both Modes)** | `#0F172A` (Deep Navy) | `#14B8A6` (Teal Background) | **7.17 : 1** | **WCAG AA & AAA (Pass)** | Deep Navy text on vibrant teal button exceeds the stringent 7:1 AAA standard. |
| **Dark Mode: Body Text** | `#F8FAFC` (Crisp White) | `#0B0F19` (Deep Canvas Navy) | **18.30 : 1** | **WCAG AA & AAA (Pass)** | Exceptional contrast preventing visual strain in dark environments. |
| **Dark Mode: Teal Accents & Headings** | `#14B8A6` (Vibrant Teal) | `#0B0F19` (Deep Canvas Navy) | **7.69 : 1** | **WCAG AA & AAA (Pass)** | Brand accent passes AAA threshold for body text and interactive focus rings. |
| **Dark Mode: Secondary Body** | `#94A3B8` (Muted Slate) | `#0B0F19` (Deep Canvas Navy) | **7.47 : 1** | **WCAG AA & AAA (Pass)** | Secondary body text on dark canvas exceeds AAA. |
| **Dark Mode: Secondary Metadata on Cards** | `#94A3B8` (Muted Slate) | `#111827` (Surface Card Navy) | **6.92 : 1** | **WCAG AA (Pass)** | Timestamps, tags, and metrics remain crisp and clearly readable. |
| **Light Mode: Secondary Text** | `#334155` (Dark Slate) | `#FFFFFF` (Surface Card) | **10.35 : 1** | **WCAG AA & AAA (Pass)** | Secondary body text and bullet points provide effortless legibility. |
| **Light Mode: AI Accent Badge** | `#0369A1` (Calibrated Deep Sky) | `#FFFFFF` (Surface Card) | **5.93 : 1** | **WCAG AA (Pass)** | Calibrated from previous #0284C7 (4.1:1 fail) to exceed the 4.5:1 AA threshold. |
| **Dark Mode: Error Text** | `#F43F5E` (Rose Red) | `#0B0F19` (Deep Canvas Navy) | **5.22 : 1** | **WCAG AA (Pass)** | Error notifications and validation alerts pass the 4.5:1 AA threshold. |

> **Accessibility Limitation Note:** While automated tools and algorithmic color verification confirm WCAG 2.1 Level AA compliance across all UI pairs, formal manual end-user testing with screen readers (NVDA, JAWS, VoiceOver) has not yet been performed.

---

## 2. Mapping to Nielsen's 10 Usability Heuristics

### 1. Visibility of System Status
- **Reading Progress Bar**: Fixed 3px dual-gradient bar at the viewport top indicates scroll depth in real time.
- **ScrollSpy Navigation**: Header highlights the active section in teal (`aria-current="page"`) as the user scrolls.
- **Form Submission Feedback**: Submit button displays an interactive loading spinner (`"Sending Message..."`) and transitions to a verified success banner or explicit error diagnosis with fallback.
- **Live Theme Indicator**: Theme button explicitly shows the alternate state icon (Sun ☀️ for light, Moon 🌙 for dark) with accessible descriptive text.

### 2. Match Between System and the Real World
- Information architecture mirrors natural engineering workflows: Foundations (Education/About), Proven Delivery (Projects & Metrics), Contributions (Open Source & Clubs), and Inquiries (Contact).
- Standard terminology (`CGPA`, `k-mer vectors`, `cGAN`, `REST API`, `RLS`) matched to domain standards without contrived jargon.

### 3. User Control and Freedom
- **Dismissible Modals**: Project architecture modals and blog deep-dives can be dismissed via three intuitive pathways: (1) physical `Escape` key, (2) explicit circular `✕` close button, or (3) tapping the dimmed background backdrop.
- **Focus Restoration**: When a modal closes, keyboard focus is automatically returned to the exact card button that opened it.
- **Back-to-Top Anchor**: Floating button appears after scrolling 400px down, providing instant one-click return to the top navigation.
- **Theme Preference Autonomy**: Users can override system dark/light preferences at any moment; selection is saved in `localStorage`.

### 4. Consistency and Standards
- **Tokenized Spacing (8pt Grid)**: All margins, padding, and layout gutters utilize standard CSS custom properties (`--space-1` to `--space-16`).
- **Standard Link & Button Paradigms**: Buttons trigger actions; anchors navigate. External links open in new tabs with `rel="noopener noreferrer"` and assistive labels.

### 5. Error Prevention
- **Real-time Field Validation**: Form fields validate on `blur` and input change before submission, catching formatting bugs (e.g. invalid emails or too-short names) early.
- **Clear Required Indicators**: Required form inputs feature a red asterisk (`*`) and descriptive HTML5 constraints.
- **Defensive API Dispatch**: If Formspree network calls fail, the form prevents misleading false positives and immediately reveals a mailto direct link.

### 6. Recognition Rather than Recall
- **Filter Chips**: Project categories (All, AI/ML, Deep Learning, Full-Stack) allow immediate visual recognition rather than requiring users to type or remember category names.
- **Tech Stack Badges**: Project cards display micro-chips (e.g., `PyTorch`, `Supabase`, `HDBSCAN`) visually identifying the stack at a glance.
- **Download Resume File Size**: The resume button explicitly indicates file size (`154 KB`) and format (PDF) before triggering the download.

### 7. Flexibility and Efficiency of Use
- **Instant Blog Search**: Substring matching filters engineering articles instantly across titles, tags, and content bodies.
- **Reading Time Estimates**: Articles display calculated reading times (e.g. `5 min read`) to help users prioritize time.
- **Keyboard Accelerators**: Full keyboard navigation support (Tab, Shift+Tab, Enter, Escape).

### 8. Aesthetic and Minimalist Design
- Curated color scheme: Deep Navy (`#0B0F19`) and Teal Accent (`#14B8A6`). No visual clutter, decorative cliparts, or uninformative progress bars.
- Transparent cards with subtle 1px border lines organize information into digestible chunks (Gestalt Common Region).

### 9. Help Users Recognize, Diagnose, and Recover from Errors
- Clear, polite inline error messages: *"Please enter a valid email address (e.g., name@example.com)"* instead of generic "Invalid input".
- Failed form submissions provide direct fallback: *"The endpoint could not be reached. Please send an email directly to desaihmahi@gmail.com."*

### 10. Help and Documentation (In-Interface Contextual Assistance)
- **Project Filter Helper Text:** Immediate instructions under filter buttons: *"Choose a category to narrow the projects. Select \"All\" to reset."*
- **Blog Search Hint:** Search field is accompanied by an inline hint: *"Search articles by topic, tag (e.g. PyTorch), or keyword."*
- **Contact Form Guidance:** Every form input provides contextual explanation linked via `aria-describedby`:
  - Name: *"Your full name or organization."*
  - Email: *"We will only use this to reply to your inquiry."*
  - Message: *"Briefly describe your project, inquiry, or opportunity."*
- **SUS Scoring Assistance:** A collapsible `<details>` element provides an in-depth breakdown of how SUS scoring works (alternating Brooke 1996 scale, 0-4 conversion, x2.5 multiplier) along with a visible 1–5 scale legend.
- **Accessible Tooltips:** Interactive controls with non-obvious functions (Theme Toggle, Rate Site, Export Data) feature tooltips that are keyboard-focusable, persist on hover/focus, and are dismissible via the `Escape` key (WCAG 1.4.13).
*(Note: Design documentation is available via footer links as project documentation, distinct from in-interface user assistance).*

---

## 3. Shneiderman's 8 Golden Rules Integration

1. **Strive for Consistency**: Standardized typography hierarchy, button heights (min 44px), card radii, and color tokens.
2. **Cater to Universal Usability**: Strict WCAG 2.1 AA/AAA contrast ratios, screen-reader `.sr-only` cues, and `prefers-reduced-motion` support.
3. **Offer Informative Feedback**: Hover states, active nav indicators, dynamic SUS score calculations.
4. **Design Dialogs to Yield Closure**: Honest feedback behavior:
   - *Contact Form:* Submit button changes to "Sending..." with `aria-busy="true"`. Real HTTP 2xx from Formspree confirms delivery in `role="status"`; errors are diagnosed in `role="alert"` preserving user input. When in placeholder mode, the UI explicitly announces that it opened the email application, never falsely claiming delivery.
   - *SUS Form:* Submitting produces instant calculated score, Sauro & Lewis (2016) grade, and an expandable question-by-question calculation breakdown.
5. **Prevent Errors**: Inline input validation, non-empty textarea constraints.
6. **Permit Easy Reversal of Actions**: Clear SUS reset button with confirmation prompt; modal dismissals.
7. **Support Internal Locus of Control**: The user controls theme, project filtering, modal browsing, and evaluation submissions.
8. **Reduce Short-Term Memory Load**: Grouped skills chips, visible project filter states, and explicit metric cards.

---

## 4. Fitts's Law & Hick's Law Engineering

### Fitts's Law
$$T = a + b \log_2 \left(1 + \frac{D}{W}\right)$$
- **Target Size ($W$)**: Every interactive element (buttons, filter chips, theme toggles, modal close buttons, social icons) has a **minimum hit target of 44px × 44px**, exceeding WCAG 2.5.5 requirements.
- **Corner Anchors ($D$)**: The sticky navigation bar spans the top edge ($D=0$ when reaching the viewport boundary), and the back-to-top button is anchored in the bottom-right corner.

### Hick's Law
$$T = b \log_2(n + 1)$$
- **Navigation Limit ($n \le 6$)**: Primary top navigation strictly contains **6 items** (About, Academic, Experience & Activities, Projects, Blog, Contact). Secondary evaluations are linked naturally in the hero and footer.
- **Project Filtering**: 4 clean categorical filter buttons instead of a multi-tiered dropdown menu.

---

## 5. Gestalt Principles in Layout Architecture

- **Proximity**: Education dates, degree titles, and institution names are grouped closely within individual timeline cards.
- **Common Region**: Cards have subtle borders (`rgba(148, 163, 184, 0.14)`) and distinct background surfaces (`#111827` / `#FFFFFF`) clearly delimiting component bounds.
- **Similarity**: All skill chips share identical typography, padding, and border radius.
- **Continuity**: The vertical timeline line guides visual flow from recent academic milestones to past qualifications.
