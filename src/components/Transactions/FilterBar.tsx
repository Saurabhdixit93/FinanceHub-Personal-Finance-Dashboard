import React from "react";
import { Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  setSearch,
  setCategory,
  setType,
  resetFilters,
} from "../../features/filters/filtersSlice";
import { selectCategories } from "../../features/transactions/selectors";
import type { TransactionType } from "../../types";

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.filters);
  const categories = useAppSelector(selectCategories);
  const hasFilters = filters.search || filters.category || filters.type;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all duration-300 text-sm"
        />
      </div>

      {/* Category Filter */}
      <select
        value={filters.category || ""}
        onChange={(e) => dispatch(setCategory(e.target.value || null))}
        className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer transition-all duration-300"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Type Toggle */}
      <div className="flex rounded-xl overflow-hidden border border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        {([null, "income", "expense"] as (TransactionType | null)[]).map(
          (t) => (
            <button
              key={String(t)}
              onClick={() => dispatch(setType(t))}
              className={`px-4 py-2.5 text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                filters.type === t
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-white dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              {t === null ? "All" : t === "income" ? "Income" : "Expense"}
            </button>
          ),
        )}
      </div>

      {/* Reset */}
      {hasFilters && (
        <button
          onClick={() => dispatch(resetFilters())}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-500 border border-rose-500/20 hover:bg-rose-500/5 transition-all duration-200"
        >
          <X size={14} />
          Reset
        </button>
      )}
    </div>
  );
};

export default FilterBar;
