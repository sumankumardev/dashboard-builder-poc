# Architectural Decision Record (ADR)

# Dashboard Builder POC – Learning Routes Assignment

**Author:** Suman Kumar  
**Date:** July 2026  
**Version:** 1.0

---

# 1. Project Overview

The objective of this project was to design and implement a scalable, extensible, and production-oriented Dashboard Builder Proof of Concept (POC) that supports:

- Dynamic widget rendering
- Drag-and-drop dashboard layouts
- Widget CRUD operations
- Responsive dashboard layouts
- Persistent dashboard state
- Extensible mock data generation
- Runtime schema validation
- Separation of server and client state

The architecture was intentionally designed to demonstrate software engineering principles including:

- Separation of Concerns
- Single Responsibility Principle
- Open/Closed Principle
- Scalability
- Maintainability
- Type Safety
- Performance Optimization

---

# 2. Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React 19 | Component-based UI architecture |
| TypeScript | Static typing and maintainability |
| Redux Toolkit | Client-side state management |
| TanStack Query | Server-side state management |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Reusable UI components |
| React Grid Layout | Dashboard drag/drop and resizing |
| Apache ECharts | Data visualization |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Event-driven backend runtime |
| Express.js | REST API framework |
| TypeScript | Type safety |
| MongoDB | Flexible document database |
| Mongoose | MongoDB ODM |
| Zod | Runtime schema validation |

---

# 3. High-Level Architecture

The application follows a layered architecture pattern.

```text
Frontend
    ↓
State Management
    ↓
API Layer
    ↓
Backend API
    ↓
Service Layer
    ↓
Database
```

The frontend and backend responsibilities are strictly separated.

---

# 4. Frontend Architecture

The frontend structure is organized by responsibility.

```text
src/

api/
components/
hooks/
registry/
store/
types/
widgets/
pages/
lib/
```

---

# 5. State Management Strategy

The application separates **client state** and **server state**.

## Client State

Managed using Redux Toolkit.

### Responsibilities

- Dashboard layouts
- Widget configuration
- Selected widget
- Dialog state
- UI preferences
- Dashboard metadata

Example:

```typescript
dashboardState = {
    dashboardId: "",
    widgets: [],
    layouts: [],
    selectedWidget: null,
    editMode: false
}
```

### Why Redux Toolkit?

Benefits:

- Predictable state management
- Centralized store
- Excellent debugging experience
- Scalable architecture
- Middleware support

---

## Server State

Managed using TanStack Query.

### Responsibilities

- Dashboard data
- Widget data
- API caching
- Refetching
- Error handling
- Query invalidation

Example:

```typescript
useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard
})
```

### Why TanStack Query?

Benefits:

- Automatic caching
- Background refetching
- Loading states
- Error states
- Request deduplication
- Query invalidation
- Performance optimization

---

# 6. Widget Registry Pattern

## Problem

Adding a new widget should not require modifying the dashboard rendering engine.

## Solution

A Widget Registry Pattern was implemented.

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
    scatter: ScatterWidget,
}
```

To add a new widget:

```typescript
widgetRegistry.pie = PieWidget;
```

No dashboard code changes are required.

---

## Benefits

- Open/Closed Principle
- Extensible architecture
- Plugin-style widgets
- Decoupled rendering
- Scalable widget ecosystem

---

# 7. Dashboard Layout Engine

## Decision

Use React Grid Layout.

## Requirements

- Drag and drop
- Resize support
- Responsive layouts
- Persistent positions

Example:

```tsx
<ResponsiveGridLayout
    layouts={layouts}
    breakpoints={breakpoints}
    cols={cols}
/>
```

---

## Benefits

- Responsive breakpoints
- Drag and drop support
- Resize support
- Layout persistence
- Production-ready ecosystem

---

# 8. Visualization Engine

## Decision

Use Apache ECharts.

## Required Charts

- Bar Chart
- Line Chart
- TreeMap
- Scatter Plot

---

## Benefits

- High performance
- Rich visualizations
- Responsive charts
- Advanced customization
- Enterprise-ready features

---

# 9. Backend Architecture

The backend follows a layered architecture.

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

## Route Layer

Responsibilities:

- Endpoint registration
- Request routing

Example:

```typescript
router.put(
    "/:id/layout",
    DashboardController.updateLayout
)
```

---

## Controller Layer

Responsibilities:

- Request parsing
- Validation
- Response formatting
- Error handling

---

## Service Layer

Responsibilities:

- Business logic
- Database orchestration
- Domain operations

Example:

```typescript
Dashboard.findByIdAndUpdate()
```

---

## Model Layer

Responsibilities:

- Data schemas
- Persistence logic
- Relationships

Technology:

- Mongoose

---

# 10. Database Decision

## Alternatives Considered

- PostgreSQL
- MySQL
- MongoDB

---

## Decision

MongoDB was selected.

---

## Why MongoDB?

Dashboard structures contain nested documents:

```json
{
    "widgets": [],
    "layouts": [],
    "settings": {}
}
```

Benefits:

- Flexible schemas
- Nested document support
- Fast development iteration
- Simplified persistence model

---

# 11. Runtime Validation

## Decision

Use Zod.

Example:

```typescript
const WidgetSchema = z.object({
    title: z.string(),
    type: z.string(),
    config: z.object({})
});
```

---

## Benefits

- Runtime validation
- Type inference
- API safety
- Error reporting

---

# 12. Mock Data Engine

## Decision

Implement an extensible mock engine.

Structure:

```text
mockEngine/

generateBarData.ts
generateLineData.ts
generateTreeMapData.ts
generateScatterData.ts
```

---

## Supported Data Types

### Categorical Data

Used for:

- Bar charts

### Temporal Data

Used for:

- Line charts

### Hierarchical Data

Used for:

- TreeMaps

### Relational Data

Used for:

- Scatter plots

---

## Benefits

- Extensible
- Reusable
- Testable
- Predictable

---

# 13. Dashboard Persistence

Dashboard layouts are persisted.

Flow:

```text
User Drags Widget
        ↓
Redux Update
        ↓
Debounced API Call
        ↓
MongoDB Persistence
```

---

## Benefits

- Persistent dashboards
- Better user experience
- Reduced API calls

---

# 14. Error Handling Strategy

## Decision

Use Error Boundaries.

Example:

```text
Widget Crash
      ↓
ErrorBoundary
      ↓
Fallback UI
      ↓
Other Widgets Continue
```

---

## Benefits

- Fault isolation
- Better UX
- Dashboard resilience

---

# 15. Performance Optimizations

The following optimizations were implemented:

- React Query caching
- Query invalidation
- Debounced layout persistence
- Error boundaries
- Widget registry
- Component reuse
- Responsive layouts
- Selective re-rendering

---

# 16. Scalability Considerations

The current architecture supports future features such as:

- Dashboard templates
- Widget marketplace
- Real-time collaboration
- WebSocket updates
- Role-based access control
- Dashboard sharing
- Multi-user dashboards
- Lazy loading widgets
- Dashboard versioning
- Widget analytics
- Undo/Redo functionality

---

# 17. Future Improvements

Potential improvements include:

- Widget plugin SDK
- Optimistic updates
- Dashboard snapshots
- Widget permissions
- Real-time synchronization
- Server-side caching
- Dashboard export/import
- Widget template library

---

# 18. Conclusion

The Dashboard Builder POC was designed with a strong focus on:

- Scalability
- Extensibility
- Maintainability
- Performance
- Separation of concerns
- Type safety
- Developer experience

The implemented architecture allows new widgets, layouts, and data sources to be added without modifying the dashboard core logic, satisfying the primary requirements of the assignment while demonstrating production-grade software engineering practices.