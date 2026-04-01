import { configureStore } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionsSlice";
import filtersReducer from "../features/filters/filtersSlice";
import uiReducer from "../features/ui/uiSlice";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  try {
    localStorage.setItem(
      "finance_transactions",
      JSON.stringify(state.transactions.items),
    );
    localStorage.setItem("finance_darkMode", JSON.stringify(state.ui.darkMode));
  } catch {
    // silently fail
  }
  return result;
};

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;
