# Mahi Desai — Personal Profile & Engineering Portfolio

An interactive, responsive, and accessibility-first personal profile and engineering showcase for **Mahi Desai** (Computer Engineering Student at VJTI, Mumbai).

Built with plain semantic **HTML5**, **CSS3**, and **Vanilla JavaScript** (zero external build tools or frameworks), engineered for frictionless hosting on **GitHub Pages**.

---

## 🌟 Key Features

1. **Information Architecture (Hick's Law)**:
   - Sticky header consolidated into **strictly 6 primary navigation destinations**: About, Academic, Experience & Activities, Projects, Blog, and Contact.
   - Separate direct links to the **SUS Usability Evaluator** embedded in both the hero section and footer.

2. **Contrast & Visual Accessibility (WCAG 2.1 AA & AAA)**:
   - Light mode primary text & links calibrated to `#0F766E` (contrast ratio **5.55:1** on white, **5.33:1** on slate canvas).
   - High-contrast primary call-to-action buttons: Deep Navy text (`#0F172A`) on vibrant Teal background (`#14B8A6`) achieving an exceptional **7.13:1** contrast ratio (WCAG AAA compliant).
   - Seamless dark/light theme switcher with `localStorage` persistence and system preference (`prefers-color-scheme`) synchronization.
   - Comprehensive skip-to-content keyboard link, visible `:focus-visible` indicators, and full `prefers-reduced-motion` accommodation.

3. **Projects Showcase**:
   - Filterable project grid (All, AI/ML, Deep Learning, Full-Stack).
   - Verified technical architecture, deliverables, and performance metrics (e.g. 87.5% VAE dimensionality reduction, cGAN loss convergence, Groq LLM parsing).
   - Accessible modal detail dialog with focus trapping and `Escape` key dismissal.
   - Clean placeholder indicating `TODO: Add screenshot in contents/projects/<name>/` until real screenshots are supplied.

4. **Technical Blog**:
   - Real-time search by title, tag, or topic.
   - Automated reading-time estimates based on word density (~200 WPM).
   - Technical articles detailing real implementations (eDNA VAE clustering, cGAN handwriting synthesis, Groq LLM candidate matching).

5. **Validated Contact Form**:
   - Integrated Formspree endpoint placeholder (`https://formspree.io/f/placeholder_form_id`).
   - Live client-side validation for name, email format, and message length.
   - Verified error handling: never displays false-positive success; reveals immediate error diagnostics and a direct `mailto:desaihmahi@gmail.com` fallback link upon delivery failure.

6. **System Usability Scale (SUS) Suite**:
   - Complete 10-question standardized Brooke (1996) questionnaire with alternating positive/negative polarity.
   - Real-time score calculator (0 to 100) with percentile and grade classification.
   - Persistent response storage in `localStorage`.
   - **Aggregate Dashboard**: Displays Mean, Min, Max, and Count to benchmark 5 test participants.
   - **Export Capabilities**: One-click **Export JSON** and **Export CSV** for statistical analysis.

---

## 📂 Repository Structure

```
hci_proj/
├── index.html                      # Single-page semantic application
├── Mahi_Desai_Resume.pdf           # Downloadable official resume (154 KB)
├── README.md                       # Setup, documentation, and deployment guide
├── assets/
│   ├── css/
│   │   ├── variables.css           # Design tokens, color palette, 8pt spacing grid
│   │   ├── base.css                # Typography reset, skip-link, focus states, reduced motion
│   │   ├── layout.css              # Sticky navbar, responsive containers, back-to-top anchor
│   │   ├── components.css          # Cards, modals, timeline, contact form, SUS dashboard
│   │   └── animations.css          # Subtle micro-interactions, pulse indicators
│   └── js/
│       ├── data.js                 # Strictly verified profile and project data store
│       ├── app.js                  # Theme controller, ScrollSpy, reading progress bar
│       ├── projects.js             # Filterable project cards & accessible modal controller
│       ├── blog.js                 # Search, tag filters, read-time calculator
│       ├── contact.js              # Live validation, Formspree API, mailto fallback
│       └── sus.js                  # 10-question SUS calculator, aggregate stats, CSV/JSON export
├── docs/
│   ├── hci-design-rationale.md     # Detailed mapping of design decisions to HCI principles
│   └── usability-evaluation.md     # Heuristic checklist, 5 task scenarios, SUS scoring guide
└── contents/                       # Source folder for raw profile assets & future screenshots
    ├── profile.json                # Source profile configuration
    ├── MahiResume (13).pdf         # Original resume source
    ├── photo.jpg                   # [Drop your avatar photo here]
    └── projects/
        ├── joblink/                # [Drop JobLink screenshots here]
        ├── edna/                   # [Drop eDNA analysis screenshots here]
        └── text-to-handwriting/    # [Drop cGAN handwriting screenshots here]
```

---

## 🚀 Local Setup & Preview

Because this site uses pure standard web technologies without dependencies, you can run it with any standard static HTTP server:

### Option A: Using Node.js `npx serve`
```bash
# From the project root (c:\dev\hci_proj):
npx -y serve .
```
Open `http://localhost:3000` in your browser.

### Option B: Using Python
```bash
# Python 3
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

---

## 🌐 Deploying to GitHub Pages

1. **Initialize Git Repository**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete responsive portfolio with HCI usability suite"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/d-mahi14/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub: **Settings** → **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` folder.
   - Click **Save**. Within 1–2 minutes, your website will be live at:
     `https://d-mahi14.github.io/<repo-name>/`

---

## ⚙️ Customization Guide

### 1. Adding Your Profile Photo
Place your photo at `contents/photo.jpg`. The `<img>` tag in `index.html` will automatically detect and display it with lazy loading.

### 2. Adding Real Project Screenshots
Drop your screenshots into their respective folders:
- `contents/projects/joblink/`
- `contents/projects/edna/`
- `contents/projects/text-to-handwriting/tth.jpeg`

### 3. Setting Up Formspree
1. Create a free form at [formspree.io](https://formspree.io).
2. Open `assets/js/contact.js` and replace:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/placeholder_form_id';
   ```
   with your actual Formspree endpoint (e.g. `https://formspree.io/f/xvgkzyop`).
3. If the form cannot reach Formspree, it automatically falls back to `mailto:desaihmahi@gmail.com`.

---

## 🧪 HCI & Usability Documentation

- [HCI Design Rationale](docs/hci-design-rationale.md): Full mathematical verification of contrast ratios, Nielsen's 10 heuristics, Shneiderman's 8 golden rules, Fitts's law, and Hick's law.
- [Usability Evaluation Protocol](docs/usability-evaluation.md): Heuristic evaluation scoring sheet (severity 0–4), 5 empirical participant task scenarios, and SUS scoring benchmark guidelines.
