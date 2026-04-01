import React, { useState } from "react";
import { useAppSelector } from "../hooks/useRedux";
import { Plus } from "lucide-react";
import FilterBar from "../components/Transactions/FilterBar";
import TransactionTable from "../components/Transactions/TransactionTable";
import TransactionModal from "../components/Transactions/TransactionModal";
import type { Transaction } from "../types";

const TransactionsPage: React.FC = () => {
  const isAdmin = useAppSelector((s) => s.ui.role === "admin");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const handleEdit = (t: Transaction) => {
    setEditing(t);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
          Manage your financial records
        </p>
        {isAdmin && (
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>

      <FilterBar />
      <TransactionTable onEdit={handleEdit} />
      <TransactionModal
        isOpen={modalOpen}
        onClose={handleClose}
        editingTransaction={editing}
      />
    </div>
  );
};

export default TransactionsPage;
