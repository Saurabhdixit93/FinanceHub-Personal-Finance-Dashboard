import React from "react";
import { PiggyBank, Flame, BarChart3 } from "lucide-react";
import { useAppSelector } from "../../hooks/useRedux";
import {
  selectMonthlyTrend,
  selectCategoryBreakdown,
} from "../../features/transactions/selectors";
import {
  calcSavingsRate,
  getHighestSpendCategory,
  formatCurrency,
} from "../../utils/calculations";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import EmptyState from "../common/EmptyState";

const tooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#e2e8f0",
};

const InsightsPanel: React.FC = () => {
  const items = useAppSelector((s) => s.transactions.items);
  const monthlyData = useAppSelector(selectMonthlyTrend);
  const categoryData = useAppSelector(selectCategoryBreakdown);

  const savingsRate = calcSavingsRate(items);
  const topCategory = getHighestSpendCategory(items);

  if (items.length === 0)
    return <EmptyState message="Add transactions to see insights" />;

  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Savings Rate */}
        <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors duration-300">
              Savings Rate
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <PiggyBank size={18} className="text-emerald-500" />
            </div>
          </div>
          <p
            className={`text-3xl font-extrabold ${savingsRate >= 0 ? "text-emerald-500" : "text-rose-500"}`}
          >
            {savingsRate.toFixed(1)}%
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 transition-colors duration-300">
            {savingsRate >= 20
              ? "Great saving habits!"
              : savingsRate >= 0
                ? "Room for improvement"
                : "Spending exceeds income"}
          </p>
        </div>

        {/* Top Spending Category */}
        <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors duration-300">
              Highest Spending
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center">
              <Flame size={18} className="text-rose-500" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-rose-500">
            {topCategory?.category || "—"}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 transition-colors duration-300">
            {topCategory ? formatCurrency(topCategory.amount) : "No data"}
          </p>
        </div>

        {/* Total Categories */}
        <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors duration-300">
              Expense Categories
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <BarChart3 size={18} className="text-blue-500" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-blue-500">
            {categoryData.length}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 transition-colors duration-300">
            active categories tracked
          </p>
        </div>
      </div>

      {/* Monthly Comparison Chart */}
      <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 p-6 transition-colors duration-300">
        <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1 transition-colors duration-300">
          Monthly Comparison
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
          Income vs expenses by month
        </p>
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyData}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.08)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={
                  ((value: number) => `$${value.toLocaleString()}`) as any
                }
              />
              <Legend iconType="circle" iconSize={8} />
              <Bar
                dataKey="income"
                name="Income"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name="Expenses"
                fill="#f43f5e"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
            Not enough data
          </div>
        )}
      </div>

      {/* Category Ranking */}
      <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 p-6 transition-colors duration-300">
        <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1 transition-colors duration-300">
          Category Ranking
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
          Top spending categories
        </p>
        <div className="space-y-3.5">
          {[...categoryData]
            .sort((a, b) => b.value - a.value)
            .map((cat, i) => {
              const max = categoryData.reduce(
                (m, c) => Math.max(m, c.value),
                0,
              );
              const pct = max > 0 ? (cat.value / max) * 100 : 0;
              return (
                <div key={cat.name} className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-300 dark:text-slate-600 w-6 text-right transition-colors duration-300">
                    #{i + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-28 truncate transition-colors duration-300">
                    {cat.name}
                  </span>
                  <div className="flex-1 bg-slate-100 dark:bg-white/5 rounded-full h-2 overflow-hidden transition-colors duration-300">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 tabular-nums w-24 text-right transition-colors duration-300">
                    {formatCurrency(cat.value)}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
