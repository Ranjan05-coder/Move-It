import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <div className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar onNavClick={closeSidebar} />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Main Area */}
      <div className="dashboard-main">

        <div className="dashboard-header-bar">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h5 className="mb-0">MoveIt Panel</h5>
        </div>

        {/* ✅ THIS IS THE IMPORTANT CHANGE */}
        <div className="dashboard-content section-block">
          {children}
        </div>

      </div>
    </div>
  );
}