import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Pencil,
  Trash2,
  ArrowUpDown,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { selectFilteredTransactions } from "../../features/transactions/selectors";
import { deleteTransaction } from "../../features/transactions/transactionsSlice";
import { formatCurrency } from "../../utils/calculations";
import type { Transaction } from "../../types";
import EmptyState from "../common/EmptyState";

interface Props {
  onEdit: (t: Transaction) => void;
}

type SortKey = "date" | "amount" | "category";

const TransactionTable: React.FC<Props> = ({ onEdit }) => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectFilteredTransactions);
  const isAdmin = useAppSelector((s) => s.ui.role === "admin");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...transactions].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortKey === "date") return a.date.localeCompare(b.date) * dir;
    if (sortKey === "amount") return (a.amount - b.amount) * dir;
    return a.category.localeCompare(b.category) * dir;
  });

  if (sorted.length === 0) {
    return <EmptyState message="No transactions found" />;
  }

  const SortBtn: React.FC<{ col: SortKey; label: string }> = ({
    col,
    label,
  }) => (
    <button
      onClick={() => handleSort(col)}
      className="flex items-center gap-1 group"
    >
      {label}
      <ArrowUpDown
        size={12}
        className={`transition-colors ${sortKey === col ? "text-emerald-500" : "text-slate-300 dark:text-slate-600 group-hover:text-slate-400"}`}
      />
    </button>
  );

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/5 transition-colors duration-300">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50/80 dark:bg-slate-800/80 text-left border-b border-slate-200/50 dark:border-white/5 transition-colors duration-300">
            <th className="px-5 py-3.5 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              <SortBtn col="date" label="Date" />
            </th>
            <th className="px-5 py-3.5 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              Description
            </th>
            <th className="px-5 py-3.5 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              <SortBtn col="category" label="Category" />
            </th>
            <th className="px-5 py-3.5 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              Type
            </th>
            <th className="px-5 py-3.5 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">
              <SortBtn col="amount" label="Amount" />
            </th>
            {isAdmin && (
              <th className="px-5 py-3.5 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/80 dark:divide-white/5">
          {sorted.map((t) => (
            <tr
              key={t.id}
              className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors duration-200"
            >
              <td className="px-5 py-4 text-slate-600 dark:text-slate-400 whitespace-nowrap font-mono text-xs transition-colors duration-300">
                {new Date(t.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-5 py-4 text-slate-800 dark:text-slate-200 font-medium transition-colors duration-300">
                {t.description || "—"}
              </td>
              <td className="px-5 py-4">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[11px] font-semibold text-slate-600 dark:text-slate-300 transition-colors duration-300">
                  {t.category}
                </span>
              </td>
              <td className="px-5 py-4">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                    t.type === "income"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  } transition-colors duration-300`}
                >
                  {t.type === "income" ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownRight size={12} />
                  )}
                  {t.type === "income" ? "Income" : "Expense"}
                </span>
              </td>
              <td
                className={`px-5 py-4 text-right font-bold tabular-nums text-sm transition-colors duration-300 ${
                  t.type === "income"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {t.type === "income" ? "+" : "-"}
                {formatCurrency(t.amount)}
              </td>
              {isAdmin && (
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(t)}
                      className="p-1.5 rounded-lg hover:bg-blue-500/10 text-slate-400 hover:text-blue-500 transition-all duration-200"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => dispatch(deleteTransaction(t.id))}
                      className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-all duration-200"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
