# CLAUDE.md — TN Freebies Fiscal Dashboard

## Project Overview

Interactive infographic dashboard analyzing the fiscal impact of election-linked welfare schemes ("freebies") across three successive Tamil Nadu state governments, with 5-year projections based on 2026 manifesto promises from both DMK and AIADMK.

**Live URL:** https://kkarthiks.github.io/tn-freebies-dashboard/
**Repo:** git@github.com:kkarthiks/tn-freebies-dashboard.git
**Owner:** Karthik (GitHub: kkarthiks) — uses SSH for GitHub access

## Architecture & Deployment

### Stack
- React 18 + Recharts (charting library) — built with Vite 5
- Single-component app: all logic lives in `src/Dashboard.jsx`
- No backend, no database, no external API calls — pure static site

### Deployment Model (IMPORTANT)
This repo deploys **pre-built static files** directly to GitHub Pages. There is NO build pipeline / GitHub Actions.

- **GitHub Pages source:** Deploy from branch → `main` / `/ (root)`
- The `index.html` at root + `assets/` folder contain the Vite production build output
- `.nojekyll` file is required (prevents GitHub from processing files through Jekyll)
- `src-reference/` folder contains the original source code for rebuilding

### How to Make Changes
1. Edit `src-reference/Dashboard.jsx` (or other source files)
2. From `src-reference/`, run: `npm install && npm run build`
3. Copy `src-reference/dist/index.html` → repo root
4. Copy `src-reference/dist/assets/` → repo root `assets/` (replace old bundle)
5. Delete old JS bundles from `assets/` (filename hash changes on each build)
6. Commit and push — GitHub Pages serves the new files immediately

**Alternative:** If Karthik doesn't have Node.js locally, he generates builds via Claude (either Claude Code or Claude.ai) and deploys the pre-built output.

### Vite Config
- `base: './'` — relative paths, critical for GitHub Pages to work regardless of repo name
- @vitejs/plugin-react for JSX

### File Structure
```
tn-freebies-dashboard/
├── index.html              ← Production build HTML (served by GitHub Pages)
├── assets/
│   └── index-*.js          ← Production build JS bundle (~580KB, contains React+Recharts+app)
├── .nojekyll               ← Required for GitHub Pages
├── README.md
├── CLAUDE.md               ← This file
└── src-reference/          ← Source code for rebuilding
    ├── src/
    │   ├── Dashboard.jsx   ← Main component (ALL app logic, data, charts, translations)
    │   └── main.jsx        ← React entry point
    ├── index.html          ← Dev HTML shell (loads Google Fonts DM Sans, sets dark background)
    ├── package.json
    ├── vite.config.js      ← base: './' — DO NOT change this
    └── package-lock.json   ← Required for CI builds if Actions pipeline is ever added
```

## Dashboard Features

### 5 Interactive Charts (tabs)
1. **Freebies vs Revenue** — Bar+line combo. Bars = absolute freebie spend (₹ Cr), Line = freebies as % of total revenue receipts. Color-coded by ruling government era.
2. **Fiscal Deficit** — Bar+line. Bars = deficit in ₹ Cr, Line = deficit as % of GSDP. 3% FRBM reference line. Toggle between DMK/AIADMK manifesto projection scenarios.
3. **Per Capita Impact** — Area+lines. Shows freebie spend, fiscal deficit, and outstanding debt per person.
4. **Debt Trajectory** — Area+line. Outstanding debt in absolute terms + debt-to-GSDP ratio. 30% "danger zone" reference line.
5. **Freebie Breakdown** — Horizontal bar chart. Category-wise average annual spend across government tenures (PDS, cash transfers, bus travel, laptops, appliances, gold, pensions, Pongal).

### 4 Interactive Controls
1. **Scenario Toggle:** DMK Manifesto vs AIADMK Manifesto (affects projection data FY27–31)
2. **Currency Toggle (slider):** INR (default) ↔ USD. Uses ₹93 = $1 FX rate. USD shows values in $M/$B with 2-3 significant figures.
3. **Language Toggle (slider):** English (default) ↔ Tamil (தமிழ்). ALL text is translated — title, subtitles, stat cards, chart titles, axis labels, tooltip labels, legend labels, tab names, scenario descriptions, category names, key findings, methodology, footer.
4. **Tab Navigation:** 5 chart tabs

### Other UI Elements
- 4 stat cards at top (Freebies FY26, Total FY12–26, Fiscal Deficit FY26, Outstanding Debt)
- Scenario description text (changes with currency toggle too)
- DMK vs AIADMK side-by-side projection comparison boxes (FY31)
- Key Findings section (5 numbered points, currency-aware)
- Methodology & Assumptions section (shows FX rate note when USD selected)
- Footer disclaimer

## Data Model

All data lives at the top of `Dashboard.jsx` in three arrays:

### `FD` — Historical Data (FY11–FY26)
Each row: `{ yr, rR (revReceipts), fD (fiscalDeficit), fS (freebieSpend), g (gsdp), d (debt), p (population in Cr), e (era) }`

Era values: `"pre"` (DMK pre-2011), `"aiadmk1"` (2011–16), `"aiadmk2"` (2016–21), `"dmk3"` (2021–26)

### `pD` — DMK Manifesto Projections (FY27–31)
### `pA` — AIADMK Manifesto Projections (FY27–31)
Same field structure minus `e` (era).

### Key Data Sources
- CAG State Finance Audit Reports (FY11–FY24) — actual revenue receipts, fiscal deficit, debt
- PRS India Budget Analyses (FY19–FY25) — budget estimates, sector allocation
- TN Finance Dept Budget Documents (FY25–26) — FY26 budget estimates, subsidy breakdowns (₹30,434 Cr subsidies, ₹9,682 Cr transport)
- NITI Aayog Macro-Fiscal Landscape of Tamil Nadu (March 2025) — debt-GSDP trends
- RBI State Finances Reports — outstanding liabilities, GSDP series
- DMK Election Manifesto 2021 & 2026
- AIADMK Election Manifesto 2016 & 2026
- Census of India / TN Economic Survey — population estimates

### Projection Assumptions
- Revenue CAGR: 10% (FY27–31), vs historical ~11%
- GSDP CAGR: 11% nominal
- Population: 0.5% annual growth (TN TFR ~1.6)
- One-time costs (fridges, coupons): amortised over 2 years
- Recurring costs (monthly transfers, bus subsidies): full run-rate from Year 2
- No offsetting spending cuts assumed
- FX rate: ₹93 = $1 (uniform, for comparability)

### "Freebie" Definition
Election-linked welfare schemes directly traceable to manifesto promises. Includes: PDS food subsidy enhancements, free/subsidised transport, women's cash transfers (KMUT / Kula Vilakku), free appliances (TVs, mixies, grinders, fans, fridges), free laptops, gold for brides (Thali scheme), Pongal gift packages, CM Breakfast Scheme, enhanced social security pensions. Excludes: developmental welfare (ICDS, MGNREGA, PMAY housing), government salaries/pensions, interest payments, capital expenditure.

### Key Manifesto Costs (2026 Election)

**DMK 2026:**
- KMUT doubled to ₹2,000/month → ~₹24,000 Cr/year (1.31 Cr beneficiaries)
- Illatharasi ₹8,000 appliance coupon → ~₹10,000 Cr one-time
- CM Breakfast expansion to Class 8 → ~₹1,500 Cr/year additional
- Free laptops (20 lakh students) → ~₹2,000 Cr/year
- Old-age pension hike to ₹2,000 → ~₹2,000 Cr/year additional

**AIADMK 2026:**
- Kula Vilakku ₹2,000/month → ~₹36,000 Cr/year (1.5 Cr ration cards × ₹24K)
- Free refrigerators (2.22 Cr families) → ~₹18,000–22,000 Cr one-time
- Free bus travel extended to men → ~₹3,600 Cr/year additional
- 3 free LPG cylinders → ~₹4,000 Cr/year
- One-time ₹10,000 per family → ~₹15,000 Cr one-time

## Translation System

The `T` object at the top of `Dashboard.jsx` contains two keys: `T.en` and `T.ta`. Every user-visible string is keyed here. The active language is selected via `useState("en")` and the current translation object is passed as `t` to all chart components.

Some strings are functions (e.g., `c2T: s => ...` for scenario-dependent chart titles, `k1: c => ...` where `c` is the currency formatter). When USD is selected, certain key findings use hardcoded USD figures calculated at ₹93/$1.

Tamil translations use proper fiscal/economic terminology. Category names, axis labels, tooltip labels are all translated.

## Styling

- Dark theme: `#0A0A0F` background, `#E5E7EB` text
- Font: DM Sans (loaded from Google Fonts CDN in index.html)
- Era color coding: `pre=#6B7280` (grey), `aiadmk1=#1E40AF` (dark blue), `aiadmk2=#3B82F6` (light blue), `dmk3=#DC2626` (red)
- Accent colors: `#F59E0B` (amber/freebies), `#EF4444` (red/deficit), `#8B5CF6` (purple/debt), `#10B981` (green/revenue)
- Toggle sliders: custom CSS, amber when active
- Tooltips: dark glassmorphism style with backdrop blur
- FRBM reference lines: dashed red (3% for deficit, 30% for debt/GSDP)
- Responsive: max-width 960px, flex-wrap on mobile

## Key Analytical Findings (for context)

1. Freebie spend grew ~4.7× in 15 years (₹12K Cr FY11 → ₹56K Cr FY26), roughly tracking revenue growth — but the COMPOSITION shifted from one-time appliances to recurring cash transfers
2. The structural shift to recurring commitments (KMUT, bus subsidies) is the critical fiscal risk — these lock in permanent expenditure unlike one-time appliance giveaways
3. Both 2026 manifestos would push fiscal deficit to 3.5–4.9% of GSDP, breaching the 3% FRBM ceiling
4. AIADMK's 2026 promises are costlier by ~₹10K–13K Cr/year (universal ₹2K/month + free male bus travel)
5. Per capita debt projected to nearly double from ₹1.1L to ₹2.0–2.2L by FY31
6. TN outstanding debt crossed ₹8 lakh crore, with annual interest payments of ~₹40,000 Cr

## Known Issues / Future Work

- The `file://` protocol doesn't work for local testing (module scripts blocked) — must use `python3 -m http.server` or similar
- Vite build produces a single JS chunk >500KB (React + Recharts + data + translations) — could be code-split if performance becomes an issue
- Population estimates use linear interpolation from Census 2011; 2031 Census data would improve accuracy
- FX rate is static (₹93/$1) — could be made dynamic via an API call but adds complexity
- Mobile layout could be further optimised (charts are responsive but stat cards and comparison boxes could stack better)
- Data should be updated with actuals as CAG reports become available (FY25 actuals expected mid-2026)
- After April 23, 2026 election results, the "winning manifesto" projection could be highlighted

## Context from Original Conversation

This project was built in a Claude.ai conversation in April 2026. The workflow was:
1. Deep web research on TN election freebies across AIADMK-I (2011), AIADMK-II (2016), DMK (2021) governments
2. Data compilation from CAG, PRS India, TN Finance Dept, NITI Aayog sources
3. Built React+Recharts dashboard as a Claude artifact (.jsx)
4. Packaged as Vite project with GitHub Actions CI/CD
5. Debugged deployment issues (package-lock.json missing, base path mismatch, file:// protocol blocking)
6. Switched to pre-built static deployment (simpler, no CI needed)
7. Added INR/USD currency toggle and English/Tamil language toggle
8. Updated FX rate from ₹85 to ₹93/$1
9. Created social media posts (English tweet, Tamil tweet tagging Seeman/NTK)

Karthik uses SSH for GitHub (`git@github.com:...`), does not have Node.js installed locally, and prefers pre-built deployable packages.
