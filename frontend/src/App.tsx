import "./App.css";
import DashboardShell from "./components/dashboard/DashboardShell";
import DashboardToolbar from "./components/dashboard/DashboardToolbar";
import DashboardSwitcher from "./components/dashboard/DashboardSwitcher";

function App() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <DashboardSwitcher />
      </div>
      <DashboardToolbar />
      <DashboardShell />
    </div>
  );
}

export default App;
