# Tamil Nadu: The Fiscal Cost of Election Freebies

Interactive infographic dashboard analyzing the fiscal impact of election freebies across three Tamil Nadu state governments (AIADMK-I 2011–16, AIADMK-II 2016–21, DMK 2021–26) with 5-year projections based on 2026 manifesto promises.

## Live Dashboard

**[View Dashboard →](https://kkarthiks.github.io/tn-freebies-dashboard/)**

## Charts

1. **Freebies as % of Revenue** — Absolute spend + revenue share, color-coded by government
2. **Fiscal Deficit Balloon** — Actual + projected, toggle DMK/AIADMK manifesto scenarios
3. **Per Capita Burden** — Freebie spend, deficit, and debt per person
4. **Debt Trajectory** — Outstanding debt + debt-to-GSDP ratio with 30% danger line
5. **Freebie Breakdown** — Category-wise spend: PDS, cash transfers, bus travel, laptops, appliances, gold, pensions, Pongal

## Data Sources

CAG State Finance Audit Reports (FY11–24), PRS India Budget Analyses (FY19–25), TN Finance Dept Budget Documents (FY25–26), NITI Aayog Macro-Fiscal Landscape (Mar 2025), RBI State Finances, DMK & AIADMK 2026 Election Manifestos.

## Source Code

Original React + Recharts source is in `src-reference/`. To rebuild locally:

```bash
cd src-reference
npm install
npm run dev      # dev server at localhost:5173
npm run build    # production build to dist/
```

## License

MIT
