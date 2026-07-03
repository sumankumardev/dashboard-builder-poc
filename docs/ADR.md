# Architecture Decision Records

## ADR-001: State Management — Redux Toolkit

**Decision:** Use Redux Toolkit (RTK) for global dashboard state.

**Context:** The dashboard needs shared state (widgets list, layouts, selected widget) accessible across `DashboardToolbar`, `DashboardGrid`, and `WidgetRenderer` without deep prop drilling.

**Rationale:** RTK reduces Redux boilerplate significantly via `createSlice`. It also integrates cleanly with TypeScript and provides `immer`-based immutable updates out of the box.

**Alternatives considered:** Zustand (lighter, but less structured for a team setting), React Context (no middleware, poor performance for frequent updates).

---

## ADR-002: Server State & Data Fetching — TanStack React Query

**Decision:** Use React Query for all API calls (dashboard load, widget data).

**Context:** Widget chart data is fetched per-widget from the backend mock engine. Each widget instance needs independent loading/error states and the ability to refresh independently.

**Rationale:** React Query provides per-query caching, background refetch, and `invalidateQueries` for targeted refresh. Query keys are scoped per `widgetId` so refreshing one widget does not affect others of the same type.

**Alternatives considered:** RTK Query (tightly coupled to Redux store, more setup), plain `useEffect` + `fetch` (no caching, no deduplication).

---

## ADR-003: Widget Registry Pattern

**Decision:** Use a static `widgetRegistry` map (`{ bar: BarWidget, line: LineWidget, ... }`) to resolve widget components by type.

**Context:** The dashboard supports multiple chart types. New types should be addable without modifying `WidgetRenderer`.

**Rationale:** The registry decouples the renderer from concrete widget implementations. Adding a new widget type only requires creating the component and registering it — no conditional logic needed in the renderer.

---

## ADR-004: Layout Persistence — react-grid-layout + MongoDB

**Decision:** Store layout as an array of `{ i, x, y, w, h }` objects on the Dashboard document in MongoDB.

**Context:** Widget positions and sizes must survive page refresh.

**Rationale:** `react-grid-layout` natively produces this shape. Storing it directly on the dashboard avoids a separate layouts collection and keeps reads simple (one `populate` call returns everything needed).

**Trade-off:** Layout is dashboard-scoped, not widget-scoped, which is correct since the same widget type could appear multiple times at different positions.

---

## ADR-005: Widget Storage — Separate Widget Collection

**Decision:** Widgets are stored as separate MongoDB documents in a `Widget` collection, referenced by ObjectId from the Dashboard.

**Context:** Widgets have their own lifecycle (create, update, duplicate, delete) independent of the dashboard document.

**Rationale:** Embedding widgets as subdocuments would make individual widget updates require full dashboard document rewrites and would complicate duplicate/delete operations. A separate collection with `populate` keeps operations clean and atomic.

---

## ADR-006: UI Component Library — shadcn/ui + Radix + Tailwind CSS v4

**Decision:** Use shadcn/ui (Radix primitives + Tailwind) for all UI components.

**Context:** The project needs accessible, composable UI components (dialogs, dropdowns, buttons) without a heavy opinionated design system.

**Rationale:** shadcn/ui components are copied into the project (not a dependency), giving full control. Radix primitives handle accessibility (focus trapping, ARIA) out of the box. Tailwind v4 provides utility-first styling with minimal config.
