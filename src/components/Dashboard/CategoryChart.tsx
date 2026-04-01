import React from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { selectCategoryBreakdown } from "../../features/transactions/selectors";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f43f5e",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
];

const tooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#e2e8f0",
};

const CategoryChart: React.FC = () => {
  const data = useAppSelector(selectCategoryBreakdown);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 p-6 transition-colors duration-300">
      <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1 transition-colors duration-300">
        Expense Categories
      </h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
        Breakdown by category
      </p>

      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
          No expense data
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={
                ((value: number) => `$${value.toLocaleString()}`) as any
              }
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryChart;
