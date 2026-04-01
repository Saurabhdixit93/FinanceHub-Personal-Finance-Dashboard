import { createSelector } from "@reduxjs/toolkit";
import type { AppRootState } from "../../app/store";
import {
  calcIncome,
  calcExpenses,
  calcBalance,
  groupByCategory,
  groupByMonth,
} from "../../utils/calculations";

const selectTransactionItems = (state: AppRootState) =>
  state.transactions.items;
const selectFilters = (state: AppRootState) => state.filters;

export const selectFilteredTransactions = createSelector(
  [selectTransactionItems, selectFilters],
  (items, filters) => {
    let filtered = [...items];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description?.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }
    if (filters.category) {
      filtered = filtered.filter((t) => t.category === filters.category);
    }
    if (filters.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }
    return filtered.sort((a, b) => b.date.localeCompare(a.date));
  },
);

export const selectBalance = createSelector(
  [selectTransactionItems],
  calcBalance,
);
export const selectIncome = createSelector(
  [selectTransactionItems],
  calcIncome,
);
export const selectExpenses = createSelector(
  [selectTransactionItems],
  calcExpenses,
);

export const selectCategoryBreakdown = createSelector(
  [selectTransactionItems],
  (items) => {
    const expenseItems = items.filter((t) => t.type === "expense");
    const grouped = groupByCategory(expenseItems);
    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  },
);

export const selectMonthlyTrend = createSelector(
  [selectTransactionItems],
  groupByMonth,
);

export const selectCategories = createSelector(
  [selectTransactionItems],
  (items) => {
    const categories = new Set(items.map((t) => t.category));
    return Array.from(categories).sort();
  },
);
