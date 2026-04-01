import React from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { selectMonthlyTrend } from "../../features/transactions/selectors";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#e2e8f0",
  backdropFilter: "blur(12px)",
};

const TrendChart: React.FC = () => {
  const data = useAppSelector(selectMonthlyTrend);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 p-6 transition-colors duration-300">
      <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1 transition-colors duration-300">
        Monthly Trend
      </h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
        Income vs expenses over time
      </p>

      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              fill="url(#colorIncome)"
              strokeWidth={2.5}
              name="Income"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#f43f5e"
              fill="url(#colorExpense)"
              strokeWidth={2.5}
              name="Expenses"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TrendChart;
