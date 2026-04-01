import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  activePage: string;
  onNavigate: (page: string) => void;
  title: string;
  children: React.ReactNode;
}

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  insights: "Insights",
};

const Layout: React.FC<Props> = ({ activePage, onNavigate, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (p: string) => {
    onNavigate(p);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Desktop sidebar */}
      <Sidebar activePage={activePage} onNavigate={handleNav} />

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl z-[61]">
            <Sidebar activePage={activePage} onNavigate={handleNav} isMobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:ml-64 transition-colors duration-300">
        <Header
          title={pageTitles[activePage] || "Dashboard"}
          onMenuToggle={() => setMobileOpen(true)}
        />
        <main className="p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
