import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TransactionState, Transaction } from "../../types";
import { seedTransactions } from "../../data/seedData";

const loadFromStorage = (): Transaction[] | null => {
  try {
    const data = localStorage.getItem("finance_transactions");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const initialState: TransactionState = {
  items: loadFromStorage() || seedTransactions,
  status: "idle",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.items.unshift(action.payload);
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteTransaction(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setTransactions,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
