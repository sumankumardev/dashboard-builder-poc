# Dashboard Builder POC

A scalable, extensible, and production-oriented Dashboard Builder Proof of Concept (POC) developed as part of the Learning Routes technical assessment.

The project demonstrates modern frontend and backend engineering practices including dynamic widget rendering, drag-and-drop dashboard layouts, responsive design, persistent state management, runtime validation, and extensible data visualization architecture.

---

# Live Features

✅ Dashboard CRUD  
✅ Widget CRUD  
✅ Widget Duplication  
✅ Widget Registry Pattern  
✅ Drag & Drop Widgets  
✅ Widget Resize  
✅ Responsive Dashboard Layout  
✅ Persistent Dashboard Layouts  
✅ Mock Data Engine  
✅ Runtime Validation  
✅ Error Boundaries  
✅ Redux + React Query State Management  
✅ MongoDB Persistence  

---

# Tech Stack

## Frontend

- React 19
- TypeScript
- Redux Toolkit
- TanStack Query
- Tailwind CSS
- shadcn/ui
- React Grid Layout
- Apache ECharts
- Axios

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod

---

# Project Structure

```text
dashboard-builder-poc/

├── frontend/
│
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── registry/
│   │   ├── store/
│   │   ├── widgets/
│   │   ├── pages/
│   │   ├── types/
│   │   └── lib/
│
├── backend/
│
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── mockEngine/
│   │   ├── seeds/
│   │   └── config/
│
├── README.md
└── ADR.md
```

---

# Features

## Dashboard Management

- Create dashboard
- Edit dashboard
- Persist dashboard state
- Responsive layouts
- Save dashboard layouts

---

## Widget Management

- Create widgets
- Edit widgets
- Delete widgets
- Duplicate widgets
- Refresh widgets
- Configure widgets

---

## Dashboard Layout

- Drag and drop widgets
- Resize widgets
- Responsive breakpoints
- Layout persistence
- Dashboard state synchronization

---

## Supported Widget Types

### Bar Chart

Supports categorical datasets.

Examples:

- Student enrollment
- Sales comparison
- Revenue categories

---

### Line Chart

Supports temporal datasets.

Examples:

- Monthly revenue
- Growth metrics
- Performance trends

---

### TreeMap

Supports hierarchical datasets.

Examples:

- Department distribution
- Resource allocation
- Organizational structures

---

### Scatter Plot

Supports relational datasets.

Examples:

- Student performance
- Correlation analysis
- Analytical comparisons

---

# Mock Data Engine

The application implements an extensible mock data engine.

```text
mockEngine/

generateBarData.ts
generateLineData.ts
generateTreeMapData.ts
generateScatterData.ts
```

Supported data categories:

- Categorical data
- Temporal data
- Hierarchical data
- Relational data

---

# Widget Registry Pattern

The application uses a Widget Registry Pattern.

```text
Dashboard
      ↓
WidgetRenderer
      ↓
WidgetRegistry
      ↓
Concrete Widget
```

Example:

```typescript
export const widgetRegistry = {
    bar: BarWidget,
    line: LineWidget,
    treemap: TreeMapWidget,
    scatter: ScatterWidget
}
```

Adding a new widget requires only:

```typescript
widgetRegistry.pie = PieWidget;
```

No dashboard modifications are required.

---

# State Management

The application separates client and server state.

## Redux Toolkit

Used for:

- Dashboard layouts
- Widget state
- Dialog state
- UI state
- Dashboard configuration

---

## TanStack Query

Used for:

- Dashboard API calls
- Widget API calls
- Caching
- Refetching
- Error handling
- Query invalidation

---

# Dashboard Persistence

Dashboard layouts are persisted.

Flow:

```text
User Drag Widget
        ↓
Redux Update
        ↓
Debounced API Call
        ↓
MongoDB Save
```

---

# Error Handling

The application implements:

- Error Boundaries
- API error handling
- Runtime validation
- Widget isolation

If one widget crashes:

```text
Widget Crash
      ↓
ErrorBoundary
      ↓
Fallback UI
      ↓
Other widgets continue running
```

---

# Architecture

The application follows a layered architecture.

## Frontend

```text
Components
     ↓
Redux / React Query
     ↓
API Layer
     ↓
Backend
```

---

## Backend

```text
Routes
    ↓
Controllers
    ↓
Services
    ↓
Models
    ↓
MongoDB
```

---

# Database Design

## Dashboard

```javascript
{
    name,
    description,
    widgets[],
    layouts[],
    settings
}
```

---

## Widget

```javascript
{
    widgetId,
    title,
    type,
    dataSource,
    config
}
```

---

# API Endpoints

## Dashboard APIs

```http
GET    /api/dashboards
POST   /api/dashboards
PUT    /api/dashboards/:id
DELETE /api/dashboards/:id
PUT    /api/dashboards/:id/layout
```

---

## Widget APIs

```http
GET    /api/widgets/bar
GET    /api/widgets/line
GET    /api/widgets/treemap
GET    /api/widgets/scatter

POST   /api/dashboards/:id/widgets
PUT    /api/dashboards/:id/widgets/:widgetId
DELETE /api/dashboards/:id/widgets/:widgetId
POST   /api/dashboards/:id/widgets/:widgetId/duplicate
```

---

# Running the Project

## Clone

```bash
git clone <repository-url>
cd dashboard-builder-poc
```

---

# Backend

Install dependencies:

```bash
cd backend
npm install
```

Create environment file:

```env
PORT=5000
MONGO_DB_URL=mongodb://localhost:27017/dashboard-builder
```

Run backend:

```bash
npm run dev
```

Seed database:

```bash
npm run seed
```

---

# Frontend

Install dependencies:

```bash
cd frontend
npm install
```

Create environment file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

# Performance Optimizations

Implemented optimizations:

- React Query caching
- Query invalidation
- Debounced layout persistence
- Error boundaries
- Responsive layouts
- Widget registry pattern
- Component reuse
- Selective rerendering

---

# Future Improvements

Potential enhancements:

- Dashboard templates
- Widget marketplace
- WebSocket synchronization
- Dashboard sharing
- Role-based access control
- Undo/Redo
- Dashboard versioning
- Widget analytics
- Real-time collaboration
- Plugin SDK

---

# AI Assistance Disclosure

This project was designed, implemented, debugged, and integrated by me. During development, I leveraged AI-assisted development tools as productivity and research aids.

## Tools Used

### ChatGPT (OpenAI)

Used for:

- Assignment analysis and planning
- Architectural discussions
- Documentation generation
- Technical research
- Code review and debugging assistance
- Design pattern exploration
- README and ADR documentation drafting
- Generating example code snippets

### Claude Sonnet 4 (Anthropic)

Used for:

- Exploring implementation approaches
- Rapid prototyping
- Widget CRUD implementation ideas
- Dashboard layout management approaches
- Widget duplication workflows
- Alternative implementation suggestions

---

## Development Responsibility

All architectural decisions, implementation choices, integration work, debugging, testing, customization, and final code review were performed by me.

AI tools were used as development assistants and productivity accelerators rather than autonomous code generators.

This reflects a modern AI-assisted software development workflow where engineering judgment, system design, integration, and final implementation responsibility remain with the developer.

---

# Author

**Suman Kumar**

Full Stack Developer

Technologies:

- React.js
- TypeScript
- Node.js
- MongoDB
- Redux Toolkit
- TanStack Query
- Express.js
- Flutter
- Python