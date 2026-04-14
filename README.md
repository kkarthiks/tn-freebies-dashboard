# Tamil Nadu: The Fiscal Cost of Election Freebies

Interactive infographic dashboard analyzing the fiscal impact of election-linked welfare schemes ("freebies") across three successive Tamil Nadu state governments — AIADMK-I (2011–16), AIADMK-II (2016–21), and DMK (2021–26) — with 5-year projections based on 2026 manifesto promises from both parties.

**Live Dashboard:** [https://YOUR_USERNAME.github.io/tn-freebies-dashboard/](https://YOUR_USERNAME.github.io/tn-freebies-dashboard/)

---

## Charts Included

| # | Chart | What it shows |
|---|-------|---------------|
| 1 | **Freebies as % of Revenue** | Absolute freebie spend (₹ Cr bars) + as % of total revenue receipts (line), color-coded by ruling government |
| 2 | **Fiscal Deficit Balloon** | Actual + projected deficit in ₹ Cr and as % of GSDP, with 3% FRBM limit reference line. Toggle between DMK / AIADMK manifesto scenarios |
| 3 | **Per Capita Burden** | Freebie spend, fiscal deficit, and outstanding debt per person (population: 7.1–7.96 Cr) |
| 4 | **Debt Trajectory** | Outstanding debt in ₹ Lakh Cr + debt-to-GSDP ratio, with 30% "danger zone" line |
| 5 | **Freebie Breakdown** | Category-wise average annual spend (PDS, cash transfers, bus travel, laptops, appliances, gold, pensions, Pongal) across government tenures |

## Tech Stack

- **React 18** + **Recharts** for interactive charting
- **Vite 5** for fast builds
- **GitHub Pages** via GitHub Actions for zero-config deployment
- No backend, no database — pure static site

---

## Quick Start

### Local Development

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/tn-freebies-dashboard.git
cd tn-freebies-dashboard

# Install dependencies
npm install

# Start dev server (hot-reload at localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Deploy to GitHub Pages

1. **Create a new GitHub repo** named `tn-freebies-dashboard` (or any name — just update `vite.config.js` base path accordingly)

2. **Push this code:**
   ```bash
   cd tn-freebies-dashboard
   git init
   git add .
   git commit -m "Initial commit: TN freebies fiscal dashboard"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/tn-freebies-dashboard.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repo → **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The included `.github/workflows/deploy.yml` will auto-build and deploy on every push to `main`

4. **Access your live site** at:
   ```
   https://YOUR_USERNAME.github.io/tn-freebies-dashboard/
   ```

### Using a Custom Domain (Optional)

1. Add a `CNAME` file in the `public/` folder with your domain (e.g., `tn-freebies.yourdomain.com`)
2. Update `base` in `vite.config.js` to `'/'`
3. Configure DNS as per [GitHub Pages custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## Data Sources

| Source | What we used | Period |
|--------|-------------|--------|
| CAG State Finance Audit Reports | Actual revenue receipts, fiscal deficit, debt, revenue expenditure | FY11–FY24 |
| PRS India Budget Analyses | Budget estimates, revised estimates, sector-wise allocation | FY19–FY25 |
| TN Finance Dept Budget Documents | FY25-26 budget estimates, subsidy breakdowns | FY25–FY26 |
| NITI Aayog Macro-Fiscal Landscape of TN | Debt-GSDP trends, revenue-GSDP benchmarks, FC recommendations | FY13–FY23 |
| RBI State Finances Reports | Outstanding liabilities, GSDP series | FY05–FY24 |
| DMK Election Manifesto 2021 & 2026 | Scheme details, coverage, stated commitments | 2021, 2026 |
| AIADMK Election Manifesto 2016 & 2026 | Scheme details, coverage, stated commitments | 2016, 2026 |
| Census of India / TN Economic Survey | Population estimates, per capita calculations | 2011, 2024-25 |

## Methodology & Key Assumptions

### "Freebie" Definition
Election-linked welfare schemes directly traceable to manifesto promises. **Includes:** PDS food subsidy enhancements, free/subsidised transport, women's cash transfers (KMUT / Kula Vilakku), free appliances (TVs, mixies, grinders, fans, fridges), free laptops, gold for brides (Thali scheme), Pongal gift packages, CM Breakfast Scheme, enhanced social security pensions.

**Excludes:** Developmental welfare (ICDS, MGNREGA, PMAY housing), salaries, pensions for government employees, interest payments, capital expenditure. Estimates are conservative.

### Projection Assumptions (FY27–FY31)
- **Revenue CAGR:** 10% (historical FY12–26 CAGR ≈ 11%)
- **GSDP CAGR:** 11% nominal
- **Population growth:** 0.5% p.a. (consistent with TN's low TFR of ~1.6)
- **One-time costs** (fridges, coupons): amortised over 2 years
- **Recurring costs** (monthly cash transfers, bus subsidies): annualised at full run-rate from Year 2
- **No offsetting spending cuts assumed** — projections reflect additive manifesto costs on existing baseline

### DMK 2026 Manifesto Key Costs
- KMUT doubled to ₹2,000/month → ~₹24,000 Cr/year (1.31 Cr beneficiaries)
- Illatharasi ₹8,000 coupon → ~₹10,000 Cr one-time (amortised)
- CM Breakfast expansion to Class 8 → ~₹1,500 Cr/year additional
- Free laptops (20 lakh students) → ~₹2,000 Cr/year
- Pension hike to ₹2,000 → ~₹2,000 Cr/year additional

### AIADMK 2026 Manifesto Key Costs
- Kula Vilakku ₹2,000/month → ~₹36,000 Cr/year (1.5 Cr ration cards × ₹24K)
- Free refrigerators (2.22 Cr families) → ~₹18,000–22,000 Cr one-time (amortised)
- Free bus travel extended to men → ~₹3,600 Cr/year additional
- 3 free LPG cylinders → ~₹4,000 Cr/year
- One-time ₹10,000 per family → ~₹15,000 Cr one-time (amortised)

---

## Project Structure

```
tn-freebies-dashboard/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions auto-deploy to Pages
├── public/                     # Static assets (add CNAME here for custom domain)
├── src/
│   ├── Dashboard.jsx           # Main dashboard component (all 5 charts + data)
│   └── main.jsx                # React entry point
├── index.html                  # HTML shell with fonts & meta tags
├── package.json
├── vite.config.js              # Vite config (update `base` for your repo name)
├── .gitignore
└── README.md
```

## Modifying the Data

All fiscal data lives in `src/Dashboard.jsx` in three arrays at the top of the file:

- `fiscalData` — historical data FY11–FY26
- `projDMK` — DMK manifesto projection FY27–FY31
- `projAIADMK` — AIADMK manifesto projection FY27–FY31

Each row contains: `year`, `yr` (short label), `revReceipts`, `fiscalDeficit`, `freebieSpend`, `gsdp`, `debt`, `pop` (in crore), `govt`, `era`. Update these values as actuals become available.

---

## License

MIT — feel free to use, modify, and share. Attribution appreciated.

If you use this in journalism, research, or policy work, please cite:
> Tamil Nadu Freebies Fiscal Dashboard. Data compiled from CAG, PRS India, TN Finance Dept, NITI Aayog. April 2026.
