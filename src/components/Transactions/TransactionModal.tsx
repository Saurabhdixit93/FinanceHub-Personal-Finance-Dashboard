import React, { useState, useEffect } from "react";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { useAppDispatch } from "../../hooks/useRedux";
import {
  addTransaction,
  updateTransaction,
} from "../../features/transactions/transactionsSlice";
import type { Transaction, TransactionType } from "../../types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editingTransaction?: Transaction | null;
}

const defaultForm = {
  date: new Date().toISOString().split("T")[0],
  amount: "",
  category: "",
  type: "expense" as TransactionType,
  description: "",
};

const TransactionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  editingTransaction,
}) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        date: editingTransaction.date,
        amount: String(editingTransaction.amount),
        category: editingTransaction.category,
        type: editingTransaction.type,
        description: editingTransaction.description || "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingTransaction, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0 || !form.category.trim() || !form.date)
      return;

    const transaction: Transaction = {
      id: editingTransaction?.id || uuidv4(),
      date: form.date,
      amount,
      category: form.category.trim(),
      type: form.type,
      description: form.description.trim() || undefined,
    };

    if (editingTransaction) {
      dispatch(updateTransaction(transaction));
    } else {
      dispatch(addTransaction(transaction));
    }
    onClose();
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-sm transition-all duration-300";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-scale-in transition-colors duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between transition-colors duration-300">
          <h3 className="text-base font-bold text-slate-800 dark:text-white transition-colors duration-300">
            {editingTransaction ? "Edit Transaction" : "Add Transaction"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider transition-colors duration-300">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider transition-colors duration-300">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider transition-colors duration-300">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. Groceries, Salary"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider transition-colors duration-300">
              Type
            </label>
            <div className="flex gap-3">
              {(["expense", "income"] as TransactionType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, type: t })}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    form.type === t
                      ? t === "income"
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                        : "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
                      : "bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600/50"
                  }`}
                >
                  {t === "income" ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  {t === "income" ? "Income" : "Expense"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider transition-colors duration-300">
              Description (optional)
            </label>
            <input
              type="text"
              placeholder="What was this for?"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={inputClass}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              {editingTransaction ? "Update" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
