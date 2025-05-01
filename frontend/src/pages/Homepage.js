import { useState } from "react";
import NavBar from "../components/utility/Navbar";
import { Home, Users, BarChart3, Settings, Layers, Calendar, HelpCircle } from "lucide-react";

// Tab components - these would be replaced with your actual components
const DashboardContent = () => <div className="p-6">Dashboard Content Component</div>;
const UsersContent = () => <div className="p-6">User Content Component</div>;
const AnalyticsContent = () => <div className="p-6">Analytics Component</div>;
const SettingsContent = () => <div className="p-6">Settings Component</div>;
const ProjectsContent = () => <div className="p-6">Projects Component</div>;
const CalendarContent = () => <div className="p-6">Calendar Component</div>;
const HelpContent = () => <div className="p-6">Help & Support Component</div>;

// Main tabs configuration
const tabs = [
  { id: "dashboard", name: "Dashboard", icon: Home, component: DashboardContent },
  { id: "employees", name: "Users", icon: Users, component: UsersContent },
  { id: "analytics", name: "Analytics", icon: BarChart3, component: AnalyticsContent },
  { id: "projects", name: "Projects", icon: Layers, component: ProjectsContent },
  { id: "calendar", name: "Calendar", icon: Calendar, component: CalendarContent },
  { id: "settings", name: "Settings", icon: Settings, component: SettingsContent },
  { id: "help", name: "Help", icon: HelpCircle, component: HelpContent },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Find the active component to render
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || DashboardContent;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white">
      <NavBar />
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-neutral-300/30 border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
          </div>
          <nav className="mt-2">
            <ul>
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full px-8 py-3 text-base text-left ${
                      activeTab === tab.id
                        ? "bg-neutral-300/60 backdrop-blur text-accent border-r-4 border-accent "
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon size={18} className="mr-3" />
                    <span>{tab.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="py-6 px-8">
            <h1 className="text-2xl font-semibold text-gray-800">
              {tabs.find(tab => tab.id === activeTab)?.name || "Dashboard"}
            </h1>
            <div className="mt-6">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
