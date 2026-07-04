import DashboardShell from "@/components/dashboard/DashboardShell";
import DashboardSwitcher from "@/components/dashboard/DashboardSwitcher";
import DashboardToolbar from "@/components/dashboard/DashboardToolbar";

const HomePage = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <DashboardSwitcher />
      </div>
      <DashboardToolbar />
      <DashboardShell />
    </div>
  );
};

export default HomePage
