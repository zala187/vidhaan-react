# Vidhaan — DPDP Act Compliance Scanner (React)

Component-wise React conversion of the original single-file HTML app. Everything is a demo
(no real backend) — scans are generated deterministically from the URL you enter, so the
same URL always produces the same score.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
```

```bash
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Structure

```
src/
  main.jsx                 entry point
  App.jsx                  switches between PublicSite and AppShell
  index.css                all styling (design tokens, layout, components)

  context/
    AppContext.jsx          global state: auth, theme, accent color, scans, toast, nav

  data/
    categories.js            DPDP checklist (38 checks / 8 categories) + static content

  utils/
    scanEngine.js            deterministic scan generator (seeded PRNG)
    helpers.js                timeAgo, CSV/JSON export helpers

  components/
    Logo.jsx, Toast.jsx, AuthOverlay.jsx

    public/                  marketing site (logged-out)
      Navbar, Hero, LogoStrip, Features, HowItWorks,
      Pricing, FAQ, CTABand, Footer, PublicSite (wraps them all)

    app/                     logged-in product
      AppShell (sidebar + topbar + page router)
      Sidebar, Topbar
      Dashboard, Scanner, Report, History, ReportsGrid,
      Settings, Profile, Admin
      RiskDonut, Sparkline (small chart components)
```

## Notes

- State (scans, theme, accent color, logged-in user, current report, toast) lives in
  `AppContext` and is consumed via the `useApp()` hook — no prop drilling.
- Each page under `components/app` is a self-contained component so you can add/remove
  sidebar items without touching anything else.
- The scan "engine" in `utils/scanEngine.js` is fully deterministic and offline; swap it
  for a real API call whenever you're ready to wire up a backend.
