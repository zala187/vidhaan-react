import React, { useState } from "react";
import { useApp } from "../../context/AppContext";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Dashboard from "./Dashboard";
import Scanner from "./Scanner";
import Report from "./Report";
import History from "./History";
import ReportsGrid from "./ReportsGrid";
import Settings from "./Settings";
import Profile from "./Profile";
import Admin from "./Admin";

const PAGES = {
  dashboard: Dashboard,
  scanner: Scanner,
  report: Report,
  history: History,
  reports: ReportsGrid,
  settings: Settings,
  profile: Profile,
  admin: Admin,
};

export default function AppShell() {
  const { curApp } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Page = PAGES[curApp] || Dashboard;

  return (
    <div className="app-shell">

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="app-main">

        <Topbar
          onBurger={() => setSidebarOpen(true)}
        />

        <div className="app-content">
          <Page />
        </div>

      </main>

    </div>
  );
}