# Air Quality Insights

A responsive dashboard for exploring historical air quality across Western Balkans capitals (Zagreb, Ljubljana, Belgrade, Sarajevo, Podgorica, Skopje), powered by the [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api).

## Features

- **Table view** - hourly pollutant concentrations per day, with the cleanest and peak values highlighted; switches to a compact 4-hour block table on smaller screens
- **Chart view** - daily average concentrations as a bar chart, with a per-city breakdown when "Western Balkans" is selected
- **Summary cards** - average, peak and cleanest readings for the selected period
- **Filters** - city, time range (7/14/30/90 days) and pollutant (PM2.5, PM10, O₃, NO₂, SO₂), all synced to URL search params so views are shareable
- **Edit data point** - adjust an individual hourly reading through a validated form (updates the local query cache; the upstream API is read-only, so edits are not persisted across reloads)

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) + [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query) for data fetching
- [React Router 7](https://reactrouter.com) for routing
- [react-hook-form](https://react-hook-form.com) + [Zod](https://zod.dev) for form validation
- [Recharts](https://recharts.org) for charts

## Getting started

1. Clone the repository:

   ```bash
   git clone https://github.com/tbobinac/neota-logic-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd neota-logic-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root of the project and add the following variables:

   ```
   VITE_API_URL=<your_api_base_url>
   ```

   Replace `<your_api_base_url>` with the appropriate value (e.g. `https://air-quality-api.open-meteo.com`).

5. Start the dev server:

   ```bash
   npm run dev
   ```

6. Open the app in your browser:

   ```
   http://localhost:5173
   ```

## Project structure

```
src/
├── components/      # UI building blocks
│   ├── charts/      #   chart view + section
│   ├── tables/      #   hourly & block tables + section
│   ├── summary/     #   summary cards
│   ├── forms/       #   edit data point form, date-time picker
│   ├── layout/      #   header, nav, control bar
│   └── ui/          #   shadcn/ui primitives
├── hooks/           # useAirQuality (fetching), useDashboardParams (URL state)
├── lib/             # data transforms (airQuality), date/math/fetch helpers
├── constants/       # cities, pollutants, time ranges, chart colors
├── enums/           # const-object enums (pollutant, date range, ...)
├── types/           # shared type definitions
├── validations/     # zod schemas
└── pages/           # route pages (Table, Chart, NotFound)
```
