# Dashboard Builder POC

A full-stack drag-and-drop dashboard builder with pluggable chart widgets, built with React, Redux Toolkit, Express, and MongoDB.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, TypeScript |
| State | Redux Toolkit |
| Server State | TanStack React Query |
| UI | shadcn/ui, Radix UI, Tailwind CSS v4 |
| Charts | Apache ECharts (echarts-for-react) |
| Layout | react-grid-layout |
| Backend | Express, TypeScript, Node.js |
| Database | MongoDB, Mongoose |

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

### Backend

```bash
cd backend
cp .env.example .env        # set MONGO_DB_URL
npm install
npm run dev
```

Server starts on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App starts on `http://localhost:5173`.

### Seed Data

```bash
cd backend
npx ts-node src/seeds/seedDashboard.ts
```

## Features

- **Add widgets** — Bar Chart, Line Chart, Tree Map, Scatter Plot via toolbar dialogs
- **Drag & resize** — widgets are freely repositioned and resized; layout is auto-saved to the backend
- **Edit widget** — rename a widget title inline
- **Duplicate widget** — clones a widget with a new ID
- **Refresh widget** — re-fetches chart data independently per widget instance
- **Delete widget** — removes widget with a confirmation dialog
- **New Layout** — creates a new dashboard and switches to it
- **Dashboard Switcher** — select between multiple saved dashboards

## Project Structure

```
dashboard-builder-poc/
├── backend/
│   └── src/
│       ├── controllers/     # Request handlers
│       ├── services/        # Business logic
│       ├── models/          # Mongoose schemas
│       ├── routes/          # Express routers
│       ├── mocksEngine/     # Mock chart data generators
│       └── app.ts
└── frontend/
    └── src/
        ├── api/             # Axios API clients
        ├── components/
        │   ├── dashboard/   # Shell, Grid, Toolbar, Switcher
        │   ├── widget/      # WidgetCard, WidgetRenderer
        │   └── ui/          # shadcn/ui components
        ├── hooks/           # React Query hooks
        ├── registry/        # Widget type → component map
        ├── store/           # Redux slices
        ├── widgets/         # Chart widget implementations
        └── types/
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboards` | List all dashboards |
| POST | `/api/dashboards` | Create dashboard |
| GET | `/api/dashboards/:id` | Get dashboard by ID |
| PUT | `/api/dashboards/:id/layout` | Save layout |
| POST | `/api/dashboards/:id/widgets` | Add widget |
| PUT | `/api/dashboards/:id/widgets/:widgetId` | Update widget |
| POST | `/api/dashboards/:id/widgets/:widgetId/duplicate` | Duplicate widget |
| DELETE | `/api/dashboards/:id/widgets/:widgetId` | Delete widget |
| GET | `/api/widgets/bar` | Bar chart mock data |
| GET | `/api/widgets/line` | Line chart mock data |
| GET | `/api/widgets/treemap` | Tree map mock data |
| GET | `/api/widgets/scatter` | Scatter plot mock data |

## Architecture Decisions

See [docs/ADR.md](./docs/ADR.md) for detailed architecture decision records.
