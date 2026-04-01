import React from "react";
import { LayoutDashboard, ArrowLeftRight, Lightbulb } from "lucide-react";

interface Props {
  activePage: string;
  onNavigate: (page: string) => void;
  isMobile?: boolean;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

const Sidebar: React.FC<Props> = ({
  activePage,
  onNavigate,
  isMobile = false,
}) => {
  return (
    <aside
      className={`${isMobile ? "relative h-full" : "fixed left-0 top-0 h-screen max-md:hidden"} w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-white/5 flex flex-col z-50`}
    >
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              FinanceHub
            </h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
              Personal Tracker
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 text-emerald-400 shadow-lg shadow-emerald-500/5 border border-emerald-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-emerald-400" : "text-slate-500"}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/5">
        <div className="text-[10px] text-slate-600 font-medium uppercase tracking-wider">
          v1.0 • Redux Powered
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
