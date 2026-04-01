import React from "react";
import { useAppSelector } from "../../hooks/useRedux";
import {
  selectBalance,
  selectIncome,
  selectExpenses,
} from "../../features/transactions/selectors";
import { formatCurrency } from "../../utils/calculations";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

const SummaryCards: React.FC = () => {
  const balance = useAppSelector(selectBalance);
  const income = useAppSelector(selectIncome);
  const expenses = useAppSelector(selectExpenses);

  const cards = [
    {
      label: "Total Balance",
      value: balance,
      icon: Wallet,
      gradient: "from-emerald-500 to-teal-400",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
      ring: "ring-emerald-500/10",
    },
    {
      label: "Total Income",
      value: income,
      icon: TrendingUp,
      gradient: "from-blue-500 to-indigo-400",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
      ring: "ring-blue-500/10",
    },
    {
      label: "Total Expenses",
      value: expenses,
      icon: TrendingDown,
      gradient: "from-rose-500 to-pink-400",
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-500",
      ring: "ring-rose-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 p-6 ring-1 ${card.ring} transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 hover:-translate-y-0.5`}
          >
            {/* Gradient accent bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.gradient}`}
            />

            {/* Background glow */}
            <div
              className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br ${card.gradient} opacity-[0.03] rounded-full group-hover:opacity-[0.06] transition-opacity duration-500`}
            />

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-300">
                {card.label}
              </span>
              <div
                className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center transition-colors duration-300`}
              >
                <Icon size={20} className={card.iconColor} />
              </div>
            </div>

            <p
              className={`text-3xl font-extrabold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent tracking-tight`}
            >
              {formatCurrency(card.value)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
