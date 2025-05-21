# Sentiment Dashboard

A React-based interactive dashboard for visualizing global sentiment analysis data by country and region. The app uses AmCharts 5 for mapping, TailwindCSS for styling, and provides dynamic filtering and detailed region summaries.

---

## Features

- Interactive world map visualization with sentiment data overlays
- Filter data by sentiment categories (All, Positive, Neutral, Negative)
- Select countries to view detailed regional sentiment summaries
- Responsive UI styled with TailwindCSS
- Lazy loading for map components to improve performance

## p95 dashboard latency to interactions 

Please see the attached video to check the latency
[TBI - Global Sentiment Analysis.webm](https://github.com/user-attachments/assets/eb4a0017-2243-4edb-bab8-2d811e43dc8f)


---

## To Do Non-functional requirements 
- Unit test
- TypeScript support
- 

## To Do Pending Features
- Loading all countries' map data
- Filter data by Regions
- Loader for Summary Table
- p95 matrix
- On Region selection, Zoom and selection UI in map


## Technologies & Packages Used

### Core Dependencies

| Package                   | Version     | Purpose                                                |
|---------------------------|-------------|--------------------------------------------------------|
| `react`                   | ^19.1.0     | UI framework for building the dashboard                |
| `react-dom`               | ^19.1.0     | React DOM rendering                                     |
| `@amcharts/amcharts5`     | ^5.12.2     | Charting library used for rendering interactive maps   |
| `@amcharts/amcharts5-geodata` | ^5.1.4  | Geographical data for maps (countries, regions, etc.) |
| `tailwindcss`             | ^4.1.7      | Utility-first CSS framework for styling                 |
| `clsx`                    | ^2.1.1      | Helper for conditional className concatenation         |
| `@tailwindcss/vite`       | ^4.1.7      | Tailwind plugin to integrate with Vite build system    |

### Development Dependencies

| Package                   | Version     | Purpose                                                |
|---------------------------|-------------|--------------------------------------------------------|
| `vite`                    | ^6.3.5      | Fast build tool and development server                  |
| `@vitejs/plugin-react`    | ^4.4.1      | Vite plugin for React support                            |
| `eslint`                  | ^9.25.0     | Linting tool to enforce code quality                     |
| `@eslint/js`              | ^9.25.0     | ESLint core rules                                       |
| `eslint-plugin-react-hooks` | ^5.2.0    | ESLint rules for React Hooks                             |
| `eslint-plugin-react-refresh` | ^0.4.19 | ESLint rules to support React Fast Refresh              |
| `@types/react`            | ^19.1.2     | TypeScript types for React (if using TS)                 |
| `@types/react-dom`        | ^19.1.2     | TypeScript types for React DOM (if using TS)             |
| `globals`                 | ^16.0.0     | Global variable definitions for linting                   |

---

## Setup and Running

1. **Install dependencies**

   ```bash
   npm install

2. **Start development server**

   ```bash
   npm run dev

3. **Build for production**

   ```bash
   npm run build

3. **Preview production build**

   ```bash
   npm run preview
