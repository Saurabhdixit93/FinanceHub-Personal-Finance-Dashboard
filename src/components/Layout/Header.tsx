import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { toggleDarkMode, setRole } from "../../features/ui/uiSlice";
import { Sun, Moon, Menu, Shield, Eye } from "lucide-react";

interface Props {
  title: string;
  onMenuToggle?: () => void;
}

const Header: React.FC<Props> = ({ title, onMenuToggle }) => {
  const dispatch = useAppDispatch();
  const { darkMode, role } = useAppSelector((s) => s.ui);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-white/5 px-6 py-4 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white transition-colors duration-300">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        {/* Role Selector */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 transition-colors duration-300">
          {role === "admin" ? (
            <Shield size={14} className="text-amber-500" />
          ) : (
            <Eye size={14} className="text-blue-400" />
          )}
          <select
            value={role}
            onChange={(e) => dispatch(setRole(e.target.value))}
            className="text-xs font-medium bg-transparent text-slate-600 dark:text-slate-300 cursor-pointer focus:outline-none transition-colors duration-300"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-all duration-300 hover:rotate-12"
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
