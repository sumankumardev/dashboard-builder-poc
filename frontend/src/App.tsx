import "./App.css";
import DashboardShell from "./components/dashboard/DashboardShell";
import DashboardToolbar from "./components/dashboard/DashboardToolbar";

function App() {
  return (
    <div className="p-4">
      <DashboardToolbar/>
      <DashboardShell />
    </div>
  );
}

export default App;
